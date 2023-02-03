import React from "react";
import MessageHeader from "../../components/MessageHeader";
import MessageUser from "../../components/MessageUser";
import Input from "../../components/Input";
import { AiOutlineSend } from "react-icons/ai";

const Room = () => {
  return (
    <main className="flex h-screen w-screen flex-col items-center bg-slate-900">
      <div className="overflow-hidden">
        <MessageHeader
          name="Wiesiu Sus"
          photo={""}
          active={1}
          isRoom={false}
        ></MessageHeader>
      </div>

      <div className="absolute bottom-5">
        <Input
          inputType="search"
          icon={AiOutlineSend}
          placeholder="Wpisz Wiadomość"
        ></Input>
      </div>
    </main>
  );
};

export default Room;
