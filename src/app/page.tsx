import Link from "next/link";

import { CreateUser } from "@searchland/app/_components/create-user";
import { Users } from "./_components/users";
// import { api } from "@searchland/trpc/server";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Searchland Users
        </h1>
        <Users />
        <div className="w-full max-w-xs">
          <CreateUser />
        </div>
      </div>
    </main>
  );
}

async function CrudShowcase() {
  return (
    <div className="w-full max-w-xs">
      <CreateUser />
    </div>
  );
}
