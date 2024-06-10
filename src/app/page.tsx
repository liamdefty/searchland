import Link from "next/link";

export default async function Home() {
  return (
    <>
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] mb-8">
        Searchland
      </h1>
      <div className="grid grid-cols-1sm:grid-cols-2">
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
          href="/users"
          target="_blank"
        >
          <h3 className="text-2xl font-bold">Users →</h3>
          <div className="text-lg">
            Find, manage and create users
          </div>
        </Link>
      </div>
    </>
  );
}
