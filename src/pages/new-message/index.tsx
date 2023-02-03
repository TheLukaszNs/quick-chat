import Input from "../../components/Input";
import { MdSearch, MdGroup } from "react-icons/md";
import { useState } from "react";
import type { User } from "@prisma/client";
import UserListItem from "../../components/UserListItem";
import { filterUsers } from "../../utils/filterUsers";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { useSession } from "next-auth/react";

const mockUsers = [
  {
    id: "0",
    name: "Jonh",
    email: "",
    emailVerified: null,
    image: null,
  },
  {
    id: "1",
    name: "Emma",
    email: "",
    emailVerified: null,
    image: null,
  },
  {
    id: "3",
    name: "Adam",
    email: "",
    emailVerified: null,
    image: null,
  },
  {
    id: "4",
    name: "Josh",
    email: "",
    emailVerified: null,
    image: null,
  },
];

const NewMessage = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const router = useRouter();
  const addDirectRoomMutation = api.direct.addDirectRoom.useMutation();

  async function handleNewDirectRoom(receiverId: string) {
    const room = await addDirectRoomMutation.mutateAsync({
      userId: session?.user?.id ?? "0",
      receiverId: receiverId,
    });
    void router.push(`/room/${room.id}`);
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
          filterUsers(e.target.value, mockUsers, setUsers);
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
        {users.map((receiver: User, key) => {
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
