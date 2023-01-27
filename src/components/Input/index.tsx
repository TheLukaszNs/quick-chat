import { Component, InputHTMLAttributes } from "react";
import { IconType } from "react-icons/lib/esm/iconBase";

type Props = {
    inputType: InputHTMLAttributes<HTMLInputElement>["type"];
    placeholder: InputHTMLAttributes<HTMLInputElement>["placeholder"];
    icon: IconType;
}

const Input = ({inputType, placeholder, icon: Icon}: Props) => {
    return (
        <div className="w-80 h-16 bg-slate-600 rounded-2xl my-4 flex flex-row justify-between items-center">
            <input type={inputType} className="bg-inherit rounded-2xl text-slate-50 font-bold ml-6 outline-none" placeholder={placeholder}/>
            <div className="text-slate-50 font-bold mr-6">{<Icon/>}</div>
        </div>
    );
}

export default Input;