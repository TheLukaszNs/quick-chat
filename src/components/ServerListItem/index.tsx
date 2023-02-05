import type { ComponentPropsWithoutRef } from "react";
import { InitialAvatar } from "../InitialAvatar";

type Props = ComponentPropsWithoutRef<"div"> & {
  serverName: string;
};

const ServerListItem = ({ serverName, ...props }: Props) => {
  return (
    <div
      className="mx-auto flex w-80 flex-row items-center gap-3 rounded-md py-2 font-bold text-slate-50"
      {...props}
    >
      <InitialAvatar name={serverName} />
      {serverName}
    </div>
  );
};

export default ServerListItem;
