/* ============================================================
   GANESH KUMAR — QA AUTOMATION ENGINEER PORTFOLIO
   script.js
   ============================================================ */


/* ─── 0. JS DETECTION ───────────────────────────────────── */
// Adding 'js' class enables the reveal animations via CSS.
// Without this, content stays fully visible even if JS fails.
document.documentElement.classList.add('js');


/* ─── 1. NAVBAR SHADOW ON SCROLL ─────────────────────────── */
const navbar = document.getElementById('navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}


/* ─── 2. MOBILE MENU TOGGLE ──────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

if (hamburger && navMobile) {
  hamburger.addEventListener('click', () => {
    navMobile.classList.toggle('open');
  });
}

function closeMenu() {
  if (navMobile) navMobile.classList.remove('open');
}


/* ─── 3. TEST RESULTS CARD (Hero Right) ──────────────────── */
const rcTests = document.getElementById('rcTests');

const testRows = [
  { name: 'LoginTest.verifySuccessfulLogin',   time: '0.84s' },
  { name: 'SearchTest.verifySearchResults',    time: '1.12s' },
  { name: 'CheckoutTest.verifyOrderFlow',      time: '2.34s' },
  { name: 'PDFExportTest.verifyExportFlow',    time: '1.67s' },
];

if (rcTests) {
  testRows.forEach((t, i) => {
    const row = document.createElement('div');
    row.className = 'rc-test-row';
    row.style.animationDelay = (0.9 + i * 0.18) + 's';
    row.innerHTML = `
      <span class="rc-status-dot"></span>
      <span class="rc-test-name">${t.name}</span>
      <span class="rc-test-time">${t.time}</span>
    `;
    rcTests.appendChild(row);
  });
}


/* ─── 4. SCROLL REVEAL ───────────────────────────────────── */
const revealElements = document.querySelectorAll('.reveal');

/**
 * Mark any .reveal element currently in the viewport as visible.
 */
function revealAllVisible() {
  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
    }
  });
}

/* IntersectionObserver — fires as soon as any pixel enters view */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0, rootMargin: '0px' }
);

revealElements.forEach((el) => revealObserver.observe(el));

/* Run on load to catch elements already in the viewport */
window.addEventListener('load', revealAllVisible);

/* Run after every nav-link click (smooth-scroll lands ~300-500ms later) */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    closeMenu();
    setTimeout(revealAllVisible, 150);
    setTimeout(revealAllVisible, 350);
    setTimeout(revealAllVisible, 600);
  });
});


/* ─── 5. COUNTER ANIMATION (Stat Strip) ──────────────────── */
function animateCounter(el) {
  const target    = parseFloat(el.dataset.target);
  const suffix    = el.dataset.suffix || '';
  const duration  = 1400;
  const interval  = 16;
  const steps     = duration / interval;
  const increment = target / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.round(current) + suffix;
  }, interval);
}

const statNums = document.querySelectorAll('.stat-num[data-target]');

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0 }
);

statNums.forEach((num) => counterObserver.observe(num));

/* ─── 6. COPY TO CLIPBOARD (Phone & Email) ───────────────── */

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('Copied to clipboard!');
  }).catch(err => {
    console.error('Copy failed:', err);
  });
}

/* Attach click events to copy icons */
document.querySelectorAll('[data-copy]').forEach((el) => {
  el.addEventListener('click', () => {
    const text = el.getAttribute('data-copy');
    if (text) {
      copyToClipboard(text);
    }
  });
});