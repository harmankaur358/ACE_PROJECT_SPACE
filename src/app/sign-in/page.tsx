"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    if (!isLoaded) return;

    if (!password) {
      setError("Please enter a password.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams(window.location.search);
      const ticket = params.get("__clerk_ticket");

      if (ticket) {
        const result = await signIn.create({
          strategy: "ticket",
          ticket: ticket,
        });

        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId });
          router.push("/profile");
        }
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* RRC Header */}
        <div className="bg-red-700 rounded-t-xl px-8 py-6 text-center">
          <p className="text-red-200 text-xs font-semibold uppercase tracking-widest mb-1">
            RRC Polytech
          </p>
          <h1 className="text-white text-2xl font-bold">
            ACE Project Space
          </h1>
          <p className="text-red-200 text-sm mt-1">
            Sign in to your account
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-b-xl border border-gray-200 shadow-sm px-8 py-8">

          {/* Error */}
          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Create Password <span className="text-red-700">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password <span className="text-red-700">*</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
            />
          </div>

          {/* Password Rules */}
          <div className="mb-6 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs font-semibold text-gray-600 mb-2">
              Password requirements:
            </p>
            <ul className="text-xs space-y-1">
              <li className={`flex items-center gap-2 ${password.length >= 8 ? "text-green-600" : "text-gray-400"}`}>
                <span>{password.length >= 8 ? "✓" : "•"}</span>
                At least 8 characters
              </li>
              <li className={`flex items-center gap-2 ${password && password === confirmPassword ? "text-green-600" : "text-gray-400"}`}>
                <span>{password && password === confirmPassword ? "✓" : "•"}</span>
                Passwords match
              </li>
            </ul>
          </div>

          {/* Submit */}
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="w-full bg-red-700 hover:bg-red-800 disabled:bg-red-300 text-white font-semibold py-3 rounded-lg text-sm transition-colors"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-xs text-gray-400 text-center mt-4">
            Your password is private and secure — nobody else can see it.
          </p>
        </div>
      </div>
    </div>
  );
}