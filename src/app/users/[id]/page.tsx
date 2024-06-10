"use client";

import { useRouter } from "next/navigation";
import { api } from "@searchland/trpc/react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function User() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const getUser = api.users.getUser.useQuery({ id: parseInt(params.id, 10) });

  const deleteUser = api.users.deleteUser.useMutation({
    onSuccess: () => {
        router.push('/users')
    }
  });

  const user = getUser?.data?.[0];

  if (getUser.isLoading) {
    return (
      <>loading...</>
    )
  }

  if (!user || getUser.isError) {
    return (
      <>
      <header>
        <Link
          href="/users"
          className="rounded-full p-3 font-semibold border"
        >
          ← Back
        </Link>
        <h1 className="font-extrabold tracking-tight text-[2.5rem] mt-8">
          Not found
        </h1>
      </header>
      <section>
        <p>Sorry! We were unable to find user #{params.id}</p>
      </section>
    </>
    )
  }

  return (
    <>
      <header className="flex justify-between">
        <div>
          <Link
            href="/users"
            className="rounded-full p-3 font-semibold border"
          >
            ← Back
          </Link>
          <h1 className="font-extrabold tracking-tight text-[2.5rem] mt-8">
            User #{user.id}
          </h1>
        </div>
        <div>
          <button
            className="rounded-full p-3 font-semibold border"
            disabled={deleteUser.isPending}
            onClick={() => deleteUser.mutate({ id: user.id })}
          >
            {deleteUser.isPending ? "Removing..." : "Remove User -"}
          </button>
        </div>
      </header>
      <section>
        <table className="w-full text-sm text-left">
          <thead className="text-s uppercase bg-gray-300">
            <tr>
              <th className="px-6 py-3">
                ID
              </th>
              <th className="px-6 py-3">
                Name
              </th>
              <th className="px-6 py-3">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                <div className="text-base font-semibold">#{user.id}</div>
              </td>
              <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                <div className="text-base font-semibold">{user.firstName} {user.lastName}</div>
              </td>
              <td className="px-6 py-4">
                <div className="font-normal text-gray-500">{user.email}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
