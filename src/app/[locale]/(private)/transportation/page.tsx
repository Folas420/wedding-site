"use client";

import { useTranslations } from "next-intl";
import { Plane, Train, ExternalLink, MapPin, Clock, ArrowRight, Info } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TransportationPage() {
    const t = useTranslations("Transportation");

    const internationalAirports = [
        {
            name: "Poznań Airport",
            code: "POZ",
            time: t("pozDetail"),
            link: "https://www.google.com/flights?q=flights+to+POZ",
            image: "https://lh3.googleusercontent.com/p/AF1QipOpYwrgqWQiOsWBx5aufuyjooCyslBBXV6l9iez=w1099-h1000-k-no"
        },
        {
            name: "Port Lotniczy Wrocław S.A.",
            code: "WRO",
            time: t("wroDetail"),
            link: "https://www.google.com/flights?q=flights+to+WRO",
            image: "https://lh3.googleusercontent.com/p/AF1QipNp-pcFlF93mHyrMeBt50beAHW42GfAGBFyHILd=w1497-h1000-k-no"
        },
        {
            name: "Berlin Brandenburg Airport",
            code: "BER",
            time: t("berDetail"),
            link: "https://www.google.com/flights?q=flights+to+BER",
            image: "https://lh3.googleusercontent.com/p/AF1QipOcQxn3ilJUdre4k0zpE1ZCFfOxfg_7LKfIVde3=w1500-h1000-k-no"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
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

                {/* Interactive Map */}
                <section className="relative w-full h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-navy/5">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d625000.4937565076!2d14.820733299999999!3d51.935577699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470f0000000001cf%3A0x4292f9c2e2b6c20!2sPa%C5%82ac%20Bogacz%C3%B3w!5e0!3m2!1sen!2spl!4v1707600000000!5m2!1sen!2spl&maptype=roadmap"
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: 'grayscale(100%) contrast(1.1)' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="hover:grayscale-0 transition-all duration-700"
                    ></iframe>
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gold/20 flex items-center gap-3">
                        <div className="p-2 bg-gold/10 rounded-full">
                            <MapPin className="text-gold w-5 h-5" />
                        </div>
                        <p className="text-navy font-bold text-sm">Venue & Travel Hubs</p>
                    </div>
                    <div className="absolute bottom-6 right-6 bg-burgundy/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-gold/30">
                        <p className="text-white text-xs font-medium">📍 Pałac Bogaczów</p>
                    </div>
                </section>

                {/* Major Gateways */}
                <section className="space-y-12">
                    <div className="text-center">
                        <h2 className="text-4xl font-serif text-navy mb-4">{t("gatewaysTitle")}</h2>
                        <p className="text-navy/60 max-w-2xl mx-auto">{t("gatewaysSubtitle")}</p>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {internationalAirports.map((airport) => (
                            <motion.div
                                key={airport.code}
                                variants={itemVariants}
                                className="bg-white rounded-[2.5rem] overflow-hidden border border-navy/5 shadow-xl hover:translate-y-[-8px] transition-all duration-300 flex flex-col group"
                            >
                                <div className="relative h-[200px] overflow-hidden">
                                    <Image
                                        src={airport.image}
                                        alt={airport.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 left-6">
                                        <div className="text-gold font-bold tracking-widest text-xs mb-1 uppercase opacity-80">{airport.code}</div>
                                        <h3 className="text-xl font-serif text-white leading-tight">{airport.name}</h3>
                                    </div>
                                    <div className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md rounded-xl text-white">
                                        <Plane size={18} />
                                    </div>
                                </div>

                                <div className="p-8 space-y-6 flex flex-col flex-grow">
                                    <div className="flex items-start gap-3 text-navy/60 text-sm flex-grow">
                                        <Clock size={16} className="mt-0.5 text-gold flex-shrink-0" />
                                        <span>{airport.time}</span>
                                    </div>

                                    <a
                                        href={airport.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-4 bg-navy text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gold transition-all group/btn shadow-lg shadow-navy/10"
                                    >
                                        <span className="relative z-10">{t("findFlights")}</span>
                                        <ExternalLink size={16} className="relative z-10 opacity-60 group-hover/btn:opacity-100" />
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>


                {/* Domestic Connection - Warsaw to IEG */}
                <section className="space-y-12">
                    <div className="text-center">
                        <h2 className="text-4xl font-serif text-navy mb-4">{t("domesticTitle")}</h2>
                        <p className="text-navy/60 max-w-2xl mx-auto">Direct flights from Warsaw to Zielona Góra</p>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-2xl mx-auto"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-[2.5rem] overflow-hidden border border-gold/20 shadow-2xl shadow-gold/10 hover:translate-y-[-8px] hover:shadow-gold/20 transition-all duration-300 flex flex-col group"
                        >
                            <div className="relative h-[200px] overflow-hidden">
                                <Image
                                    src="https://lh3.googleusercontent.com/gps-cs-s/AHVAwepO6bTWVySgKyk56fY7FEm3mV4Q1KInMiJcnzHSbB9NRA6v5qayw3ykqoxXn9pbDGwOVxaUTI-v-gWVsHDqFq9PBWQp_YzmwfWoBx2KSlveuadjqIHuYgvhVhjU9yr5nOCFbc8MXA=w1333-h1000-k-no"
                                    alt="Warsaw Chopin Airport to Zielona Góra"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 896px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-6">
                                    <div className="text-gold font-bold tracking-widest text-xs mb-2 uppercase opacity-90 flex items-center gap-2">
                                        <span>WAW</span>
                                        <span className="flex items-center gap-1">
                                            <span className="inline-block w-3 h-0.5 bg-gold/60"></span>
                                            <Plane size={12} className="-rotate-45" />
                                            <span className="inline-block w-3 h-0.5 bg-gold/60"></span>
                                        </span>
                                        <span>IEG</span>
                                    </div>
                                    <h3 className="text-xl font-serif text-white leading-tight">Warsaw (WAW) → Zielona Góra (IEG)</h3>
                                </div>
                                <div className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md rounded-xl text-white">
                                    <Plane size={18} />
                                </div>
                            </div>

                            <div className="p-8 space-y-6 flex flex-col flex-grow">
                                <div className="flex items-start gap-3 text-navy/80 text-base flex-grow space-y-4">
                                    <div className="flex flex-col gap-4 w-full">
                                        <div className="flex items-start gap-3">
                                            <Plane size={18} className="mt-0.5 text-gold flex-shrink-0" />
                                            <span>
                                                For those traveling from Chopin Warsaw Airport (WAW), there are <strong className="text-navy font-bold">2 daily flights</strong> directly to Zielona Góra-Babimost (IEG). This local airport is only 34 km from the city center.
                                            </span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <MapPin size={18} className="mt-0.5 text-gold flex-shrink-0" />
                                            <span className="italic text-navy/60">{t("iegDistance")}</span>
                                        </div>
                                    </div>
                                </div>

                                <a
                                    href="https://www.google.com/travel/flights?q=Flights%20to%20IEG%20from%20WAW"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-4 bg-navy text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gold transition-all group/btn shadow-lg shadow-navy/10"
                                >
                                    <span className="relative z-10">{t("findFlights")}</span>
                                    <ExternalLink size={16} className="relative z-10 opacity-60 group-hover/btn:opacity-100" />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Rail Travel */}
                <section className="bg-[#fff9f0] rounded-[3rem] p-10 md:p-16 border-2 border-gold/20 flex flex-col md:flex-row items-center gap-12 shadow-xl">
                    <div className="p-8 bg-gold/10 rounded-full ring-8 ring-gold/5 flex-shrink-0 animate-pulse">
                        <Train className="w-16 h-16 text-gold" />
                    </div>
                    <div className="space-y-8 flex-grow">
                        <div>
                            <h2 className="text-4xl font-serif text-navy mb-4">{t("railTitle")}</h2>
                            <p className="text-navy/70 text-xl leading-relaxed max-w-2xl font-serif italic">
                                {t("railInstructions")}
                            </p>
                        </div>
                        <a
                            href="https://portalpasazera.pl/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-4 bg-navy text-white px-10 py-5 rounded-2xl font-bold hover:bg-gold hover:translate-x-2 transition-all shadow-xl shadow-navy/30 group"
                        >
                            {t("railButton")}
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}
