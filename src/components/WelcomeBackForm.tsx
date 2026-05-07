"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { loginWithEmail } from "@/lib/actions/auth";

export default function WelcomeBackForm() {
  const t = useTranslations("Index");
  const router = useRouter();
  
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    const result = await loginWithEmail(email);

    if (result.success) {
      setStatus("success");
      setMessage(t("welcomeBack", { name: result.name }));
      setTimeout(() => {
        router.push("/poll");
      }, 2000);
    } else {
      setStatus("error");
      setMessage(t("emailError"));
    }
  };

  return (
    <div className="mt-6 flex flex-col items-center">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="text-burgundy-deep/70 hover:text-burgundy-deep text-sm md:text-base font-medium transition-colors underline decoration-1 underline-offset-4"
        >
          {t("alreadyRSVP")}
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              disabled={status === "loading" || status === "success"}
              className="w-full px-4 py-3 rounded-full border border-burgundy-deep/20 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all text-burgundy-deep placeholder:text-burgundy-deep/40"
            />
            <button
              type="submit"
              disabled={status === "loading" || status === "success" || !email}
              className="absolute right-1 top-1 bottom-1 px-4 bg-gold text-white rounded-full font-bold text-sm hover:bg-burgundy-deep transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "..." : "Go"}
            </button>
          </div>
          
          {message && (
            <p className={`text-sm font-medium ${status === "error" ? "text-red-500" : "text-green-600"}`}>
              {message}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
