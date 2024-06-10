"use client";

import Link from "next/link";
import { api } from "@searchland/trpc/react";
import { Pagination } from "@searchland/app/_components/pagination";
import { useState } from "react";

export default function Users() {
  const [page, setPage] = useState(1);

  const users = api.users.getPaginatedUsers.useQuery({
    page,
  });

  return (
    <>
      <header className="flex justify-between mb-8">
        <div>
          <Link
            href="/"
            className="rounded-full p-3 font-semibold border"
          >
            ← Back
          </Link>
          <h1 className="font-extrabold tracking-tight text-[2.5rem] mt-8">
            Users
          </h1>
        </div>
        <div>
          <Link
            href="/users/create"
            className="rounded-full p-3 font-semibold border"
          >
            Add User +
          </Link>
        </div>
      </header>
      <section className="relative overflow-x-auto sm:rounded-lg">
      {users.isLoading ? <>Loading...</> : (
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
              <th className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.data?.items?.map((user) => (
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
                <td className="px-6 py-4 gap-4 flex">
                  <Link className="font-medium hover:underline" href={`/users/${user.id}`}>Manage</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
        {users?.data && (
          <Pagination
            currentPage={page}
            totalPages={users.data?.totalPages}
            pageRange={2}
            marginRange={2}
            onPageChange={setPage}
          />
        )}
      </section>
    </>
  );
}
