import Link from "next/link";
import { useRouter } from "next/router";
import { MessageHeader } from "../../../components/MessageHeader";
import { api } from "../../../utils/api";

const Server = () => {
  const router = useRouter();
  const { id } = router.query;
  const thisServer = api.server.getServer.useQuery({ id: id as string });
  const rooms = thisServer.data?.rooms;

  return (
    <main className="flex h-screen w-screen flex-col bg-slate-900">
      <MessageHeader
        name={thisServer.data?.name as string}
        photo=""
        isRoom={true}
        active={thisServer.data?.users.length}
        serverId={id as string}
      />

      <div className="flex flex-col gap-6 font-bold">
        {rooms?.map((room, index) => {
          return (
            <Link
              href={`/server/${id as string}/${room.id}`}
              key={index}
              className="mx-4 lowercase text-slate-50"
            >
              {`#${room.name}`}
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default Server;
