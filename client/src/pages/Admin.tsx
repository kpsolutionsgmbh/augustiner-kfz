import { useState, useEffect } from "react";
import { LogIn, LogOut, Phone, Mail, User, Clock, Car, Search, ChevronDown } from "lucide-react";

interface Lead {
  id: number;
  accident_type: string;
  timeframe: string;
  fault: string;
  name: string;
  phone: string;
  email: string;
  created_at: string;
}

const ACCIDENT_LABELS: Record<string, string> = {
  auffahrunfall: "Auffahrunfall",
  "seitenanstoß": "Seitenkollision",
  kreuzung: "Kreuzungsunfall",
  parkschaden: "Parkschaden",
  totalschaden: "Totalschaden",
  sonstiges: "Sonstiges",
};

const FAULT_LABELS: Record<string, string> = {
  gegner: "Unfallgegner",
  teilschuld: "Teilschuld",
  unklar: "Noch unklar",
};

function LoginForm({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login fehlgeschlagen");
        return;
      }
      localStorage.setItem("admin_token", data.token);
      onLogin(data.token);
    } catch {
      setError("Verbindungsfehler");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-5">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-1 mb-6">
            <span className="text-2xl font-black tracking-tight text-white">AUGUSTINER</span>
            <span className="flex items-center gap-1">
              <span className="flex gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EBEB02]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#EBEB02]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#EBEB02]" />
              </span>
              <span className="text-[10px] font-semibold tracking-[0.08em] text-gray-400 uppercase">
                Admin-Bereich
              </span>
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#1A1A1A] rounded-2xl p-6 space-y-4 ring-1 ring-white/10">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1.5">Benutzername</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0D0D0D] border border-white/10 text-sm text-white placeholder:text-gray-600 focus:border-[#EBEB02] focus:outline-none transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1.5">Passwort</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-[#0D0D0D] border border-white/10 text-sm text-white placeholder:text-gray-600 focus:border-[#EBEB02] focus:outline-none transition-colors"
            />
          </div>
          {error && (
            <p className="text-sm text-red-400 bg-red-400/10 px-3 py-2 rounded-lg">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading || !username || !password}
            className="w-full flex items-center justify-center gap-2 bg-[#EBEB02] text-[#0D0D0D] font-bold py-3 rounded-xl hover:brightness-110 transition-all disabled:opacity-40"
          >
            <LogIn className="w-4 h-4" />
            {loading ? "Anmelden..." : "Anmelden"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/leads", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        onLogout();
        return;
      }
      const data = await res.json();
      setLeads(data);
    } catch {
      setError("Leads konnten nicht geladen werden");
    } finally {
      setLoading(false);
    }
  };

  const filtered = leads.filter((l) => {
    const q = search.toLowerCase();
    return (
      l.name.toLowerCase().includes(q) ||
      l.phone.includes(q) ||
      l.email.toLowerCase().includes(q) ||
      (ACCIDENT_LABELS[l.accident_type] || l.accident_type || "").toLowerCase().includes(q)
    );
  });

  const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Header */}
      <header className="bg-[#0D0D0D] sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex flex-col leading-none gap-0.5">
            <span className="text-lg font-black tracking-tight text-white">AUGUSTINER</span>
            <span className="flex items-center gap-1">
              <span className="flex gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EBEB02]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#EBEB02]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#EBEB02]" />
              </span>
              <span className="text-[9px] font-semibold tracking-[0.08em] text-gray-400 uppercase">
                Admin
              </span>
            </span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Abmelden</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 border border-[#E8E8E8]">
            <p className="text-2xl font-black text-[#0D0D0D]">{leads.length}</p>
            <p className="text-xs text-[#767676] font-medium">Gesamt Leads</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[#E8E8E8]">
            <p className="text-2xl font-black text-[#0D0D0D]">
              {leads.filter((l) => {
                const d = new Date(l.created_at);
                const now = new Date();
                return d.toDateString() === now.toDateString();
              }).length}
            </p>
            <p className="text-xs text-[#767676] font-medium">Heute</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[#E8E8E8]">
            <p className="text-2xl font-black text-[#0D0D0D]">
              {leads.filter((l) => {
                const d = new Date(l.created_at);
                const now = new Date();
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                return d >= weekAgo;
              }).length}
            </p>
            <p className="text-xs text-[#767676] font-medium">Diese Woche</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[#E8E8E8]">
            <p className="text-2xl font-black text-[#0D0D0D]">
              {leads.filter((l) => {
                const d = new Date(l.created_at);
                const now = new Date();
                return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
              }).length}
            </p>
            <p className="text-xs text-[#767676] font-medium">Diesen Monat</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767676]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Leads durchsuchen..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E8E8E8] bg-white text-sm focus:border-[#EBEB02] focus:outline-none transition-colors"
          />
        </div>

        {/* Leads List */}
        {loading ? (
          <div className="text-center py-12 text-[#767676]">Laden...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-[#767676]">
            {leads.length === 0 ? "Noch keine Leads vorhanden" : "Keine Ergebnisse"}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((lead) => (
              <div
                key={lead.id}
                className="bg-white rounded-xl border border-[#E8E8E8] overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-[#EBEB02] flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-[#0D0D0D]">
                        {lead.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-[#0D0D0D] text-sm truncate">{lead.name}</p>
                      <p className="text-xs text-[#767676]">{formatDate(lead.created_at)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden sm:inline text-xs bg-[#F7F7F7] px-2.5 py-1 rounded-full text-[#4A4A4A] font-medium">
                      {ACCIDENT_LABELS[lead.accident_type] || lead.accident_type}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#767676] transition-transform ${expandedId === lead.id ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                {expandedId === lead.id && (
                  <div className="border-t border-[#E8E8E8] p-4 space-y-3 bg-[#FAFAFA]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a href={`tel:${lead.phone}`} className="flex items-center gap-2.5 text-sm text-[#0D0D0D] hover:text-[#EBEB02] transition-colors">
                        <Phone className="w-4 h-4 text-[#767676]" />
                        {lead.phone}
                      </a>
                      <a href={`mailto:${lead.email}`} className="flex items-center gap-2.5 text-sm text-[#0D0D0D] hover:text-[#EBEB02] transition-colors">
                        <Mail className="w-4 h-4 text-[#767676]" />
                        {lead.email}
                      </a>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#E8E8E8]">
                      <div className="flex items-center gap-2 text-sm">
                        <Car className="w-4 h-4 text-[#767676]" />
                        <span className="text-[#4A4A4A]">{ACCIDENT_LABELS[lead.accident_type] || lead.accident_type || "–"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-[#767676]" />
                        <span className="text-[#4A4A4A]">{lead.timeframe || "–"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-[#767676]" />
                        <span className="text-[#4A4A4A]">Schuld: {FAULT_LABELS[lead.fault] || lead.fault || "–"}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default function Admin() {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("admin_token")
  );

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
  };

  if (!token) {
    return <LoginForm onLogin={setToken} />;
  }

  return <Dashboard token={token} onLogout={handleLogout} />;
}
