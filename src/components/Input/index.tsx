import type { InputHTMLAttributes, ComponentPropsWithoutRef } from "react";
import type { IconType } from "react-icons";

type Props = ComponentPropsWithoutRef<"input"> & {
  inputType: InputHTMLAttributes<HTMLInputElement>["type"];
  icon: IconType;
};
const Input = ({ inputType, placeholder, icon: Icon, ...props }: Props) => {
  return (
    <div className="my-4 flex h-16 w-80 flex-row items-center justify-between rounded-2xl bg-slate-600">
      <input
        type={inputType}
        className="ml-6 rounded-2xl bg-inherit font-bold text-slate-50 outline-none"
        placeholder={placeholder}
        {...props}
      />
      <button
        type="submit"
        className="mr-2 rounded-full p-4 font-bold text-slate-50"
      >
        <Icon />
      </button>
    </div>
  );
};

export default Input;
