import type { User } from "@prisma/client";
import Image from "next/image";

type Props = {
  user: Pick<User, "image" | "name">;
};

const UserListItem = ({ user }: Props) => {
  return (
    <div className="my-4 flex h-12 w-80 flex-row items-center rounded-2xl bg-slate-600 p-1">
      <Image
        src={user.image ?? ""}
        className="h-10 w-10 rounded-full "
        alt=""
      />
      <div className="ml-2 font-bold text-slate-50">{user.name}</div>
    </div>
  );
};

export default UserListItem;
