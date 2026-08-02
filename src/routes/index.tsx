import { createFileRoute } from "@tanstack/react-router";
import {
  Eyebrow,
  Footer,
  HandNote,
  Header,
  Icon,
  Squiggle,
  getBusinessName,
  icons,
} from "~/components/site";

export const Route = createFileRoute("/")({
  loader: () => getBusinessName(),
  component: Home,
});

/* ------------------------------------------------------------------ */
/* Kleine Bausteine mit Hand-Charakter                                  */
/* ------------------------------------------------------------------ */

/**
 * Ruhige Abschnitts-Überschrift: Eyebrow + große Serif-Headline,
 * dazu eine handschriftliche Randnotiz als Sticker.
 */
function SectionHeader({
  nr,
  label,
  title,
  note,
}: {
  nr: string;
  label: string;
  title: React.ReactNode;
  note?: string;
}) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
      <div className="max-w-2xl">
        <Eyebrow nr={nr} label={label} />
        <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-pine-950 sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
      </div>
      {note && (
        <HandNote className="-rotate-2 shrink-0 self-start sm:max-w-[15rem] sm:pb-1 sm:text-right">
          {note}
        </HandNote>
      )}
    </div>
  );
}

/** Polaroid-artiges Foto mit Klebeband und handschriftlicher Beschriftung */
function PhotoCard({
  src,
  alt,
  caption = "",
  rotate = "rotate-0",
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  rotate?: string;
  className?: string;
}) {
  return (
    <figure
      className={`relative rounded-2xl bg-white p-2.5 pb-4 shadow-lg shadow-pine-900/10 sm:p-3 ${rotate} ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute -top-2.5 left-1/2 h-5 w-20 -translate-x-1/2 -rotate-2 rounded-[2px] bg-sand-200/80 shadow-sm"
      />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="aspect-[3/2] w-full rounded-lg object-cover"
      />
      {caption && (
        <figcaption className="mt-2.5 text-center font-hand text-xl leading-snug text-pine-800">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */

/** Verkleinerte, ehrlich gekennzeichnete Dashboard-Vorschau */
function MiniDashboard() {
  const bars = [55, 75, 45, 90, 65, 80, 50];
  return (
    <div className="overflow-hidden rounded-xl border border-pine-900/10 bg-white shadow-xl shadow-pine-900/15">
      {/* Fensterleiste */}
      <div className="flex items-center justify-between border-b border-pine-900/10 bg-sand-100 px-3 py-2">
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-sand-300" />
          <span className="h-2 w-2 rounded-full bg-sand-300" />
          <span className="h-2 w-2 rounded-full bg-sand-300" />
        </div>
        <span className="text-[10px] font-medium text-pine-700">
          TourPulse AI · Dashboard
        </span>
        <span className="rounded-full bg-pine-700 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-sand-100">
          Vorschau
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 p-3">
        {/* Auslastungs-Prognose */}
        <div className="rounded-lg border border-pine-900/10 p-2.5">
          <div className="mb-2 h-2 w-3/4 rounded bg-pine-200" />
          <div className="flex h-12 items-end gap-1">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-pine-300"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* Preisvorschlag */}
        <div className="rounded-lg border border-pine-900/10 p-2.5">
          <div className="mb-2 h-2 w-1/2 rounded bg-pine-200" />
          <span className="inline-flex items-center gap-1 rounded-full bg-pine-100 px-2 py-1 text-[9px] font-semibold text-pine-800">
            <Icon className="h-3 w-3">{icons.check}</Icon>
            Preisvorschlag
          </span>
          <div className="mt-2 h-2 w-4/5 rounded bg-sand-200" />
          <div className="mt-1.5 h-2 w-3/5 rounded bg-sand-200" />
        </div>
      </div>
    </div>
  );
}

function Hero({ businessName }: { businessName: string }) {
  return (
    <section id="start" className="relative overflow-hidden bg-sand-50 pt-16">
      {/* dezente Hintergrund-Akzente */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-sand-200/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-96 w-96 rounded-full bg-pine-100/70 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div>
          <HandNote className="-rotate-1">
            In Entwicklung – wir bauen gerade daran.
          </HandNote>

          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-pine-950 sm:text-5xl lg:text-[3.4rem]">
            Wissen, was auf Sie zukommt –{" "}
            <span className="relative inline-block">
              <em className="italic text-pine-600">
                vor dem Pfingstwochenende,
              </em>
              <Squiggle className="absolute -bottom-2 left-0 w-full text-pine-300" />
            </span>
            nicht danach.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-pine-900/75">
            {businessName} ist das Planungs-Dashboard für kleine Hotels,
            Ferienwohnungen, Campingplätze und Tourenanbieter: Es sagt Ankünfte
            und Auslastung voraus, schlägt passende Preise vor und zeigt, wo
            sich ein Angebot lohnt – gebaut für Betriebe, die selbst führen,
            ohne Datenabteilung.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#beta"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-pine-800 px-7 py-3.5 text-base font-semibold text-sand-50 shadow-lg shadow-pine-900/20 transition hover:bg-pine-700"
            >
              Beta-Zugang anfragen
              <Icon className="h-5 w-5">{icons.arrow}</Icon>
            </a>
            <a
              href="#pakete"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-dashed border-pine-700/40 px-6 py-3.5 text-base font-semibold text-pine-800 transition hover:border-pine-700 hover:bg-pine-50"
            >
              Bald: 24 h kostenlos testen
              <span className="rounded-full bg-sand-200 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-pine-800">
                geplant
              </span>
            </a>
          </div>

          <p className="mt-5 text-sm text-pine-800/60">
            Noch keine Zahlung, keine Abo-Pflicht – alle Preise sind Vorschau.
          </p>
        </div>

        {/* Bildwelt: echte Menschen statt generischem Mockup-Bild */}
        <div className="relative mx-auto mt-4 w-full max-w-md lg:mt-0 lg:max-w-none">
          <div className="mb-4 text-right">
            <HandNote className="inline-block rotate-1 sm:text-[1.65rem]">
              So soll das Dashboard später aussehen → wir arbeiten dran.
            </HandNote>
          </div>

          <PhotoCard
            src="/images/hostin.jpg"
            alt="Vermieterin steht vor der Tür ihrer Ferienwohnung"
            rotate="-rotate-2"
            className="shadow-2xl shadow-pine-900/15"
          />

          <div className="relative z-10 -mt-14 ml-8 w-[82%] rotate-[1.5deg] sm:-mt-16 sm:ml-16">
            <MiniDashboard />
            <p className="mt-2 text-center text-[11px] text-pine-800/60">
              Illustrative Vorschau des Dashboards – Produkt in Entwicklung.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Funktionen – editoriale, versetzte Nummernliste                      */
/* ------------------------------------------------------------------ */

const features = [
  {
    title: "Ankunfts- & Auslastungsprognose",
    text: "Sie sehen im Voraus, wer anreist und wie voll Ihr Haus wird – für die nächsten Tage, Wochen und Monate. Beispiel Pfingstwochenende: Drei Wochen vorher wissen Sie, dass alle vier Wohnungen voll werden, und können Reinigung, Frühstück und Schlüsselübergabe ruhig planen statt hektisch.",
    note: "Pfingsten voll? Sie wissen es vorher.",
  },
  {
    title: "Intelligente Preisvorschläge",
    text: "Das Dashboard schlägt Preise vor – als Empfehlung, die Sie annehmen oder verwerfen können. Beispiel Campingplatz: Im August ausgebucht, aber im Juni klafft eine Lücke. Genau für solche Wochen soll das Dashboard eine Preisfindung und Angebotsideen vorschlagen – ohne den August-Preis zu verwässern.",
    note: "",
  },
  {
    title: "Buchungsschwache Zeiten erkennen",
    text: "Statt im September zu merken, dass der Oktober fast leer ist, sehen Sie es früh genug, um noch etwas zu tun. Das Dashboard macht ruhige Phasen sichtbar – Wochen im Voraus, nicht hinterher.",
    note: "August ausgebucht, Juni leer – genau da lohnt sich ein Angebot.",
  },
  {
    title: "Werbe- & Angebotstipps",
    text: "Konkrete Tipps für die ruhigen Wochen: welches Angebot, welcher Kanal, welcher Ton – angepasst an Ihren Betrieb, Ihre Region und Ihre Gäste. Keine generischen Ratschläge, sondern Ideen, die zu Ihrem Haus passen.",
    note: "",
  },
  {
    title: "KI-Berichte",
    text: "Am Sonntagabend eine Zusammenfassung: Warum war der Monat gut, was war schwach, was lohnt sich als Nächstes? In einfacher Sprache, ohne Excel-Wissen – auf Knopfdruck.",
    note: "Sonntagabend, Kaffee, Bericht fertig.",
  },
];

function FeatureRow({
  title,
  text,
  note,
  index,
  offset,
}: {
  title: string;
  text: string;
  note: string;
  index: number;
  offset: boolean;
}) {
  return (
    <article
      className={`grid gap-3 sm:gap-5 lg:grid-cols-12 lg:items-start ${
        offset ? "lg:ml-16" : ""
      }`}
    >
      <div className="lg:col-span-2">
        <span className="font-display text-4xl font-light italic text-pine-400 sm:text-5xl">
          {String(index).padStart(2, "0")}
        </span>
        <span
          aria-hidden="true"
          className="mt-2 block h-px w-10 bg-pine-400/40"
        />
      </div>
      <div className="lg:col-span-7 lg:pr-8">
        <h3 className="font-display text-2xl font-semibold tracking-tight text-pine-950 sm:text-3xl">
          {title}
        </h3>
        <p className="mt-3 max-w-xl leading-relaxed text-pine-900/80">{text}</p>
      </div>
      <div className="lg:col-span-3">
        {note && <HandNote className="max-w-xs -rotate-1">{note}</HandNote>}
      </div>
    </article>
  );
}

function Features() {
  return (
    <section id="funktionen" className="bg-sand-50 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          nr="01"
          label="Funktionen"
          title="Alles für eine gut geplante Saison – in einem Dashboard"
          note="Kein Excel-Chaos, keine Bauchgefühle."
        />

        <div className="mt-10 space-y-10 sm:mt-14 sm:space-y-12">
          {features.map((f, i) => (
            <FeatureRow
              key={f.title}
              title={f.title}
              text={f.text}
              note={f.note}
              index={i + 1}
              offset={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Zielgruppen – versetzte Einträge mit Polaroid-Fotos                  */
/* ------------------------------------------------------------------ */

const audiences = [
  {
    title: "Kleine Hotels & Pensionen",
    points: [
      "Zimmerpreise smarter steuern",
      "Auslastung planen – Personal und Frühstück besser einteilen",
    ],
    note: "Frühstück planen, statt zu raten.",
    photo: null,
  },
  {
    title: "Ferienwohnungen",
    points: [
      "Preise pro Saison und Auslastung im Blick",
      "Leerstand früh erkennen und gegensteuern",
    ],
    note: "Die letzte freie Woche rechtzeitig sehen.",
    photo: null,
  },
  {
    title: "Campingplätze",
    points: [
      "Saisonverlauf und Spitzenzeiten voraussehen",
      "Stellplätze gleichmäßiger auslasten",
    ],
    note: "",
    photo: {
      src: "/images/camping.jpg",
      alt: "Camper sitzt am Morgen mit Kaffeetasse vor seinem Wohnmobil",
      caption: "Campingplatz – die ruhigen Wochen früh sehen.",
    },
  },
  {
    title: "Tourenanbieter",
    points: [
      "Nachfrage-Prognosen für Touren und Termine",
      "Schwache Termine gezielt mit Angeboten füllen",
    ],
    note: "Leere Termine gezielt füllen.",
    photo: null,
  },
];

function AudienceRow({
  a,
  offset,
}: {
  a: (typeof audiences)[number];
  offset: boolean;
}) {
  return (
    <div
      className={`grid gap-5 sm:grid-cols-2 sm:gap-10 ${
        offset ? "lg:ml-12" : ""
      }`}
    >
      <div>
        <h3 className="font-display text-xl font-semibold tracking-tight text-pine-950 sm:text-2xl">
          {a.title}
        </h3>
        <ul className="mt-4 space-y-3">
          {a.points.map((p) => (
            <li key={p} className="flex gap-2.5 text-[15px] text-pine-900/80">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-pine-600">
                {icons.check}
              </Icon>
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-start sm:justify-end">
        {a.photo ? (
          <PhotoCard
            src={a.photo.src}
            alt={a.photo.alt}
            caption={a.photo.caption}
            rotate="rotate-[1.5deg]"
            className="w-full max-w-sm shadow-xl shadow-pine-900/10 sm:mt-2"
          />
        ) : (
          a.note && (
            <HandNote className="-rotate-1 sm:text-right">{a.note}</HandNote>
          )
        )}
      </div>
    </div>
  );
}

function Audiences() {
  return (
    <section id="zielgruppen" className="bg-sand-50 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          nr="02"
          label="Zielgruppen"
          title="Gebaut für Gastgeber, die Verantwortung tragen"
          note="Ob 8 Zimmer oder 80 Stellplätze."
        />

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="max-w-md text-lg leading-relaxed text-pine-900/75">
                TourPulse AI richtet sich an Betriebe, die selbst führen – und
                keine Datenabteilung haben. Ob Hotel, Ferienwohnung,
                Campingplatz oder Tourenanbieter: Die Bedienung bleibt dieselbe,
                nur Ihre Zahlen sind anders.
              </p>
              <HandNote className="mt-6 -rotate-1">
                Wir richten uns nach Ihrem Alltag, nicht umgekehrt.
              </HandNote>
              <p className="mt-8 max-w-xs rounded-xl border border-pine-900/10 bg-white/70 px-4 py-3 text-sm leading-relaxed text-pine-900/70">
                <strong className="font-semibold text-pine-800">
                  Ein Beispiel:
                </strong>{" "}
                Ob 8 Zimmer oder 80 Stellplätze – die Prognose funktioniert
                gleich, nur die Größe der Zahlen ändert sich.
              </p>
            </div>
          </div>

          <div className="space-y-10 lg:col-span-7">
            {audiences.map((a, i) => (
              <AudienceRow key={a.title} a={a} offset={i % 2 === 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Pakete – mit 24h-Test als Schritt 0                                  */
/* ------------------------------------------------------------------ */

const plans = [
  {
    name: "Basic",
    tagline: "Für den Einstieg",
    price: { big: "ab 19 €", small: "/ Monat" },
    cta: "Beta-Zugang anfragen",
    featured: false,
    items: [
      "24 Stunden kostenlos testen (geplant)",
      "Ankunfts- & Auslastungsprognose",
      "Buchungsschwache Zeiten erkennen",
      "Basis-Preisvorschläge",
      "1 Betrieb / 1 Standort",
      "Support per E-Mail",
    ],
  },
  {
    name: "Pro",
    tagline: "Für aktive Gastgeber",
    price: { big: "ab 49 €", small: "/ Monat" },
    cta: "Beta-Zugang anfragen",
    featured: true,
    items: [
      "24 Stunden kostenlos testen (geplant)",
      "Alles aus Basic",
      "Intelligente Preisvorschläge (erweitert)",
      "Werbe- & Angebotstipps",
      "KI-Berichte",
      "Mehrere Standorte",
      "Priorisierter Support",
    ],
  },
  {
    name: "Enterprise",
    tagline: "Für Hotelketten & größere Betriebe",
    price: { big: "auf Anfrage", small: "individuell" },
    cta: "Beta-Zugang anfragen",
    featured: false,
    items: [
      "24 Stunden kostenlos testen (geplant)",
      "Alles aus Pro",
      "Beliebig viele Standorte",
      "Individuelle Integrationen & Onboarding",
      "Persönlicher Ansprechpartner",
      "Service-Level-Vereinbarung",
    ],
  },
];

const addOns = [
  "zusätzliche Standorte",
  "API-Zugang",
  "erweiterte KI-Berichte",
  "Schulungen für Ihr Team",
];

function Plans() {
  return (
    <section id="pakete" className="bg-sand-50 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          nr="03"
          label="Pakete"
          title="Erst testen, dann entscheiden"
          note="Vorschau – geplant, nicht final."
        />

        {/* Schritt 0: das 24-Stunden-Testangebot */}
        <div className="relative mt-10 overflow-hidden rounded-3xl border-2 border-dashed border-pine-700/40 bg-white/70 p-6 shadow-sm sm:p-10">
          <div className="relative">
            <HandNote className="-rotate-1 text-2xl text-pine-600">
              Schritt 0 →
            </HandNote>
            <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight text-pine-950 sm:text-3xl">
                  Bald: 24 Stunden kostenlos testen – ohne Zahlungspflicht
                </h3>
                <p className="mt-4 max-w-2xl leading-relaxed text-pine-900/75">
                  Erst ausprobieren, dann entscheiden: Sobald der Test
                  freigeschaltet ist, schauen Sie sich 24 Stunden lang alles in
                  Ruhe an – am besten mit Ihren eigenen Zahlen. Danach
                  entscheiden Sie, ob Basic, Pro oder doch nichts für Sie ist.
                </p>
                <p className="mt-5 max-w-2xl rounded-xl border border-pine-900/10 bg-white px-4 py-3 text-sm leading-relaxed text-pine-900/70">
                  <strong className="font-semibold text-pine-800">
                    Ehrlich gesagt:
                  </strong>{" "}
                  Das Test-System bauen wir gerade noch. Es gibt aktuell keine
                  Anmeldung und keine Zahlung – aber Sie können sich gern schon
                  auf die Liste setzen lassen.
                </p>
                <a
                  href="#beta"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-pine-800 px-6 py-3 text-sm font-semibold text-sand-50 shadow-lg shadow-pine-900/20 transition hover:bg-pine-700"
                >
                  <Icon className="h-4 w-4">{icons.mail}</Icon>
                  Wenn der Test startet, informieren wir Sie
                </a>
              </div>
              <HandNote className="-rotate-2 text-[1.7rem] lg:pl-8 lg:text-right">
                versprochen: keine Karte nötig →
              </HandNote>
            </div>
          </div>
        </div>

        {/* Pakete */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-3xl border-2 p-7 sm:p-8 ${
                p.featured
                  ? "border-pine-600 bg-pine-900 text-sand-50 shadow-2xl shadow-pine-900/30 lg:-translate-y-4"
                  : "border-pine-900/15 bg-white shadow-lg shadow-pine-900/10"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 -rotate-2 rounded-full bg-sand-300 px-3.5 py-1 text-xs font-bold uppercase tracking-wide text-pine-950 shadow-md">
                  Beliebt
                </span>
              )}
              <h3
                className={`font-display text-2xl font-semibold tracking-tight ${
                  p.featured ? "text-sand-50" : "text-pine-950"
                }`}
              >
                {p.name}
              </h3>
              <p
                className={`mt-1 text-sm ${
                  p.featured ? "text-sand-100/70" : "text-pine-900/60"
                }`}
              >
                {p.tagline}
              </p>
              <p
                className={`mt-5 ${
                  p.featured ? "text-sand-50" : "text-pine-950"
                }`}
              >
                <span className="font-display text-2xl font-semibold tracking-tight">
                  {p.price.big}
                </span>
                <span
                  className={`ml-1.5 text-base font-medium ${
                    p.featured ? "text-sand-100/70" : "text-pine-900/60"
                  }`}
                >
                  {p.price.small}
                </span>
              </p>
              <p
                className={`mt-1 text-xs ${
                  p.featured ? "text-sand-100/60" : "text-pine-900/50"
                }`}
              >
                Vorschau – geplant, noch nicht final
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <Icon
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        p.featured ? "text-sand-300" : "text-pine-600"
                      }`}
                    >
                      {icons.check}
                    </Icon>
                    <span
                      className={
                        p.featured ? "text-sand-100/90" : "text-pine-900/80"
                      }
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#beta"
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-md transition ${
                  p.featured
                    ? "bg-sand-100 text-pine-900 shadow-sand-900/20 hover:bg-white"
                    : "bg-pine-800 text-sand-50 shadow-pine-900/20 hover:bg-pine-700"
                }`}
              >
                {p.cta}
                <Icon className="h-4 w-4">{icons.arrow}</Icon>
              </a>
            </div>
          ))}
        </div>

        {/* Optionale Zusatzfunktionen */}
        <div className="mt-10 rounded-2xl border-2 border-dashed border-pine-700/30 bg-white/70 p-6 sm:p-8">
          <h3 className="font-display text-lg font-semibold text-pine-950">
            Optionale Zusatzfunktionen{" "}
            <span className="text-pine-600">(geplant)</span>
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {addOns.map((a) => (
              <span
                key={a}
                className="rounded-full border border-pine-700/20 bg-white px-3.5 py-1.5 text-sm font-medium text-pine-800"
              >
                {a}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-pine-900/60">
            Zusatzfunktionen können einzeln oder im Paket dazu gebucht werden.
            Details und Preise folgen mit dem Produktstart.
          </p>
          <HandNote className="mt-4 -rotate-1 text-pine-700/80">
            Ideen? Wir bauen nach Ihrem Feedback.
          </HandNote>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Call-to-Action (Beta-Zugang) – ehrlich und persönlich               */
/* ------------------------------------------------------------------ */

function BetaCta() {
  return (
    <section id="beta" className="bg-pine-950 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Eyebrow nr="04" label="Beta-Programm" dark />
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-sand-50 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Wir bauen das gerade – und freuen uns auf Ihr Feedback.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-sand-100/75">
              Als Beta-Tester:in testen Sie das Dashboard als Erste, sobald der
              erste Prototyp bereit ist – und helfen uns mit Ihrem Feedback, es
              für Ihren Betrieb noch besser zu machen. Sie verpflichten sich zu
              nichts.
            </p>

            <a
              href="mailto:info-vertexsoftware@gmx.net?subject=Beta-Zugang%20TourPulse%20AI"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-sand-100 px-8 py-4 text-base font-semibold text-pine-950 shadow-lg shadow-black/20 transition hover:bg-white"
            >
              Beta-Zugang per E-Mail anfragen
              <Icon className="h-5 w-5">{icons.arrow}</Icon>
            </a>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-sand-100/60">
              Noch kein Online-Formular – die Anmeldung läuft vorerst direkt aus
              Ihrem Mailprogramm. Ein Anmelde-Formular folgt.{" "}
              <span className="text-sand-100/45">
                (Kontaktadresse vorläufig, bis das Anmelde-System eingerichtet
                ist.)
              </span>
            </p>
          </div>

          <div className="lg:col-span-5">
            <PhotoCard
              src="/images/empfang.jpg"
              alt="Hotelbetreiber steht am Empfang seines kleinen Hotels"
              caption="Inhaber am Empfang – früh wissen, wer kommt."
              rotate="rotate-[1.5deg]"
              className="shadow-2xl shadow-black/30"
            />
            <HandNote className="mt-5 -rotate-1 text-center text-sand-300">
              Bis dahin: Schreiben Sie uns gern!
            </HandNote>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Seite                                                                 */
/* ------------------------------------------------------------------ */

function Home() {
  const businessName = Route.useLoaderData() || "TourPulse AI";
  return (
    <>
      <Header businessName={businessName} home />
      <main>
        <Hero businessName={businessName} />
        <Features />
        <Audiences />
        <Plans />
        <BetaCta />
      </main>
      <Footer businessName={businessName} home />
    </>
  );
}
