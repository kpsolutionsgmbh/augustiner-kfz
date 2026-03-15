import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = window.setTimeout(() => setVisible(true), 1000);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="container">
            <div className="bg-[#1A1A1A] rounded-2xl p-5 md:p-6 shadow-[0_-8px_40px_rgba(0,0,0,0.3)] ring-1 ring-white/10 max-w-2xl mx-auto md:mx-0">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white mb-1">Wir verwenden Cookies</p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Wir setzen auf dieser Internetseite Cookies ein, um Ihnen die bestmögliche Erfahrung zu bieten.{" "}
                    <Link href="/datenschutz" className="underline hover:text-white transition-colors">
                      Mehr erfahren
                    </Link>
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={decline}
                    className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white rounded-lg ring-1 ring-white/10 hover:ring-white/20 transition-all"
                  >
                    Ablehnen
                  </button>
                  <button
                    onClick={accept}
                    className="px-4 py-2 text-xs font-bold text-[#0D0D0D] bg-[#EBEB02] rounded-lg hover:bg-[#d4d402] transition-colors"
                  >
                    Alle akzeptieren
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
