/* ── MÉTODO FÊNIX — main.js ── */

// ── COUNTDOWN ──
function getExpiry() {
  const key = 'fenix_expiry';
  let exp = null;
  try { exp = localStorage.getItem(key); } catch(e){}
  if (!exp) {
    exp = Date.now() + 12 * 60 * 60 * 1000; // 12h from now
    try { localStorage.setItem(key, exp); } catch(e){}
  }
  return parseInt(exp);
}

const expiry = getExpiry();

function pad(n) {
  return String(n).padStart(2, '0');
}

function updateCountdown() {
  const diff = Math.max(0, expiry - Date.now());
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const str = `${pad(h)}:${pad(m)}:${pad(s)}`;

  const elH = document.getElementById('cd-h');
  const elM = document.getElementById('cd-m');
  const elS = document.getElementById('cd-s');
  const stickyEl = document.getElementById('sticky-timer');

  if (elH) elH.textContent = pad(h);
  if (elM) elM.textContent = pad(m);
  if (elS) elS.textContent = pad(s);
  if (stickyEl) stickyEl.textContent = str;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ── STICKY BAR ──
const stickyBar = document.getElementById('stickyBar');

window.addEventListener('scroll', () => {
  if (!stickyBar) return;
  if (window.scrollY > 600) {
    stickyBar.classList.add('visible');
  } else {
    stickyBar.classList.remove('visible');
  }
}, { passive: true });

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

reveals.forEach(el => revealObserver.observe(el));
