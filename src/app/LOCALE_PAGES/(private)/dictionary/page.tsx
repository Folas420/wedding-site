import { useTranslations } from "next-intl";
import { Download, Languages, BookText } from "lucide-react";

export default function DictionaryPage() {
    const t = useTranslations("Nav");

    return (
        <div className="bg-cream py-16 px-6 min-h-screen">
            <div className="max-w-4xl mx-auto space-y-16">
                <header className="text-center space-y-6">
                    <div className="inline-flex py-3 px-6 bg-crimson/5 rounded-full border border-crimson/10 items-center gap-3 text-crimson font-bold uppercase tracking-widest text-xs">
                        <Languages size={14} />
                        {t("dictionary")}
                    </div>
                    <h1 className="text-6xl md:text-7xl font-serif text-burgundy tracking-tight">
                        {t("dictTitle")}
                    </h1>
                    <div className="w-24 h-1.5 bg-gold mx-auto rounded-full" />
                    <p className="text-burgundy/60 italic text-xl max-w-lg mx-auto leading-relaxed">
                        &ldquo;{t("dictTagline")}&rdquo;
                    </p>
                </header>

                <div className="bg-white rounded-[3rem] shadow-2xl border border-gold/10 overflow-hidden group">
                    <div className="p-10 md:p-16 flex flex-col items-center text-center space-y-10">
                        <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-500">
                            <BookText size={48} />
                        </div>

                        <div className="space-y-4 max-w-xl">
                            <h3 className="text-3xl font-serif text-burgundy">{t("dictTitle")}</h3>
                            <p className="text-burgundy/70 leading-relaxed text-lg">
                                {t("dictDesc")}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-sm">
                            <a
                                href="/docs/dictionary.pdf"
                                download
                                className="flex-1 inline-flex items-center justify-center gap-4 px-10 py-5 bg-gold text-white rounded-2xl font-bold text-lg hover:bg-crimson transition-all duration-300 shadow-xl shadow-gold/20"
                            >
                                <Download size={24} />
                                {t("buttonDownload")}
                            </a>
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 pt-4">
                            {["Polski", "Español", "English"].map(lang => (
                                <span key={lang} className="px-5 py-2 bg-burgundy/5 rounded-full text-burgundy/50 text-xs font-bold uppercase tracking-widest">
                                    {lang}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* PDF Preview Area */}
                    <div className="bg-burgundy/5 p-4 md:p-8 border-t border-gold/10">
                        <div className="aspect-[4/5] md:aspect-video bg-white rounded-2xl shadow-inner border border-gold/5 overflow-hidden relative">
                            <iframe
                                src="/docs/dictionary.pdf#toolbar=0"
                                className="w-full h-full"
                                title="Dictionary Preview"
                            />
                            {/* Hover overlay hint */}
                            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-white text-center text-sm font-medium">Scroll to preview the dictionary</p>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="text-center">
                    <p className="text-burgundy/30 font-serif text-lg italic">
                        {t("dictFooter")}
                    </p>
                </footer>
            </div>
        </div>
    );
}
