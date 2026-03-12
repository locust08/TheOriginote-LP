"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircleMore } from "lucide-react";

const DEFAULT_WHATSAPP_URL =
  "https://api.whatsapp.com/send?text=Hello%20The%20Originote";

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const hideTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const showButton = () => {
      setIsVisible(true);

      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
      }

      hideTimerRef.current = window.setTimeout(() => {
        setIsVisible(false);
      }, 2200);
    };

    window.addEventListener("pointermove", showButton, { passive: true });
    window.addEventListener("touchstart", showButton, { passive: true });

    return () => {
      window.removeEventListener("pointermove", showButton);
      window.removeEventListener("touchstart", showButton);

      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL || DEFAULT_WHATSAPP_URL;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className={`group fixed bottom-5 right-5 z-[70] inline-flex items-center gap-3 rounded-full border border-white/25 bg-[#25D366] px-4 py-3 text-white shadow-[0_16px_40px_rgba(37,211,102,0.35)] transition-all duration-500 ease-out ${
        isVisible
          ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-6 scale-95 opacity-0"
      }`}
    >
      <span className="absolute inset-0 rounded-full whatsapp-pulse-ring" />
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/18">
        <MessageCircleMore className="h-5 w-5" />
      </span>
      <span className="relative hidden text-left sm:block">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80">
          Need help?
        </span>
        <span className="block text-sm font-semibold">WhatsApp us</span>
      </span>
    </a>
  );
}
