# JOURNAL — bard-technical-solutions (bardtek.com)

Newest on top. Latest entry supersedes older ones where they conflict.

## 2026-07-10 — ICD-10-CM demo: complete population (58,066), not a sample — v1.3.15

- Eddie asked for the numbers to be "more accurate." Found the real issue: the CMS source file
  is sorted by `BENE_ID`, so the earlier n=100 and n=15,000 samples weren't necessarily
  representative — the category breakdown moved between them as sample size grew
  (invalid_code 68% → 84.78%). Fix: run the complete population, all 58,066 real claims in
  the file, eliminating the sampling question outright ("58,066 is better" — Eddie).
- **Updated headline: 2.12% conformant** (was 1%, n=100), **84.42%** missing 7th-character
  extension (was 68%), **6.92%** Excludes1 conflicts (was 21%), **6.54%** Code-First gaps
  (was 10%). Latency essentially unchanged from n=15,000 (avg 82.6µs vs 84.8µs) — only the
  category breakdown needed the full population; timing was already stable at 15k.
- Updated meta description, hero lede, the real-data callout, grounding table, "how it was
  built," and "scope" sections throughout — every occurrence of "100 real claims" / "1%"
  replaced with "all 58,066" / "2.12%". Validated: HTML tags balanced, JS `node --check`
  passes.

## 2026-07-10 — ICD-10-CM demo: swapped hand-built examples for real CMS claims — v1.3.14

- Eddie: the demo's hand-built single/double-code records were "trivial" and asked for
  "publicly accessible dummy records." Fix: CMS publishes its own official synthetic Medicare
  claims release (8,671 fully synthetic beneficiaries, real RIF claim shapes, "realistic-but-
  not-real data... released publicly without restriction," no patient identifiers exist in the
  format at all). Pulled `inpatient.csv` (58,030 real claims) and ran the same oracle against
  100 of them.
- **New measured result, headlined on the page**: only 1% of the 100 real claims came back
  fully conformant. 68% fail on a missing required 7th-character extension (a real, common
  coding error — not an artifact); 21% are genuine Excludes1 conflicts (spot-checked: Epilepsy
  vs. Unspecified convulsions, a real clinically-sensible rule); 10% are Code-First sequencing
  gaps (one real claim has both codes present, just in the wrong order). Reported as measured,
  worst-first, not smoothed into a friendlier headline number.
- Live-monitor stream now leads with 4 real CMS claims (one of each verdict category) before the
  constructed diabetes/Cushing's/concussion examples, which stay as the pedagogical explainer.
  New callout section, updated grounding table (3rd source row: CMS Synthetic Medicare Claims
  PUF), updated "how it was built" and "scope" sections to describe both self-consistency
  (99.93%) and real-claims (1%) testing honestly, as two different things.
- Validated: HTML tags balanced, JS `node --check` passes, headless-Chrome render confirms the
  new content and no console errors.

## 2026-07-10 — 5th demo added: ICD-10-CM claim conformance ("The Diabetes Trap") — v1.3.13

- New `demos/icd10cm/index.html`: Vulcan proves Medicare/ICD-10-CM diagnosis-claim conformance
  against the real, 2,069-page CDC/NCHS FY2026 Tabular List (46,881 codes parsed, 23,414
  billable, 12,929 requiring a 7th-character extension). Flagship reveal is a real, well-known
  coding trap: Type 1 (E10.9) and Type 2 (E11.9) diabetes can never be coded together — the
  spec's own Excludes1 note rules it out — plus a Code-First sequencing example (E08.9 needs its
  underlying condition, e.g. E24.0 Cushing's disease, coded first) and a 7th-character extension
  validity check (S06.0X0 vs S06.0X0A).
- All verdicts and timings are real, measured output from the private `alpha` repo's
  `vulcan.demos.icd10cm_claim.ClaimConformance` prover (built this session on branch
  `spikes/icd10-cm-coding`) against the parsed FY2026 registry — not invented for the page.
  Measured latency: worst 25.6µs / avg 9.7µs / best 7.7µs / p99 13.5µs over 20,000 `prove()`
  calls, Apple M5 Max single core, CPython 3.14.4. Scoring-harness self-consistency: 99.93% over
  1,500 sampled claims (300/category × 5 categories) — stated honestly as self-consistency
  against the parsed registry, not yet external validation against an independent coder.
- No patient data anywhere, real or synthetic-identifying — a claim is a bare tuple of diagnosis
  codes. Added as a 5th card on `demos/index.html` (additive only, per the destructive-action
  confirmation rule); cross-linked from/to the dhcp and http11 companion-demos footers. `can`/
  `sat` footers left on their older single-companion pattern (pre-existing, out of scope here).
- Validated: HTML tags balanced, JS `node --check` passes, headless-Chrome render confirms the
  hero/catalog content and no console errors.

## 2026-07-10 — 4th demo added: HTTP request-smuggling ("The Queue Granite Can't Clear") — v1.3.12

- Eddie built a local live demo (Python/SSE, port 7930, private `alpha` repo) of the deontic
  RFC-conformance oracle expansion proving HTTP/1.1 request-smuggling setups (RFC 9112 §6.3 item
  3) in microseconds, with a live Vulcan-vs-Granite comparison and a real measured single-core
  throughput number (~1.2M decisions/sec avg). Liked it, said "replace demos with that on
  google" — read as: add it as a public static demo on bardtek.com (the site's domain is
  registered via Google Cloud Domains), matching the existing can/sat/dhcp pattern.
- New `demos/http11/index.html`: scripted replay (static, no backend — GitHub Pages can't run
  Python) of a real recorded run, dated 2026-07-10. Real measured numbers baked in verbatim: 2.8µs
  Vulcan vs. 2.1s Granite (~760,000x), throughput worst/best/avg (279k / 1.4M / ~1.2M per sec).
  Added as a 4th card on `demos/index.html` (did not remove/replace can, sat, or dhcp — additive
  only, per the destructive-action confirmation rule). Cross-linked from the dhcp demo's existing
  "Companion demos" footer.
- Verified live at v1.3.12.

## 2026-07-10 — DHCP demo copy fix: "big models memorize, Vulcan learns" — v1.3.11

- Eddie flagged the DHCP demo ("The 100% That Wasn't") copy: "proved it memorized instead of
  learned" never named Vulcan, so it read as if our own tech had no intelligence — "acts like we
  have no intelligence." Every remaining "memorize" reference now explicitly names the toy
  neural net; Vulcan is credited by name as the thing that interprets the spec directly and is
  correct on cases it's never seen (headline, hero lede, both callouts, the decision-set detail,
  the build detail, and the `/demos` card copy). Verified live at v1.3.11.

## 2026-07-09 — Cross-linked SAT ↔ CAN demos — v1.3.9

- Backlog #2: the two live demos now point at each other. SAT footer → CAN Studio; CAN footer →
  SAT Challenge. Makes the pair read as one product (same prove-or-refuse engine, two domains).
  Bumped `CONFIG.version` 1.3.8 → 1.3.9.

## 2026-07-09 — CAN Studio: measured µsec timing added — v1.3.8 — DEPLOYED ✓ (verify_live PASS)

- Brought back per-frame microsecond timing on the CAN demo (backlog #1). Numbers are **measured,
  not modeled**: median of 4,001 `verify_observation()` calls per frame (fresh cadence state each
  run) via a timing harness replicating the CLI's `_scan_can` path against `edhayn/vulcan-cli`.
  Machine: Apple M5 Max, CPython 3.14.4. Per verdict: unknown-id 1.8µs (short-circuits), steer
  4.6µs, dlc 5.1µs, cadence 5.3µs, NORMAL ~4.3–6.3µs.
- Rendered in three places: `[X.X µs]` gold tag on each live-monitor row, `ANOMALY · X.X µs` on
  each attack exhibit card, a `peak <n> µs` readout in the monitor header, and a footer methodology
  note stating exactly how it was measured. Bumped `CONFIG.version` 1.3.7 → 1.3.8.

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
