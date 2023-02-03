import type { User } from "@prisma/client";
import MessageHeader from "../MessageHeader";
import { api } from "../../utils/api";
import MessageUser from "../MessageUser";

type Props = {
  user: User;
};

const Dashboard = ({ user }: Props) => {
  const directRooms = api.direct.getAll.useQuery();
  const servers = api.server.getAll.useQuery();

  return (
    <div className="h-screen bg-slate-900">
      <MessageHeader
        name={user.name ?? ""}
        photo={user.image ?? ""}
        isRoom={false}
        active={21}
      ></MessageHeader>
      {directRooms.data?.map((directRoom, index) => {
        const messages = directRoom.messages;

        return (
          <MessageUser
            key={index}
            message={messages[messages.length - 1]?.content ?? ""}
            user={{
              name: "",
              image: "",
            }}
          />
        );
      })}
      {servers.data?.map((server, index) => {
        return <p key={index}>{server.name}</p>;
      })}
    </div>
  );
};

export default Dashboard;
