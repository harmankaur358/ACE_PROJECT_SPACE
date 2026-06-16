"use server";

import { prisma } from "@/lib/prisma";

export async function createInquiry(formData: FormData) {
  try {
    // Fetching all the values from form
    const firstName = formData.get("firstname") as string;
    const lastName = formData.get("lastname") as string;
    const email = formData.get("email") as string;
    const organizationInfo = formData.get("organizationName") as string;
    const projectInfo = formData.get("projectOverview") as string;

   
    // Creating inquiry in db
    await prisma.inquiry.create({
      data: {
        firstName,
        lastName,
        email,
        organizationInfo,
        projectInfo,
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