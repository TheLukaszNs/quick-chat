import Input from "../../components/Input";
import { MdSearch } from "react-icons/md";

const AddUser = () => {
  return (
    <main className="flex h-screen w-screen flex-col items-center bg-slate-900">
      <header className="mb-4 w-full bg-slate-800 py-6 text-center font-bold text-slate-50">
        Add User
      </header>

      <Input inputType="text" placeholder="Find User" icon={MdSearch} />
    </main>
  );
};

export default AddUser;
