'use strict';

const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = [...document.querySelectorAll('.main-nav a')];

function closeMenu() {
  if (!menuButton || !mainNav) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  mainNav.classList.remove('open');
  document.body.classList.remove('menu-open');
}

menuButton?.addEventListener('click', () => {
  const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(willOpen));
  menuButton.setAttribute('aria-label', willOpen ? 'Fechar menu' : 'Abrir menu');
  mainNav.classList.toggle('open', willOpen);
  document.body.classList.toggle('menu-open', willOpen);
});

navLinks.forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 1180) closeMenu();
});

const sections = [...document.querySelectorAll('main section[id]')];
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const activeId = entry.target.id;
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${activeId}`;
        link.classList.toggle('active', isActive);
        if (isActive) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, {rootMargin: '-25% 0px -60% 0px'});
  sections.forEach(section => sectionObserver.observe(section));
}

const yearElement = document.getElementById('year');
if (yearElement) yearElement.textContent = new Date().getFullYear();

// Retorno ao topo independente do posicionamento do cabeçalho sticky.
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  backToTop.addEventListener('click', (event) => {
    event.preventDefault();
    if (document.body.classList.contains('menu-open')) closeMenu();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, left: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  });
}


// Navegação com enquadramento: centraliza se a seção couber;
// caso contrário, exibe seu início sem esconder conteúdo atrás do cabeçalho.
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const siteHeader = document.querySelector('.site-header');

function navigateToSection(target, updateHash = true) {
  const headerHeight = siteHeader?.getBoundingClientRect().height ?? 0;
  const viewportHeight = window.innerHeight;
  const safeGap = 18;
  const availableHeight = viewportHeight - headerHeight - safeGap * 2;
  const rect = target.getBoundingClientRect();
  const documentTop = rect.top + window.scrollY;
  const sectionHeight = rect.height;
  let top = documentTop - headerHeight - safeGap;

  if (sectionHeight <= availableHeight && target.id !== 'sobre') {
    top = documentTop - headerHeight - (viewportHeight - headerHeight - sectionHeight) / 2;
  }

  // No contato, evita esconder o rodapé quando os dois cabem juntos na tela.
  if (target.id === 'contato') {
    const footer = document.querySelector('.site-footer');
    if (footer && sectionHeight + footer.getBoundingClientRect().height <= availableHeight) {
      top = documentTop - headerHeight - (availableHeight - sectionHeight - footer.getBoundingClientRect().height) / 2;
    }
  }

  const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewportHeight);
  window.scrollTo({
    top: Math.min(maxScroll, Math.max(0, top)),
    behavior: reducedMotionQuery.matches ? 'auto' : 'smooth'
  });
  if (updateHash) history.replaceState(null, '', '#' + target.id);
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  const hash = link.getAttribute('href');
  if (!hash || hash === '#' || link.classList.contains('back-to-top')) return;
  const target = document.getElementById(hash.slice(1));
  if (!target || target.id === 'conteudo') return;
  link.addEventListener('click', event => {
    event.preventDefault();
    if (document.body.classList.contains('menu-open')) closeMenu();
    // Revele a seção antes de iniciar a rolagem para evitar conteúdo invisível.
    target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    navigateToSection(target);
  });
});

// Links compartilhados com âncoras usam o mesmo enquadramento.
window.addEventListener('load', () => {
  if (location.hash && location.hash !== '#topo') {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) navigateToSection(target, false);
  }
});
