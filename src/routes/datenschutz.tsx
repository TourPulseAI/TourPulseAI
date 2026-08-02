import { createFileRoute } from "@tanstack/react-router";
import {
  HandNote,
  LegalPage,
  Placeholder,
  getBusinessName,
} from "~/components/site";

export const Route = createFileRoute("/datenschutz")({
  loader: () => getBusinessName(),
  head: () => ({
    meta: [
      { title: "Datenschutzerklärung – TourPulse AI" },
      {
        name: "description",
        content:
          "Datenschutzerklärung der Website TourPulse AI – ehrliche Informationen darüber, welche Daten beim Besuch der Seite verarbeitet werden.",
      },
      // Solange Platzhalter sichtbar sind, soll die Seite nicht indexiert werden.
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Datenschutz,
});

/* ------------------------------------------------------------------ */
/* Kleine Bausteine für die Rechtsseite                                 */
/* ------------------------------------------------------------------ */

/** Überschrift eines Abschnitts */
function BlockTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-xl font-semibold tracking-tight text-pine-950 sm:text-2xl">
      {children}
    </h2>
  );
}

/** Fließtext-Absatz */
function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] leading-relaxed text-pine-900/80 sm:text-base">
      {children}
    </p>
  );
}

function Datenschutz() {
  const businessName = Route.useLoaderData() || "TourPulse AI";
  const contact = (
    <a
      href="mailto:info-vertexsoftware@gmx.net"
      className="font-medium text-pine-700 underline decoration-pine-300 underline-offset-4 transition hover:text-pine-900"
    >
      info-vertexsoftware@gmx.net
    </a>
  );

  return (
    <LegalPage businessName={businessName}>
      {/* Deutlich sichtbarer Hinweis – Seite noch nicht final */}
      <div className="rounded-2xl border-2 border-pine-900 bg-pine-950 px-5 py-4 text-sand-50 shadow-lg shadow-pine-900/15 sm:px-6">
        <HandNote className="text-sand-200">Wichtiger Hinweis</HandNote>
        <p className="mt-1 text-sm leading-relaxed text-sand-100/85">
          Diese Datenschutzerklärung ist noch nicht final – die Betreiberdaten
          werden nachgereicht. Solange Platzhalter sichtbar sind, ist die Seite
          nicht für den öffentlichen Live-Betrieb bestimmt.
        </p>
      </div>

      <h1 className="mt-10 font-display text-3xl font-semibold tracking-tight text-pine-950 sm:text-4xl">
        Datenschutzerklärung
      </h1>
      <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-pine-600">
        Stand: August 2026
      </p>

      <div className="mt-8 space-y-10">
        {/* Verantwortlicher */}
        <section>
          <BlockTitle>Verantwortlicher</BlockTitle>
          <P>
            Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne
            der Datenschutz-Grundverordnung (DSGVO), Art. 4 Nr. 7 DSGVO, ist:
          </P>
          <div className="mt-3 space-y-2 text-[15px] leading-relaxed text-pine-900/80 sm:text-base">
            <p>
              <Placeholder>
                [Vollständiger Name oder Firmenname des Betreibers]
              </Placeholder>
            </p>
            <p>
              <Placeholder>[Straße Hausnummer]</Placeholder>
              <br />
              <Placeholder>[PLZ Ort]</Placeholder>
            </p>
            <p>E-Mail: {contact}</p>
          </div>
        </section>

        {/* Kontaktaufnahme per E-Mail */}
        <section>
          <BlockTitle>Kontaktaufnahme per E-Mail</BlockTitle>
          <P>
            Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir die von Ihnen
            übermittelten Daten – insbesondere Ihre E-Mail-Adresse sowie den
            Inhalt Ihrer Nachricht – ausschließlich zur Bearbeitung Ihrer
            Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Bearbeitung
            im Zusammenhang mit einer Anfrage bzw. Vertragsanbahnung) bzw. Art.
            6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung
            Ihrer Anfrage).
          </P>
          <P>
            Es besteht derzeit <strong>kein Kontaktformular</strong> auf dieser
            Website. Ihre E-Mail-Nachricht wird nicht auf einem Server dieser
            Website gespeichert, sondern ausschließlich in unserem
            E-Mail-Postfach verarbeitet. Eine Weitergabe an Dritte erfolgt
            nicht.
          </P>
        </section>

        {/* Hosting / Server-Logfiles */}
        <section>
          <BlockTitle>Hosting / Server-Logfiles</BlockTitle>
          <P>
            Beim Abruf dieser Website fallen technisch notwendige Daten an, die
            vom Hosting-Anbieter in sogenannten Server-Logfiles verarbeitet
            werden: die IP-Adresse des Besuchers, Datum und Uhrzeit des Abrufs
            sowie die aufgerufene Seite. Diese Daten werden kurzfristig
            gespeichert, um den sicheren und störungsfreien Betrieb der Website
            zu gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an einem stabilen und sicheren
            Internetauftritt).
          </P>
        </section>

        {/* Schriften */}
        <section>
          <BlockTitle>Schriften (Google Fonts)</BlockTitle>
          <P>
            Diese Website lädt Schriftarten („Google Fonts“) von den Servern der
            Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
            Irland. Beim Abruf der Seite wird dabei Ihre IP-Adresse an Google
            übertragen, damit die Schriftarten ausgeliefert werden können.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
            Interesse an einer ansprechenden und einheitlichen Darstellung der
            Website). Weitere Informationen finden Sie in der
            Datenschutzerklärung von Google:{" "}
            <a
              href="https://policies.google.com/privacy"
              className="break-all font-medium text-pine-700 underline decoration-pine-300 underline-offset-4 transition hover:text-pine-900"
            >
              https://policies.google.com/privacy
            </a>
            .
          </P>
        </section>

        {/* Cookies & Tracking */}
        <section>
          <BlockTitle>Cookies &amp; Tracking</BlockTitle>
          <P>
            Diese Website verwendet <strong>keine Cookies</strong>, kein
            Tracking, keine Analyse-Tools und keine Werbung. Es werden keine
            Daten zu Werbe- oder Analysezwecken erhoben.
          </P>
        </section>

        {/* Rechte der Betroffenen */}
        <section>
          <BlockTitle>Ihre Rechte als betroffene Person</BlockTitle>
          <P>
            Ihnen stehen im Rahmen der geltenden gesetzlichen Bestimmungen
            jederzeit folgende Rechte zu:
          </P>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-pine-900/80 sm:text-base">
            <li>
              Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15
              DSGVO),
            </li>
            <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO),</li>
            <li>Löschung (Art. 17 DSGVO),</li>
            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO),</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO),</li>
            <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO).</li>
          </ul>
          <P>
            Zudem haben Sie das Recht, sich bei einer
            Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer
            personenbezogenen Daten zu beschweren (Art. 77 DSGVO).
          </P>
          <P>
            Für alle Anliegen zum Datenschutz erreichen Sie uns unter: {contact}
          </P>
        </section>
      </div>
    </LegalPage>
  );
}
