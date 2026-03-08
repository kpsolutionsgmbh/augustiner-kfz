import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield, FileCheck, Scale, Clock, Phone, ChevronRight, Star,
  AlertTriangle, Ban, Timer, TrendingDown, HelpCircle, CheckCircle2,
  ArrowRight, BadgeCheck, GraduationCap, Award, MapPin, Mail,
  XCircle, Check,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FunnelModal } from "@/components/FunnelModal";
import { Marquee } from "@/components/ui/marquee";
import { NumberTicker } from "@/components/ui/number-ticker";
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

/* ─── CTA Block ─── */
function CTABlock({ onOpen, variant = "light" }: { onOpen: () => void; variant?: "light" | "dark" }) {
  const isDark = variant === "dark";
  return (
    <section className={`py-16 md:py-20 ${isDark ? "bg-[#111111]" : "bg-[#F7F7F7]"}`}>
      <div className="container text-center">
        <FadeIn>
          <h2 className={`text-2xl md:text-4xl font-extrabold mb-4 ${isDark ? "text-white" : "text-[#0D0D0D]"}`}>
            Sichern Sie sich Ihre volle Entschädigung
          </h2>
          <p className={`text-base mb-8 max-w-xl mx-auto ${isDark ? "text-gray-400" : "text-[#4A4A4A]"}`}>
            Durchschnittlich 6.890 € — statt dem Versicherungsangebot von nur 2.100 €.
          </p>
          <button onClick={onOpen} className="btn-primary text-lg !px-10 !py-5">
            Jetzt Gutachten sichern
            <ChevronRight className="w-5 h-5" />
          </button>
          <p className={`mt-4 text-sm ${isDark ? "text-gray-500" : "text-[#767676]"}`}>
            ✓ 100 % kostenlos · ✓ Kein Risiko · ✓ 60 Sekunden
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Section Label ─── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="section-label mb-4 inline-block">{children}</span>;
}

/* ═══════════════════════════════════════════════════════════════════ */

export default function Home() {
  const [funnelOpen, setFunnelOpen] = useState(false);

  return (
    <>
      <Navbar onOpenFunnel={() => setFunnelOpen(true)} />
      <FunnelModal open={funnelOpen} onClose={() => setFunnelOpen(false)} />

      {/* ─── 1. HERO ─── */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFACC]/20 via-white to-white pointer-events-none" />
        <div className="container relative">
          <div className="max-w-3xl">
            <FadeIn>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#EBEB02] text-[#EBEB02]" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-[#4A4A4A]">5.0 · 74+ Google-Bewertungen</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-[clamp(28px,4vw,56px)] font-black leading-[1.08] text-[#0D0D0D] mb-6">
                Nach dem Unfall durchschnittlich{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">6.890 € Entschädigung</span>
                  <span className="absolute bottom-1 left-0 right-0 h-3 md:h-4 bg-[#EBEB02]/40 -z-0" />
                </span>
                {" "}sichern
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-[#4A4A4A] leading-relaxed mb-8 max-w-2xl">
                Augustiner KFZ erstellt Ihr kostenloses Unfallgutachten, übernimmt die komplette
                Versicherungskommunikation und sichert Ihnen <strong className="text-[#0D0D0D]">durchschnittlich 35 % mehr Entschädigung</strong> als
                das Versicherungsangebot — alles aus einer Hand.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button onClick={() => setFunnelOpen(true)} className="btn-primary text-lg !px-10 !py-5">
                  Schadensmeldung in 60 Sekunden
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a href="tel:+4915141621062" className="btn-dark !py-5 !px-8 !text-base">
                  <Phone className="w-5 h-5" />
                  24/7 erreichbar
                </a>
              </div>
              <p className="text-sm text-[#767676]">
                ✓ 100 % kostenlos · ✓ Kein Risiko · ✓ Versicherung zahlt alles
              </p>
            </FadeIn>
          </div>

          {/* Floating Stats */}
          <FadeIn delay={0.5} className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: 6890, prefix: "Ø ", suffix: " €", label: "Entschädigung" },
              { value: 35, suffix: " %", label: "Mehr als Versicherung" },
              { value: 24, suffix: "h", label: "Schadenaufnahme" },
              { value: 74, suffix: "+", label: "5-Sterne Bewertungen" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/80 backdrop-blur-lg rounded-2xl p-5 border border-[#E8E8E8] shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
              >
                <p className="text-2xl md:text-3xl font-black text-[#0D0D0D]">
                  {stat.prefix}
                  <NumberTicker value={stat.value} />
                  {stat.suffix}
                </p>
                <p className="text-xs font-medium text-[#767676] mt-1">{stat.label}</p>
              </div>
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

      {/* ─── 3. WHALE TESTIMONIAL ─── */}
      <section className="py-16 md:py-24 bg-[#111111]">
        <div className="container">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#EBEB02] text-[#EBEB02]" />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl font-bold text-white leading-relaxed mb-6">
                „Nach meinem Unfall hat die Versicherung mir 1.800 € angeboten. Augustiner KFZ hat
                ein Gutachten erstellt und am Ende hatte ich <span className="text-[#EBEB02]">7.340 €</span> auf dem Konto.
                Alles kostenlos, alles aus einer Hand. Ich hätte nie gedacht, dass mir so viel zusteht."
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2E2E2E] flex items-center justify-center text-sm font-bold text-white">
                  M.K.
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">Mehmet K.</p>
                  <p className="text-xs text-gray-500">Mercedes E-Klasse · Auffahrunfall · Köln</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── 4. RELEVANCE / PROBLEMS ─── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <SectionLabel>Das Problem</SectionLabel>
              <h2 className="text-[clamp(24px,3.5vw,44px)] font-extrabold text-[#0D0D0D] mt-4 mb-4">
                Die Versicherung arbeitet nicht für Sie
              </h2>
              <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
                Nach einem Unfall stehen Sie unter Schock — und genau das nutzt die gegnerische Versicherung aus.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: TrendingDown,
                title: "Versicherung kürzt systematisch",
                desc: "Der Gutachter der Versicherung arbeitet für die Versicherung — nicht für Sie. Ergebnis: Tausende Euro weniger Entschädigung.",
              },
              {
                icon: Ban,
                title: "Wichtige Positionen werden verschwiegen",
                desc: "Wertminderung, Nutzungsausfall, Mietwagenkosten — die Versicherung verschweigt Ihnen, was Ihnen zusteht.",
              },
              {
                icon: AlertTriangle,
                title: "Zeitdruck wird aufgebaut",
                desc: "Schnelle Angebote, schnelle Unterschrift — die Versicherung will den Fall schnell und günstig abwickeln. Auf Ihre Kosten.",
              },
              {
                icon: Timer,
                title: "Jeder Tag schwächt Ihre Position",
                desc: "Ohne professionelles Gutachten verlieren Sie Beweise. Je länger Sie warten, desto schwieriger wird die Durchsetzung Ihrer Ansprüche.",
              },
              {
                icon: HelpCircle,
                title: "Bürokratie überfordert",
                desc: "Formulare, Fristen, Versicherungskommunikation — alles fällt auf Sie zurück. Zusätzlich zum Stress nach dem Unfall.",
              },
              {
                icon: Scale,
                title: "Ohne Gutachter kein faires Verfahren",
                desc: "Die Versicherung hat Juristen und Gutachter. Sie stehen allein da — es sei denn, Sie holen sich einen unabhängigen Experten.",
              },
            ].map((problem, i) => (
              <FadeIn key={problem.title} delay={i * 0.1}>
                <div className="group p-6 rounded-2xl border border-[#E8E8E8] bg-white hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] hover:border-[#EBEB02]/40 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#EBEB02]/10 flex items-center justify-center mb-4 group-hover:bg-[#EBEB02]/20 transition-colors">
                    <problem.icon className="w-6 h-6 text-[#0D0D0D]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0D0D0D] mb-2">{problem.title}</h3>
                  <p className="text-sm text-[#4A4A4A] leading-relaxed">{problem.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Block 1 ─── */}
      <CTABlock onOpen={() => setFunnelOpen(true)} />

      {/* ─── 5. VALUE / LEISTUNGEN ─── */}
      <section id="leistungen" className="py-16 md:py-24 bg-white">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <SectionLabel>Unsere Lösung</SectionLabel>
              <h2 className="text-[clamp(24px,3.5vw,44px)] font-extrabold text-[#0D0D0D] mt-4 mb-4">
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
              },
              {
                icon: Shield,
                title: "Versicherungskommunikation inklusive",
                desc: "Wir übernehmen die komplette Kommunikation mit der gegnerischen Versicherung. Sie müssen nicht einen einzigen Brief schreiben.",
                tag: "Alles aus einer Hand",
              },
              {
                icon: Scale,
                title: "Kostenloser Anwalt bei Bedarf",
                desc: "Wenn die Versicherung nicht zahlt, schalten wir einen spezialisierten Verkehrsrechtsanwalt ein — für Sie kostenlos (§ 249 BGB).",
                tag: "Kostenlos",
              },
              {
                icon: Clock,
                title: "Schadenaufnahme in 24 Stunden",
                desc: "Innerhalb von 24 Stunden kommt unser Gutachter zu Ihnen — an Ihren Standort, zu Ihrer Wunschzeit. Auszahlung in Ø 7–19 Tagen.",
                tag: "24/7 erreichbar",
              },
            ].map((value, i) => (
              <FadeIn key={value.title} delay={i * 0.1}>
                <div className="flex gap-5 p-6 rounded-2xl border border-[#E8E8E8] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#EBEB02] flex items-center justify-center shrink-0">
                    <value.icon className="w-6 h-6 text-[#0D0D0D]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0D0D0D] mb-1">{value.title}</h3>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-3">{value.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#22C55E] bg-[#22C55E]/10 px-3 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {value.tag}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. HOW IT WORKS ─── */}
      <section id="ablauf" className="py-16 md:py-24 bg-[#F7F7F7]">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <SectionLabel>So funktioniert's</SectionLabel>
              <h2 className="text-[clamp(24px,3.5vw,44px)] font-extrabold text-[#0D0D0D] mt-4 mb-4">
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
            <div className="text-center mt-12">
              <button onClick={() => setFunnelOpen(true)} className="btn-primary text-lg !px-10 !py-5">
                Jetzt in 60 Sekunden starten
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="mt-4 text-sm text-[#767676]">
                ✓ 100 % kostenlos · ✓ Kein Risiko · ✓ 60 Sekunden
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── 7. DIFFERENTIATION ─── */}
      <section className="py-16 md:py-24 bg-[#111111]">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <SectionLabel>Der Unterschied</SectionLabel>
              <h2 className="text-[clamp(24px,3.5vw,44px)] font-extrabold text-white mt-4 mb-4">
                Versicherungs-Gutachter vs. Augustiner KFZ
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Sehen Sie selbst, warum ein unabhängiges Gutachten Tausende Euro Unterschied macht.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="max-w-3xl mx-auto overflow-hidden rounded-2xl border border-white/10">
              <div className="grid grid-cols-3 bg-white/5">
                <div className="p-4 text-sm font-bold text-gray-400">Kriterium</div>
                <div className="p-4 text-sm font-bold text-[#EF4444] text-center">Versicherungs-Gutachter</div>
                <div className="p-4 text-sm font-bold text-[#22C55E] text-center">Augustiner KFZ</div>
              </div>
              {[
                { label: "Arbeitet für", bad: "Die Versicherung", good: "Nur für Sie" },
                { label: "Ø Entschädigung", bad: "2.100 € (gekürzt)", good: "6.890 € (vollständig)" },
                { label: "Schadenspositionen", bad: "Minimal", good: "Alle 16 Positionen" },
                { label: "Versicherungs-Kommunikation", bad: "Sie selbst", good: "Wir übernehmen alles" },
                { label: "Anwalt inklusive", bad: "Nein", good: "Ja — kostenlos" },
                { label: "Kosten für Sie", bad: "Tausende € weniger", good: "0 €" },
              ].map((row, i) => (
                <div key={row.label} className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                  <div className="p-4 text-sm font-semibold text-white">{row.label}</div>
                  <div className="p-4 text-sm text-gray-400 text-center flex items-center justify-center gap-1.5">
                    <XCircle className="w-4 h-4 text-[#EF4444] shrink-0" />
                    <span>{row.bad}</span>
                  </div>
                  <div className="p-4 text-sm text-white text-center flex items-center justify-center gap-1.5">
                    <Check className="w-4 h-4 text-[#22C55E] shrink-0" />
                    <span className="font-semibold">{row.good}</span>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── 8. FOUNDER ─── */}
      <section className="py-16 md:py-24 bg-white">
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
                <h2 className="text-[clamp(24px,3.5vw,44px)] font-extrabold text-[#0D0D0D] mt-4 mb-6">
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
      <CTABlock onOpen={() => setFunnelOpen(true)} variant="dark" />

      {/* ─── 9. CASE STUDIES ─── */}
      <section id="faelle" className="py-16 md:py-24 bg-white">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <SectionLabel>Echte Ergebnisse</SectionLabel>
              <h2 className="text-[clamp(24px,3.5vw,44px)] font-extrabold text-[#0D0D0D] mt-4 mb-4">
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
                amount: "7.340 €",
                insurance: "1.800 €",
                days: "12 Tage",
                name: "Mehmet K.",
              },
              {
                car: "BMW 430d",
                type: "Seitenschaden",
                amount: "5.890 €",
                insurance: "2.200 €",
                days: "9 Tage",
                name: "Sarah L.",
              },
              {
                car: "VW Tiguan",
                type: "Frontschaden",
                amount: "8.120 €",
                insurance: "2.800 €",
                days: "14 Tage",
                name: "Thomas W.",
              },
              {
                car: "Audi A4",
                type: "Auffahrunfall",
                amount: "6.200 €",
                insurance: "1.500 €",
                days: "7 Tage",
                name: "Aylin D.",
              },
            ].map((c, i) => (
              <FadeIn key={c.name} delay={i * 0.1}>
                <div className="bg-white rounded-2xl border border-[#E8E8E8] overflow-hidden hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)] transition-all duration-300">
                  <div className="bg-[#111111] p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{c.type}</p>
                    <p className="text-white font-bold mt-1">{c.car}</p>
                  </div>
                  <div className="p-5">
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-2xl font-black text-[#22C55E]">{c.amount}</span>
                    </div>
                    <p className="text-xs text-[#767676] mb-4">
                      statt <span className="line-through text-[#EF4444]">{c.insurance}</span> (Versicherungsangebot)
                    </p>
                    <div className="flex items-center justify-between text-xs text-[#4A4A4A]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {c.days}
                      </span>
                      <span>{c.name}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10. FAQ ─── */}
      <section id="faq" className="py-16 md:py-24 bg-[#F7F7F7]">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <SectionLabel>Häufige Fragen</SectionLabel>
              <h2 className="text-[clamp(24px,3.5vw,44px)] font-extrabold text-[#0D0D0D] mt-4 mb-4">
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

      {/* ─── 11. FINAL CTA ─── */}
      <section className="py-20 md:py-32 bg-[#0D0D0D] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(235,235,2,0.08)_0%,_transparent_60%)]" />
        <div className="container relative text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              Ihre Entschädigung wartet.<br />
              <span className="text-[#EBEB02]">Holen Sie sie sich.</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
              Durchschnittlich 6.890 € — kostenlos, in 60 Sekunden gestartet.
              Jeder Tag ohne Gutachten schwächt Ihre Position.
            </p>
            <button onClick={() => setFunnelOpen(true)} className="btn-primary text-xl !px-12 !py-6 !rounded-2xl">
              Jetzt Entschädigung sichern
              <ArrowRight className="w-6 h-6" />
            </button>
            <p className="mt-6 text-sm text-gray-500">
              ✓ 100 % kostenlos · ✓ Kein Risiko · ✓ 60 Sekunden
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <a href="tel:+4915141621062" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4" /> +49 1514 1621062
              </a>
              <span className="text-gray-600">·</span>
              <a href="mailto:info@augustiner-kfz.de" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
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
              <a href="/impressum" className="hover:text-white transition-colors">Impressum</a>
              <a href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</a>
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
