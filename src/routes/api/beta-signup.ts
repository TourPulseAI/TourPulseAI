import { createFileRoute } from "@tanstack/react-router";
import { sql } from "~/db";

const BUSINESS_TYPES = new Set([
  "Kleines Hotel/Pension",
  "Ferienwohnung",
  "Campingplatz",
  "Tourenanbieter",
  "Sonstiges",
]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function json(data: Record<string, unknown>, status = 200) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export const Route = createFileRoute("/api/beta-signup")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return json({ error: "Bitte senden Sie gültige Formulardaten." }, 400);
        }
        if (!body || typeof body !== "object") {
          return json({ error: "Bitte senden Sie gültige Formulardaten." }, 400);
        }
        const input = body as Record<string, unknown>;
        const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
        const name = typeof input.name === "string" ? input.name.trim() : "";
        const businessType = typeof input.businessType === "string" ? input.businessType : "";
        if (!EMAIL_RE.test(email) || email.length > 254) {
          return json({ error: "Bitte geben Sie eine gültige E-Mail-Adresse ein." }, 400);
        }
        if (name.length > 120) {
          return json({ error: "Der Name darf höchstens 120 Zeichen lang sein." }, 400);
        }
        if (!BUSINESS_TYPES.has(businessType)) {
          return json({ error: "Bitte wählen Sie eine Betriebsart aus." }, 400);
        }

        try {
          const database = sql();
          await database`
            CREATE TABLE IF NOT EXISTS beta_signups (
              id BIGSERIAL PRIMARY KEY,
              name TEXT,
              email TEXT NOT NULL UNIQUE,
              business_type TEXT NOT NULL,
              created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            )
          `;
          await database`
            INSERT INTO beta_signups (name, email, business_type)
            VALUES (${name || null}, ${email}, ${businessType})
          `;
          return json({ ok: true });
        } catch (error: unknown) {
          const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
          if (code === "23505") {
            return json({ error: "Diese E-Mail-Adresse steht bereits auf der Beta-Liste." }, 409);
          }
          console.error("Beta signup failed", error);
          if (error instanceof Error && error.message.includes("DATABASE_URL")) {
            return json({ error: "Die Beta-Liste ist noch nicht eingerichtet. Bitte schreiben Sie uns direkt per E-Mail." }, 503);
          }
          return json({ error: "Die Anmeldung konnte gerade nicht gespeichert werden. Bitte versuchen Sie es später erneut oder schreiben Sie uns direkt." }, 503);
        }
      },
    },
  },
});
