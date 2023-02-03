import { type NextPage } from "next";
import Button from "../components/Button";
import { signIn, useSession } from "next-auth/react";
import Dashboard from "../components/Dashboard";
import type { User } from "@prisma/client";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return <Dashboard user={session.user as User} />;
  }

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-slate-900">
      <h1 className="my-4 text-6xl font-bold text-slate-50">Quick Chat</h1>

      <Button type="submit" onClick={() => void signIn()}>
        Sign In
      </Button>
    </main>
  );
};

export default Home;
