import Input from "../../components/input";
import {
    MdAccountCircle,
    MdPassword
} from "react-icons/md";

const Login = () => {
    return (
        <main className="flex flex-col items-center justify-center bg-slate-900 h-screen w-screen">
            <h1 className="font-bold text-6xl text-slate-50 my-4">Quick Chat</h1>

            <Input inputType="text" placeholder="Username" icon={MdAccountCircle}></Input>
            <Input inputType="password" placeholder="Password" icon={MdPassword}></Input>

            <p className="text-slate-700">Don't have an account yet? <a href="#" className="text-slate-50 font-bold">Sign Up</a></p>
        </main>
    );
}

export default Login;