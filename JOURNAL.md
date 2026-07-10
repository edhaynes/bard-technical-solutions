# JOURNAL — bard-technical-solutions (bardtek.com)

Newest on top. Latest entry supersedes older ones where they conflict.

## 2026-07-09 — CAN Studio demo built (live capture page) — v1.3.7 — DEPLOYED ✓ (verify_live PASS)

- Built `demos/can/index.html`: an interactive CAN Studio demo modeled on the SAT page but
  **rebranded to the main site** (navy/gold, `../../styles.css`, Inter/Sora, site header/footer)
  rather than the SAT page's standalone dark-green palette. Leads with a live-capture monitor
  (frames stream at true recorded cadence; each proven NORMAL/ANOMALY and the exact invariant
  named) + four attack exhibit cards; deep content (honest 53,802-frame comma2k19 RAV4 disclosure
  incl. the 40.8% false-positive rate, the invariant catalog, the RAV4-subset DBC) is collapsed
  behind four `<details>` expanders.
- All verdict/frame data is **verbatim from the real `vulcan can` CLI** (run 2026-07-09 from
  `/Users/edhayn/vulcan-cli`, `demo/can_demo.py`). Self-contained: no Vulcan IP in this public repo.
- Wired the `/demos` CAN Studio card from "Request this demo" → `can/` ("Try the demo").
- Bumped `CONFIG.version` 1.3.6 → 1.3.7. Validated: HTML tags balanced, JS `node --check` passes,
  headless-Chrome render confirms branding/layout.
- **STATUS: DEPLOYED.** Pushed `fd21ed3` to `main`; Pages built it in ~30s; `./tools/verify_live.sh 1.3.7`
  prints PASS (v1.3.7 live, 5 assets byte-identical, no flying owl); `bardtek.com/demos/can/` serves 200.
  Secret gate clean (gitleaks, 0 leaks over the push range).
- **NEXT SPRINT:** (1) bring back per-frame **µsec** timing on the CAN verdicts (measured, like the
  SAT page's `[8 µs]` + QNX/BeaglePlay hardware exhibits); (2) **cross-link** the SAT demo and this
  CAN demo to each other.

## 2026-07-09 — Basic /demos page added (CAN Studio + The SAT Challenge)

- Added `demos/index.html` (served at `/demos`) with two on-brand cards: **CAN Studio** (certified
  CAN-bus analysis) and **The SAT Challenge** (the 1982 coin-rotation SAT bug Vulcan gets right).
  Deliberately minimal — request-a-demo CTAs to `#contact`, no live-app embed (keeps the Vulcan IP
  in the private repo); marketing to polish later. Nav link "Demos" added to `index.html`.
- v1.3.4. First Pages build errored transiently (the documented GitHub Actions/Pages delay, not a
  content problem — did NOT re-architect per CLAUDE.md); the next build succeeded.
  **`tools/verify_live.sh 1.3.4` PASSED**; `bardtek.com/demos/` serves 200 with both cards.

## 2026-07-09 — Flying owl removed, static owl recolored gold-on-navy, live-verify gate added

- Root-caused why 4–5 prior "remove the flying owl" attempts failed: no removal commit ever
  reached `origin/main` (attempts ran in environments that never pushed — no PRs, no branches
  anywhere), while this clone sat 2 commits behind origin and never even contained the
  flying-owl code. Full write-up in `bugs.md`.
- Removed the flying owl (`wireFlyingOwl` + CONFIG.owl from `main.js`, animation block from
  `styles.css`) — v1.3.1.
- Recolored `assets/owl.png` to the site's gold tokens on transparent (reads gold-on-navy on
  the page) and rebuilt `assets/favicon.png` as gold owl on a navy tile — `tools/recolor_owl.py`,
  v1.3.2. Original blue artwork remains in git history (pre-1.3.2).
- Added `tools/verify_live.sh` — the standing post-push gate: cache-busted fetch of live
  main.js/styles.css/index.html/owl.png/favicon.png, asserts expected version, zero flying-owl
  refs, and byte-identity with the local tree. **Rule for this repo: no site change is "done"
  until this script passes against bardtek.com.**

## 2026-07-03 — Flying owl added (external session)

- `5a70924` "feat: flying gold owl glides across the page" pushed from outside the local
  clone (author ehaynes@redhat.com); Pages deployed it 2026-07-04. Later deemed unwanted.

## 2026-06-16 — Featured-work links process miss

- Splash links authored but left uncommitted; never deployed. Logged in `bugs.md`; fixed in
  `491ece5`. First instance of the "work not on main does not exist" failure class.

## 2026-06-09 — Site launched

- Initial marketing site, navy+gold, owl brand mark; bardtek.com CNAME + GitHub Pages
  (legacy build from `main`, root).
