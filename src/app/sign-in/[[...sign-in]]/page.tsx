import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md">
        <SignIn
         routing="path"
         path="/sign-in"
        forceRedirectUrl="/chair"
        />
      </div>
    </main>
  );
}