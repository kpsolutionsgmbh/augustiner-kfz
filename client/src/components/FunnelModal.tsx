import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Car, Clock, Shield, ChevronRight, CheckCircle2, Loader2, Phone, User, Mail } from "lucide-react";

interface FunnelModalProps {
  open: boolean;
  onClose: () => void;
}

const ACCIDENT_TYPES = [
  { id: "auffahrunfall", label: "Auffahrunfall", icon: "🚗" },
  { id: "seitenanstoß", label: "Seitenkollision", icon: "💥" },
  { id: "kreuzung", label: "Kreuzungsunfall", icon: "🔀" },
  { id: "parkschaden", label: "Parkschaden", icon: "🅿️" },
  { id: "totalschaden", label: "Totalschaden", icon: "🔧" },
  { id: "sonstiges", label: "Sonstiges", icon: "📋" },
];

const TIME_OPTIONS = [
  { id: "heute", label: "Heute" },
  { id: "diese-woche", label: "Diese Woche" },
  { id: "diesen-monat", label: "Diesen Monat" },
  { id: "laenger", label: "Länger als 1 Monat her" },
];

const FAULT_OPTIONS = [
  { id: "gegner", label: "Der Unfallgegner", desc: "Sie wurden unverschuldet in den Unfall verwickelt" },
  { id: "teilschuld", label: "Teilschuld", desc: "Beide Parteien tragen eine Mitschuld" },
  { id: "unklar", label: "Noch unklar", desc: "Die Schuldfrage ist noch nicht geklärt" },
];

export function FunnelModal({ open, onClose }: FunnelModalProps) {
  const [step, setStep] = useState(0);
  const [accidentType, setAccidentType] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [fault, setFault] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const reset = () => {
    setStep(0);
    setAccidentType("");
    setTimeframe("");
    setFault("");
    setName("");
    setPhone("");
    setEmail("");
    setLoading(false);
    setDone(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 2000);
  };

  const totalSteps = 4;
  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-[#F7F7F7] transition-colors"
            >
              <X className="w-5 h-5 text-[#767676]" />
            </button>

            {/* Progress Bar */}
            {!done && (
              <div className="h-1 bg-[#F7F7F7]">
                <motion.div
                  className="h-full bg-[#EBEB02]"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}

            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Accident Type */}
                {step === 0 && !done && (
                  <motion.div
                    key="step-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#767676] mb-2">Schritt 1 von 4</p>
                    <h3 className="text-xl md:text-2xl font-extrabold text-[#0D0D0D] mb-1">Was ist passiert?</h3>
                    <p className="text-sm text-[#767676] mb-6">Wählen Sie die Art des Unfalls aus.</p>
                    <div className="grid grid-cols-2 gap-2.5">
                      {ACCIDENT_TYPES.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => { setAccidentType(type.id); setStep(1); }}
                          className={`flex items-center gap-2.5 p-3 rounded-xl border-2 transition-all text-left hover:border-[#EBEB02] hover:bg-[#FAFACC]/30 ${
                            accidentType === type.id ? "border-[#EBEB02] bg-[#FAFACC]/30" : "border-[#E8E8E8]"
                          }`}
                        >
                          <span className="text-xl shrink-0">{type.icon}</span>
                          <span className="text-[13px] font-semibold text-[#1A1A1A] leading-tight">{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Timeframe */}
                {step === 1 && !done && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#767676] mb-2">Schritt 2 von 4</p>
                    <h3 className="text-xl md:text-2xl font-extrabold text-[#0D0D0D] mb-1">Wann war der Unfall?</h3>
                    <p className="text-sm text-[#767676] mb-6">Je schneller das Gutachten erstellt wird, desto besser Ihre Position.</p>
                    <div className="space-y-3">
                      {TIME_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => { setTimeframe(opt.id); setStep(2); }}
                          className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all hover:border-[#EBEB02] hover:bg-[#FAFACC]/30 ${
                            timeframe === opt.id ? "border-[#EBEB02] bg-[#FAFACC]/30" : "border-[#E8E8E8]"
                          }`}
                        >
                          <span className="text-sm font-semibold text-[#1A1A1A]">{opt.label}</span>
                          <ChevronRight className="w-4 h-4 text-[#767676]" />
                        </button>
                      ))}
                    </div>
                    <button onClick={() => setStep(0)} className="mt-4 text-sm text-[#767676] hover:text-[#0D0D0D]">
                      ← Zurück
                    </button>
                  </motion.div>
                )}

                {/* Step 3: Fault */}
                {step === 2 && !done && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#767676] mb-2">Schritt 3 von 4</p>
                    <h3 className="text-xl md:text-2xl font-extrabold text-[#0D0D0D] mb-1">Wer war schuld?</h3>
                    <p className="text-sm text-[#767676] mb-6">Keine Sorge — auch bei unklarer Schuldfrage helfen wir Ihnen.</p>
                    <div className="space-y-3">
                      {FAULT_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => { setFault(opt.id); setStep(3); }}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all hover:border-[#EBEB02] hover:bg-[#FAFACC]/30 ${
                            fault === opt.id ? "border-[#EBEB02] bg-[#FAFACC]/30" : "border-[#E8E8E8]"
                          }`}
                        >
                          <span className="text-sm font-semibold text-[#1A1A1A] block">{opt.label}</span>
                          <span className="text-xs text-[#767676] mt-0.5 block">{opt.desc}</span>
                        </button>
                      ))}
                    </div>
                    <button onClick={() => setStep(1)} className="mt-4 text-sm text-[#767676] hover:text-[#0D0D0D]">
                      ← Zurück
                    </button>
                  </motion.div>
                )}

                {/* Step 4: Contact Form */}
                {step === 3 && !done && !loading && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#767676] mb-2">Schritt 4 von 4</p>
                    <h3 className="text-xl md:text-2xl font-extrabold text-[#0D0D0D] mb-1">Fast geschafft!</h3>
                    <p className="text-sm text-[#767676] mb-6">Hinterlassen Sie Ihre Kontaktdaten — wir melden uns innerhalb von 30 Minuten.</p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">Name *</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767676]" />
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ihr vollständiger Name"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-[#E8E8E8] text-sm focus:border-[#EBEB02] focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">Telefonnummer *</label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767676]" />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+49 ..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-[#E8E8E8] text-sm focus:border-[#EBEB02] focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">E-Mail (optional)</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767676]" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Ihre E-Mail-Adresse"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-[#E8E8E8] text-sm focus:border-[#EBEB02] focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                      <button
                        onClick={handleSubmit}
                        disabled={!name.trim() || !phone.trim()}
                        className="btn-primary w-full !rounded-xl disabled:opacity-40 disabled:cursor-not-allowed disabled:animate-none"
                      >
                        Kostenlos absenden
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      <p className="text-center text-xs text-[#767676]">
                        ✓ 100 % kostenlos · ✓ Kein Risiko · ✓ Rückruf in 30 Min.
                      </p>
                    </div>
                    <button onClick={() => setStep(2)} className="mt-4 text-sm text-[#767676] hover:text-[#0D0D0D]">
                      ← Zurück
                    </button>
                  </motion.div>
                )}

                {/* Loading State */}
                {loading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center"
                  >
                    <Loader2 className="w-12 h-12 mx-auto text-[#EBEB02] animate-spin mb-6" />
                    <h3 className="text-xl font-extrabold text-[#0D0D0D] mb-2">Ihre Anfrage wird verarbeitet...</h3>
                    <div className="space-y-3 mt-6">
                      {[
                        { icon: Car, text: "Unfalltyp erfasst" },
                        { icon: Clock, text: "Zeitraum gespeichert" },
                        { icon: Shield, text: "Daten verschlüsselt übertragen" },
                      ].map(({ icon: Icon, text }, i) => (
                        <motion.div
                          key={text}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.4 }}
                          className="flex items-center gap-3 justify-center text-sm text-[#4A4A4A]"
                        >
                          <Icon className="w-4 h-4 text-[#22C55E]" />
                          {text}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Done State */}
                {done && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 12, delay: 0.1 }}
                    >
                      <CheckCircle2 className="w-16 h-16 mx-auto text-[#22C55E] mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-extrabold text-[#0D0D0D] mb-2">Vielen Dank, {name.split(" ")[0]}!</h3>
                    <p className="text-[#4A4A4A] mb-6 max-w-sm mx-auto">
                      Unser Team meldet sich innerhalb von 30 Minuten bei Ihnen — kostenlos und unverbindlich.
                    </p>
                    <div className="bg-[#F7F7F7] rounded-xl p-4 mb-6 text-sm text-left max-w-xs mx-auto space-y-2">
                      <p className="font-semibold text-[#0D0D0D]">Was passiert jetzt?</p>
                      <p className="text-[#4A4A4A]">1. Wir rufen Sie unter <strong>{phone}</strong> an</p>
                      <p className="text-[#4A4A4A]">2. Kostenlose Erstberatung durch Master-Ingenieur</p>
                      <p className="text-[#4A4A4A]">3. Schadenaufnahme innerhalb von 24 Stunden</p>
                    </div>
                    <a href="tel:+4915141621062" className="btn-dark">
                      <Phone className="w-4 h-4" />
                      Direkt anrufen: +49 1514 1621062
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
