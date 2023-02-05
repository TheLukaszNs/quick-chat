type Props = {
  name: string;
};

export const InitialAvatar = ({ name }: Props) => {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full  bg-gradient-to-br from-slate-200 to-pink-400 font-bold shadow-md shadow-pink-300/50">
      {name?.[0]?.toUpperCase() ?? ""}
    </div>
  );
};
