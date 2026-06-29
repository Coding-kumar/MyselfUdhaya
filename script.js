const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const id = a.getAttribute('href');
  const el = document.querySelector(id);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}));

(function () {
  const accordion = document.getElementById('exp-accordion');
  if (!accordion) return;
  const buttons = Array.from(accordion.querySelectorAll('.exp-toggle'));

  function closeAll(exceptBtn) {
    buttons.forEach(btn => {
      if (btn === exceptBtn) return;
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      btn.setAttribute('aria-expanded', 'false');
      if (panel) panel.hidden = true;
    });
  }

  buttons.forEach(btn => {
    const panel = document.getElementById(btn.getAttribute('aria-controls'));

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      if (!isOpen) {
        closeAll(btn);
        btn.setAttribute('aria-expanded', 'true');
        if (panel) panel.hidden = false;
        if (window.innerWidth < 700) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        btn.setAttribute('aria-expanded', 'false');
        if (panel) panel.hidden = true;
      }
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const idx = buttons.indexOf(btn);
        const next = e.key === 'ArrowDown' ? (idx + 1) % buttons.length : (idx - 1 + buttons.length) % buttons.length;
        buttons[next].focus();
      }
      if (e.key === 'Home') { e.preventDefault(); buttons[0].focus(); }
      if (e.key === 'End') { e.preventDefault(); buttons[buttons.length - 1].focus(); }
    });
  });
})();
