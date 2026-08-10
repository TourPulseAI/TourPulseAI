#!/usr/bin/env bash
# Publish this site live to Vercel and print the live URL.
#
# Contract:
#   VERCEL_TOKEN   (required) — collected from the owner via the go-live flow.
#   DATABASE_URL   (optional) — passed as a runtime env var when the site uses a DB.
#   VERCEL_SCOPE   (optional) — team slug; auto-resolved from the token if unset.
#   VERCEL_TEAM_ID (optional) — team id; auto-resolved from the token if unset.
#
# Scope + team id are auto-resolved from the token (personal tokens have neither;
# team tokens report their default team), so the owner only ever pastes the token.
# Making the project public drops the org SSO protection new projects inherit,
# which would otherwise put a login wall in front of a site meant for the public.
set -euo pipefail
cd "$(dirname "$0")"
umask 002

: "${VERCEL_TOKEN:?set VERCEL_TOKEN (collect it from the owner first)}"
PROJECT_NAME="${VERCEL_PROJECT_NAME:-$(basename "$(pwd)")}"
VERCEL="bunx vercel@latest"

# Resolve the token's team (slug for --scope, id for the make-public API call).
# Empty for a personal-account token. bun is always present in the sandbox.
if [ -z "${VERCEL_SCOPE:-}" ] || [ -z "${VERCEL_TEAM_ID:-}" ]; then
  RESOLVED="$(VERCEL_TOKEN="$VERCEL_TOKEN" bun -e '
    const h = { headers: { Authorization: "Bearer " + process.env.VERCEL_TOKEN } };
    const [u, tj] = await Promise.all([
      fetch("https://api.vercel.com/v2/user", h).then((r) => r.json()).catch(() => ({})),
      fetch("https://api.vercel.com/v2/teams?limit=50", h).then((r) => r.json()).catch(() => ({})),
    ]);
    const teams = tj.teams || [];
    const def = (u.user || u || {}).defaultTeamId;
    const t = teams.find((x) => x.id === def) || teams[0];
    if (t) process.stdout.write(t.id + " " + t.slug);
  ' 2>/dev/null || true)"
  VERCEL_TEAM_ID="${VERCEL_TEAM_ID:-${RESOLVED%% *}}"
  [ "$RESOLVED" != "${RESOLVED#* }" ] && VERCEL_SCOPE="${VERCEL_SCOPE:-${RESOLVED##* }}"
fi

echo "==> building Vercel bundle"
bash ./build-vercel.sh

SCOPE_ARGS=()
if [ -n "${VERCEL_SCOPE:-}" ]; then SCOPE_ARGS=(--scope "$VERCEL_SCOPE"); fi
ENV_ARGS=()
if [ -n "${DATABASE_URL:-}" ]; then ENV_ARGS=(-e "DATABASE_URL=$DATABASE_URL"); fi

echo "==> deploying${VERCEL_SCOPE:+ (scope: $VERCEL_SCOPE)}"
# --prod promotes the deployment to the project's STABLE production alias
# (https://<project>-<team>.vercel.app) instead of creating a throwaway
# preview URL on every run — that stable URL is what the marketing launch uses.
DEPLOY_OUT="$($VERCEL deploy --prebuilt --prod --yes --token "$VERCEL_TOKEN" \
  --name "$PROJECT_NAME" "${SCOPE_ARGS[@]}" "${ENV_ARGS[@]}" 2>&1)" || {
  printf '%s\n' "$DEPLOY_OUT" >&2
  exit 1
}
LIVE_URL="$(printf '%s\n' "$DEPLOY_OUT" | grep -oE 'https://[a-zA-Z0-9._-]+\.vercel\.app' | tail -1)"

if [ -z "$LIVE_URL" ]; then
  echo "deploy finished but no live URL was parsed — output above" >&2
  printf '%s\n' "$DEPLOY_OUT" >&2
  exit 1
fi

# Resolve the STABLE production alias (the URL that survives future --prod
# deploys) from the project, so the printed LIVE URL is the one to share.
STABLE_URL=""
if [ -n "$VERCEL_TEAM_ID" ]; then
  STABLE_URL="$(curl -sf "https://api.vercel.com/v9/projects/${PROJECT_NAME}?teamId=${VERCEL_TEAM_ID}" \
    -H "Authorization: Bearer $VERCEL_TOKEN" | bun -e '
      let s = "";
      for await (const c of Bun.stdin.stream()) s += Buffer.from(c).toString();
      try {
        const p = JSON.parse(s);
        const alias = (p.targets && p.targets.production && p.targets.production.alias) || [];
        const auto = (p.targets && p.targets.production && p.targets.production.automaticAliases) || [];
        // automaticAliases[0] is the canonical project URL the --prod deploy
        // promotes to (e.g. <project>-<team>.vercel.app when <project>.vercel.app
        // is taken); fall back to any assigned alias.
        process.stdout.write(auto[0] || alias[0] || "");
      } catch {}
    ' 2>/dev/null || true)"
fi
if [ -n "$STABLE_URL" ]; then
  STABLE_URL="https://${STABLE_URL#https://}"
  echo "STABLE: $STABLE_URL"
fi

echo "==> making the project public"
TEAM_QS=""
if [ -n "${VERCEL_TEAM_ID:-}" ]; then TEAM_QS="?teamId=$VERCEL_TEAM_ID"; fi
curl -sf -X PATCH "https://api.vercel.com/v9/projects/${PROJECT_NAME}${TEAM_QS}" \
  -H "Authorization: Bearer $VERCEL_TOKEN" -H "Content-Type: application/json" \
  -d '{"ssoProtection":null}' >/dev/null ||
  echo "warning: could not disable SSO protection (site may show a login wall)" >&2

echo "LIVE: ${STABLE_URL:-$LIVE_URL}"
