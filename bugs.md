# Bugs — Bard Technical Solutions site

## Process

- **Featured-work links authored but never committed/pushed** — *Completed, 2026-06-16.*
  The GitHub + App Store (+ podcast) splash cards were written into `index.html`/`styles.css`
  on 2026-06-15 but left as uncommitted local changes, so they never deployed to GitHub Pages.
  Eddie noticed the live site was missing the links. Violates coding-rules §0.10 (commit as
  soon as a change is done) and §7.4 (no unpushed work at session end — remote is the only
  backup). Fixed: committed + pushed in `491ece5`. Prevention: treat "done" as not-done until
  it's on `main`.
