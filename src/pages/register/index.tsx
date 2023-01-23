import Input from "../../components/input";
import {
    MdAccountCircle,
    MdEmail,
    MdPassword
} from "react-icons/md";
import Link from "next/link";

const Register = () => {
    return (
        <main className="flex flex-col items-center justify-center bg-slate-900 h-screen w-screen">
            <h1 className="font-bold text-6xl text-slate-50 my-4">Quick Chat</h1>

            <Input inputType="text" placeholder="Username" icon={MdAccountCircle}/>
            <Input inputType="email" placeholder="Email" icon={MdEmail}/>
            <Input inputType="password" placeholder="Password" icon={MdPassword}/>

            <p className="text-slate-700">Already have an account? <Link href="/login" className="text-slate-50 font-bold">Sign In</Link></p>
        </main>
    );
}

export default Register;