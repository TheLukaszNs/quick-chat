import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"div"> & {
  serverName: string;
};

const ServerListItem = ({ serverName, ...props }: Props) => {
  return (
    <div
      className="my-4 mx-auto flex h-12 w-80 flex-row items-center justify-center rounded-2xl bg-slate-600 font-bold text-slate-50"
      {...props}
    >
      {serverName}
    </div>
  );
};

export default ServerListItem;
