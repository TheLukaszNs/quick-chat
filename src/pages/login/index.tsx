import Input from "../../components/Input";
import { MdAccountCircle, MdPassword } from "react-icons/md";
import Link from "next/link";
import Button from "../../components/Button";

const Login = () => {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-slate-900">
      <h1 className="my-4 text-6xl font-bold text-slate-50">Quick Chat</h1>

      <Input inputType="text" placeholder="Username" icon={MdAccountCircle} />
      <Input inputType="password" placeholder="Password" icon={MdPassword} />

      <Button type="submit">Sign In</Button>

      <p className="text-slate-700">
        Don't have an account yet?{" "}
        <Link href="/register" className="font-bold text-slate-50">
          Sign Up
        </Link>
      </p>
    </main>
  );
};

export default Login;
