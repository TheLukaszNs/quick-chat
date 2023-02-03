import Link from "next/link";
import { MessageHeader } from "../../components/MessageHeader";
import { useRouter } from "next/router";
import { api } from "../../utils/api";

const rooms: string[] = ["room 1", "room 2", "room 3", "room 4", "room 5"];

const Server = () => {
  const { query } = useRouter();

  return (
    <main className="flex h-screen w-screen flex-col bg-slate-900">
      <MessageHeader name="Sample Name" photo="" isRoom={true} active={10} />

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
