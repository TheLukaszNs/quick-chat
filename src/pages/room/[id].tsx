import React, { useState } from "react";
import MessageHeader from "../../components/MessageHeader";
import MessageUser from "../../components/MessageUser";
import InputMessage from "../../components/InputMessage";
import { AiOutlineSend } from "react-icons/ai";
import { Message, User } from "@prisma/client";

const Room = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = (value: string): void => {
    if (!value) return;
    //setMessages();
  };

  return (
    <main className="flex h-screen w-screen flex-col overflow-hidden bg-slate-900">
      <MessageHeader
        name="Wiesiu Sus"
        photo={""}
        active={1}
        isRoom={false}
      ></MessageHeader>
      <div className="flex h-full max-h-[80%] flex-col justify-end bg-slate-900">
        <div className="overflow-y-scroll">
          {messages.map((element) => {
            return (
              <MessageUser
                message={element.content}
                user={{}}
                isDm={true}
                key={element.id}
              ></MessageUser>
            );
          })}
        </div>

        <div className="self-center">
          <InputMessage
            inputType="search"
            icon={AiOutlineSend}
            placeholder="wyslij wiadomosc"
            handleSend={handleSend}
          ></InputMessage>
        </div>
      </div>
    </main>
  );
};

export default Room;
