import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "~/styles/app.css?url";

// Aktuelle öffentliche URL (Platzhalter, bis die eigene Domain kommt).
const PUBLIC_URL = "https://6a7b841d67cf892092cd5b6554589193.ctonew.app";
const SITE_NAME = "TourPulse AI";
const OG_IMAGE = `${PUBLIC_URL}/images/hostin.jpg`;

const metaTitle =
  "TourPulse AI – Auslastung vorhersagen & Preise optimieren für kleine Hotels, Ferienwohnungen & Campingplätze";

const metaDescription =
  "Software für kleine Hotels, Ferienwohnungen, Campingplätze & Tourenanbieter: Auslastung & Belegung vorhersagen, Preise optimieren, buchungsschwache Zeiten erkennen.";

// Strukturierte Daten (JSON-LD) – nur verifizierbare Angaben, keine erfundenen
// Daten. Die Kontaktadresse ist die offizielle Beta-Kontaktadresse, die auch auf
// der Seite selbst als Kontakt angegeben ist.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: SITE_NAME,
      url: PUBLIC_URL,
      description: metaDescription,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "info-vertexsoftware@gmx.net",
        availableLanguage: "German",
      },
    },
    {
      "@type": "WebSite",
      name: SITE_NAME,
      url: PUBLIC_URL,
      description: metaDescription,
      inLanguage: "de-DE",
    },
  ],
};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: metaTitle },
      { name: "description", content: metaDescription },
      { name: "theme-color", content: "#10211f" },
      // Open Graph
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: metaTitle },
      { property: "og:description", content: metaDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PUBLIC_URL },
      { property: "og:image", content: OG_IMAGE },
      {
        property: "og:image:alt",
        content: "Vermieterin steht vor der Tür ihrer Ferienwohnung",
      },
      { property: "og:locale", content: "de_DE" },
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: metaTitle },
      { name: "twitter:description", content: metaDescription },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,100..900,0..100,0..1;1,9..144,100..900,0..100,0..1&family=Karla:ital,wght@0,400..700;1,400..700&display=swap",
      },
      { rel: "canonical", href: PUBLIC_URL },
    ],
  }),
  notFoundComponent: () => <div>Seite nicht gefunden</div>,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <head>
        <HeadContent />
        {/* Strukturierte Daten: direkt im Dokument gerendert, da die
            Route-head-scripts-Ausgabe in dieser TanStack-Version die
            type-Attribute nicht korrekt übernimmt. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
