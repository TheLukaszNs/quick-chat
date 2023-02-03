import Input from "../../components/Input";
import { MdSearch, MdGroup } from "react-icons/md";
import { useState } from "react";
import type { User } from "@prisma/client";
import UserListItem from "../../components/UserListItem";
import { filterUsers } from "../../utils/filterUsers";
import Link from "next/link";

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
  const [users, setUsers] = useState<User[]>(mockUsers);

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
      <Input inputType="text" placeholder="Create Server" icon={MdGroup} />

      <div>
        {users.map((user: User, key) => {
          return (
            <Link href="/message" key={key}>
              <UserListItem user={user} />
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default NewMessage;
