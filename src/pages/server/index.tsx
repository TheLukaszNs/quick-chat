import * as Accordion from "@radix-ui/react-accordion";
import { MessageHeader } from "../../components/MessageHeader";

const Server = () => {
  return (
    <main className="flex h-screen w-screen flex-col bg-slate-900">
      <MessageHeader name="Sample Name" photo="" isRoom active={10} />

      <Accordion.Root
        type="single"
        defaultValue="item-1"
        collapsible
      ></Accordion.Root>
    </main>
  );
};

export default Server;
