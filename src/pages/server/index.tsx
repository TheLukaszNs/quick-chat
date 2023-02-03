import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";
import { MessageHeader } from "../../components/MessageHeader";
import { MdArrowDropDown, MdAdd } from "react-icons/md";

const sections = [
  {
    name: "General",
    rooms: [
      {
        name: "Room 1",
      },
      {
        name: "Room 2",
      },
      {
        name: "Room 3",
      },
    ],
  },
  {
    name: "DEV",
    rooms: [
      {
        name: "Room 1",
      },
      {
        name: "Room 2",
      },
      {
        name: "Room 3",
      },
    ],
  },
  {
    name: "Games",
    rooms: [
      {
        name: "Room 1",
      },
      {
        name: "Room 2",
      },
      {
        name: "Room 3",
      },
    ],
  },
];

const Server = () => {
  return (
    <main className="flex h-screen w-screen flex-col bg-slate-900">
      <MessageHeader name="Sample Name" photo="" isRoom={true} active={10} />

      <Accordion.Root type="multiple" className="mx-6">
        {sections.map((section, index) => {
          return (
            <Accordion.Item
              key={index}
              value={`item-${index}`}
              className="my-2"
            >
              <Accordion.Header>
                <Accordion.Trigger className=" flex w-full flex-row items-center justify-between text-base font-bold uppercase text-slate-50">
                  <div className="flex flex-row items-center">
                    <MdArrowDropDown />
                    {section.name}
                  </div>
                  <MdAdd />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content>
                {section.rooms.map((room, index) => {
                  return (
                    <div key={index}>
                      <Link
                        href="#"
                        key={index}
                        className="my-3 text-xs lowercase text-slate-50"
                      >{`#${room.name}`}</Link>
                    </div>
                  );
                })}
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </main>
  );
};

export default Server;
