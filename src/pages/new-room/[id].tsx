import React from "react";
import { useRouter } from "next/router";
import Input from "../../components/Input";
import { MdOutlineAddBusiness } from "react-icons/md";
import { api } from "../../utils/api";
import { useSession } from "next-auth/react";

const NewRoom = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const addRoomMutation = api.server.addRoom.useMutation();
  const { id } = router.query;

  async function handleNewRoom(name: string) {
    const room = await addRoomMutation.mutateAsync({
      serverId: id,
      name: name,
    });
    void router.push(`/room/${room.id}`);

    return;
  }

  return (
    <main className="flex h-screen w-screen flex-col items-center bg-slate-900">
      <header className="mb-4 w-full bg-slate-800 py-6 text-center font-bold text-slate-50">
        New Room
      </header>

      <Input
        inputType="text"
        placeholder="Create Room"
        icon={MdOutlineAddBusiness}
        onKeyDown={(e) => {
          if (e.key == "Enter" && e.currentTarget.value !== "") {
            const room: number = handleNewRoom(e.currentTarget.value);
          }
        }}
      />
    </main>
  );
};

export default NewRoom;
