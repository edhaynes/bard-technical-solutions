# Bugs — Bard Technical Solutions site

## Process

- **Flying-owl removal + gold owl recolor failed 4–5 times: work never reached `main`** — *Completed, 2026-07-09.*
  Eddie asked repeatedly (sessions outside this clone, likely claude.ai web/mobile) to remove the
  flying owl (`5a70924`, 2026-07-03) and recolor the static owl gold-on-blue. Zero removal
  commits ever reached `origin/main` — no PRs, no branches, nothing in any local reflog. GitHub
  Pages serves only `main`, so nothing changed no matter how many times the work was "done."
  Compounding: this local clone was 2 commits behind and never contained the flying-owl code
  (attempts here found nothing to remove), and no attempt ever verified against the live site.
  Same failure class as the 2026-06-16 featured-links bug below — work not on `main` does not
  exist. Fixed 2026-07-09: flying owl removed (v1.3.1), owl recolored gold-on-navy via
  `tools/recolor_owl.py` (v1.3.2), and `tools/verify_live.sh` added as the mandatory post-push
  gate (cache-busted byte-compare of all live assets vs the local tree). Prevention: every
  change to this site ends with `tools/verify_live.sh <version>` passing — committed is not
  done, deployed-and-verified is done.

- **Featured-work links authored but never committed/pushed** — *Completed, 2026-06-16.*
  The GitHub + App Store (+ podcast) splash cards were written into `index.html`/`styles.css`
  on 2026-06-15 but left as uncommitted local changes, so they never deployed to GitHub Pages.
  Eddie noticed the live site was missing the links. Violates coding-rules §0.10 (commit as
  soon as a change is done) and §7.4 (no unpushed work at session end — remote is the only
  backup). Fixed: committed + pushed in `491ece5`. Prevention: treat "done" as not-done until
  it's on `main`.
