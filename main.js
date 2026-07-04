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
  version: "1.3.0",
  company: "Bard Technical Solutions LLC",
  tagline: "Innovative IT · Engineering · Cybersecurity",
  contact: {
    emailUser: "info",
    emailDomain: "bardtek.com",
    location: "Cambridge, MA",
  },
  // The brand owl takes wing now and then. Purely decorative:
  // aria-hidden, no pointer events, disabled under reduced-motion.
  owl: {
    firstFlightDelayS: 3,
    flightEveryS: 45,
    flightDurationS: 14,
    minAltitudeVh: 10,
    maxAltitudeVh: 36,
  },
});

(function init() {
  wireContact(CONFIG.contact);
  wireMobileNav();
  stampFooter(CONFIG);
  wireFlyingOwl(CONFIG.owl);
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
 * A gold owl — the brand mark, airborne — glides across the viewport
 * shortly after load and every flightEveryS thereafter, at a random
 * altitude. Skipped entirely when the visitor prefers reduced motion.
 */
function wireFlyingOwl(owlCfg) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const owl = document.createElement("div");
  owl.className = "flying-owl";
  owl.setAttribute("aria-hidden", "true");
  owl.innerHTML = `
    <svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="owl-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#f9e7a0"/>
          <stop offset="0.5" stop-color="#e3b84e"/>
          <stop offset="1" stop-color="#a9762a"/>
        </linearGradient>
        <linearGradient id="owl-gold-deep" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#d9ad49"/>
          <stop offset="1" stop-color="#8a5f1f"/>
        </linearGradient>
      </defs>
      <!-- far wing -->
      <path class="owl-wing owl-wing--far" fill="url(#owl-gold-deep)"
        d="M62 42 Q 40 8 12 14 Q 34 26 44 40 Q 52 48 62 46 Z"/>
      <!-- tail -->
      <path fill="url(#owl-gold-deep)" d="M28 52 Q 14 58 6 70 Q 22 68 34 60 Z"/>
      <!-- body -->
      <path fill="url(#owl-gold)"
        d="M30 52 Q 44 34 68 36 Q 88 38 96 46 Q 90 62 70 64 Q 46 66 30 52 Z"/>
      <!-- head -->
      <circle cx="94" cy="42" r="13" fill="url(#owl-gold)"/>
      <!-- ear tufts -->
      <path fill="url(#owl-gold)" d="M86 32 L 84 24 L 92 30 Z M99 30 L 103 23 L 105 32 Z"/>
      <!-- eye -->
      <circle cx="98" cy="40" r="2.6" fill="#241708"/>
      <circle cx="99" cy="39" r="0.9" fill="#f9e7a0"/>
      <!-- beak -->
      <path fill="#8a5f1f" d="M106 43 L 113 46 L 106 49 Z"/>
      <!-- near wing -->
      <path class="owl-wing owl-wing--near" fill="url(#owl-gold)"
        d="M58 46 Q 46 76 20 84 Q 50 84 66 62 Q 72 52 68 44 Z"/>
    </svg>`;
  document.body.appendChild(owl);

  const fly = () => {
    if (owl.classList.contains("flying-owl--flying")) return;
    const span = owlCfg.maxAltitudeVh - owlCfg.minAltitudeVh;
    owl.style.top = `${owlCfg.minAltitudeVh + Math.random() * span}vh`;
    owl.style.setProperty("--owl-flight-duration", `${owlCfg.flightDurationS}s`);
    owl.classList.add("flying-owl--flying");
  };
  owl.addEventListener("animationend", (e) => {
    if (e.animationName === "owl-flight") owl.classList.remove("flying-owl--flying");
  });

  setTimeout(fly, owlCfg.firstFlightDelayS * 1000);
  setInterval(fly, owlCfg.flightEveryS * 1000);
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
