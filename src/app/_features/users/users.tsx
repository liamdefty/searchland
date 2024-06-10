"use client";

import { api } from "@searchland/trpc/react";
import { CreateUser } from "./create-user";

export function Users() {
  const users = api.users.all.useQuery();

  return (
    <div>
      <CreateUser onSuccess={() => {
        users.refetch().catch(console.error);
      }} />
      {users.data?.map((user) => (
        <>
          {user.id}
        </>
      ))}
    </div>
  );
}
