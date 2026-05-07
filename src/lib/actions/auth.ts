"use server";

import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";

export async function loginWithEmail(email: string) {
  const sanitizedEmail = email.toLowerCase().trim();

  try {
    const { data, error } = await supabase
      .from("rsvp_responses")
      .select("guest_name, email")
      .eq("email", sanitizedEmail)
      .single();

    if (error || !data) {
      return { success: false, error: "Email not found" };
    }

    // Set guest_auth cookie for 60 days
    const cookieStore = await cookies();
    cookieStore.set("guest_auth", sanitizedEmail, {
      maxAge: 60 * 60 * 24 * 60, // 60 days in seconds
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return { success: true, name: data.guest_name };
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
