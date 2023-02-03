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
  const dms = api.direct.getAll.useQuery();

  return (
    <div className="h-screen bg-slate-900">
      <MessageHeader
        name={user.name as string}
        photo={user.image as string}
        isRoom={false}
        active={21}
      ></MessageHeader>
      {dms.data?.map((message, index) => {
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
