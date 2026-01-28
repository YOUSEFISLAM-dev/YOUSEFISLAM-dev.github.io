import { initFirebase, firebaseEnabled, ensureAnonAuth, fb, fs } from "./firebase.js";

const AVATARS = [
  "avatars/astronaut boy.png",
  "avatars/boy with blue hat.png",
  "avatars/fox in green dinosaur suit.png",
  "avatars/nerd girl.png",
  "avatars/panda.png",
  "avatars/pirate boy.png",
  "avatars/unicorn girl.png",
  "avatars/axolotl.png",
  "avatars/alein.png",
  "avatars/alein i guess.png",
  "avatars/cute cat.png",
  "avatars/cat2.png",
  "avatars/red panda.png",
  "avatars/girl.png",
];

const STORE_CATALOG = {
  frames: [
    { id: "frame_basic", name: "أساسي", price: 0, border: "#dfe4ea" },
    { id: "frame_gold", name: "ذهبي", price: 120, border: "#feca57" },
    { id: "frame_mint", name: "نعناعي", price: 90, border: "#1dd1a1" },
    { id: "frame_sunset", name: "غروب", price: 90, border: "#ff6b6b" },
  ],
  nameColors: [
    { id: "name_default", name: "افتراضي", price: 0, color: "#2f3542" },
    { id: "name_orange", name: "برتقالي", price: 70, color: "#ff9f43" },
    { id: "name_blue", name: "أزرق", price: 70, color: "#48dbfb" },
    { id: "name_purple", name: "بنفسجي", price: 70, color: "#5f27cd" },
    { id: "name_red", name: "أحمر", price: 70, color: "#ee5253" },
  ],
  badges: [
    { id: "badge_none", name: "بدون", price: 0, icon: "" },
    { id: "badge_crown", name: "تاج", price: 150, icon: "👑" },
    { id: "badge_star", name: "نجمة", price: 120, icon: "⭐" },
    { id: "badge_ghost", name: "شبح", price: 120, icon: "👻" },
    { id: "badge_radar", name: "رادار", price: 120, icon: "📡" },
  ],
  qrThemes: [
    { id: "qr_default", name: "أبيض", price: 0, border: "#ffffff", bg: "#ffffff" },
    { id: "qr_mint", name: "نعناعي", price: 140, border: "#1dd1a1", bg: "#ffffff" },
    { id: "qr_sunset", name: "غروب", price: 140, border: "#ff6b6b", bg: "#ffffff" },
    { id: "qr_gold", name: "ذهبي", price: 160, border: "#feca57", bg: "#ffffff" },
  ],
  confetti: [
    { id: "confetti_default", name: "مختلط", price: 0, colors: ["#ff9f43", "#1dd1a1", "#48dbfb", "#ff6b6b", "#2f3542"] },
    { id: "confetti_sunset", name: "غروب", price: 180, colors: ["#ee5253", "#ff6b6b", "#ff9f43", "#feca57", "#ffffff"] },
    { id: "confetti_ocean", name: "بحر", price: 180, colors: ["#48dbfb", "#54a0ff", "#5f27cd", "#ffffff", "#2f3542"] },
  ],
};

const LS_KEYS = {
  nickname: "khirl_nickname",
  avatar: "khirl_avatar",
  lastRoom: "khirl_last_room",
};

const ROOM_CODE_LEN = 6;
const MAX_PLAYERS = 12;

const views = Array.from(document.querySelectorAll("[data-view]"));
const toastEl = document.getElementById("toast");
const alertOverlayEl = document.getElementById("alertOverlay");

const el = {
  subtitle: document.getElementById("subtitle"),
  firebaseHint: document.getElementById("firebaseHint"),

  nickname: document.getElementById("nickname"),
  avatarGrid: document.getElementById("avatarGrid"),
  btnEnter: document.getElementById("btnEnter"),

  meName: document.getElementById("meName"),
  menuCoins: document.getElementById("menuCoins"),
  dailyStreak: document.getElementById("dailyStreak"),
  missionsList: document.getElementById("missionsList"),
  btnCreateRoom: document.getElementById("btnCreateRoom"),
  btnJoinRoom: document.getElementById("btnJoinRoom"),
  btnStore: document.getElementById("btnStore"),
  joinPanel: document.getElementById("joinPanel"),
  roomCodeInput: document.getElementById("roomCodeInput"),
  btnJoinConfirm: document.getElementById("btnJoinConfirm"),
  btnStats: document.getElementById("btnStats"),
  btnSettings: document.getElementById("btnSettings"),
  btnHeaderSettings: document.getElementById("btnHeaderSettings"),

  roomCodeText: document.getElementById("roomCodeText"),
  btnCopyRoom: document.getElementById("btnCopyRoom"),
  hostPill: document.getElementById("hostPill"),
  playersCount: document.getElementById("playersCount"),
  playersList: document.getElementById("playersList"),
  hostSettings: document.getElementById("hostSettings"),
  modeSelect: document.getElementById("modeSelect"),
  hideTimeSelect: document.getElementById("hideTimeSelect"),
  gameTimeSelect: document.getElementById("gameTimeSelect"),
  powerupsToggle: document.getElementById("powerupsToggle"),
  btnReady: document.getElementById("btnReady"),
  btnStart: document.getElementById("btnStart"),
  btnLeave: document.getElementById("btnLeave"),

  hidingTitle: document.getElementById("hidingTitle"),
  hidingTimer: document.getElementById("hidingTimer"),
  hidingHint: document.getElementById("hidingHint"),

  playTimerHider: document.getElementById("playTimerHider"),
  aliveCountHider: document.getElementById("aliveCountHider"),
  qrBox: document.getElementById("qrBox"),
  meNameUnderQr: document.getElementById("meNameUnderQr"),
  hiderPowerups: document.getElementById("hiderPowerups"),
  btnEndGameHider: document.getElementById("btnEndGameHider"),

  playTimerSeeker: document.getElementById("playTimerSeeker"),
  caughtCountSeeker: document.getElementById("caughtCountSeeker"),
  totalCountSeeker: document.getElementById("totalCountSeeker"),
  scanner: document.getElementById("scanner"),
  cameraGate: document.getElementById("cameraGate"),
  cameraGateHint: document.getElementById("cameraGateHint"),
  btnStartCamera: document.getElementById("btnStartCamera"),
  scannerControls: document.getElementById("scannerControls"),
  btnSwitchCamera: document.getElementById("btnSwitchCamera"),
  btnTorch: document.getElementById("btnTorch"),
  zoomRow: document.getElementById("zoomRow"),
  zoomSlider: document.getElementById("zoomSlider"),
  seekerPowerups: document.getElementById("seekerPowerups"),
  caughtList: document.getElementById("caughtList"),
  btnEndGameSeeker: document.getElementById("btnEndGameSeeker"),

  caughtByName: document.getElementById("caughtByName"),
  btnSpectate: document.getElementById("btnSpectate"),

  winnerTitle: document.getElementById("winnerTitle"),
  resultsDetails: document.getElementById("resultsDetails"),
  resultsRewards: document.getElementById("resultsRewards"),
  confetti: document.getElementById("confetti"),
  btnPlayAgain: document.getElementById("btnPlayAgain"),
  btnNewRoom: document.getElementById("btnNewRoom"),
  btnHome: document.getElementById("btnHome"),

  nicknameSettings: document.getElementById("nicknameSettings"),
  avatarGridSettings: document.getElementById("avatarGridSettings"),
  btnSaveSettings: document.getElementById("btnSaveSettings"),
  btnBackFromSettings: document.getElementById("btnBackFromSettings"),
  uidInput: document.getElementById("uidInput"),
  btnCopyUid: document.getElementById("btnCopyUid"),

  statsBox: document.getElementById("statsBox"),
  btnBackFromStats: document.getElementById("btnBackFromStats"),

  storeCoins: document.getElementById("storeCoins"),
  storeList: document.getElementById("storeList"),
  storeTabFrames: document.getElementById("storeTabFrames"),
  storeTabNameColors: document.getElementById("storeTabNameColors"),
  storeTabBadges: document.getElementById("storeTabBadges"),
  storeTabQrThemes: document.getElementById("storeTabQrThemes"),
  storeTabConfetti: document.getElementById("storeTabConfetti"),
  btnBackFromStore: document.getElementById("btnBackFromStore"),

  installBanner: document.getElementById("installBanner"),
  btnInstall: document.getElementById("btnInstall"),
  btnInstallClose: document.getElementById("btnInstallClose"),
  installHelp: document.getElementById("installHelp"),
};

let state = {
  me: {
    uid: null,
    nickname: "",
    avatar: AVATARS[0],
    coins: 0,
    cosmetics: null,
    rewards: null,
    missions: null,
  },
  roomCode: null,
  room: null,
  players: new Map(),
  lastEvents: new Set(),
  unsub: [],
  ticker: null,
  scanner: null,
  qr: null,
  spectate: false,
  cameraRequested: false,
  cameraId: localStorage.getItem("kh_camera_id") || "",
  torchOn: false,
  storeCategory: "frames",
  rewardInFlight: "",
  lastMatchReward: null,
};

function showView(name) {
  for (const v of views) v.classList.toggle("hidden", v.dataset.view !== name);
}

function toast(msg, ms = 2200) {
  toastEl.textContent = msg;
  toastEl.classList.remove("hidden");
  window.clearTimeout(toastEl._t);
  toastEl._t = window.setTimeout(() => toastEl.classList.add("hidden"), ms);
}

function showAlertOverlay(ms = 4500) {
  if (!alertOverlayEl) return;
  alertOverlayEl.classList.remove("hidden");
  window.clearTimeout(alertOverlayEl._t);
  alertOverlayEl._t = window.setTimeout(() => alertOverlayEl.classList.add("hidden"), ms);
}

async function registerPwa() {
  try {
    if (!("serviceWorker" in navigator)) return;
    await navigator.serviceWorker.register("./sw.js", { scope: "./" });
  } catch {}
}

let deferredInstallPrompt = null;

function isStandaloneMode() {
  try {
    return (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) || window.navigator.standalone === true;
  } catch {
    return false;
  }
}

function isIosDevice() {
  const ua = String(navigator.userAgent || "");
  const iOS = /iphone|ipad|ipod/i.test(ua);
  const iPadOS = navigator.platform === "MacIntel" && (navigator.maxTouchPoints || 0) > 1;
  return iOS || iPadOS;
}

function installHelpHtml() {
  if (isIosDevice()) {
    return 'على iPhone/iPad: افتح زر المشاركة (Share) ثم اختر "Add to Home Screen" وبعدها Add.';
  }
  return "اضغط (تثبيت) لتثبيت اللعبة كتطبيق.";
}

function dismissInstallBanner() {
  try {
    localStorage.setItem("khirl_install_dismissed", "1");
  } catch {}
  if (el.installHelp) el.installHelp.classList.add("hidden");
  if (el.installBanner) el.installBanner.classList.add("hidden");
}

function shouldShowInstallBanner() {
  if (isStandaloneMode()) return false;
  try {
    if (localStorage.getItem("khirl_install_dismissed") === "1") return false;
  } catch {}
  return true;
}

function maybeShowInstallBanner() {
  if (!el.installBanner) return;
  if (!shouldShowInstallBanner()) return;

  if (isIosDevice()) {
    el.installBanner.classList.remove("hidden");
    if (el.installHelp) {
      el.installHelp.textContent = installHelpHtml();
      el.installHelp.classList.remove("hidden");
    }
    return;
  }

  if (deferredInstallPrompt) {
    el.installBanner.classList.remove("hidden");
  }
}

function setupInstallBannerHooks() {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    maybeShowInstallBanner();
  });

  window.addEventListener("appinstalled", () => {
    dismissInstallBanner();
  });
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function nowMs() {
  return Date.now();
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function localDayKey(d = new Date()) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function defaultCosmetics() {
  return {
    owned: {
      frames: ["frame_basic"],
      nameColors: ["name_default"],
      badges: ["badge_none"],
      qrThemes: ["qr_default"],
      confetti: ["confetti_default"],
    },
    equipped: {
      frameId: "frame_basic",
      nameColorId: "name_default",
      badgeId: "badge_none",
      qrThemeId: "qr_default",
      confettiId: "confetti_default",
    },
  };
}

function normalizeCosmetics(c) {
  const d = defaultCosmetics();
  const out = c && typeof c === "object" ? c : {};
  out.owned = out.owned && typeof out.owned === "object" ? out.owned : {};
  out.equipped = out.equipped && typeof out.equipped === "object" ? out.equipped : {};
  out.owned.frames = Array.isArray(out.owned.frames) ? out.owned.frames : d.owned.frames.slice();
  out.owned.nameColors = Array.isArray(out.owned.nameColors) ? out.owned.nameColors : d.owned.nameColors.slice();
  out.owned.badges = Array.isArray(out.owned.badges) ? out.owned.badges : d.owned.badges.slice();
  out.owned.qrThemes = Array.isArray(out.owned.qrThemes) ? out.owned.qrThemes : d.owned.qrThemes.slice();
  out.owned.confetti = Array.isArray(out.owned.confetti) ? out.owned.confetti : d.owned.confetti.slice();
  out.equipped.frameId = out.equipped.frameId || d.equipped.frameId;
  out.equipped.nameColorId = out.equipped.nameColorId || d.equipped.nameColorId;
  out.equipped.badgeId = out.equipped.badgeId || d.equipped.badgeId;
  out.equipped.qrThemeId = out.equipped.qrThemeId || d.equipped.qrThemeId;
  out.equipped.confettiId = out.equipped.confettiId || d.equipped.confettiId;
  return out;
}

function catalogItem(category, id) {
  const arr = STORE_CATALOG[category] || [];
  return arr.find((x) => x.id === id) || null;
}

function applyMyCosmeticsToUI() {
  const cosmetics = normalizeCosmetics(state.me.cosmetics);
  state.me.cosmetics = cosmetics;

  const nameItem = catalogItem("nameColors", cosmetics.equipped.nameColorId);
  const nameColor = nameItem?.color || "#2f3542";
  el.meName.style.color = nameColor;
  el.meNameUnderQr.style.color = nameColor;

  const badgeItem = catalogItem("badges", cosmetics.equipped.badgeId);
  const badgeIcon = badgeItem?.icon || "";
  el.subtitle.textContent = badgeIcon ? `استغماية واقعية ${badgeIcon}` : "استغماية واقعية";

  const qrItem = catalogItem("qrThemes", cosmetics.equipped.qrThemeId);
  if (qrItem) {
    el.qrBox.style.borderColor = qrItem.border;
    el.qrBox.style.background = qrItem.bg;
  }

  if (el.menuCoins) el.menuCoins.textContent = `🪙 ${state.me.coins || 0}`;
  if (el.storeCoins) el.storeCoins.textContent = String(state.me.coins || 0);
}

const DAILY_MISSION_TEMPLATES = [
  { id: "play_1", type: "play", title: "العب ماتش واحد", target: 1, reward: 40 },
  { id: "win_1", type: "win", title: "اكسب ماتش واحد", target: 1, reward: 60 },
  { id: "catch_2", type: "catch", title: "امسك 2 لاعبين", target: 2, reward: 70 },
  { id: "powerup_1", type: "powerup", title: "استخدم Power-up مرة", target: 1, reward: 50 },
];

function hash32(str) {
  let h = 2166136261;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pickDailyMissions(uid, dayKey) {
  const seed = hash32(`${uid || "anon"}|${dayKey || ""}`);
  const base = DAILY_MISSION_TEMPLATES.find((m) => m.id === "play_1");
  const pool = DAILY_MISSION_TEMPLATES.filter((m) => m.id !== "play_1");
  const picked = [base];
  let s = seed || 1;
  while (picked.length < 3 && pool.length) {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    const idx = Math.abs(s) % pool.length;
    picked.push(pool.splice(idx, 1)[0]);
  }
  const items = {};
  for (const m of picked) {
    items[m.id] = { ...m, progress: 0, claimed: false };
  }
  return { dayKey, items };
}

function normalizeMissions(m) {
  const out = m && typeof m === "object" ? m : {};
  out.dayKey = String(out.dayKey || "");
  out.items = out.items && typeof out.items === "object" ? out.items : {};
  for (const t of DAILY_MISSION_TEMPLATES) {
    const cur = out.items[t.id];
    if (!cur || typeof cur !== "object") continue;
    cur.id = t.id;
    cur.type = t.type;
    cur.title = String(cur.title || t.title);
    cur.target = Number(cur.target || t.target);
    cur.reward = Number(cur.reward || t.reward);
    cur.progress = Number(cur.progress || 0);
    cur.claimed = !!cur.claimed;
  }
  return out;
}

function missionDone(m) {
  return Number(m.progress || 0) >= Number(m.target || 0);
}

function renderMissions() {
  if (!el.missionsList) return;
  if (!firebaseEnabled) {
    el.missionsList.innerHTML = "";
    return;
  }

  const missions = normalizeMissions(state.me.missions);
  const items = Object.values(missions.items || {});
  el.missionsList.innerHTML = "";
  if (!items.length) {
    const row = document.createElement("div");
    row.className = "muted";
    row.textContent = "المهام هتظهر بعد ما Firebase يشتغل.";
    el.missionsList.appendChild(row);
    return;
  }

  for (const m of items) {
    const row = document.createElement("div");
    row.className = "mission";

    const left = document.createElement("div");
    left.className = "mission__left";
    const title = document.createElement("div");
    title.className = "mission__title";
    title.textContent = m.title;
    const prog = document.createElement("div");
    prog.className = "mission__progress";
    prog.textContent = `${Math.min(m.progress || 0, m.target || 0)}/${m.target || 0}`;
    left.appendChild(title);
    left.appendChild(prog);

    const right = document.createElement("div");
    right.className = "mission__right";
    const reward = document.createElement("div");
    reward.className = "mission__reward";
    reward.textContent = `🪙 ${m.reward || 0}`;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-small";
    if (m.claimed) {
      btn.textContent = "تم ✅";
      btn.disabled = true;
    } else if (missionDone(m)) {
      btn.textContent = "استلام";
      btn.classList.add("btn-primary");
      btn.addEventListener("click", () => claimMission(m.id));
    } else {
      btn.textContent = "قيد التنفيذ";
      btn.disabled = true;
    }

    right.appendChild(reward);
    right.appendChild(btn);

    row.appendChild(left);
    row.appendChild(right);
    el.missionsList.appendChild(row);
  }
}

async function claimMission(missionId) {
  if (!firebaseEnabled || !fb.db || !state.me.uid) return;
  const today = localDayKey(new Date());
  try {
    const userRef = fs.doc(fb.db, "users", state.me.uid);
    await fs.runTransaction(fb.db, async (tx) => {
      const snap = await tx.get(userRef);
      if (!snap.exists()) return;
      const data = snap.data() || {};
      const missions = normalizeMissions(data.missions);
      if (missions.dayKey !== today) return;
      const m = missions.items?.[missionId];
      if (!m) return;
      if (!missionDone(m) || m.claimed) return;
      const coinsNow = Number(data.coins || 0);
      const reward = Number(m.reward || 0);
      m.claimed = true;
      tx.update(userRef, { coins: coinsNow + reward, missions });
    });
    await loadMyUserDoc();
    toast("اتستلمت ✅");
  } catch (err) {
    setFirestoreHint(err);
  }
}

async function bumpMissionProgress(type, amount = 1) {
  if (!firebaseEnabled || !fb.db || !state.me.uid) return;
  const today = localDayKey(new Date());
  try {
    const userRef = fs.doc(fb.db, "users", state.me.uid);
    await fs.runTransaction(fb.db, async (tx) => {
      const snap = await tx.get(userRef);
      if (!snap.exists()) return;
      const data = snap.data() || {};
      let missions = normalizeMissions(data.missions);
      if (missions.dayKey !== today) missions = pickDailyMissions(state.me.uid, today);
      const items = missions.items || {};
      let changed = false;
      for (const m of Object.values(items)) {
        if (!m || typeof m !== "object") continue;
        if (m.type !== type) continue;
        if (missionDone(m)) continue;
        m.progress = Math.min(Number(m.target || 0), Number(m.progress || 0) + amount);
        changed = true;
      }
      if (changed) tx.update(userRef, { missions });
    });
    await loadMyUserDoc();
  } catch {}
}

async function loadMyUserDoc() {
  if (!firebaseEnabled) return;
  if (!state.me.uid || !fb.db) return;
  try {
    const userRef = fs.doc(fb.db, "users", state.me.uid);
    const snap = await fs.getDoc(userRef);
    const data = snap.data() || {};
    const today = localDayKey(new Date());
    state.me.coins = Number(data.coins || 0);
    state.me.cosmetics = normalizeCosmetics(data.cosmetics);
    state.me.rewards = data.rewards || { lastDaily: "", streak: 0, claimedRewardIds: [] };
    state.me.missions = normalizeMissions(data.missions);
    if (!state.me.missions.dayKey || state.me.missions.dayKey !== today) {
      state.me.missions = pickDailyMissions(state.me.uid, today);
      try {
        await fs.setDoc(userRef, { missions: state.me.missions }, { merge: true });
      } catch {}
    }
    applyMyCosmeticsToUI();
    if (el.dailyStreak) el.dailyStreak.textContent = String(Number(state.me.rewards?.streak || 0));
    renderMissions();
  } catch (err) {
    setFirestoreHint(err);
  }
}

function fmtTimer(seconds) {
  const s = Math.max(0, Math.floor(seconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, "0")}`;
}

function normalizeRoomCode(input) {
  return String(input || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, ROOM_CODE_LEN);
}

function randomCode(len = ROOM_CODE_LEN) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(len);
  crypto.getRandomValues(bytes);
  let out = "";
  for (let i = 0; i < len; i++) out += chars[bytes[i] % chars.length];
  return out;
}

function randomToken(bytesLen = 16) {
  const bytes = new Uint8Array(bytesLen);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function setSelectedAvatar(container, avatarPath) {
  const items = Array.from(container.querySelectorAll(".avatar"));
  for (const it of items) it.classList.toggle("selected", it.dataset.avatar === avatarPath);
}

function renderAvatarGrid(container, selected, onPick) {
  container.innerHTML = "";
  for (const path of AVATARS) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "avatar" + (path === selected ? " selected" : "");
    btn.dataset.avatar = path;
    const img = document.createElement("img");
    img.src = `./${path}`;
    img.alt = "Avatar";
    btn.appendChild(img);
    btn.addEventListener("click", () => onPick(path));
    container.appendChild(btn);
  }
}

function vibrate(pattern) {
  try {
    if (navigator.vibrate) navigator.vibrate(pattern);
  } catch {}
}

let audioCtx = null;
function beep({ freq = 880, dur = 0.08, type = "sine", gain = 0.04 } = {}) {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.value = gain;
    o.connect(g);
    g.connect(audioCtx.destination);
    o.start();
    o.stop(audioCtx.currentTime + dur);
  } catch {}
}

function tickSound() {
  beep({ freq: 740, dur: 0.06, type: "square", gain: 0.02 });
}
function successSound() {
  beep({ freq: 1046, dur: 0.06, type: "sine", gain: 0.05 });
  window.setTimeout(() => beep({ freq: 1318, dur: 0.07, type: "sine", gain: 0.05 }), 70);
}
function failSound() {
  beep({ freq: 220, dur: 0.16, type: "sawtooth", gain: 0.04 });
}

function alertSound(ms = 4500) {
  const seq = [988, 988, 784, 988, 1175];
  const burstMs = 900;
  const burstCount = Math.max(1, Math.floor(ms / burstMs));
  for (let b = 0; b < burstCount; b++) {
    const base = b * burstMs;
    seq.forEach((f, i) =>
      window.setTimeout(() => beep({ freq: f, dur: 0.11, type: "square", gain: 0.12 }), base + i * 170)
    );
  }
}

function qrPayload(roomCode, uid, token) {
  return `KHIRL1:${roomCode}:${uid}:${token}`;
}

function parseQrPayload(text) {
  const raw = String(text || "").trim();
  const parts = raw.split(":");
  if (parts.length !== 4) return null;
  if (parts[0] !== "KHIRL1") return null;
  return { roomCode: parts[1], uid: parts[2], token: parts[3] };
}

function clearRoomListeners() {
  for (const u of state.unsub) {
    try {
      u();
    } catch {}
  }
  state.unsub = [];
  state.players.clear();
  state.room = null;
  state.lastEvents.clear();
}

function stopTicker() {
  if (state.ticker) window.clearInterval(state.ticker);
  state.ticker = null;
}

function setTicker(fn) {
  stopTicker();
  state.ticker = window.setInterval(fn, 250);
  fn();
}

async function ensureMe() {
  state.me.nickname = (localStorage.getItem(LS_KEYS.nickname) || "").trim();
  state.me.avatar = localStorage.getItem(LS_KEYS.avatar) || AVATARS[0];
  el.nickname.value = state.me.nickname;
  renderAvatarGrid(el.avatarGrid, state.me.avatar, (path) => {
    state.me.avatar = path;
    setSelectedAvatar(el.avatarGrid, path);
  });

  el.nicknameSettings.value = state.me.nickname;
  renderAvatarGrid(el.avatarGridSettings, state.me.avatar, (path) => {
    state.me.avatar = path;
    setSelectedAvatar(el.avatarGridSettings, path);
  });

  if (!firebaseEnabled) {
    el.firebaseHint.textContent = "Firebase غير متوصل. حدّث firebase-config.js عشان تشتغل اللعب الجماعي.";
    if (el.uidInput) el.uidInput.value = "—";
    return;
  }

  initFirebase();
  try {
    const user = await ensureAnonAuth();
    if (!user) {
      setFirebaseAuthHint({ code: "auth/unauthorized-domain" });
      return;
    }
    state.me.uid = user.uid;
    el.firebaseHint.textContent = "";
    if (el.uidInput) el.uidInput.value = state.me.uid || "—";
    await upsertUserProfile();
    await loadMyUserDoc();
  } catch (err) {
    setFirebaseAuthHint(err);
  }
}

function setFirebaseAuthHint(err) {
  const code = String(err?.code || "");
  if (code === "auth/configuration-not-found") {
    el.firebaseHint.textContent =
      "Firebase Auth مش متفعل. فعّل Authentication ثم Anonymous Sign-in من Firebase Console، وتأكد إن localhost موجود في Authorized domains.";
    toast("فعّل Anonymous Sign-in في Firebase");
    return;
  }
  if (code === "auth/unauthorized-domain") {
    el.firebaseHint.textContent = "ضيف localhost و 127.0.0.1 في Authorized domains داخل Firebase Auth.";
    toast("Authorized domain ناقص");
    return;
  }
  el.firebaseHint.textContent = `مشكلة Firebase Auth (${code || "unknown"})`;
  toast("مشكلة في Firebase Auth");
}

function setFirestoreHint(err) {
  const code = String(err?.code || "");
  const msg = String(err?.message || "");
  if (code === "permission-denied" && msg.includes("Cloud Firestore API has not been used")) {
    el.firebaseHint.textContent =
      "Firestore مش متفعل في مشروع khlawees. فعّل Cloud Firestore API من Google Cloud Console (firestore.googleapis.com) واعمل Create Database في Firestore داخل Firebase Console.";
    toast("فعّل Cloud Firestore API");
    return;
  }
  if (code === "permission-denied") {
    el.firebaseHint.textContent = "صلاحيات Firestore مرفوضة. راجع Firestore Rules وتأكد إنك عامل Sign-in.";
    toast("Firestore: permission-denied");
    return;
  }
  if (code === "unavailable" || msg.includes("offline")) {
    // Check if the actual error is "not-found" or "database not exist" which might come as a log or internal error
    // but often manifests as offline if the backend is 404ing the connection.
    // However, if we can catch the specific "not-found" error:
    el.firebaseHint.textContent = "Firestore مش قادر يتصل (offline). ممكن تكون Database مش موجودة؟ تأكد إنك عملت Create Database.";
    return;
  }
  if (code === "not-found" || msg.includes("does not exist") || msg.includes("not found")) {
    el.firebaseHint.textContent = "قاعدة البيانات مش موجودة! روح لـ Firestore Database في Firebase Console واضغط Create database.";
    toast("أنشئ Firestore Database");
    return;
  }
  el.firebaseHint.textContent = `مشكلة Firestore (${code || "unknown"})`;
}

async function upsertUserProfile() {
  if (!firebaseEnabled) return;
  if (!state.me.uid || !fb.db) return;
  try {
    const uid = state.me.uid;
    const nickname = state.me.nickname;
    const avatar = state.me.avatar;
    const userRef = fs.doc(fb.db, "users", uid);
    const snap = await fs.getDoc(userRef);
    if (snap.exists()) {
      const data = snap.data() || {};
      const patch = { nickname, avatar, updatedAt: fs.serverTimestamp() };
      if (data.stats == null) patch.stats = { games: 0, wins: 0, catches: 0, escapes: 0, asSeeker: 0, asHider: 0 };
      if (data.coins == null) patch.coins = 0;
      if (data.cosmetics == null) patch.cosmetics = defaultCosmetics();
      if (data.rewards == null) patch.rewards = { lastDaily: "", streak: 0, claimedRewardIds: [] };
      if (data.missions == null) patch.missions = { dayKey: "", items: {} };
      await fs.setDoc(userRef, patch, { merge: true });
    } else {
      await fs.setDoc(userRef, {
        uid,
        nickname,
        avatar,
        createdAt: fs.serverTimestamp(),
        updatedAt: fs.serverTimestamp(),
        stats: {
          games: 0,
          wins: 0,
          catches: 0,
          escapes: 0,
          asSeeker: 0,
          asHider: 0,
        },
        coins: 0,
        cosmetics: defaultCosmetics(),
        rewards: { lastDaily: "", streak: 0, claimedRewardIds: [] },
        missions: { dayKey: "", items: {} },
      });
    }
  } catch (err) {
    setFirestoreHint(err);
  }
}

function syncMenuHeader() {
  el.meName.textContent = state.me.nickname || "لاعب";
  el.meNameUnderQr.textContent = state.me.nickname || "لاعب";
  if (el.menuCoins) el.menuCoins.textContent = `🪙 ${state.me.coins || 0}`;
  if (el.dailyStreak) el.dailyStreak.textContent = String(Number(state.me.rewards?.streak || 0));
  renderMissions();
  if (el.uidInput) el.uidInput.value = state.me.uid || "—";
}

async function saveProfileFromInputs() {
  const nick = (el.nickname.value || "").trim().slice(0, 18);
  if (!nick) {
    toast("اكتب اسمك الأول");
    return false;
  }
  state.me.nickname = nick;
  localStorage.setItem(LS_KEYS.nickname, state.me.nickname);
  localStorage.setItem(LS_KEYS.avatar, state.me.avatar);
  el.nicknameSettings.value = state.me.nickname;
  setSelectedAvatar(el.avatarGridSettings, state.me.avatar);
  syncMenuHeader();
  if (firebaseEnabled) await upsertUserProfile();
  return true;
}

async function saveSettings() {
  const nick = (el.nicknameSettings.value || "").trim().slice(0, 18);
  if (!nick) {
    toast("اكتب اسمك الأول");
    return;
  }
  state.me.nickname = nick;
  localStorage.setItem(LS_KEYS.nickname, state.me.nickname);
  localStorage.setItem(LS_KEYS.avatar, state.me.avatar);
  syncMenuHeader();
  if (firebaseEnabled) await upsertUserProfile();
  toast("اتحفظ ✅");
  showView("menu");
}

function getRoomRefs(code) {
  const roomRef = fs.doc(fb.db, "rooms", code);
  const playersCol = fs.collection(fb.db, "rooms", code, "players");
  const eventsCol = fs.collection(fb.db, "rooms", code, "events");
  return { roomRef, playersCol, eventsCol };
}

async function createRoom() {
  if (!firebaseEnabled) return toast("Firebase مش جاهز");
  const ok = await saveProfileFromInputs();
  if (!ok) return;
  try {
    const user = await ensureAnonAuth();
    if (!user) return toast("Firebase Auth مش جاهز");
    state.me.uid = user.uid;
  } catch (err) {
    setFirebaseAuthHint(err);
    return;
  }

  try {
    let code = randomCode();
    for (let i = 0; i < 4; i++) {
      const roomRef = fs.doc(fb.db, "rooms", code);
      const snap = await fs.getDoc(roomRef);
      if (!snap.exists()) break;
      code = randomCode();
    }

    const { roomRef } = getRoomRefs(code);
    await fs.setDoc(roomRef, {
      code,
      hostId: state.me.uid,
      hostName: state.me.nickname,
      status: "waiting",
      createdAt: fs.serverTimestamp(),
      settings: {
        mode: "classic",
        hideSeconds: 60,
        gameSeconds: 600,
        powerupsEnabled: true,
      },
      seekerId: null,
      startedAt: null,
      finishedAt: null,
      winner: null,
    });

    await joinRoom(code);
  } catch (err) {
    setFirestoreHint(err);
  }
}

async function joinRoom(codeInput) {
  if (!firebaseEnabled) return toast("Firebase مش جاهز");
  const ok = await saveProfileFromInputs();
  if (!ok) return;
  try {
    const user = await ensureAnonAuth();
    if (!user) return toast("Firebase Auth مش جاهز");
    state.me.uid = user.uid;
  } catch (err) {
    setFirebaseAuthHint(err);
    return;
  }
  const code = normalizeRoomCode(codeInput);
  if (code.length !== ROOM_CODE_LEN) return toast("كود الغرفة لازم 6");

  const { roomRef, playersCol, eventsCol } = getRoomRefs(code);
  try {
    const roomSnap = await fs.getDoc(roomRef);
    if (!roomSnap.exists()) return toast("الغرفة مش موجودة");

    const playersSnap = await fs.getDocs(fs.query(playersCol, fs.limit(MAX_PLAYERS + 5)));
    if (playersSnap.size >= MAX_PLAYERS) return toast("الغرفة مليانة");

    const meRef = fs.doc(playersCol, state.me.uid);
    const cosmetics = normalizeCosmetics(state.me.cosmetics);
    const badgeItem = catalogItem("badges", cosmetics.equipped.badgeId);
    await fs.setDoc(
      meRef,
      {
        uid: state.me.uid,
        nickname: state.me.nickname,
        avatar: state.me.avatar,
        nameColorId: cosmetics.equipped.nameColorId,
        frameId: cosmetics.equipped.frameId,
        badgeId: cosmetics.equipped.badgeId,
        badgeIcon: badgeItem?.icon || "",
        ready: false,
        role: null,
        status: "alive",
        qrToken: null,
        shieldUses: 1,
        ghostUses: 1,
        alertUses: 1,
        ghostUntilMs: 0,
        reviveAtMs: 0,
        joinedAt: fs.serverTimestamp(),
        caughtAt: null,
        caughtBy: null,
        caughtByName: null,
      },
      { merge: true }
    );

    await fs.addDoc(eventsCol, {
      type: "join",
      uid: state.me.uid,
      nickname: state.me.nickname,
      at: fs.serverTimestamp(),
    });

    localStorage.setItem(LS_KEYS.lastRoom, code);
    state.roomCode = code;
    watchRoom(code);
    showView("lobby");
  } catch (err) {
    setFirestoreHint(err);
  }
}

async function leaveRoom() {
  if (!firebaseEnabled || !state.roomCode) {
    state.roomCode = null;
    clearRoomListeners();
    stopScanner();
    stopTicker();
    showView("menu");
    return;
  }
  const code = state.roomCode;
  const { roomRef, playersCol, eventsCol } = getRoomRefs(code);
  const uid = state.me.uid;

  stopScanner();
  stopTicker();
  clearRoomListeners();

  try {
    await fs.addDoc(eventsCol, {
      type: "leave",
      uid,
      nickname: state.me.nickname,
      at: fs.serverTimestamp(),
    });

    const meRef = fs.doc(playersCol, uid);
    await fs.deleteDoc(meRef);

    const playersSnap = await fs.getDocs(fs.query(playersCol, fs.limit(MAX_PLAYERS)));
    const others = playersSnap.docs.map((d) => d.data()).filter((p) => p.uid !== uid);
    const nextHost = others[0] || null;
    await fs.runTransaction(fb.db, async (tx) => {
      const roomSnap = await tx.get(roomRef);
      if (!roomSnap.exists()) return;
      const room = roomSnap.data();
      if (!nextHost) {
        tx.delete(roomRef);
        return;
      }
      if (room.hostId === uid) {
        tx.update(roomRef, { hostId: nextHost.uid, hostName: nextHost.nickname });
      }
    });
  } catch (err) {
    setFirestoreHint(err);
  }

  state.roomCode = null;
  showView("menu");
}

function computeCountdown(room, phase) {
  const startedAt = room.startedAt?.toMillis?.() ?? 0;
  const hideSeconds = room.settings?.hideSeconds ?? 60;
  const gameSeconds = room.settings?.gameSeconds ?? 600;
  if (!startedAt) return null;
  const t0 = startedAt;
  const now = nowMs();
  if (phase === "hiding") return Math.ceil((t0 + hideSeconds * 1000 - now) / 1000);
  if (phase === "playing") return Math.ceil((t0 + (hideSeconds + gameSeconds) * 1000 - now) / 1000);
  return null;
}

function canHostStart(room, players) {
  if (!room) return false;
  if (room.hostId !== state.me.uid) return false;
  if (room.status !== "waiting") return false;
  const list = Array.from(players.values());
  if (list.length < 2) return false;
  return list.every((p) => p.ready);
}

function renderPlayers() {
  const players = Array.from(state.players.values());
  const room = state.room;
  el.playersList.innerHTML = "";
  players.sort((a, b) => (a.nickname || "").localeCompare(b.nickname || "", "ar"));

  for (const p of players) {
    const row = document.createElement("div");
    row.className = "player";
    const left = document.createElement("div");
    left.className = "player-left";
    const av = document.createElement("div");
    av.className = "player-avatar";
    const frameItem = catalogItem("frames", p.frameId || "frame_basic");
    if (frameItem?.border) av.style.borderColor = frameItem.border;
    const img = document.createElement("img");
    img.src = `./${p.avatar || AVATARS[0]}`;
    img.alt = "Avatar";
    av.appendChild(img);
    const name = document.createElement("div");
    name.className = "player-name";
    name.textContent = p.nickname || "لاعب";
    const nameItem = catalogItem("nameColors", p.nameColorId || "name_default");
    if (nameItem?.color) name.style.color = nameItem.color;
    if (room?.hostId === p.uid) {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = "👑";
      name.appendChild(tag);
    }
    const badgeIcon = p.badgeIcon || catalogItem("badges", p.badgeId || "badge_none")?.icon || "";
    if (badgeIcon) {
      const b = document.createElement("span");
      b.className = "tag";
      b.textContent = badgeIcon;
      name.appendChild(b);
    }
    left.appendChild(av);
    left.appendChild(name);

    const st = document.createElement("div");
    st.className = "status";
    if (room?.status === "playing" || room?.status === "hiding") {
      const status = p.status || "alive";
      if (status === "caught") {
        st.classList.add("caught");
        st.textContent = "اتمسك";
      } else {
        st.classList.add("ready");
        st.textContent = p.role === "seeker" ? "Seeker" : "Hider";
      }
    } else {
      st.classList.toggle("ready", !!p.ready);
      st.textContent = p.ready ? "جاهز" : "مستني";
    }

    row.appendChild(left);
    row.appendChild(st);
    el.playersList.appendChild(row);
  }

  el.playersCount.textContent = `${players.length}/${MAX_PLAYERS}`;
}

function syncLobbyUI() {
  const room = state.room;
  if (!room) return;
  el.roomCodeText.textContent = room.code || state.roomCode || "---";
  el.hostPill.textContent = `Host: ${room.hostName || "—"}`;

  const isHost = room.hostId === state.me.uid;
  el.hostSettings.classList.toggle("hidden", !isHost || room.status !== "waiting");
  el.btnStart.classList.toggle("hidden", !canHostStart(room, state.players));

  if (isHost && room.status === "waiting") {
    const s = room.settings || {};
    if (s.mode) el.modeSelect.value = s.mode;
    if (s.hideSeconds) el.hideTimeSelect.value = String(s.hideSeconds);
    if (s.gameSeconds) el.gameTimeSelect.value = String(s.gameSeconds);
    el.powerupsToggle.value = s.powerupsEnabled ? "on" : "off";
  }

  const me = myPlayer();
  el.btnReady.textContent = me?.ready ? "لا رجعت في كلامي 😅" : "أنا جاهز ✅";

  renderPlayers();
}

function watchRoom(code) {
  clearRoomListeners();
  stopTicker();
  stopScanner();

  const { roomRef, playersCol, eventsCol } = getRoomRefs(code);

  const uRoom = fs.onSnapshot(
    roomRef,
    (snap) => {
    if (!snap.exists()) {
      toast("الغرفة اتقفلت");
      state.roomCode = null;
      clearRoomListeners();
      showView("menu");
      return;
    }
    state.room = snap.data();
    syncLobbyUI();
    routeByRoomState();
    },
    (err) => setFirestoreHint(err)
  );

  const uPlayers = fs.onSnapshot(
    playersCol,
    (snap) => {
    state.players.clear();
    for (const d of snap.docs) state.players.set(d.id, d.data());
    syncLobbyUI();
    routeByRoomState();
    },
    (err) => setFirestoreHint(err)
  );

  const qEvents = fs.query(eventsCol, fs.orderBy("at", "desc"), fs.limit(25));
  const uEvents = fs.onSnapshot(
    qEvents,
    (snap) => {
    for (const d of snap.docs) {
      if (state.lastEvents.has(d.id)) continue;
      state.lastEvents.add(d.id);
      const e = d.data();
      handleEventToast(e);
    }
    },
    (err) => setFirestoreHint(err)
  );

  state.unsub.push(uRoom, uPlayers, uEvents);
}

function handleEventToast(e) {
  const t = e?.type;
  if (t === "catch") {
    toast(`❌ ${e.targetName || "لاعب"} اتمسك!`);
    if (e.targetUid === state.me.uid) {
      failSound();
      vibrate(500);
    }
  } else if (t === "powerup") {
    toast(`✨ ${e.nickname || "لاعب"} استخدم ${e.powerup || "Power-up"}`);
  } else if (t === "alert") {
    toast(`📢 Alert!`);
    showAlertOverlay(4800);
    alertSound(4800);
    vibrate([140, 90, 140, 90, 140, 90, 140]);
  } else if (t === "join") {
    toast(`✅ ${e.nickname || "لاعب"} انضم`);
  } else if (t === "leave") {
    toast(`🚪 ${e.nickname || "لاعب"} خرج`);
  } else if (t === "finish") {
    toast("🏁 اللعبة خلصت");
    vibrate([100, 50, 100]);
  }
}

function myPlayer() {
  return state.players.get(state.me.uid) || null;
}

function routeByRoomState() {
  const room = state.room;
  if (!room) return;
  const me = myPlayer();
  if (!me) return;

  const status = room.status;
  if (status === "waiting") {
    showView("lobby");
    stopScanner();
    stopTicker();
    return;
  }
  if (status === "hiding") {
    showHidingPhase(room, me);
    return;
  }
  if (status === "playing") {
    if (me.status === "caught" && !state.spectate && room.settings?.mode !== "infected") {
      el.caughtByName.textContent = me.caughtByName || "—";
      showView("caught");
      stopScanner();
      stopTicker();
      return;
    }
    showPlaying(room, me);
    return;
  }
  if (status === "finished") {
    showResults(room);
    return;
  }
}

function showHidingPhase(room, me) {
  showView("hiding");
  stopScanner();
  state.spectate = false;

  const isSeeker = me.uid === room.seekerId;
  el.hidingTitle.textContent = isSeeker ? "استنى... 👁️" : "استخبوا! 🏃";
  el.hidingHint.textContent = isSeeker ? "ماتفتحش الكاميرا دلوقتي" : "خبّي نفسك وموبايلك";

  let last = null;
  setTicker(() => {
    const left = computeCountdown(room, "hiding");
    if (left == null) {
      el.hidingTimer.textContent = "--";
      return;
    }
    el.hidingTimer.textContent = String(clamp(left, 0, 999));
    if (left > 0 && left <= 10 && left !== last) tickSound();
    last = left;
    maybeAdvanceToPlaying(room);
  });
}

async function maybeAdvanceToPlaying(room) {
  if (!firebaseEnabled) return;
  if (room.hostId !== state.me.uid) return;
  if (room.status !== "hiding") return;
  const left = computeCountdown(room, "hiding");
  if (left == null) return;
  if (left > 0) return;
  const roomRef = fs.doc(fb.db, "rooms", room.code);
  try {
    await fs.runTransaction(fb.db, async (tx) => {
      const snap = await tx.get(roomRef);
      if (!snap.exists()) return;
      const r = snap.data();
      if (r.status !== "hiding") return;
      tx.update(roomRef, { status: "playing" });
    });
  } catch {}
}

function ensureQrRendered(room, me) {
  if (!me.qrToken) return;
  const enabled = !!room.settings?.powerupsEnabled;
  const ghostOn = enabled && (me.ghostUntilMs || 0) > nowMs();
  el.qrBox.style.opacity = ghostOn ? "0.08" : "1";
  el.qrBox.style.filter = ghostOn ? "blur(10px)" : "none";
  const cosmetics = normalizeCosmetics(state.me.cosmetics);
  const qrItem = catalogItem("qrThemes", cosmetics.equipped.qrThemeId);
  if (qrItem) {
    el.qrBox.style.borderColor = qrItem.border;
    el.qrBox.style.background = qrItem.bg;
  }
  el.qrBox.innerHTML = "";
  const payload = qrPayload(room.code, me.uid, me.qrToken);
  state.qr = new window.QRCode(el.qrBox, {
    text: payload,
    width: el.qrBox.clientWidth,
    height: el.qrBox.clientHeight,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: window.QRCode.CorrectLevel.M,
  });
}

function renderPowerupsForHider(room, me) {
  const enabled = !!room.settings?.powerupsEnabled;
  el.hiderPowerups.classList.toggle("hidden", !enabled);
  if (!enabled) return;
  el.hiderPowerups.innerHTML = "";

  const ghostBtn = document.createElement("button");
  ghostBtn.type = "button";
  ghostBtn.className = "powerup";
  ghostBtn.textContent = `👻 Ghost (${me.ghostUses ?? 0})`;
  ghostBtn.setAttribute("aria-disabled", (me.ghostUses ?? 0) <= 0 ? "true" : "false");
  ghostBtn.addEventListener("click", () => useGhost(room, me));

  const shieldBtn = document.createElement("button");
  shieldBtn.type = "button";
  shieldBtn.className = "powerup";
  shieldBtn.textContent = `🛡️ Shield (${me.shieldUses ?? 0})`;
  shieldBtn.setAttribute("aria-disabled", (me.shieldUses ?? 0) <= 0 ? "true" : "false");
  shieldBtn.addEventListener("click", () => toast("الـ Shield بيشتغل تلقائي"));

  el.hiderPowerups.appendChild(ghostBtn);
  el.hiderPowerups.appendChild(shieldBtn);
}

function renderPowerupsForSeeker(room, me) {
  const enabled = !!room.settings?.powerupsEnabled;
  el.seekerPowerups.classList.toggle("hidden", !enabled);
  if (!enabled) return;
  el.seekerPowerups.innerHTML = "";

  const alertBtn = document.createElement("button");
  alertBtn.type = "button";
  alertBtn.className = "powerup";
  alertBtn.textContent = `📢 Alert (${me.alertUses ?? 0})`;
  alertBtn.setAttribute("aria-disabled", (me.alertUses ?? 0) <= 0 ? "true" : "false");
  alertBtn.addEventListener("click", () => useAlert(room, me));

  el.seekerPowerups.appendChild(alertBtn);
}

function showPlaying(room, me) {
  stopTicker();
  const isSeeker = me.uid === room.seekerId || me.role === "seeker";
  if (isSeeker) showView("play-seeker");
  else showView("play-hider");

  state.spectate = false;

  setTicker(() => {
    const canEnd = room.hostId === state.me.uid && room.status === "playing";
    el.btnEndGameSeeker.classList.toggle("hidden", !canEnd || !isSeeker);
    el.btnEndGameHider.classList.toggle("hidden", !canEnd || isSeeker);

    const mode = room.settings?.mode || "classic";
    const left = computeCountdown(room, "playing");
    const txt = left == null ? "--" : fmtTimer(left);
    el.playTimerHider.textContent = txt;
    el.playTimerSeeker.textContent = txt;
    if (left != null && left <= 0) {
      vibrate([120, 80, 120]);
      maybeFinishGame(room);
    } else {
      maybeFinishGame(room);
    }
    maybeEndlessRevive(room);
    if (!isSeeker) {
      const alive =
        mode === "infected"
          ? Array.from(state.players.values()).filter((p) => p.role === "hider").length
          : Array.from(state.players.values()).filter((p) => p.status !== "caught").length;
      el.aliveCountHider.textContent = String(alive);
      ensureQrRendered(room, me);
      renderPowerupsForHider(room, me);
    } else {
      const allPlayers = Array.from(state.players.values());
      if (mode === "infected") {
        const infected = allPlayers.filter((p) => p.role === "seeker" && p.uid !== room.seekerId).length;
        el.totalCountSeeker.textContent = String(allPlayers.length);
        el.caughtCountSeeker.textContent = String(infected);
        el.caughtList.setAttribute("data-mode", "infected");
      } else {
        const total = allPlayers.length;
        const caught = allPlayers.filter((p) => p.status === "caught").length;
        el.totalCountSeeker.textContent = String(total);
        el.caughtCountSeeker.textContent = String(caught);
        el.caughtList.removeAttribute("data-mode");
      }
      renderCaughtList(room);
      renderPowerupsForSeeker(room, me);
      syncCameraGate(room, me);
    }
  });
}

function renderCaughtList(room) {
  const mode = room?.settings?.mode || "classic";
  const players = Array.from(state.players.values());

  let rows = [];
  if (mode === "infected") {
    rows = players
      .filter((p) => p.role === "seeker" && p.uid !== room.seekerId)
      .map((p) => ({
        nickname: p.nickname || "لاعب",
        by: p.caughtByName || "—",
        at: p.caughtAt?.toMillis?.() ?? 0,
      }))
      .sort((a, b) => (b.at || 0) - (a.at || 0));
  } else {
    rows = players
      .filter((p) => p.status === "caught")
      .map((p) => ({
        nickname: p.nickname || "لاعب",
        by: p.caughtByName || "—",
        at: p.caughtAt?.toMillis?.() ?? 0,
      }))
      .sort((a, b) => (b.at || 0) - (a.at || 0));
  }

  el.caughtList.innerHTML = "";
  for (const c of rows) {
    const row = document.createElement("div");
    row.className = "caught-item";
    const left = document.createElement("div");
    left.innerHTML = `<b>${escapeHtml(c.nickname)}</b>`;
    const right = document.createElement("div");
    right.textContent = `بواسطة ${c.by}`;
    row.appendChild(left);
    row.appendChild(right);
    el.caughtList.appendChild(row);
  }
}

function escapeHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function stopScanner() {
  try {
    if (state.scanner) state.scanner.stop();
  } catch {}
  state.scanner = null;
  state.torchOn = false;
  el.scanner.innerHTML = "";
  el.scannerControls.classList.add("hidden");
  el.btnTorch.classList.add("hidden");
  el.zoomRow.classList.add("hidden");
}

function canUseCamera() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

function isSecureForCamera() {
  if (window.isSecureContext) return true;
  const host = location.hostname;
  return host === "localhost" || host === "127.0.0.1";
}

function syncCameraGate(room, me) {
  const isSeeker = me.role === "seeker" || me.uid === room.seekerId;
  const showGate = isSeeker && room.status === "playing" && !state.scanner;
  el.cameraGate.classList.toggle("hidden", !showGate);
  if (!showGate) return;

  if (!isSecureForCamera()) {
    el.cameraGateHint.textContent =
      "الكاميرا مش هتشتغل على الموبايل إلا على HTTPS. لو بتفتح اللعبة من IP على http، استخدم Firebase Hosting أو أي HTTPS.";
    el.btnStartCamera.disabled = true;
    return;
  }

  if (!canUseCamera()) {
    el.cameraGateHint.textContent = "الجهاز/المتصفح ده مش بيدعم Camera API.";
    el.btnStartCamera.disabled = true;
    return;
  }

  el.cameraGateHint.textContent = "اضغط فتح الكاميرا عشان المتصفح يطلب الصلاحية.";
  el.btnStartCamera.disabled = false;
}

async function startScannerFromGesture(room) {
  const me = myPlayer();
  if (!me) return;
  if (me.role !== "seeker" && me.uid !== room.seekerId) return;
  if (state.scanner) return;

  if (!isSecureForCamera()) {
    toast("الكاميرا محتاجة HTTPS على الموبايل");
    return;
  }
  if (!canUseCamera()) {
    toast("Camera API مش متاحة");
    return;
  }
  if (!window.Html5Qrcode) {
    toast("مكتبة QR مش متاحة");
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    for (const tr of stream.getTracks()) tr.stop();
  } catch {
    toast("اسمح بالكاميرا من إعدادات المتصفح");
    return;
  }

  try {
    const scannerId = "scanner";
    state.scanner = new window.Html5Qrcode(scannerId, { verbose: false });

    let cameraIdOrConfig = { facingMode: "environment" };
    const getCameras = window.Html5Qrcode?.getCameras;
    if (typeof getCameras === "function") {
      try {
        const cams = await getCameras();
        const preferred =
          (state.cameraId && cams.find((c) => c.id === state.cameraId)) ||
          cams.find((c) => /back|rear|environment/i.test(c.label || "")) ||
          cams[cams.length - 1] ||
          null;
        if (preferred?.id) {
          state.cameraId = preferred.id;
          localStorage.setItem("kh_camera_id", preferred.id);
          cameraIdOrConfig = preferred.id;
        }
      } catch {}
    }

    const scanConfig = {
      fps: 12,
      aspectRatio: 4 / 3,
      disableFlip: true,
      useBarCodeDetectorIfSupported: true,
      qrbox: (viewfinderWidth, viewfinderHeight) => {
        const size = Math.max(200, Math.floor(Math.min(viewfinderWidth, viewfinderHeight) * 0.66));
        return { width: size, height: size };
      },
    };

    const supported = window.Html5QrcodeSupportedFormats?.QR_CODE;
    if (supported) scanConfig.formatsToSupport = [supported];

    await state.scanner.start(cameraIdOrConfig, scanConfig, async (decodedText) => {
      const parsed = parseQrPayload(decodedText);
      if (!parsed) return;
      if (parsed.roomCode !== room.code) return;
      try {
        await state.scanner.pause?.(true);
      } catch {}
      await tryCatchPlayer(room, parsed.uid, parsed.token);
      try {
        await state.scanner.resume?.();
      } catch {}
    });

    setupScannerControls();
    syncCameraGate(room, me);
  } catch {
    stopScanner();
    toast("الكاميرا محتاجة صلاحية");
  }
}

function setupScannerControls() {
  if (!state.scanner) return;
  el.scannerControls.classList.remove("hidden");

  const caps = state.scanner.getRunningTrackCapabilities?.();
  const settings = state.scanner.getRunningTrackSettings?.();

  const torchSupported = !!(settings && "torch" in settings) || !!(caps && "torch" in caps);
  el.btnTorch.classList.toggle("hidden", !torchSupported);
  state.torchOn = false;
  el.btnTorch.textContent = "🔦 فلاش";

  const zoomCaps = caps?.zoom;
  const zoomSupported = zoomCaps && typeof zoomCaps.min === "number" && typeof zoomCaps.max === "number";
  el.zoomRow.classList.toggle("hidden", !zoomSupported);
  if (zoomSupported) {
    el.zoomSlider.min = String(zoomCaps.min);
    el.zoomSlider.max = String(zoomCaps.max);
    el.zoomSlider.step = String(zoomCaps.step || 0.1);
    const currentZoom = typeof settings?.zoom === "number" ? settings.zoom : zoomCaps.min;
    el.zoomSlider.value = String(currentZoom);
  }
}

async function toggleTorch() {
  if (!state.scanner) return;
  const settings = state.scanner.getRunningTrackSettings?.();
  const torchSupported = !!(settings && "torch" in settings);
  if (!torchSupported) return toast("الفلاش مش مدعوم");
  state.torchOn = !state.torchOn;
  const on = state.torchOn;
  try {
    await state.scanner.applyVideoConstraints?.({ torch: on, advanced: [{ torch: on }] });
    el.btnTorch.textContent = on ? "🔦 فلاش: ON" : "🔦 فلاش: OFF";
  } catch {
    state.torchOn = false;
    el.btnTorch.textContent = "🔦 فلاش";
    toast("مش قادر أشغل الفلاش");
  }
}

async function setZoom(value) {
  if (!state.scanner) return;
  const v = Number(value);
  if (!Number.isFinite(v)) return;
  try {
    await state.scanner.applyVideoConstraints?.({ advanced: [{ zoom: v }] });
  } catch {}
}

async function switchCamera(room) {
  if (!state.scanner) return;
  const getCameras = window.Html5Qrcode?.getCameras;
  if (typeof getCameras !== "function") return toast("تبديل الكاميرا غير مدعوم");
  let cams = [];
  try {
    cams = await getCameras();
  } catch {
    return toast("مش قادر أجيب قائمة الكاميرات");
  }
  if (!cams.length) return toast("مفيش كاميرات");

  const idx = Math.max(
    0,
    cams.findIndex((c) => c.id === state.cameraId)
  );
  const next = cams[(idx + 1) % cams.length];
  if (!next?.id) return;

  try {
    await state.scanner.stop();
  } catch {}
  state.scanner = null;
  state.cameraId = next.id;
  localStorage.setItem("kh_camera_id", next.id);
  toast("تبديل الكاميرا...");
  await startScannerFromGesture(room);
}

async function setReady(ready) {
  if (!firebaseEnabled || !state.roomCode) return;
  const { playersCol } = getRoomRefs(state.roomCode);
  const meRef = fs.doc(playersCol, state.me.uid);
  try {
    await fs.updateDoc(meRef, { ready: !!ready });
  } catch (err) {
    setFirestoreHint(err);
  }
}

async function updateHostSettings() {
  if (!firebaseEnabled || !state.roomCode) return;
  const room = state.room;
  if (!room || room.hostId !== state.me.uid || room.status !== "waiting") return;
  const roomRef = fs.doc(fb.db, "rooms", state.roomCode);
  try {
    await fs.updateDoc(roomRef, {
      settings: {
        mode: el.modeSelect.value,
        hideSeconds: Number(el.hideTimeSelect.value),
        gameSeconds: Number(el.gameTimeSelect.value),
        powerupsEnabled: el.powerupsToggle.value === "on",
      },
    });
  } catch (err) {
    setFirestoreHint(err);
  }
}

async function startGame() {
  if (!firebaseEnabled || !state.roomCode) return;
  const room = state.room;
  if (!room || room.hostId !== state.me.uid) return;
  await updateHostSettings();

  const code = state.roomCode;
  const { roomRef, playersCol, eventsCol } = getRoomRefs(code);
  const pDocs = await fs.getDocs(fs.query(playersCol, fs.limit(MAX_PLAYERS)));
  const playerUids = pDocs.docs.map((d) => d.id);
  if (playerUids.length < 2) return;
  const seekerIdPick = playerUids[Math.floor(Math.random() * playerUids.length)];

  await fs.runTransaction(fb.db, async (tx) => {
    const rSnap = await tx.get(roomRef);
    if (!rSnap.exists()) return;
    const r = rSnap.data();
    if (r.status !== "waiting") return;
    if (playerUids.length < 2) return;

    const players = [];
    for (const uid of playerUids) {
      const pref = fs.doc(playersCol, uid);
      const psnap = await tx.get(pref);
      if (!psnap.exists()) return;
      players.push(psnap.data());
    }
    if (!players.every((p) => p.ready)) return;

    const seekerId = seekerIdPick;
    const mode = r.settings?.mode || "classic";
    const powerupsEnabled = !!r.settings?.powerupsEnabled;

    tx.update(roomRef, {
      status: "hiding",
      seekerId,
      startedAt: fs.serverTimestamp(),
      finishedAt: null,
      winner: null,
    });

    for (const p of players) {
      const pref = fs.doc(playersCol, p.uid);
      const role = p.uid === seekerId ? "seeker" : "hider";
      const qrToken = role === "hider" ? randomToken() : null;
      const base = {
        ready: false,
        role,
        status: "alive",
        qrToken,
        caughtAt: null,
        caughtBy: null,
        caughtByName: null,
        reviveAtMs: 0,
        ghostUntilMs: 0,
      };
      if (powerupsEnabled) {
        if (role === "hider") {
          base.shieldUses = 1;
          base.ghostUses = 1;
          base.alertUses = 0;
        } else {
          base.shieldUses = 0;
          base.ghostUses = 0;
          base.alertUses = 1;
        }
      } else {
        base.shieldUses = 0;
        base.ghostUses = 0;
        base.alertUses = 0;
      }
      if (mode === "infected" && role === "seeker") {
        base.status = "alive";
      }
      tx.update(pref, base);
    }

    const evRef = fs.doc(eventsCol);
    tx.set(evRef, {
      type: "start",
      at: fs.serverTimestamp(),
      seekerId,
    });
  });

  toast("🎮 بدأت!");
}

async function tryCatchPlayer(room, targetUid, token) {
  if (!firebaseEnabled || !state.roomCode) return;
  if (room.status !== "playing") return;
  if (targetUid === state.me.uid) return toast("مينفعش تمسك نفسك");

  const code = room.code;
  const { roomRef, playersCol, eventsCol } = getRoomRefs(code);
  const meUid = state.me.uid;
  const meRef = fs.doc(playersCol, meUid);
  const targetRef = fs.doc(playersCol, targetUid);

  try {
    await fs.runTransaction(fb.db, async (tx) => {
      const rSnap = await tx.get(roomRef);
      if (!rSnap.exists()) return;
      const r = rSnap.data();
      if (r.status !== "playing") return;

      const meSnap = await tx.get(meRef);
      const tSnap = await tx.get(targetRef);
      if (!meSnap.exists() || !tSnap.exists()) return;
      const me = meSnap.data();
      const target = tSnap.data();

      const mode = r.settings?.mode || "classic";
      const powerupsEnabled = !!r.settings?.powerupsEnabled;
      const seekerOk = me.uid === r.seekerId || me.role === "seeker";
      if (!seekerOk) return;

      if (mode !== "infected" && target.role !== "hider") return;
      if (target.status !== "alive") return;
      if (!target.qrToken || target.qrToken !== token) return;

      if (powerupsEnabled && (target.shieldUses ?? 0) > 0) {
        tx.update(targetRef, { shieldUses: (target.shieldUses ?? 0) - 1 });
        const evRef = fs.doc(eventsCol);
        tx.set(evRef, {
          type: "powerup",
          powerup: "Shield",
          uid: target.uid,
          nickname: target.nickname,
          at: fs.serverTimestamp(),
        });
        return;
      }

      if (mode === "infected") {
        const updates = {
          role: "seeker",
          qrToken: null,
          status: "alive",
          caughtAt: fs.serverTimestamp(),
          caughtBy: me.uid,
          caughtByName: me.nickname,
          reviveAtMs: 0,
          ghostUntilMs: 0,
        };
        if (powerupsEnabled) {
          updates.shieldUses = 0;
          updates.ghostUses = 0;
          updates.alertUses = 1;
        }
        tx.update(targetRef, updates);
      } else if (mode === "endless") {
        tx.update(targetRef, {
          status: "caught",
          caughtAt: fs.serverTimestamp(),
          caughtBy: me.uid,
          caughtByName: me.nickname,
          reviveAtMs: nowMs() + 120000,
          qrToken: null,
        });
      } else {
        tx.update(targetRef, {
          status: "caught",
          caughtAt: fs.serverTimestamp(),
          caughtBy: me.uid,
          caughtByName: me.nickname,
          qrToken: null,
        });
      }

      const evRef = fs.doc(eventsCol);
      tx.set(evRef, {
        type: "catch",
        at: fs.serverTimestamp(),
        byUid: me.uid,
        byName: me.nickname,
        targetUid: target.uid,
        targetName: target.nickname,
        mode,
      });
    });

    successSound();
    vibrate(100);
    void bumpMissionProgress("catch", 1);
  } catch {
    toast("المسكة مترفضة");
  }
}

async function useGhost(room, me) {
  if (!firebaseEnabled || !state.roomCode) return;
  if (!room.settings?.powerupsEnabled) return;
  if ((me.ghostUses ?? 0) <= 0) return;
  const { playersCol, eventsCol } = getRoomRefs(room.code);
  const meRef = fs.doc(playersCol, me.uid);
  const evRef = fs.doc(eventsCol);
  await fs.runTransaction(fb.db, async (tx) => {
    const snap = await tx.get(meRef);
    if (!snap.exists()) return;
    const p = snap.data();
    if ((p.ghostUses ?? 0) <= 0) return;
    tx.update(meRef, { ghostUses: (p.ghostUses ?? 0) - 1, ghostUntilMs: nowMs() + 30000 });
    tx.set(evRef, { type: "powerup", powerup: "Ghost", uid: me.uid, nickname: me.nickname, at: fs.serverTimestamp() });
  });
  void bumpMissionProgress("powerup", 1);
}

async function useAlert(room, me) {
  if (!firebaseEnabled || !state.roomCode) return;
  if (!room.settings?.powerupsEnabled) return;
  if ((me.alertUses ?? 0) <= 0) return;
  const { playersCol, eventsCol } = getRoomRefs(room.code);
  const meRef = fs.doc(playersCol, me.uid);
  const evRef = fs.doc(eventsCol);
  await fs.runTransaction(fb.db, async (tx) => {
    const snap = await tx.get(meRef);
    if (!snap.exists()) return;
    const p = snap.data();
    if ((p.alertUses ?? 0) <= 0) return;
    tx.update(meRef, { alertUses: (p.alertUses ?? 0) - 1 });
    tx.set(evRef, { type: "alert", uid: me.uid, nickname: me.nickname, at: fs.serverTimestamp() });
  });
  void bumpMissionProgress("powerup", 1);
}

async function maybeEndlessRevive(room) {
  if (!firebaseEnabled) return;
  if (room.settings?.mode !== "endless") return;
  const me = myPlayer();
  if (!me) return;
  if (me.status !== "caught") return;
  const reviveAt = me.reviveAtMs || 0;
  if (!reviveAt) return;
  if (nowMs() < reviveAt) return;
  const { playersCol } = getRoomRefs(room.code);
  const meRef = fs.doc(playersCol, me.uid);
  try {
    await fs.runTransaction(fb.db, async (tx) => {
      const snap = await tx.get(meRef);
      if (!snap.exists()) return;
      const p = snap.data();
      if (p.status !== "caught") return;
      if ((p.reviveAtMs || 0) > nowMs()) return;
      tx.update(meRef, { status: "alive", reviveAtMs: 0, caughtBy: null, caughtByName: null, caughtAt: null, qrToken: randomToken() });
    });
    toast("رجعت تاني 🔄");
  } catch {}
}

function computeWinners(room) {
  const players = Array.from(state.players.values());
  const mode = room.settings?.mode || "classic";
  const aliveHiders = players.filter((p) => p.role === "hider" && p.status !== "caught");
  const allHidersCaught = aliveHiders.length === 0;
  if (mode === "infected") {
    const remainingHiders = players.filter((p) => p.role === "hider").length;
    if (remainingHiders === 0) return { winner: "seekers", winnerNames: [] };
    const left = computeCountdown(room, "playing");
    if (left != null && left <= 0) return { winner: "hiders", winnerNames: [] };
    return null;
  }
  if (allHidersCaught) return { winner: "seeker", winnerNames: [] };
  const left = computeCountdown(room, "playing");
  if (left != null && left <= 0) return { winner: "hiders", winnerNames: aliveHiders.map((p) => p.nickname) };
  return null;
}

async function maybeFinishGame(room) {
  if (!firebaseEnabled) return;
  if (room.hostId !== state.me.uid) return;
  if (room.status !== "playing") return;
  const res = computeWinners(room);
  if (!res) return;
  const roomRef = fs.doc(fb.db, "rooms", room.code);
  const { eventsCol } = getRoomRefs(room.code);
  try {
    await fs.runTransaction(fb.db, async (tx) => {
      const snap = await tx.get(roomRef);
      if (!snap.exists()) return;
      const r = snap.data();
      if (r.status !== "playing") return;
      tx.update(roomRef, {
        status: "finished",
        finishedAt: fs.serverTimestamp(),
        winner: res.winner,
      });
      const evRef = fs.doc(eventsCol);
      tx.set(evRef, { type: "finish", at: fs.serverTimestamp(), winner: res.winner });
    });
  } catch {}
}

async function endGameByHost() {
  if (!firebaseEnabled || !state.roomCode || !state.room) return;
  const room = state.room;
  if (room.hostId !== state.me.uid) return;
  if (room.status !== "playing" && room.status !== "hiding") return;
  const roomRef = fs.doc(fb.db, "rooms", room.code);
  const { eventsCol } = getRoomRefs(room.code);
  try {
    await fs.runTransaction(fb.db, async (tx) => {
      const snap = await tx.get(roomRef);
      if (!snap.exists()) return;
      const r = snap.data();
      if (r.status === "finished") return;
      tx.update(roomRef, {
        status: "finished",
        finishedAt: fs.serverTimestamp(),
        winner: "ended",
      });
      const evRef = fs.doc(eventsCol);
      tx.set(evRef, { type: "finish", at: fs.serverTimestamp(), winner: "ended" });
    });
    toast("🛑 اللعبة اتنهت");
  } catch (err) {
    setFirestoreHint(err);
  }
}

async function resetRoomForRematch() {
  if (!firebaseEnabled || !state.roomCode || !state.room) return;
  const room = state.room;
  if (room.hostId !== state.me.uid) return toast("الـ Host بس يقدر يبدأ جولة جديدة");
  if (room.status !== "finished") return;
  const { roomRef, playersCol, eventsCol } = getRoomRefs(room.code);
  try {
    const pDocs = await fs.getDocs(fs.query(playersCol, fs.limit(MAX_PLAYERS)));
    const playerUids = pDocs.docs.map((d) => d.id);
    await fs.runTransaction(fb.db, async (tx) => {
      const rSnap = await tx.get(roomRef);
      if (!rSnap.exists()) return;
      const r = rSnap.data();
      if (r.status !== "finished") return;

      tx.update(roomRef, {
        status: "waiting",
        seekerId: null,
        startedAt: null,
        finishedAt: null,
        winner: null,
      });

      for (const uid of playerUids) {
        const pref = fs.doc(playersCol, uid);
        const psnap = await tx.get(pref);
        if (!psnap.exists()) continue;
        tx.update(pref, {
          ready: false,
          role: null,
          status: "alive",
          qrToken: null,
          caughtAt: null,
          caughtBy: null,
          caughtByName: null,
          reviveAtMs: 0,
          ghostUntilMs: 0,
          shieldUses: 0,
          ghostUses: 0,
          alertUses: 0,
        });
      }

      const evRef = fs.doc(eventsCol);
      tx.set(evRef, { type: "rematch", at: fs.serverTimestamp() });
    });
    toast("🔄 جولة جديدة جاهزة");
  } catch (err) {
    setFirestoreHint(err);
  }
}

function renderResultsRewards() {
  if (!el.resultsRewards) return;
  el.resultsRewards.innerHTML = "";

  if (!firebaseEnabled) {
    const row = document.createElement("div");
    row.className = "results-row";
    row.innerHTML = `<div><b>🪙 Coins</b></div><div>—</div>`;
    el.resultsRewards.appendChild(row);
    return;
  }

  const r = state.lastMatchReward;
  if (!r) {
    const row = document.createElement("div");
    row.className = "results-row";
    row.innerHTML = `<div><b>⏳</b></div><div>جاري حساب المكافآت...</div>`;
    el.resultsRewards.appendChild(row);
    return;
  }

  if (r.alreadyClaimed) {
    const row = document.createElement("div");
    row.className = "results-row";
    row.innerHTML = `<div><b>ℹ️</b></div><div>مكافآت الماتش اتضافت قبل كده</div>`;
    el.resultsRewards.appendChild(row);
    const row2 = document.createElement("div");
    row2.className = "results-row";
    row2.innerHTML = `<div><b>💰 رصيدك</b></div><div>${escapeHtml(String(r.coinsAfter ?? state.me.coins ?? 0))}</div>`;
    el.resultsRewards.appendChild(row2);
    return;
  }

  const rows = [
    { k: "🪙 Coins (الماتش)", v: `+${r.base || 0}` },
    { k: "🎁 Daily Bonus", v: `+${r.dailyBonus || 0}` },
    { k: "🔥 Streak", v: String(r.streak || 0) },
    { k: "✅ الإجمالي", v: `+${r.earned || 0}` },
    { k: "💰 رصيدك", v: String(r.coinsAfter ?? state.me.coins ?? 0) },
  ];

  for (const it of rows) {
    const row = document.createElement("div");
    row.className = "results-row";
    row.innerHTML = `<div><b>${escapeHtml(it.k)}</b></div><div>${escapeHtml(it.v)}</div>`;
    el.resultsRewards.appendChild(row);
  }
}

function showResults(room) {
  stopScanner();
  stopTicker();
  showView("results");
  state.lastMatchReward = null;
  const w = room.winner;
  if (w === "seeker") el.winnerTitle.textContent = "🏆 الـ Seeker كسب!";
  else if (w === "hiders") el.winnerTitle.textContent = "🏆 الـ Hiders كسبوا!";
  else if (w === "seekers") el.winnerTitle.textContent = "🏆 الـ Seekers كسبوا!";
  else if (w === "ended") el.winnerTitle.textContent = "🛑 اللعبة اتنهت";
  else el.winnerTitle.textContent = "🏁 النتيجة";

  const players = Array.from(state.players.values());
  const mode = room.settings?.mode || "classic";
  const seeker = players.find((p) => p.uid === room.seekerId) || players.find((p) => p.role === "seeker") || null;
  const caught = players.filter((p) => p.status === "caught");
  const alive = players.filter((p) => p.status !== "caught" && p.role === "hider");

  const rows = [];
  if (mode === "infected") {
    const infected = players.filter((p) => p.role === "seeker" && p.uid !== room.seekerId);
    const remaining = players.filter((p) => p.role === "hider");
    if (seeker) rows.push({ k: "المصاب الأول", v: `${seeker.nickname} (+${infected.length})` });
    rows.push({ k: "الناجين", v: remaining.length ? remaining.map((p) => p.nickname).join("، ") : "—" });
    rows.push({ k: "المصابين", v: infected.length ? infected.map((p) => p.nickname).join("، ") : "—" });
  } else {
    if (seeker) rows.push({ k: "Seeker", v: `${seeker.nickname} (${caught.length}/${players.length - 1})` });
    rows.push({ k: "الناجين", v: alive.length ? alive.map((p) => p.nickname).join("، ") : "—" });
    rows.push({ k: "المتمسكين", v: caught.length ? caught.map((p) => p.nickname).join("، ") : "—" });
  }

  el.resultsDetails.innerHTML = "";
  for (const r of rows) {
    const row = document.createElement("div");
    row.className = "results-row";
    row.innerHTML = `<div><b>${escapeHtml(r.k)}</b></div><div>${escapeHtml(r.v)}</div>`;
    el.resultsDetails.appendChild(row);
  }

  renderResultsRewards();
  void maybeAwardCoins(room).then(() => renderResultsRewards());
  confettiBurst();
}

function confettiBurst() {
  const canvas = el.confetti;
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, Math.floor(rect.width * devicePixelRatio));
  canvas.height = Math.max(1, Math.floor(rect.height * devicePixelRatio));
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

  const pieces = [];
  const cosmetics = normalizeCosmetics(state.me.cosmetics);
  const conf = catalogItem("confetti", cosmetics.equipped.confettiId);
  const colors = conf?.colors || ["#ff9f43", "#1dd1a1", "#48dbfb", "#ff6b6b", "#2f3542"];
  for (let i = 0; i < 120; i++) {
    pieces.push({
      x: rect.width / 2 + (Math.random() - 0.5) * 120,
      y: rect.height - 10,
      vx: (Math.random() - 0.5) * 6,
      vy: -Math.random() * 8 - 4,
      g: 0.16 + Math.random() * 0.12,
      r: 3 + Math.random() * 4,
      c: colors[Math.floor(Math.random() * colors.length)],
    });
  }

  const t0 = performance.now();
  function frame(t) {
    const dt = (t - t0) / 1000;
    ctx.clearRect(0, 0, rect.width, rect.height);
    for (const p of pieces) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.g * 60;
      ctx.fillStyle = p.c;
      ctx.fillRect(p.x, p.y, p.r, p.r);
    }
    if (dt < 2.2) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function isWinnerForPlayer(room, p) {
  const w = room.winner;
  if (w === "ended") return false;
  if (!p) return false;
  if (w === "seeker") return p.uid === room.seekerId;
  if (w === "hiders") return p.role === "hider";
  if (w === "seekers") return p.role === "seeker";
  return false;
}

async function maybeAwardCoins(room) {
  if (!firebaseEnabled) return;
  if (!fb.db || !state.me.uid) return;
  const finishedAtMs = room.finishedAt?.toMillis?.() ?? 0;
  if (!finishedAtMs) return;
  const rewardId = `${room.code}:${finishedAtMs}`;
  if (state.rewardInFlight === rewardId) return;
  state.rewardInFlight = rewardId;
  let awardResult = null;

  const now = new Date();
  const today = localDayKey(now);
  const yesterday = localDayKey(new Date(now.getTime() - 86400000));

  try {
    const userRef = fs.doc(fb.db, "users", state.me.uid);
    const me = myPlayer();
    await fs.runTransaction(fb.db, async (tx) => {
      const snap = await tx.get(userRef);
      if (!snap.exists()) return;
      const data = snap.data() || {};
      const rewards = data.rewards || {};
      const claimed = Array.isArray(rewards.claimedRewardIds) ? rewards.claimedRewardIds : [];
      if (claimed.includes(rewardId)) {
        awardResult = { alreadyClaimed: true, coinsAfter: Number(data.coins || 0) };
        return;
      }

      const didWin = isWinnerForPlayer(room, me);
      const base = didWin ? 12 : room.winner === "ended" ? 4 : 6;

      let dailyBonus = 0;
      const lastDaily = String(rewards.lastDaily || "");
      let streak = Number(rewards.streak || 0);
      if (lastDaily !== today) {
        streak = lastDaily === yesterday ? Math.min(streak + 1, 30) : 1;
        dailyBonus = 20 + Math.min((streak - 1) * 2, 20);
      }

      const coinsNow = Number(data.coins || 0);
      const earned = base + dailyBonus;
      const coinsNext = coinsNow + earned;

      const stats = data.stats || {};
      const games = Number(stats.games || 0) + 1;
      const wins = Number(stats.wins || 0) + (didWin ? 1 : 0);
      const asSeeker = Number(stats.asSeeker || 0) + (me?.uid === room.seekerId ? 1 : 0);
      const asHider = Number(stats.asHider || 0) + (me?.uid === room.seekerId ? 0 : 1);

      let missions = normalizeMissions(data.missions);
      if (missions.dayKey !== today) missions = pickDailyMissions(state.me.uid, today);
      if (missions.items) {
        for (const m of Object.values(missions.items)) {
          if (!m || typeof m !== "object") continue;
          if (m.type === "play" && !missionDone(m)) {
            m.progress = Math.min(Number(m.target || 0), Number(m.progress || 0) + 1);
          }
          if (m.type === "win" && didWin && !missionDone(m)) {
            m.progress = Math.min(Number(m.target || 0), Number(m.progress || 0) + 1);
          }
        }
      }

      const patch = {
        coins: coinsNext,
        "stats.games": games,
        "stats.wins": wins,
        "stats.asSeeker": asSeeker,
        "stats.asHider": asHider,
        missions,
        "rewards.claimedRewardIds": fs.arrayUnion(rewardId),
      };

      if (lastDaily !== today) {
        patch["rewards.lastDaily"] = today;
        patch["rewards.streak"] = streak;
      }

      tx.update(userRef, patch);
      awardResult = { alreadyClaimed: false, base, dailyBonus, streak, earned, coinsAfter: coinsNext };
    });

    await loadMyUserDoc();
    if (awardResult) state.lastMatchReward = awardResult;
  } catch (err) {
    setFirestoreHint(err);
  } finally {
    if (state.rewardInFlight === rewardId) state.rewardInFlight = "";
  }
}

function setActiveStoreTab(category) {
  state.storeCategory = category;
  const map = {
    frames: el.storeTabFrames,
    nameColors: el.storeTabNameColors,
    badges: el.storeTabBadges,
    qrThemes: el.storeTabQrThemes,
    confetti: el.storeTabConfetti,
  };
  for (const [k, btn] of Object.entries(map)) {
    if (!btn) continue;
    btn.classList.toggle("chip--active", k === category);
  }
  renderStore();
}

function renderStore() {
  if (!el.storeList) return;
  const cosmetics = normalizeCosmetics(state.me.cosmetics);
  const category = state.storeCategory || "frames";
  const items = STORE_CATALOG[category] || [];
  const owned = cosmetics.owned[category] || [];
  const equippedId =
    category === "frames"
      ? cosmetics.equipped.frameId
      : category === "nameColors"
        ? cosmetics.equipped.nameColorId
        : category === "badges"
          ? cosmetics.equipped.badgeId
          : category === "qrThemes"
            ? cosmetics.equipped.qrThemeId
            : cosmetics.equipped.confettiId;

  el.storeCoins.textContent = String(state.me.coins || 0);
  el.storeList.innerHTML = "";

  for (const it of items) {
    const isOwned = owned.includes(it.id) || it.price === 0;
    const isEquipped = it.id === equippedId;

    const row = document.createElement("div");
    row.className = "store-item";

    const left = document.createElement("div");
    left.className = "store-item__left";
    const title = document.createElement("div");
    title.className = "store-item__title";
    title.textContent = it.name;
    const meta = document.createElement("div");
    meta.className = "store-item__meta";

    if (category === "nameColors") {
      meta.textContent = "لون";
      title.style.color = it.color;
    } else if (category === "frames") {
      meta.textContent = "إطار";
    } else if (category === "badges") {
      meta.textContent = it.icon ? `شارة ${it.icon}` : "بدون شارة";
    } else if (category === "qrThemes") {
      meta.textContent = "ثيم QR";
    } else if (category === "confetti") {
      meta.textContent = "احتفال";
    }

    left.appendChild(title);
    left.appendChild(meta);

    const right = document.createElement("div");
    right.className = "store-item__right";

    const price = document.createElement("div");
    price.className = "store-item__price";
    price.textContent = it.price ? `🪙 ${it.price}` : "مجاني";

    const badge = document.createElement("div");
    badge.className = "store-item__badge";
    badge.textContent = !isOwned ? "غير مملوك" : isEquipped ? "مفعّل" : "مملوك";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-small";

    if (!isOwned) {
      btn.textContent = "شراء";
      btn.addEventListener("click", () => buyCosmetic(category, it));
    } else if (isEquipped) {
      btn.textContent = "مفعّل";
      btn.disabled = true;
    } else {
      btn.textContent = "تفعيل";
      btn.addEventListener("click", () => equipCosmetic(category, it));
    }

    right.appendChild(price);
    right.appendChild(badge);
    right.appendChild(btn);

    row.appendChild(left);
    row.appendChild(right);
    el.storeList.appendChild(row);
  }
}

async function buyCosmetic(category, item) {
  if (!firebaseEnabled || !fb.db || !state.me.uid) return;
  try {
    const userRef = fs.doc(fb.db, "users", state.me.uid);
    await fs.runTransaction(fb.db, async (tx) => {
      const snap = await tx.get(userRef);
      if (!snap.exists()) return;
      const data = snap.data() || {};
      const coins = Number(data.coins || 0);
      const cosmetics = normalizeCosmetics(data.cosmetics);
      const owned = cosmetics.owned[category] || [];
      if (owned.includes(item.id)) return;
      if (coins < item.price) throw { code: "insufficient-coins" };
      const nextCoins = coins - item.price;
      const patch = { coins: nextCoins };
      patch[`cosmetics.owned.${category}`] = fs.arrayUnion(item.id);
      tx.update(userRef, patch);
    });
    await loadMyUserDoc();
    toast("اتشرى ✅");
    renderStore();
  } catch (err) {
    if (String(err?.code || "") === "insufficient-coins") toast("الرصيد مش كفاية");
    else setFirestoreHint(err);
  }
}

async function equipCosmetic(category, item) {
  if (!firebaseEnabled || !fb.db || !state.me.uid) return;
  const field =
    category === "frames"
      ? "frameId"
      : category === "nameColors"
        ? "nameColorId"
        : category === "badges"
          ? "badgeId"
          : category === "qrThemes"
            ? "qrThemeId"
            : "confettiId";

  try {
    const userRef = fs.doc(fb.db, "users", state.me.uid);
    await fs.updateDoc(userRef, { [`cosmetics.equipped.${field}`]: item.id });
    await loadMyUserDoc();
    await pushMyCosmeticsToRoomPlayer();
    renderStore();
    toast("اتفعّل ✅");
  } catch (err) {
    setFirestoreHint(err);
  }
}

async function pushMyCosmeticsToRoomPlayer() {
  if (!firebaseEnabled || !fb.db) return;
  if (!state.roomCode || !state.me.uid) return;
  try {
    const cosmetics = normalizeCosmetics(state.me.cosmetics);
    const badgeItem = catalogItem("badges", cosmetics.equipped.badgeId);
    const meRef = fs.doc(fb.db, "rooms", state.roomCode, "players", state.me.uid);
    await fs.setDoc(
      meRef,
      {
        nameColorId: cosmetics.equipped.nameColorId,
        frameId: cosmetics.equipped.frameId,
        badgeId: cosmetics.equipped.badgeId,
        badgeIcon: badgeItem?.icon || "",
      },
      { merge: true }
    );
  } catch {}
}

async function loadStats() {
  if (!firebaseEnabled) {
    el.statsBox.innerHTML = "";
    el.statsBox.appendChild(statRow("إجمالي الألعاب", "—"));
    el.statsBox.appendChild(statRow("نسبة الفوز", "—"));
    return;
  }
  try {
    if (!fb.db || !state.me.uid) throw { code: "unavailable" };
    const userRef = fs.doc(fb.db, "users", state.me.uid);
    const snap = await fs.getDoc(userRef);
    const stats = snap.data()?.stats || {};
    const games = stats.games || 0;
    const wins = stats.wins || 0;
    const winRate = games ? Math.round((wins / games) * 100) : 0;
    el.statsBox.innerHTML = "";
    el.statsBox.appendChild(statRow("إجمالي الألعاب", String(games)));
    el.statsBox.appendChild(statRow("نسبة الفوز", `${winRate}%`));
    el.statsBox.appendChild(statRow("عدد المرات كـ Seeker", String(stats.asSeeker || 0)));
    el.statsBox.appendChild(statRow("عدد المرات كـ Hider", String(stats.asHider || 0)));
    el.statsBox.appendChild(statRow("عدد المسكات", String(stats.catches || 0)));
    el.statsBox.appendChild(statRow("عدد الهروبات", String(stats.escapes || 0)));
  } catch (err) {
    setFirestoreHint(err);
    el.statsBox.innerHTML = "";
    el.statsBox.appendChild(statRow("إجمالي الألعاب", "—"));
    el.statsBox.appendChild(statRow("نسبة الفوز", "—"));
  }
}

function statRow(k, v) {
  const row = document.createElement("div");
  row.className = "stat";
  row.innerHTML = `<div><b>${escapeHtml(k)}</b></div><div>${escapeHtml(v)}</div>`;
  return row;
}

function bindUI() {
  el.btnEnter.addEventListener("click", async () => {
    const ok = await saveProfileFromInputs();
    if (!ok) return;
    syncMenuHeader();
    showView("menu");
  });

  if (el.btnInstallClose) el.btnInstallClose.addEventListener("click", dismissInstallBanner);
  if (el.btnInstall) {
    el.btnInstall.addEventListener("click", async () => {
      if (!shouldShowInstallBanner()) return;

      if (isIosDevice()) {
        if (el.installHelp) {
          el.installHelp.textContent = installHelpHtml();
          el.installHelp.classList.remove("hidden");
        }
        return;
      }

      const p = deferredInstallPrompt;
      if (p && typeof p.prompt === "function") {
        try {
          await p.prompt();
          const res = await p.userChoice;
          deferredInstallPrompt = null;
          if (res?.outcome === "accepted") dismissInstallBanner();
        } catch {}
        return;
      }

      if (el.installHelp) {
        el.installHelp.textContent = "لو مش ظاهر زر التثبيت: افتح قائمة المتصفح (⋮) ثم Install app / Add to Home screen.";
        el.installHelp.classList.remove("hidden");
      }
    });
  }

  el.btnCreateRoom.addEventListener("click", createRoom);
  if (el.btnStore) {
    el.btnStore.addEventListener("click", async () => {
      await loadMyUserDoc();
      setActiveStoreTab(state.storeCategory || "frames");
      showView("store");
    });
  }

  el.btnJoinRoom.addEventListener("click", () => {
    el.joinPanel.classList.toggle("hidden");
    el.roomCodeInput.focus();
  });
  el.roomCodeInput.addEventListener("input", () => {
    el.roomCodeInput.value = normalizeRoomCode(el.roomCodeInput.value);
  });
  el.btnJoinConfirm.addEventListener("click", () => joinRoom(el.roomCodeInput.value));

  el.btnCopyRoom.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(state.roomCode || "");
      toast("اتنسخ ✅");
    } catch {
      toast("مش قادر أنسخ");
    }
  });

  el.btnReady.addEventListener("click", async () => {
    const me = myPlayer();
    await setReady(!(me?.ready));
  });

  el.btnStart.addEventListener("click", startGame);
  el.btnLeave.addEventListener("click", leaveRoom);

  el.btnStartCamera.addEventListener("click", async () => {
    if (!state.room) return;
    await startScannerFromGesture(state.room);
  });
  el.btnTorch.addEventListener("click", toggleTorch);
  el.zoomSlider.addEventListener("input", (e) => setZoom(e.target.value));
  el.btnSwitchCamera.addEventListener("click", async () => {
    if (!state.room) return;
    await switchCamera(state.room);
  });

  el.btnEndGameSeeker.addEventListener("click", endGameByHost);
  el.btnEndGameHider.addEventListener("click", endGameByHost);

  el.modeSelect.addEventListener("change", updateHostSettings);
  el.hideTimeSelect.addEventListener("change", updateHostSettings);
  el.gameTimeSelect.addEventListener("change", updateHostSettings);
  el.powerupsToggle.addEventListener("change", updateHostSettings);

  el.btnSpectate.addEventListener("click", () => {
    state.spectate = true;
    routeByRoomState();
  });

  el.btnPlayAgain.addEventListener("click", async () => {
    if (!state.roomCode) return showView("menu");
    if (state.room?.status === "finished") {
      if (state.room.hostId === state.me.uid) {
        await resetRoomForRematch();
      } else {
        toast("استنى الـ Host يعمل جولة جديدة");
      }
      return;
    }
    showView("lobby");
  });

  el.btnNewRoom.addEventListener("click", async () => {
    await leaveRoom();
    await createRoom();
  });

  el.btnHome.addEventListener("click", async () => {
    await leaveRoom();
    showView("menu");
  });

  el.btnSettings.addEventListener("click", () => {
    el.nicknameSettings.value = state.me.nickname;
    setSelectedAvatar(el.avatarGridSettings, state.me.avatar);
    showView("settings");
  });
  el.btnHeaderSettings.addEventListener("click", () => {
    el.nicknameSettings.value = state.me.nickname;
    setSelectedAvatar(el.avatarGridSettings, state.me.avatar);
    showView("settings");
  });
  el.btnSaveSettings.addEventListener("click", saveSettings);
  el.btnBackFromSettings.addEventListener("click", () => showView(state.roomCode ? "lobby" : "menu"));
  if (el.btnCopyUid) {
    el.btnCopyUid.addEventListener("click", async () => {
      try {
        const uid = state.me.uid || "";
        if (!uid) return toast("UID مش جاهز");
        await navigator.clipboard.writeText(uid);
        toast("اتنسخ ✅");
      } catch {
        toast("مش قادر أنسخ");
      }
    });
  }

  el.btnStats.addEventListener("click", async () => {
    await loadStats();
    showView("stats");
  });
  el.btnBackFromStats.addEventListener("click", () => showView("menu"));
  if (el.btnBackFromStore) el.btnBackFromStore.addEventListener("click", () => showView("menu"));
  if (el.storeTabFrames) el.storeTabFrames.addEventListener("click", () => setActiveStoreTab("frames"));
  if (el.storeTabNameColors) el.storeTabNameColors.addEventListener("click", () => setActiveStoreTab("nameColors"));
  if (el.storeTabBadges) el.storeTabBadges.addEventListener("click", () => setActiveStoreTab("badges"));
  if (el.storeTabQrThemes) el.storeTabQrThemes.addEventListener("click", () => setActiveStoreTab("qrThemes"));
  if (el.storeTabConfetti) el.storeTabConfetti.addEventListener("click", () => setActiveStoreTab("confetti"));

  window.addEventListener("beforeunload", () => {
    stopScanner();
    stopTicker();
  });
}

async function boot() {
  registerPwa();
  setupInstallBannerHooks();
  await ensureMe();
  syncMenuHeader();
  bindUI();
  maybeShowInstallBanner();
  showView(state.me.nickname ? "menu" : "home");
}

boot();

