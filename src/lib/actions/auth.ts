"use server";

import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";

export async function loginWithEmail(email: string) {
  const sanitizedEmail = email.toLowerCase().trim();

  try {
    const { data: rsvpData, error: rsvpError } = await supabase
      .from("rsvp_responses")
      .select("guest_name")
      .eq("email", sanitizedEmail)
      .single();

    if (rsvpError || !rsvpData) {
      return { success: false, error: "Email not found" };
    }

    const guestName = rsvpData.guest_name;
    // 2. Check if this guest_name exists in poll_responses
    // We use .limit(1) as a safety check, though your names are unique
    const { data: pollData } = await supabase
    .from("poll_responses")
    .select("guest_name")
    .eq("guest_name", guestName)
    .maybeSingle();

    // If pollData is not null, they've already finished the poll
    const hasFinishedPoll = !!pollData;
    
    // Set guest_auth cookie for 60 days
    const cookieStore = await cookies();
    cookieStore.set("guest_auth", sanitizedEmail, {
      maxAge: 60 * 60 * 24 * 60, // 60 days in seconds
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return { success: true, name: guestName , redirectTo: hasFinishedPoll ? 'details' : 'poll' };
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
