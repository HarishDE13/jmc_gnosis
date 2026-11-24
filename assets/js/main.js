/* JMC Gnosis site script */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  var CFG = window.GNOSIS_CONFIG || {};
  var UNITS = window.GNOSIS_UNITS || [];
  var FILES = window.GNOSIS_MATERIALS || [];
  var TYPE = { guide: "Guide", notes: "Notes", pyq: "PYQ", revision: "Revision", mock: "Practice paper" };
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  /* ---------- Google Drive helpers ---------- */
  function driveId(url) { var m = String(url || "").match(/\/d\/([A-Za-z0-9_-]{10,})/) || String(url || "").match(/[?&]id=([A-Za-z0-9_-]{10,})/); return m ? m[1] : null; }
  function previewUrl(url) { var id = driveId(url); return id ? "https://drive.google.com/file/d/" + id + "/preview" : url; }
  function downloadUrl(url) { var id = driveId(url); return id ? "https://drive.google.com/uc?export=download&id=" + id : url; }

  /* ---------- Links from config ---------- */
  var IG = CFG.instagramHandle ? "https://www.instagram.com/" + CFG.instagramHandle + "/" : "";
  var links = {
    instagram: IG,
    whatsapp: CFG.whatsappNumber ? "https://wa.me/" + CFG.whatsappNumber : "",
    email: CFG.email ? "mailto:" + CFG.email : "",
    telegram: CFG.telegramUrl || "",
    youtube: CFG.youtubeUrl || ""
  };
  var labels = {
    instagram: CFG.instagramHandle ? "@" + CFG.instagramHandle : "",
    whatsapp: CFG.whatsappNumber ? "+" + CFG.whatsappNumber : "",
    email: CFG.email || "",
    telegram: (CFG.telegramUrl || "").replace(/^https?:\/\//, ""),
    youtube: (CFG.youtubeUrl || "").replace(/^https?:\/\//, "")
  };
  function wireLinks(root) {
    (root || document).querySelectorAll("[data-link]").forEach(function (el) {
      var k = el.getAttribute("data-link");
      if (links[k]) {
        el.setAttribute("href", links[k]);
        if (k !== "email") { el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener"); }
      } else {
        (el.closest("[data-hide-empty]") || el).hidden = true;
      }
    });
    (root || document).querySelectorAll("[data-label]").forEach(function (el) { el.textContent = labels[el.getAttribute("data-label")] || ""; });
  }

  /* ---------- Header ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() { if (header) header.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  var menuBtn = document.querySelector(".menu-btn"), nav = document.getElementById("site-nav");
  if (menuBtn && nav) menuBtn.addEventListener("click", function () {
    var open = nav.classList.toggle("open"); menuBtn.setAttribute("aria-expanded", String(open));
  });

  /* ---------- JRF Guide (fixed PDF, not driven by the sheet) ---------- */
  var GUIDE_URL = CFG.guidePdfUrl || "https://drive.google.com/file/d/1wI1Hn6v-Gn_UrkSw7tmBaGiYjvWi6dT5/view";
  document.querySelectorAll("[data-guide-frame]").forEach(function (f) { f.src = previewUrl(GUIDE_URL); });
  document.querySelectorAll("[data-guide-download]").forEach(function (a) { a.href = downloadUrl(GUIDE_URL); a.rel = "noopener"; a.target = "_blank"; });
  document.querySelectorAll("[data-guide-open]").forEach(function (a) { a.href = GUIDE_URL; a.rel = "noopener"; a.target = "_blank"; });

  /* ---------- Toast nudging Instagram after a download ---------- */
  var toast;
  function showToast() {
    if (!IG) return;
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast"; toast.setAttribute("role", "status");
      toast.innerHTML = '<p>Your PDF is opening. Follow <b>@' + esc(CFG.instagramHandle) + '</b> so you don\'t miss the next one.</p>' +
        '<a class="btn ig sm" href="' + IG + '" target="_blank" rel="noopener">Follow</a><button type="button" aria-label="Close">×</button>';
      document.body.appendChild(toast);
      toast.querySelector("button").addEventListener("click", function () { toast.classList.remove("show"); });
    }
    requestAnimationFrame(function () { toast.classList.add("show"); });
    clearTimeout(showToast.t); showToast.t = setTimeout(function () { toast.classList.remove("show"); }, 9000);
  }
  document.addEventListener("click", function (e) { if (e.target.closest("[data-guide-download], .js-download")) showToast(); });

  /* ---------- Home: units list ---------- */
  var ul = document.getElementById("units-list");
  if (ul) {
    ul.innerHTML = UNITS.map(function (u, i) {
      return '<a class="unit-row reveal" style="--d:' + (i % 5) * 0.05 + 's" href="materials.html#unit-' + u.n + '">' +
        '<span class="num">' + String(u.n).padStart(2, "0") + '.</span>' +
        '<div><h3>' + esc(u.name) + '</h3><p>' + esc(u.focus) + '</p></div>' +
        '<span class="tier">' + esc(u.tier) + '</span>' +
        '<span class="go" aria-hidden="true"><svg class="i" viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9"/></svg></span></a>';
    }).join("");
  }

  /* ---------- Materials page ---------- */
  var state = { q: "", unit: "all", type: "all" };
  function isNew(f) { if (!f.added || !f.url) return false; var d = new Date(f.added + "T00:00:00"); return !isNaN(d) && Date.now() - d.getTime() < 21 * 864e5; }
  function matches(f) {
    if (state.unit !== "all" && String(f.unit) !== state.unit) return false;
    if (state.type !== "all" && f.type !== state.type) return false;
    if (state.q) {
      var u = UNITS.filter(function (x) { return x.n === f.unit; })[0];
      var hay = [f.title, f.desc, TYPE[f.type], "unit " + f.unit, u ? u.name + " " + u.focus : "whole paper guide"].join(" ").toLowerCase();
      if (hay.indexOf(state.q.toLowerCase()) === -1) return false;
    }
    return true;
  }
  function card(f) {
    var tags = '<span class="tag">' + esc(TYPE[f.type] || f.type) + '</span>' + (f.fresh || isNew(f) ? '<span class="tag new">New</span>' : "");
    var acts = f.url
      ? '<button type="button" class="btn outline sm" data-preview="' + esc(f.url) + '" data-title="' + esc(f.title) + '">Quick look</button>' +
        '<a class="btn sm js-download" href="' + esc(downloadUrl(f.url)) + '" target="_blank" rel="noopener">Download PDF</a>'
      : '<span class="btn sm is-disabled" aria-disabled="true">Coming soon</span>';
    return '<article class="file-card"><div class="meta">' + tags + '</div><h3>' + esc(f.title) + '</h3>' + (f.desc ? '<p class="muted small">' + esc(f.desc) + '</p>' : "") + '<div class="acts">' + acts + '</div></article>';
  }
  var ICON_EYE = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
  var ICON_DL = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14"/></svg>';
  function byNewest(a, b) { return (b.added || "").localeCompare(a.added || ""); }
  function renderFeatured() {
    var box = document.getElementById("featured");
    if (!box) return;
    var items = FILES.filter(function (f) { return f.featured && f.url; }).sort(byNewest);
    box.hidden = !items.length;
    box.innerHTML = items.map(function (f) {
      return '<div class="feature-file reveal in"><span class="pdf-ico">PDF</span>' +
        '<div><span class="tag new">Featured</span><h2 style="font-size:1.4rem;margin:10px 0 6px">' + esc(f.title) + '</h2>' +
        (f.desc ? '<p class="muted">' + esc(f.desc) + '</p>' : "") + '</div>' +
        '<div class="btn-row"><button type="button" class="btn outline sm" data-preview="' + esc(f.url) + '" data-title="' + esc(f.title) + '">' + ICON_EYE + 'Quick look</button>' +
        '<a class="btn sm js-download" href="' + esc(downloadUrl(f.url)) + '" target="_blank" rel="noopener">' + ICON_DL + 'Download PDF</a></div></div>';
    }).join("");
  }
  function renderNewUploads() {
    var sec = document.getElementById("new-uploads");
    if (!sec) return;
    var items = FILES.filter(function (f) { return f.fresh && f.url; }).sort(byNewest);
    sec.hidden = !items.length;
    sec.querySelector(".files").innerHTML = items.map(card).join("");
  }
  function renderMaterials() {
    var out = document.getElementById("materials");
    if (!out) return;
    var list = FILES.filter(matches);
    var ready = list.filter(function (f) { return f.url; }).length;
    document.getElementById("result-count").textContent = list.length ? ready + " of " + list.length + " files ready. More are added every week." : "";
    if (!list.length) { out.innerHTML = '<div class="empty">No files match these filters yet. Try another unit or type.</div>'; return; }
    var groups = [{ n: 0, name: "Whole paper" }].concat(UNITS);
    out.innerHTML = groups.map(function (u) {
      var items = list.filter(function (f) { return f.unit === u.n; });
      if (!items.length) return "";
      items.sort(function (a, b) { return (b.url ? 1 : 0) - (a.url ? 1 : 0); });
      var num = u.n === 0 ? "" : '<span class="num">' + String(u.n).padStart(2, "0") + '</span>';
      return '<section class="unit-group"><h2 id="unit-' + u.n + '">' + num + esc(u.name) + '</h2><div class="files">' + items.map(card).join("") + '</div></section>';
    }).join("");
  }
  var unitSel = document.getElementById("f-unit");
  if (unitSel) {
    unitSel.innerHTML = '<option value="all">All units</option><option value="0">Whole paper</option>' +
      UNITS.map(function (u) { return '<option value="' + u.n + '">Unit ' + u.n + ": " + esc(u.name) + '</option>'; }).join("");
    unitSel.addEventListener("change", function () { state.unit = unitSel.value; renderMaterials(); });
    document.getElementById("f-q").addEventListener("input", function (e) { state.q = e.target.value.trim(); renderMaterials(); });
    document.querySelectorAll(".chips[data-filter]").forEach(function (g) {
      g.addEventListener("click", function (e) {
        var b = e.target.closest(".chip"); if (!b) return;
        g.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", String(c === b)); });
        state[g.dataset.filter] = b.dataset.value; renderMaterials();
      });
    });
    renderFeatured(); renderNewUploads(); renderMaterials();
    var m = location.hash.match(/^#unit-(\d+)$/);
    if (m) setTimeout(function () { var el = document.getElementById("unit-" + m[1]); if (el) el.scrollIntoView(); }, 60);
  }

  /* ---------- Quick look modal ---------- */
  var modal;
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-preview]"); if (!b) return;
    if (!modal) {
      modal = document.createElement("dialog");
      modal.className = "pdf-modal";
      modal.innerHTML = '<div class="pm-bar"><b></b><div class="btn-row"><a class="btn sm js-download" target="_blank" rel="noopener">Download PDF</a><button type="button" class="btn outline sm pm-close">Close</button></div></div><iframe title="PDF preview" allow="autoplay"></iframe>';
      document.body.appendChild(modal);
      modal.querySelector(".pm-close").addEventListener("click", function () { modal.close(); });
      modal.addEventListener("click", function (ev) { if (ev.target === modal) modal.close(); });
      modal.addEventListener("close", function () { modal.querySelector("iframe").src = "about:blank"; });
    }
    modal.querySelector("b").textContent = b.dataset.title || "Preview";
    modal.querySelector("iframe").src = previewUrl(b.dataset.preview);
    modal.querySelector(".js-download").href = downloadUrl(b.dataset.preview);
    if (modal.showModal) modal.showModal(); else window.open(b.dataset.preview, "_blank", "noopener");
  });

  /* ---------- Links page: latest file ---------- */
  function applyLatest() {
    var latest = document.getElementById("latest-link");
    if (!latest) return;
    var ready = FILES.filter(function (f) { return f.url; }).sort(function (a, b) { return (b.added || "").localeCompare(a.added || ""); });
    if (ready.length) { latest.hidden = false; latest.href = ready[0].url; latest.target = "_blank"; latest.rel = "noopener"; latest.querySelector("small").textContent = ready[0].title; }
    else latest.hidden = true;
  }
  applyLatest();

  /* ---------- Contact form ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    if (!links.whatsapp) { var wb = form.querySelector('[data-via="whatsapp"]'); if (wb) wb.hidden = true; }
    if (!links.email) { var eb = form.querySelector('[data-via="email"]'); if (eb) eb.hidden = true; }
    if (!links.whatsapp && !links.email) form.hidden = true;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("c-name").value.trim(), msg = document.getElementById("c-msg").value.trim();
      var text = "Hi JMC Gnosis, I'm " + name + ".\n\n" + msg, via = e.submitter && e.submitter.dataset.via;
      var status = document.getElementById("c-status");
      if (via === "email" && links.email) { location.href = links.email + "?subject=" + encodeURIComponent("Message from " + name) + "&body=" + encodeURIComponent(text); status.textContent = "Your message is ready in your email app. Press send there."; }
      else if (links.whatsapp) { window.open(links.whatsapp + "?text=" + encodeURIComponent(text), "_blank", "noopener"); status.textContent = "Your message is ready in WhatsApp. Press send there."; }
    });
  }

  /* ---------- Count-up numbers ---------- */
  function countUp(el) {
    var end = parseFloat(el.dataset.count), pre = el.dataset.pre || "", suf = el.dataset.suf || "";
    if (reduce || isNaN(end)) { el.textContent = pre + end + suf; return; }
    var t0 = null, dur = 1400;
    function step(t) { if (!t0) t0 = t; var p = Math.min(1, (t - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - p, 3))); el.textContent = pre + v + suf; if (p < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal, [data-count]");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        if (en.target.dataset.count) countUp(en.target);
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) { el.classList.add("in"); if (el.dataset.count) countUp(el); }
      else io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); if (el.dataset.count) el.textContent = (el.dataset.pre || "") + el.dataset.count + (el.dataset.suf || ""); });
  }

  /* ---------- Google Sheet: live materials list ----------
     If config.js has sheetCsvUrl, the materials list is read from that published sheet.
     If the sheet can't be loaded, the list in materials-data.js is used instead. */
  function parseCSV(text) {
    var rows = [], row = [], cell = "", q = false;
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (q) { if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += c; }
      else if (c === '"') q = true;
      else if (c === ",") { row.push(cell); cell = ""; }
      else if (c === "\n" || c === "\r") { if (c === "\r" && text[i + 1] === "\n") i++; row.push(cell); rows.push(row); row = []; cell = ""; }
      else cell += c;
    }
    if (cell !== "" || row.length) { row.push(cell); rows.push(row); }
    return rows;
  }
  function toDate(v) {
    v = String(v || "").trim(); if (!v) return "";
    var m = v.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/); if (m) return m[1] + "-" + m[2].padStart(2, "0") + "-" + m[3].padStart(2, "0");
    m = v.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})/);
    if (m) { var a = +m[1], b = +m[2], day = a, mon = b; if (b > 12 && a <= 12) { day = b; mon = a; } // DD/MM/YYYY, or MM/DD/YYYY when obvious
      return m[3] + "-" + String(mon).padStart(2, "0") + "-" + String(day).padStart(2, "0"); }
    var d = new Date(v); return isNaN(d) ? "" : d.toISOString().slice(0, 10);
  }
  function rowsToFiles(rows) {
    if (!rows.length) return [];
    var head = rows[0].map(function (h) { return h.trim().toLowerCase(); });
    function col(r, names) { for (var i = 0; i < names.length; i++) { var k = head.indexOf(names[i]); if (k > -1) return (r[k] || "").trim(); } return ""; }
    var typeMap = { guide: "guide", notes: "notes", note: "notes", pyq: "pyq", "previous year questions": "pyq", revision: "revision", mock: "mock", "practice paper": "mock", practice: "mock" };
    return rows.slice(1).map(function (r) {
      var title = col(r, ["title"]); if (!title) return null;
      var show = col(r, ["show", "visible", "publish"]).toLowerCase(); if (show === "no" || show === "false" || show === "hide") return null;
      var unitRaw = col(r, ["unit"]); var unit = parseInt(unitRaw, 10); if (isNaN(unit)) unit = 0;
      function yes(v) { v = v.toLowerCase(); return v === "yes" || v === "y" || v === "true"; }
      return { unit: unit, type: typeMap[col(r, ["type"]).toLowerCase()] || "notes", title: title,
        desc: col(r, ["description", "desc"]), url: col(r, ["link", "url", "drive link"]),
        added: toDate(col(r, ["date added", "added", "date"])), featured: yes(col(r, ["featured"])), fresh: yes(col(r, ["new upload", "new uploads", "new"])) };
    }).filter(Boolean);
  }
  if (CFG.sheetCsvUrl) {
    var sep = CFG.sheetCsvUrl.indexOf("?") > -1 ? "&" : "?";
    fetch(CFG.sheetCsvUrl + sep + "t=" + Math.floor(Date.now() / 60000), { cache: "no-store" })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (t) {
        var list = rowsToFiles(parseCSV(t));
        if (!list.length) return;
        FILES = list; renderFeatured(); renderNewUploads(); renderMaterials(); applyLatest();
      })
      .catch(function () { /* keep materials-data.js */ });
  }

  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  wireLinks();
})();
