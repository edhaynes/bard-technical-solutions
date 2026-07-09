/* ============================================================
   Bard Technical Solutions LLC — site behavior
   All site-specific values live in CONFIG so nothing is
   hardcoded across the DOM logic below.
   ============================================================ */

/*
 * Email is stored split into parts and reassembled at runtime so the
 * raw address never appears as plain text in the page source (basic
 * scraper resistance). Swap `emailUser`/`emailDomain` for a forwarding
 * alias once one is set up. No phone number is included by request.
 */
const CONFIG = Object.freeze({
  version: "1.3.5",
  company: "Bard Technical Solutions LLC",
  tagline: "Innovative IT · Engineering · Cybersecurity",
  contact: {
    emailUser: "info",
    emailDomain: "bardtek.com",
    location: "Cambridge, MA",
  },
});

(function init() {
  wireContact(CONFIG.contact);
  wireMobileNav();
  stampFooter(CONFIG);
})();

/**
 * Wire the "Email us" button to a runtime-assembled mailto so the
 * address is never rendered as visible text or present verbatim in
 * the static HTML. The location line carries no contact details.
 */
function wireContact({ emailUser, emailDomain, location }) {
  const emailEl = document.querySelector('[data-contact="email"]');
  if (emailEl) {
    const address = `${emailUser}@${emailDomain}`;
    const subject = encodeURIComponent("Project inquiry — Bard Technical Solutions");
    emailEl.href = `mailto:${address}?subject=${subject}`;
    emailEl.textContent = "Email us";
    emailEl.setAttribute("aria-label", "Email Bard Technical Solutions");
    emailEl.setAttribute("rel", "nofollow");
  }

  const addrEl = document.querySelector('[data-contact="address"]');
  if (addrEl) addrEl.textContent = location;
}

/**
 * Accessible mobile menu toggle + auto-close on link tap.
 */
function wireMobileNav() {
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;

  const close = () => {
    toggle.setAttribute("aria-expanded", "false");
    menu.removeAttribute("data-open");
  };

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    if (open) menu.removeAttribute("data-open");
    else menu.setAttribute("data-open", "true");
  });

  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

/**
 * Stamp the year, version, and tagline into the footer.
 */
function stampFooter({ version, tagline }) {
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const verEl = document.querySelector("[data-version]");
  if (verEl) verEl.textContent = `v${version}`;

  const brandEl = document.querySelector(".footer__brand");
  if (brandEl) brandEl.title = tagline;
}
