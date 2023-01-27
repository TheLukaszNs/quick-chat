type Props = {
  buttonText: string;
};

const Button = ({ buttonText }: Props) => {
  return (
    <button
      type="submit"
      className="my-4 h-16 w-80 rounded-2xl border-2 border-blue-400 text-blue-400"
    >
      {buttonText}
    </button>
  );
};

export default Button;
