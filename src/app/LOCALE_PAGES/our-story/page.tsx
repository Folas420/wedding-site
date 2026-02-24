"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { AlertTriangle, Heart } from "lucide-react";

export default function OurStoryPage() {
    const t = useTranslations("OurStory");

    const storyEvents = [
        { id: 1, side: "left" as const },
        { id: 2, side: "right" as const },
        { id: 3, side: "left" as const, image: "/images/our-story/el-medano.jpg" },
        { id: 4, side: "right" as const },
        { id: 5, side: "left" as const },
        { id: 6, side: "right" as const, image: "/images/our-story/puzzles-proposal.jpg" },
        { id: 7, side: "left" as const, special: true, image: "/images/our-story/after_ring.jpg" },
        { id: 8, side: "right" as const },
    ];

    return (
        <div className="bg-[#FCFAF7] py-20 px-6 min-h-screen overflow-x-hidden">
            {/* Header */}
            <div className="max-w-4xl mx-auto text-center mb-32 pt-10">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl md:text-8xl font-serif text-navy mb-8"
                >
                    {t("title")}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-xl md:text-2xl font-sans text-gold font-bold tracking-[0.3em] uppercase"
                >
                    {t("subtitle")}
                </motion.p>
                <div className="w-24 h-1 bg-gold mx-auto mt-10 rounded-full opacity-40" />
            </div>

            <div className="relative max-w-6xl mx-auto">
                {/* Central Dashed Line (Visible on Desktop) */}
                <div className="absolute left-[30px] md:left-1/2 -translate-x-1/2 h-full w-1 border-l-2 border-dashed border-gold/30 z-0" />

                <div className="space-y-40 relative">
                    {storyEvents.map((event, index) => {
                        const isSpecial = event.special;
                        const isEven = index % 2 === 0;
                        const hasImage = !!event.image;

                        return (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-20 ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                                    }`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-[30px] md:left-1/2 -translate-x-1/2 z-20">
                                    <div className={`w-4 h-4 rounded-full border-4 border-[#FCFAF7] shadow-sm ${isSpecial ? "bg-burgundy-deep" : "bg-gold"
                                        }`} />
                                </div>

                                {/* Media Column (Only for events WITH images) */}
                                <div className={`w-full md:w-1/2 flex justify-center ${!hasImage ? "hidden md:flex opacity-0 pointer-events-none" : ""}`}>
                                    {hasImage && (
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ duration: 0.4 }}
                                            className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl group"
                                        >
                                            <img
                                                src={event.image}
                                                alt={t(`event${event.id}_title`)}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-navy/5 group-hover:bg-transparent transition-colors" />
                                        </motion.div>
                                    )}
                                    {!hasImage && <div className="w-full aspect-[4/3]" />}
                                </div>

                                {/* Text Column */}
                                <div className="w-full md:w-1/2 pl-12 md:pl-0">
                                    <div className={`
                                        relative p-10 md:p-14 rounded-[3rem] transition-all duration-500
                                        ${isSpecial
                                            ? "bg-burgundy-deep text-white shadow-[0_20px_50px_rgba(74,4,4,0.3)] scale-105"
                                            : "bg-white border border-navy/5 shadow-xl hover:shadow-2xl"
                                        }
                                    `}>
                                        <span className={`text-sm font-bold tracking-widest uppercase mb-4 block lining-nums ${isSpecial ? "text-gold" : "text-gold"
                                            }`}>
                                            {t(`event${event.id}_date`)}
                                        </span>
                                        <h3 className={`text-3xl md:text-5xl font-serif mb-6 flex items-center gap-4 ${isSpecial ? "text-white" : "text-navy"
                                            }`}>
                                            {t(`event${event.id}_title`)}
                                            {isSpecial && <AlertTriangle className="w-8 h-8 text-gold animate-pulse" />}
                                            {event.id === 6 && <Heart className="w-8 h-8 text-gold fill-gold" />}
                                        </h3>
                                        <p className={`leading-relaxed font-sans text-lg md:text-xl ${isSpecial ? "text-white/90" : "text-navy/70"
                                            }`}>
                                            {t(`event${event.id}_desc`)}
                                        </p>

                                        {/* Decorative Corner */}
                                        {!isSpecial && (
                                            <div className="absolute -bottom-2 -right-2 w-16 h-16 border-r-4 border-b-4 border-gold/10 rounded-br-[3rem]" />
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Footer Text */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-48 pb-20"
            >
                <p className="font-serif text-5xl text-navy italic opacity-20 tracking-tight">
                    {t("footer")}
                </p>
            </motion.div>
        </div>
    );
}
