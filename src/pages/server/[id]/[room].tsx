import { useRouter } from "next/router";

const ServerRoom = () => {
  const router = useRouter();

  console.log(router.query);

  return <div></div>;
};

export default ServerRoom;
