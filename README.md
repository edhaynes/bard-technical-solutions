# Bard Technical Solutions LLC — Website

A single-page marketing site for **Bard Technical Solutions LLC** — *Innovative IT ·
Engineering · Cybersecurity* (Cambridge, MA).

Static **HTML / CSS / vanilla JS** — no framework, no build step. Deploys for free
to GitHub Pages, Netlify, Cloudflare Pages, or any static host.

## What it covers

A single scrolling page with: hero, services (four core pillars + supporting
capabilities), how-we-work process, about, and a contact CTA.

The four core service pillars:

1. **App Development**
2. **Embedded Design**
3. **High Availability**
4. **Security**

## Quick start

No install or build needed — just open the file or serve the folder.

**Open directly (any OS):** double-click `index.html`, or:

```bash
# macOS
open index.html
# Linux
xdg-open index.html
# Windows (PowerShell)
start index.html
```

**Serve locally** (recommended — matches how a host serves it):

```bash
# Python 3 (macOS / Linux / Windows)
python3 -m http.server 8080
# then visit http://localhost:8080
```

```bash
# Node, if you prefer
npx serve .
```

## Configuration

All site-specific values live in one place: the `CONFIG` object at the top of
`main.js`. Edit there — nothing is duplicated in the markup.

| Key                    | Default                       | Description                                       |
| ---------------------- | ----------------------------- | ------------------------------------------------- |
| `version`              | `1.2.0`                       | Shown in the footer (`v…`).                       |
| `company`              | `Bard Technical Solutions LLC`| Legal name.                                       |
| `tagline`              | `Innovative IT · Engineering · Cybersecurity` | Brand line (from the card).       |
| `contact.emailUser`    | `info`                        | Local part of the email; reassembled at runtime.  |
| `contact.emailDomain`  | `bardtek.com`                 | Domain part; combined with `emailUser` for the `mailto:`. |
| `contact.location`     | `Cambridge, MA`               | Shown in the contact section + footer.            |

### Privacy choices

- **No phone number** appears anywhere on the page (or in the JS).
- **The email address is never shown as text** and is not present verbatim in
  the static HTML. The "Email us" button's `mailto:` is assembled at runtime in
  `main.js` from `emailUser` + `emailDomain` — basic scraper resistance.
- To route through a **forwarding alias** instead of the Gmail address, just
  change `emailUser`/`emailDomain` (see "Things to confirm" below).

## Files

```
index.html        Page markup (semantic sections)
styles.css        Navy + gold theme (matches the business card)
main.js           CONFIG + mobile nav + contact wiring + version stamp
assets/owl.png    The real owl-and-gears logo, extracted from the card
assets/favicon.png Square favicon derived from the logo
```

## Deployment

It's static, so any of these work with zero changes:

- **GitHub Pages** — push to a repo, enable Pages on the branch root.
- **Netlify / Cloudflare Pages** — drag-and-drop the folder, or connect the repo.
- **Any web server** — copy the folder to the document root.

## Notes / things to confirm

- **Domain:** `bardtek.com` (registered via Google Cloud Domains, project
  `potent-catwalk-415015`; DNS in Cloud DNS zone `bardtek-com`).
- **Email:** the contact button opens `mailto:info@bardtek.com`, which forwards to
  the owner's Gmail via **ImprovMX** (free). The real inbox address lives only in
  the ImprovMX dashboard — it is *not* published in DNS or in this repo. DNS records
  (MX → `mx1/mx2.improvmx.com`, SPF TXT) are in Cloud DNS.
- **Hosting:** GitHub Pages, custom domain `bardtek.com` (apex A/AAAA + `www` CNAME
  in Cloud DNS; `CNAME` file in this repo).
- The logo in `assets/owl.png` is the **actual owl mark extracted from the business
  card** (navy keyed to transparent). If you have the original vector artwork, drop
  it in to replace the raster for crisper scaling.
- Personal name/title from the card is intentionally **not** included.
