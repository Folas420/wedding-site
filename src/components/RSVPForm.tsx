"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Music, Send, CheckCircle, Edit2, AlertCircle } from "lucide-react";
import Image from "next/image";

interface Guest {
    name: string;
    email: string | null;
    language: string;
    side: string;
    status: string;
    relation: string;
}

interface RSVPFormProps {
    guests: Guest[];
    initialGuest?: string | null;
    handleRSVPAction: (formData: FormData) => Promise<void>;
}

export default function RSVPForm({ guests, initialGuest, handleRSVPAction }: RSVPFormProps) {
    const t = useTranslations("RSVP");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
    const [isPending, startTransition] = useTransition();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    // Filter guests based on search term
    const matchedGuests = searchTerm.length >= 3
        ? guests.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : [];

    const handleSelectGuest = (guest: Guest) => {
        setSelectedGuest(guest);
        setSearchTerm(guest.name);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Save to localStorage for session persistence
        if (selectedGuest) {
            localStorage.setItem("guest_name", selectedGuest.name);
            localStorage.setItem("guest_email", selectedGuest.email || "");
        }

        startTransition(async () => {
            await handleRSVPAction(formData);
            setIsSubmitted(true);
        });
    };

    if (initialGuest && !showEdit) {
        return (
            <div className="flex flex-col items-center justify-center space-y-6 text-center py-20">
                <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-10 h-10 text-gold" />
                </div>
                <h2 className="text-4xl font-serif text-navy">{t("alreadyConfirmed")}</h2>
                <div className="space-y-4">
                    <p className="text-navy/60 font-sans">{t("editPrompt")}</p>
                    <button
                        onClick={() => setShowEdit(true)}
                        className="flex items-center gap-2 px-8 py-3 border-2 border-gold text-gold rounded-full font-bold hover:bg-gold hover:text-white transition-all uppercase tracking-widest text-sm"
                    >
                        <Edit2 size={16} />
                        {t("editAction")}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-[80vh] bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-navy/5">
            {/* Left Side: Photo */}
            <div className="lg:w-1/2 relative min-h-[400px]">
                <Image
                    src="/images/couple.jpg" // Using the existing couple image
                    alt="Aga & Rodrigo"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/40 to-transparent" />
                <div className="absolute bottom-10 left-10 text-white z-10">
                    <p className="text-gold font-bold tracking-[0.3em] uppercase mb-2">RSVP</p>
                    <h2 className="text-4xl font-serif">Aga & Rodrigo</h2>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center border-t-8 border-burgundy-deep lg:border-t-0 lg:border-l border-navy/5">
                <div className="max-w-md mx-auto w-full">
                    <h1 className="text-5xl font-serif text-navy mb-8">{t("title")}</h1>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Step 1: Search */}
                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-navy/40 uppercase tracking-[0.2em]">
                                {t("searchLabel")}
                            </label>
                            <div className="relative">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-navy/30" size={20} />
                                <input
                                    type="text"
                                    placeholder={t("searchPlaceholder")}
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        if (selectedGuest && e.target.value !== selectedGuest.name) {
                                            setSelectedGuest(null);
                                        }
                                    }}
                                    className="w-full pl-14 pr-6 py-5 bg-navy/5 border-2 border-transparent focus:border-gold rounded-3xl outline-none transition-all font-sans text-navy"
                                    required
                                />
                            </div>

                            {/* Search Results Dropdown */}
                            <AnimatePresence>
                                {matchedGuests.length > 0 && !selectedGuest && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="bg-white border border-navy/10 rounded-2xl shadow-xl overflow-hidden mt-2 z-50 absolute w-full left-0 right-0 max-h-[200px] overflow-y-auto"
                                    >
                                        {matchedGuests.map((guest) => (
                                            <button
                                                key={guest.name}
                                                type="button"
                                                onClick={() => handleSelectGuest(guest)}
                                                className="w-full px-6 py-4 text-left hover:bg-gold/5 transition-colors border-b border-navy/5 last:border-b-0 flex items-center justify-between"
                                            >
                                                <span className="font-sans font-medium text-navy">{guest.name}</span>
                                                <span className="text-[10px] bg-navy/5 px-2 py-1 rounded-full text-navy/40 uppercase">{guest.side}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <p className="text-[10px] text-navy/40 uppercase tracking-wider pl-2">
                                {t("nameHelper")}
                            </p>
                        </div>

                        {/* Step 2: Reveal */}
                        <AnimatePresence>
                            {selectedGuest && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, y: 20 }}
                                    animate={{ opacity: 1, height: "auto", y: 0 }}
                                    exit={{ opacity: 0, height: 0, y: 20 }}
                                    className="space-y-8 overflow-hidden pt-4"
                                >
                                    <input type="hidden" name="name" value={selectedGuest.name} />

                                    <div className="space-y-4">
                                        <label className="block text-xs font-bold text-navy/40 uppercase tracking-[0.2em]">
                                            {t("emailLabel")}
                                        </label>
                                        <input
                                            name="email"
                                            type="email"
                                            defaultValue={selectedGuest.email || ""}
                                            placeholder={t("emailPlaceholder")}
                                            className="w-full px-6 py-5 bg-navy/5 border-2 border-transparent focus:border-gold rounded-3xl outline-none transition-all font-sans text-navy"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="block text-xs font-bold text-navy/40 uppercase tracking-[0.2em]">
                                            {t("attendanceLabel")}
                                        </label>
                                        <div className="flex gap-4">
                                            <label className="flex-1 cursor-pointer group">
                                                <input type="radio" name="status" value="confirmed" className="peer hidden" defaultChecked />
                                                <div className="text-center py-4 rounded-2xl border-2 border-navy/5 peer-checked:border-gold peer-checked:bg-gold/5 group-hover:bg-navy/5 transition-all">
                                                    <span className="font-bold text-navy block text-sm">{t("yes")}</span>
                                                </div>
                                            </label>
                                            <label className="flex-1 cursor-pointer group">
                                                <input type="radio" name="status" value="declined" className="peer hidden" />
                                                <div className="text-center py-4 rounded-2xl border-2 border-navy/5 peer-checked:border-burgundy-deep peer-checked:bg-burgundy-deep/5 group-hover:bg-navy/5 transition-all">
                                                    <span className="font-bold text-navy/40 block text-sm">{t("no")}</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="block text-xs font-bold text-navy/40 uppercase tracking-[0.2em] flex items-center gap-2">
                                            <Music size={14} className="text-gold" />
                                            {t("songLabel")}
                                        </label>
                                        <input
                                            name="song"
                                            type="text"
                                            placeholder={t("songPlaceholder")}
                                            className="w-full px-6 py-5 bg-navy/5 border-2 border-transparent focus:border-gold rounded-3xl outline-none transition-all font-sans text-navy"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isPending || isSubmitted}
                                        className="w-full py-5 bg-gold text-white rounded-3xl font-bold text-xl uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
                                    >
                                        {isPending ? (
                                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : isSubmitted ? (
                                            <CheckCircle />
                                        ) : (
                                            <Send size={20} />
                                        )}
                                        {isPending ? t("submitting") : t("confirm")}
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Error State */}
                        {searchTerm.length >= 3 && matchedGuests.length === 0 && !selectedGuest && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-3 p-4 bg-burgundy-deep/5 rounded-2xl border border-burgundy-deep/10 text-burgundy-deep font-sans text-sm"
                            >
                                <AlertCircle size={20} />
                                {t("notFound")}
                            </motion.div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

