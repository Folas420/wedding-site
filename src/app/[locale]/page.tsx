import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import CountdownTimer from "@/components/CountdownTimer";

export default function HomePage() {
  const t = useTranslations("Index");

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {/* Left Column - Image (60vh on mobile, full screen on desktop) */}
      <div className="relative w-full h-[60vh] md:w-1/4 md:h-screen md:sticky md:top-0">
        <Image
          src="/images/couple-hero.jpg"
          alt="Aga & Rodrigo"
          fill
          quality={100}
          className="object-cover object-center"
          priority
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <div className="absolute inset-0 bg-burgundy-deep/10" />
      </div>

      {/* Center Column - Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-6 md:p-16 bg-[#FDFBF7] text-center relative z-10 w-full md:w-1/2">
        <div className="space-y-6 md:space-y-8 max-w-lg mx-auto">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-serif text-burgundy-deep tracking-tight leading-none">
              Aga & Rodrigo
            </h1>
            <div className="w-20 md:w-24 h-1 bg-gold mx-auto rounded-full" />
            <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3 text-lg sm:text-xl lg:text-3xl font-serif text-gold font-medium tracking-wide drop-shadow-sm mt-4 lining-nums">
              <span>{t('details_date')}</span>
              <span className="hidden md:inline">•</span>
              <span>{t('details_location')}</span>
            </div>

            <CountdownTimer targetDate="2026-08-26T16:00:00" />
          </div>

          <div className="pt-4">
            <Link
              href="/rsvp"
              className="inline-block px-10 py-4 md:px-12 md:py-5 bg-gold text-white rounded-full font-bold text-lg md:text-xl uppercase tracking-widest shadow-xl hover:bg-burgundy-deep hover:scale-105 transition-all duration-300 transform"
            >
              RSVP
            </Link>
          </div>
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="relative hidden md:block w-full md:w-1/4 h-[30vh] md:h-auto">
        <Image
          src="/images/hero-bg.jpg"
          alt="Praha Colorful Leaves Right"
          fill
          quality={100}
          className="object-cover object-center"
          priority
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <div className="absolute inset-0 bg-burgundy-deep/10" />
      </div>
    </main>
  );
}
