import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import MessageHeader from "../../components/MessageHeader";
import MessageUser from "../../components/MessageUser";
import InputMessage from "../../components/InputMessage";
import { AiOutlineSend } from "react-icons/ai";
import type { Message } from "@prisma/client";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { useSession } from "next-auth/react";
import { useIsInitialRender } from "../../hooks/useIsInitialRender";

const Room = () => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isInitial = useIsInitialRender();

  const router = useRouter();
  const { data: sessionData } = useSession();

  const { id } = router.query;
  const userId = sessionData?.user?.id;

  const roomQuery = api.direct.getDirectRoom.useQuery(
    {
      directRoomId: id as string,
    },
    {
      enabled: !!id,
      onSettled: () => {
        void new Promise((resolve) => {
          setTimeout(() => {
            messagesContainerRef.current?.scrollTo({
              top: messagesContainerRef.current?.scrollHeight,
              behavior: isInitial ? "auto" : "smooth",
            });
            resolve(true);
          }, 100);
        });
      },
    }
  );

  const newMessageMutation = api.direct.newMessage.useMutation();
  api.direct.onMessage.useSubscription(
    {
      directRoomId: id as string,
    },
    {
      enabled: !!id,
      onData: () => {
        void roomQuery.refetch();
      },
    }
  );

  if (roomQuery.isLoading) {
    return <div>Loading...</div>;
  }

  const { data: room } = roomQuery;

  if (!room) {
    return <div>Room not found</div>;
  }

  const chatter = room.users.find((user) => user.id !== sessionData?.user?.id);

  return (
    <main className="flex h-screen w-screen flex-col overflow-hidden bg-slate-900">
      <MessageHeader
        name={chatter?.name ?? ""}
        photo={chatter?.image ?? ""}
        active={1}
        isRoom={false}
      />
      <div className="flex h-full max-h-[80%] flex-col justify-end bg-slate-900">
        <div className="overflow-y-scroll" ref={messagesContainerRef}>
          {room.messages.map((element) => {
            return (
              <MessageUser
                message={element.content}
                user={{
                  name: element.author.name,
                  image: element.author.image,
                }}
                isDm={true}
                key={element.id}
              />
            );
          })}
        </div>

        <div className="self-center">
          <InputMessage
            inputType="search"
            icon={AiOutlineSend}
            placeholder="wyslij wiadomosc"
            handleSend={(value) => {
              void newMessageMutation.mutateAsync({
                directRoomId: id as string,
                text: value,
              });
            }}
          ></InputMessage>
        </div>
      </div>
    </main>
  );
};

export default Room;
