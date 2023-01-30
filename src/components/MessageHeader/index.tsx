import React from "react";
import Link from "next/link";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BiMessageRoundedAdd } from "react-icons/bi";

interface HeaderProps {
  name: string;
  photo: string;
  isRoom: boolean;
  active?: number;
}

export const MessageHeader = ({ name, photo, isRoom, active }: HeaderProps) => {
  return (
    <nav className="sticky top-0 left-0 right-0 mb-5 flex items-center justify-between bg-slate-800 p-5">
      <div className="flex items-center">
        <div>
          <img
            src={`data:image/jpeg;base64,${photo}`}
            className="h-10 w-10 rounded-full "
            alt=""
          ></img>
        </div>
        <div className="flex-col px-5">
          <div className="text-slate-50">{name}</div>
          {isRoom ? (
            <div className="text-green-600">{active} Aktywni</div>
          ) : (
            <div className="text-green-600">Aktywny(a) teraz</div>
          )}
        </div>
      </div>
      {isRoom ? (
        <Link href="/add-user" className="text-slate-50">
          <BsFillPersonPlusFill />
        </Link>
      ) : (
        <Link href="/new-message" className="text-slate-50">
          <BiMessageRoundedAdd />
        </Link>
      )}
    </nav>
  );
};
