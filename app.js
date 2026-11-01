(function () {
  "use strict";

  var STORE_KEY = "xiaobu.habits.v1";
  var TODAY_KEY = dateKey(new Date());
  var ICON = {
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.1"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 8.9 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 8.9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1.03-1.56V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15.1 4.6a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9v.09a1.7 1.7 0 0 0 1.56 1.03H21a2 2 0 1 1 0 4h-.09A1.7 1.7 0 0 0 19.4 15z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9.5 7H17v7.5"/></svg>',
    chev: '<svg class="row-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5.5l6.5 6.5L9 18.5"/></svg>',
    chevL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5.5L8.5 12l6.5 6.5"/></svg>',
    chevR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5.5l6.5 6.5L9 18.5"/></svg>',
    tick: '<svg class="tick" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5.5 12.5l4.2 4.2 8.8-9.2"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>',
    palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 0 18h1.6a2.2 2.2 0 0 0 0-4.4H12a1.7 1.7 0 0 1 0-3.4h5.4A3.6 3.6 0 0 0 21 9.6 6.6 6.6 0 0 0 14.4 3z"/><circle cx="7.8" cy="10.2" r="1.1"/><circle cx="10.4" cy="6.9" r="1.1"/><circle cx="15.2" cy="6.9" r="1.1"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 6.5h11M8.5 12h11M8.5 17.5h11"/><circle cx="4.6" cy="6.5" r="1"/><circle cx="4.6" cy="12" r="1"/><circle cx="4.6" cy="17.5" r="1"/></svg>',
    box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5l8 4.2v8.6l-8 4.2-8-4.2V7.7z"/><path d="M4 7.7l8 4.3 8-4.3M12 12v8.5"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v10.5M7.8 10.6L12 14.8l4.2-4.2M4.5 19.5h15"/></svg>',
    upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V4.5M7.8 8.7L12 4.5l4.2 4.2M4.5 19.5h15"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 7h15M9.5 7V5.4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V7M6.5 7l.8 12a1.6 1.6 0 0 0 1.6 1.5h6.2a1.6 1.6 0 0 0 1.6-1.5l.8-12"/></svg>',
    sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6zM18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5.5v13M5.5 12h13"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.2 5.4v13.2a1 1 0 0 0 1.54.84l10.1-6.6a1 1 0 0 0 0-1.68L9.74 4.56A1 1 0 0 0 8.2 5.4z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6.4" y="5" width="4.2" height="14" rx="1.5"/><rect x="13.4" y="5" width="4.2" height="14" rx="1.5"/></svg>',
    reset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12a7.5 7.5 0 1 0 2.3-5.4M4.5 4.8v4.6h4.6"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.4"/><path d="M12 7.4V12l3.1 1.9"/></svg>',
    note: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5.5 4.5h13v15l-4-3-4 3-5-3z"/><path d="M9 9h6M9 12.5h4"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.2 13.8a4.4 4.4 0 0 0 6.2 0l2.3-2.3a4.4 4.4 0 0 0-6.2-6.2l-1 1"/><path d="M13.8 10.2a4.4 4.4 0 0 0-6.2 0l-2.3 2.3a4.4 4.4 0 0 0 6.2 6.2l1-1"/></svg>'
  };

  var EMOJIS = ["🌅", "📚", "🏃", "💧", "🧘", "💻", "🎧", "🌿", "✍️", "🛏️", "🍎", "🎯", "🧠", "🪴", "🚀", "☀️"];
  var COLORS = ["#5e5ce6", "#0a84ff", "#30d158", "#ff9f0a", "#ff375f", "#64d2ff"];
  var WEEK_LABELS = ["一", "二", "三", "四", "五", "六", "日"];
  var WEEK_FULL = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  var QUOTES = [
    "完成比完美更重要，先做两分钟。",
    "不需要每天满分，只需要每天出现。",
    "把目标调小，把频率调高。",
    "今天的一小步，是明天的默认设置。",
    "状态是做出来的，不是等出来的。"
  ];
  var CHEERS = [
    "做得好，继续保持 ✨",
    "又向前一步 👏",
    "这一下很关键 ✅",
    "节奏稳住了 🔥",
    "给自己一点掌声 🌱"
  ];
  var FOCUS_MODES = {
    focus: { label: "专注", minutes: 25, hint: "只做一件事" },
    short: { label: "短休", minutes: 5, hint: "喝水，远眺" },
    long: { label: "长休", minutes: 15, hint: "离开屏幕" }
  };
  var FOCUS_ORDER = ["focus", "short", "long"];
  var NOTE_PRIO = {
    1: { label: "P1", color: "#ff453a" },
    2: { label: "P2", color: "#ff9f0a" },
    3: { label: "P3", color: "#8e8e93" }
  };
  var LINK_SEED = [
    { name: "Notion", icon: "📝", url: "https://www.notion.so", color: "#5e5ce6" },
    { name: "GitHub", icon: "💻", url: "https://github.com", color: "#8e8e93" },
    { name: "AI 助手", icon: "🤖", url: "https://chatgpt.com", color: "#30d158" },
    { name: "Figma", icon: "🎨", url: "https://www.figma.com", color: "#ff375f" },
    { name: "B 站", icon: "📺", url: "https://www.bilibili.com", color: "#64d2ff" },
    { name: "邮箱", icon: "✉️", url: "https://mail.google.com", color: "#ff9f0a" }
  ];

  var elView = document.getElementById("view");
  var elTabbar = document.getElementById("tabbar");
  var elFab = document.getElementById("fab");
  var elSheet = document.getElementById("sheetRoot");
  var elToast = document.getElementById("toast");

  var state = loadState();
  var ui = {
    view: "today",
    month: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    selected: TODAY_KEY,
    editingId: null,
    nameDraft: "",
    emojiDraft: EMOJIS[0],
    colorDraft: COLORS[0],
    goalDraft: 1,
    pulse: null,
    sheetOpen: false,
    linkEdit: false,
    showLinkForm: false,
    showTaskForm: false,
    notePrio: 2
  };

  var focus = { mode: "focus", total: 25 * 60, left: 25 * 60, running: false, audio: false, audioCtx: null, audioNode: null };
  var toastTimer = null;
  var pulseTimer = null;
  var clockTimer = null;

  function dateKey(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function parseKey(k) {
    var p = k.split("-");
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }

  function addDays(d, n) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  }

  function uid() {
    return Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function tint(hex, a) {
    var h = hex.replace("#", "");
    if (h.length === 3) h = h.split("").map(function (c) { return c + c; }).join("");
    return "rgba(" + parseInt(h.slice(0, 2), 16) + "," + parseInt(h.slice(2, 4), 16) + "," + parseInt(h.slice(4, 6), 16) + "," + a + ")";
  }

  function pseudo(str, n) {
    var h = 2166136261;
    var s = str + "|" + n;
    for (var i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return ((h >>> 0) % 10000) / 10000;
  }

  function normalizeHabit(h) {
    return {
      id: h.id || uid(),
      name: String(h.name || "新习惯").slice(0, 20),
      emoji: h.emoji || "🎯",
      color: /^#[0-9a-fA-F]{6}$/.test(h.color || "") ? h.color : COLORS[0],
      goal: Math.min(12, Math.max(1, Number(h.goal) || 1)),
      createdAt: h.createdAt || TODAY_KEY,
      logs: h.logs && typeof h.logs === "object" ? h.logs : {}
    };
  }

  function normalizeLink(l) {
    var url = String(l.url || "").trim();
    if (url && !/^https?:\/\//i.test(url)) url = "https://" + url;
    return {
      id: l.id || uid(),
      name: String(l.name || "链接").slice(0, 20),
      icon: String(l.icon || "🔗").slice(0, 4),
      url: url,
      color: /^#[0-9a-fA-F]{6}$/.test(l.color || "") ? l.color : COLORS[0]
    };
  }

  function normalizeNote(n) {
    var p = Number(n.priority);
    return {
      id: n.id || uid(),
      text: String(n.text || "").slice(0, 80),
      done: !!n.done,
      priority: p === 1 || p === 3 ? p : 2,
      createdAt: Number(n.createdAt) || Date.now()
    };
  }

  function normalizeTime(v) {
    var m = /^(\d{1,2}):(\d{2})$/.exec(String(v || ""));
    if (!m) return "09:00";
    return String(Math.min(23, Number(m[1]))).padStart(2, "0") + ":" + m[2];
  }

  function normalizeTask(t) {
    return {
      id: t.id || uid(),
      time: normalizeTime(t.time),
      title: String(t.title || "新安排").slice(0, 40),
      done: !!t.done
    };
  }

  function seedLinks() {
    return LINK_SEED.map(function (l) {
      return normalizeLink({ id: uid(), name: l.name, icon: l.icon, url: l.url, color: l.color });
    });
  }

  function seedNotes() {
    return [
      { id: uid() + "n1", text: "把本周的课程作业列个优先级", done: false, priority: 1, createdAt: Date.now() - 3000 },
      { id: uid() + "n2", text: "给客户发一版首页草稿", done: false, priority: 2, createdAt: Date.now() - 2000 },
      { id: uid() + "n3", text: "买一包咖啡豆", done: true, priority: 3, createdAt: Date.now() - 1000 }
    ];
  }

  function seedSchedule() {
    return [
      { id: uid() + "t1", time: "09:00", title: "阅读与笔记整理", done: false },
      { id: uid() + "t2", time: "14:00", title: "深度工作 2 小时", done: false },
      { id: uid() + "t3", time: "20:00", title: "运动 30 分钟", done: false }
    ];
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        var d = JSON.parse(raw);
        if (d && Array.isArray(d.habits)) {
          return {
            habits: d.habits.map(normalizeHabit),
            links: Array.isArray(d.links) ? d.links.map(normalizeLink) : seedLinks(),
            notes: Array.isArray(d.notes) ? d.notes.map(normalizeNote) : seedNotes(),
            schedule: Array.isArray(d.schedule) ? d.schedule.map(normalizeTask) : seedSchedule(),
            prefs: { theme: d.prefs && d.prefs.theme ? d.prefs.theme : "system" }
          };
        }
      }
    } catch (e) {}
    return seedState();
  }

  function seedState() {
    var today = new Date();
    var base = [
      { name: "早起", emoji: "🌅", color: "#ff9f0a", goal: 1, p: 0.86, forced: 7 },
      { name: "阅读 30 分钟", emoji: "📚", color: "#5e5ce6", goal: 1, p: 0.7, forced: 5 },
      { name: "运动一下", emoji: "🏃", color: "#30d158", goal: 1, p: 0.58, forced: 3 },
      { name: "喝水", emoji: "💧", color: "#64d2ff", goal: 5, p: 0.52, forced: 2 }
    ];
    var habits = base.map(function (b, idx) {
      var h = {
        id: uid() + idx,
        name: b.name,
        emoji: b.emoji,
        color: b.color,
        goal: b.goal,
        createdAt: dateKey(addDays(today, -29)),
        logs: {}
      };
      for (var i = 30; i >= 1; i--) {
        var d = addDays(today, -i);
        var near = 30 - i < b.forced;
        var roll = pseudo(h.id, i);
        if (near || roll < b.p) {
          if (h.goal === 1) {
            h.logs[dateKey(d)] = 1;
          } else {
            var part = 2 + Math.floor(pseudo(h.id + "q", i) * (h.goal - 2));
            h.logs[dateKey(d)] = near ? h.goal : Math.max(1, Math.min(h.goal, part));
          }
        }
      }
      return h;
    });
    return {
      habits: habits,
      links: seedLinks(),
      notes: seedNotes(),
      schedule: seedSchedule(),
      prefs: { theme: "system" }
    };
  }

  function saveState() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function applyTheme() {
    var pref = state.prefs.theme || "system";
    var dark = pref === "dark" || (pref === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#000000" : "#F2F2F7");
  }

  function isDone(h, k) {
    return (h.logs[k] || 0) >= h.goal;
  }

  function streakOf(h) {
    var d = new Date();
    var guard = 0;
    if (!isDone(h, dateKey(d))) d = addDays(d, -1);
    var n = 0;
    while (isDone(h, dateKey(d)) && guard < 2000) {
      n++;
      guard++;
      d = addDays(d, -1);
    }
    return n;
  }

  function dayHasAny(d) {
    var k = dateKey(d);
    return state.habits.some(function (h) { return (h.logs[k] || 0) > 0; });
  }

  function overallStreak() {
    var d = new Date();
    if (!dayHasAny(d)) d = addDays(d, -1);
    var n = 0;
    while (dayHasAny(d) && n < 3650) {
      n++;
      d = addDays(d, -1);
    }
    return n;
  }

  function bestStreak() {
    var best = 0;
    state.habits.forEach(function (h) {
      var from = parseKey(h.createdAt);
      var end = new Date();
      var run = 0;
      for (var d = from; d <= end; d = addDays(d, 1)) {
        if (isDone(h, dateKey(d))) {
          run++;
          if (run > best) best = run;
        } else {
          run = 0;
        }
      }
    });
    return best;
  }

  function totalCheckins() {
    var total = 0;
    state.habits.forEach(function (h) {
      Object.keys(h.logs).forEach(function (k) { total += Number(h.logs[k]) || 0; });
    });
    return total;
  }

  function dayRatio(d) {
    var k = dateKey(d);
    if (state.habits.length === 0) return 0;
    var done = state.habits.filter(function (h) { return isDone(h, k); }).length;
    return done / state.habits.length;
  }

  function periodRate(days) {
    var end = new Date();
    var start = addDays(end, -(days - 1));
    var done = 0;
    var total = 0;
    state.habits.forEach(function (h) {
      var from = parseKey(h.createdAt);
      if (from < start) from = start;
      for (var d = from; d <= end; d = addDays(d, 1)) {
        total++;
        if (isDone(h, dateKey(d))) done++;
      }
    });
    return total ? Math.round((done / total) * 100) : 0;
  }

  function habitRate(h, days) {
    var end = new Date();
    var start = addDays(end, -(days - 1));
    var from = parseKey(h.createdAt);
    if (from < start) from = start;
    var done = 0;
    var total = 0;
    for (var d = from; d <= end; d = addDays(d, 1)) {
      total++;
      if (isDone(h, dateKey(d))) done++;
    }
    return total ? Math.round((done / total) * 100) : 0;
  }

  function monthRate(y, m) {
    var first = new Date(y, m, 1);
    var last = new Date(y, m + 1, 0);
    var now = new Date();
    var end = last > now ? now : last;
    var done = 0;
    var total = 0;
    state.habits.forEach(function (h) {
      var from = parseKey(h.createdAt);
      if (from < first) from = first;
      for (var d = from; d <= end; d = addDays(d, 1)) {
        total++;
        if (isDone(h, dateKey(d))) done++;
      }
    });
    return total ? Math.round((done / total) * 100) : 0;
  }

  function weekStart(d) {
    var x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    var off = (x.getDay() + 6) % 7;
    return addDays(x, -off);
  }

  function cnDate(d) {
    return (d.getMonth() + 1) + "月" + d.getDate() + "日 " + WEEK_FULL[d.getDay()];
  }

  function greeting() {
    var h = new Date().getHours();
    if (h < 6) return "夜深了";
    if (h < 11) return "早上好";
    if (h < 14) return "中午好";
    if (h < 18) return "下午好";
    return "晚上好";
  }

  function ringSvg(ratio, size, cls) {
    var c = 2 * Math.PI * (size > 50 ? 36 : 20);
    var r = size > 50 ? 36 : 20;
    var off = c * (1 - Math.max(0, Math.min(1, ratio)));
    return '<svg class="' + cls + '" viewBox="0 0 ' + size + " " + size + '" aria-hidden="true"><circle class="track" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '"/><circle class="progress" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" stroke-dasharray="' + c.toFixed(2) + '" stroke-dashoffset="' + off.toFixed(2) + '"/></svg>';
  }

  function checkRing(ratio) {
    var c = 2 * Math.PI * 20;
    var off = c * (1 - Math.max(0, Math.min(1, ratio)));
    return '<svg class="ring" viewBox="0 0 44 44" aria-hidden="true"><circle class="track" cx="22" cy="22" r="20"/><circle class="fg" cx="22" cy="22" r="20" stroke-dasharray="' + c.toFixed(2) + '" stroke-dashoffset="' + off.toFixed(2) + '"/></svg>';
  }

  function habitCard(h) {
    var k = TODAY_KEY;
    var logs = h.logs[k] || 0;
    var done = logs >= h.goal;
    var ratio = Math.min(1, logs / h.goal);
    var st = streakOf(h);
    var style = "--c:" + h.color + ";--tint:" + tint(h.color, 0.16);
    return '<article class="card habit" style="' + style + '">' +
      '<div class="habit-ico">' + h.emoji + "</div>" +
      '<div class="habit-main"><div class="habit-name">' + esc(h.name) + "</div>" +
      '<div class="habit-meta"><span>' + (st > 0 ? "连续 " + st + " 天" : "今天开始") + '</span><i class="dot"></i><span>每日 ' + h.goal + " 次</span></div></div>" +
      '<button class="check ' + (done ? "is-done " : "") + (ui.pulse === h.id ? "pop" : "") + '" data-check="' + h.id + '" aria-label="' + (done ? "取消打卡 " : "打卡 ") + esc(h.name) + '">' +
      checkRing(ratio) +
      '<span class="num">' + logs + "/" + h.goal + "</span>" +
      ICON.tick +
      "</button>" +
      '<button class="more" data-edit="' + h.id + '" aria-label="编辑 ' + esc(h.name) + '">' + ICON.arrow + "</button>" +
      "</article>";
  }

  function quickCard(view, emoji, title, sub, color) {
    return '<button class="quick" data-view="' + view + '" style="--tint:' + tint(color, 0.16) + '">' +
      '<span class="quick-ico">' + emoji + "</span>" +
      '<span class="quick-t">' + title + " " + ICON.chev + "</span>" +
      '<span class="quick-s">' + sub + "</span></button>";
  }

  function quoteCard() {
    var q = QUOTES[new Date().getDate() % QUOTES.length];
    return '<div class="quote"><span class="mark">“</span><p>' + q + "</p></div>";
  }

  function clockText() {
    var n = new Date();
    return String(n.getHours()).padStart(2, "0") + ":" + String(n.getMinutes()).padStart(2, "0");
  }

  function fmtFocus(sec) {
    var s = Math.max(0, sec);
    return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
  }

  function focusCard() {
    var m = FOCUS_MODES[focus.mode];
    var pct = focus.total ? Math.min(100, Math.max(0, ((focus.total - focus.left) / focus.total) * 100)) : 0;
    var modes = FOCUS_ORDER.map(function (key) {
      return '<button class="focus-mode' + (focus.mode === key ? " on" : "") + '" data-act="focus-mode" data-mode="' + key + '">' + FOCUS_MODES[key].label + "</button>";
    }).join("");
    return '<section class="card focus-card">' +
      '<div class="focus-head"><span class="focus-title">' + ICON.clock + "<span>专注计时</span></span>" +
      '<button class="chip-btn' + (focus.audio ? " on" : "") + '" id="ambientBtn" data-act="ambient" aria-label="环境音开关">🎧 环境音</button></div>' +
      '<div class="focus-main"><div class="focus-left"><div class="focus-time" id="focusTime">' + fmtFocus(focus.left) + "</div>" +
      '<div class="focus-hint" id="focusHint">' + (focus.running ? m.hint : "准备好就开始") + "</div></div>" +
      '<button class="focus-play' + (focus.running ? " is-running" : "") + '" data-act="focus-toggle" id="focusToggle" aria-label="开始或暂停计时">' + (focus.running ? ICON.pause : ICON.play) + "</button></div>" +
      '<div class="focus-bar"><i id="focusBar" style="width:' + pct + '%"></i></div>' +
      '<div class="focus-foot"><div class="focus-modes">' + modes + "</div>" +
      '<button class="focus-reset" data-act="focus-reset" aria-label="重置计时">' + ICON.reset + "</button></div></section>";
  }

  function linksCard() {
    var tiles = state.links.map(function (l) {
      return '<div class="link-cell">' +
        '<a class="link-tile" href="' + esc(l.url) + '" target="_blank" rel="noreferrer" style="--tint:' + tint(l.color, 0.16) + '" aria-label="打开 ' + esc(l.name) + '">' +
        '<span class="link-ico">' + l.icon + "</span>" +
        '<span class="link-name">' + esc(l.name) + "</span></a>" +
        (ui.linkEdit ? '<button class="link-del" data-act="delete-link" data-id="' + l.id + '" aria-label="删除 ' + esc(l.name) + '">' + ICON.close + "</button>" : "") +
        "</div>";
    }).join("");
    var add = state.links.length < 12
      ? '<div class="link-cell"><button class="link-tile is-add" data-act="toggle-link-form"><span class="link-ico">' + ICON.plus + '</span><span class="link-name">添加</span></button></div>'
      : "";
    return '<section class="card links-card"><div class="card-head"><span class="card-title">快捷导航</span>' +
      '<button class="mini-link" data-act="toggle-link-edit">' + (ui.linkEdit ? "完成" : "编辑") + "</button></div>" +
      '<div class="link-grid">' + tiles + add + "</div>" +
      (ui.showLinkForm ? linkFormHTML() : "") +
      "</section>";
  }

  function linkFormHTML() {
    return '<div class="inline-form"><div class="inline-cols">' +
      '<input class="input sm" id="linkNameInput" maxlength="20" placeholder="名称，如 课程表" />' +
      '<input class="input sm icon-input" id="linkIconInput" maxlength="4" placeholder="🔗" /></div>' +
      '<input class="input sm" id="linkUrlInput" placeholder="https://..." />' +
      '<div class="inline-actions"><button class="btn-text" data-act="cancel-link-form">取消</button>' +
      '<button class="btn-sm" data-act="save-link">添加</button></div></div>';
  }

  function noteItem(n) {
    var p = NOTE_PRIO[n.priority] || NOTE_PRIO[2];
    return '<div class="note-item' + (n.done ? " is-done" : "") + '">' +
      '<button class="note-check" data-act="toggle-note" data-id="' + n.id + '" style="--c:' + p.color + '" aria-label="勾选便签">' + (n.done ? ICON.tick : "") + "</button>" +
      '<span class="note-text">' + esc(n.text) + "</span>" +
      '<span class="prio-dot" style="background:' + p.color + '"></span>' +
      '<button class="note-del" data-act="delete-note" data-id="' + n.id + '" aria-label="删除便签">' + ICON.close + "</button>" +
      "</div>";
  }

  function notesCard() {
    var sorted = state.notes.slice().sort(function (a, b) {
      return (a.done ? 1 : 0) - (b.done ? 1 : 0) || b.createdAt - a.createdAt;
    });
    var list = sorted.map(noteItem).join("");
    return '<section class="card notes-card"><div class="card-head"><span class="card-title">闪念便签</span><span class="card-sub">随手记，不打断</span></div>' +
      '<div class="note-add"><button class="prio p' + ui.notePrio + '" data-act="cycle-prio" aria-label="切换优先级">' + NOTE_PRIO[ui.notePrio].label + "</button>" +
      '<input class="note-input" id="noteInput" maxlength="80" placeholder="记下一个念头…" />' +
      '<button class="note-submit" data-act="save-note" aria-label="记录便签">' + ICON.plus + "</button></div>" +
      '<div class="note-list">' + (list || '<div class="mini-empty">还没有便签，想到什么就记下来。</div>') + "</div></section>";
  }

  function scheduleCard() {
    var sorted = state.schedule.slice().sort(function (a, b) { return a.time.localeCompare(b.time); });
    var items = sorted.map(function (t) {
      return '<div class="tl-item' + (t.done ? " is-done" : "") + '">' +
        '<button class="tl-dot" data-act="toggle-task" data-id="' + t.id + '" aria-label="标记完成"></button>' +
        '<div class="tl-body"><span class="tl-time">' + t.time + '</span><span class="tl-title">' + esc(t.title) + "</span></div>" +
        '<button class="tl-del" data-act="delete-task" data-id="' + t.id + '" aria-label="删除安排">' + ICON.close + "</button></div>";
    }).join("");
    return '<section class="card schedule-card"><div class="card-head"><span class="card-title">今日时间块</span>' +
      '<button class="mini-link" data-act="toggle-task-form">' + (ui.showTaskForm ? "收起" : "＋ 添加") + "</button></div>" +
      (ui.showTaskForm ? taskFormHTML() : "") +
      '<div class="timeline">' + (items || '<div class="mini-empty">今天还没有安排，留白也很好。</div>') + "</div></section>";
  }

  function taskFormHTML() {
    return '<div class="inline-form"><div class="inline-cols">' +
      '<input class="input sm time-input" id="taskTimeInput" type="time" value="09:00" />' +
      '<input class="input sm" id="taskTitleInput" maxlength="40" placeholder="这段时间做什么" /></div>' +
      '<div class="inline-actions"><button class="btn-text" data-act="cancel-task-form">取消</button>' +
      '<button class="btn-sm" data-act="save-task">添加</button></div></div>';
  }

  function todayHTML() {
    var today = new Date();
    var total = state.habits.length;
    var done = state.habits.filter(function (h) { return isDone(h, TODAY_KEY); }).length;
    var pct = total ? Math.round((done / total) * 100) : 0;
    var left = total - done;
    var streak = overallStreak();
    var habitHtml = total
      ? '<div class="habit-list stagger">' + state.habits.map(habitCard).join("") + "</div>"
      : emptyState();
    return '<header class="page-head"><div><div class="eyebrow">' + cnDate(today) + " · " + greeting() + '</div><h1>今天</h1></div>' +
      '<div class="head-tools"><span class="clock-pill" id="liveClock">' + clockText() + "</span>" +
      '<button class="icon-btn" data-view="settings" aria-label="设置">' + ICON.gear + "</button></div></header>" +
      '<section class="card hero"><div class="hero-top"><div><div class="hero-label">今日进度</div>' +
      '<div class="hero-big">' + done + "<span>/" + total + "</span></div>" +
      '<div class="hero-sub">' + (total === 0 ? "先添加一个想坚持的小目标" : left === 0 ? "今天全部完成，去享受生活吧" : "还有 " + left + " 个习惯等你完成") + "</div></div>" +
      '<div class="hero-ring">' + ringSvg(total ? done / total : 0, 86, "") + '<div class="pct">' + pct + "%</div></div></div>" +
      '<div class="hero-foot"><span class="pill">' + (streak > 0 ? "🔥 连续 " + streak + " 天" : "🌱 今天开始也不晚") + "</span>" +
      '<button class="hero-link" data-view="stats">查看统计 ' + ICON.arrow + "</button></div></section>" +
      focusCard() +
      '<div class="section-head"><h2>今日习惯</h2><button class="link" data-view="settings">管理</button></div>' +
      habitHtml +
      linksCard() +
      notesCard() +
      scheduleCard() +
      '<div class="section-head"><h2>一屏直达</h2><span class="card-sub">不用来回切换</span></div>' +
      '<div class="quick-grid stagger">' +
      quickCard("stats", "📊", "统计", "完成率与连续天数", COLORS[0]) +
      quickCard("calendar", "🗓", "日历", "每天的热力图", COLORS[3]) +
      quickCard("settings", "🎯", "我的习惯", total + " 个正在坚持", COLORS[2]) +
      '<button class="quick" data-act="new" style="--tint:' + tint(COLORS[4], 0.16) + '"><span class="quick-ico">⚡</span><span class="quick-t">快速新建 ' + ICON.chev + '</span><span class="quick-s">加一个小目标</span></button>' +
      "</div>" +
      quoteCard();
  }

  function emptyState() {
    return '<section class="card empty"><div class="big">🌱</div><h3>还没有习惯</h3><p>从一个两分钟就能完成的小事开始，<br>比一个宏大的计划更容易坚持。</p>' +
      '<button class="btn-primary" data-act="new">创建第一个习惯</button></section>';
  }

  function statsHTML() {
    var start = weekStart(new Date());
    var bars = "";
    var weekSum = 0;
    for (var i = 0; i < 7; i++) {
      var d = addDays(start, i);
      var r = dayRatio(d);
      weekSum += r;
      var isToday = dateKey(d) === TODAY_KEY;
      var hgt = Math.round(r * 100);
      bars += '<div class="bar-col' + (isToday ? " today" : "") + (hgt === 0 ? " is-empty" : "") + '">' +
        '<div class="bar-track"><div class="bar" style="height:' + Math.max(4, hgt) + '%"></div></div>' +
        '<span class="wd">' + WEEK_LABELS[i] + "</span></div>";
    }
    var weekRate = Math.round((weekSum / 7) * 100);
    var perf = state.habits.map(function (h) {
      var r = habitRate(h, 30);
      return '<div class="perf" style="--tint:' + tint(h.color, 0.16) + ";--c:" + h.color + '">' +
        '<div class="perf-ico">' + h.emoji + "</div>" +
        '<div><div class="perf-name">' + esc(h.name) + '</div><div class="perf-track"><div class="perf-bar" style="width:' + r + '%"></div></div></div>' +
        '<div class="perf-val">' + r + "%</div></div>";
    }).join("");
    return '<header class="page-head"><div><div class="eyebrow">数据</div><h1>统计</h1></div></header>' +
      '<section class="card"><div class="card-head"><span class="card-title">本周节奏</span><span class="card-sub">平均完成率 ' + weekRate + '%</span></div><div class="bars">' + bars + "</div></section>" +
      '<div class="stat-grid">' +
      '<div class="stat"><div class="v">' + totalCheckins() + '<small> 次</small></div><div class="k">总打卡</div></div>' +
      '<div class="stat"><div class="v">' + bestStreak() + '<small> 天</small></div><div class="k">最佳连续</div></div>' +
      '<div class="stat"><div class="v">' + periodRate(30) + '<small> %</small></div><div class="k">30 天完成率</div></div>' +
      "</div>" +
      '<div class="section-head"><h2>习惯表现</h2><span class="card-sub">最近 30 天</span></div>' +
      '<section class="card">' + (perf || '<div class="day-empty">还没有可统计的习惯</div>') + "</section>" +
      '<button class="btn-ghost mt-12" data-view="calendar">查看日历热力图</button>';
  }

  function calendarHTML() {
    var y = ui.month.getFullYear();
    var m = ui.month.getMonth();
    var first = new Date(y, m, 1);
    var offset = (first.getDay() + 6) % 7;
    var days = new Date(y, m + 1, 0).getDate();
    var cells = "";
    var i;
    for (i = 0; i < offset; i++) cells += '<div class="cal-cell blank"></div>';
    for (i = 1; i <= days; i++) {
      var d = new Date(y, m, i);
      var k = dateKey(d);
      var r = dayRatio(d);
      var opacity = r > 0 ? 0.14 + r * 0.78 : 0;
      var cls = "cal-cell";
      if (k === TODAY_KEY) cls += " today";
      if (k === ui.selected) cls += " is-sel";
      cells += '<button class="' + cls + '" data-day="' + k + '" aria-label="' + (m + 1) + ' 月 ' + i + ' 日">' +
        '<span class="fill" style="--i:' + opacity.toFixed(2) + '"></span>' +
        '<span class="d' + (opacity > 0.55 ? " deep" : "") + '">' + i + "</span></button>";
    }
    var tail = (7 - ((offset + days) % 7)) % 7;
    for (i = 0; i < tail; i++) cells += '<div class="cal-cell blank"></div>';
    var monthName = y + " 年 " + (m + 1) + " 月";
    var rate = monthRate(y, m);
    var sel = ui.selected;
    var future = sel > TODAY_KEY;
    var detailRows = state.habits.map(function (h) {
      var logs = h.logs[sel] || 0;
      var done = logs >= h.goal;
      return '<div class="day-row" style="--tint:' + tint(h.color, 0.16) + ";--c:" + h.color + '">' +
        '<span class="ico">' + h.emoji + "</span>" +
        '<span class="nm">' + esc(h.name) + "</span>" +
        '<span class="st ' + (done ? "ok" : "") + '">' + logs + "/" + h.goal + "</span></div>";
    }).join("");
    var selDate = parseKey(sel);
    var detailTitle = (selDate.getMonth() + 1) + "月" + selDate.getDate() + "日 " + WEEK_FULL[selDate.getDay()];
    var detailBody = future
      ? '<div class="day-empty">未来还没发生，先把今天过好。</div>'
      : (detailRows || '<div class="day-empty">这天还没有习惯记录。</div>');
    return '<header class="page-head"><div><div class="eyebrow">足迹</div><h1>日历</h1></div>' +
      '<div class="cal-head"><button data-act="prev-month" aria-label="上个月">' + ICON.chevL + '</button><span class="cal-month">' + (m + 1) + " 月</span><button data-act=\"next-month\" aria-label=\"下个月\">" + ICON.chevR + "</button></div></header>" +
      '<section class="card"><div class="card-head"><span class="card-title">' + monthName + '</span><span class="card-sub">完成率 ' + rate + '%</span></div>' +
      '<div class="weekdays">' + WEEK_LABELS.map(function (w) { return "<span>" + w + "</span>"; }).join("") + "</div>" +
      '<div class="cal-grid">' + cells + "</div>" +
      '<div class="legend"><span>少</span><i style="opacity:.18"></i><i style="opacity:.4"></i><i style="opacity:.62"></i><i style="opacity:.86"></i><span>多</span></div></section>' +
      '<div class="section-head"><h2>这一天</h2><span class="card-sub">' + detailTitle + "</span></div>" +
      '<section class="card">' + detailBody + "</section>" +
      '<div class="stat-grid">' +
      '<div class="stat"><div class="v">' + rate + '<small> %</small></div><div class="k">本月完成率</div></div>' +
      '<div class="stat"><div class="v">' + totalCheckins() + '<small> 次</small></div><div class="k">累计打卡</div></div>' +
      '<div class="stat"><div class="v">' + bestStreak() + '<small> 天</small></div><div class="k">最佳连续</div></div>' +
      "</div>";
  }

  function settingsHTML() {
    var theme = state.prefs.theme || "system";
    var habitRows = state.habits.map(function (h) {
      return '<button class="row" data-edit="' + h.id + '"><span class="row-ico" style="background:' + tint(h.color, 0.16) + '">' + h.emoji + "</span>" +
        '<span class="row-main"><span class="row-title">' + esc(h.name) + '</span><span class="row-sub">每日 ' + h.goal + " 次 · 连续 " + streakOf(h) + " 天</span></span>" +
        '<span class="row-val">' + (h.logs[TODAY_KEY] || 0) + "/" + h.goal + "</span>" + ICON.chev + "</button>";
    }).join("");
    return '<header class="page-head"><div><div class="eyebrow">偏好</div><h1>设置</h1></div></header>' +
      '<section class="card group-card"><div class="group-label">外观</div>' +
      '<div class="row"><span class="row-ico">' + ICON.moon + '</span><span class="row-main"><span class="row-title">主题</span><span class="row-sub">跟随系统，或手动选择</span></span></div>' +
      '<div class="seg" style="margin:2px 0 14px">' +
      '<button data-theme-set="system" class="' + (theme === "system" ? "on" : "") + '">跟随系统</button>' +
      '<button data-theme-set="light" class="' + (theme === "light" ? "on" : "") + '">浅色</button>' +
      '<button data-theme-set="dark" class="' + (theme === "dark" ? "on" : "") + '">深色</button></div></section>' +
      '<section class="card group-card"><div class="group-label">我的习惯</div>' +
      (habitRows || '<div class="day-empty">还没有习惯</div>') +
      '<button class="row" data-act="new"><span class="row-ico" style="color:var(--accent)">' + ICON.plus + '</span><span class="row-main"><span class="row-title" style="color:var(--accent)">新建习惯</span><span class="row-sub">从一件小事开始</span></span></button></section>' +
      '<section class="card group-card"><div class="group-label">数据</div>' +
      '<button class="row" data-act="export"><span class="row-ico">' + ICON.download + '</span><span class="row-main"><span class="row-title">导出备份</span><span class="row-sub">保存为 JSON 文件</span></span>' + ICON.chev + "</button>" +
      '<button class="row" data-act="import"><span class="row-ico">' + ICON.upload + '</span><span class="row-main"><span class="row-title">导入备份</span><span class="row-sub">从 JSON 文件恢复</span></span>' + ICON.chev + "</button>" +
      '<button class="row" data-act="reseeds"><span class="row-ico">' + ICON.sparkles + '</span><span class="row-main"><span class="row-title">恢复示例数据</span><span class="row-sub">重新体验完整流程</span></span>' + ICON.chev + "</button>" +
      '<button class="row danger" data-act="reset"><span class="row-ico">' + ICON.trash + '</span><span class="row-main"><span class="row-title">清空所有数据</span><span class="row-sub">删除习惯、便签与日程</span></span>' + ICON.chev + "</button></section>" +
      '<div class="about"><strong>小步</strong> · 一个界面就能完成的习惯追踪<br>数据只保存在这台设备的浏览器里</div>';
  }

  function viewHTML() {
    if (ui.view === "stats") return statsHTML();
    if (ui.view === "calendar") return calendarHTML();
    if (ui.view === "settings") return settingsHTML();
    return todayHTML();
  }

  function render(opts) {
    var keep = opts && opts.keepScroll;
    var y = elView.scrollTop;
    elView.innerHTML = viewHTML();
    elView.scrollTop = keep ? y : 0;
    if (keep) {
      requestAnimationFrame(function () { elView.scrollTop = y; });
    }
    var tabs = elTabbar.querySelectorAll(".tab");
    for (var i = 0; i < tabs.length; i++) {
      var isOn = tabs[i].getAttribute("data-view") === ui.view;
      tabs[i].classList.toggle("is-active", isOn);
      if (isOn) tabs[i].setAttribute("aria-current", "page");
      else tabs[i].removeAttribute("aria-current");
    }
    if (pulseTimer) clearTimeout(pulseTimer);
    pulseTimer = setTimeout(function () { ui.pulse = null; }, 700);
    paintFocus();
    paintClock();
  }

  function setView(v) {
    if (ui.view === v) {
      elView.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    ui.view = v;
    if (v === "calendar" && ui.selected === TODAY_KEY) {
      var n = new Date();
      ui.month = new Date(n.getFullYear(), n.getMonth(), 1);
    }
    render();
    elView.scrollTop = 0;
  }

  function toast(msg) {
    elToast.textContent = msg;
    elToast.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { elToast.classList.remove("show"); }, 2200);
    if (navigator.vibrate) {
      try { navigator.vibrate(12); } catch (e) {}
    }
  }

  function toggleCheck(id) {
    var h = state.habits.find(function (x) { return x.id === id; });
    if (!h) return;
    var k = dateKey(new Date());
    var cur = h.logs[k] || 0;
    if (cur >= h.goal) {
      h.logs[k] = 0;
      saveState();
      render({ keepScroll: true });
      toast("已取消「" + h.name + "」今天的打卡");
    } else {
      h.logs[k] = cur + 1;
      saveState();
      ui.pulse = id;
      render({ keepScroll: true });
      if (h.logs[k] >= h.goal) toast(CHEERS[Math.floor(Math.random() * CHEERS.length)]);
      else toast("「" + h.name + "」" + h.logs[k] + "/" + h.goal + "，还差一点");
    }
    if (ui.pulse === id) {
      if (pulseTimer) clearTimeout(pulseTimer);
      pulseTimer = setTimeout(function () {
        ui.pulse = null;
        var btn = elView.querySelector('[data-check="' + id + '"]');
        if (btn) btn.classList.remove("pop");
      }, 700);
    }
  }

  function paintClock() {
    var el = document.getElementById("liveClock");
    if (el) el.textContent = clockText();
  }

  function paintFocus() {
    var timeEl = document.getElementById("focusTime");
    if (!timeEl) return;
    var m = FOCUS_MODES[focus.mode];
    var hint = document.getElementById("focusHint");
    var bar = document.getElementById("focusBar");
    var btn = document.getElementById("focusToggle");
    timeEl.textContent = fmtFocus(focus.left);
    if (hint) hint.textContent = focus.running ? m.hint : focus.left === focus.total ? "准备好就开始" : "已暂停 · 点右侧继续";
    if (bar) bar.style.width = (focus.total ? ((focus.total - focus.left) / focus.total) * 100 : 0) + "%";
    if (btn) {
      btn.innerHTML = focus.running ? ICON.pause : ICON.play;
      btn.classList.toggle("is-running", focus.running);
    }
  }

  function paintAmbient() {
    var b = document.getElementById("ambientBtn");
    if (!b) return;
    b.classList.toggle("on", focus.audio);
    b.textContent = focus.audio ? "🎧 环境音 开" : "🎧 环境音";
  }

  function setFocusMode(mode) {
    if (!FOCUS_MODES[mode]) return;
    focus.mode = mode;
    focus.left = FOCUS_MODES[mode].minutes * 60;
    focus.total = focus.left;
    focus.running = false;
    render({ keepScroll: true });
  }

  function toggleFocus() {
    if (focus.running) {
      focus.left = Math.max(0, Math.round((focus.endsAt - Date.now()) / 1000));
      focus.running = false;
      paintFocus();
      toast("已暂停，随时继续");
      return;
    }
    if (focus.left <= 0) focus.left = focus.total;
    focus.endsAt = Date.now() + focus.left * 1000;
    focus.running = true;
    paintFocus();
    toast(FOCUS_MODES[focus.mode].label + "开始 · " + fmtFocus(focus.left));
  }

  function resetFocus() {
    focus.running = false;
    focus.left = FOCUS_MODES[focus.mode].minutes * 60;
    focus.total = focus.left;
    paintFocus();
    toast("计时已重置");
  }

  function chime() {
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      var ctx = new AC();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.9);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.95);
      setTimeout(function () { try { ctx.close(); } catch (e) {} }, 1200);
    } catch (e) {}
  }

  function stopAmbient() {
    if (focus.audioNode) {
      try { focus.audioNode.stop(); } catch (e) {}
    }
    if (focus.audioCtx) {
      try { focus.audioCtx.close(); } catch (e) {}
    }
    focus.audioNode = null;
    focus.audioCtx = null;
    focus.audio = false;
  }

  function toggleAmbient() {
    if (focus.audio) {
      stopAmbient();
      paintAmbient();
      toast("环境音已关闭");
      return;
    }
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      var ctx = new AC();
      var len = Math.floor(ctx.sampleRate * 2);
      var buffer = ctx.createBuffer(1, len, ctx.sampleRate);
      var data = buffer.getChannelData(0);
      var last = 0;
      for (var i = 0; i < len; i++) {
        var white = Math.random() * 2 - 1;
        last = (last + 0.02 * white) / 1.02;
        data[i] = last * 3.2;
      }
      var src = ctx.createBufferSource();
      src.buffer = buffer;
      src.loop = true;
      var filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 760;
      var gain = ctx.createGain();
      gain.gain.value = 0.32;
      src.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      src.start();
      focus.audioCtx = ctx;
      focus.audioNode = src;
      focus.audio = true;
      paintAmbient();
      toast("雨声环境音已开启");
    } catch (e) {
      toast("当前浏览器不支持环境音");
    }
  }

  function tickFocus() {
    if (!focus.running) return;
    var left = Math.max(0, Math.round((focus.endsAt - Date.now()) / 1000));
    if (left === focus.left && left > 0) return;
    focus.left = left;
    if (left <= 0) {
      focus.running = false;
      paintFocus();
      chime();
      toast(focus.mode === "focus" ? "专注完成，起身休息一下" : "休息结束，继续吧");
      return;
    }
    paintFocus();
  }

  function saveLink() {
    var nameEl = document.getElementById("linkNameInput");
    var urlEl = document.getElementById("linkUrlInput");
    var iconEl = document.getElementById("linkIconInput");
    var name = nameEl ? nameEl.value.trim() : "";
    var url = urlEl ? urlEl.value.trim() : "";
    if (!name || !url) {
      toast("填一下名称和网址");
      return;
    }
    if (!/^https?:\/\//i.test(url)) url = "https://" + url;
    var icon = iconEl && iconEl.value.trim() ? iconEl.value.trim().slice(0, 4) : "🔗";
    state.links.push({
      id: uid(),
      name: name.slice(0, 20),
      url: url,
      icon: icon,
      color: COLORS[state.links.length % COLORS.length]
    });
    saveState();
    ui.showLinkForm = false;
    render({ keepScroll: true });
    toast("已添加「" + name + "」");
  }

  function deleteLink(id) {
    state.links = state.links.filter(function (l) { return l.id !== id; });
    saveState();
    render({ keepScroll: true });
    toast("链接已移除");
  }

  function saveNote() {
    var el = document.getElementById("noteInput");
    var text = el ? el.value.trim() : "";
    if (!text) {
      toast("写点什么再记录");
      if (el) el.focus();
      return;
    }
    state.notes.unshift({ id: uid(), text: text.slice(0, 80), done: false, priority: ui.notePrio, createdAt: Date.now() });
    saveState();
    render({ keepScroll: true });
    toast("已记下");
  }

  function toggleNote(id) {
    var n = state.notes.find(function (x) { return x.id === id; });
    if (!n) return;
    n.done = !n.done;
    saveState();
    render({ keepScroll: true });
  }

  function deleteNote(id) {
    state.notes = state.notes.filter(function (n) { return n.id !== id; });
    saveState();
    render({ keepScroll: true });
    toast("便签已删除");
  }

  function cyclePrio() {
    ui.notePrio = ui.notePrio === 1 ? 2 : ui.notePrio === 2 ? 3 : 1;
    var btn = document.querySelector(".prio");
    if (btn) {
      btn.className = "prio p" + ui.notePrio;
      btn.textContent = NOTE_PRIO[ui.notePrio].label;
    }
  }

  function saveTask() {
    var timeEl = document.getElementById("taskTimeInput");
    var titleEl = document.getElementById("taskTitleInput");
    var title = titleEl ? titleEl.value.trim() : "";
    if (!title) {
      toast("给这段时间起个名字");
      if (titleEl) titleEl.focus();
      return;
    }
    state.schedule.push({
      id: uid(),
      time: normalizeTime(timeEl ? timeEl.value : "09:00"),
      title: title.slice(0, 40),
      done: false
    });
    saveState();
    ui.showTaskForm = false;
    render({ keepScroll: true });
    toast("已加入今天的安排");
  }

  function toggleTask(id) {
    var t = state.schedule.find(function (x) { return x.id === id; });
    if (!t) return;
    t.done = !t.done;
    saveState();
    render({ keepScroll: true });
  }

  function deleteTask(id) {
    state.schedule = state.schedule.filter(function (t) { return t.id !== id; });
    saveState();
    render({ keepScroll: true });
    toast("安排已删除");
  }

  function openEditor(id) {
    var h = id ? state.habits.find(function (x) { return x.id === id; }) : null;
    ui.editingId = id || null;
    ui.nameDraft = h ? h.name : "";
    ui.emojiDraft = h ? h.emoji : EMOJIS[0];
    ui.colorDraft = h ? h.color : COLORS[0];
    ui.goalDraft = h ? h.goal : 1;
    var isEdit = !!h;
    elSheet.innerHTML = '<div class="sheet-mask" data-act="close-sheet"></div>' +
      '<div class="sheet" role="dialog" aria-modal="true" aria-label="' + (isEdit ? "编辑习惯" : "新建习惯") + '">' +
      '<div class="grabber"></div>' +
      '<div class="sheet-head"><h2>' + (isEdit ? "编辑习惯" : "新建习惯") + '</h2><button class="sheet-close" data-act="close-sheet">取消</button></div>' +
      '<label class="field-label" for="habitName">名称</label>' +
      '<input class="input" id="habitName" maxlength="20" placeholder="例如：阅读 30 分钟" value="' + esc(ui.nameDraft) + '" />' +
      '<div class="field-label">图标</div><div class="emoji-grid">' +
      EMOJIS.map(function (e) {
        return '<button class="emoji' + (e === ui.emojiDraft ? " on" : "") + '" data-emoji="' + e + '" aria-label="选择图标 ' + e + '">' + e + "</button>";
      }).join("") +
      '</div><div class="field-label">颜色</div><div class="color-row">' +
      COLORS.map(function (c) {
        return '<button class="color' + (c === ui.colorDraft ? " on" : "") + '" data-color="' + c + '" style="--sw:' + c + '" aria-label="选择颜色 ' + c + '"></button>';
      }).join("") +
      '</div><div class="field-label">每日目标次数</div><div class="stepper">' +
      '<button data-act="goal-minus" aria-label="减少">−</button><span id="goalVal">' + ui.goalDraft + '</span><button data-act="goal-plus" aria-label="增加">+</button></div>' +
      '<button class="btn-primary" data-act="save-habit">' + (isEdit ? "保存修改" : "开始坚持") + "</button>" +
      (isEdit ? '<div class="sheet-danger"><button data-act="delete-habit">删除这个习惯</button></div>' : "") +
      "</div>";
    elSheet.classList.add("open");
    ui.sheetOpen = true;
    if (window.matchMedia("(min-width: 760px)").matches) {
      setTimeout(function () {
        var input = document.getElementById("habitName");
        if (input) input.focus();
      }, 380);
    }
  }

  function closeSheet() {
    elSheet.classList.remove("open");
    ui.sheetOpen = false;
    setTimeout(function () {
      if (!ui.sheetOpen) elSheet.innerHTML = "";
    }, 380);
  }

  function saveHabit() {
    var input = document.getElementById("habitName");
    var name = input ? input.value.trim() : "";
    if (!name) {
      toast("先给这个习惯起个名字吧");
      if (input) input.focus();
      return;
    }
    if (ui.editingId) {
      var h = state.habits.find(function (x) { return x.id === ui.editingId; });
      if (h) {
        h.name = name;
        h.emoji = ui.emojiDraft;
        h.color = ui.colorDraft;
        h.goal = ui.goalDraft;
      }
      saveState();
      closeSheet();
      render({ keepScroll: true });
      toast("已保存修改");
    } else {
      state.habits.push({
        id: uid(),
        name: name,
        emoji: ui.emojiDraft,
        color: ui.colorDraft,
        goal: ui.goalDraft,
        createdAt: dateKey(new Date()),
        logs: {}
      });
      saveState();
      closeSheet();
      render({ keepScroll: true });
      toast("「" + name + "」已加入今天");
    }
  }

  function deleteHabit(btn) {
    if (!ui.editingId) return;
    if (!btn.dataset.armed) {
      btn.dataset.armed = "1";
      btn.textContent = "再点一次确认删除";
      setTimeout(function () {
        if (btn.isConnected && !btn.dataset.armed) return;
        btn.dataset.armed = "";
        btn.textContent = "删除这个习惯";
      }, 3200);
      return;
    }
    state.habits = state.habits.filter(function (x) { return x.id !== ui.editingId; });
    saveState();
    closeSheet();
    render({ keepScroll: true });
    toast("习惯已删除");
  }

  function exportData() {
    var payload = {
      app: "xiaobu",
      version: 2,
      exportedAt: new Date().toISOString(),
      habits: state.habits,
      links: state.links,
      notes: state.notes,
      schedule: state.schedule,
      prefs: state.prefs
    };
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "xiaobu-backup-" + TODAY_KEY + ".json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    toast("备份文件已生成");
  }

  function importData() {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json,.json";
    input.addEventListener("change", function () {
      var file = input.files && input.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var data = JSON.parse(String(reader.result));
          var habits = Array.isArray(data) ? data : data.habits;
          if (!Array.isArray(habits)) throw new Error("bad");
          state.habits = habits.map(normalizeHabit);
          state.links = Array.isArray(data.links) ? data.links.map(normalizeLink) : [];
          state.notes = Array.isArray(data.notes) ? data.notes.map(normalizeNote) : [];
          state.schedule = Array.isArray(data.schedule) ? data.schedule.map(normalizeTask) : [];
          if (data.prefs && data.prefs.theme) state.prefs.theme = data.prefs.theme;
          saveState();
          applyTheme();
          render({ keepScroll: true });
          toast("已导入 " + state.habits.length + " 个习惯");
        } catch (e) {
          toast("文件格式不对，导入失败");
        }
      };
      reader.readAsText(file);
    });
    input.click();
  }

  function resetAll(btn) {
    if (!btn.dataset.armed) {
      btn.dataset.armed = "1";
      var title = btn.querySelector(".row-title");
      if (title) title.textContent = "再点一次确认清空";
      setTimeout(function () {
        if (!btn.isConnected) return;
        btn.dataset.armed = "";
        if (title && title.isConnected) title.textContent = "清空所有数据";
      }, 3200);
      return;
    }
    state.habits = [];
    state.links = [];
    state.notes = [];
    state.schedule = [];
    saveState();
    render({ keepScroll: true });
    toast("数据已清空");
  }

  function reseed() {
    state = seedState();
    saveState();
    applyTheme();
    render();
    toast("示例数据已恢复");
  }

  function handleSheetClick(e) {
    var emojiBtn = e.target.closest("[data-emoji]");
    if (emojiBtn) {
      ui.emojiDraft = emojiBtn.getAttribute("data-emoji");
      elSheet.querySelectorAll(".emoji").forEach(function (b) { b.classList.toggle("on", b === emojiBtn); });
      return;
    }
    var colorBtn = e.target.closest("[data-color]");
    if (colorBtn) {
      ui.colorDraft = colorBtn.getAttribute("data-color");
      elSheet.querySelectorAll(".color").forEach(function (b) { b.classList.toggle("on", b === colorBtn); });
      return;
    }
    var actBtn = e.target.closest("[data-act]");
    if (!actBtn) return;
    var act = actBtn.getAttribute("data-act");
    if (act === "close-sheet") {
      closeSheet();
    } else if (act === "goal-plus") {
      ui.goalDraft = Math.min(12, ui.goalDraft + 1);
      var gv = document.getElementById("goalVal");
      if (gv) gv.textContent = ui.goalDraft;
    } else if (act === "goal-minus") {
      ui.goalDraft = Math.max(1, ui.goalDraft - 1);
      var gv2 = document.getElementById("goalVal");
      if (gv2) gv2.textContent = ui.goalDraft;
    } else if (act === "save-habit") {
      saveHabit();
    } else if (act === "delete-habit") {
      deleteHabit(actBtn);
    }
  }

  function handleDocClick(e) {
    if (e.target.closest("#sheetRoot")) {
      handleSheetClick(e);
      return;
    }
    var viewBtn = e.target.closest("[data-view]");
    if (viewBtn) {
      setView(viewBtn.getAttribute("data-view"));
      return;
    }
    var checkBtn = e.target.closest("[data-check]");
    if (checkBtn) {
      toggleCheck(checkBtn.getAttribute("data-check"));
      return;
    }
    var editBtn = e.target.closest("[data-edit]");
    if (editBtn) {
      openEditor(editBtn.getAttribute("data-edit"));
      return;
    }
    var themeBtn = e.target.closest("[data-theme-set]");
    if (themeBtn) {
      state.prefs.theme = themeBtn.getAttribute("data-theme-set");
      saveState();
      applyTheme();
      render({ keepScroll: true });
      return;
    }
    var dayBtn = e.target.closest("[data-day]");
    if (dayBtn) {
      ui.selected = dayBtn.getAttribute("data-day");
      render({ keepScroll: true });
      return;
    }
    var actBtn = e.target.closest("[data-act]");
    if (!actBtn) return;
    var act = actBtn.getAttribute("data-act");
    if (act === "new") {
      openEditor(null);
    } else if (act === "prev-month") {
      ui.month = new Date(ui.month.getFullYear(), ui.month.getMonth() - 1, 1);
      ui.selected = dateKey(ui.month);
      render({ keepScroll: true });
    } else if (act === "next-month") {
      ui.month = new Date(ui.month.getFullYear(), ui.month.getMonth() + 1, 1);
      ui.selected = dateKey(ui.month);
      render({ keepScroll: true });
    } else if (act === "export") {
      exportData();
    } else if (act === "import") {
      importData();
    } else if (act === "reset") {
      resetAll(actBtn);
    } else if (act === "reseeds") {
      reseed();
    } else if (act === "toggle-link-edit") {
      ui.linkEdit = !ui.linkEdit;
      ui.showLinkForm = false;
      render({ keepScroll: true });
    } else if (act === "toggle-link-form") {
      ui.showLinkForm = !ui.showLinkForm;
      render({ keepScroll: true });
      if (ui.showLinkForm && window.matchMedia("(min-width: 760px)").matches) {
        setTimeout(function () {
          var input = document.getElementById("linkNameInput");
          if (input) input.focus();
        }, 30);
      }
    } else if (act === "cancel-link-form") {
      ui.showLinkForm = false;
      render({ keepScroll: true });
    } else if (act === "save-link") {
      saveLink();
    } else if (act === "delete-link") {
      deleteLink(actBtn.getAttribute("data-id"));
    } else if (act === "save-note") {
      saveNote();
    } else if (act === "toggle-note") {
      toggleNote(actBtn.getAttribute("data-id"));
    } else if (act === "delete-note") {
      deleteNote(actBtn.getAttribute("data-id"));
    } else if (act === "cycle-prio") {
      cyclePrio();
    } else if (act === "toggle-task-form") {
      ui.showTaskForm = !ui.showTaskForm;
      render({ keepScroll: true });
      if (ui.showTaskForm && window.matchMedia("(min-width: 760px)").matches) {
        setTimeout(function () {
          var input = document.getElementById("taskTitleInput");
          if (input) input.focus();
        }, 30);
      }
    } else if (act === "cancel-task-form") {
      ui.showTaskForm = false;
      render({ keepScroll: true });
    } else if (act === "save-task") {
      saveTask();
    } else if (act === "toggle-task") {
      toggleTask(actBtn.getAttribute("data-id"));
    } else if (act === "delete-task") {
      deleteTask(actBtn.getAttribute("data-id"));
    } else if (act === "focus-toggle") {
      toggleFocus();
    } else if (act === "focus-mode") {
      setFocusMode(actBtn.getAttribute("data-mode"));
    } else if (act === "focus-reset") {
      resetFocus();
    } else if (act === "ambient") {
      toggleAmbient();
    }
  }

  function handleKeydown(e) {
    if (e.key === "Escape" && ui.sheetOpen) closeSheet();
    if (e.key !== "Enter") return;
    var active = document.activeElement;
    if (!active) return;
    if (ui.sheetOpen && active.id === "habitName") {
      e.preventDefault();
      saveHabit();
    } else if (active.id === "noteInput") {
      e.preventDefault();
      saveNote();
    } else if (active.id === "taskTitleInput") {
      e.preventDefault();
      saveTask();
    } else if (active.id === "linkNameInput" || active.id === "linkUrlInput") {
      e.preventDefault();
      saveLink();
    }
  }

  document.addEventListener("click", handleDocClick);
  document.addEventListener("keydown", handleKeydown);
  elFab.addEventListener("click", function () { openEditor(null); });

  var mq = window.matchMedia("(prefers-color-scheme: dark)");
  if (mq.addEventListener) mq.addEventListener("change", applyTheme);

  saveState();
  applyTheme();
  render();

  setInterval(tickFocus, 500);
  setInterval(paintClock, 1000);
  setInterval(function () {
    if (dateKey(new Date()) !== TODAY_KEY) {
      window.location.reload();
    }
  }, 60000);
})();