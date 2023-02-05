import React from "react";
import Link from "next/link";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BiMessageRoundedAdd } from "react-icons/bi";
import Image from "next/image";
import { MdLogout } from "react-icons/md";
import { signOut } from "next-auth/react";
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
          <Image
            src={photo}
            className="rounded-full "
            alt=""
            width="40"
            height="40"
          ></Image>
        </div>
        <div className="flex-col px-5">
          <div className="text-slate-50">{name}</div>
          {isRoom ? (
            <div className="text-green-600">{active} użytkowników</div>
          ) : (
            <div className="text-green-600">Aktywny(a) teraz</div>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-between">
        {isRoom ? (
          <Link href={`/server/${serverId}/add-user`} className="text-slate-50">
            <BsFillPersonPlusFill />
          </Link>
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
