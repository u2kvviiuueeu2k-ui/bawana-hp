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

// Contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameEl    = document.getElementById('contact-name');
    const emailEl   = document.getElementById('contact-email');
    const messageEl = document.getElementById('contact-message');
    const submitBtn = document.getElementById('contact-submit');
    const feedback  = document.getElementById('form-feedback');

    // エラー表示をリセット
    ['name', 'email', 'message'].forEach(f => {
      document.getElementById('err-' + f).textContent = '';
    });
    feedback.hidden = true;
    feedback.className = 'form-feedback';

    // ローディング状態
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').hidden = true;
    submitBtn.querySelector('.btn-loading').hidden = false;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    nameEl.value,
          email:   emailEl.value,
          message: messageEl.value,
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        feedback.textContent = data.message;
        feedback.classList.add('form-feedback--success');
        feedback.hidden = false;
        contactForm.reset();
      } else if (res.status === 400 && data.errors) {
        // フィールドごとのエラー表示
        Object.entries(data.errors).forEach(([field, msg]) => {
          const el = document.getElementById('err-' + field);
          if (el) el.textContent = msg;
        });
      } else {
        throw new Error(data.error ?? '送信に失敗しました');
      }
    } catch (err) {
      feedback.textContent = 'エラーが発生しました。お電話にてお問い合わせください。';
      feedback.classList.add('form-feedback--error');
      feedback.hidden = false;
    } finally {
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').hidden = false;
      submitBtn.querySelector('.btn-loading').hidden = true;
    }
  });
}
