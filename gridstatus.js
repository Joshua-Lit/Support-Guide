/* ============================================================
   gridstatus.js
   Polls https://status.secondlifegrid.net/api/v2/status.json
   and updates any element with id="grid-status-pill" on the page.
   ============================================================ */

(function () {
  var ENDPOINT = 'https://status.secondlifegrid.net/api/v2/status.json';

  // Map Statuspage indicators to local states.
  // Indicators per Atlassian Statuspage spec: none | minor | major | critical | maintenance
  var STATE_MAP = {
    none:        { cls: 'gsp-ok',    label: 'Grid status: all systems operational' },
    minor:       { cls: 'gsp-warn',  label: 'Grid status: minor issues — check details' },
    major:       { cls: 'gsp-major', label: 'Grid status: major outage — check now' },
    critical:    { cls: 'gsp-major', label: 'Grid status: critical outage — check now' },
    maintenance: { cls: 'gsp-warn',  label: 'Grid status: maintenance in progress' }
  };

  var FALLBACK = {
    cls: 'gsp-fallback',
    label: 'Things acting strange? Check grid status'
  };

  function applyState(pill, state) {
    if (!pill) return;
    var labelEl = pill.querySelector('.gsp-label');

    // Strip any existing gsp-* state class (but keep gsp-dot, gsp-label, gsp-url)
    pill.classList.remove('gsp-loading', 'gsp-ok', 'gsp-warn', 'gsp-major', 'gsp-fallback');
    pill.classList.add(state.cls);

    if (labelEl) labelEl.textContent = state.label;
  }

  function init() {
    var pill = document.getElementById('grid-status-pill');
    if (!pill) return;

    // Mark as loading immediately
    applyState(pill, { cls: 'gsp-loading', label: 'Checking grid status…' });

    fetch(ENDPOINT, { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) throw new Error('Bad status: ' + res.status);
        return res.json();
      })
      .then(function (data) {
        var indicator = data && data.status && data.status.indicator;
        var mapped = STATE_MAP[indicator];
        if (mapped) {
          applyState(pill, mapped);
        } else {
          applyState(pill, FALLBACK);
        }
      })
      .catch(function () {
        // Network or CORS error — fall back to static label
        applyState(pill, FALLBACK);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
