import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"div"> & {
  serverName: string;
};

const ServerListItem = ({ serverName, ...props }: Props) => {
  return (
    <div className="font-bold text-slate-50" {...props}>
      {serverName}
    </div>
  );
};

export default ServerListItem;
