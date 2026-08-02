import { createServerFn } from "@tanstack/react-start";
import { readFile } from "node:fs/promises";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Gemeinsame Bausteine für Startseite und Unterseiten                  */
/* (Header, Footer, Logo, Icons) – eine Quelle für beide, damit das     */
/* Design konsistent bleibt.                                            */
/* ------------------------------------------------------------------ */

// Der Business-Name kommt aus site.json (zur Laufzeit gelesen, kein Rebuild nötig).
export const getBusinessName = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const cfg = JSON.parse(await readFile("site.json", "utf8")) as {
        businessName?: string;
      };
      return cfg.businessName?.trim() ?? "";
    } catch {
      return "";
    }
  },
);

/* ------------------------------------------------------------------ */
/* Kleine SVG-Icons (nur was wirklich gebraucht wird)                   */
/* ------------------------------------------------------------------ */

export function Icon({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export const icons = {
  pulse: <path d="M2 12h4l2-6 4 12 2-6h8" />,
  check: <path d="M20 6 9 17l-5-5" />,
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </>
  ),
};

/* ------------------------------------------------------------------ */
/* Kleine Bausteine mit Hand-Charakter                                  */
/* ------------------------------------------------------------------ */

/** Handgezeichnet wirkender Unterstrich */
export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 12"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 8C40 3 70 10 110 6s70 6 107 3"
        stroke="currentColor"
        strokeWidth={4.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Editoriale Sektions-Überschrift: Nummer · Linie · Label */
export function Eyebrow({
  nr,
  label,
  dark = false,
}: {
  nr: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <p
      className={`flex items-center gap-3 ${
        dark ? "text-sand-300" : "text-pine-600"
      }`}
    >
      <span className="font-display text-lg italic">{nr}</span>
      <span
        className={`h-px w-10 ${dark ? "bg-sand-300/50" : "bg-pine-400/60"}`}
      />
      <span className="text-sm font-bold uppercase tracking-[0.18em]">
        {label}
      </span>
    </p>
  );
}

/** Handgeschriebene Randnotiz */
export function HandNote({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`font-hand text-2xl leading-snug text-pine-700 ${className}`}>
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Logo                                                                 */
/* ------------------------------------------------------------------ */

export function Logo({
  businessName,
  light,
  href = "#start",
}: {
  businessName: string;
  light?: boolean;
  href?: string;
}) {
  return (
    <a href={href} className="flex items-center gap-2.5">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-pine-800 text-sand-100">
        <Icon className="h-5 w-5">{icons.pulse}</Icon>
      </span>
      <span
        className={`font-display text-lg font-semibold tracking-tight ${
          light ? "text-sand-50" : "text-pine-950"
        }`}
      >
        {businessName}
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Header                                                               */
/* ------------------------------------------------------------------ */

/**
 * Fixer Header wie auf der Startseite. Auf Unterseiten (`home=false`)
 * führen die Anker-Links zur Startseite (`/#…`); fragment-only-Wechsel
 * auf der Startseite scrollen wie gehabt sanft zur Sektion.
 */
export function Header({
  businessName,
  home = false,
}: {
  businessName: string;
  home?: boolean;
}) {
  const base = home ? "" : "/";
  const nav = [
    { href: `${base}#funktionen`, label: "Funktionen" },
    { href: `${base}#zielgruppen`, label: "Zielgruppen" },
    { href: `${base}#pakete`, label: "Pakete" },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-pine-900/5 bg-sand-50/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo businessName={businessName} href={home ? "#start" : "/"} />
        <nav className="hidden items-center gap-2.5 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="group inline-flex items-center gap-1.5 rounded-full border-2 border-pine-700/25 bg-sand-100 px-4 py-1.5 text-sm font-bold text-pine-900 shadow-sm transition hover:-translate-y-0.5 hover:border-pine-700 hover:bg-sand-200 hover:shadow-md"
            >
              {n.label}
              <Icon className="h-3.5 w-3.5 text-pine-500 transition group-hover:translate-x-0.5 group-hover:text-pine-800">
                {icons.arrow}
              </Icon>
            </a>
          ))}
        </nav>
        <a
          href={`${base}#beta`}
          className="rounded-full bg-pine-800 px-4 py-2 text-sm font-semibold text-sand-50 shadow-sm transition hover:bg-pine-700"
        >
          Beta-Zugang
        </a>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                               */
/* ------------------------------------------------------------------ */

export function Footer({
  businessName,
  home = false,
}: {
  businessName: string;
  home?: boolean;
}) {
  const base = home ? "" : "/";
  const nav = [
    { href: `${base}#funktionen`, label: "Funktionen" },
    { href: `${base}#zielgruppen`, label: "Zielgruppen" },
    { href: `${base}#pakete`, label: "Pakete" },
    { href: `${base}#beta`, label: "Beta-Zugang" },
  ];
  return (
    <footer className="border-t border-pine-800 bg-pine-950 py-12 text-sand-100/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-4 sm:px-6 md:flex-row md:items-start">
        <div className="max-w-xs text-center md:text-left">
          <Logo
            businessName={businessName}
            light
            href={home ? "#start" : "/"}
          />
          <p className="mt-4 text-sm leading-relaxed">
            Das KI-gestützte Dashboard für kleine Hotels, Ferienwohnungen,
            Campingplätze und Tourenanbieter.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-sand-200/70">
            Bald: 24 Stunden kostenlos testen – ohne Zahlungspflicht.
          </p>
        </div>

        <nav className="flex gap-8 text-sm">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="transition hover:text-sand-50"
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-pine-800 px-4 pt-6 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-3 text-xs text-sand-100/40 md:flex-row md:items-center">
          <p>
            © 2026 TourPulse AI. Vorschau-Seite: Das Produkt befindet sich in
            Entwicklung, es finden derzeit keine Zahlungen statt. Alle Preise
            sind Vorschau.
          </p>
          <nav className="flex shrink-0 items-center gap-5">
            <a href="/impressum" className="transition hover:text-sand-50">
              Impressum
            </a>
            <a href="/datenschutz" className="transition hover:text-sand-50">
              Datenschutz
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Layout für Rechtsseiten (Impressum, Datenschutz)                     */
/* ------------------------------------------------------------------ */

/**
 * Ruhige, seriöse Schablone für Unterseiten: fixer Header (ohne Hero),
 * schmale Textspalte, Footer. `pt-16` gleicht den fixen Header aus.
 */
export function LegalPage({
  businessName,
  children,
}: {
  businessName: string;
  children: ReactNode;
}) {
  return (
    <>
      <Header businessName={businessName} />
      <main className="bg-sand-50 pt-16">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          {children}
        </div>
      </main>
      <Footer businessName={businessName} />
    </>
  );
}

/** Deutlich sichtbarer Platzhalter für noch fehlende Betreiberdaten */
export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md bg-sand-200 px-1.5 py-0.5 font-mono text-[0.9em] font-medium text-pine-900">
      {children}
    </span>
  );
}
