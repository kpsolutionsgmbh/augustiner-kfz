import { useState, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Shield, FileCheck, Scale, Clock, Phone, ChevronRight, Star,
  AlertTriangle, Ban, Timer, TrendingDown, HelpCircle, CheckCircle2,
  ArrowRight, BadgeCheck, GraduationCap, Award, MapPin, Mail,
  XCircle, Check, Quote,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FunnelModal } from "@/components/FunnelModal";
import { Marquee } from "@/components/ui/marquee";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ShineBorder } from "@/components/ui/shine-border";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { Particles } from "@/components/ui/particles";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ─── Animation Helpers ─── */
function FadeIn({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScaleIn({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Satisfied Customers Avatars ─── */
const satisfiedCustomerAvatars = [
  { imageUrl: "https://randomuser.me/api/portraits/men/32.jpg", profileUrl: "#" },
  { imageUrl: "https://randomuser.me/api/portraits/women/44.jpg", profileUrl: "#" },
  { imageUrl: "https://randomuser.me/api/portraits/men/52.jpg", profileUrl: "#" },
  { imageUrl: "https://randomuser.me/api/portraits/women/63.jpg", profileUrl: "#" },
  { imageUrl: "https://randomuser.me/api/portraits/men/75.jpg", profileUrl: "#" },
];

/* ─── CTA Block 1 — Tailwind Dark with Image ─── */
function CTABlockPrimary({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="bg-[#0D0D0D]">
      <div className="container py-16 sm:py-20">
        <FadeIn>
          <div className="relative isolate overflow-hidden bg-[#1A1A1A] px-6 pt-16 ring-1 ring-white/10 sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <svg viewBox="0 0 1024 1024" aria-hidden="true" className="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0">
              <circle r="512" cx="512" cy="512" fill="url(#cta-gradient-1)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="cta-gradient-1">
                  <stop stopColor="#EBEB02" />
                  <stop offset="1" stopColor="#22C55E" />
                </radialGradient>
              </defs>
            </svg>
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-extrabold tracking-tight text-balance text-white sm:text-4xl">
                Sichern Sie sich Ihre volle Entschädigung
              </h2>
              <p className="mt-6 text-lg leading-8 text-pretty text-gray-300">
                Durchschnittlich 6.890 € — statt dem Versicherungsangebot von nur 2.100 €. Jeder Tag ohne Gutachten schwächt Ihre Position.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <button onClick={onOpen} className="btn-primary !rounded-xl">
                  Jetzt Gutachten sichern
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a href="tel:+4915141621062" className="text-sm font-semibold text-white hover:text-gray-100 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  24/7 anrufen
                  <span aria-hidden="true">→</span>
                </a>
              </div>
              <div className="mt-6 flex items-center justify-center gap-3 lg:justify-start">
                <AvatarCircles avatarUrls={satisfiedCustomerAvatars} numPeople={74} />
                <p className="text-xs text-gray-400">
                  <span className="font-semibold text-white">74+</span> zufriedene Kunden
                </p>
              </div>
            </div>
            <div className="relative mt-16 h-80 lg:mt-8">
              <img
                width="1824"
                height="1080"
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663370501707/VtOdbmMhXqgtbbAu.jpg"
                alt="KFZ Gutachter bei der Arbeit"
                className="absolute top-0 left-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10 object-cover"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── CTA Block 2 — Final-style with Avatar Circles ─── */
function CTABlockSecondary({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="py-20 md:py-28 bg-[#0D0D0D] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(235,235,2,0.06)_0%,_transparent_60%)]" />
      <Particles className="absolute inset-0" quantity={25} color="#EBEB02" size={0.3} />
      <div className="container relative text-center">
        <FadeIn>
          <h2 className="text-2xl md:text-5xl font-black text-white mb-4 md:mb-6 leading-tight">
            Ihre Entschädigung wartet.<br />
            <span className="text-[#EBEB02]">Holen Sie sie sich.</span>
          </h2>
          <p className="text-sm md:text-lg text-gray-400 max-w-xl mx-auto mb-8 md:mb-10">
            Durchschnittlich 6.890 € — kostenlos, in 60 Sekunden gestartet.
            Jeder Tag ohne Gutachten schwächt Ihre Position.
          </p>
          <button onClick={onOpen} className="btn-primary text-base md:text-lg !px-8 md:!px-10 !py-4 md:!py-5 !rounded-2xl">
            Jetzt Entschädigung sichern
            <ArrowRight className="w-5 h-5" />
          </button>
          {/* Avatar Circles — social proof */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <AvatarCircles avatarUrls={satisfiedCustomerAvatars} numPeople={74} className="justify-center" />
            <p className="text-sm text-gray-400">
              <span className="font-semibold text-white">74+ zufriedene Kunden</span> vertrauen Augustiner KFZ
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Section Label ─── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="section-label mb-4 inline-block">{children}</span>;
}

/* ─── Animated Counter Bar ─── */
function CounterBar({ value, max, color = "#22C55E" }: { value: number; max: number; color?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${(value / max) * 100}%` } : {}}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="h-full rounded-full"
        style={{ background: color }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */

const testimonials = [
  {
    quote: "Nach meinem Unfall hat die Versicherung mir 1.800 € angeboten. Augustiner KFZ hat ein Gutachten erstellt und am Ende hatte ich 7.340 € auf dem Konto.",
    amount: "7.340 €",
    name: "Mehmet K.",
    initials: "MK",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    car: "Mercedes E-Klasse · Auffahrunfall · Köln",
  },
  {
    quote: "Die Versicherung wollte mich mit 2.200 € abspeisen. Dank Augustiner KFZ habe ich 5.890 € erhalten — fast das Dreifache!",
    amount: "5.890 €",
    name: "Sarah L.",
    initials: "SL",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    car: "BMW 430d · Seitenschaden · Düsseldorf",
  },
  {
    quote: "Innerhalb von 14 Tagen hatte ich 8.120 € auf dem Konto. Die komplette Abwicklung war stressfrei. Absolute Empfehlung!",
    amount: "8.120 €",
    name: "Thomas W.",
    initials: "TW",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    car: "VW Tiguan · Frontschaden · Bonn",
  },
  {
    quote: "In nur 7 Tagen hat Augustiner KFZ mir 6.200 € gesichert — statt der lächerlichen 1.500 € von der Versicherung.",
    amount: "6.200 €",
    name: "Aylin D.",
    initials: "AD",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    car: "Audi A4 · Auffahrunfall · Leverkusen",
  },
];

export default function Home() {
  const [funnelOpen, setFunnelOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-rotate testimonials
  useState(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <>
      <Navbar onOpenFunnel={() => setFunnelOpen(true)} />
      <FunnelModal open={funnelOpen} onClose={() => setFunnelOpen(false)} />

      {/* ─── 1. HERO with Particles ─── */}
      <section className="relative pt-24 pb-12 md:pt-36 md:pb-24 overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFACC]/20 via-white to-white pointer-events-none" />
        <Particles
          className="absolute inset-0"
          quantity={60}
          color="#EBEB02"
          size={0.6}
          staticity={30}
          ease={80}
        />
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <FadeIn>
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#EBEB02] text-[#EBEB02]" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-[#4A4A4A]">5.0 · 74+ Google-Bewertungen</span>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className="text-2xl md:text-[clamp(28px,3.2vw,42px)] font-black leading-[1.15] text-[#0D0D0D] mb-4 md:mb-5">
                  Autounfall? Jetzt kostenloses KFZ-Gutachten sichern!
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-sm md:text-lg text-[#4A4A4A] leading-relaxed mb-5 md:mb-6 max-w-lg">
                  Finden Sie in nur wenigen Schritten heraus, wie hoch Ihr Anspruch auf Ihren Unfallschaden ist – in weniger als 60 Sekunden.
                </p>
              </FadeIn>

              <FadeIn delay={0.25}>
                {/* Trust indicators */}
                <div className="flex flex-wrap gap-3 md:gap-4 mb-5 md:mb-6">
                  {[
                    { icon: FileCheck, text: "Kostenlos" },
                    { icon: Clock, text: "In 60 Sek." },
                    { icon: Shield, text: "Versicherung zahlt" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-[#4A4A4A]">
                      <div className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-[#EBEB02]/15 flex items-center justify-center">
                        <Icon className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#0D0D0D]" />
                      </div>
                      <span className="font-medium">{text}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <button onClick={() => setFunnelOpen(true)} className="btn-primary !text-sm md:!text-base !px-5 md:!px-7 !py-3 md:!py-3.5">
                    Schadensmeldung in 60 Sekunden
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a href="tel:+4915141621062" className="btn-dark !py-3 md:!py-3.5 !px-5 md:!px-6 !text-sm">
                    <Phone className="w-4 h-4" />
                    24/7 erreichbar
                  </a>
                </div>
              </FadeIn>
            </div>

            {/* Right: Hero Image */}
            <FadeIn delay={0.3} className="hidden lg:block">
              <div className="relative">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663370501707/VtOdbmMhXqgtbbAu.jpg"
                  alt="KFZ Gutachter bei der Arbeit"
                  className="rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.15)] w-full object-cover aspect-[4/3]"
                />
                {/* Floating badge */}
                <div className="absolute -bottom-5 -left-5 bg-white rounded-xl px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-[#E8E8E8]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#EBEB02] flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-[#0D0D0D]" />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-[#0D0D0D]">Ø 6.890 €</p>
                      <p className="text-[10px] text-[#767676]">durchschnittliche Entschädigung</p>
                    </div>
                  </div>
                </div>
                {/* Floating badge top right */}
                <div className="absolute -top-3 -right-3 bg-[#EBEB02] rounded-xl px-4 py-2 shadow-lg">
                  <p className="text-xs font-extrabold text-[#0D0D0D]">100 % kostenlos</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Glassmorphism Stats */}
          <FadeIn delay={0.5} className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { value: 6890, prefix: "Ø ", suffix: " €", label: "Entschädigung", icon: "💰" },
              { value: 35, suffix: " %", label: "Mehr als Versicherung", icon: "📈" },
              { value: 24, suffix: "h", label: "Schadenaufnahme", icon: "⚡" },
              { value: 74, suffix: "+", label: "5-Sterne Bewertungen", icon: "⭐" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#EBEB02]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <ShineBorder shineColor={["#EBEB02", "#22C55E"]} borderWidth={1} duration={8} />
                <p className="text-xl md:text-3xl font-black text-[#0D0D0D] relative">
                  {stat.prefix}
                  <NumberTicker value={stat.value} />
                  {stat.suffix}
                </p>
                <p className="text-[10px] md:text-xs font-medium text-[#767676] mt-1 relative">{stat.label}</p>
              </motion.div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ─── 2. AUTHORITY LOGOS ─── */}
      <section className="py-10 border-y border-[#E8E8E8] bg-white">
        <div className="container">
          <p className="text-center text-xs font-bold uppercase tracking-[0.15em] text-[#767676] mb-6">
            Gutachten für alle Marken
          </p>
        </div>
        <Marquee className="[--gap:3rem] [--duration:30s]" pauseOnHover>
          {[
            { name: "Mercedes-Benz", url: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663370501707/epDMZGjXANDAgRsB.svg" },
            { name: "BMW", url: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663370501707/gYMuMsjYvVXtnUmN.svg" },
            { name: "Volkswagen", url: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663370501707/cZnovLQLAKafjERL.svg" },
            { name: "Audi", url: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663370501707/WkuYlkKcWeRHpxso.svg" },
            { name: "Porsche", url: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663370501707/tsADsMswvcPjgdok.svg" },
            { name: "Toyota", url: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663370501707/rctMSVzfcxHgkXhE.svg" },
            { name: "Ford", url: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663370501707/oeZablNWjwFAEHoX.svg" },
            { name: "Opel", url: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663370501707/pCfQPWRouFkFIUXz.svg" },
          ].map((brand) => (
            <img
              key={brand.name}
              src={brand.url}
              alt={brand.name}
              className="h-8 md:h-10 w-auto opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            />
          ))}
        </Marquee>
      </section>

      {/* ─── 3. ANIMATED TESTIMONIALS ─── */}
      <section className="py-12 md:py-24 bg-[#111111] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(235,235,2,0.04)_0%,_transparent_50%)]" />
        <Particles className="absolute inset-0" quantity={30} color="#EBEB02" size={0.3} />
        <div className="container relative">
          <FadeIn>
            <div className="max-w-4xl mx-auto">
              {/* Main testimonial area */}
              <div className="text-center mb-8">
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#EBEB02] text-[#EBEB02]" />
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Quote className="w-10 h-10 text-[#EBEB02]/30 mx-auto mb-4" />
                    <blockquote className="text-xl md:text-2xl font-bold text-white leading-relaxed mb-4">
                      „{testimonials[activeTestimonial].quote}
                      {" "}<span className="text-[#EBEB02]">{testimonials[activeTestimonial].amount}</span>"
                    </blockquote>
                    <div className="flex items-center justify-center gap-3 mt-6">
                      <img
                        src={testimonials[activeTestimonial].avatar}
                        alt={testimonials[activeTestimonial].name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-[#EBEB02]/50"
                      />
                      <div className="text-left">
                        <p className="text-sm font-semibold text-white">{testimonials[activeTestimonial].name}</p>
                        <p className="text-xs text-gray-500">{testimonials[activeTestimonial].car}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dots + mini cards */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`transition-all duration-300 rounded-full ${
                      i === activeTestimonial
                        ? "w-8 h-2 bg-[#EBEB02]"
                        : "w-2 h-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── 4. PROBLEMS — BENTO GRID with Animations ─── */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-8 md:mb-16">
              <SectionLabel>Das Problem</SectionLabel>
              <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-[#0D0D0D] mt-4 mb-4">
                Die Versicherung arbeitet nicht für Sie
              </h2>
              <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
                Nach einem Unfall stehen Sie unter Schock — und genau das nutzt die gegnerische Versicherung aus.
              </p>
            </div>
          </FadeIn>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 md:gap-5">
            {/* Large card — spans 4 cols */}
            <ScaleIn delay={0} className="md:col-span-4">
              <div className="group relative h-full min-h-0 md:min-h-[220px] rounded-2xl border border-[#E8E8E8] bg-gradient-to-br from-white to-[#FAFAFA] p-7 overflow-hidden hover:border-[#EBEB02]/50 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(235,235,2,0.1)]">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#EF4444]/5 to-transparent rounded-bl-full" />
                {/* Animated pulse circle */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-6 right-6 w-20 h-20 rounded-full bg-[#EF4444]/10"
                />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-[#EF4444]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <TrendingDown className="w-7 h-7 text-[#EF4444]" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#0D0D0D] mb-3">Versicherung kürzt systematisch</h3>
                  <p className="text-sm md:text-base text-[#4A4A4A] leading-relaxed max-w-lg">
                    Der Gutachter der Versicherung arbeitet für die Versicherung — nicht für Sie. Ergebnis: Tausende Euro weniger Entschädigung.
                  </p>
                  {/* Animated counter showing money loss */}
                  <div className="mt-5 flex items-center gap-3">
                    <div className="text-2xl font-black text-[#EF4444]">-4.790 €</div>
                    <div className="text-xs text-[#767676]">durchschnittlicher Verlust<br />ohne unabhängiges Gutachten</div>
                  </div>
                </div>
              </div>
            </ScaleIn>

            {/* Small card — spans 2 cols */}
            <ScaleIn delay={0.1} className="md:col-span-2">
              <div className="group relative h-full min-h-0 md:min-h-[220px] rounded-2xl border border-[#E8E8E8] bg-gradient-to-br from-white to-[#FAFAFA] p-6 overflow-hidden hover:border-[#EBEB02]/50 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(235,235,2,0.1)]">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-12 h-12 rounded-xl bg-[#EBEB02]/10 flex items-center justify-center mb-4"
                >
                  <Ban className="w-6 h-6 text-[#0D0D0D]" />
                </motion.div>
                <h3 className="text-lg font-bold text-[#0D0D0D] mb-2">Positionen verschwiegen</h3>
                <p className="text-sm text-[#4A4A4A] leading-relaxed">
                  Wertminderung, Nutzungsausfall, Mietwagenkosten — die Versicherung verschweigt Ihnen, was Ihnen zusteht.
                </p>
                {/* Animated strikethrough list */}
                <div className="mt-4 space-y-1.5">
                  {["Wertminderung", "Nutzungsausfall", "Mietwagenkosten"].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.15 }}
                      className="flex items-center gap-2 text-xs text-[#EF4444]"
                    >
                      <XCircle className="w-3.5 h-3.5 shrink-0" />
                      <span className="line-through">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScaleIn>

            {/* Row 2: 3 equal cards */}
            <ScaleIn delay={0.15} className="md:col-span-2">
              <div className="group relative h-full min-h-0 md:min-h-[200px] rounded-2xl border border-[#E8E8E8] bg-gradient-to-br from-white to-[#FAFAFA] p-6 overflow-hidden hover:border-[#EBEB02]/50 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(235,235,2,0.1)]">
                {/* Pulsing urgency indicator */}
                <div className="flex items-center gap-2 mb-4">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"
                  />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#EF4444]">Zeitkritisch</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#EBEB02]/10 flex items-center justify-center mb-4 group-hover:bg-[#EBEB02]/20 transition-colors">
                  <AlertTriangle className="w-6 h-6 text-[#0D0D0D]" />
                </div>
                <h3 className="text-lg font-bold text-[#0D0D0D] mb-2">Zeitdruck wird aufgebaut</h3>
                <p className="text-sm text-[#4A4A4A] leading-relaxed">
                  Schnelle Angebote, schnelle Unterschrift — auf Ihre Kosten.
                </p>
              </div>
            </ScaleIn>

            <ScaleIn delay={0.2} className="md:col-span-2">
              <div className="group relative h-full min-h-0 md:min-h-[200px] rounded-2xl border border-[#E8E8E8] bg-gradient-to-br from-white to-[#FAFAFA] p-6 overflow-hidden hover:border-[#EBEB02]/50 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(235,235,2,0.1)]">
                {/* Animated timer */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute top-4 right-4 w-16 h-16 rounded-full border-2 border-dashed border-[#E8E8E8] opacity-30"
                />
                <div className="w-12 h-12 rounded-xl bg-[#EBEB02]/10 flex items-center justify-center mb-4 group-hover:bg-[#EBEB02]/20 transition-colors">
                  <Timer className="w-6 h-6 text-[#0D0D0D]" />
                </div>
                <h3 className="text-lg font-bold text-[#0D0D0D] mb-2">Jeder Tag schwächt Ihre Position</h3>
                <p className="text-sm text-[#4A4A4A] leading-relaxed">
                  Ohne professionelles Gutachten verlieren Sie Beweise. Je länger Sie warten, desto schwieriger.
                </p>
              </div>
            </ScaleIn>

            <ScaleIn delay={0.25} className="md:col-span-2">
              <div className="group relative h-full min-h-0 md:min-h-[200px] rounded-2xl border border-[#E8E8E8] bg-gradient-to-br from-white to-[#FAFAFA] p-6 overflow-hidden hover:border-[#EBEB02]/50 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(235,235,2,0.1)]">
                <div className="w-12 h-12 rounded-xl bg-[#EBEB02]/10 flex items-center justify-center mb-4 group-hover:bg-[#EBEB02]/20 transition-colors">
                  <Scale className="w-6 h-6 text-[#0D0D0D]" />
                </div>
                <h3 className="text-lg font-bold text-[#0D0D0D] mb-2">Kein faires Verfahren</h3>
                <p className="text-sm text-[#4A4A4A] leading-relaxed">
                  Die Versicherung hat Juristen und Gutachter. Sie stehen allein da — es sei denn, Sie holen sich einen Experten.
                </p>
                {/* Animated scale tipping */}
                <motion.div
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="flex justify-center mt-4"
                >
                  <Scale className="w-10 h-10 text-[#E8E8E8]" />
                </motion.div>
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* ─── CTA Block 1 ─── */}
      <CTABlockPrimary onOpen={() => setFunnelOpen(true)} />

      {/* ─── 5. VALUE / LEISTUNGEN — Shine Border Cards ─── */}
      <section id="leistungen" className="py-12 md:py-24 bg-white">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-8 md:mb-16">
              <SectionLabel>Unsere Lösung</SectionLabel>
              <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-[#0D0D0D] mt-4 mb-4">
                Wir übernehmen alles — Sie lehnen sich zurück
              </h2>
              <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
                Von der Schadenaufnahme bis zur Auszahlung. Kostenlos. Komplett.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: FileCheck,
                title: "Kostenloses Unfallgutachten",
                desc: "Professionelles Gutachten mit allen 16 regulierbaren Schadenspositionen — rechtlich belastbar und gerichtsfest. Die Versicherung zahlt.",
                tag: "0 € für Sie",
                shiny: true,
              },
              {
                icon: Shield,
                title: "Versicherungskommunikation inklusive",
                desc: "Wir übernehmen die komplette Kommunikation mit der gegnerischen Versicherung. Sie müssen nicht einen einzigen Brief schreiben.",
                tag: "Alles aus einer Hand",
                shiny: false,
              },
              {
                icon: Scale,
                title: "Kostenloser Anwalt bei Bedarf",
                desc: "Wenn die Versicherung nicht zahlt, schalten wir einen spezialisierten Verkehrsrechtsanwalt ein — für Sie kostenlos (§ 249 BGB).",
                tag: "Kostenlos",
                shiny: false,
              },
              {
                icon: Clock,
                title: "Schadenaufnahme in 24 Stunden",
                desc: "Innerhalb von 24 Stunden kommt unser Gutachter zu Ihnen — an Ihren Standort, zu Ihrer Wunschzeit. Auszahlung in Ø 7–19 Tagen.",
                tag: "24/7 erreichbar",
                shiny: false,
              },
            ].map((value, i) => (
              <FadeIn key={value.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="relative flex gap-5 p-6 rounded-2xl border border-[#E8E8E8] bg-white hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] transition-all duration-300 h-full overflow-hidden"
                >
                  <ShineBorder shineColor={["#EBEB02", "#22C55E", "#EBEB02"]} borderWidth={1} duration={10} />
                  <div className="w-12 h-12 rounded-xl bg-[#EBEB02] flex items-center justify-center shrink-0">
                    <value.icon className="w-6 h-6 text-[#0D0D0D]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0D0D0D] mb-1">{value.title}</h3>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-3">{value.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#22C55E] bg-[#22C55E]/10 px-3 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {value.shiny ? (
                        <AnimatedShinyText className="!text-[#22C55E] !text-xs !font-bold [&]:via-[#22C55E]">
                          {value.tag}
                        </AnimatedShinyText>
                      ) : (
                        value.tag
                      )}
                    </span>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5b. ELFSIGHT GOOGLE REVIEWS ─── */}
      <section className="py-12 md:py-16 bg-[#F7F7F7]">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-8">
              <SectionLabel>Google Bewertungen</SectionLabel>
              <h2 className="text-[clamp(20px,3vw,36px)] font-extrabold text-[#0D0D0D] mt-4 mb-2">
                Was unsere Kunden auf Google sagen
              </h2>
            </div>
            <div
              className="elfsight-app-1c9ab4d5-8391-4dab-88e7-1d166748f4dd"
              data-elfsight-app-lazy
            />
          </FadeIn>
        </div>
      </section>

      {/* ─── 6. HOW IT WORKS ─── */}
      <section id="ablauf" className="py-12 md:py-24 bg-[#F7F7F7]">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-8 md:mb-16">
              <SectionLabel>So funktioniert's</SectionLabel>
              <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-[#0D0D0D] mt-4 mb-4">
                In 3 Schritten zu Ihrer Entschädigung
              </h2>
              <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
                Wir nehmen Ihnen alles ab — Sie müssen nur den ersten Schritt machen.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Schadensmeldung",
                desc: "In 60 Sekunden online melden oder direkt anrufen. Wir sind 24/7 erreichbar und starten sofort.",
              },
              {
                step: "02",
                title: "Gutachten & Abwicklung",
                desc: "Unser Master-Ingenieur erstellt das Gutachten vor Ort. Wir übernehmen die komplette Versicherungskommunikation — inkl. Anwalt.",
              },
              {
                step: "03",
                title: "Auszahlung erhalten",
                desc: "Durchschnittlich 6.890 € auf Ihr Konto — in Ø 7–19 Tagen. 35 % mehr als das Versicherungsangebot.",
              },
            ].map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.15}>
                <div className="relative text-center md:text-left">
                  <span className="text-6xl md:text-7xl font-black text-[#EBEB02]/30 leading-none block mb-4">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-bold text-[#0D0D0D] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#4A4A4A] leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div className="text-center mt-10 md:mt-12">
              <button onClick={() => setFunnelOpen(true)} className="btn-primary text-base md:text-lg !px-8 md:!px-10 !py-4 md:!py-5">
                Jetzt in 60 Sekunden starten
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── 7. DIFFERENTIATION — Enhanced with Glow ─── */}
      <section className="py-12 md:py-24 bg-[#111111] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,_rgba(34,197,94,0.06)_0%,_transparent_50%)]" />
        <div className="container relative">
          <FadeIn>
            <div className="text-center mb-8 md:mb-16">
              <SectionLabel>Der Unterschied</SectionLabel>
              <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-white mt-4 mb-4">
                Versicherungs-Gutachter vs. Augustiner KFZ
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Sehen Sie selbst, warum ein unabhängiges Gutachten Tausende Euro Unterschied macht.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="max-w-3xl mx-auto overflow-hidden rounded-2xl border border-white/10 relative">
              <ShineBorder shineColor={["#22C55E", "#EBEB02"]} borderWidth={1} duration={12} />
              {/* Header */}
              <div className="grid grid-cols-3 bg-white/5">
                <div className="p-2.5 md:p-4 text-[10px] md:text-sm font-bold text-gray-400">Kriterium</div>
                <div className="p-2.5 md:p-4 text-[10px] md:text-sm font-bold text-[#EF4444] text-center">
                  <span className="inline-flex items-center gap-1 md:gap-1.5">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#EF4444] inline-block" />
                    <span className="hidden sm:inline">Versicherungs-</span>Gutachter
                  </span>
                </div>
                <div className="p-2.5 md:p-4 text-[10px] md:text-sm font-bold text-[#22C55E] text-center">
                  <span className="inline-flex items-center gap-1 md:gap-1.5">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#22C55E] inline-block" />
                    Augustiner KFZ
                  </span>
                </div>
              </div>
              {[
                { label: "Arbeitet für", bad: "Die Versicherung", good: "Nur für Sie" },
                { label: "Ø Entschädigung", bad: "2.100 € (gekürzt)", good: "6.890 € (vollständig)" },
                { label: "Schadenspositionen", bad: "Minimal", good: "Alle 16 Positionen" },
                { label: "Versicherungs-Kommunikation", bad: "Sie selbst", good: "Wir übernehmen alles" },
                { label: "Anwalt inklusive", bad: "Nein", good: "Ja — kostenlos" },
                { label: "Kosten für Sie", bad: "Tausende € weniger", good: "0 €" },
              ].map((row, i) => (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-white/[0.02]" : ""} hover:bg-white/[0.05] transition-colors`}
                >
                  <div className="p-2.5 md:p-4 text-[11px] md:text-sm font-semibold text-white">{row.label}</div>
                  <div className="p-2.5 md:p-4 text-[11px] md:text-sm text-gray-500 text-center flex items-center justify-center gap-1 md:gap-1.5 relative">
                    <div className="absolute inset-0 bg-[#EF4444]/[0.03]" />
                    <XCircle className="w-3 h-3 md:w-4 md:h-4 text-[#EF4444] shrink-0 relative" />
                    <span className="relative">{row.bad}</span>
                  </div>
                  <div className="p-2.5 md:p-4 text-[11px] md:text-sm text-white text-center flex items-center justify-center gap-1 md:gap-1.5 relative">
                    <div className="absolute inset-0 bg-[#22C55E]/[0.03]" />
                    <Check className="w-3 h-3 md:w-4 md:h-4 text-[#22C55E] shrink-0 relative" />
                    <span className="font-semibold relative">{row.good}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── 8. FOUNDER ─── */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <FadeIn>
              <div className="relative">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663370501707/VfFEuiRZHnDOBbQj.jpeg"
                  alt="Volkan — Gründer Augustiner KFZ"
                  className="rounded-2xl shadow-[0_16px_64px_rgba(0,0,0,0.12)] w-full object-cover aspect-[4/5]"
                />
                <div className="absolute -bottom-4 -right-4 bg-[#EBEB02] rounded-xl px-5 py-3 shadow-lg">
                  <p className="text-sm font-extrabold text-[#0D0D0D]">Master-Ingenieur</p>
                  <p className="text-xs text-[#4A4A4A]">Automotive Engineering</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div>
                <SectionLabel>Ihr Gutachter</SectionLabel>
                <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-[#0D0D0D] mt-4 mb-6">
                  Volkan — Master-Ingenieur & Gründer
                </h2>
                <div className="space-y-4 mb-8">
                  {[
                    { icon: GraduationCap, text: "Master in Automotive Engineering" },
                    { icon: Award, text: "Abschluss bei Prof. Ferdinand Dudenhöffer" },
                    { icon: BadgeCheck, text: "Unabhängig — keinerlei Verträge mit Versicherungen" },
                    { icon: MapPin, text: "Köln & ganz NRW" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#F7F7F7] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[#0D0D0D]" />
                      </div>
                      <p className="text-sm text-[#4A4A4A]">{text}</p>
                    </div>
                  ))}
                </div>
                <blockquote className="border-l-4 border-[#EBEB02] pl-4 text-[#4A4A4A] italic text-sm leading-relaxed">
                  „Die Versicherung bietet Ihnen immer das Minimum an. Mein Job ist es, sicherzustellen,
                  dass Sie das Maximum bekommen — das, was Ihnen rechtlich zusteht."
                </blockquote>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── CTA Block 2 ─── */}
      <CTABlockSecondary onOpen={() => setFunnelOpen(true)} />

      {/* ─── 9. CASE STUDIES — Enhanced Cards ─── */}
      <section id="faelle" className="py-12 md:py-24 bg-white">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-8 md:mb-16">
              <SectionLabel>Echte Ergebnisse</SectionLabel>
              <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-[#0D0D0D] mt-4 mb-4">
                Was unsere Kunden tatsächlich erhalten haben
              </h2>
              <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
                Dokumentierte Fälle mit echten Zahlen — keine leeren Versprechen.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                car: "Mercedes E-Klasse",
                type: "Heckschaden",
                amount: 7340,
                insurance: 1800,
                days: "12 Tage",
                name: "Mehmet K.",
              },
              {
                car: "BMW 430d",
                type: "Seitenschaden",
                amount: 5890,
                insurance: 2200,
                days: "9 Tage",
                name: "Sarah L.",
              },
              {
                car: "VW Tiguan",
                type: "Frontschaden",
                amount: 8120,
                insurance: 2800,
                days: "14 Tage",
                name: "Thomas W.",
              },
              {
                car: "Audi A4",
                type: "Auffahrunfall",
                amount: 6200,
                insurance: 1500,
                days: "7 Tage",
                name: "Aylin D.",
              },
            ].map((c, i) => (
              <FadeIn key={c.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="relative bg-white rounded-2xl border border-[#E8E8E8] overflow-hidden group"
                >
                  <ShineBorder shineColor={["#22C55E", "#EBEB02"]} borderWidth={1} duration={12} />
                  <div className="bg-[#111111] p-5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#EBEB02]/5" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500 relative">{c.type}</p>
                    <p className="text-white font-bold mt-1 relative">{c.car}</p>
                  </div>
                  <div className="p-5">
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-2xl font-black text-[#22C55E]">
                        <NumberTicker value={c.amount} />{" "}€
                      </span>
                    </div>
                    <p className="text-xs text-[#767676] mb-3">
                      statt <span className="line-through text-[#EF4444]">{c.insurance.toLocaleString("de-DE")} €</span> (Versicherungsangebot)
                    </p>
                    {/* Visual bar showing difference */}
                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#767676] w-16 shrink-0">Versicherer</span>
                        <div className="flex-1 h-1.5 bg-[#F7F7F7] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(c.insurance / c.amount) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                            className="h-full bg-[#EF4444]/40 rounded-full"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#767676] w-16 shrink-0">Augustiner</span>
                        <div className="flex-1 h-1.5 bg-[#F7F7F7] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                            className="h-full bg-[#22C55E] rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#4A4A4A] pt-3 border-t border-[#F0F0F0]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {c.days}
                      </span>
                      <span className="font-medium">{c.name}</span>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10. FAQ ─── */}
      <section id="faq" className="py-12 md:py-24 bg-[#F7F7F7]">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-8 md:mb-16">
              <SectionLabel>Häufige Fragen</SectionLabel>
              <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-[#0D0D0D] mt-4 mb-4">
                Alles, was Sie wissen müssen
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-3">
                {[
                  {
                    q: "Ist das Gutachten wirklich kostenlos?",
                    a: "Ja, zu 100 %. Nach § 249 BGB und BGH Az. VI ZR 357/13 muss die gegnerische Versicherung die Kosten für das Unfallgutachten übernehmen. Ihnen entstehen keinerlei Kosten — nicht beim Gutachten, nicht beim Anwalt, nicht bei der gesamten Abwicklung.",
                  },
                  {
                    q: "Warum bekomme ich mehr als das Versicherungsangebot?",
                    a: "Die Versicherung setzt auf ihren eigenen Gutachter, der systematisch Positionen weglässt — Wertminderung, Nutzungsausfall, Mietwagenkosten. Unser Gutachten erfasst alle 16 regulierbaren Schadenspositionen. Das Ergebnis: durchschnittlich 35 % mehr Entschädigung.",
                  },
                  {
                    q: "Wie lange dauert die gesamte Abwicklung?",
                    a: "Die Schadenaufnahme erfolgt innerhalb von 24 Stunden. Das Gutachten ist in 2–3 Werktagen fertig. Die Auszahlung durch die Versicherung dauert im Schnitt 7–19 Tage — abhängig von der Versicherung.",
                  },
                  {
                    q: "Muss ich selbst mit der Versicherung kommunizieren?",
                    a: "Nein. Wir übernehmen die komplette Kommunikation mit der gegnerischen Versicherung. Bei Bedarf schalten wir zusätzlich einen spezialisierten Verkehrsrechtsanwalt ein — für Sie kostenlos.",
                  },
                  {
                    q: "Kann ich den Gutachter frei wählen?",
                    a: "Ja, absolut. Als Geschädigter haben Sie das Recht, einen eigenen, unabhängigen Gutachter zu beauftragen. Die Versicherung darf Ihnen keinen Gutachter vorschreiben. Dieses Recht ist gesetzlich verankert.",
                  },
                  {
                    q: "Was passiert, wenn die Versicherung nicht zahlt?",
                    a: "Dann schalten wir einen spezialisierten Verkehrsrechtsanwalt ein, der Ihre Ansprüche gerichtlich durchsetzt. Auch diese Kosten werden von der gegnerischen Versicherung getragen — Ihnen entstehen keine Kosten.",
                  },
                  {
                    q: "Sind Sie wirklich unabhängig?",
                    a: "Ja. Augustiner KFZ hat keinerlei Verträge mit Versicherungen. Wir arbeiten ausschließlich im Interesse des Geschädigten. Unser Gründer Volkan hat einen Master in Automotive Engineering und ist keiner Versicherung verpflichtet.",
                  },
                ].map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="bg-white rounded-xl px-6 border border-[#E8E8E8] data-[state=open]:border-[#EBEB02]/50 data-[state=open]:shadow-[0_4px_24px_rgba(235,235,2,0.1)] transition-all"
                  >
                    <AccordionTrigger className="text-sm md:text-base font-bold text-[#0D0D0D] hover:no-underline py-5">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-[#4A4A4A] leading-relaxed pb-5">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── 11. FINAL CTA with Particles ─── */}
      <section className="py-20 md:py-32 bg-[#0D0D0D] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(235,235,2,0.08)_0%,_transparent_60%)]" />
        <Particles className="absolute inset-0" quantity={40} color="#EBEB02" size={0.4} />
        <div className="container relative text-center">
          <FadeIn>
            <h2 className="text-2xl md:text-5xl font-black text-white mb-4 md:mb-6 leading-tight">
              Ihre Entschädigung wartet.<br />
              <span className="text-[#EBEB02]">Holen Sie sie sich.</span>
            </h2>
            <p className="text-sm md:text-lg text-gray-400 max-w-xl mx-auto mb-8 md:mb-10">
              Durchschnittlich 6.890 € — kostenlos, in 60 Sekunden gestartet.
              Jeder Tag ohne Gutachten schwächt Ihre Position.
            </p>
            <button onClick={() => setFunnelOpen(true)} className="btn-primary text-lg md:text-xl !px-10 md:!px-12 !py-5 md:!py-6 !rounded-2xl">
              Jetzt Entschädigung sichern
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            {/* Avatar Circles — social proof */}
            <div className="mt-8 flex flex-col items-center gap-3">
              <AvatarCircles avatarUrls={satisfiedCustomerAvatars} numPeople={74} className="justify-center" />
              <p className="text-sm text-gray-400">
                <span className="font-semibold text-white">74+ zufriedene Kunden</span> vertrauen Augustiner KFZ
              </p>
            </div>
            <div className="mt-6 flex items-center justify-center gap-4">
              <a href="tel:+4915141621062" className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4" /> +49 1514 1621062
              </a>
              <span className="text-gray-600">·</span>
              <a href="mailto:info@augustiner-kfz.de" className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" /> info@augustiner-kfz.de
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── 12. FOOTER ─── */}
      <footer className="py-10 bg-[#0A0A0A] border-t border-white/5">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="text-sm font-black text-white tracking-tight">AUGUSTINER</span>
              <span className="text-[9px] font-semibold tracking-[0.08em] text-gray-500 uppercase">KFZ-Ingenieurbüro</span>
            </div>
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
              <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
              <span>© {new Date().getFullYear()} Augustiner KFZ Gutachten</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── STICKY MOBILE CTA ─── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-xl border-t border-[#E8E8E8] px-4 py-3">
        <button onClick={() => setFunnelOpen(true)} className="btn-primary w-full !rounded-xl !py-3.5">
          Jetzt Gutachten sichern
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}
