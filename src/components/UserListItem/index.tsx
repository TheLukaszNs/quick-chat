import type { User } from "@prisma/client";
import type { ComponentPropsWithoutRef } from "react";
import Image from "next/image";

type Props = ComponentPropsWithoutRef<"div"> & {
  user: Pick<User, "image" | "name">;
};

const UserListItem = ({ user, ...props }: Props) => {
  return (
    <div
      className="my-4 flex h-12 w-80 flex-row items-center rounded-2xl bg-slate-600 p-1"
      {...props}
    >
      <Image
        src={user.image ?? ""}
        className="h-10 w-10 rounded-full "
        width={40}
        height={40}
        alt=""
      />
      <div className="ml-2 font-bold text-slate-50">{user.name}</div>
    </div>
  );
};

export default UserListItem;
