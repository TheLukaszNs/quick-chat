import type { User } from "@prisma/client";

export const filterUsers = (
  username: string,
  users: User[],
  setUsersCallback: (users: User[]) => void
) => {
  if (username === "") {
    setUsersCallback(users);
  }

  setUsersCallback(users.filter((user) => user.name?.startsWith(username)));
};
