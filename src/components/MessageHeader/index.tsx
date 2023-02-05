import React from "react";
import Link from "next/link";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BiMessageRoundedAdd } from "react-icons/bi";
import Image from "next/image";
import { MdLogout, MdOutlineAddBusiness } from "react-icons/md";
import { signOut } from "next-auth/react";
import { InitialAvatar } from "../InitialAvatar";
interface HeaderProps {
  name: string;
  photo: string;
  isRoom: boolean;
  active?: number;
  serverId?: string;
}

export const MessageHeader = ({
  name,
  photo,
  isRoom,
  active,
  serverId = "",
}: HeaderProps) => {
  return (
    <nav className="sticky top-0 left-0 right-0 mb-5 flex w-screen items-center justify-between bg-slate-800 p-5">
      <div className="flex items-center">
        <div>
          {photo !== "" ? (
            <Image
              src={photo}
              className="rounded-full shadow-md shadow-pink-300/50"
              alt=""
              width="40"
              height="40"
            ></Image>
          ) : (
            <InitialAvatar name={name} />
          )}
        </div>
        <div className="flex-col px-5">
          <div className="text-slate-50">{name}</div>
          {isRoom ? (
            <div className="text-green-600">{active} users</div>
          ) : (
            <div className="text-green-600">Active now</div>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-between">
        {isRoom ? (
          <div className="flex gap-4">
            <Link
              href={`/server/${serverId}/add-user`}
              className="text-slate-50"
            >
              <BsFillPersonPlusFill />
            </Link>
            <Link href={`/new-room/${serverId}`} className="text-slate-50">
              <MdOutlineAddBusiness />
            </Link>
          </div>
        ) : (
          <Link href="/new-message" className="text-slate-50">
            <BiMessageRoundedAdd />
          </Link>
        )}
        <MdLogout
          className="ml-10 text-slate-50"
          onClick={() =>
            void signOut({
              callbackUrl: "/",
            })
          }
        />
      </div>
    </nav>
  );
};

export default MessageHeader;
