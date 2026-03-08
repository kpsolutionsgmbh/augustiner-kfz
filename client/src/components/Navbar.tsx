import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onOpenFunnel: () => void;
}

export function Navbar({ onOpenFunnel }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_0_#E8E8E8]"
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" className="flex flex-col leading-none gap-0.5">
          <span className="text-lg md:text-xl font-black tracking-tight text-[#0D0D0D]">
            AUGUSTINER
          </span>
          <span className="flex items-center gap-1">
            <span className="flex gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EBEB02]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#EBEB02]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#EBEB02]" />
            </span>
            <span className="text-[9px] md:text-[10px] font-semibold tracking-[0.08em] text-[#4A4A4A] uppercase">
              KFZ-Ingenieurbüro
            </span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#leistungen" className="text-sm font-medium text-[#4A4A4A] hover:text-[#0D0D0D] transition-colors">
            Leistungen
          </a>
          <a href="#ablauf" className="text-sm font-medium text-[#4A4A4A] hover:text-[#0D0D0D] transition-colors">
            Ablauf
          </a>
          <a href="#faelle" className="text-sm font-medium text-[#4A4A4A] hover:text-[#0D0D0D] transition-colors">
            Fallbeispiele
          </a>
          <a href="#faq" className="text-sm font-medium text-[#4A4A4A] hover:text-[#0D0D0D] transition-colors">
            FAQ
          </a>
          <a
            href="tel:+4915141621062"
            className="btn-dark !rounded-full !py-2.5 !px-5 !text-xs"
          >
            <Phone className="w-3.5 h-3.5" />
            Anrufen
          </a>
          <button onClick={onOpenFunnel} className="btn-primary !py-3 !px-6 !text-sm !rounded-full">
            Jetzt Gutachten sichern
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button onClick={onOpenFunnel} className="btn-primary !py-2.5 !px-4 !text-xs !rounded-full">
            Gutachten sichern
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#E8E8E8] px-4 pb-6 pt-4 space-y-4">
          <a href="#leistungen" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-[#4A4A4A]">Leistungen</a>
          <a href="#ablauf" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-[#4A4A4A]">Ablauf</a>
          <a href="#faelle" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-[#4A4A4A]">Fallbeispiele</a>
          <a href="#faq" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-[#4A4A4A]">FAQ</a>
          <a href="tel:+4915141621062" className="btn-dark w-full justify-center">
            <Phone className="w-4 h-4" /> +49 1514 1621062
          </a>
        </div>
      )}
    </nav>
  );
}
