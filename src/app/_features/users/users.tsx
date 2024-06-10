"use client";

import { api } from "@searchland/trpc/react";
import { CreateUser } from "./create-user";

export function Users() {
  const users = api.users.getPaginatedUsers.useQuery();

  const deleteUser = api.users.deleteUser.useMutation({
    onSuccess: () => {
      users.refetch().catch(console.error);
    }
  });

  return (
    <div>
      <CreateUser onSuccess={() => {
        users.refetch().catch(console.error);
      }} />
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.data?.map((user) => (
                <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="text-base font-semibold">#{user.id}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="text-base font-semibold">{user.firstName} {user.lastName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-normal text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        onClick={() => {
                          deleteUser.mutate({ id: user.id });
                        }}
                      >
                        Delete user
                      </button>
                    </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}
