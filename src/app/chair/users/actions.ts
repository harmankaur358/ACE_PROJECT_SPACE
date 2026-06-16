"use server";

import { clerkClient } from "@clerk/nextjs/server";

export async function inviteUser(email: string, role: string) {
  try {
    const clerk = await clerkClient();

    await clerk.invitations.createInvitation({
      emailAddress: email,
      publicMetadata: { role: role },
      redirectUrl: "http://localhost:3000/sign-in",
      ignoreExisting: true,
    });

    return { success: true };

  } catch (error: any) {
    console.error("Clerk invitation error:", JSON.stringify(error?.errors, null, 2));

    if (error?.errors?.[0]?.code === "duplicate_record") {
      return { error: "Invitation already sent to this email." };
    }

    if (error?.errors?.[0]?.code === "form_identifier_exists") {
      return { error: "A user with this email already exists." };
    }

    if (error?.errors?.[0]?.code === "not_allowed_access") {
      return { error: "Invitations are not enabled. Please contact your administrator." };
    }

    return { 
      error: error?.errors?.[0]?.message || error?.message || "Failed to send invitation."
    };
  }
}