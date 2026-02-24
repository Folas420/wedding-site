"use client";

import { useTranslations } from "next-intl";
import { Calendar, Clock, MapPin, Heart, Sparkles, Footprints, Shirt, Glasses } from "lucide-react";
import { motion } from "framer-motion";

export default function DetailsPage() {
    const t = useTranslations("Details");

    const schedule = [
        {
            date: t("event1_date"),
            title: t("event1_title"),
            desc: t("event1_desc"),
            icon: <Sparkles className="text-gold" size={24} />,
        },
        {
            date: t("event2_date"),
            title: t("event2_title"),
            desc: t("event2_desc"),
            icon: <Heart className="text-burgundy" size={24} />,
        },
        {
            date: t("event3_date"),
            title: t("event3_title"),
            desc: t("event3_desc"),
            icon: <Calendar className="text-navy" size={24} />,
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="bg-white py-16 px-6 min-h-screen">
            <div className="max-w-4xl mx-auto space-y-24">
                {/* Header */}
                <header className="text-center">
                    <h1 className="text-6xl md:text-7xl font-serif text-navy mb-4 tracking-tight">
                        {t("title")}
                    </h1>
                    <div className="w-24 h-1.5 bg-gold mx-auto rounded-full" />
                </header>

                {/* Wedding Schedule */}
                <section className="space-y-12">
                    <div className="text-center">
                        <h2 className="text-4xl font-serif text-navy mb-4">{t("scheduleTitle")}</h2>
                        <div className="w-12 h-1 bg-gold/30 mx-auto rounded-full" />
                    </div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 border-l-2 border-dashed border-gold/30 hidden md:block" />

                        <div className="space-y-12">
                            {schedule.map((event, index) => {
                                // Dynamic link parsing for "Cafe Noir"
                                const renderDescription = (text: string) => {
                                    if (text.includes("Cafe Noir")) {
                                        const parts = text.split("Cafe Noir");
                                        return (
                                            <>
                                                {parts[0]}
                                                <a
                                                    href="http://maps.google.com/?q=Cafe+Noir+Zielona+Gora"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gold font-bold hover:underline inline-flex items-center gap-1"
                                                >
                                                    Cafe Noir
                                                    <MapPin size={14} />
                                                </a>
                                                {parts[1]}
                                            </>
                                        );
                                    }
                                    return text;
                                };

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                            }`}
                                    >
                                        {/* Content Card */}
                                        <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                                            <div className="bg-white p-8 rounded-[2rem] border border-navy/5 shadow-xl hover:shadow-2xl transition-shadow group">
                                                <div className={`text-gold font-bold tracking-widest text-sm mb-2 uppercase ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"} flex items-center gap-2`}>
                                                    {index % 2 === 0 && <span>{event.date}</span>}
                                                    <Clock size={14} className="opacity-50 group-hover:rotate-12 transition-transform" />
                                                    {index % 2 !== 0 && <span>{event.date}</span>}
                                                </div>
                                                <h3 className="text-2xl font-serif text-navy mb-4">{event.title}</h3>
                                                <p className="text-navy/60 leading-relaxed italic">{renderDescription(event.desc)}</p>
                                            </div>
                                        </div>

                                        {/* Icon Bubble */}
                                        <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full border-2 border-gold flex items-center justify-center shadow-lg z-10 hidden md:flex">
                                            {event.icon}
                                        </div>

                                        {/* Spacer for other side */}
                                        <div className="hidden md:block w-1/2" />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Dress Code & Kids Policy */}
                <section className="grid md:grid-cols-2 gap-8">
                    {/* Dress Code Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-navy p-10 md:p-12 rounded-[3rem] text-white space-y-8 flex flex-col items-center text-center group"
                    >
                        <div className="p-6 bg-white/10 rounded-full group-hover:bg-gold/20 transition-colors">
                            <Shirt size={48} className="text-gold" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-4xl font-serif">{t("dressCodeTitle")}</h2>
                            <div className="w-12 h-1 bg-gold mx-auto rounded-full" />
                            <p className="text-2xl font-serif italic text-white/90">
                                "{t("dressCodeText")}"
                            </p>
                        </div>
                        <div className="flex gap-4 opacity-50">
                            <Glasses size={20} />
                            <Sparkles size={20} />
                        </div>
                    </motion.div>

                    {/* Kids Policy Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-[#fff9f0] p-10 md:p-12 rounded-[3rem] border-2 border-gold/20 shadow-xl space-y-8 flex flex-col items-center text-center group"
                    >
                        <div className="p-6 bg-gold/10 rounded-full group-hover:rotate-12 transition-transform">
                            <Heart size={48} className="text-gold" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-4xl font-serif text-navy">{t("kidsTitle")}</h2>
                            <div className="w-12 h-1 bg-gold/30 mx-auto rounded-full" />
                            <p className="text-navy/70 leading-relaxed font-medium italic">
                                {t("kidsText")}
                            </p>
                        </div>
                    </motion.div>
                </section>

                {/* Comfort Alert Card - Compact full width */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 md:p-8 rounded-[2rem] border border-burgundy/10 shadow-md max-w-2xl mx-auto w-full"
                >
                    <div className="flex items-start gap-5 text-left">
                        <div className="p-3 bg-burgundy/10 rounded-2xl shrink-0">
                            <Footprints size={28} className="text-burgundy" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-serif text-navy">{t("comfortTitle")}</h3>
                            <p className="text-navy/60 leading-relaxed text-sm italic">
                                {t("comfortText")}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Gifts Section - Compact */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center py-8 border-t border-navy/5"
                >
                    <div className="max-w-xl mx-auto space-y-5">
                        <Heart size={32} className="text-gold mx-auto" />
                        <h2 className="text-3xl font-serif text-navy">{t("giftsTitle")}</h2>
                        <p className="text-base text-navy/70 leading-relaxed italic px-4 text-balance">
                            {t.rich("giftsText", {
                                strong: (chunks) => <strong className="text-navy font-bold">{chunks}</strong>
                            })}
                        </p>
                        <div className="w-20 h-0.5 bg-gold/20 mx-auto rounded-full" />
                    </div>
                </motion.section>
            </div>
        </div>
    );
}
