import { User } from "@prisma/client";
import React from "react";

interface MessageProps {
  message: string;
  user: any;
  isDm?: boolean;
}

const MessageUser = ({ message, user, isDm }: MessageProps) => {
  return (
    <div className="m-auto mb-5 flex w-4/5">
      <div>
        <img
          src={`data:image/jpeg;base64,${user.image}`}
          className="mr-2 h-10 w-10 rounded-full"
          alt=""
        ></img>
      </div>
      <div className="flex-col">
        {isDm && <div className="font-bold text-slate-50">@{user.name}</div>}
        <div className="text-slate-50">{message}</div>
      </div>
    </div>
  );
};

export default MessageUser;
