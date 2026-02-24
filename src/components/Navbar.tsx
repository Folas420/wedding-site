import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { cookies } from "next/headers";
import LanguageToggle from "./LanguageToggle";
import MobileMenu from "./MobileMenu";

export default async function Navbar() {
    const t = await getTranslations("Nav");
    const isAuthenticated = (await cookies()).has("guest_email");

    const publicLinks = [
        { href: "/", label: t("home") },
        { href: "/our-story", label: t("ourStory") },
        { href: "/rsvp", label: t("rsvp") },
    ];

    const privateLinks = [
        { href: "/accommodation", label: t("accommodation") },
        { href: "/transportation", label: t("transportation") },
        { href: "/details", label: t("details") },
        { href: "/poll", label: t("poll") },
        { href: "/dictionary", label: t("dictionary") },
    ];

    const allLinks = isAuthenticated ? [...publicLinks, ...privateLinks] : publicLinks;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 text-navy">
            {/* Background Layer with Backdrop Blur - Separated to avoid 'containing block' issues for fixed children */}
            <div className="absolute inset-0 bg-white/90 backdrop-blur-md border-b border-navy/5 shadow-sm -z-10" />

            <nav className="relative z-10 max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
                {/* Monogram */}
                <Link href="/" className="group z-50 relative">
                    <span className="text-gold font-serif text-3xl font-bold tracking-[0.2em] transition-transform group-hover:scale-105 inline-block">
                        A&R
                    </span>
                </Link>

                {/* Desktop Links (Centered) - Hidden on Mobile (< md) */}
                <ul className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
                    {allLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="text-navy/70 hover:text-navy transition-colors font-sans font-semibold text-sm uppercase tracking-widest"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right Aligned: Language Toggle (Desktop) & Mobile Menu */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:block">
                        <LanguageToggle />
                    </div>
                    <MobileMenu links={allLinks} />
                </div>
            </nav>
        </header>
    );
}
