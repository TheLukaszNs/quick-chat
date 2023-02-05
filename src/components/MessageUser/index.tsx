import React from "react";
import Image from "next/image";
import { type User } from "@prisma/client";

interface MessageProps {
  message: string;
  user?: Pick<User, "name" | "image">;
  isDm?: boolean;
}

const MessageUser = ({ message, user, isDm }: MessageProps) => {
  if (!user) {
    return null;
  }

  return (
    <div className="m-auto flex w-80 gap-3">
      <div>
        <Image
          src={user.image ?? ""}
          className="rounded-full"
          alt=""
          width="40"
          height="40"
        ></Image>
      </div>
      <div className="flex-col">
        {isDm && <div className="font-bold text-slate-50">@{user.name}</div>}
        <div className="text-slate-50">{message}</div>
      </div>
    </div>
  );
};

export default MessageUser;
