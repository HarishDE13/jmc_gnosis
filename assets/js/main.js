/* JMC Genosis site script: language switch, menu, contact links, materials list. */
(function () {
  "use strict";

  var CFG = window.GENOSIS_CONFIG || {};
  var UNITS = window.GENOSIS_UNITS || [];
  var FILES = window.GENOSIS_MATERIALS || [];

  /* ---------- Tamil text (English lives in the HTML) ---------- */
  var TA = {
    "nav.home": "முகப்பு",
    "nav.materials": "இலவசக் குறிப்புகள்",
    "nav.about": "எங்களைப் பற்றி",
    "nav.contact": "தொடர்புக்கு",
    "nav.menu": "மெனு",
    "skip": "உள்ளடக்கத்துக்குச் செல்",

    "hero.kicker": "UGC-NET · SET · இதழியல் & மக்கள் தொடர்பியல் · பாடக் குறியீடு 063",
    "hero.title": "UGC-NET இதழியல் & மக்கள் தொடர்பியல், <span class=\"mark\">இப்போது தமிழில்.</span>",
    "hero.sub": "அலகு வாரியான இலவசக் குறிப்புகள், முந்தைய ஆண்டு வினாக்கள், விரைவு மீள்பார்வைத் தாள்கள்: தமிழிலும் ஆங்கிலத்திலும். நீங்கள் சிந்திக்கும் மொழியிலேயே JMC படிக்க விரும்பும் மாணவர்களுக்காக.",
    "cta.download": "இலவசக் குறிப்புகளைப் பெறுங்கள்",
    "cta.instagram": "Instagram-இல் பின்தொடருங்கள்",
    "hero.m1": "முற்றிலும் இலவசம்",
    "hero.m2": "தமிழ் + ஆங்கிலம்",
    "hero.m3": "பதிவு தேவையில்லை",

    "steps.kicker": "பதிவிறக்குவது எப்படி",
    "steps.title": "மூன்று படிகளில் உங்கள் குறிப்புகள்",
    "steps.1t": "அலகைத் தேர்ந்தெடுங்கள்",
    "steps.1p": "பாடத்திட்டத்தின் 10 அலகுகளில் எதை இப்போது படிக்கிறீர்களோ அதைத் தேர்ந்தெடுங்கள்.",
    "steps.2t": "மொழியைத் தேர்ந்தெடுங்கள்",
    "steps.2p": "தமிழ், ஆங்கிலம் அல்லது இரண்டும். ஒவ்வொரு குறிப்புக்கும் மொழிக் குறி உண்டு.",
    "steps.3t": "PDF-ஐப் பதிவிறக்குங்கள்",
    "steps.3p": "பதிவிறக்கு பொத்தானை அழுத்துங்கள். கணக்கு தேவையில்லை, கட்டணம் இல்லை.",

    "units.kicker": "பாடத்திட்டம் · தாள் II",
    "units.title": "10 அலகுகள், ஒவ்வொன்றும் தமிழில் விளக்கம்",
    "units.lead": "ஒரு அலகைத் தொட்டால் அதற்கான குறிப்புகள் திறக்கும்.",
    "units.note": "அலகுப் பெயர்கள் சுருக்கமானவை. முழுப் பாடத்திட்டத்துக்கு UGC அதிகாரப்பூர்வ அறிவிப்பைப் பாருங்கள்.",

    "facts.kicker": "தேர்வு அமைப்பு",
    "facts.title": "UGC-NET தேர்வு ஒரு பார்வையில்",
    "facts.l1": "JMC பாடக் குறியீடு",
    "facts.l2": "தாள் II வினாக்கள் (200 மதிப்பெண்)",
    "facts.l3": "தாள் I வினாக்கள் (100 மதிப்பெண்)",
    "facts.l4": "மணி நேரம், இரு தாள்களும் சேர்த்து",
    "facts.note": "தமிழ்நாடு SET (TNSET) தேர்வுக்கும் இதே பாடப் பகுதிகள் பெரும்பாலும் பொருந்தும். தேர்வுக்கு முன் சமீபத்திய அறிவிப்பைச் சரிபாருங்கள்.",

    "why.kicker": "ஏன் JMC Genosis",
    "why.title": "கலைச்சொற்கள் ஆங்கிலத்தில், புரிதல் தமிழில்",
    "why.lead": "தேர்வு வினாக்கள் ஆங்கிலக் கலைச்சொற்களைப் பயன்படுத்துகின்றன. நாங்கள் ஒவ்வொரு சொல்லையும் தமிழில் விளக்கி, ஆங்கிலச் சொல்லையும் அருகிலேயே வைக்கிறோம்.",
    "why.1": "தமிழில் JMC UGC-NET கற்பிக்கும் முதல் தளம்",
    "why.2": "ஒவ்வொரு அலகுக்கும் தமிழ், ஆங்கிலக் குறிப்புகள்",
    "why.3": "முந்தைய ஆண்டு வினாக்களின் அடிப்படையில் தயாரிப்பு",
    "why.4": "புதிய குறிப்புகள் முதலில் Instagram-இல் அறிவிக்கப்படும்",
    "gloss.h1": "ஆங்கிலக் கலைச்சொல்",
    "gloss.h2": "தமிழில்",

    "band.title": "புதிய குறிப்புகளை முதலில் பெறுங்கள்",
    "band.p": "ஒவ்வொரு புதிய PDF, தேர்வு அறிவிப்பு, விரைவு வினாடி வினா ஆகியவற்றை Instagram-இல் பகிர்கிறோம்.",

    "faq.kicker": "கேள்விகள்",
    "faq.title": "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    "faq.q1": "குறிப்புகள் உண்மையிலேயே இலவசமா?",
    "faq.a1": "ஆம். இந்தத் தளத்தில் உள்ள அனைத்துக் குறிப்புகளும் இலவசம். பதிவிறக்கக் கணக்கு தேவையில்லை.",
    "faq.q2": "எந்தத் தேர்வுகளுக்கு இது உதவும்?",
    "faq.a2": "UGC-NET இதழியல் & மக்கள் தொடர்பியல் தாள் II (பாடக் குறியீடு 063) மற்றும் தமிழ்நாடு SET தேர்வுக்கு.",
    "faq.q3": "எல்லா அலகுகளுக்கும் குறிப்புகள் இப்போது கிடைக்குமா?",
    "faq.a3": "குறிப்புகளைப் படிப்படியாக வெளியிடுகிறோம். இன்னும் வராதவை \"விரைவில்\" எனக் காட்டப்படும். புதியவை வந்ததும் Instagram-இல் அறிவிப்போம்.",
    "faq.q4": "பணம் செலுத்தும் வகுப்புகள் உள்ளனவா?",
    "faq.a4": "இப்போது இல்லை. நேரடி வகுப்புகளைத் திட்டமிடுகிறோம். தொடங்கும்போது முதலில் Instagram-இல் தெரிவிப்போம்.",
    "faq.q5": "குறிப்பில் பிழை கண்டால் என்ன செய்வது?",
    "faq.a5": "தொடர்பு பக்கத்தின் வழியாகத் தெரிவியுங்கள். சரிசெய்து புதிய பதிப்பை வெளியிடுவோம்.",

    "foot.tag": "தமிழிலும் ஆங்கிலத்திலும் UGC-NET, SET இதழியல் & மக்கள் தொடர்பியல் தயாரிப்புக்கான இலவசக் குறிப்புகள்.",
    "foot.explore": "பக்கங்கள்",
    "foot.follow": "பின்தொடர",
    "foot.privacy": "தனியுரிமைக் கொள்கை",
    "foot.disclaimer": "JMC Genosis ஒரு சுயாதீனக் கல்வி முயற்சி. UGC, NTA அல்லது TNSET அமைப்புகளுடன் தொடர்புடையது அல்ல.",

    "mat.kicker": "இலவசப் பதிவிறக்கம்",
    "mat.title": "இலவசப் படிப்புக் குறிப்புகள்",
    "mat.lead": "அலகு, மொழி, வகை வாரியாக வடிகட்டுங்கள். பதிவிறக்கு பொத்தான் PDF-ஐப் புதிய தாவலில் திறக்கும்.",
    "mat.search": "தேடுக",
    "mat.searchph": "எ.கா. கோட்பாடுகள், PYQ, அலகு 3",
    "mat.unit": "அலகு",
    "mat.allunits": "எல்லா அலகுகளும்",
    "mat.lang": "மொழி",
    "mat.type": "வகை",
    "mat.all": "அனைத்தும்",
    "mat.t.notes": "குறிப்புகள்",
    "mat.t.pyq": "முந்தைய வினாக்கள்",
    "mat.t.revision": "மீள்பார்வை",
    "mat.t.mock": "பயிற்சித் தாள்",

    "links.title": "JMC Genosis இணைப்புகள்",
    "links.sub": "UGC-NET JMC, தமிழில். கீழே உள்ள இணைப்பைத் தேர்ந்தெடுங்கள்.",
    "links.l1": "இலவசக் குறிப்புகள் அனைத்தும்",
    "links.l1s": "அலகு வாரியான PDF, தமிழ் & ஆங்கிலம்",
    "links.l2": "சமீபத்திய பதிவிறக்கம்",
    "links.l3": "Instagram",
    "links.l4": "WhatsApp-இல் கேளுங்கள்",
    "links.l5": "இணையதளம்",

    "about.kicker": "எங்களைப் பற்றி",
    "about.title": "தமிழில் சிந்திக்கும் மாணவர்களுக்கான JMC",
    "contact.kicker": "தொடர்புக்கு",
    "contact.title": "எங்களுடன் பேசுங்கள்",
    "contact.lead": "குறிப்புகள், பிழைகள், புதிய தலைப்புக் கோரிக்கைகள்: எதுவாக இருந்தாலும் எழுதுங்கள்.",
    "contact.form": "செய்தி அனுப்ப",
    "contact.name": "உங்கள் பெயர்",
    "contact.msg": "செய்தி",
    "contact.send": "WhatsApp வழியாக அனுப்பு",
    "contact.sendmail": "மின்னஞ்சல் வழியாக அனுப்பு",

    "nf.title": "இந்தப் பக்கம் கிடைக்கவில்லை",
    "nf.p": "இணைப்பு மாறியிருக்கலாம். இலவசக் குறிப்புகள் பக்கம் அல்லது முகப்புக்குச் செல்லுங்கள்."
  };

  var TYPE_LABEL = {
    en: { notes: "Notes", pyq: "PYQ", revision: "Revision", mock: "Practice paper" },
    ta: { notes: "குறிப்புகள்", pyq: "முந்தைய வினாக்கள்", revision: "மீள்பார்வை", mock: "பயிற்சித் தாள்" }
  };
  var LANG_LABEL = {
    en: { ta: "Tamil", en: "English", both: "Tamil + English" },
    ta: { ta: "தமிழ்", en: "ஆங்கிலம்", both: "தமிழ் + ஆங்கிலம்" }
  };
  var UI = {
    en: { download: "Download PDF", soon: "Coming soon", isNew: "New", whole: "Whole paper", wholeTa: "முழுத் தாள்",
          count: function (a, t) { return a + " of " + t + " files ready to download"; },
          none: "No files match these filters yet. Try another unit or language.", unit: "Unit", toFill: "to fill" },
    ta: { download: "PDF பதிவிறக்கு", soon: "விரைவில்", isNew: "புதியது", whole: "முழுத் தாள்", wholeTa: "முழுத் தாள்",
          count: function (a, t) { return t + " கோப்புகளில் " + a + " பதிவிறக்கத் தயார்"; },
          none: "இந்த வடிகட்டிகளுக்குப் பொருந்தும் கோப்புகள் இன்னும் இல்லை. வேறு அலகு அல்லது மொழியைத் தேர்ந்தெடுங்கள்.", unit: "அலகு", toFill: "நிரப்ப வேண்டும்" }
  };

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  var lang = store("genosis-lang") === "ta" ? "ta" : "en";
  var params = new URLSearchParams(location.search);
  if (params.get("lang") === "ta" || params.get("lang") === "en") lang = params.get("lang");

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  /* ---------- Language ---------- */
  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
      var k = el.getAttribute("data-i18n");
      el.innerHTML = lang === "ta" && TA[k] ? TA[k] : el.dataset.en;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      if (el.dataset.enPh === undefined) el.dataset.enPh = el.getAttribute("placeholder") || "";
      var k = el.getAttribute("data-i18n-ph");
      el.setAttribute("placeholder", lang === "ta" && TA[k] ? TA[k] : el.dataset.enPh);
    });
    document.querySelectorAll(".lang-toggle button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    renderUnits();
    renderMaterials();
  }
  document.querySelectorAll(".lang-toggle button").forEach(function (b) {
    b.addEventListener("click", function () { lang = b.dataset.lang; store("genosis-lang", lang); applyLang(); });
  });

  /* ---------- Menu ---------- */
  var menuBtn = document.querySelector(".menu-btn");
  var nav = document.getElementById("site-nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
  }

  /* ---------- Contact links from config ---------- */
  function isSet(v) { return v && String(v).indexOf("REPLACE_ME") === -1; }
  var links = {
    instagram: isSet(CFG.instagramHandle) ? "https://instagram.com/" + CFG.instagramHandle : "",
    whatsapp: CFG.whatsappNumber ? "https://wa.me/" + CFG.whatsappNumber : "",
    email: isSet(CFG.email) ? "mailto:" + CFG.email : "",
    telegram: CFG.telegramUrl || "",
    youtube: CFG.youtubeUrl || ""
  };
  var labels = {
    instagram: isSet(CFG.instagramHandle) ? "@" + CFG.instagramHandle : "@your_handle",
    whatsapp: CFG.whatsappNumber ? "+" + CFG.whatsappNumber : "",
    email: isSet(CFG.email) ? CFG.email : "your@email",
    telegram: CFG.telegramUrl ? CFG.telegramUrl.replace(/^https?:\/\//, "") : "",
    youtube: CFG.youtubeUrl ? CFG.youtubeUrl.replace(/^https?:\/\//, "") : ""
  };
  document.querySelectorAll("[data-link]").forEach(function (el) {
    var k = el.getAttribute("data-link");
    if (links[k]) {
      el.setAttribute("href", links[k]);
      if (k !== "email") { el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener"); }
    } else if (k === "whatsapp" || k === "telegram" || k === "youtube") {
      var hideTarget = el.closest("[data-hide-empty]") || el;
      hideTarget.hidden = true;
    } else {
      el.setAttribute("href", "#");
      el.setAttribute("aria-disabled", "true");
      el.title = "Set this in assets/js/config.js";
    }
  });
  document.querySelectorAll("[data-label]").forEach(function (el) {
    var k = el.getAttribute("data-label");
    el.textContent = labels[k] || "";
    if (k !== "whatsapp" && !links[k]) {
      var tag = document.createElement("span");
      tag.className = "placeholder-note"; tag.textContent = "to fill";
      el.appendChild(document.createTextNode(" ")); el.appendChild(tag);
    }
  });

  /* ---------- Home: unit grid ---------- */
  function unitName(u) { return lang === "ta" ? u.ta : u.en; }
  function renderUnits() {
    var grid = document.getElementById("unit-grid");
    if (!grid) return;
    grid.innerHTML = UNITS.map(function (u) {
      var n = String(u.n).padStart(2, "0");
      return '<a class="unit" href="materials.html#unit-' + u.n + '">' +
        '<span class="num">' + (lang === "ta" ? "அலகு " : "UNIT ") + n + '</span>' +
        '<span class="t-en">' + esc(lang === "ta" ? u.ta : u.en) + '</span>' +
        '<span class="t-ta">' + esc(lang === "ta" ? u.en : u.ta) + '</span></a>';
    }).join("");
  }

  /* ---------- Materials page ---------- */
  var state = { q: "", unit: "all", lang: "all", type: "all" };
  function isNew(f) {
    if (!f.added || !f.url) return false;
    var d = new Date(f.added + "T00:00:00");
    return !isNaN(d) && (Date.now() - d.getTime()) < 14 * 864e5;
  }
  function matches(f) {
    if (state.unit !== "all" && String(f.unit) !== state.unit) return false;
    if (state.lang !== "all" && f.lang !== state.lang && f.lang !== "both") return false;
    if (state.type !== "all" && f.type !== state.type) return false;
    if (state.q) {
      var u = UNITS.filter(function (x) { return x.n === f.unit; })[0];
      var hay = [f.title, f.titleTa || "", TYPE_LABEL.en[f.type], TYPE_LABEL.ta[f.type], "unit " + f.unit, u ? u.en + " " + u.ta : "whole paper"].join(" ").toLowerCase();
      if (hay.indexOf(state.q.toLowerCase()) === -1) return false;
    }
    return true;
  }
  function fileCard(f) {
    var t = UI[lang];
    var tags = '<span class="tag">' + esc(TYPE_LABEL[lang][f.type] || f.type) + '</span>' +
      '<span class="tag ta">' + esc(LANG_LABEL[lang][f.lang] || f.lang) + '</span>' +
      (isNew(f) ? '<span class="tag" style="background:var(--marigold);color:var(--marigold-ink)">' + t.isNew + '</span>' : "");
    var btn = f.url
      ? '<a class="btn" href="' + esc(f.url) + '" target="_blank" rel="noopener">' + t.download + '</a>'
      : '<span class="btn is-disabled" aria-disabled="true">' + t.soon + '</span>';
    return '<article class="file"><div class="meta">' + tags + '</div><h3>' + esc(lang === "ta" && f.titleTa ? f.titleTa : f.title) + '</h3>' + btn + '</article>';
  }
  function renderMaterials() {
    var out = document.getElementById("materials");
    if (!out) return;
    var t = UI[lang];
    var unitSel = document.getElementById("f-unit");
    if (unitSel) {
      var cur = unitSel.value || state.unit;
      unitSel.innerHTML = '<option value="all">' + (lang === "ta" ? TA["mat.allunits"] : "All units") + '</option>' +
        '<option value="0">' + t.whole + '</option>' +
        UNITS.map(function (u) { return '<option value="' + u.n + '">' + t.unit + " " + u.n + ": " + esc(unitName(u)) + '</option>'; }).join("");
      unitSel.value = cur;
    }
    var list = FILES.filter(matches);
    var ready = list.filter(function (f) { return f.url; }).length;
    document.getElementById("result-count").textContent = t.count(ready, list.length);
    if (!list.length) { out.innerHTML = '<div class="empty">' + t.none + '</div>'; return; }
    var groups = [{ n: 0, en: t.whole, ta: t.wholeTa }].concat(UNITS);
    out.innerHTML = groups.map(function (u) {
      var items = list.filter(function (f) { return f.unit === u.n; });
      if (!items.length) return "";
      items.sort(function (a, b) { return (b.url ? 1 : 0) - (a.url ? 1 : 0); });
      var head = u.n === 0
        ? '<span class="num">' + (lang === "ta" ? "முழுத் தாள்" : "WHOLE PAPER") + '</span>'
        : '<span class="num">' + (lang === "ta" ? "அலகு " : "UNIT ") + String(u.n).padStart(2, "0") + '</span>' + esc(unitName(u)) +
          '<span class="ta">' + esc(lang === "ta" ? u.en : u.ta) + '</span>';
      return '<section class="unit-group"><h2 id="unit-' + u.n + '">' + head + '</h2><div class="files">' + items.map(fileCard).join("") + '</div></section>';
    }).join("");
  }
  function bindFilters() {
    var q = document.getElementById("f-q");
    if (!q) return;
    q.addEventListener("input", function () { state.q = q.value.trim(); renderMaterials(); });
    document.getElementById("f-unit").addEventListener("change", function (e) { state.unit = e.target.value; renderMaterials(); });
    document.querySelectorAll(".chips[data-filter]").forEach(function (group) {
      group.addEventListener("click", function (e) {
        var b = e.target.closest(".chip"); if (!b) return;
        group.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", String(c === b)); });
        state[group.dataset.filter] = b.dataset.value; renderMaterials();
      });
    });
    var m = location.hash.match(/^#unit-(\d+)$/);
    if (m) { state.unit = "all"; setTimeout(function () { var el = document.getElementById("unit-" + m[1]); if (el) el.scrollIntoView(); }, 50); }
  }

  /* ---------- Latest file (links page) ---------- */
  function renderLatest() {
    var el = document.getElementById("latest-link");
    if (!el) return;
    var ready = FILES.filter(function (f) { return f.url; });
    ready.sort(function (a, b) { return (b.added || "").localeCompare(a.added || ""); });
    if (ready.length) {
      el.href = ready[0].url; el.target = "_blank"; el.rel = "noopener";
      el.querySelector("small").textContent = ready[0].title;
    } else { el.hidden = true; }
  }

  /* ---------- Contact form: hands the message to WhatsApp or email ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("c-name").value.trim();
      var msg = document.getElementById("c-msg").value.trim();
      var text = "Hi JMC Genosis, I'm " + name + ".\n\n" + msg;
      var via = e.submitter && e.submitter.dataset.via;
      var status = document.getElementById("c-status");
      if (via === "email" && links.email) {
        location.href = links.email + "?subject=" + encodeURIComponent("Message from " + name) + "&body=" + encodeURIComponent(text);
        status.textContent = lang === "ta" ? "உங்கள் மின்னஞ்சல் செயலியில் செய்தி தயாராக உள்ளது." : "Your message is ready in your email app. Press send there.";
      } else if (links.whatsapp) {
        window.open(links.whatsapp + "?text=" + encodeURIComponent(text), "_blank", "noopener");
        status.textContent = lang === "ta" ? "WhatsApp-இல் செய்தி தயாராக உள்ளது. அங்கே அனுப்புங்கள்." : "Your message is ready in WhatsApp. Press send there.";
      } else {
        status.textContent = "Contact details have not been set yet (assets/js/config.js).";
      }
    });
    if (!links.whatsapp) { var wb = form.querySelector('[data-via="whatsapp"]'); if (wb) wb.hidden = true; }
  }

  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  bindFilters();
  renderLatest();
  applyLang();
})();
