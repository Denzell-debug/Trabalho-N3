'use strict';

const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const cart = {
  items: [],
  get count() { return this.items.length; },
  add(item) { this.items.push(item); this.updateBadge(); showToast(`"${item.name}" adicionado ao carrinho!`, 'success'); },
  updateBadge() {
    const badges = qsa('.cart-badge');
    badges.forEach(b => {
      b.textContent = this.count;
      b.classList.toggle('visible', this.count > 0);
    });
  }
};

const wishlist = new Set();

function showToast(message, type = 'info') {
  let container = qs('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: '✓', error: '✕', info: '♡' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type] || '•'}</span><span>${message}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => { requestAnimationFrame(() => toast.classList.add('show')); });
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

function initNavbar() {
  const navbar = qs('.navbar');
  if (!navbar) return;
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  qsa('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === page || (page === 'index.html' && href === 'index.html'));
  });
}

function initHamburger() {
  const btn  = qs('.hamburger');
  const menu = qs('.mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    btn.setAttribute('aria-expanded', open);
  });
  qsa('.mobile-menu a').forEach(a => a.addEventListener('click', () => {
    btn.classList.remove('open');
    menu.classList.remove('open');
    document.body.style.overflow = '';
  }));
}

function initScrollTop() {
  const btn = qs('.scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initWishlist() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.card-wishlist');
    if (!btn) return;
    const id = btn.dataset.id;
    if (wishlist.has(id)) {
      wishlist.delete(id);
      btn.classList.remove('active');
      btn.setAttribute('aria-label', 'Adicionar à lista de desejos');
      showToast('Removido da lista de desejos', 'info');
    } else {
      wishlist.add(id);
      btn.classList.add('active');
      btn.setAttribute('aria-label', 'Remover da lista de desejos');
      showToast('Adicionado à lista de desejos ♡', 'info');
    }
  });
}

function initCartButtons() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.card-add');
    if (!btn) return;
    const card = btn.closest('.product-card');
    const name = card?.querySelector('.card-name')?.textContent || 'Produto';
    cart.add({ name, id: Math.random() });
    btn.textContent = '✓';
    btn.style.background = '#22C55E';
    setTimeout(() => { btn.textContent = '+'; btn.style.background = ''; }, 1500);
  });
}

function initCategoryFilter() {
  const pills = qsa('.cat-pill');
  if (!pills.length) return;
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.dataset.cat;
      filterProducts(cat);
    });
  });
}

function filterProducts(cat) {
  const cards = qsa('.product-card[data-cat]');
  cards.forEach(card => {
    const show = cat === 'all' || card.dataset.cat === cat;
    card.style.opacity = show ? '1' : '0.3';
    card.style.pointerEvents = show ? '' : 'none';
    card.style.transform = show ? '' : 'scale(0.97)';
  });
  const count = qs('#catalog-count');
  if (count) {
    const visible = cards.filter(c => cat === 'all' || c.dataset.cat === cat).length;
    count.textContent = `${visible} produto${visible !== 1 ? 's' : ''} encontrado${visible !== 1 ? 's' : ''}`;
  }
}

function initSort() {
  const sel = qs('.sort-select');
  if (!sel) return;
  sel.addEventListener('change', () => showToast('Ordenação aplicada', 'info'));
}

function initLookModal() {
  const overlay = qs('.modal-overlay');
  const closeBtn = qs('.modal-close');
  if (!overlay) return;

  document.addEventListener('click', e => {
    const btn = e.target.closest('.look-btn');
    if (!btn) return;
    const card = btn.closest('.look-card');
    const title = card?.querySelector('.look-title')?.textContent || 'Look';
    const tags = [...card?.querySelectorAll('.look-tag') || []].map(t => t.textContent).join(', ');
    qs('#modal-title', overlay).textContent = title;
    qs('#modal-tags', overlay).textContent = tags;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const closeModal = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

function initColorSwatches() {
  qsa('.color-swatch').forEach(sw => {
    sw.addEventListener('click', () => {
      qsa('.color-swatch').forEach(s => s.classList.remove('selected'));
      sw.classList.add('selected');
    });
  });
}

function initContactForm() {
  const form = qs('#contact-form');
  if (!form) return;

  const rules = {
    name:    { minLen: 3, msg: 'Informe seu nome completo (mínimo 3 caracteres).' },
    email:   { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, msg: 'Informe um e-mail válido (ex: nome@dominio.com).' },
    subject: { minLen: 5, msg: 'Informe o assunto (mínimo 5 caracteres).' },
    message: { minLen: 20, msg: 'Sua mensagem deve ter pelo menos 20 caracteres.' }
  };

  function validateField(input) {
    const name = input.name;
    const rule = rules[name];
    const fb   = form.querySelector(`[data-for="${name}"]`);
    if (!rule || !fb) return true;

    let valid = true;
    const val = input.value.trim();

    if (!val) {
      setFieldState(input, fb, false, 'Este campo é obrigatório.');
      valid = false;
    } else if (rule.regex && !rule.regex.test(val)) {
      setFieldState(input, fb, false, rule.msg);
      valid = false;
    } else if (rule.minLen && val.length < rule.minLen) {
      setFieldState(input, fb, false, rule.msg);
      valid = false;
    } else {
      setFieldState(input, fb, true, '');
    }
    return valid;
  }

  function setFieldState(input, fb, ok, msg) {
    input.classList.toggle('error',   !ok);
    input.classList.toggle('success',  ok);
    fb.textContent = msg;
    fb.className   = `form-feedback ${ok ? 'success' : 'error'}`;
  }

  qsa('input, textarea', form).forEach(inp => {
    inp.addEventListener('blur',  () => validateField(inp));
    inp.addEventListener('input', () => { if (inp.classList.contains('error')) validateField(inp); });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const fields  = qsa('input[name], textarea[name]', form);
    const allOk   = fields.map(f => validateField(f)).every(Boolean);
    if (!allOk) { showToast('Por favor corrija os erros antes de enviar.', 'error'); return; }

    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    setTimeout(() => {
      form.querySelector('.form-success-msg').classList.add('show');
      form.reset();
      fields.forEach(f => { f.classList.remove('error','success'); });
      qsa('.form-feedback', form).forEach(fb => { fb.textContent = ''; fb.className = 'form-feedback'; });
      btn.disabled = false;
      btn.textContent = 'Enviar Mensagem';
      showToast('Mensagem enviada com sucesso!', 'success');
    }, 1200);
  });
}

function initNewsletter() {
  const form = qs('#newsletter-form');
  if (!form) return;
  const input = form.querySelector('.newsletter-input');
  const fb    = form.querySelector('.newsletter-feedback');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const val = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!val) {
      if (fb) { fb.textContent = 'Digite seu e-mail.'; fb.style.color = '#FF4444'; fb.classList.add('show'); }
      input.classList.add('error'); return;
    }
    if (!emailRegex.test(val)) {
      if (fb) { fb.textContent = 'E-mail inválido. Ex: nome@dominio.com'; fb.style.color = '#FF4444'; fb.classList.add('show'); }
      input.classList.add('error'); return;
    }

    input.classList.remove('error');
    setTimeout(() => {
      if (fb) { fb.textContent = '✓ Você está na lista! Bem-vindo(a) à VAROO.'; fb.style.color = '#22C55E'; fb.classList.add('show'); }
      input.value = '';
      showToast('Inscrição confirmada!', 'success');
    }, 800);
  });
}

function initReveal() {
  if (!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  qsa('.product-card, .look-card, .value-card, .team-card, .contact-item').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
    obs.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  setActiveNav();
  initHamburger();
  initScrollTop();
  initWishlist();
  initCartButtons();
  initCategoryFilter();
  initSort();
  initLookModal();
  initColorSwatches();
  initContactForm();
  initNewsletter();
  initReveal();
});
