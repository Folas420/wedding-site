import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { redirect } from "@/i18n/routing";
import { supabase } from "@/lib/supabase";
import RSVPForm from "@/components/RSVPForm";

export const revalidate = 0; // Ensure fresh data on every request

export default async function RSVPPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const cookieStore = await cookies();
    const guestCookie = cookieStore.get("guest_email")?.value;

    // Fetch guests from Supabase
    const { data: guests, error } = await supabase
        .from('guests')
        .select('*');

    if (error) {
        console.error("Error fetching guests:", error);
        // Fallback or error handling could go here
    }

    async function handleRSVPAction(formData: FormData) {
        "use server";
        const email = (formData.get("email") as string).toLowerCase().trim();
        const status = formData.get("status") as string;
        const name = formData.get("name") as string;
        const song = formData.get("song") as string;

        // Insert response into Supabase
        const { error: insertError } = await supabase
            .from('rsvp_responses')
            .insert([
                {
                    guest_name: name,
                    email: email,
                    attendance: status,
                    song_request: song
                }
            ]);

        if (insertError) {
            console.error("Error submitting RSVP:", insertError);
            throw new Error("Failed to submit RSVP");
        }

        // Also update the status in the guest list if matched (optional but good for tracking)
        await supabase
            .from('guests')
            .update({ status: status === 'confirmed' ? 'confirmed' : 'declined', email: email })
            .eq('name', name);

        if (status === "confirmed") {
            (await cookies()).set("guest_email", email, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 30, // 30 days
            });
            redirect({ href: "/accommodation", locale });
        }
    }

    return (
        <main className="min-h-screen bg-navy/5 py-12 px-4 md:px-8 flex items-center justify-center">
            <div className="max-w-6xl w-full">
                <RSVPForm
                    guests={guests || []}
                    initialGuest={guestCookie}
                    handleRSVPAction={handleRSVPAction}
                />
            </div>
        </main>
    );
}
