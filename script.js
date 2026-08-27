/* =========================================================
   ANUJA INDALKAR — PORTFOLIO SCRIPTS
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Robust internal anchor scrolling ---------- */
  /* Intercepts every same-page "#section" link and scrolls to it directly,
     instead of relying on native browser anchor resolution (which can behave
     unpredictably inside sandboxed/preview iframes). */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;

    link.addEventListener('click', (e) => {
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      closeMobileMenu();
      const navOffset = document.getElementById('navbar').offsetHeight;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navOffset + 1;
      window.scrollTo({ top, behavior: 'smooth' });
      history.pushState(null, '', targetId);
    });
  });

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  const progressBar = document.getElementById('scrollProgressBar');

  function onScroll(){
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 40);
    backToTop.classList.toggle('show', y > 500);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (y / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMobileMenu(){
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  /* ---------- Active section indicator ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(section => sectionObserver.observe(section));

  /* ---------- Scroll reveal animations ---------- */
  const animatedEls = document.querySelectorAll('[data-animate]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const delay = entry.target.dataset.delay || 0;
        entry.target.style.transitionDelay = delay + 'ms';
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  animatedEls.forEach(el => revealObserver.observe(el));

  /* ---------- Typing animation ---------- */
  const roles = ['Developer', 'Data Enthusiast', 'Problem Solver', 'Lifelong Learner'];
  const typingEl = document.getElementById('typingText');
  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop(){
    const current = roles[roleIndex];

    if (!deleting){
      charIndex++;
      typingEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length){
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      charIndex--;
      typingEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0){
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 45 : 85);
  }
  typeLoop();

  /* ---------- Project details toggle ---------- */
  document.querySelectorAll('.project-details-toggle').forEach(btn => {
    const details = btn.nextElementSibling;
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (!expanded){
        details.style.maxHeight = details.scrollHeight + 'px';
        btn.querySelector('span').textContent = 'Hide Details';
      } else {
        details.style.maxHeight = '0px';
        btn.querySelector('span').textContent = 'View Details';
      }
    });
  });

  /* ---------- Contact form validation ---------- */
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  const validators = {
    name: v => v.trim().length >= 2 || 'Please enter your name.',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please enter a valid email address.',
    subject: v => v.trim().length >= 3 || 'Please enter a subject.',
    message: v => v.trim().length >= 10 || 'Message should be at least 10 characters.'
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    Object.keys(validators).forEach(field => {
      const input = document.getElementById(field);
      const errorEl = document.getElementById(field + 'Error');
      const result = validators[field](input.value);

      if (result !== true){
        valid = false;
        errorEl.textContent = result;
        input.closest('.form-group').classList.add('error');
      } else {
        errorEl.textContent = '';
        input.closest('.form-group').classList.remove('error');
      }
    });

    if (valid){
      successMsg.classList.add('show');
      form.reset();
      setTimeout(() => successMsg.classList.remove('show'), 5000);
    } else {
      successMsg.classList.remove('show');
    }
  });

  /* ---------- Hero network canvas (signature element) ---------- */
  const canvas = document.getElementById('networkCanvas');
  const ctx = canvas.getContext('2d');
  let nodes = [];
  let animationId;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resizeCanvas(){
    const hero = document.querySelector('.hero');
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
    initNodes();
  }

  function initNodes(){
    const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 26000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.8
    }));
  }

  function drawFrame(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const maxDist = 130;

    for (let i = 0; i < nodes.length; i++){
      const n = nodes[i];
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

      for (let j = i + 1; j < nodes.length; j++){
        const m = nodes[j];
        const dx = n.x - m.x, dy = n.y - m.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist){
          ctx.strokeStyle = `rgba(124,140,255,${(1 - dist / maxDist) * 0.18})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();
        }
      }
    }
    for (const n of nodes){
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(148,180,255,0.55)';
      ctx.fill();
    }

    animationId = requestAnimationFrame(drawFrame);
  }

  if (canvas && !prefersReducedMotion){
    resizeCanvas();
    drawFrame();
    window.addEventListener('resize', () => {
      cancelAnimationFrame(animationId);
      resizeCanvas();
      drawFrame();
    });
  } else if (canvas){
    canvas.style.display = 'none';
  }

});
