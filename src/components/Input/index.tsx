import { ComponentPropsWithoutRef, useRef, useState } from "react";
import { Component, InputHTMLAttributes } from "react";
import { IconType } from "react-icons/lib/esm/iconBase";
import { string } from "zod";

type Props = ComponentPropsWithoutRef<"input"> & {
  inputType: InputHTMLAttributes<HTMLInputElement>["type"];
  icon: IconType;
  clickIconFunction?: () => void;
};
const Input = ({
  inputType,
  placeholder,
  icon: Icon,
  clickIconFunction,
  ...props
}: Props) => {
  const [value, setValue] = useState("");

  // functions that is needed to manipulate input for example to set input to empty after sending message
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const changeValue = (newValue: string): void => {
    setValue(newValue);
  };

  return (
    <div className="my-4 flex h-16 w-80 flex-row items-center justify-between rounded-2xl bg-slate-600">
      <input
        type={inputType}
        className="ml-6 rounded-2xl bg-inherit font-bold text-slate-50 outline-none"
        placeholder={placeholder}
        value={value}
        {...props}
        onChange={handleChange}
      />
      <div className="mr-6 font-bold text-slate-50">
        <Icon
          onClick={(e) => {
            clickIconFunction(e, value, changeValue);
          }}
        />
      </div>
    </div>
  );
};

export default Input;
