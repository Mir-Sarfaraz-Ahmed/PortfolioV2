/* ══════════════════════════════════════════════
   SCRIPT.JS — Mir Sarfaraz Ahmed Portfolio v2
══════════════════════════════════════════════ */

window.addEventListener('DOMContentLoaded', () => {

  /* ── Custom Cursor ───────────────────────── */
  const cdot  = document.getElementById('cdot');
  const cring = document.getElementById('cring');

  if (cdot && cring) {
    let mx=0, my=0, rx=0, ry=0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cdot.style.left = (mx - 3) + 'px';
      cdot.style.top  = (my - 3) + 'px';
    });

    (function animRing() {
      rx += (mx - rx - 14) * 0.11;
      ry += (my - ry - 14) * 0.11;
      cring.style.left = rx + 'px';
      cring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    })();

    document.querySelectorAll('a, button, .proj-row, .channel').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cdot.style.transform  = 'scale(3)';
        cring.style.opacity   = '0';
      });
      el.addEventListener('mouseleave', () => {
        cdot.style.transform  = 'scale(1)';
        cring.style.opacity   = '1';
      });
    });
  }

  /* ── Scroll Reveal ───────────────────────── */
  const reveals = document.querySelectorAll('.reveal, .reveal-left');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  reveals.forEach(r => revealObs.observe(r));

  /* ── Skill Bars Animate on Scroll ────────── */
  const skillsBlock = document.getElementById('skillsBlock');
  if (skillsBlock) {
    const skillObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.skill-fill').forEach(bar => {
            bar.style.width = bar.dataset.w + '%';
          });
        }
      });
    }, { threshold: 0.3 });
    skillObs.observe(skillsBlock);
  }

  /* ── Nav Active on Scroll ────────────────── */
  const sectionIds = ['home', 'about', 'projects', 'contact'];
  const navLinks   = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    const y = window.scrollY + 80;
    sectionIds.forEach((id, i) => {
      const sec = document.getElementById(id);
      if (sec && y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(a => a.classList.remove('active'));
        if (navLinks[i]) navLinks[i].classList.add('active');
      }
    });
  });

  /* ── Contact Form ────────────────────────── */
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form && status) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const data = new FormData(form);
      try {
        const res = await fetch(form.action, {
          method: 'POST', body: data,
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          status.style.color   = '#4A7FA7';
          status.textContent   = '✓ MESSAGE TRANSMITTED SUCCESSFULLY';
          form.reset();
        } else {
          status.style.color   = '#e74c3c';
          status.textContent   = '✗ TRANSMISSION FAILED · PLEASE RETRY';
        }
      } catch {
        status.style.color = '#e74c3c';
        status.textContent = '✗ NETWORK ERROR · CHECK CONNECTION';
      }
    });
  }

});

/* ── Project Expand (global so onclick works) ── */
function toggleProject(i) {
  const det  = document.getElementById('pdet' + i);
  const arr  = document.getElementById('parr' + i);
  if (!det) return;

  const isOpen = det.style.maxHeight && det.style.maxHeight !== '0px';

  // close all
  document.querySelectorAll('.proj-detail').forEach(d => d.style.maxHeight = '0px');
  document.querySelectorAll('.p-arrow').forEach(a => a.textContent = '▼');

  if (!isOpen) {
    det.style.maxHeight = det.scrollHeight + 'px';
    if (arr) arr.textContent = '▲';
  }
}
