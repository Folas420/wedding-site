"use client";

import { useLocale } from "next-intl";
import { routing, usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";

export default function LanguageToggle() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();

    const handleLanguageChange = (newLocale: string) => {
        router.replace(
            // @ts-expect-error -- Next-intl types can be tricky with dynamic params
            { pathname, params },
            { locale: newLocale }
        );
    };

    return (
        <div className="flex gap-2">
            {routing.locales.map((loc) => (
                <button
                    key={loc}
                    onClick={() => handleLanguageChange(loc)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${locale === loc
                        ? "bg-navy text-white border-navy shadow-sm"
                        : "bg-white text-navy/40 border-navy/10 hover:border-navy/40 hover:text-navy"
                        }`}
                >
                    {loc.toUpperCase()}
                </button>
            ))}
        </div>
    );
}
