"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
    const calculateTimeLeft = (): TimeLeft => {
        const difference = +new Date(targetDate) - +new Date();
        if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    if (!mounted) return null;

    const isOver = timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds === 0;
    if (isOver) {
        return (
            <p className="text-2xl md:text-4xl font-serif text-burgundy-deep animate-pulse mt-6">
                The Big Day is Here! 🎉
            </p>
        );
    }

    const TimeUnit = ({ value, label }: { value: number; label: string }) => (
        <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl md:text-4xl font-serif text-burgundy-deep font-semibold lining-nums tabular-nums">
                {value.toString().padStart(2, "0")}
            </span>
            <span className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.15em] text-gold mt-0.5">
                {label}
            </span>
        </div>
    );

    const Separator = () => (
        <span className="text-lg sm:text-xl md:text-3xl font-serif text-gold/50 mb-4 mx-1 md:mx-2 select-none">:</span>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex justify-center items-center mt-6 px-4 py-4 md:px-8 md:py-6 bg-white/60 backdrop-blur-sm rounded-2xl md:rounded-[2rem] border border-gold/15 shadow-sm gap-1 md:gap-2"
        >
            <TimeUnit value={timeLeft.days} label="Days" />
            <Separator />
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <Separator />
            <TimeUnit value={timeLeft.minutes} label="Mins" />
            <Separator />
            <TimeUnit value={timeLeft.seconds} label="Secs" />
        </motion.div>
    );
}
