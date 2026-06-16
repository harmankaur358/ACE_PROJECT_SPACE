"use client";

import { SignOutButton } from "@clerk/nextjs";

export default function CustomSignOutButton() {
  return (
    <SignOutButton redirectUrl="/">
      <button className="rounded-md bg-red-700 px-4 py-2 font-semibold text-white hover:bg-red-800">
        Sign Out
      </button>
    </SignOutButton>
  );
}