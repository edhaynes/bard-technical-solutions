# bardtek.com — deploy rules for every Claude session

This repo IS the live site. GitHub Pages serves the `main` branch of
github.com/edhaynes/bard-technical-solutions at https://bardtek.com.
**A change deploys when — and only when — it lands on `origin/main`.**

In July 2026 the same fix was "completed" 4–5 times in different Claude
sessions and never appeared on the site (RCA in `bugs.md`, 2026-07-09).
Every one of those failures is prevented by the rules below. Follow them
in order, every change, no exceptions.

## The loop

1. **Pull first.** `git pull --rebase origin main` before touching
   anything. A stale clone hid the previous bug entirely.
2. **Bump the version.** Every user-visible change increments
   `CONFIG.version` in `main.js` (odd-minor dev line, e.g. 1.3.x → next
   patch). The version is how you prove the deploy landed.
3. **Commit and PUSH to `main`.** Committed-but-unpushed work does not
   exist — the session ends, the work is gone from the site's point of
   view. If you are on claude.ai (web/mobile), your changes MUST be
   pushed/merged to `main` before the session ends; a branch or an
   unpushed workspace deploys nothing.
4. **Verify the LIVE SITE, not your commit:**
   ```
   ./tools/verify_live.sh <version>     # e.g. ./tools/verify_live.sh 1.3.4
   ```
   It cache-busts and byte-compares the live main.js, styles.css,
   index.html, owl.png, and favicon.png against your tree and checks the
   version stamp. **The task is not done until this prints PASS.**
   No environment to run it? Then minimum:
   `curl -s "https://bardtek.com/main.js?cb=$RANDOM" | grep version:`

## When the deploy seems stuck or "failing"

- Pages builds normally land in under a minute. Check the build:
  `gh api repos/edhaynes/bard-technical-solutions/pages/builds/latest`
- Status stuck at `queued`/`building` for many minutes with no error →
  check https://www.githubstatus.com (Actions outages stall Pages
  builds; one delayed us ~50 min on 2026-07-09). The site stays UP
  during these — only publishing is delayed. Optionally kick it:
  `gh api repos/edhaynes/bard-technical-solutions/pages/builds -X POST`
  Otherwise wait; do not re-architect hosting over a transient outage.
- Fix looks deployed but the browser still shows the old site →
  cache. Hard-refresh (Cmd+Shift+R) and trust `verify_live.sh`, which
  cache-busts, over what any browser window shows.

## Repo rules

- **This repo is PUBLIC.** No commercial material ever: no pricing,
  comp/equity, strategy, customer names, pitch decks (shared-rules
  §0.18). That class of doc lives in private `bard-infra/business/`.
- Trackers: `bugs.md`, `features.md`, `JOURNAL.md` at root — read
  `JOURNAL.md` first for current status; log notable changes there.
- Brand: navy + gold, owl mark. `tools/recolor_owl.py` regenerates
  `assets/owl.png`/`favicon.png` from source artwork.
