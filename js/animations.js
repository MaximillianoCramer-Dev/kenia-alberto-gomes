'use strict';

// Animacoes progressivas sem ocultar conteudo: evita conflitos com CSS legado.
(() => {
  const items = [...document.querySelectorAll('.reveal')];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches || !('IntersectionObserver' in window)) return;

  const running = new WeakMap();
  const observed = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const el = entry.target;
      if (!entry.isIntersecting) return;
      if (el.dataset.motionPlayed === 'true') return;
      el.dataset.motionPlayed = 'true';
      if (typeof el.animate !== 'function') return;
      const animation = el.animate([
        { opacity: 0.25, transform: 'translateY(26px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 850, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'none' });
      running.set(el, animation);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });

  items.forEach(el => observed.observe(el));
  reduce.addEventListener?.('change', event => {
    if (!event.matches) return;
    observed.disconnect();
    items.forEach(el => running.get(el)?.cancel());
  });

  // Uma nova visita a secao permite repetir o efeito, sem ocultar elementos.
  const reset = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) return;
      const rect = entry.target.getBoundingClientRect();
      if (rect.bottom < -120 || rect.top > window.innerHeight + 120) {
        delete entry.target.dataset.motionPlayed;
      }
    });
  }, { threshold: 0 });
  items.forEach(el => reset.observe(el));
})();
