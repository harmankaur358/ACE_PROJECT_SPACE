import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, role } = body;

    // Basic validation
    if (!email || !role) {
      return NextResponse.json(
        { error: "Email and role are required." },
        { status: 400 }
      );
    }

    const clerk = await clerkClient();

    // Send invitation email through Clerk
    await clerk.invitations.createInvitation({
      emailAddress: email,
      publicMetadata: { role: role },
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/sign-up`,
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("Error sending invitation:", error);

    if (error?.errors?.[0]?.code === "duplicate_record") {
      return NextResponse.json(
        { error: "An invitation was already sent to this email." },
        { status: 400 }
      );
    }

    if (error?.errors?.[0]?.code === "form_identifier_exists") {
      return NextResponse.json(
        { error: "A user with this email already exists." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send invitation. Please try again." },
      { status: 500 }
    );
  }
}