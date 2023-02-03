import { User } from "@prisma/client";
import MessageHeader from "../MessageHeader";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import MessageUser from "../MessageUser";

type Props = {
  user: User;
};

const Dashboard = ({ user }: Props) => {
  const { query } = useRouter();
  const directRooms = api.direct.getAll.useQuery();

  return (
    <div className="h-screen bg-slate-900">
      <MessageHeader
        name={user.name ?? ""}
        photo={user.image ?? ""}
        isRoom={false}
        active={21}
      ></MessageHeader>
      {directRooms.data?.map((directRoom, index) => {
        return (
          <MessageUser
            key={index}
            message="Ostatnia wiadomość"
            user={"User 1"}
          />
        );
      })}
    </div>
  );
};

export default Dashboard;
