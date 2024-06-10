import { Users as UsersComponent } from "@searchland/app/_features/users/users"

export default async function Users() {
  return (
    <>
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Users
      </h1>
      <UsersComponent />
    </>
  );
}
