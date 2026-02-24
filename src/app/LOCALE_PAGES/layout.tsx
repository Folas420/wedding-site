import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Playfair_Display, DM_Sans, Dancing_Script } from "next/font/google";
import Navbar from "@/components/Navbar";
import "../globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const scriptFont = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client-side
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${playfair.variable} ${dmSans.variable} ${scriptFont.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="min-h-screen bg-white pt-20">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
