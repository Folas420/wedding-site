"use client";

import { useState, useEffect, useTransition, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { savePollResponse } from "@/app/actions/poll";
import {
    CalendarCheck,
    Beer,
    CheckCircle2,
    User,
    ArrowRight,
    UtensilsCrossed,
    CalendarDays,
    Wine,
    GlassWater,
    Drumstick,
    Waves,
    Check,
    Hotel
} from "lucide-react";

// Custom icons to better represent the requested glass types
const ShotGlass = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width="24" height="24">
        <path d="M7 21h10" />
        <path d="M7 3l1 18h8l1-18H7z" />
        <path d="M8 7h8" />
    </svg>
);

const HurricaneGlass = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width="24" height="24">
        <path d="M7 21h10" />
        <path d="M12 17v4" />
        <path d="M8 3c0 4 2 6 2 9s-2 3-2 5h8c0-2-2-2-2-5s2-5 2-9H8z" />
    </svg>
);

const RocksGlass = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width="24" height="24">
        <path d="M6 3l1 18h10l1-18H6z" />
        <path d="M6 8h12" />
        <path d="M7 16h10" />
    </svg>
);

export default function PollPage() {
    const t = useTranslations("Poll");
    const [userName, setUserName] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        dietary: "",
        arrivalDate: "",
        attendance: [] as string[],
        alcohol: [] as string[],
        accommodationPref: "",
        stayPref: ""
    });

    useEffect(() => {
        const storedName = localStorage.getItem("guest_name");
        const storedEmail = localStorage.getItem("guest_email");
        if (storedName) {
            setUserName(storedName);
            setFormData(prev => ({ ...prev, name: storedName }));
        } else if (storedEmail) {
            setUserName(storedEmail);
            setFormData(prev => ({ ...prev, name: storedEmail }));
        }
    }, []);

    const attendanceOptions = [
        { id: "day1", label: t("attendanceDay1") },
        { id: "day2", label: t("attendanceDay2") },
        { id: "day3", label: t("attendanceDay3") }
    ];

    const alcoholOptions = [
        { id: "vodka", label: t("alcoholVodka"), icon: <ShotGlass /> },
        { id: "rum", label: t("alcoholRum"), icon: <HurricaneGlass /> },
        { id: "whisky", label: t("alcoholWhisky"), icon: <RocksGlass /> },
        { id: "beer", label: t("alcoholBeer"), icon: <Beer size={24} /> },
        { id: "wine", label: t("alcoholWine"), icon: <Wine size={24} /> },
        { id: "non-alc", label: t("alcoholNonAlc"), icon: <GlassWater size={24} /> }
    ];

    const toggleAllAttendance = () => {
        const allLabels = attendanceOptions.map(opt => opt.label);
        const isAllSelected = allLabels.every(label => formData.attendance.includes(label));

        setFormData(prev => ({
            ...prev,
            attendance: isAllSelected ? [] : allLabels
        }));
    };

    const toggleAttendance = (option: string) => {
        setFormData(prev => ({
            ...prev,
            attendance: prev.attendance.includes(option)
                ? prev.attendance.filter(a => a !== option)
                : [...prev.attendance, option]
        }));
    };

    const toggleAlcohol = (option: string) => {
        setFormData(prev => ({
            ...prev,
            alcohol: prev.alcohol.includes(option)
                ? prev.alcohol.filter(a => a !== option)
                : [...prev.alcohol, option]
        }));
    };

    const datePickerRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        startTransition(async () => {
            try {
                await savePollResponse({
                    guest_name: formData.name,
                    dietary: formData.dietary,
                    arrival_date: formData.arrivalDate,
                    attendance: formData.attendance,
                    alcohol: formData.alcohol,
                    accommodation_pref: formData.accommodationPref,
                    stay_pref: formData.stayPref
                });
                setIsSubmitted(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            }
        });
    };

    if (isSubmitted) {
        return (
            <div className="bg-white min-h-screen py-24 px-6 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full text-center space-y-8"
                >
                    <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto shadow-inner">
                        <CheckCircle2 className="text-green-500 w-12 h-12" />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-4xl font-serif text-navy">Success!</h2>
                        <p className="text-navy/60 text-lg leading-relaxed">
                            {t("successMessage")}
                        </p>
                    </div>
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-gold font-bold uppercase tracking-widest text-sm hover:underline"
                    >
                        Edit responses
                    </button>
                </motion.div>
            </div>
        );
    }

    const isAllAttendanceSelected = attendanceOptions.map(opt => opt.label).every(label => formData.attendance.includes(label));

    return (
        <div className="bg-white py-16 px-6 min-h-screen font-sans">
            <div className="max-w-3xl mx-auto space-y-16">
                {/* Header */}
                <header className="text-center space-y-4">
                    <h1 className="text-6xl font-serif text-navy tracking-tight">{t("title")}</h1>
                    <div className="w-24 h-1.5 bg-gold mx-auto rounded-full" />
                    <p className="text-navy/60 text-lg italic max-w-lg mx-auto">
                        {t("subtitle")}
                    </p>
                </header>

                {/* Identity Note */}
                <AnimatePresence mode="wait">
                    {userName ? (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-navy p-8 rounded-[2.5rem] text-white flex items-center gap-6 shadow-2xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-white">
                                <User size={80} />
                            </div>
                            <div className="p-4 bg-white/10 rounded-full backdrop-blur-md">
                                <User className="text-gold" size={24} />
                            </div>
                            <p className="text-xl md:text-2xl font-serif relative z-10 transition-colors">
                                {t("welcomeBack", { name: userName })}
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                        >
                            <label className="block text-xs font-bold text-navy/40 uppercase tracking-[0.2em] pl-2">
                                {t("nameLabel")}
                            </label>
                            <div className="relative">
                                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-navy/30" size={20} />
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full pl-16 pr-6 py-6 bg-navy/5 border-2 border-transparent focus:border-gold rounded-[2rem] outline-none transition-all text-navy text-lg shadow-sm"
                                    placeholder="Enter your name"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-20">
                    {/* Dietary Requirements */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3 pl-2">
                            <div className="p-2 bg-burgundy/10 rounded-lg">
                                <UtensilsCrossed size={18} className="text-burgundy" />
                            </div>
                            <h2 className="text-2xl font-serif text-navy">{t("dietaryLabel")}</h2>
                        </div>
                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-navy/40 uppercase tracking-widest pl-2">
                                {t("dietaryDesc")}
                            </label>
                            <textarea
                                value={formData.dietary}
                                onChange={(e) => setFormData(prev => ({ ...prev, dietary: e.target.value }))}
                                className="w-full px-8 py-6 bg-navy/5 border-2 border-transparent focus:border-burgundy/30 rounded-[2.5rem] outline-none transition-all text-navy h-40 resize-none shadow-sm"
                                placeholder={t("dietaryPlaceholder")}
                            />
                        </div>
                    </section>

                    {/* Arrival Date */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3 pl-2">
                            <div className="p-2 bg-gold/10 rounded-lg">
                                <CalendarDays size={18} className="text-gold" />
                            </div>
                            <h2 className="text-2xl font-serif text-navy">{t("arrivalLabel")}</h2>
                        </div>
                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-navy/40 uppercase tracking-widest pl-2">
                                {t("arrivalPlaceholder")}
                            </label>
                            <div className="relative group">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (datePickerRef.current) {
                                            if ('showPicker' in datePickerRef.current) {
                                                datePickerRef.current.showPicker();
                                            } else {
                                                datePickerRef.current.focus();
                                            }
                                        }
                                    }}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 text-navy/30 group-focus-within:text-gold transition-colors hover:text-gold z-20"
                                >
                                    <CalendarDays size={20} />
                                </button>
                                <input
                                    type="text"
                                    required
                                    value={formData.arrivalDate}
                                    onChange={(e) => {
                                        let value = e.target.value.replace(/\D/g, "");
                                        if (value.length > 8) value = value.slice(0, 8);

                                        // Auto-format as DD/MM/YYYY
                                        let formatted = value;
                                        if (value.length > 2) formatted = value.slice(0, 2) + "/" + value.slice(2);
                                        if (value.length > 4) formatted = formatted.slice(0, 5) + "/" + formatted.slice(5);

                                        setFormData(prev => ({ ...prev, arrivalDate: formatted }));
                                    }}
                                    className="w-full pl-16 pr-6 py-6 bg-navy/5 border-2 border-transparent focus:border-gold rounded-[2rem] outline-none transition-all text-navy text-lg shadow-sm"
                                    placeholder="DD/MM/YYYY"
                                    maxLength={10}
                                />
                                {/* Hidden native date picker to provide calendar functionality */}
                                <input
                                    ref={datePickerRef}
                                    type="date"
                                    className="absolute inset-0 opacity-0 pointer-events-none w-0 h-0"
                                    onChange={(e) => {
                                        const date = e.target.value; // YYYY-MM-DD
                                        if (date) {
                                            const [year, month, day] = date.split("-");
                                            setFormData(prev => ({
                                                ...prev,
                                                arrivalDate: `${day}/${month}/${year}`
                                            }));
                                        }
                                    }}
                                />
                            </div>
                            <p className="text-[10px] text-navy/40 uppercase tracking-[0.2em] pl-6 font-bold">Please use European format: Day / Month / Year</p>
                        </div>
                    </section>

                    {/* Attendance */}
                    <section className="space-y-8">
                        <div className="flex items-center gap-3 pl-2">
                            <div className="p-2 bg-navy/10 rounded-lg">
                                <CalendarCheck size={18} className="text-navy" />
                            </div>
                            <h2 className="text-2xl font-serif text-navy">{t("attendanceLabel")}</h2>
                        </div>

                        <div className="grid gap-4">
                            {attendanceOptions.map((opt) => (
                                <label
                                    key={opt.id}
                                    className="relative flex items-center p-6 bg-white border-2 border-navy/5 rounded-[2rem] cursor-pointer hover:border-gold/30 hover:bg-gold/5 transition-all group overflow-hidden"
                                >
                                    <input
                                        type="checkbox"
                                        className="peer hidden"
                                        checked={formData.attendance.includes(opt.label)}
                                        onChange={() => toggleAttendance(opt.label)}
                                    />
                                    <div className="w-6 h-6 rounded-lg border-2 border-navy/10 peer-checked:border-gold peer-checked:bg-gold transition-all flex items-center justify-center mr-4">
                                        <CheckCircle2 className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" size={14} />
                                    </div>
                                    <span className="font-semibold text-navy/70 peer-checked:text-navy transition-colors">
                                        {opt.label}
                                    </span>
                                </label>
                            ))}

                            {/* All-in Option - Now Grouped but Styled Distinctly */}
                            <label
                                className="relative flex items-center p-6 bg-gold/5 border-2 border-gold/20 rounded-[2rem] cursor-pointer hover:border-gold/50 hover:bg-gold/10 transition-all group overflow-hidden"
                            >
                                <input
                                    type="checkbox"
                                    className="peer hidden"
                                    checked={isAllAttendanceSelected}
                                    onChange={toggleAllAttendance}
                                />
                                <div className="w-6 h-6 rounded-lg border-2 border-gold/30 peer-checked:border-gold peer-checked:bg-gold transition-all flex items-center justify-center mr-4">
                                    <CheckCircle2 className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" size={14} />
                                </div>
                                <span className="font-bold text-gold uppercase tracking-widest text-sm">
                                    {t("attendanceAll")}
                                </span>
                            </label>
                        </div>
                    </section>

                    {/* Preferred Alcohol */}
                    <section className="space-y-8">
                        <div className="flex items-center gap-3 pl-2">
                            <div className="p-2 bg-burgundy/10 rounded-lg">
                                <GlassWater size={18} className="text-burgundy" />
                            </div>
                            <h2 className="text-2xl font-serif text-navy">{t("alcoholLabel")}</h2>
                        </div>

                        <div className="p-8 bg-burgundy/5 rounded-[2.5rem] border border-burgundy/10 space-y-4">
                            <p className="text-navy/70 italic leading-relaxed text-lg text-center">
                                "{t("alcoholFunText")}"
                            </p>
                            <div className="w-12 h-0.5 bg-burgundy/20 mx-auto rounded-full" />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {alcoholOptions.map((opt) => {
                                const isSelected = formData.alcohol.includes(opt.label);
                                return (
                                    <button
                                        key={opt.id}
                                        type="button"
                                        onClick={() => toggleAlcohol(opt.label)}
                                        className={`relative p-8 rounded-[2.5rem] border-2 font-bold flex flex-col items-center gap-4 transition-all duration-300 ${isSelected
                                            ? "bg-[#800020] border-gold text-[#D4AF37] shadow-[0_10px_30px_-10px_rgba(128,0,32,0.5)] -translate-y-2"
                                            : "bg-white border-navy/5 text-navy/40 hover:border-burgundy/30 hover:text-burgundy"
                                            }`}
                                    >
                                        <div className={`transition-transform duration-300 ${isSelected ? "scale-110" : "scale-100 dark:filter-none filter"}`}>
                                            {opt.icon}
                                        </div>
                                        <span className={`text-xs tracking-widest uppercase transition-colors ${isSelected ? "text-gold" : ""}`}>
                                            {opt.label}
                                        </span>
                                        {isSelected && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute -top-3 -right-3 bg-gold text-[#800020] p-1 rounded-full border-4 border-[#800020] shadow-lg flex items-center justify-center"
                                            >
                                                <Check size={14} strokeWidth={4} />
                                            </motion.div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    {/* Accommodation Preference */}
                    <section className="space-y-8">
                        <div className="flex items-center gap-3 pl-2">
                            <div className="p-2 bg-[#800020]/10 rounded-lg">
                                <Hotel className="text-[#800020]" size={18} />
                            </div>
                            <h2 className="text-2xl font-serif text-navy">{t("accommodationLabel")}</h2>
                        </div>

                        <div className="grid gap-4">
                            {[1, 2, 3].map((num) => (
                                <label
                                    key={`acc-${num}`}
                                    className={`relative flex items-center p-6 bg-white border-2 rounded-[2rem] cursor-pointer transition-all group overflow-hidden ${formData.accommodationPref === t(`accommodationOption${num}`)
                                        ? "border-gold bg-gold/5 shadow-md"
                                        : "border-navy/5 hover:border-gold/30 hover:bg-gold/5"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="accommodationPref"
                                        className="peer hidden"
                                        checked={formData.accommodationPref === t(`accommodationOption${num}`)}
                                        onChange={() => setFormData(prev => ({ ...prev, accommodationPref: t(`accommodationOption${num}`) }))}
                                    />
                                    <div className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center mr-4 ${formData.accommodationPref === t(`accommodationOption${num}`)
                                        ? "border-gold bg-gold"
                                        : "border-navy/10 group-hover:border-gold/30"
                                        }`}>
                                        <div className="w-2 h-2 bg-white rounded-full" />
                                    </div>
                                    <span className={`font-semibold transition-colors ${formData.accommodationPref === t(`accommodationOption${num}`)
                                        ? "text-navy"
                                        : "text-navy/70 group-hover:text-navy"
                                        }`}>
                                        {t(`accommodationOption${num}`)}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </section>

                    {/* Stay Location Preference */}
                    <section className="space-y-8">
                        <div className="flex items-center gap-3 pl-2">
                            <div className="p-2 bg-navy/10 rounded-lg">
                                <Waves className="text-navy" size={18} />
                            </div>
                            <h2 className="text-2xl font-serif text-navy">{t("stayLabel")}</h2>
                        </div>

                        <div className="grid gap-4">
                            {[1, 2].map((num) => (
                                <label
                                    key={`stay-${num}`}
                                    className={`relative flex items-center p-6 bg-white border-2 rounded-[2rem] cursor-pointer transition-all group overflow-hidden ${formData.stayPref === t(`stayOption${num}`)
                                        ? "border-navy bg-navy/5 shadow-md"
                                        : "border-navy/5 hover:border-navy/30"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="stayPref"
                                        className="peer hidden"
                                        checked={formData.stayPref === t(`stayOption${num}`)}
                                        onChange={() => setFormData(prev => ({ ...prev, stayPref: t(`stayOption${num}`) }))}
                                    />
                                    <div className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center mr-4 ${formData.stayPref === t(`stayOption${num}`)
                                        ? "border-navy bg-navy"
                                        : "border-navy/10"
                                        }`}>
                                        <div className="w-2 h-2 bg-white rounded-full" />
                                    </div>
                                    <span className={`font-semibold transition-colors ${formData.stayPref === t(`stayOption${num}`)
                                        ? "text-navy"
                                        : "text-navy/70"
                                        }`}>
                                        {t(`stayOption${num}`)}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </section>

                    {/* Submit Button */}
                    <div className="pt-10">
                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(128, 0, 32, 0.4)" }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full py-7 bg-[#800020] text-white rounded-[2.5rem] font-bold text-xl uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center justify-center gap-4 border-2 border-transparent hover:border-gold/30 hover:brightness-110"
                        >
                            <span className="text-gold tracking-widest">{t("saveButton")}</span>
                            <ArrowRight className="text-gold" size={24} />
                        </motion.button>
                    </div>
                </form>
            </div>
        </div>
    );
}
