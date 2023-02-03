import { type ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"button">;

const Button = ({ children, ...props }: Props) => {
  return (
    <button
      {...props}
      className="my-4 h-16 w-80 rounded-2xl border-2 border-blue-400 text-blue-400"
    >
      {children}
    </button>
  );
};

export default Button;
