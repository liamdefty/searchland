"use client";

import { api } from "@searchland/trpc/react";
import { useParams } from "next/navigation";

export default function User() {
  const params = useParams<{ id: string }>();
  const getUser = api.users.getUser.useQuery({ id: parseInt(params.id, 10) });

  const user = getUser?.data?.[0];

  if (!user) {
    return (
      <>loading...</>
    )
  }

  return (
    <>
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Users #123
      </h1>
      {user.id}
    </>
  );
}
