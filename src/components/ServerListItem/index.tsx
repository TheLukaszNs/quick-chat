import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"button"> & {
  serverName: string;
};

const ServerListItem = ({ serverName, ...props }: Props) => {
  return <button {...props}>{serverName}</button>;
};

export default ServerListItem;
