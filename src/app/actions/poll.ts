"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function savePollResponse(formData: {
    guest_name: string;
    dietary: string;
    arrival_date: string;
    attendance: string[];
    alcohol: string[];
    accommodation_pref: string;
    stay_pref: string;
}) {
    const { error } = await supabase
        .from('poll_responses')
        .upsert([
            {
                guest_name: formData.guest_name,
                dietary: formData.dietary,
                arrival_date: formData.arrival_date,
                attendance: formData.attendance,
                alcohol: formData.alcohol,
                accommodation_pref: formData.accommodation_pref,
                stay_pref: formData.stay_pref
            }
                ],
                { onConflict: 'guest_name' }
                );

    if (error) {
        console.error("Error saving poll response:", error);
        throw new Error("Failed to save your preferences. Please try again.");
    }

    revalidatePath("/[locale]/(private)/poll", "page");
    return { success: true };
}
