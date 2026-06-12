"use client";

import { useState } from "react";

export default function UserManagementPage() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("client");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInvite = async () => {
    if (!email) {
      setError("Please enter an email address.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/users/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setMessage(`Invitation sent to ${email} successfully!`);
      setEmail("");
      setRole("client");
    } catch (err) {
      setError("Failed to send invitation. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">User Management</h1>
      <p className="text-gray-500 text-sm mb-8">
        Invite users to the ACE Project Space portal by entering their email and selecting a role.
      </p>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-5">Invite a New User</h2>

        {/* Success Message */}
        {message && (
          <div className="mb-5 p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
            {message}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Email Field */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter user email"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Role Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="client">Client</option>
            <option value="instructor">Instructor</option>
            <option value="chair">Chair</option>
          </select>
          <p className="text-xs text-gray-400 mt-1">
            {role === "client" && "Clients can submit and manage project nominations."}
            {role === "instructor" && "Instructors can view nominations and access project information."}
            {role === "chair" && "Chairs have full access to manage users and all nominations."}
          </p>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleInvite}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors"
        >
          {loading ? "Sending..." : "Send Invite"}
        </button>
      </div>

      {/* Info box */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
        <h3 className="text-sm font-semibold text-blue-800 mb-1">How it works</h3>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• The user will receive an email with a secure one-time sign-up link.</li>
          <li>• The link expires after 7 days.</li>
          <li>• Once they sign up, their role will be assigned automatically.</li>
        </ul>
      </div>
    </div>
  );
}