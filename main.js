// Sticky header on scroll
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Hamburger menu
const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');
navToggle.addEventListener('click', () => {
  const open = navToggle.classList.toggle('open');
  siteNav.classList.toggle('open', open);
  navToggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
});

// Close nav on link click (mobile)
siteNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    siteNav.classList.remove('open');
  });
});

// Menu tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + tab).classList.add('active');
  });
});

// Fade-in on scroll (Intersection Observer)
const fadeEls = document.querySelectorAll(
  '.feature-card, .menu-card, .review-card, .info-row, .section-title, .about-desc, .reserve-desc'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));
