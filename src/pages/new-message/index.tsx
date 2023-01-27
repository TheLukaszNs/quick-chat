import Input from "../../components/input";
import { MdSearch, MdGroup } from "react-icons/md";

const NewMessage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center bg-slate-900">
      <header className="mb-4 w-full bg-slate-800 py-6 text-center font-bold text-slate-50">
        New Message
      </header>

      <Input inputType="text" placeholder="Find User" icon={MdSearch} />
      <Input inputType="text" placeholder="Create Server" icon={MdGroup} />
    </div>
  );
};

export default NewMessage;
