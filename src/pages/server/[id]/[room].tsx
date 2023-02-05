import { useRouter } from "next/router";
import MessageHeader from "../../../components/MessageHeader";
import MessageUser from "../../../components/MessageUser";
import InputMessage from "../../../components/InputMessage";
import { api } from "../../../utils/api";
import { AiOutlineSend } from "react-icons/ai";
import { useRef } from "react";
import { useIsInitialRender } from "../../../hooks/useIsInitialRender";

const ServerRoom = () => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isInitial = useIsInitialRender();

  const router = useRouter();
  const { room: id } = router.query;

  const roomQuery = api.room.getRoom.useQuery(
    { id: id as string },
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

  const newMessageMutation = api.room.newMessage.useMutation();
  api.room.onNewMessage.useSubscription(
    {
      roomId: id as string,
    },
    {
      enabled: !!id,
      onData: () => {
        void roomQuery.refetch();
      },
    }
  );

  if (roomQuery.isLoading) return <div>Loading...</div>;

  const { data: room } = roomQuery;

  return (
    <main className="flex h-screen w-screen flex-col bg-slate-900">
      <MessageHeader
        isRoom
        name={roomQuery.data?.name as string}
        photo=""
        active={0}
      />
      <div className="overflow-auto" ref={messagesContainerRef}>
        {room?.messages?.map((element) => {
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

      <div className="mt-auto self-center">
        <InputMessage
          inputType="search"
          icon={AiOutlineSend}
          placeholder="Send message"
          handleSend={(value) => {
            void newMessageMutation.mutateAsync({
              roomId: id as string,
              text: value,
            });
          }}
        ></InputMessage>
      </div>
    </main>
  );
};

export default ServerRoom;
