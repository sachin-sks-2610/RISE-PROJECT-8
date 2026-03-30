/* ============================================================
   SERVEASE - Service Marketplace Platform
   Main JavaScript File
   ============================================================ */

'use strict';

// ============================================================
// DATA STORE
// ============================================================
const SERVICES = [
  { id: 1, title: 'Home Deep Cleaning', category: 'cleaning', price: 49, unit: 'session', rating: 4.9, reviews: 312, description: 'Professional deep cleaning of your entire home including all rooms, bathrooms, and kitchen. Our trained staff uses eco-friendly products.', icon: '🧹', badge: 'popular', color: '#EEF2FF', tags: ['Home', 'Cleaning'] },
  { id: 2, title: 'Plumbing Repair', category: 'plumbing', price: 69, unit: 'visit', rating: 4.7, reviews: 198, description: 'Expert plumbing solutions: pipe repairs, leak fixing, drain unclogging, faucet installation, and more.', icon: '🔧', badge: null, color: '#EFF6FF', tags: ['Home', 'Repair'] },
  { id: 3, title: 'Electrical Services', category: 'electrical', price: 79, unit: 'visit', rating: 4.8, reviews: 241, description: 'Licensed electricians for wiring, installations, switches, sockets, circuit breakers, and safety inspections.', icon: '⚡', badge: 'new', color: '#FFFBEB', tags: ['Home', 'Safety'] },
  { id: 4, title: 'Car Repair & Servicing', category: 'auto', price: 99, unit: 'session', rating: 4.6, reviews: 175, description: 'Full car servicing: oil change, brake check, tyre rotation, battery replacement, and engine diagnostics.', icon: '🚗', badge: null, color: '#F0FDF4', tags: ['Auto', 'Repair'] },
  { id: 5, title: 'AC Service & Repair', category: 'appliance', price: 59, unit: 'unit', rating: 4.8, reviews: 289, description: 'AC cleaning, gas refill, servicing, and repairs. All brands covered. Same-day service available.', icon: '❄️', badge: 'popular', color: '#EFF6FF', tags: ['Home', 'Appliance'] },
  { id: 6, title: 'Beauty & Spa at Home', category: 'beauty', price: 39, unit: 'session', rating: 4.9, reviews: 401, description: 'Salon experience at your doorstep: facials, waxing, manicure, pedicure, hair styling, and makeup.', icon: '💅', badge: 'popular', color: '#FDF4FF', tags: ['Beauty', 'Wellness'] },
  { id: 7, title: 'Pest Control', category: 'cleaning', price: 89, unit: 'session', rating: 4.7, reviews: 156, description: 'Safe and effective pest control for cockroaches, ants, termites, mosquitoes, and bedbugs.', icon: '🐛', badge: null, color: '#F0FDF4', tags: ['Home', 'Cleaning'] },
  { id: 8, title: 'Painting Services', category: 'painting', price: 129, unit: 'day', rating: 4.6, reviews: 132, description: 'Interior and exterior painting with premium paints. Get a fresh coat with zero mess guaranteed.', icon: '🎨', badge: null, color: '#FFF7ED', tags: ['Home', 'Decoration'] },
  { id: 9, title: 'Furniture Assembly', category: 'installation', price: 44, unit: 'session', rating: 4.7, reviews: 210, description: 'Professional assembly of IKEA and flat-pack furniture. Quick, careful, and clutter-free setup.', icon: '🪑', badge: null, color: '#EEF2FF', tags: ['Home', 'Setup'] },
  { id: 10, title: 'Massage Therapy', category: 'beauty', price: 55, unit: 'hour', rating: 4.9, reviews: 367, description: 'Relaxing Swedish, deep tissue, and therapeutic massages from certified therapists at home.', icon: '💆', badge: 'popular', color: '#FDF4FF', tags: ['Beauty', 'Wellness'] },
  { id: 11, title: 'Appliance Repair', category: 'appliance', price: 50, unit: 'visit', rating: 4.5, reviews: 144, description: 'Repair of washing machines, refrigerators, microwaves, dishwashers, and other home appliances.', icon: '🔌', badge: null, color: '#FFF1F2', tags: ['Home', 'Repair'] },
  { id: 12, title: 'Garden & Lawn Care', category: 'gardening', price: 35, unit: 'session', rating: 4.6, reviews: 98, description: 'Lawn mowing, trimming, hedge cutting, planting, and full garden maintenance packages.', icon: '🌿', badge: 'new', color: '#F0FDF4', tags: ['Garden', 'Outdoor'] },
];

const BOOKINGS = [
  { id: 'SE-1001', service: 'Home Deep Cleaning', icon: '🧹', date: '2026-03-15', time: '10:00 AM', address: '42 Oak Street, Apt 3B', status: 'upcoming', price: 49, provider: 'CleanPro Team' },
  { id: 'SE-1002', service: 'AC Service & Repair', icon: '❄️', date: '2026-03-22', time: '02:00 PM', address: '42 Oak Street, Apt 3B', status: 'upcoming', price: 59, provider: 'CoolFix Services' },
  { id: 'SE-1003', service: 'Plumbing Repair', icon: '🔧', date: '2026-02-28', time: '11:00 AM', address: '42 Oak Street, Apt 3B', status: 'completed', price: 69, provider: 'PlumbRight Co.' },
  { id: 'SE-1004', service: 'Beauty & Spa at Home', icon: '💅', date: '2026-02-14', time: '03:00 PM', address: '42 Oak Street, Apt 3B', status: 'completed', price: 39, provider: 'GlowUp Studio' },
  { id: 'SE-1005', service: 'Electrical Services', icon: '⚡', date: '2026-02-05', time: '09:00 AM', address: '42 Oak Street, Apt 3B', status: 'cancelled', price: 79, provider: 'ElectroPro' },
];

let searchQuery = '';
let activeCategory = 'all';

// ============================================================
// PAGE LOADER
// ============================================================
function initLoader() {
  const loader = document.getElementById('page-loader');
  const fill   = document.getElementById('loader-fill');
  if (!loader) return;

  // Animate progress bar: fast to 80%, then wait for load to finish
  let progress = 0;
  const speeds = [30, 18, 8]; // fast → medium → slow
  const targets = [40, 75, 88];
  let phase = 0;

  function advanceBar() {
    if (progress >= targets[phase]) {
      phase++;
      if (phase >= targets.length) return;
    }
    progress = Math.min(progress + (phase === 0 ? 3 : phase === 1 ? 1.5 : 0.4), targets[phase]);
    if (fill) fill.style.width = progress + '%';
    setTimeout(advanceBar, speeds[phase] || 40);
  }
  advanceBar();

  function finishLoader() {
    // Fill to 100% then fade out
    if (fill) fill.style.width = '100%';
    setTimeout(() => loader.classList.add('hidden'), 380);
  }

  window.addEventListener('load', () => setTimeout(finishLoader, 250));
  // Hard fallback
  setTimeout(finishLoader, 3000);
}

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================
function showToast(msg, type = 'info', duration = 4000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.info}</span>
    <span class="toast-msg">${msg}</span>
    <span class="toast-close" onclick="dismissToast(this.parentElement)">✕</span>
  `;
  container.appendChild(toast);
  const timer = setTimeout(() => dismissToast(toast), duration);
  toast._timer = timer;
}

function dismissToast(toast) {
  if (!toast || !toast.parentElement) return;
  clearTimeout(toast._timer);
  toast.classList.add('leaving');
  setTimeout(() => toast.remove(), 300);
}

// ============================================================
// NAVBAR
// ============================================================
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
  }

  // Active link highlight
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ============================================================
// SCROLL ANIMATIONS
// ============================================================
function initScrollAnimations() {
  // --- Legacy fade-in observer ---
  const fadeObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => fadeObs.observe(el));

  // --- New reveal observer ---
  const revealSel = '.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-flip, .reveal-highlight';
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-revealed');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll(revealSel).forEach(el => revealObs.observe(el));

  // --- Auto-stagger containers ---
  const staggerObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      [...e.target.children].forEach((child, i) => {
        child.style.transitionDelay = `${i * 0.1}s`;
        setTimeout(() => child.classList.add('is-revealed'), i * 80);
      });
      staggerObs.unobserve(e.target);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('[data-stagger]').forEach(el => staggerObs.observe(el));
}

// ============================================================
// ANIMATED COUNTERS
// ============================================================
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString() + suffix;
  }, 16);
}

function initCounters() {
  const counterEls = document.querySelectorAll('.counter-number[data-target]');
  if (!counterEls.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counterEls.forEach(el => observer.observe(el));
}

// ============================================================
// SERVICES PAGE - FILTER & SEARCH
// ============================================================
function initServicesPage() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;

  renderServices(SERVICES);

  // Category filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.cat;
      applyFilters();
    });
  });

  // Search input
  const searchInput = document.getElementById('service-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }
}

function applyFilters() {
  let filtered = SERVICES;
  if (activeCategory !== 'all') {
    filtered = filtered.filter(s => s.category === activeCategory);
  }
  if (searchQuery) {
    filtered = filtered.filter(s =>
      s.title.toLowerCase().includes(searchQuery) ||
      s.description.toLowerCase().includes(searchQuery) ||
      s.tags.some(t => t.toLowerCase().includes(searchQuery))
    );
  }
  renderServices(filtered);
}

function renderServices(services) {
  const grid = document.getElementById('services-grid');
  const count = document.getElementById('results-count');
  if (!grid) return;
  if (count) count.textContent = `${services.length} service${services.length !== 1 ? 's' : ''} found`;

  if (!services.length) {
    grid.innerHTML = `
      <div class="no-results" style="grid-column:1/-1">
        <div class="no-results-icon">🔍</div>
        <h3>No services found</h3>
        <p>Try adjusting your search or category filter.</p>
      </div>`;
    return;
  }

  grid.innerHTML = services.map(s => `
    <div class="service-card fade-in" onclick="goToDetail(${s.id})" style="cursor:pointer">
      <div class="service-card-img" style="background:${s.color}">
        <div class="img-placeholder">${s.icon}</div>
        ${s.badge ? `<span class="service-card-badge ${s.badge === 'popular' ? 'popular' : ''}">${s.badge === 'popular' ? '🔥 Popular' : s.badge === 'new' ? '✨ New' : s.badge}</span>` : ''}
      </div>
      <div class="service-card-body">
        <div class="service-card-cat">${s.category.toUpperCase()}</div>
        <h3 class="service-card-title">${s.title}</h3>
        <p class="service-card-desc">${s.description}</p>
        <div class="service-card-footer">
          <div class="service-price">
            <strong>$${s.price}</strong>
            <span>per ${s.unit}</span>
          </div>
          <div class="service-rating">
            <span class="star">★</span>
            ${s.rating} (${s.reviews})
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Re-observe newly added elements
  setTimeout(() => initScrollAnimations(), 50);
}

function goToDetail(id) {
  window.location.href = `service-details.html?id=${id}`;
}

// ============================================================
// SERVICE DETAILS PAGE
// ============================================================
function initServiceDetailPage() {
  const container = document.getElementById('service-detail-container');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);
  const service = SERVICES.find(s => s.id === id) || SERVICES[0];

  // Update title and breadcrumb
  const titleEl = document.getElementById('detail-service-title');
  const breadTitle = document.getElementById('breadcrumb-title');
  if (titleEl) titleEl.textContent = service.title;
  if (breadTitle) breadTitle.textContent = service.title;

  // Gallery
  const mainImg = document.getElementById('gallery-main-img');
  if (mainImg) mainImg.textContent = service.icon;

  // Populate detail content
  const detailContent = document.getElementById('detail-dynamic');
  if (detailContent) {
    detailContent.innerHTML = `
      <div class="service-meta">
        <span class="meta-badge"><span class="icon">📁</span>${service.category.toUpperCase()}</span>
        <span class="meta-badge"><span class="icon">★</span>${service.rating} (${service.reviews} reviews)</span>
        <span class="meta-badge"><span class="icon">💰</span>From $${service.price}/${service.unit}</span>
      </div>
      <p style="color:var(--text-secondary);line-height:1.75;margin-bottom:16px;">${service.description}</p>
      <p style="color:var(--text-secondary);line-height:1.75;margin-bottom:16px;">Our certified professionals bring industry-grade equipment and use eco-friendly solutions. Every booking includes a satisfaction guarantee — if you're not happy, we'll return at no extra charge.</p>
    `;
  }

  // Widget
  const widgetPrice = document.getElementById('widget-price');
  const widgetUnit = document.getElementById('widget-unit');
  if (widgetPrice) widgetPrice.textContent = `$${service.price}`;
  if (widgetUnit) widgetUnit.textContent = `/ per ${service.unit}`;

  // Book button
  document.querySelectorAll('.btn-book-service').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.href = `booking.html?id=${service.id}&service=${encodeURIComponent(service.title)}`;
    });
  });

  // Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab)?.classList.add('active');
    });
  });

  // Thumbs
  document.querySelectorAll('.gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', (e) => {
      document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
      e.currentTarget.classList.add('active');
    });
  });
}

// ============================================================
// BOOKING FORM
// ============================================================
function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  // Pre-fill service from query params
  const params = new URLSearchParams(window.location.search);
  const serviceParam = params.get('service');
  const serviceSelect = document.getElementById('booking-service');
  if (serviceSelect && serviceParam) {
    for (let opt of serviceSelect.options) {
      if (opt.value.toLowerCase().includes(serviceParam.toLowerCase().split(' ')[0].toLowerCase())) {
        opt.selected = true;
        break;
      }
    }
  }

  // Set min date to today
  const dateInput = document.getElementById('booking-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  form.addEventListener('submit', handleBookingSubmit);

  // Real-time validation
  form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) validateField(input);
    });
  });
}

function validateField(input) {
  const id = input.id;
  let error = '';
  const val = input.value.trim();

  if (input.required && !val) {
    error = 'This field is required.';
  } else if (id === 'booking-email' && val) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) error = 'Enter a valid email address.';
  } else if (id === 'booking-phone' && val) {
    if (!/^\+?[\d\s\-()]{7,15}$/.test(val)) error = 'Enter a valid phone number.';
  } else if (id === 'booking-date' && val) {
    const selected = new Date(val);
    const today = new Date();
    today.setHours(0,0,0,0);
    if (selected < today) error = 'Date cannot be in the past.';
  } else if (id === 'booking-name' && val) {
    if (val.length < 2) error = 'Name must be at least 2 characters.';
  }

  setFieldError(input, error);
  return !error;
}

function setFieldError(input, errorMsg) {
  const errorEl = document.getElementById(`${input.id}-error`);
  input.classList.toggle('error', !!errorMsg);
  input.classList.toggle('success', !errorMsg && input.value.trim() !== '');
  if (errorEl) {
    errorEl.textContent = errorMsg ? `⚠ ${errorMsg}` : '';
  }
}

function handleBookingSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const inputs = form.querySelectorAll('.form-input[required], .form-select[required], .form-textarea[required]');
  let allValid = true;

  inputs.forEach(input => {
    if (!validateField(input)) allValid = false;
  });

  if (!allValid) {
    showToast('Please fix the errors before submitting.', 'error');
    const firstError = form.querySelector('.form-input.error, .form-select.error');
    if (firstError) firstError.focus();
    return;
  }

  // Build booking details
  const name = document.getElementById('booking-name')?.value.trim();
  const service = document.getElementById('booking-service')?.value;
  const date = document.getElementById('booking-date')?.value;
  const time = document.getElementById('booking-time')?.value;

  const bookingId = 'SE-' + (1000 + Math.floor(Math.random() * 9000));
  showBookingModal({ name, service, date, time, id: bookingId });
}

function showBookingModal(details) {
  const modal = document.getElementById('booking-modal');
  if (!modal) return;
  document.getElementById('modal-booking-id').textContent = details.id;
  document.getElementById('modal-service-name').textContent = details.service;
  document.getElementById('modal-booking-date').textContent = details.date ? new Date(details.date + 'T00:00:00').toLocaleDateString('en-US', {weekday:'long', year:'numeric', month:'long', day:'numeric'}) : '—';
  document.getElementById('modal-booking-time').textContent = details.time || '—';
  document.getElementById('modal-booking-name').textContent = details.name;
  modal.classList.add('open');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('open');
}

// ============================================================
// DASHBOARD
// ============================================================
function initDashboard() {
  if (!document.getElementById('dashboard-upcoming')) return;

  renderUpcomingBookings();
  renderBookingsTable();
  initSidebarNav();
}

function renderUpcomingBookings() {
  const container = document.getElementById('dashboard-upcoming');
  if (!container) return;
  const upcoming = BOOKINGS.filter(b => b.status === 'upcoming');

  container.innerHTML = upcoming.map(b => `
    <div class="upcoming-card fade-in">
      <div class="upcoming-card-header">
        <div class="service-icon-sm bg-purple-soft">${b.icon}</div>
        <span class="status-badge ${b.status}">${b.status}</span>
      </div>
      <div class="upcoming-title">${b.service}</div>
      <div class="upcoming-meta">
        <div class="upcoming-meta-item"><span class="icon">📅</span> ${new Date(b.date + 'T00:00:00').toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'})}</div>
        <div class="upcoming-meta-item"><span class="icon">⏰</span> ${b.time}</div>
        <div class="upcoming-meta-item"><span class="icon">📍</span> ${b.address}</div>
        <div class="upcoming-meta-item"><span class="icon">👤</span> ${b.provider}</div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn btn-ghost btn-sm" onclick="showToast('Reschedule feature coming soon!','info')">Reschedule</button>
        <button class="btn btn-danger btn-sm" onclick="cancelBooking('${b.id}',this)">Cancel</button>
      </div>
    </div>
  `).join('');
  setTimeout(() => initScrollAnimations(), 50);
}

function cancelBooking(id, btn) {
  if (!confirm(`Cancel booking ${id}?`)) return;
  const card = btn.closest('.upcoming-card');
  card.style.opacity = '0.5';
  card.style.pointerEvents = 'none';
  showToast(`Booking ${id} has been cancelled.`, 'warning');
  setTimeout(() => {
    card.remove();
    const container = document.getElementById('dashboard-upcoming');
    if (container && !container.children.length) {
      container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:32px 0;">No upcoming bookings.</p>';
    }
  }, 1200);
}

function renderBookingsTable() {
  const tbody = document.getElementById('bookings-tbody');
  if (!tbody) return;

  tbody.innerHTML = BOOKINGS.map(b => `
    <tr>
      <td><strong>${b.id}</strong></td>
      <td>${b.icon} ${b.service}</td>
      <td>${new Date(b.date + 'T00:00:00').toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'})}</td>
      <td>${b.time}</td>
      <td><span class="status-badge ${b.status}">${capitalize(b.status)}</span></td>
      <td><strong>$${b.price}</strong></td>
      <td>
        ${b.status === 'upcoming' ? `<button class="btn btn-danger btn-sm" onclick="cancelBooking('${b.id}',this)">Cancel</button>` : ''}
        ${b.status === 'completed' ? `<button class="btn btn-ghost btn-sm" onclick="showToast('Review submitted!','success')">Review</button>` : ''}
        ${b.status === 'cancelled' ? '<span style="color:var(--text-muted);font-size:0.8rem;">—</span>' : ''}
      </td>
    </tr>
  `).join('');
}

function initSidebarNav() {
  document.querySelectorAll('.sidebar-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.sidebar-nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const panel = item.dataset.panel;
      document.querySelectorAll('.dash-panel').forEach(p => {
        p.style.display = (p.id === panel || !panel) ? 'block' : 'none';
      });
      if (panel === 'panel-bookings' || panel === 'panel-history') {
        document.querySelectorAll('.dash-panel').forEach(p => { p.style.display = 'none'; });
        document.getElementById(panel).style.display = 'block';
      }
    });
  });
}

// ============================================================
// CONTACT FORM
// ============================================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '⏳ Sending...';
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = 'Send Message';
      form.reset();
      showToast('Your message has been sent! We\'ll get back to you within 24 hours.', 'success');
    }, 1500);
  });
}

// ============================================================
// FAQ ACCORDION
// ============================================================
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = '0';
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

// ============================================================
// HOME PAGE - POPULATE POPULAR SERVICES
// ============================================================
function initHomePage() {
  const popularGrid = document.getElementById('popular-services-grid');
  if (!popularGrid) return;

  const popular = SERVICES.filter(s => s.badge === 'popular').slice(0, 6);
  popularGrid.innerHTML = popular.map(s => `
    <div class="service-card fade-in delay-${popular.indexOf(s) % 4 + 1}" onclick="window.location.href='service-details.html?id=${s.id}'" style="cursor:pointer">
      <div class="service-card-img" style="background:${s.color}">
        <div class="img-placeholder">${s.icon}</div>
        <span class="service-card-badge popular">🔥 Popular</span>
      </div>
      <div class="service-card-body">
        <div class="service-card-cat">${s.category.toUpperCase()}</div>
        <h3 class="service-card-title">${s.title}</h3>
        <p class="service-card-desc">${s.description}</p>
        <div class="service-card-footer">
          <div class="service-price">
            <strong>$${s.price}</strong>
            <span>per ${s.unit}</span>
          </div>
          <div class="service-rating">
            <span class="star">★</span>
            ${s.rating} (${s.reviews})
          </div>
        </div>
      </div>
    </div>
  `).join('');
  setTimeout(() => initScrollAnimations(), 60);
}

// ============================================================
// LOGIN MODAL
// ============================================================
function initLoginModal() {
  const loginBtn = document.querySelector('.btn-nav-login');
  const mobileLoginBtn = document.querySelector('.mobile-login-btn');
  const modal = document.getElementById('login-modal');
  if (!modal) return;

  [loginBtn, mobileLoginBtn].forEach(btn => {
    if (btn) btn.addEventListener('click', () => modal.classList.add('open'));
  });

  const form = document.getElementById('login-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      modal.classList.remove('open');
      showToast('Welcome back! You are now logged in.', 'success');
    });
  }
}

// ============================================================
// PROFILE FORM
// ============================================================
function initProfileForm() {
  const form = document.getElementById('profile-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Profile updated successfully!', 'success');
  });
}

// ============================================================
// UTILITY
// ============================================================
function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  initScrollAnimations();
  initCounters();
  initHomePage();
  initServicesPage();
  initServiceDetailPage();
  initBookingForm();
  initDashboard();
  initContactForm();
  initFAQ();
  initLoginModal();
  initProfileForm();
});
