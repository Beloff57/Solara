const toggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

toggle.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.textContent = open ? "Close" : "Menu";
});

mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "Menu";
  });
});

// Scroll reveal
const revealItems = document.querySelectorAll(
  ".experience, .rituals, .quote, .reserve, .ritual-card, .pill-list, .reserve-bottom"
);

revealItems.forEach((item, index) => {
  item.classList.add("reveal");
  if (index % 3 === 1) item.classList.add("reveal-delay-1");
  if (index % 3 === 2) item.classList.add("reveal-delay-2");
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.14 });

revealItems.forEach((item) => revealObserver.observe(item));
