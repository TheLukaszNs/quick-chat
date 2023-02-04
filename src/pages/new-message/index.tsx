import Input from "../../components/Input";
import { MdSearch, MdGroup } from "react-icons/md";
import type { User } from "@prisma/client";
import UserListItem from "../../components/UserListItem";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { useSession } from "next-auth/react";
import { useState } from "react";

const NewMessage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const addDirectRoomMutation = api.direct.addDirectRoom.useMutation();
  const users = api.users.getAll.useQuery();
  const [userInput, setUserInput] = useState("");
  const filteredUsers = users.data?.filter((user) => {
    return user.name?.startsWith(userInput);
  });

  async function handleNewDirectRoom(receiverId: string) {
    const room = await addDirectRoomMutation.mutateAsync({
      userId: session?.user?.id ?? "0",
      receiverId: receiverId,
    });
    await router.push(`/room/${room.id}`);
  }

  return (
    <main className="flex h-screen w-screen flex-col items-center bg-slate-900">
      <header className="mb-4 w-full bg-slate-800 py-6 text-center font-bold text-slate-50">
        New Message
      </header>

      <Input
        inputType="text"
        placeholder="Find User"
        icon={MdSearch}
        onChange={(e) => {
          setUserInput(e.target.value);
        }}
      />
      <Input
        inputType="text"
        placeholder="Create Server"
        icon={MdGroup}
        onKeyDown={(e) => {
          if (e.key == "Enter" && e.currentTarget.value !== "") {
            // api.
            void router.push("/server");
          }
        }}
      />

      <div className="flex flex-col">
        {filteredUsers?.map((receiver: User, key) => {
          return (
            <button
              key={key}
              onClick={() => {
                void handleNewDirectRoom(receiver.id);
              }}
            >
              <UserListItem user={receiver} />
            </button>
          );
        })}
      </div>
    </main>
  );
};

export default NewMessage;
