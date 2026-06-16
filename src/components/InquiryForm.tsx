"use client";

// Import statement
import { useState, useTransition } from "react";
import { createInquiry } from "@/actions/inquiryform";
 
export default function InquiryForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
 
  return (
    <form
    // Calling server action
      action={async (formData: FormData) => {
        startTransition(async () => {
          const res = await createInquiry(formData);
          setMessage(res?.message || "Submitted successfully!");
        });
      }}
      className="space-y-4 rounded-md border p-6"
    >
      {message && (
        <p className="text-sm font-medium text-slate-700">
          {message}
        </p>
      )} 
 
      <input
        name="firstname"
        placeholder="FirstName"
        className="w-full rounded border p-2"
        required
      />
      <input
        name="lastname"
        placeholder="LastName"
        className="w-full rounded border p-2"
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        className="w-full rounded border p-2"
        required
      />
 
      <input
        name="organizationName"
        placeholder="Organization"
        className="w-full rounded border p-2"
        required
      />
 
      <textarea
        name="projectOverview"
        placeholder="Project overview"
        rows={5}
        className="w-full rounded border p-2"
        required
      />
 
      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-red-700 px-4 py-2 text-white disabled:opacity-50"
      >
       { /*Managing submission status*/}
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}