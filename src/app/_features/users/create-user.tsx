"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { api } from "@searchland/trpc/react";
import { Input } from '@searchland/app/_components/input';

export type CreateUserProps = {
  onSuccess?: () => void;
}

const schema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
});

export function CreateUser({ onSuccess }: CreateUserProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.input<typeof schema>>({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    resolver: zodResolver(schema),
  });

  const createUser = api.users.create.useMutation({
    onSuccess,
  });

  return (
    <section className="max-w-sm">
      <h2 className="font-extrabold tracking-tight text-[2.5rem]">Create User</h2>
      <form
        onSubmit={handleSubmit((user) => {
          createUser.mutate(user);
        })}
        className="flex flex-col gap-4 my-4"
      >
        <Input
          label="First Name"
          placeholder="e.g Jane"
          {...register('firstName')}
        />
        <Input
          label="Last Name"
          placeholder="e.g Doe"
          {...register('lastName')}
        />
        <Input
          label="Email"
          placeholder="e.g jane@doe.com"
          {...register('email')}
        />
        {createUser.isError && (
          <p role="alert" className="w-full px-4 py-2 rounded-full bg-red-700">
            Error: {createUser.failureReason?.message}
          </p>
        )}
        <button
          type="submit"
          className="rounded-full px-10 py-3 font-semibold transition border"
          disabled={createUser.isPending}
        >
          {createUser.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </section>
  );
}
