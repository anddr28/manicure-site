// script.js
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  ignoreMobileResize: true,
  limitCallbacks: true
});

const ua = navigator.userAgent || "";

// грубое определение Smart TV / ТВ-браузеров
const isTV = /Tizen|SMART-TV|SmartTV|HbbTV|NetCast|Web0S|WebOS|Viera|BRAVIA|AFT|TV/i.test(ua);

const prefersReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
// На ТВ обычно лучше облегчить эффекты (меньше шанс микро-джиттера)
const lightMode = isTV || prefersReduceMotion;

// Сделаем карточки и фото фокусируемыми, чтобы на ТВ было "выделение" пультом
function makeFocusable() {
  const focusables = document.querySelectorAll(
    ".card, .service-card, .info-grid > div, .gallery-grid img"
  );
  focusables.forEach((el) => {
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "0");
  });
}

makeFocusable();

// На ТВ при фокусе иногда полезно подскроллить элемент в область видимости
if (isTV) {
  document.addEventListener("focusin", (e) => {
    const el = e.target;
    if (!el || !(el instanceof HTMLElement)) return;

    if (el.matches(".card, .service-card, .info-grid > div, .gallery-grid img, .btn, .footer a")) {
      // без smooth, чтобы не было лишних дерганий
      el.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  });
}

// Появление секций
if (lightMode) {
  // без сложной анимации
  document.querySelectorAll(".reveal").forEach((el) => {
    el.classList.remove("reveal");
    el.style.opacity = "";
    el.style.transform = "";
  });
} else {
  gsap.utils.toArray(".reveal").forEach((section) => {
    gsap.fromTo(
      section,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          once: true
        },
        // убираем reveal, чтобы CSS hover/focus transform работал и не было "отката"
        onComplete: () => {
          section.classList.remove("reveal");
          gsap.set(section, { clearProps: "opacity,transform" });
        }
      }
    );
  });

  // Параллакс hero (оставляем только не-ТВ и без reduce-motion)
  gsap.set(".hero-bg", { willChange: "transform", force3D: true });

  gsap.to(".hero-bg", {
    yPercent: 12,
    ease: "none",
    force3D: true,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.6
    }
  });
}

// Кнопка "вверх"
const btn = document.getElementById("scrollTopBtn");

function toggleScrollBtn() {
  if (!btn) return;
  if (window.scrollY > 400) btn.classList.add("show");
  else btn.classList.remove("show");
}

window.addEventListener("scroll", toggleScrollBtn);
window.addEventListener("load", () => {
  toggleScrollBtn();
  ScrollTrigger.refresh();
});

if (btn) {
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}