# JOURNAL — bard-technical-solutions (bardtek.com)

Newest on top. Latest entry supersedes older ones where they conflict.

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
