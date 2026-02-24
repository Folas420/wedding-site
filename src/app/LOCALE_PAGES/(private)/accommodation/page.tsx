"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Hotel, Tent, MapPin, Car, ExternalLink, Info, X, Send, CheckCircle } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function AccommodationPage() {
    const t = useTranslations("Accommodation");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const hotels = [
        {
            id: 1,
            name: t("hotel1"),
            link: "https://www.qubushotel.com/en/hotel-zielona-gora/",
            image: "/images/accommodation/image_86c3e5.jpg"
        },
        {
            id: 2,
            name: t("hotel2"),
            link: "https://amadeushotel.pl/pl/",
            image: "/images/accommodation/image_872d5b.jpg"
        },
    ];

    const handleCampingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send to an API
        setIsSubmitted(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setIsSubmitted(false);
        }, 3000);
    };

    return (
        <div className="bg-white py-16 px-6 min-h-screen">
            <div className="max-w-6xl mx-auto space-y-20">
                {/* Header */}
                <header className="text-center">
                    <h1 className="text-6xl md:text-7xl font-serif text-navy mb-4 tracking-tight">
                        {t("title")}
                    </h1>
                    <div className="w-24 h-1.5 bg-gold mx-auto rounded-full" />
                </header>

                {/* Featured Venue: Pałac Bogaczów */}
                <section className="relative overflow-hidden rounded-[3rem] border-4 border-gold shadow-2xl group">
                    <div className="grid lg:grid-cols-2">
                        <div className="relative h-[400px] lg:h-auto overflow-hidden">
                            <Image
                                src="/images/accommodation/image_86bcf6.jpg"
                                alt="Pałac Bogaczów"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                quality={100}
                            />
                            <div className="absolute inset-0 bg-navy/20" />
                        </div>
                        <div className="p-10 md:p-16 flex flex-col justify-center bg-white">
                            <span className="text-gold font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
                                {t("venueLabel")}
                            </span>
                            <h2 className="text-5xl md:text-6xl font-serif text-navy mb-6">
                                {t("venueName")}
                            </h2>
                            <p className="text-navy/70 text-lg leading-relaxed mb-8">
                                {t("venueFeatures")}
                            </p>

                            {/* Informational Note */}
                            <div className="mb-8 p-6 bg-gold/5 border-l-4 border-gold rounded-r-2xl flex gap-4 items-start shadow-sm">
                                <Info className="text-gold w-6 h-6 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="text-navy font-bold mb-1">{t("venueNoteTitle")}</p>
                                    <p className="text-navy/80 text-sm leading-relaxed italic">
                                        {t("venueNoteText")}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 py-4 border-y border-navy/5">
                                <div className="p-3 bg-gold/10 rounded-full">
                                    <MapPin className="text-gold w-6 h-6" />
                                </div>
                                <div className="flex-grow">
                                    <p className="text-navy font-bold leading-none">Bogaczów, Poland</p>
                                    <p className="text-navy/40 text-sm mt-1">Lubuskie Province</p>
                                </div>
                                <a
                                    href="https://palacbogaczow.pl/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-navy text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gold transition-all"
                                >
                                    {t("buttonView")}
                                    <ExternalLink size={14} />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Shared Apartments Section */}
                <section className="bg-white rounded-[3rem] p-10 md:p-16 border border-navy/5 shadow-xl flex flex-col md:flex-row items-center gap-10">
                    <div className="p-8 bg-gold/10 rounded-full ring-8 ring-gold/5 flex-shrink-0">
                        <Hotel className="w-16 h-16 text-gold" />
                    </div>
                    <div className="flex-grow">
                        <h2 className="text-4xl font-serif text-navy mb-4">{t("apartmentsTitle")}</h2>
                        <p className="text-navy/70 text-lg leading-relaxed mb-8">
                            {t("apartmentsText")}
                        </p>
                        <a
                            href="https://www.booking.com/Share-QamQ2n"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 border-2 border-gold text-gold rounded-2xl font-bold inline-flex items-center justify-center gap-2 hover:bg-gold hover:text-white transition-all shadow-lg shadow-gold/10"
                        >
                            <ExternalLink size={20} />
                            {t("buttonViewApartments")}
                        </a>
                    </div>
                </section>

                {/* City Hotel Grid */}
                <section className="space-y-12">
                    <div className="text-center">
                        <h2 className="text-4xl font-serif text-navy mb-4">{t("cityHotelsTitle")}</h2>
                        <div className="flex items-center justify-center gap-2 text-gold font-bold uppercase tracking-widest text-xs">
                            <Car size={16} />
                            {t("distanceLabel")}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {hotels.map((hotel) => (
                            <div key={hotel.id} className="bg-white rounded-[2.5rem] p-8 border border-navy/5 shadow-xl hover:translate-y-[-8px] transition-all duration-300 flex flex-col items-center text-center group">
                                <div className="w-full h-48 bg-navy/5 rounded-2xl mb-6 overflow-hidden relative border border-navy/5">
                                    <Image
                                        src={hotel.image}
                                        alt={hotel.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors" />
                                </div>
                                <h3 className="text-2xl font-serif text-navy mb-6 h-14 flex items-center leading-tight">{hotel.name}</h3>
                                <a
                                    href={hotel.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-4 bg-navy/5 text-navy rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gold hover:text-white transition-all group/btn"
                                >
                                    {t("buttonView")}
                                    <ExternalLink size={16} className="opacity-40 group-hover/btn:opacity-100" />
                                </a>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Camping Section */}
                <section className="bg-[#fff9f0] rounded-[3rem] p-10 md:p-16 border-2 border-gold/20 flex flex-col md:flex-row items-center gap-10">
                    <div className="p-8 bg-gold/10 rounded-full ring-8 ring-gold/5 flex-shrink-0">
                        <Tent className="w-16 h-16 text-gold" />
                    </div>
                    <div className="flex-grow">
                        <h2 className="text-4xl font-serif text-navy mb-4">{t("campingTitle")}</h2>
                        <p className="text-navy/70 text-lg leading-relaxed mb-8">
                            {t("campingText")}
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-8 py-4 border-2 border-gold text-gold rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gold hover:text-white transition-all shadow-lg shadow-gold/10"
                        >
                            <Tent size={20} />
                            {t("campingButton")}
                        </button>
                    </div>
                </section>

            </div>

            {/* Camping Request Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-[2.5rem] p-8 md:p-12 w-full max-w-lg relative z-10 shadow-3xl border border-navy/5"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 p-2 text-navy/20 hover:text-navy transition-colors"
                            >
                                <X size={24} />
                            </button>

                            {!isSubmitted ? (
                                <>
                                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                                        <Tent className="text-gold w-8 h-8" />
                                    </div>
                                    <h2 className="text-4xl font-serif text-navy mb-4">{t("campingModalTitle")}</h2>
                                    <p className="text-navy/60 mb-8">{t("campingModalDesc")}</p>

                                    <form onSubmit={handleCampingSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-navy/40 uppercase tracking-widest pl-1">Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-6 py-4 bg-navy/5 border-2 border-transparent focus:border-gold rounded-2xl outline-none transition-all"
                                                placeholder="Aga & Rodrigo"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-navy/40 uppercase tracking-widest pl-1">Email</label>
                                            <input
                                                type="email"
                                                required
                                                className="w-full px-6 py-4 bg-navy/5 border-2 border-transparent focus:border-gold rounded-2xl outline-none transition-all"
                                                placeholder="email@example.com"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full py-5 bg-navy text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:translate-y-[-2px] active:translate-y-[0] transition-all shadow-xl shadow-navy/20"
                                        >
                                            <Send size={20} />
                                            Submit Request
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="text-center py-10 space-y-6">
                                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                                        <CheckCircle className="text-green-500 w-10 h-10" />
                                    </div>
                                    <h2 className="text-4xl font-serif text-navy">Success!</h2>
                                    <p className="text-navy/60 text-lg">{t("campingSuccess")}</p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
