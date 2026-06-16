"use server";

import { prisma } from "@/lib/prisma";

export async function createInquiry(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const organizationName = formData.get("organizationName") as string;
    const projectOverview = formData.get("projectOverview") as string;

    const [firstName, ...lastParts] = (name || "").trim().split(" ");
    const lastName = lastParts.join(" ") || "";

    await prisma.inquiry.create({
      data: {
        firstName,
        lastName,
        email,
        organizationInfo: organizationName,
        projectInfo: projectOverview,
        isRead: false,
      },
    });

    return {
      success: true,
      message: "Inquiry submitted successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to submit inquiry",
    };
  }
}