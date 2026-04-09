function toggleAllNav() {
  const btn = document.getElementById('nav-toggle-btn');
  const headers = document.querySelectorAll('.nav-group-hdr');
  const anyOpen = [...headers].some(h => h.classList.contains('open'));
  headers.forEach(hdr => {
    if (anyOpen) {
      hdr.classList.remove('open');
      hdr.nextElementSibling.classList.remove('open');
    } else {
      hdr.classList.add('open');
      hdr.nextElementSibling.classList.add('open');
    }
  });
  btn.textContent = anyOpen ? '⊟ Collapse all' : '⊞ Expand all';
}

function dismissChecklist() {
  document.getElementById('session-checklist').classList.add('hidden');
  const btn = document.getElementById('sidebar-checklist-btn');
  if (btn) btn.style.display = 'block';
  localStorage.setItem('checklist-dismissed', '1');
}
function showChecklist() {
  openChecklistModal();
}

function scrollToTop() {
  document.getElementById('main').scrollTo({top:0, behavior:'smooth'});
  window.scrollTo({top:0, behavior:'smooth'});
}

function openShortcutsModal() {
  document.getElementById('shortcuts-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeShortcutsModal() {
  document.getElementById('shortcuts-modal').classList.remove('open');
  document.body.style.overflow = '';
}
function copyShortcut(btn, text) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = 'COPIED!';
    btn.style.color = 'var(--c-teal)';
    setTimeout(() => { btn.textContent = orig; btn.style.color = ''; }, 1500);
  });
}


function openChecklistModal() {
  document.getElementById('checklist-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeChecklistModal() {
  document.getElementById('checklist-modal').classList.remove('open');
  document.body.style.overflow = '';
}
function openClaraModal() {
  const src = document.getElementById('clara-modal-content');
  const body = document.getElementById('clara-modal-body');
  if (!src || !body) return;
  body.innerHTML = src.innerHTML;
  document.getElementById('clara-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeClaraModal() {
  document.getElementById('clara-modal').classList.remove('open');
  document.body.style.overflow = '';
}
function tog(trigger) {
  const card = trigger.parentElement;
  card.classList.toggle('open');
}
function toggleNav(hdr) {
  hdr.classList.toggle('open');
  hdr.nextElementSibling.classList.toggle('open');
}
function jumpTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (el.classList.contains('faq-item') || el.classList.contains('sc-card')) {
    el.classList.add('open');
  }
}
function copyVid(btn, url) {
  navigator.clipboard.writeText(url).then(() => {
    btn.textContent = '✓ OK';
    btn.classList.add('ok');
    setTimeout(() => { btn.textContent = 'COPY'; btn.classList.remove('ok'); }, 2200);
  });
}
function clearSearch() {
  const srch   = document.getElementById('global-search');
  const cnt    = document.getElementById('search-count');
  const nr     = document.getElementById('no-results');
  const clrBtn = document.getElementById('search-clear');
  srch.value = '';
  clrBtn.style.display = 'none';
  cnt.textContent = '';
  nr.style.display = 'none';
  document.querySelectorAll('[data-search]').forEach(el => {
    el.classList.remove('hidden');
    el.querySelectorAll('.faq-q-text,.lm-name,.lm-desc,.sc-title,.clara-name,.qi-title').forEach(t => {
      if (t.dataset.orig) { t.innerHTML = t.dataset.orig; delete t.dataset.orig; }
    });
  });
  document.querySelectorAll('.section[data-section]').forEach(s => s.style.display = '');
  srch.focus();
}

function copyStep(sn) {
  const text = sn.nextElementSibling.textContent.trim();
  const orig = sn.textContent;
  navigator.clipboard.writeText(text).then(() => {
    sn.textContent = '✓';
    sn.style.color = 'var(--c-teal)';
    sn.style.borderColor = 'var(--c-teal)';
    sn.style.background = 'var(--c-teal-d)';
    setTimeout(() => {
      sn.textContent = orig;
      sn.style.color = '';
      sn.style.borderColor = '';
      sn.style.background = '';
    }, 1500);
  });
}
function copyText(btn) {
  const text = btn.previousElementSibling.textContent.trim();
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✓ OK';
    btn.classList.add('ok');
    setTimeout(() => { btn.textContent = 'COPY'; btn.classList.remove('ok'); }, 2200);
  });
}
function copyPara(el) {
  const text = el.textContent.trim();
  el.classList.add('copied');
  setTimeout(() => el.classList.remove('copied'), 1500);
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    });
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  initTheme();
  const link = document.getElementById('suggest-link');
  if (link) {
    const u = 'josh', d = 'joshualit.uk';
    link.href = 'mailto:' + u + '@' + d;
    link.title = 'Send suggestions to ' + u + '@' + d;
  }
  // Auto-scroll to element if URL hash matches
  if (window.location.hash) {
    const el = document.getElementById(window.location.hash.slice(1));
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (el.classList.contains('sc-card')) el.classList.add('open');
      }, 300);
    }
  }
  const sm = document.getElementById('shortcuts-modal');
  if (sm) {
    sm.addEventListener('click', function(e) { if (e.target === this) closeShortcutsModal(); });
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') { closeShortcutsModal(); closeClaraModal(); } });
  }
  const cm = document.getElementById('clara-modal');
  if (cm) {
    cm.addEventListener('click', function(e) { if (e.target === this) closeClaraModal(); });

  }
  const srch   = document.getElementById('global-search');
  const cnt    = document.getElementById('search-count');
  const nr     = document.getElementById('no-results');
  const clrBtn = document.getElementById('search-clear');

  function n(s) { return s.toLowerCase().replace(/[^a-z0-9 ]/g,' '); }

  function clearMarks(el) {
    el.querySelectorAll('.faq-q-text,.lm-name,.lm-desc,.sc-title,.clara-name,.qi-title').forEach(t => {
      if (t.dataset.orig) { t.innerHTML = t.dataset.orig; delete t.dataset.orig; }
    });
  }

  function addMarks(el, terms) {
    el.querySelectorAll('.faq-q-text,.lm-name,.lm-desc,.sc-title,.clara-name,.qi-title').forEach(t => {
      if (!t.dataset.orig) t.dataset.orig = t.innerHTML;
      let h = t.dataset.orig;
      terms.forEach(term => {
        const re = new RegExp('(' + term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + ')','gi');
        h = h.replace(re,'<mark>$1</mark>');
      });
      t.innerHTML = h;
    });
  }

  function doSearch(raw) {
    const q     = n(raw);
    const cards = document.querySelectorAll('[data-search]');
    let hits = 0;
    cards.forEach(el => { el.classList.remove('hidden'); clearMarks(el); });

    if (!q.trim()) {
      cnt.textContent = '';
      nr.style.display = 'none';
      document.querySelectorAll('.section[data-section]').forEach(s => s.style.display = '');
      return;
    }

    const terms = q.trim().split(/\s+/).filter(Boolean);
    cards.forEach(el => {
      const hay = n(el.dataset.search + ' ' + el.textContent);
      if (terms.every(t => hay.includes(t))) { hits++; addMarks(el, terms); }
      else el.classList.add('hidden');
    });

    document.querySelectorAll('.section[data-section]').forEach(sec => {
      sec.style.display = sec.querySelectorAll('[data-search]:not(.hidden)').length ? '' : 'none';
    });

    cnt.textContent = hits > 0 ? hits + ' result' + (hits !== 1 ? 's' : '') : '';
    nr.style.display = hits === 0 ? 'block' : 'none';
  }

  srch.addEventListener('input', () => {
    clrBtn.style.display = srch.value ? 'block' : 'none';
    doSearch(srch.value);
  });

  clrBtn.addEventListener('click', () => {
    srch.value = '';
    clrBtn.style.display = 'none';
    doSearch('');
  });
});


// ══ TECHNICAL PAGE FUNCTIONS ══

function toggleSidebarNav() {
  const nav = document.getElementById('sidebar-nav');
  const btn = document.getElementById('sidebar-nav-toggle');
  if (!nav || !btn) return;
  nav.classList.toggle('mobile-open');
  btn.classList.toggle('open');
}

function openModal(id, title) {
  const src = document.getElementById('fc-content-' + id);
  if (!src) return;
  document.getElementById('fc-modal-title').textContent = title;
  document.getElementById('fc-modal-body').innerHTML = src.innerHTML;
  document.getElementById('fc-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('fc-modal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}


// ══ TECHNICAL PAGE INIT ══
document.addEventListener('DOMContentLoaded', function() {
  // Suggest link obfuscation (runs on both pages, harmless if element absent)
  const link = document.getElementById('suggest-link');
  if (link && !link.href.includes('@')) {
    const u = 'josh', d = 'joshualit.uk';
    link.href = 'mailto:' + u + '@' + d;
    link.title = 'Send suggestions to ' + u + '@' + d;
  }

  // Hash-based flowchart modal auto-open (technical page only)
  if (document.getElementById('fc-modal')) {
    const hash = window.location.hash;
    if (hash === '#fc-avatar-appearance') openModal('avatar-appearance', 'Naked / Missing Body Parts or Clothing');
    else if (hash === '#fc-bake-fail') openModal('bake-fail', 'Bake Fail / Cloud / Grey Avatar');
    else if (hash === '#fc-tp-fail') openModal('tp-fail', 'Teleport Failure');
    else if (hash === '#fc-inventory-loss') openModal('inventory-loss', 'Missing Inventory Items');

    // Click outside modal to close
    document.getElementById('fc-modal').addEventListener('click', function(e) {
      if (e.target === this) closeModal();
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  // Technical page search (tech-search / tech-clear / qa-count)
  const techSrch = document.getElementById('tech-search');
  const techClr  = document.getElementById('tech-clear');
  const techCnt  = document.getElementById('qa-count');
  if (techSrch) {
    function n(s) { return s.toLowerCase().replace(/[^a-z0-9 ]/g,' '); }

    function doTechSearch(raw) {
      const q = n(raw);
      const cards = document.querySelectorAll('.qa-card');
      let hits = 0;
      cards.forEach(el => el.classList.remove('hidden'));
      if (!q.trim()) { if (techCnt) techCnt.textContent = ''; return; }
      const terms = q.trim().split(/\s+/).filter(Boolean);
      cards.forEach(el => {
        const hay = n(el.dataset.search + ' ' + el.textContent);
        if (terms.every(t => hay.includes(t))) hits++;
        else el.classList.add('hidden');
      });
      if (techCnt) techCnt.textContent = hits + ' result' + (hits !== 1 ? 's' : '');
    }

    techSrch.addEventListener('input', () => {
      techClr.style.display = techSrch.value ? 'block' : 'none';
      doTechSearch(techSrch.value);
    });
    techClr.addEventListener('click', () => {
      techSrch.value = '';
      techClr.style.display = 'none';
      doTechSearch('');
    });
    // (qa-count text left as-is from HTML on load)
  }
});



// ══ UNIFIED SIDEBAR NAV INIT ══
// Detects current page, sets active state, wires cross-page nav links
function initUnifiedSidebar(currentPage) {
  // Set active page-nav tab
  const homeLink = document.getElementById('pnav-home');
  const techLink = document.getElementById('pnav-tech');
  if (currentPage === 'index') {
    homeLink && homeLink.classList.add('active');
    document.getElementById('sidebar-search-home') && (document.getElementById('sidebar-search-home').style.display = '');
    document.getElementById('sidebar-search-tech') && (document.getElementById('sidebar-search-tech').style.display = 'none');
    document.getElementById('sidebar-page-sub') && (document.getElementById('sidebar-page-sub').textContent = 'Resident Support Reference');
  } else {
    techLink && techLink.classList.add('active');
    document.getElementById('sidebar-search-home') && (document.getElementById('sidebar-search-home').style.display = 'none');
    document.getElementById('sidebar-search-tech') && (document.getElementById('sidebar-search-tech').style.display = '');
    document.getElementById('sidebar-page-sub') && (document.getElementById('sidebar-page-sub').textContent = 'Technical Reference');
    // On tech page, hide the checklist button and expand/collapse toggle
    const cb = document.getElementById('sidebar-checklist-btn');
    if (cb) cb.style.display = 'none';
    const tb = document.getElementById('nav-toggle-btn');
    if (tb) tb.parentElement.style.display = 'none';
  }

  // Wire nav items: same-page = jumpTo(), other-page = navigate
  document.querySelectorAll('.nav-item[data-page]').forEach(el => {
    const targetPage = el.dataset.page;
    const targetId   = el.dataset.target;
    if (!targetId) return;

    if (targetPage === currentPage) {
      // Same page — scroll to section
      el.style.cursor = 'pointer';
      el.onclick = function() { jumpTo(targetId); };
    } else {
      // Other page — navigate with hash
      const href = (targetPage === 'index' ? 'index.html' : 'technical.html') + '#' + targetId;
      el.style.cursor = 'pointer';
      el.onclick = function() { window.location.href = href; };
      // Visual hint — slightly dimmer until hovered
      el.classList.add('nav-item--xpage');
    }
  });

  // Highlight the current page's nav groups with a subtle active accent on the header
  const currentGroups = document.querySelectorAll(
    currentPage === 'index'
      ? '.nav-group:not(:has([data-page="tech"]))'
      : '.nav-group:has([data-page="tech"])'
  );
  // (CSS :has() may not be available everywhere — use JS fallback)
  document.querySelectorAll('.nav-group').forEach(group => {
    const hasCurrentPage = group.querySelector('[data-page="' + currentPage + '"]');
    const hasOtherPage   = group.querySelector('[data-page="' + (currentPage === 'index' ? 'tech' : 'index') + '"]');
    if (hasOtherPage && !hasCurrentPage) {
      group.classList.add('nav-group--other');
    }
  });
}


// ══ THEME SWITCHER ══
function initTheme() {
  const saved = localStorage.getItem('sl-mentor-theme');
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }
  updateThemeButton();
}

function toggleTheme() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  if (isLight) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('sl-mentor-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('sl-mentor-theme', 'light');
  }
  updateThemeButton();
}

function updateThemeButton() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.textContent = isLight ? '◑ Dark' : '◐ Light';
    btn.title = isLight ? 'Switch to dark theme' : 'Switch to light theme';
  });
}



// ══ THEME SWITCHER ══
function initTheme() {
  const saved = localStorage.getItem('sl-mentor-theme');
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }
  updateThemeToggle();
}
function toggleTheme() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  if (isLight) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('sl-mentor-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('sl-mentor-theme', 'light');
  }
  updateThemeToggle();
}
function updateThemeToggle() {
  // CSS handles visual state via [data-theme="light"] selectors — no JS needed
}
