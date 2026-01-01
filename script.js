gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".reveal").forEach(el => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
    }
  });
});
