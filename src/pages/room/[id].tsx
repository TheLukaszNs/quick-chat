import React, { useState } from "react";
import MessageHeader from "../../components/MessageHeader";
import MessageUser from "../../components/MessageUser";
import InputMessage from "../../components/InputMessage";
import { AiOutlineSend } from "react-icons/ai";

const Room = () => {
  const [messages, setMessages] = useState([
    { id: 0, message: "blue is impostor", user: User },
    { id: 1, message: "I saw blue vent", user: User },
    { id: 2, message: "vote for blue", user: User },
  ]);

  const handleSend = (value: string): void => {
    if (!value) return;
    setMessages((prev) => [...prev, { id: 4, user: User, message: value }]);
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
                message={element.message}
                user={element.user}
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
