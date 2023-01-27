import * as Accordion from "@radix-ui/react-accordion";

const Server = () => {
  return (
    <main className="flex h-screen w-screen flex-col bg-slate-900">
      <Accordion.Root
        type="single"
        defaultValue="item-1"
        collapsible
      ></Accordion.Root>
    </main>
  );
};

export default Server;
