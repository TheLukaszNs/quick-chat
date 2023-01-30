import { User } from "@prisma/client";
import React from "react";
import Image from "next/image"

interface MessageProps {
  message: string;
  user: any;
  isDm?: boolean;
}

const MessageUser = ({ message, user, isDm }: MessageProps) => {
  return (
    <div className="m-auto mb-5 flex w-4/5">
      <div>
        <Image
          src={`data:image/jpeg;base64,${user.image}`}
          className="h-10 w-10 rounded-full"
          alt=""
        ></Image>
      </div>
      <div className="flex-col">
        {isDm && <div>@{user.name}</div>}
        <div>{message}</div>
      </div>
    </div>
  );
};

export default MessageUser;
