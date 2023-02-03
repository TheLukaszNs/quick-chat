import MessageHeader from "../MessageHeader";

const Dashboard = () => {
  return (
    <div className="h-screen bg-slate-900">
      <MessageHeader
        name="User"
        photo={""}
        isRoom={false}
        active={21}
      ></MessageHeader>
    </div>
  );
};

export default Dashboard;
