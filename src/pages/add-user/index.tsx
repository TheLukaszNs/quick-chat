import Input from "../../components/Input";
import { MdSearch } from "react-icons/md";
import type { User } from "@prisma/client";
import UserListItem from "../../components/UserListItem";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { useState } from "react";

const AddUser = () => {
  const router = useRouter();
  const users = api.users.getAll.useQuery();
  const [userInput, setUserInput] = useState("");
  const filteredUsers = users.data?.filter((user) => {
    user.name?.startsWith(userInput);
  });

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
          setUserInput(e.target.value);
        }}
      />

      <div>
        {filteredUsers?.map((user: User, key) => {
          return (
            <UserListItem
              user={user}
              key={key}
              onClick={() => {
                void router.back();
              }}
            />
          );
        })}
      </div>
    </main>
  );
};

export default AddUser;
