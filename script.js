// AOS
AOS.init({ once: true, offset: 70, duration: 750 });

// Navbar solid on scroll + active link
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('solid', window.scrollY > 50);
  highlightNav();
});

function highlightNav() {
  const links = document.querySelectorAll('.nav-list a');
  let current = '';
  document.querySelectorAll('section[id]').forEach(s => {
    if (window.scrollY >= s.offsetTop - 140) current = s.id;
  });
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
}

// Typed text
const words = ['AI Researcher', 'ROS Developer', 'ML Engineer', 'Computer Vision Expert'];
let wi = 0, ci = 0, del = false;
const el = document.getElementById('typed');
function tick() {
  const w = words[wi];
  if (!del) {
    el.textContent = w.slice(0, ++ci);
    if (ci === w.length) { del = true; return setTimeout(tick, 2000); }
  } else {
    el.textContent = w.slice(0, --ci);
    if (ci === 0) { del = false; wi = (wi + 1) % words.length; }
  }
  setTimeout(tick, del ? 50 : 90);
}
setTimeout(tick, 800);

// Counter animation
function runCounters() {
  document.querySelectorAll('.bnum[data-to]').forEach(el => {
    const target = +el.dataset.to, dur = 1000;
    let start = null;
    function step(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.floor(p * target);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  });
}
const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) { runCounters(); obs.disconnect(); } }, { threshold: 0.4 });
const abt = document.getElementById('about');
if (abt) obs.observe(abt);

// Mobile menu
const burger = document.getElementById('burger');
const mobMenu = document.getElementById('mobMenu');
const mobBg   = document.getElementById('mobBg');
const mobClose = document.getElementById('mobClose');

function openMenu()  { mobMenu.classList.add('on'); mobBg.classList.add('on'); document.body.style.overflow = 'hidden'; }
function closeMenu() { mobMenu.classList.remove('on'); mobBg.classList.remove('on'); document.body.style.overflow = ''; }

burger.addEventListener('click', openMenu);
mobClose.addEventListener('click', closeMenu);
mobBg.addEventListener('click', closeMenu);
document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', closeMenu));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});
