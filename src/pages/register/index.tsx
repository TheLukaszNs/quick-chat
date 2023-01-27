import Input from "../../components/Input";
import { MdAccountCircle, MdEmail, MdPassword } from "react-icons/md";
import Link from "next/link";
import Button from "../../components/Button";

const Register = () => {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-slate-900">
      <h1 className="my-4 text-6xl font-bold text-slate-50">Quick Chat</h1>

      <Input inputType="text" placeholder="Username" icon={MdAccountCircle} />
      <Input inputType="email" placeholder="Email" icon={MdEmail} />
      <Input inputType="password" placeholder="Password" icon={MdPassword} />

      <Button type="submit">Sign Up</Button>

      <p className="text-slate-700">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-slate-50">
          Sign In
        </Link>
      </p>
    </main>
  );
};

export default Register;
