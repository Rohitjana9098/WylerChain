/*!
 * WylerChain — Social Login overlay for the local static /app mirror.
 *
 * Adds Google / Telegram / X social login options to the dashboard's
 * "Connect Wallet" button of the mirrored production build (app/index.html).
 *
 * Design constraints:
 *  - Fully ADDITIVE: the mirrored bundle and its chunks are never modified.
 *    Everything is injected at runtime from this single file.
 *  - Social-first UX: Connect Wallet opens a social modal (Google/Telegram/X);
 *    "Use a Crypto Wallet" re-dispatches the original click so the native
 *    wallet modal (MetaMask etc.) still opens untouched.
 *  - The "login" is a local demo mock: no real OAuth is performed. The session
 *    is persisted in localStorage and rendered as an identity chip in the
 *    header (same place the production build shows the connected address).
 *  - A MutationObserver re-applies the chip whenever React re-renders the
 *    header back to "Connect Wallet".
 */
(function () {
  "use strict";
  if (window.__WYLER_SOCIAL_LOGIN__) return;
  window.__WYLER_SOCIAL_LOGIN__ = true;

  /* ------------------------------------------------------------------ *
   * Config                                                              *
   * ------------------------------------------------------------------ */
  var SESSION_KEY = "wyler_social_session";
  var PASSTHROUGH = false; // lets exactly one click reach the native modal

  var PROVIDERS = {
    google:   { name: "Google",   user: "alex.morales@gmail.com" },
    telegram: { name: "Telegram", user: "@alex_morales" },
    x:        { name: "X",        user: "@alexmorales" }
  };

  /* Brand icons (same artwork as the landing page / Login module)       */
  var ICONS = {
    google:
      '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">' +
      '<path fill="#4285F4" d="M21.35 12.23c0-.71-.06-1.4-.18-2.06H12v3.9h5.24a4.48 4.48 0 0 1-1.94 2.94v2.44h3.14c1.84-1.7 2.91-4.2 2.91-7.22Z"/>' +
      '<path fill="#34A853" d="M12 21.7c2.63 0 4.84-.87 6.45-2.35l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.74 9.74 0 0 0 12 21.7Z"/>' +
      '<path fill="#FBBC05" d="M6.54 13.8a5.85 5.85 0 0 1 0-3.6V7.68H3.3a9.74 9.74 0 0 0 0 8.64l3.24-2.52Z"/>' +
      '<path fill="#EA4335" d="M12 6.17c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.27 14.63 2.3 12 2.3a9.74 9.74 0 0 0-8.7 5.38l3.24 2.52C7.31 7.89 9.46 6.17 12 6.17Z"/>' +
      "</svg>",
    telegram:
      '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">' +
      '<path fill="#2AABEE" d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>' +
      "</svg>",
    x:
      '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">' +
      '<path fill="#ffffff" d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.36l7.24-8.28L2.8 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.85h1.73L8.28 4.05H6.42L17.8 19.85Z"/>' +
      "</svg>"
  };

  /* OKX Wallet logo (user-provided PNG served from /logos/okx-icon.png) */
  var OKX_ICON =
    '<img src="/logos/okx-icon.png?v=1" alt="OKX" style="width:18px;height:18px;object-fit:contain;border-radius:4px" aria-hidden="true">';

  /* Phantom Wallet logo (user-provided PNG served from /logos/phantom-icon.png) */
  var PHANTOM_ICON =
    '<img src="/logos/phantom-icon.png?v=1" alt="Phantom" style="width:18px;height:18px;object-fit:contain;border-radius:4px" aria-hidden="true">';

  /* MetaMask logo (user-provided PNG served from /logos/metamask-icon.png) */
  var METAMASK_ICON =
    '<img src="/logos/metamask-icon.png?v=1" alt="MetaMask" style="width:18px;height:18px;object-fit:contain;border-radius:4px" aria-hidden="true">';

  /* Coinbase Wallet logo (user-provided PNG served from /logos/coinbase-icon.png) */
  var COINBASE_ICON =
    '<img src="/logos/coinbase-icon.png?v=1" alt="Coinbase Wallet" style="width:18px;height:18px;object-fit:contain;border-radius:4px" aria-hidden="true">';

  /* ------------------------------------------------------------------ *
   * Styles (prefixed wyler-sl-* to avoid clashes with the app)          *
   * ------------------------------------------------------------------ */
  var CSS = [
    ".wyler-sl-backdrop{position:fixed;inset:0;z-index:2147483000;background:rgba(2,2,8,.78);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;pointer-events:none;transition:opacity .22s ease}",
    ".wyler-sl-backdrop.wyler-open{opacity:1;pointer-events:auto}",
    ".wyler-sl-card{width:100%;max-width:400px;max-height:calc(100vh - 40px);overflow-y:auto;background:#0a0a0e;border:1px solid rgba(255,255,255,.07);border-radius:28px;padding:36px 30px;box-shadow:0 30px 80px rgba(0,0,0,.6);transform:translateY(10px) scale(.98);transition:transform .22s ease;font-family:inherit;position:relative}",
    ".wyler-sl-backdrop.wyler-open .wyler-sl-card{transform:none}",
    ".wyler-sl-title{font-size:20px;font-weight:700;letter-spacing:-.02em;text-transform:uppercase;color:#fff;text-align:center;margin:0}",
    ".wyler-sl-sub{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#8b8b9e;text-align:center;margin:8px 0 0}",
    ".wyler-sl-btn{display:flex;align-items:center;justify-content:center;gap:12px;width:100%;padding:16px;border-radius:16px;border:1px solid rgba(255,255,255,.1);background:#000;color:#fff;font-weight:700;font-size:13px;cursor:pointer;transition:all .18s ease;margin-top:12px;font-family:inherit}",
    ".wyler-sl-btn:hover{background:rgba(255,255,255,.06);transform:scale(1.015)}",
    ".wyler-sl-btn.wyler-primary{background:#4f46e5;border-color:transparent;box-shadow:0 0 20px rgba(79,70,229,.35)}",
    ".wyler-sl-btn.wyler-primary:hover{background:#6366f1}",
    ".wyler-sl-btn:disabled{opacity:.6;cursor:default;transform:none}",
    ".wyler-sl-div{display:flex;align-items:center;gap:14px;margin:18px 0 6px}",
    ".wyler-sl-div span{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:#6b6b7e;font-weight:700;white-space:nowrap}",
    ".wyler-sl-div i{height:1px;flex:1;background:rgba(255,255,255,.1)}",
    ".wyler-spinner{width:44px;height:44px;border-radius:50%;border:2px solid rgba(79,70,229,.2);border-top-color:#4f46e5;animation:wyler-spin 1s linear infinite;margin:26px auto 18px}",
    "@keyframes wyler-spin{to{transform:rotate(360deg)}}",
    ".wyler-sl-busy{text-align:center;padding:10px 0 4px}",
    ".wyler-sl-busy .wyler-t{font-size:15px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#6366f1}",
    ".wyler-sl-busy .wyler-s{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#8b8b9e;margin-top:6px}",
    ".wyler-sl-conn{text-align:center;padding:6px 0 2px}",
    ".wyler-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:999px;background:rgba(74,222,128,.08);border:1px solid rgba(74,222,128,.2);color:#4ade80;font-size:9px;font-weight:700;letter-spacing:.2em;text-transform:uppercase}",
    ".wyler-sl-user{margin-top:16px;font-size:15px;font-weight:700;color:#fff;word-break:break-all}",
    ".wyler-sl-addr{margin-top:6px;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#8b8b9e}",
    ".wyler-sl-note{margin-top:18px;font-size:10px;line-height:1.7;color:#55556a}",
    ".wyler-sl-legal{margin-top:20px;font-size:10px;line-height:1.7;color:#55556a;text-align:center;margin-bottom:0}",
    ".wyler-sl-x{position:absolute;top:14px;right:14px;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.05);border:0;color:#8b8b9e;font-size:16px;cursor:pointer;line-height:1}",
    ".wyler-sl-x:hover{color:#fff;background:rgba(255,255,255,.1)}",
    ".wyler-dot{width:7px;height:7px;border-radius:50%;background:#4ade80;box-shadow:0 0 8px rgba(74,222,128,.8);display:inline-block;flex-shrink:0}",
    ".wyler-chip-inner{display:inline-flex;align-items:center;gap:8px}",
    ".wyler-sl-error{display:flex;align-items:center;gap:10px;margin-top:18px;padding:14px 16px;background:rgba(239,68,68,.05);border:1px solid rgba(239,68,68,.12);border-radius:14px;color:#f87171;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}"
  ].join("\n");

  /* ------------------------------------------------------------------ *
   * Helpers                                                             *
   * ------------------------------------------------------------------ */
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function hash(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function mockAddress(seed) {
    var a = ("00000000" + hash(seed).toString(16)).slice(-4);
    var b = ("00000000" + hash(seed + "::wyler").toString(16)).slice(-4);
    return ("0x" + a + "..." + b).toUpperCase().replace("0X", "0x");
  }

  function getSession() {
    try {
      var raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (_) { return null; }
  }

  function saveSession(s) {
    try { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); } catch (_) {}
  }

  function clearSession() {
    try { localStorage.removeItem(SESSION_KEY); } catch (_) {}
  }

  /* ------------------------------------------------------------------ *
   * Modal scaffold                                                      *
   * ------------------------------------------------------------------ */
  var backdrop = null;
  var card = null;

  function ensureDom() {
    if (backdrop) return;
    var style = document.createElement("style");
    style.id = "wyler-social-login-css";
    style.textContent = CSS;
    document.head.appendChild(style);

    backdrop = document.createElement("div");
    backdrop.className = "wyler-sl-backdrop";
    backdrop.innerHTML =
      '<div class="wyler-sl-card" role="dialog" aria-modal="true" aria-label="Connect Wallet"></div>';
    card = backdrop.firstElementChild;
    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop) close();
    });
    document.body.appendChild(backdrop);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && backdrop.classList.contains("wyler-open")) close();
    });
  }

  function open() { ensureDom(); backdrop.classList.add("wyler-open"); }
  function close() { if (backdrop) backdrop.classList.remove("wyler-open"); clearBusyTimers(); }

  function openModal() {
    open();
    if (getSession()) viewConnected(); else viewOptions();
  }

  /* Re-dispatch the original click so the mirrored app opens its own
     native wallet modal (MetaMask & friends) untouched.                  */
  function openNativeWallet() {
    PASSTHROUGH = true;
    close();
    var btn = findHeaderConnectButton();
    if (btn) btn.click();
  }

  /* ------------------------------------------------------------------ *
   * Modal views                                                         *
   * ------------------------------------------------------------------ */
  var busyTimers = [];
  function clearBusyTimers() {
    busyTimers.forEach(clearTimeout);
    busyTimers = [];
  }

  function viewOptions() {
    var buttons = Object.keys(PROVIDERS).map(function (key) {
      return (
        '<button type="button" class="wyler-sl-btn" data-wyler-provider="' + key + '">' +
        ICONS[key] +
        "<span>Continue with " + esc(PROVIDERS[key].name) + "</span></button>"
      );
    }).join("");

    card.innerHTML =
      '<button type="button" class="wyler-sl-x" data-wyler-close="1" aria-label="Close">&times;</button>' +
      '<h3 class="wyler-sl-title">Connect Wallet</h3>' +
      '<p class="wyler-sl-sub">Social login &middot; Seedless smart wallet</p>' +
      buttons +
      '<button type="button" class="wyler-sl-btn" data-wyler-okx="1">' + OKX_ICON +
      "<span>Continue with OKX Wallet</span></button>" +
      '<button type="button" class="wyler-sl-btn" data-wyler-phantom="1">' + PHANTOM_ICON +
      "<span>Continue with Phantom Wallet</span></button>" +
      '<button type="button" class="wyler-sl-btn" data-wyler-metamask="1">' + METAMASK_ICON +
      "<span>Continue with MetaMask</span></button>" +
      '<button type="button" class="wyler-sl-btn" data-wyler-coinbase="1">' + COINBASE_ICON +
      "<span>Continue with Coinbase Wallet</span></button>" +
      '<div class="wyler-sl-div"><i></i><span>Protocol Auth</span><i></i></div>' +
      '<button type="button" class="wyler-sl-btn" data-wyler-native="1"><span>Use a Crypto Wallet</span></button>' +
      '<p class="wyler-sl-legal">By continuing, you agree to deploy a non-custodial smart wallet on Wyler L3. Local demo session &mdash; no real authentication is performed.</p>';

    card.querySelector("[data-wyler-close]").addEventListener("click", close);
    card.querySelector("[data-wyler-okx]").addEventListener("click", startOkxConnect);
    card.querySelector("[data-wyler-phantom]").addEventListener("click", startPhantomConnect);
    card.querySelector("[data-wyler-metamask]").addEventListener("click", startMetamaskConnect);
    card.querySelector("[data-wyler-coinbase]").addEventListener("click", startCoinbaseConnect);
    card.querySelector("[data-wyler-native]").addEventListener("click", openNativeWallet);
    Array.prototype.forEach.call(card.querySelectorAll("[data-wyler-provider]"), function (btn) {
      btn.addEventListener("click", function () {
        startConnect(btn.getAttribute("data-wyler-provider"));
      });
    });
  }

  function startConnect(key) {
    var p = PROVIDERS[key];
    if (!p) return;
    clearBusyTimers();
    card.innerHTML =
      '<div class="wyler-sl-busy">' +
      '<div class="wyler-spinner"></div>' +
      '<div class="wyler-t" id="wyler-busy-t">Connecting to ' + esc(p.name) + "&hellip;</div>" +
      '<div class="wyler-s" id="wyler-busy-s">Authorizing identity</div></div>';
    busyTimers.push(setTimeout(function () {
      var t = card.querySelector("#wyler-busy-t");
      var s = card.querySelector("#wyler-busy-s");
      if (t) t.textContent = "Deploying Smart Wallet";
      if (s) s.textContent = "Finalizing L3 execution layer\u2026";
    }, 1300));
    busyTimers.push(setTimeout(function () { finishConnect(key); }, 2600));
  }

  /* ------------------------------------------------------------------ *
   * OKX Wallet flow (real connect via window.okxwallet, demo fallback)  *
   * ------------------------------------------------------------------ */
  function getOkxProvider() {
    if (window.okxwallet && typeof window.okxwallet.request === "function") return window.okxwallet;
    if (window.ethereum && window.ethereum.isOkxWallet && typeof window.ethereum.request === "function") {
      return window.ethereum;
    }
    return null;
  }

  function startOkxConnect() {
    clearBusyTimers();
    card.innerHTML =
      '<div class="wyler-sl-busy">' +
      '<div class="wyler-spinner"></div>' +
      '<div class="wyler-t" id="wyler-busy-t">Connecting to OKX Wallet&hellip;</div>' +
      '<div class="wyler-s" id="wyler-busy-s">Requesting accounts</div></div>';

    var okx = getOkxProvider();
    if (!okx) {
      busyTimers.push(setTimeout(viewOkxNotFound, 1200));
      return;
    }

    var settled = false;
    var timeout = setTimeout(function () {
      if (!settled) { settled = true; viewOkxNotFound(); }
    }, 10000);

    Promise.resolve(okx.request({ method: "eth_requestAccounts" })).then(function (accounts) {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      var address = accounts && accounts[0];
      if (!address) { viewOkxNotFound(); return; }
      try { okx.request({ method: "eth_chainId" }).catch(function () {}); } catch (_) {}
      finishOkx(address);
    }).catch(function (err) {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      if (err && err.code === 4001) { viewOptions(); return; } /* user rejected */
      viewOkxNotFound();
    });
  }

  function finishOkx(address) {
    var full = String(address);
    saveSession({
      provider: "okx",
      name: "OKX Wallet",
      user: full,
      address: full.slice(0, 6) + "\u2026" + full.slice(-4),
      ts: Date.now()
    });
    applyHeaderIdentity();
    viewConnected();
  }

  function viewOkxNotFound() {
    card.innerHTML =
      '<button type="button" class="wyler-sl-x" data-wyler-close="1" aria-label="Close">&times;</button>' +
      '<h3 class="wyler-sl-title">OKX Wallet</h3>' +
      '<div class="wyler-sl-error">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>' +
      "<span>OKX Wallet Extension Not Found</span></div>" +
      '<p class="wyler-sl-note">Install the OKX Wallet browser extension to connect for real, or continue with a demo address to preview the connected experience.</p>' +
      '<button type="button" class="wyler-sl-btn wyler-primary" data-wyler-okx-demo="1"><span>Continue in Demo Mode</span></button>' +
      '<button type="button" class="wyler-sl-btn" data-wyler-back="1"><span>Back</span></button>';

    card.querySelector("[data-wyler-close]").addEventListener("click", close);
    card.querySelector("[data-wyler-okx-demo]").addEventListener("click", function () {
      saveSession({
        provider: "okx",
        name: "OKX Wallet",
        user: "OKX Demo Account",
        address: mockAddress("okx:demo"),
        ts: Date.now()
      });
      applyHeaderIdentity();
      viewConnected();
    });
    card.querySelector("[data-wyler-back]").addEventListener("click", viewOptions);
  }

  /* ------------------------------------------------------------------ *
   * Phantom Wallet flow (real connect via window.phantom, demo fallback)*
   * ------------------------------------------------------------------ */
  function getPhantomProvider() {
    if (window.phantom && window.phantom.ethereum && typeof window.phantom.ethereum.request === "function") {
      return window.phantom.ethereum;
    }
    if (window.ethereum && window.ethereum.isPhantom && typeof window.ethereum.request === "function") {
      return window.ethereum;
    }
    return null;
  }

  function startPhantomConnect() {
    clearBusyTimers();
    card.innerHTML =
      '<div class="wyler-sl-busy">' +
      '<div class="wyler-spinner"></div>' +
      '<div class="wyler-t" id="wyler-busy-t">Connecting to Phantom Wallet&hellip;</div>' +
      '<div class="wyler-s" id="wyler-busy-s">Requesting accounts</div></div>';

    var phantom = getPhantomProvider();
    if (!phantom) {
      busyTimers.push(setTimeout(viewPhantomNotFound, 1200));
      return;
    }

    var settled = false;
    var timeout = setTimeout(function () {
      if (!settled) { settled = true; viewPhantomNotFound(); }
    }, 10000);

    Promise.resolve(phantom.request({ method: "eth_requestAccounts" })).then(function (accounts) {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      var address = accounts && accounts[0];
      if (!address) { viewPhantomNotFound(); return; }
      try { phantom.request({ method: "eth_chainId" }).catch(function () {}); } catch (_) {}
      finishPhantomConnect(address);
    }).catch(function (err) {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      if (err && err.code === 4001) { viewOptions(); return; } /* user rejected */
      viewPhantomNotFound();
    });
  }

  function finishPhantomConnect(address) {
    var full = String(address);
    saveSession({
      provider: "phantom",
      name: "Phantom Wallet",
      user: full,
      address: full.slice(0, 6) + "\u2026" + full.slice(-4),
      ts: Date.now()
    });
    applyHeaderIdentity();
    viewConnected();
  }

  function viewPhantomNotFound() {
    card.innerHTML =
      '<button type="button" class="wyler-sl-x" data-wyler-close="1" aria-label="Close">&times;</button>' +
      '<h3 class="wyler-sl-title">Phantom Wallet</h3>' +
      '<div class="wyler-sl-error">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>' +
      "<span>Phantom Wallet Extension Not Found</span></div>" +
      '<p class="wyler-sl-note">Install the Phantom browser extension to connect for real, or continue with a demo address to preview the connected experience.</p>' +
      '<button type="button" class="wyler-sl-btn wyler-primary" data-wyler-phantom-demo="1"><span>Continue in Demo Mode</span></button>' +
      '<button type="button" class="wyler-sl-btn" data-wyler-back="1"><span>Back</span></button>';

    card.querySelector("[data-wyler-close]").addEventListener("click", close);
    card.querySelector("[data-wyler-phantom-demo]").addEventListener("click", function () {
      saveSession({
        provider: "phantom",
        name: "Phantom Wallet",
        user: "Phantom Demo Account",
        address: mockAddress("phantom:demo"),
        ts: Date.now()
      });
      applyHeaderIdentity();
      viewConnected();
    });
    card.querySelector("[data-wyler-back]").addEventListener("click", viewOptions);
  }

  /* ------------------------------------------------------------------ *
   * MetaMask flow (real connect via window.ethereum, demo fallback)     *
   * ------------------------------------------------------------------ */
  function getMetamaskProvider() {
    if (window.ethereum && window.ethereum.isMetaMask && typeof window.ethereum.request === "function") {
      return window.ethereum;
    }
    return null;
  }

  function startMetamaskConnect() {
    clearBusyTimers();
    card.innerHTML =
      '<div class="wyler-sl-busy">' +
      '<div class="wyler-spinner"></div>' +
      '<div class="wyler-t" id="wyler-busy-t">Connecting to MetaMask&hellip;</div>' +
      '<div class="wyler-s" id="wyler-busy-s">Requesting accounts</div></div>';

    var metamask = getMetamaskProvider();
    if (!metamask) {
      busyTimers.push(setTimeout(viewMetamaskNotFound, 1200));
      return;
    }

    var settled = false;
    var timeout = setTimeout(function () {
      if (!settled) { settled = true; viewMetamaskNotFound(); }
    }, 10000);

    Promise.resolve(metamask.request({ method: "eth_requestAccounts" })).then(function (accounts) {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      var address = accounts && accounts[0];
      if (!address) { viewMetamaskNotFound(); return; }
      try { metamask.request({ method: "eth_chainId" }).catch(function () {}); } catch (_) {}
      finishMetamaskConnect(address);
    }).catch(function (err) {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      if (err && err.code === 4001) { viewOptions(); return; } /* user rejected */
      viewMetamaskNotFound();
    });
  }

  function finishMetamaskConnect(address) {
    var full = String(address);
    saveSession({
      provider: "metamask",
      name: "MetaMask",
      user: full,
      address: full.slice(0, 6) + "\u2026" + full.slice(-4),
      ts: Date.now()
    });
    applyHeaderIdentity();
    viewConnected();
  }

  function viewMetamaskNotFound() {
    card.innerHTML =
      '<button type="button" class="wyler-sl-x" data-wyler-close="1" aria-label="Close">&times;</button>' +
      '<h3 class="wyler-sl-title">MetaMask</h3>' +
      '<div class="wyler-sl-error">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>' +
      "<span>MetaMask Extension Not Found</span></div>" +
      '<p class="wyler-sl-note">Install the MetaMask browser extension to connect for real, or continue with a demo address to preview the connected experience.</p>' +
      '<button type="button" class="wyler-sl-btn wyler-primary" data-wyler-metamask-demo="1"><span>Continue in Demo Mode</span></button>' +
      '<button type="button" class="wyler-sl-btn" data-wyler-back="1"><span>Back</span></button>';

    card.querySelector("[data-wyler-close]").addEventListener("click", close);
    card.querySelector("[data-wyler-metamask-demo]").addEventListener("click", function () {
      saveSession({
        provider: "metamask",
        name: "MetaMask",
        user: "MetaMask Demo Account",
        address: mockAddress("metamask:demo"),
        ts: Date.now()
      });
      applyHeaderIdentity();
      viewConnected();
    });
    card.querySelector("[data-wyler-back]").addEventListener("click", viewOptions);
  }

  /* ------------------------------------------------------------------ *
   * Coinbase Wallet flow (real connect via extension, demo fallback)    *
   * ------------------------------------------------------------------ */
  function getCoinbaseProvider() {
    if (window.coinbaseWalletExtension && typeof window.coinbaseWalletExtension.request === "function") {
      return window.coinbaseWalletExtension;
    }
    if (window.ethereum && window.ethereum.isCoinbaseWallet && typeof window.ethereum.request === "function") {
      return window.ethereum;
    }
    return null;
  }

  function startCoinbaseConnect() {
    clearBusyTimers();
    card.innerHTML =
      '<div class="wyler-sl-busy">' +
      '<div class="wyler-spinner"></div>' +
      '<div class="wyler-t" id="wyler-busy-t">Connecting to Coinbase Wallet&hellip;</div>' +
      '<div class="wyler-s" id="wyler-busy-s">Requesting accounts</div></div>';

    var coinbase = getCoinbaseProvider();
    if (!coinbase) {
      busyTimers.push(setTimeout(viewCoinbaseNotFound, 1200));
      return;
    }

    var settled = false;
    var timeout = setTimeout(function () {
      if (!settled) { settled = true; viewCoinbaseNotFound(); }
    }, 10000);

    Promise.resolve(coinbase.request({ method: "eth_requestAccounts" })).then(function (accounts) {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      var address = accounts && accounts[0];
      if (!address) { viewCoinbaseNotFound(); return; }
      try { coinbase.request({ method: "eth_chainId" }).catch(function () {}); } catch (_) {}
      finishCoinbaseConnect(address);
    }).catch(function (err) {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      if (err && err.code === 4001) { viewOptions(); return; } /* user rejected */
      viewCoinbaseNotFound();
    });
  }

  function finishCoinbaseConnect(address) {
    var full = String(address);
    saveSession({
      provider: "coinbase",
      name: "Coinbase Wallet",
      user: full,
      address: full.slice(0, 6) + "\u2026" + full.slice(-4),
      ts: Date.now()
    });
    applyHeaderIdentity();
    viewConnected();
  }

  function viewCoinbaseNotFound() {
    card.innerHTML =
      '<button type="button" class="wyler-sl-x" data-wyler-close="1" aria-label="Close">&times;</button>' +
      '<h3 class="wyler-sl-title">Coinbase Wallet</h3>' +
      '<div class="wyler-sl-error">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>' +
      "<span>Coinbase Wallet Extension Not Found</span></div>" +
      '<p class="wyler-sl-note">Install the Coinbase Wallet browser extension to connect for real, or continue with a demo address to preview the connected experience.</p>' +
      '<button type="button" class="wyler-sl-btn wyler-primary" data-wyler-coinbase-demo="1"><span>Continue in Demo Mode</span></button>' +
      '<button type="button" class="wyler-sl-btn" data-wyler-back="1"><span>Back</span></button>';

    card.querySelector("[data-wyler-close]").addEventListener("click", close);
    card.querySelector("[data-wyler-coinbase-demo]").addEventListener("click", function () {
      saveSession({
        provider: "coinbase",
        name: "Coinbase Wallet",
        user: "Coinbase Demo Account",
        address: mockAddress("coinbase:demo"),
        ts: Date.now()
      });
      applyHeaderIdentity();
      viewConnected();
    });
    card.querySelector("[data-wyler-back]").addEventListener("click", viewOptions);
  }

  function finishConnect(key) {
    var p = PROVIDERS[key];
    var session = {
      provider: key,
      name: p.name,
      user: p.user,
      address: mockAddress(key + ":" + p.user),
      ts: Date.now()
    };
    saveSession(session);
    applyHeaderIdentity();
    viewConnected();
  }

  function viewConnected() {
    var s = getSession();
    if (!s) { viewOptions(); return; }
    card.innerHTML =
      '<button type="button" class="wyler-sl-x" data-wyler-close="1" aria-label="Close">&times;</button>' +
      '<div class="wyler-sl-conn">' +
      '<span class="wyler-badge"><span class="wyler-dot"></span>Connected</span>' +
      '<div class="wyler-sl-user">' + esc(s.user) + "</div>" +
      '<div class="wyler-sl-addr">' + esc(s.name) + " &middot; " + esc(s.address) + "</div>" +
      '<p class="wyler-sl-note">Signed in with ' + esc(s.name) +
      ". Your identity is linked to a seedless smart wallet on Wyler L3. This is a local demo session stored only in this browser.</p></div>" +
      '<button type="button" class="wyler-sl-btn wyler-primary" data-wyler-done="1"><span>Continue</span></button>' +
      '<button type="button" class="wyler-sl-btn" data-wyler-disconnect="1"><span>Disconnect</span></button>';

    card.querySelector("[data-wyler-close]").addEventListener("click", close);
    card.querySelector("[data-wyler-done]").addEventListener("click", close);
    card.querySelector("[data-wyler-disconnect]").addEventListener("click", function () {
      clearSession();
      applyHeaderIdentity();
      close();
    });
  }

  /* ------------------------------------------------------------------ *
   * Header identity chip                                                *
   * ------------------------------------------------------------------ */
  function isHeaderConnectButton(b) {
    if (!b || b.tagName !== "BUTTON") return false;
    if (b.getAttribute("data-wyler-social") === "1") return true;
    return b.textContent.trim() === "Connect Wallet" && /bg-indigo-600/.test(b.className);
  }

  function findHeaderConnectButton() {
    var buttons = document.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      if (isHeaderConnectButton(buttons[i]) && /bg-indigo-600/.test(buttons[i].className)) {
        return buttons[i];
      }
    }
    return null;
  }

  function applyHeaderIdentity() {
    var btn = findHeaderConnectButton();
    if (!btn) return;
    var session = getSession();
    if (session) {
      if (btn.getAttribute("data-wyler-social") !== "1") {
        btn.setAttribute("data-wyler-social", "1");
        btn.setAttribute("title", session.name + " \u00b7 " + session.user);
        btn.innerHTML =
          '<span class="wyler-chip-inner"><span class="wyler-dot"></span><span>' +
          esc(session.address) + "</span></span>";
      }
    } else if (btn.getAttribute("data-wyler-social") === "1") {
      btn.removeAttribute("data-wyler-social");
      btn.removeAttribute("title");
      btn.textContent = "Connect Wallet";
    }
  }

  /* ------------------------------------------------------------------ *
   * Native wallet modal — inject an OKX Wallet row with the user logo   *
   * ------------------------------------------------------------------ */
  function findNativeWalletList() {
    var buttons = document.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].textContent.indexOf("Wyler L3 Vault") !== -1) {
        return buttons[i].parentElement; /* the flex list container */
      }
    }
    return null;
  }

  function closeNativeModalFrom(row) {
    var modalCard = row.parentElement && row.parentElement.parentElement;
    if (!modalCard) return;
    var buttons = modalCard.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].textContent.trim() === "\u2715") { buttons[i].click(); return; }
    }
  }

  function injectOkxRow() {
    var list = findNativeWalletList();
    if (!list) return;
    if (list.querySelector("[data-wyler-okx-row]")) return;
    var detected = !!(window.okxwallet || (window.ethereum && window.ethereum.isOkxWallet));
    var row = document.createElement("button");
    row.type = "button";
    row.setAttribute("data-wyler-okx-row", "1");
    row.className =
      "flex items-center justify-between px-5 py-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group";
    row.innerHTML =
      '<div class="flex items-center gap-4">' +
      '<div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-105 transition-transform">' +
      '<img src="/logos/okx-icon.png?v=1" alt="OKX" class="w-6 h-6 object-contain" style="border-radius:6px">' +
      "</div>" +
      '<span class="font-bold text-sm tracking-wide text-white">OKX Wallet</span>' +
      "</div>" +
      '<span class="text-[10px] text-gray-500 font-bold uppercase bg-white/5 px-2 py-1 rounded-md">' +
      (detected ? "Detected" : "Popular") +
      "</span>";
    list.appendChild(row);
  }

  /* Phantom: rebrand the native "Phantom" row's generic icon with the
     user logo, and inject a Phantom row when none is rendered.          */
  function phantomDetected() {
    return !!(window.phantom && window.phantom.ethereum) ||
      !!(window.ethereum && window.ethereum.isPhantom);
  }

  function ensurePhantomRow() {
    var list = findNativeWalletList();
    if (!list) return;
    var rows = list.querySelectorAll("button");
    var nativePhantom = null;

    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      if (row.getAttribute("data-wyler-rebrand") === "phantom") { nativePhantom = row; continue; }
      if (row.hasAttribute("data-wyler-okx-row") || row.hasAttribute("data-wyler-phantom-row")) continue;
      var label = row.querySelector("span.font-bold");
      if (label && label.textContent.trim() === "Phantom") {
        var box = row.querySelector(".w-10");
        if (box) {
          box.innerHTML =
            '<img src="/logos/phantom-icon.png?v=1" alt="Phantom" class="w-6 h-6 object-contain" style="border-radius:6px">';
          row.setAttribute("data-wyler-rebrand", "phantom");
        }
        nativePhantom = row;
      }
    }

    if (nativePhantom) return; /* native row exists (now branded) */

    var injected = document.createElement("button");
    injected.type = "button";
    injected.setAttribute("data-wyler-phantom-row", "1");
    injected.className =
      "flex items-center justify-between px-5 py-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group";
    injected.innerHTML =
      '<div class="flex items-center gap-4">' +
      '<div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-105 transition-transform">' +
      '<img src="/logos/phantom-icon.png?v=1" alt="Phantom" class="w-6 h-6 object-contain" style="border-radius:6px">' +
      "</div>" +
      '<span class="font-bold text-sm tracking-wide text-white">Phantom Wallet</span>' +
      "</div>" +
      '<span class="text-[10px] text-gray-500 font-bold uppercase bg-white/5 px-2 py-1 rounded-md">' +
      (phantomDetected() ? "Detected" : "Popular") +
      "</span>";
    list.appendChild(injected);
  }

  /* MetaMask: rebrand the native "MetaMask" row's generic icon with the
     user logo, and inject a MetaMask row when none is rendered.         */
  function metamaskDetected() {
    return !!(window.ethereum && window.ethereum.isMetaMask);
  }

  function ensureMetaMaskRow() {
    var list = findNativeWalletList();
    if (!list) return;
    var rows = list.querySelectorAll("button");
    var nativeMetaMask = null;

    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      if (row.getAttribute("data-wyler-rebrand") === "metamask") { nativeMetaMask = row; continue; }
      if (row.hasAttribute("data-wyler-okx-row") || row.hasAttribute("data-wyler-phantom-row") ||
          row.hasAttribute("data-wyler-metamask-row")) continue;
      var label = row.querySelector("span.font-bold");
      if (label && label.textContent.trim() === "MetaMask") {
        var box = row.querySelector(".w-10");
        if (box) {
          box.innerHTML =
            '<img src="/logos/metamask-icon.png?v=1" alt="MetaMask" class="w-6 h-6 object-contain" style="border-radius:6px">';
          row.setAttribute("data-wyler-rebrand", "metamask");
        }
        nativeMetaMask = row;
      }
    }

    if (nativeMetaMask) return; /* native row exists (now branded) */

    var injected = document.createElement("button");
    injected.type = "button";
    injected.setAttribute("data-wyler-metamask-row", "1");
    injected.className =
      "flex items-center justify-between px-5 py-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group";
    injected.innerHTML =
      '<div class="flex items-center gap-4">' +
      '<div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-105 transition-transform">' +
      '<img src="/logos/metamask-icon.png?v=1" alt="MetaMask" class="w-6 h-6 object-contain" style="border-radius:6px">' +
      "</div>" +
      '<span class="font-bold text-sm tracking-wide text-white">MetaMask</span>' +
      "</div>" +
      '<span class="text-[10px] text-gray-500 font-bold uppercase bg-white/5 px-2 py-1 rounded-md">' +
      (metamaskDetected() ? "Detected" : "Popular") +
      "</span>";
    list.appendChild(injected);
  }

  /* Coinbase: rebrand the native "Coinbase Wallet" row's generic icon
     with the user logo, and inject a row when none is rendered.        */
  function coinbaseDetected() {
    return !!(window.coinbaseWalletExtension) ||
      !!(window.ethereum && window.ethereum.isCoinbaseWallet);
  }

  function ensureCoinbaseRow() {
    var list = findNativeWalletList();
    if (!list) return;
    var rows = list.querySelectorAll("button");
    var nativeCoinbase = null;

    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      if (row.getAttribute("data-wyler-rebrand") === "coinbase") { nativeCoinbase = row; continue; }
      if (row.hasAttribute("data-wyler-okx-row") || row.hasAttribute("data-wyler-phantom-row") ||
          row.hasAttribute("data-wyler-metamask-row") || row.hasAttribute("data-wyler-coinbase-row")) continue;
      var label = row.querySelector("span.font-bold");
      if (label && label.textContent.trim() === "Coinbase Wallet") {
        var box = row.querySelector(".w-10");
        if (box) {
          box.innerHTML =
            '<img src="/logos/coinbase-icon.png?v=1" alt="Coinbase Wallet" class="w-6 h-6 object-contain" style="border-radius:6px">';
          row.setAttribute("data-wyler-rebrand", "coinbase");
        }
        nativeCoinbase = row;
      }
    }

    if (nativeCoinbase) return; /* native row exists (now branded) */

    var injected = document.createElement("button");
    injected.type = "button";
    injected.setAttribute("data-wyler-coinbase-row", "1");
    injected.className =
      "flex items-center justify-between px-5 py-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group";
    injected.innerHTML =
      '<div class="flex items-center gap-4">' +
      '<div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-105 transition-transform">' +
      '<img src="/logos/coinbase-icon.png?v=1" alt="Coinbase Wallet" class="w-6 h-6 object-contain" style="border-radius:6px">' +
      "</div>" +
      '<span class="font-bold text-sm tracking-wide text-white">Coinbase Wallet</span>' +
      "</div>" +
      '<span class="text-[10px] text-gray-500 font-bold uppercase bg-white/5 px-2 py-1 rounded-md">' +
      (coinbaseDetected() ? "Detected" : "Popular") +
      "</span>";
    list.appendChild(injected);
  }

  /* Hide any native wallet row that still uses the generic (logo-less)
     icon — the login/wallet section only shows wallets with a real logo
     (Wyler L3 Vault + OKX / Phantom / MetaMask / Coinbase).             */
  function hideUnbrandedNativeRows() {
    var list = findNativeWalletList();
    if (!list) return;
    var rows = list.querySelectorAll("button");
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      if (row.hasAttribute("data-wyler-okx-row") || row.hasAttribute("data-wyler-phantom-row") ||
          row.hasAttribute("data-wyler-metamask-row") || row.hasAttribute("data-wyler-coinbase-row")) continue;

      var label = row.querySelector("span.font-bold");
      var text = label ? label.textContent.trim() : "";
      if (text === "Wyler L3 Vault") continue; /* has its own logo */

      var branded = row.getAttribute("data-wyler-rebrand") !== null ||
        row.querySelector(".w-10 img") !== null;

      if (!branded) {
        if (row.getAttribute("data-wyler-hidden") !== "1") {
          row.style.display = "none";
          row.setAttribute("data-wyler-hidden", "1");
        }
      } else if (row.getAttribute("data-wyler-hidden") === "1") {
        row.style.display = "";
        row.removeAttribute("data-wyler-hidden");
      }
    }
  }

  /* ------------------------------------------------------------------ *
   * Click interception + React re-render guard                          *
   * ------------------------------------------------------------------ */
  document.addEventListener("click", function (e) {
    var target = e.target;
    var okxRow = target && target.closest ? target.closest("[data-wyler-okx-row]") : null;
    if (okxRow) {
      e.preventDefault();
      e.stopPropagation();
      closeNativeModalFrom(okxRow);
      openModal();
      startOkxConnect();
      return;
    }
    var phantomRow = target && target.closest ? target.closest("[data-wyler-phantom-row]") : null;
    if (phantomRow) {
      e.preventDefault();
      e.stopPropagation();
      closeNativeModalFrom(phantomRow);
      openModal();
      startPhantomConnect();
      return;
    }
    var metamaskRow = target && target.closest ? target.closest("[data-wyler-metamask-row]") : null;
    if (metamaskRow) {
      e.preventDefault();
      e.stopPropagation();
      closeNativeModalFrom(metamaskRow);
      openModal();
      startMetamaskConnect();
      return;
    }
    var coinbaseRow = target && target.closest ? target.closest("[data-wyler-coinbase-row]") : null;
    if (coinbaseRow) {
      e.preventDefault();
      e.stopPropagation();
      closeNativeModalFrom(coinbaseRow);
      openModal();
      startCoinbaseConnect();
      return;
    }
    var btn = target && target.closest ? target.closest("button") : null;
    if (!isHeaderConnectButton(btn)) return;
    if (PASSTHROUGH) { PASSTHROUGH = false; return; }
    e.preventDefault();
    e.stopPropagation();
    openModal();
  }, true);

  var observer = null;
  var observerPending = false;

  function startObserver() {
    if (observer || !window.MutationObserver) return;
    observer = new MutationObserver(function () {
      if (observerPending) return;
      observerPending = true;
      requestAnimationFrame(function () {
        observerPending = false;
        applyHeaderIdentity();
        injectOkxRow();
        ensurePhantomRow();
        ensureMetaMaskRow();
        ensureCoinbaseRow();
        hideUnbrandedNativeRows();
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  /* ------------------------------------------------------------------ *
   * Init                                                                *
   * ------------------------------------------------------------------ */
  function init() {
    ensureDom();
    applyHeaderIdentity();
    startObserver();
    injectOkxRow();
    ensurePhantomRow();
    ensureMetaMaskRow();
    ensureCoinbaseRow();
    hideUnbrandedNativeRows();
    console.info("[wyler-social-login] overlay ready (Google / Telegram / X / OKX / Phantom / MetaMask / Coinbase)");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();