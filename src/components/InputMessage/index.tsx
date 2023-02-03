import { ComponentPropsWithoutRef, InputHTMLAttributes, useState } from "react";
import { IconType } from "react-icons";
import Input from "./index";

type Props = ComponentPropsWithoutRef<"input"> & {
  inputType: InputHTMLAttributes<HTMLInputElement>["type"];
  icon: IconType;
  handleSend: (value: string) => void;
};

const InputValue = ({ inputType, placeholder, icon, handleSend }: Props) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        inputType={inputType}
        icon={icon}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </form>
  );
};

export default InputValue;
