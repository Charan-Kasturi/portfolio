// ── AOS init ────────────────────────────────────────
AOS.init({ once: true, offset: 80, duration: 700 });

// ── Navbar: shrink + active link on scroll ───────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNav();
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 130) current = s.id;
  });
  links.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
}

// ── Typed text ───────────────────────────────────────
const words = ['Autonomous Robots', 'AI Systems', 'Computer Vision', 'ROS Applications', 'the Future'];
let wi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const word = words[wi];
  if (!deleting) {
    typedEl.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typedEl.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
  }
  setTimeout(type, deleting ? 55 : 95);
}
setTimeout(type, 900);

// ── Counter animation ────────────────────────────────
function animateCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = +el.dataset.target;
    let n = 0;
    const step = () => {
      n = Math.min(n + Math.ceil(target / 28), target);
      el.textContent = n;
      if (n < target) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

const aboutObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounters(); aboutObs.disconnect(); } });
}, { threshold: 0.3 });
const aboutSection = document.getElementById('about');
if (aboutSection) aboutObs.observe(aboutSection);

// ── Mobile drawer ────────────────────────────────────
const hamburger   = document.getElementById('hamburger');
const drawer      = document.getElementById('mobileDrawer');
const overlay     = document.getElementById('mobileOverlay');
const drawerClose = document.getElementById('drawerClose');

function openDrawer()  { drawer.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeDrawer() { drawer.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; }

hamburger  .addEventListener('click', openDrawer);
overlay    .addEventListener('click', closeDrawer);
drawerClose.addEventListener('click', closeDrawer);
document.querySelectorAll('.drawer-link').forEach(l => l.addEventListener('click', closeDrawer));

// ── Smooth scroll for all anchor links ───────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
