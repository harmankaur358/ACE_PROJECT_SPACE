"use client";

import { useState } from "react";
import { inviteUser } from "./actions";

export default function UserManagementPage() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [subRole, setSubRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRoleChange = (selectedRole: string) => {
    setRole(selectedRole);
    setSubRole("");
    setError("");
  };

  const handleInvite = async () => {
    if (!email) {
      setError("Please enter an email address.");
      return;
    }
    if (!role) {
      setError("Please select a role.");
      return;
    }
    if ((role === "instructor" || role === "chair") && !subRole) {
      setError(`Please select the ${role} type.`);
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    const finalRole =
      role === "instructor" || role === "chair"
        ? `${role}_${subRole}`
        : role;

    const result = await inviteUser(email, finalRole);

    if (result.error) {
      setError(result.error);
    } else {
      setMessage(
        `Invitation sent to ${email}! They will receive an email to create their own password.`
      );
      setEmail("");
      setRole("");
      setSubRole("");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* RRC Header */}
      <div className="bg-red-700 px-8 py-4 flex items-center justify-between">
        <div>
          <p className="text-red-200 text-xs font-semibold uppercase tracking-widest">
            RRC Polytech
          </p>
          <p className="text-white text-xs">ACE Project Space</p>
        </div>
        <h1 className="text-white text-lg font-bold tracking-wide">
          User Management
        </h1>
        <div className="w-32" />
      </div>

      {/* Page Content */}
      <div className="max-w-3xl mx-auto px-8 py-10">
        <p className="text-gray-500 text-sm mb-8">
          Use this form to invite a new user to the ACE Project Space portal.
          They will receive a secure email link to create their own personal password.
        </p>

        {/* Success Message */}
        {message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm flex items-start gap-3">
            <span className="text-green-500 text-lg mt-0.5">✓</span>
            <div>
              <p className="font-semibold">Invitation Sent!</p>
              <p className="mt-0.5">{message}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg text-red-800 text-sm">
            {error}
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="h-1 bg-red-700" />
          <div className="p-8">

            {/* Email */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address <span className="text-red-700">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter the user's email address"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
              />
            </div>

            {/* Role Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Role <span className="text-red-700">*</span>
              </label>
              <div className="grid grid-cols-3 gap-4">

                {/* Client */}
                <button
                  onClick={() => handleRoleChange("client")}
                  className={`p-5 rounded-xl border-2 text-left transition-all ${
                    role === "client"
                      ? "border-red-700 bg-red-50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="text-2xl mb-2">🏢</div>
                  <p className={`font-semibold text-sm ${role === "client" ? "text-red-700" : "text-gray-700"}`}>
                    Client
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Submit and manage project nominations
                  </p>
                </button>

                {/* Instructor */}
                <button
                  onClick={() => handleRoleChange("instructor")}
                  className={`p-5 rounded-xl border-2 text-left transition-all ${
                    role === "instructor"
                      ? "border-red-700 bg-red-50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="text-2xl mb-2">👨‍🏫</div>
                  <p className={`font-semibold text-sm ${role === "instructor" ? "text-red-700" : "text-gray-700"}`}>
                    Instructor
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Review nominations and project info
                  </p>
                </button>

                {/* Chair */}
                <button
                  onClick={() => handleRoleChange("chair")}
                  className={`p-5 rounded-xl border-2 text-left transition-all ${
                    role === "chair"
                      ? "border-red-700 bg-red-50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="text-2xl mb-2">🎓</div>
                  <p className={`font-semibold text-sm ${role === "chair" ? "text-red-700" : "text-gray-700"}`}>
                    Chair
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Full access to manage users and nominations
                  </p>
                </button>
              </div>
            </div>

            {/* Instructor Sub-Role */}
            {role === "instructor" && (
              <div className="mb-6 p-5 bg-gray-50 border border-gray-200 rounded-xl">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Instructor Type <span className="text-red-700">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "technical", label: "Technical Instructor", desc: "Oversees development and cybersecurity projects" },
                    { value: "business", label: "Business Instructor", desc: "Oversees business and management projects" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSubRole(option.value)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        subRole === option.value
                          ? "border-red-700 bg-red-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${subRole === option.value ? "border-red-700" : "border-gray-300"}`}>
                          {subRole === option.value && <div className="w-2 h-2 rounded-full bg-red-700" />}
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${subRole === option.value ? "text-red-700" : "text-gray-700"}`}>
                            {option.label}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">{option.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chair Sub-Role */}
            {role === "chair" && (
              <div className="mb-6 p-5 bg-gray-50 border border-gray-200 rounded-xl">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Chair Type <span className="text-red-700">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "advisory", label: "Advisory Chair", desc: "Manages nominations and client relationships" },
                    { value: "program", label: "Program Chair", desc: "Oversees program delivery and student teams" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSubRole(option.value)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        subRole === option.value
                          ? "border-red-700 bg-red-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${subRole === option.value ? "border-red-700" : "border-gray-300"}`}>
                          {subRole === option.value && <div className="w-2 h-2 rounded-full bg-red-700" />}
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${subRole === option.value ? "text-red-700" : "text-gray-700"}`}>
                            {option.label}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">{option.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleInvite}
              disabled={loading}
              className="w-full bg-red-700 hover:bg-red-800 disabled:bg-red-300 text-white font-semibold py-3 px-4 rounded-lg text-sm transition-colors"
            >
              {loading ? "Sending Invitation..." : "Send Invitation"}
            </button>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-6 p-5 bg-white border border-gray-200 rounded-xl">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            <span className="text-red-700">ℹ</span> How it works
          </h3>
          <ul className="text-xs text-gray-500 space-y-2">
            <li className="flex items-start gap-2"><span className="text-red-700">•</span>The user receives a secure one-time sign-up link by email.</li>
            <li className="flex items-start gap-2"><span className="text-red-700">•</span>They click the link and create their own personal password.</li>
            <li className="flex items-start gap-2"><span className="text-red-700">•</span>The link expires after 7 days for security.</li>
            <li className="flex items-start gap-2"><span className="text-red-700">•</span>Once they sign up, their role is automatically assigned.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}