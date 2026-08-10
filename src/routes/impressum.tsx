import { createFileRoute } from "@tanstack/react-router";
import {
  LegalPage,
  getBusinessName,
} from "~/components/site";

export const Route = createFileRoute("/impressum")({
  loader: () => getBusinessName(),
  head: () => ({
    meta: [
      { title: "Impressum – TourPulse" },
      {
        name: "description",
        content:
          "Impressum der Website TourPulse – Angaben gemäß § 5 DDG. Mit vollständigen Angaben zur Betreiberin.",
      },
    ],
  }),
  component: Impressum,
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

function Impressum() {
  const businessName = Route.useLoaderData() || "TourPulse";
  return (
    <LegalPage businessName={businessName}>
      <h1 className="mt-10 font-display text-3xl font-semibold tracking-tight text-pine-950 sm:text-4xl">
        Impressum
      </h1>
      <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-pine-600">
        Angaben gemäß § 5 DDG
      </p>

      <div className="mt-8 space-y-10">
        {/* Anbieter */}
        <section>
          <BlockTitle>Anbieter / Verantwortlich</BlockTitle>
          <div className="mt-3 space-y-2 text-[15px] leading-relaxed text-pine-900/80 sm:text-base">
            <p>
              Katharina Seebacher
            </p>
            <p>
              Estermannstraße 1
              <br />
              83075 Bad Feilnbach
            </p>
          </div>
        </section>

        {/* Kontakt */}
        <section>
          <BlockTitle>Kontakt</BlockTitle>
          <div className="mt-3 space-y-2 text-[15px] leading-relaxed text-pine-900/80 sm:text-base">
            <p>
              E-Mail:{" "}
              <a
                href="mailto:info-vertexsoftware@gmx.net"
                className="font-medium text-pine-700 underline decoration-pine-300 underline-offset-4 transition hover:text-pine-900"
              >
                info-vertexsoftware@gmx.net
              </a>
            </p>
            <p>
              
            </p>
          </div>
        </section>

        {/* MStV */}
        <section>
          <BlockTitle>
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </BlockTitle>
          <div className="mt-3 space-y-2 text-[15px] leading-relaxed text-pine-900/80 sm:text-base">
            <p>
              Katharina Seebacher
            </p>
            <p>
              Estermannstraße 1
              <br />
              83075 Bad Feilnbach
            </p>
          </div>
        </section>

        {/* Haftung für Inhalte */}
        <section>
          <BlockTitle>Haftung für Inhalte</BlockTitle>
          <P>
            Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten
            nach den allgemeinen Gesetzen verantwortlich (§ 7 Abs. 1 DDG). Wir
            sind jedoch nicht verpflichtet, übermittelte oder gespeicherte
            fremde Informationen zu überwachen oder nach Umständen zu forschen,
            die auf eine rechtswidrige Tätigkeit hinweisen (§§ 8 bis 10 DDG).
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
            Informationen nach den allgemeinen Gesetzen bleiben hiervon
            unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
            Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
            Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
            Inhalte umgehend entfernen.
          </P>
        </section>

        {/* Haftung für Links */}
        <section>
          <BlockTitle>Haftung für Links</BlockTitle>
          <P>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren
            Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
            fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
            verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
            der Seiten verantwortlich. Die verlinkten Seiten wurden zum
            Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft;
            rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
            erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten
            Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung
            nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
            derartige Links umgehend entfernen.
          </P>
        </section>

        {/* Urheberrecht */}
        <section>
          <BlockTitle>Urheberrecht</BlockTitle>
          <P>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
            diesen Seiten unterliegen dem deutschen Urheberrecht. Die
            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            Downloads und Kopien dieser Seite sind nur für den privaten, nicht
            kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser
            Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
            Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
            gekennzeichnet. Sollten Sie trotzdem auf eine
            Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
            entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
            werden wir derartige Inhalte umgehend entfernen.
          </P>
        </section>
      </div>
    </LegalPage>
  );
}
