import Input from "../../components/Input";
import { MdSearch } from "react-icons/md";
import { User } from "@prisma/client";
import { useState } from "react";
import UserListItem from "../../components/UserListItem";

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

const AddUser = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const filterUsers = (username: string) => {
    if (username === "") {
      setUsers(mockUsers);
    }

    setUsers(mockUsers.filter((user) => user.name?.startsWith(username)));
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center bg-slate-900">
      <header className="mb-4 w-full bg-slate-800 py-6 text-center font-bold text-slate-50">
        Add User
      </header>

      <Input
        inputType="text"
        placeholder="Find User"
        icon={MdSearch}
        onChange={(e) => {
          filterUsers(e.target.value);
        }}
      />

      <div>
        {users.map((user: User, key) => {
          return <UserListItem user={user} key={key} />;
        })}
      </div>
    </main>
  );
};

export default AddUser;
