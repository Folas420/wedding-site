"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageToggle from "./LanguageToggle";

interface MobileMenuProps {
    links: { href: string; label: string }[];
}

export default function MobileMenu({ links }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="md:hidden">
            <button
                onClick={toggleMenu}
                className="p-2 text-navy hover:text-gold transition-colors"
                aria-label="Toggle menu"
            >
                <Menu className="w-8 h-8" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-50 bg-white text-navy flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-navy/5">
                            <span className="text-gold font-serif text-2xl font-bold tracking-[0.2em]">
                                A&R
                            </span>
                            <button
                                onClick={toggleMenu}
                                className="p-2 text-navy hover:text-gold transition-colors"
                            >
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        {/* Links */}
                        <div className="flex-grow flex flex-col items-center justify-center gap-8 p-6">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={toggleMenu}
                                    className="text-2xl font-serif text-navy hover:text-gold transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <div className="mt-8 pt-8 border-t border-navy/10 w-full flex justify-center">
                                <LanguageToggle />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
