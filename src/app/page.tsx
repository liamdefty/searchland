import Link from "next/link";

export default async function Home() {
  return (
    <>
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] mb-8">
        Searchland
      </h1>
      <div className="grid grid-cols-1sm:grid-cols-2">
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl border p-4"
          href="/users"
        >
          <h3 className="text-2xl font-bold">Users →</h3>
          <div className="text-lg">
            Add, delete and view users
          </div>
        </Link>
      </div>
    </>
  );
}
