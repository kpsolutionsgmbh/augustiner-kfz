import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Impressum() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#0D0D0D] py-16 md:py-24">
        <div className="container">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Startseite
          </Link>
          <h1 className="text-3xl md:text-5xl font-black text-white">Impressum</h1>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12 md:py-16">
        <div className="max-w-3xl prose prose-sm md:prose-base prose-neutral">
          <h2>AUGUSTINER Ingenieurbüro</h2>
          <p>
            Volkan Kedik<br />
            Karmeliterstraße 86<br />
            53229 Bonn
          </p>

          <h2>Kontakt</h2>
          <p>
            Telefon: 0151 41621062<br />
            E-Mail: unfall@augustiner-kfz.de
          </p>

          <h2>Umsatzsteuer-ID</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
            DE364023163
          </p>

          <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
          <p>
            Berufsbezeichnung: Ingenieur für KFZ-Sachverständigung<br />
            Verliehen in: Deutschland
          </p>

          <h2>Redaktionell verantwortlich</h2>
          <p>
            Augustiner Ingenieurbüro<br />
            Volkan Kedik<br />
            Karmeliterstraße 86<br />
            53229 Bonn
          </p>

          <h2>EU-Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-[#0D0D0D] underline">
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>

          <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>

          <h2>Zentrale Kontaktstelle nach dem Digital Services Act – DSA</h2>
          <p>(Verordnung (EU) 2022/265)</p>
          <p>
            Unsere zentrale Kontaktstelle für Nutzer und Behörden nach Art. 11, 12 DSA erreichen Sie wie folgt:
          </p>
          <p>
            E-Mail: unfall@augustiner-kfz.de<br />
            Telefon: 0151 41621062
          </p>
          <p>Die für den Kontakt zur Verfügung stehenden Sprachen sind: Deutsch, Englisch.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 bg-[#0A0A0A] border-t border-white/5">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
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
    </div>
  );
}
