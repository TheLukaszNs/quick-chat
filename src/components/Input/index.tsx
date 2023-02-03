import { ComponentPropsWithoutRef, useState } from "react";
import { Component, InputHTMLAttributes } from "react";
import { IconType } from "react-icons/lib/esm/iconBase";

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
      <div className="mr-6 font-bold text-slate-50">
        <Icon />
      </div>
    </div>
  );
};

export default Input;
