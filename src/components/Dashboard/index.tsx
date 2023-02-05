import type { User } from "@prisma/client";
import MessageHeader from "../MessageHeader";
import { api } from "../../utils/api";
import MessageUser from "../MessageUser";
import ServerListItem from "../ServerListItem";
import Link from "next/link";

type Props = {
  user: User;
};

const Dashboard = ({ user }: Props) => {
  const directRooms = api.direct.getAll.useQuery();
  const servers = api.server.getAll.useQuery();

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-900">
      <MessageHeader
        name={user.name ?? ""}
        photo={user.image ?? ""}
        isRoom={false}
        active={21}
      ></MessageHeader>
      <div className="flex h-full flex-col gap-6 overflow-y-scroll pb-4">
        {directRooms.data?.map((directRoom, index) => {
          const messages = directRoom.messages;

          return (
            <Link key={index} href={`/room/${directRoom.id}`}>
              <MessageUser
                message={messages[messages.length - 1]?.content ?? ""}
                user={directRoom.users[0]}
                isDm
              />
            </Link>
          );
        })}
        {servers.data?.map((server, index) => {
          return (
            <Link key={index} href={`/server/${server.id}`}>
              <ServerListItem serverName={server.name} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
