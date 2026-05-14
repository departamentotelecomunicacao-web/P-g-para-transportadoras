/* ===== GSAP SETUP ===== */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ===== NAV SCROLL ===== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

/* ===== HAMBURGER ===== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.classList.toggle('nav-open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.classList.remove('nav-open');
  });
});

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      gsap.to(window, { duration: .8, scrollTo: { y: target, offsetY: 80 }, ease: 'power2.inOut' });
    }
  });
});

/* ===== PARTICLES ===== */
const particlesContainer = document.getElementById('particles');
function createParticles() {
  const count = window.innerWidth < 768 ? 15 : 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 3 + 1;
    Object.assign(p.style, {
      width: size + 'px',
      height: size + 'px',
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      opacity: Math.random() * .4 + .1
    });
    particlesContainer.appendChild(p);
    gsap.to(p, {
      y: -(Math.random() * 120 + 40),
      x: (Math.random() - .5) * 60,
      opacity: 0,
      duration: Math.random() * 8 + 6,
      repeat: -1,
      delay: Math.random() * 6,
      ease: 'none',
      onRepeat: function () {
        gsap.set(p, { y: 0, x: 0, opacity: Math.random() * .4 + .1 });
      }
    });
  }
}
createParticles();

/* ===== HERO ENTRANCE ===== */
const heroTl = gsap.timeline({ delay: .2 });
heroTl
  .from('#heroBadge',   { opacity: 0, y: 30, duration: .6, ease: 'power2.out' })
  .from('#heroTitle',   { opacity: 0, y: 40, duration: .7, ease: 'power2.out' }, '-=.3')
  .from('#heroSubtitle',{ opacity: 0, y: 30, duration: .6, ease: 'power2.out' }, '-=.4')
  .from('#heroActions', { opacity: 0, y: 30, duration: .6, ease: 'power2.out' }, '-=.3')
  .from('#heroStats',   { opacity: 0, y: 20, duration: .5, ease: 'power2.out' }, '-=.3')
  .from('#heroVisual',  { opacity: 0, x: 60, duration: .9, ease: 'power2.out' }, '-=.8');

/* floating animations for mockup elements */
gsap.to('.mockup-float--1', { y: -10, duration: 2.5, repeat: -1, yoyo: true, ease: 'power1.inOut', delay: .5 });
gsap.to('.mockup-float--2', { y: 8,  duration: 3,   repeat: -1, yoyo: true, ease: 'power1.inOut' });
gsap.to('.hero__orb--1',    { x: 30, y: -20, duration: 8, repeat: -1, yoyo: true, ease: 'power1.inOut' });
gsap.to('.hero__orb--2',    { x: -20, y: 20, duration: 10, repeat: -1, yoyo: true, ease: 'power1.inOut' });

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  gsap.fromTo(el, { innerText: 0 }, {
    innerText: target,
    duration: 2,
    ease: 'power2.out',
    snap: { innerText: 1 },
    onUpdate: function () { el.innerText = Math.floor(this.targets()[0].innerText); }
  });
}

ScrollTrigger.create({
  trigger: '#heroStats',
  start: 'top 85%',
  once: true,
  onEnter: () => document.querySelectorAll('#heroStats .stat__number').forEach(animateCounter)
});
ScrollTrigger.create({
  trigger: '.historia__nums',
  start: 'top 80%',
  once: true,
  onEnter: () => document.querySelectorAll('.historia__nums .num-big[data-target]').forEach(animateCounter)
});

/* ===== SCROLL ANIMATIONS ===== */
function registerFadeUp(selector, stagger = .12) {
  gsap.from(selector, {
    scrollTrigger: { trigger: selector, start: 'top 82%', once: true },
    opacity: 0, y: 50, duration: .7, stagger, ease: 'power2.out'
  });
}

/* Trust bar */
gsap.from('.trust-logo', {
  scrollTrigger: { trigger: '.trust-bar', start: 'top 90%', once: true },
  opacity: 0, y: 20, duration: .5, stagger: .08, ease: 'power2.out'
});

/* História */
gsap.from('.historia__text', {
  scrollTrigger: { trigger: '.historia__inner', start: 'top 75%', once: true },
  opacity: 0, x: 60, duration: .8, ease: 'power2.out'
});
gsap.from('.historia__visual', {
  scrollTrigger: { trigger: '.historia__inner', start: 'top 75%', once: true },
  opacity: 0, x: -60, duration: .8, ease: 'power2.out'
});
gsap.from('.timeline-item', {
  scrollTrigger: { trigger: '.historia__timeline', start: 'top 80%', once: true },
  opacity: 0, x: -30, duration: .6, stagger: .15, ease: 'power2.out'
});

/* Serviços */
gsap.from('.servicos .section-header', {
  scrollTrigger: { trigger: '.servicos', start: 'top 80%', once: true },
  opacity: 0, y: 40, duration: .7, ease: 'power2.out'
});
gsap.from('.servico-card', {
  scrollTrigger: { trigger: '.servicos__grid', start: 'top 80%', once: true },
  opacity: 0, y: 50, duration: .65, stagger: .1, ease: 'power2.out'
});

/* Steps */
gsap.from('.step', {
  scrollTrigger: { trigger: '.steps', start: 'top 80%', once: true },
  opacity: 0, y: 40, duration: .6, stagger: .15, ease: 'power2.out'
});
gsap.from('.step__connector', {
  scrollTrigger: { trigger: '.steps', start: 'top 80%', once: true },
  scaleX: 0, duration: .5, stagger: .15, ease: 'power2.out', delay: .3
});

/* Produtos */
gsap.from('.produto-card', {
  scrollTrigger: { trigger: '.produtos__grid', start: 'top 80%', once: true },
  opacity: 0, y: 50, duration: .65, stagger: .1, ease: 'power2.out'
});

/* Depoimentos */
gsap.from('.depoimento-card', {
  scrollTrigger: { trigger: '.depoimentos__grid', start: 'top 80%', once: true },
  opacity: 0, y: 40, duration: .6, stagger: .15, ease: 'power2.out'
});

/* CTA Banner */
gsap.from('.cta-banner__text', {
  scrollTrigger: { trigger: '.cta-banner', start: 'top 80%', once: true },
  opacity: 0, x: -40, duration: .7, ease: 'power2.out'
});
gsap.from('.cta-banner__action', {
  scrollTrigger: { trigger: '.cta-banner', start: 'top 80%', once: true },
  opacity: 0, x: 40, duration: .7, ease: 'power2.out'
});

/* Contato */
gsap.from('.contato__info', {
  scrollTrigger: { trigger: '.contato__inner', start: 'top 80%', once: true },
  opacity: 0, x: -50, duration: .8, ease: 'power2.out'
});
gsap.from('.contato__form-wrap', {
  scrollTrigger: { trigger: '.contato__inner', start: 'top 80%', once: true },
  opacity: 0, x: 50, duration: .8, ease: 'power2.out'
});

/* Section headers */
document.querySelectorAll('.section-header').forEach(h => {
  gsap.from(h.children, {
    scrollTrigger: { trigger: h, start: 'top 85%', once: true },
    opacity: 0, y: 30, duration: .6, stagger: .1, ease: 'power2.out'
  });
});

/* ===== PRODUTO CARD HOVER TILT ===== */
document.querySelectorAll('.produto-card, .servico-card, .depoimento-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - .5;
    const y = (e.clientY - rect.top)  / rect.height - .5;
    gsap.to(card, { rotateY: x * 6, rotateX: -y * 6, duration: .3, ease: 'power2.out', transformPerspective: 800 });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateY: 0, rotateX: 0, duration: .4, ease: 'power2.out' });
  });
});

/* ===== MOCKUP BAR ANIMATION ===== */
ScrollTrigger.create({
  trigger: '#heroVisual',
  start: 'top 80%',
  once: true,
  onEnter: () => {
    document.querySelectorAll('.mockup-bar__fill').forEach(bar => {
      const w = bar.style.width;
      bar.style.width = '0';
      gsap.to(bar, { width: w, duration: 1.5, ease: 'power2.out', delay: .5 });
    });
  }
});

/* ===== FORM ===== */
const form = document.getElementById('contatoForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

function maskPhone(input) {
  input.addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length >= 7) {
      v = v.length === 11
        ? v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
        : v.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (v.length >= 3) {
      v = v.replace(/(\d{2})(\d+)/, '($1) $2');
    } else if (v.length >= 1) {
      v = v.replace(/(\d+)/, '($1');
    }
    this.value = v;
  });
}
maskPhone(document.getElementById('telefone'));

function validateForm() {
  let valid = true;
  const fields = [
    { id: 'nome',     msg: 'Por favor, informe seu nome.' },
    { id: 'empresa',  msg: 'Informe o nome da transportadora.' },
    { id: 'telefone', msg: 'Informe um telefone válido.' },
    { id: 'servico',  msg: 'Selecione uma solução.' }
  ];
  fields.forEach(({ id, msg }) => {
    const el = document.getElementById(id);
    const err = el.parentElement.querySelector('.form-error');
    if (!el.value.trim()) {
      el.classList.add('error');
      if (err) err.textContent = msg;
      valid = false;
    } else {
      el.classList.remove('error');
      if (err) err.textContent = '';
    }
  });
  return valid;
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  if (!validateForm()) return;

  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  btnText.style.display = 'none';
  btnLoading.style.display = 'inline';
  submitBtn.disabled = true;

  await new Promise(r => setTimeout(r, 1400));

  const nome     = document.getElementById('nome').value.trim();
  const empresa  = document.getElementById('empresa').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const frota    = document.getElementById('frota').value;
  const servico  = document.getElementById('servico').value;
  const mensagem = document.getElementById('mensagem').value.trim();

  const frota_map = { '1-10':'1 a 10 veículos','11-50':'11 a 50 veículos','51-200':'51 a 200 veículos','200+':'Mais de 200 veículos','' :'Não informado' };
  const servico_map = { reducao:'Redução de Custos', mdm:'MDM Corporativo', ramais:'Ramais Virtuais', linhas:'Contratação de Linhas', chips:'Gestão de Chips', esim:'Ativação de eSIM', tudo:'Todas as soluções' };

  const text = encodeURIComponent(
    `Olá! Vim pelo site da Fatura Expert para Transportadoras.\n\n` +
    `*Nome:* ${nome}\n*Empresa:* ${empresa}\n*Telefone:* ${telefone}\n` +
    `*Frota:* ${frota_map[frota]}\n*Interesse:* ${servico_map[servico] || servico}\n` +
    (mensagem ? `*Mensagem:* ${mensagem}` : '')
  );

  gsap.to(form, { opacity: 0, y: -20, duration: .4, ease: 'power2.in', onComplete: () => {
    form.style.display = 'none';
    formSuccess.style.display = 'block';
    gsap.from(formSuccess, { opacity: 0, y: 20, duration: .5, ease: 'power2.out' });
  }});

  setTimeout(() => {
    window.open(`https://wa.me/552740422220?text=${text}`, '_blank');
  }, 800);
});

form.querySelectorAll('input, select, textarea').forEach(el => {
  el.addEventListener('input', () => {
    if (el.value.trim()) {
      el.classList.remove('error');
      const err = el.parentElement.querySelector('.form-error');
      if (err) err.textContent = '';
    }
  });
});

/* ===== WHATSAPP FLOAT SHOW/HIDE ===== */
const waf = document.getElementById('whatsappFloat');
ScrollTrigger.create({
  start: '200px',
  onUpdate: self => {
    gsap.to(waf, { opacity: self.progress > 0 ? 1 : 0, duration: .3 });
  }
});
gsap.set(waf, { opacity: 0 });

/* ===== REFRESH ON RESIZE ===== */
window.addEventListener('resize', () => ScrollTrigger.refresh());
