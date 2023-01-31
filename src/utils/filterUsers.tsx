import { User } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export const filterUsers = (
  username: string,
  users: User[],
  setUsersCallback: Dispatch<SetStateAction<User[]>>
) => {
  if (username === "") {
    setUsersCallback(users);
  }

  setUsersCallback(users.filter((user) => user.name?.startsWith(username)));
};
