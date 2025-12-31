// === REVEAL ANIMATION ON SCROLL ===
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  const revealPoint = 150;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if(elementTop < windowHeight - revealPoint) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// === BUTTON HOVER ANIMATION ===
const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'translateY(-3px) scale(1.05)';
    btn.style.transition = 'all 0.3s ease';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translateY(0) scale(1)';
  });
});

// === GALLERY MICRO ANIMATION ===
const galleryImages = document.querySelectorAll('.gallery-grid img');

galleryImages.forEach(img => {
  img.addEventListener('mouseenter', () => {
    img.style.transform = 'scale(1.08)';
    img.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
    img.style.boxShadow = '0 25px 60px rgba(138,43,226,0.35), 0 0 25px rgba(221,160,221,0.15)';
  });
  img.addEventListener('mouseleave', () => {
    img.style.transform = 'scale(1)';
    img.style.boxShadow = '0 10px 30px rgba(138,43,226,0.15)';
  });

  // === LIGHTBOX ON CLICK ===
  img.addEventListener('click', () => {
    openLightbox(img.src, img.alt);
  });
});

// === LIGHTBOX FUNCTION ===
function openLightbox(src, alt) {
  // создаём элементы
  const overlay = document.createElement('div');
  overlay.id = 'lightbox-overlay';
  overlay.innerHTML = `
    <div id="lightbox-content">
      <img src="${src}" alt="${alt}">
      <span id="lightbox-close">&times;</span>
    </div>
  `;
  document.body.appendChild(overlay);

  // закрытие
  document.getElementById('lightbox-close').addEventListener('click', () => {
    document.body.removeChild(overlay);
  });

  overlay.addEventListener('click', (e) => {
    if(e.target === overlay) document.body.removeChild(overlay);
  });
}

// === OPTIONAL: GSAP ANIMATION FOR HERO TEXT ===
if(typeof gsap !== 'undefined') {
  gsap.from('.hero h1', {
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: 'power3.out'
  });

  gsap.from('.hero .subtitle', {
    opacity: 0,
    y: 30,
    duration: 1.2,
    delay: 0.4,
    ease: 'power3.out'
  });

  gsap.from('.cta-buttons', {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 0.8,
    ease: 'power3.out'
  });
}
