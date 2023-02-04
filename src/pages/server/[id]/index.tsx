import Link from "next/link";
import { useRouter } from "next/router";
import { MessageHeader } from "../../../components/MessageHeader";

const rooms: string[] = ["room 1", "room 2", "room 3", "room 4", "room 5"];

const Server = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <main className="flex h-screen w-screen flex-col bg-slate-900">
      <MessageHeader
        name="Sample Name"
        photo=""
        isRoom={true}
        active={10}
        serverId={id as string}
      />

      {rooms.map((room, index) => {
        return (
          <Link
            href="/message"
            key={index}
            className="mx-4 lowercase text-slate-50"
          >
            {`#${room}`}
          </Link>
        );
      })}
    </main>
  );
};

export default Server;
