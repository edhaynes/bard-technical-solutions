# Features — Bard Technical Solutions site

- **Evaluate Cloudflare Pages as primary host (deploy-pipeline independence)** — *Open, 2026-07-09.*
  During the 2026-07-09 GitHub Actions partial outage, deploys were blocked ~1h+ while the
  site itself stayed up (serving and deploy are separate systems). If bardtek.com becomes
  lead-gen-critical, move primary hosting to Cloudflare Pages (free tier, deploys from the
  same GitHub repo via Cloudflare's own pipeline, global CDN) rather than maintaining a
  "backup site." Decision deferred until the site matters commercially — Eddie decides.
  Clarify: none.
