gsap.utils.toArray(".reveal").forEach(section => {
  gsap.to(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out"
  });
});

// параллакс фона hero
gsap.to(".hero-bg", {
  yPercent: 15,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});
