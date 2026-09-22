
"use strict";

/* =========================================
   MOBILE NAVIGATION
========================================= */

const toggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const menuLabel = document.querySelector(".menu-label");

if (toggle && mobileNav) {
  const closeMenu = () => {
    mobileNav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");

    if (menuLabel) {
      menuLabel.textContent = "Menu";
    }
  };

  const openMenu = () => {
    mobileNav.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation");

    if (menuLabel) {
      menuLabel.textContent = "Close";
    }
  };

  toggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.contains("open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    const clickedInsideMenu =
      mobileNav.contains(event.target) ||
      toggle.contains(event.target);

    if (!clickedInsideMenu) {
      closeMenu();
    }
  });
}

/* =========================================
   SCROLL REVEAL
========================================= */

const revealItems = document.querySelectorAll(".reveal-item");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
  revealItems.forEach((item) => {
    item.classList.add("visible");
  });
} else if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => {
    item.classList.add("visible");
  });
}

/* =========================================
   SUBTLE HERO MOUSE MOVEMENT
========================================= */

const hero = document.querySelector(".hero");
const orbit = document.querySelector(".hero-orbit");
const heroGrid = document.querySelector(".hero-grid");

const isTouchDevice =
  window.matchMedia("(hover: none)").matches ||
  window.matchMedia("(pointer: coarse)").matches;

if (
  hero &&
  orbit &&
  heroGrid &&
  !prefersReducedMotion &&
  !isTouchDevice
) {
  let animationFrame = null;

  hero.addEventListener("mousemove", (event) => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }

    animationFrame = requestAnimationFrame(() => {
      const rect = hero.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      orbit.style.transform =
        `translate(${x * -18}px, ${y * -18}px)`;

      heroGrid.style.transform =
        `translate(${x * 8}px, ${y * 8}px)`;
    });
  });

  hero.addEventListener("mouseleave", () => {
    orbit.style.transform = "";
    heroGrid.style.transform = "";
  });
}

/* =========================================
   SMOOTH ANCHOR FOCUS
========================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start"
    });
  });
});