import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CustomSignOutButton from "@/components/signoutbutton";

export default async function AdminPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">
        Welcome ABC
      </h1>
         
       <CustomSignOutButton  />
      <p className="mt-4">
        Authentication is working successfully.
      </p>
    </main>
  );
}