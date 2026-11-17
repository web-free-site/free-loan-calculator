/** Adsterra placement loader (isolated banner iframes). Pattern aligned with web-free.site tools. */
(function () {
  'use strict';
  const BLOCKED_FETCH_HOSTS = ['bauval.org', 'abscloud.org', 'araplhn.org'];
  let cfgPromise;

  function loadConfig() {
    if (!cfgPromise) {
      cfgPromise = fetch('/ads.json')
        .then((r) => r.json())
        .catch(() => ({ enabled: false }));
    }
    return cfgPromise;
  }

  function bannerSrcDoc(key, width, height, scriptBase) {
    const atOptions = JSON.stringify({
      key,
      format: 'iframe',
      height,
      width,
      params: {},
    });
    const src = `${scriptBase.replace(/\/$/, '')}/${key}`;
    return (
      '<!DOCTYPE html><html><head><meta charset="utf-8">' +
      '<meta name="referrer" content="no-referrer-when-downgrade"></head>' +
      '<body style="margin:0;padding:0;overflow:hidden;background:transparent">' +
      `<script type="text/javascript">var atOptions = ${atOptions};<\/script>` +
      `<script type="text/javascript" src="${src}"><\/script></body></html>`
    );
  }

  function injectScript(src, marker, parent) {
    if (!src || document.querySelector(`script[data-ad="${marker}"]`)) return;
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.setAttribute('data-cfasync', 'false');
    s.setAttribute('data-ad', marker);
    parent.appendChild(s);
  }

  function mountBanner(slot, def, scriptBase) {
    const host = document.querySelector(`[data-ad-slot="${slot}"]`);
    if (!host || !def) return;
    const iframe = document.createElement('iframe');
    iframe.title = `Advertisement ${slot}`;
    iframe.width = def.width;
    iframe.height = def.height;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.setAttribute(
      'sandbox',
      'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms',
    );
    iframe.style.cssText = 'border:0;max-width:100%;display:block;margin:0 auto;overflow:hidden';
    iframe.srcdoc = bannerSrcDoc(def.key, def.width, def.height, scriptBase);
    host.appendChild(iframe);
  }

  function mountNative(native) {
    if (!native?.src || !native.containerId) return;
    const host = document.querySelector('[data-ad-slot="nativeMid"]');
    if (!host) return;
    const box = document.createElement('div');
    box.id = native.containerId;
    box.className = 'ad-native-host';
    host.appendChild(box);
    injectScript(native.src, `native-${native.containerId}`, document.body);
  }

  function mountSmartlink(smart) {
    if (!smart?.url) return;
    document.querySelectorAll('[data-smartlink]').forEach((el) => {
      const a = document.createElement('a');
      a.href = smart.url;
      a.target = '_blank';
      a.rel = 'sponsored noopener noreferrer';
      a.textContent = smart.label || 'Sponsored';
      el.appendChild(a);
    });
  }

  window.FreeLoanAds = {
    blockedHosts: BLOCKED_FETCH_HOSTS,
    init() {
      loadConfig().then((cfg) => {
        if (!cfg.enabled) return;
        const base = cfg.bannerScriptBase || 'https://bauval.org/22';
        if (cfg.popunder) injectScript(cfg.popunder, 'popunder', document.head);
        if (cfg.socialBar) injectScript(cfg.socialBar, 'social-bar', document.body);
        const slots = cfg.slots || {};
        const banners = cfg.banners || {};
        Object.keys(slots).forEach((slot) => {
          const id = slots[slot];
          if (id === 'nativeBanner') return;
          const def = banners[id];
          if (def) mountBanner(slot, def, base);
        });
        mountNative(cfg.nativeBanner);
        mountSmartlink(cfg.smartlink);
      });
    },
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.FreeLoanAds.init());
  } else {
    window.FreeLoanAds.init();
  }
})();