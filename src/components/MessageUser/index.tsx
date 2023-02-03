import type { User } from "@prisma/client";
import React from "react";
import Image from "next/image";

interface MessageProps {
  message: string;
  user: Pick<User, "name" | "image">;
  isDm?: boolean;
}

const MessageUser = ({ message, user, isDm }: MessageProps) => {
  return (
    <div className="m-auto mb-5 flex w-4/5">
      <div>
        <Image
          src={`data:image/jpeg;base64,${user.image ?? ""}`}
          className="mr-2 rounded-full"
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
