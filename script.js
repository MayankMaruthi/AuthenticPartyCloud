// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
const navBackdrop = document.getElementById("navBackdrop");
const navClose = document.getElementById("navClose");

function setMenu(open) {
  document.body.classList.toggle("menu-open", open);
  nav.classList.toggle("is-open", open); // kept for compatibility
  hamburger?.setAttribute("aria-expanded", String(open));

  // Lock scroll when menu open (mobile)
  document.body.style.overflow = open ? "hidden" : "";

  // Accessibility: focus first link when opening
  if (open) {
    const firstLink = nav.querySelector(".nav__link");
    firstLink?.focus?.();
  }
}

hamburger?.addEventListener("click", () => {
  const open = !document.body.classList.contains("menu-open");
  setMenu(open);
});

// Close when clicking backdrop
navBackdrop?.addEventListener("click", () => setMenu(false));

// Close on ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});

// Close menu on link click
document.querySelectorAll(".nav__link").forEach(link => {
  link.addEventListener("click", () => setMenu(false));
});

// Close if resized up to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 820) setMenu(false);
});

// Active nav highlight on scroll
const sections = ["home", "services", "plan", "gallery", "decor", "about", "contact"]
  .map(id => document.getElementById(id))
  .filter(Boolean);

const links = Array.from(document.querySelectorAll(".nav__link"));

function setActive(id) {
  links.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) setActive(entry.target.id);
  });
}, { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 });

sections.forEach(sec => observer.observe(sec));

/* Back to top (always works) */
const backToTop = document.getElementById("backToTop");
backToTop?.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* DECOR OPTIONS INTERACTIVE */
const planEls = Array.from(document.querySelectorAll(".plan"));
const selectedText = document.getElementById("selectedPackageText");
const selectedPrice = document.getElementById("selectedPackagePrice");

function selectPlan(planEl) {
  if (!planEl) return;
  planEls.forEach(p => p.classList.remove("is-selected"));
  planEl.classList.add("is-selected");

  const pkg = planEl.dataset.package || "";
  const price = planEl.dataset.price || "";
  if (selectedText) selectedText.textContent = pkg || "Decor";
  if (selectedPrice) selectedPrice.textContent = price || "";
}

planEls.forEach(plan => {
  plan.addEventListener("click", () => selectPlan(plan));
  plan.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectPlan(plan);
    }
  });
});
if (planEls[0]) selectPlan(planEls[0]);

/* PLAN YOUR NEXT EVENT: event type selection */
const eventButtons = Array.from(document.querySelectorAll(".eventType"));
const selectedEventText = document.getElementById("selectedEventText");

function selectEvent(btn) {
  eventButtons.forEach(b => b.classList.remove("is-selected"));
  btn.classList.add("is-selected");
  if (selectedEventText) selectedEventText.textContent = btn.dataset.event || btn.textContent.trim();
}
eventButtons.forEach(btn => btn.addEventListener("click", () => selectEvent(btn)));
if (eventButtons[0]) selectEvent(eventButtons[0]);
