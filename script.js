// ============================================================
// SUPABASE & STATE INIT
// ============================================================
const SUPABASE_URL = "https://qdzupoeysskwbjjrncgr.supabase.co";

const SUPABASE_ANON_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkenVwb2V5c3Nrd2JqanJuY2dyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2ODU4MTEsImV4cCI6MjA4ODI2MTgxMX0.hZzMZODpM9B7Ym7rx3UskCeGLV84s3FvQkH4x5kK0Qw`;

// 🚨 NOTICE THE CHANGE HERE: 'supabaseClient' instead of 'supabase'
const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
);

let currentUser = null;
let saveTimer = null;

// ============================================================
// PROGRESSION LISTS
// ============================================================
const PROG_VERT_PUSH = [
  { name: "Bench Dips (feet on floor)", type: "reps" },
  { name: "Bench Dips (feet elevated)", type: "reps" },
  { name: "Straight Bar Dips (low height)", type: "reps" },
  { name: "Parallel Bar Dips", type: "reps" },
  { name: "Deep Parallel Bar Dips", type: "reps" },
  { name: "Korean Dips", type: "reps" },
  { name: "Ring Dips", type: "reps" },
  { name: "Bulgarian Dips", type: "reps" },
  { name: "Weighted Dips", type: "reps" },
  { name: "One-Arm Assisted Dip", type: "reps" },
];
const PROG_HORIZ_PUSH = [
  { name: "Wall Push-ups", type: "reps" },
  { name: "Knee Push-ups", type: "reps" },
  { name: "Incline Push-ups", type: "reps" },
  { name: "Standard Push-ups", type: "reps" },
  { name: "Close-Grip Push-ups", type: "reps" },
  { name: "Wide Push-ups", type: "reps" },
  { name: "Decline Push-ups", type: "reps" },
  { name: "Archer Push-ups", type: "reps" },
  { name: "Pseudo Planche Push-ups", type: "reps" },
  { name: "One-Arm Push-ups", type: "reps" },
  { name: "Planche Push-ups", type: "reps" },
];
const PROG_SHOULDER = [
  { name: "Pike Hold (static)", type: "hold" },
  { name: "Pike Push-ups", type: "reps" },
  { name: "Elevated Pike Push-ups", type: "reps" },
  { name: "Wall Handstand Hold", type: "hold" },
  { name: "Wall Handstand Push-ups (partial ROM)", type: "reps" },
  { name: "Full Wall Handstand Push-ups", type: "reps" },
  { name: "Freestanding Handstand Push-ups", type: "reps" },
  { name: "Deficit Handstand Push-ups", type: "reps" },
];
const PROG_VERT_PULL = [
  { name: "Active Dead Hang", type: "hold" },
  { name: "Scapular Pull-ups", type: "reps" },
  { name: "Jumping Pull-ups", type: "reps" },
  { name: "Negative Pull-ups", type: "reps" },
  { name: "Chin-ups (underhand)", type: "reps" },
  { name: "Neutral Grip Pull-ups", type: "reps" },
  { name: "Overhand Pull-ups", type: "reps" },
  { name: "Chest-to-Bar Pull-ups", type: "reps" },
  { name: "Archer Pull-ups", type: "reps" },
  { name: "Typewriter Pull-ups", type: "reps" },
  { name: "One-Arm Assisted Pull-ups", type: "reps" },
  { name: "One-Arm Pull-ups", type: "reps" },
];
const PROG_HORIZ_PULL = [
  { name: "High Bar Inverted Rows", type: "reps" },
  { name: "Standard Inverted Rows", type: "reps" },
  { name: "Feet Elevated Rows", type: "reps" },
  { name: "Archer Rows", type: "reps" },
  { name: "Wide Grip Rows", type: "reps" },
  { name: "Tuck Front Lever Rows", type: "reps" },
  { name: "Advanced Tuck Front Lever Rows", type: "reps" },
  { name: "Full Front Lever Rows", type: "reps" },
];
const PROG_SQUAT = [
  { name: "Assisted Squats", type: "reps" },
  { name: "Bodyweight Squats", type: "reps" },
  { name: "Tempo Squats", type: "reps" },
  { name: "Pause Squats", type: "reps" },
  { name: "Jump Squats", type: "reps" },
  { name: "Shrimp Squats", type: "reps" },
  { name: "Pistol Squats", type: "reps" },
];
const PROG_SINGLE_LEG = [
  { name: "Split Squats", type: "reps" },
  { name: "Bulgarian Split Squats", type: "reps" },
  { name: "Assisted Pistol Squats", type: "reps" },
  { name: "Full Pistol Squats", type: "reps" },
  { name: "Elevated Pistol Squats", type: "reps" },
  { name: "Weighted Pistol Squats", type: "reps" },
];
const PROG_GLUTE = [
  { name: "Glute Bridge", type: "hold" },
  { name: "Single-Leg Glute Bridge", type: "hold" },
  { name: "Hip Thrust", type: "reps" },
  { name: "Feet Elevated Hip Thrust", type: "reps" },
  { name: "Bulgarian Split Squat (glute bias)", type: "reps" },
  { name: "Nordic Curl", type: "reps" },
  { name: "Single-Leg Nordic", type: "reps" },
];
const PROG_CALF = [
  { name: "Double-Leg Calf Raises", type: "reps" },
  { name: "Slow Tempo Calf Raises", type: "reps" },
  { name: "Single-Leg Calf Raises", type: "reps" },
  { name: "Elevated Surface Calf Raises", type: "reps" },
  { name: "Explosive Calf Raises", type: "reps" },
  { name: "Single-Leg Explosive Calf Raises", type: "reps" },
];
const PROG_CORE_PUSH = [
  { name: "Plank", type: "hold" },
  { name: "Shoulder Taps", type: "reps" },
  { name: "Hollow Hold", type: "hold" },
  { name: "L-Sit Tuck", type: "hold" },
  { name: "Full L-Sit", type: "hold" },
  { name: "V-Ups", type: "reps" },
  { name: "Dragon Flags", type: "reps" },
];
const PROG_CORE_PULL = [
  { name: "Hanging Knee Raises", type: "reps" },
  { name: "Hanging Leg Raises", type: "reps" },
  { name: "Toes-to-Bar", type: "reps" },
  { name: "L-Sit Pull-ups", type: "reps" },
  { name: "Tuck Front Lever", type: "hold" },
  { name: "Dragon Flags", type: "reps" },
];
const PROG_CORE_LEGS = [
  { name: "Plank", type: "hold" },
  { name: "Side Plank", type: "hold" },
  { name: "Hollow Hold", type: "hold" },
  { name: "V-Ups", type: "reps" },
  { name: "Hanging Leg Raises", type: "reps" },
  { name: "Dragon Flags", type: "reps" },
];

// ============================================================
// SLOT LABELS
// ============================================================
const SLOT_LABELS = {
  push_vert: { label: "Vertical Push", focus: "Dip Family" },
  push_horiz: { label: "Horizontal Push", focus: "Push-up Family" },
  push_shoulder: { label: "Overhead Press", focus: "Shoulder Family" },
  push_core: { label: "Core", focus: "Push Emphasis" },
  pull_vert: { label: "Vertical Pull", focus: "Pull-up Family" },
  pull_horiz: { label: "Horizontal Pull", focus: "Row Family" },
  pull_core: { label: "Core", focus: "Pull Emphasis" },
  legs_squat: { label: "Squat", focus: "Bilateral Quad" },
  legs_single: { label: "Single-Leg", focus: "Unilateral" },
  legs_glute: { label: "Glute", focus: "Posterior Chain" },
  legs_calf: { label: "Calf", focus: "Calf Endurance" },
  legs_core: { label: "Core", focus: "Leg Day" },
};

// ============================================================
// EXERCISES
// ============================================================
const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const SCHEDULE_DEFAULT = {
  1: { label: "Push", type: "push" },
  2: { label: "Rest", type: "rest" },
  3: { label: "Pull", type: "pull" },
  4: { label: "Rest", type: "rest" },
  5: { label: "Legs", type: "legs" },
  6: { label: "Rest", type: "rest" },
  0: { label: "Rest", type: "rest" },
};
const SCHEDULE_6DAY = {
  1: { label: "Push", type: "push" },
  2: { label: "Pull", type: "pull" },
  3: { label: "Legs", type: "legs" },
  4: { label: "Push", type: "push" },
  5: { label: "Pull", type: "pull" },
  6: { label: "Legs", type: "legs" },
  0: { label: "Rest", type: "rest" },
};

const EXERCISES = {
  push: [
    {
      id: "push_vert",
      label: "Vertical Push",
      focus: "Dip Family",
      note: "Explode up, lower fast. No lockout at top — keep the tension.",
      sets: 3,
      color: "push",
      progressions: PROG_VERT_PUSH,
    },
    {
      id: "push_horiz",
      label: "Horizontal Push",
      focus: "Push-up Family",
      note: "Rapid fire reps. Chest stays loaded the entire set.",
      sets: 3,
      color: "push",
      progressions: PROG_HORIZ_PUSH,
    },
    {
      id: "push_shoulder",
      label: "Overhead Press",
      focus: "Shoulder Family",
      note: "Drive hard overhead. No pause at top or bottom — continuous.",
      sets: 3,
      color: "push",
      progressions: PROG_SHOULDER,
    },
    {
      id: "push_core",
      label: "Core",
      focus: "Push Emphasis",
      note: "Max tension, zero rest. Hold as long as you can fight for it.",
      sets: 2,
      color: "push",
      progressions: PROG_CORE_PUSH,
    },
  ],
  pull: [
    {
      id: "pull_vert",
      label: "Vertical Pull",
      focus: "Pull-up Family",
      note: "Dead hang to explosive pull. More reps, faster tempo.",
      sets: 3,
      color: "pull",
      progressions: PROG_VERT_PULL,
    },
    {
      id: "pull_horiz",
      label: "Horizontal Pull",
      focus: "Row Family",
      note: "Snap the bar to your chest. Shoulder blades fire every rep.",
      sets: 3,
      color: "pull",
      progressions: PROG_HORIZ_PULL,
    },
    {
      id: "pull_core",
      label: "Core",
      focus: "Pull Emphasis",
      note: "As many as you can, as fast as you can. Maintain your form.",
      sets: 2,
      color: "pull",
      progressions: PROG_CORE_PULL,
    },
  ],
  legs: [
    {
      id: "legs_squat",
      label: "Squat",
      focus: "Bilateral Quad",
      note: "Pump the legs. Fast tempo, full depth, no lockout at top.",
      sets: 3,
      color: "legs",
      progressions: PROG_SQUAT,
    },
    {
      id: "legs_single",
      label: "Single-Leg Squat",
      focus: "Unilateral",
      note: "Chase reps on each leg. Drive through the heel explosively.",
      sets: 3,
      color: "legs",
      progressions: PROG_SINGLE_LEG,
    },
    {
      id: "legs_glute",
      label: "Glute",
      focus: "Posterior Chain",
      note: "Squeeze hard at top and hold. Drive the hips as high as possible.",
      sets: 3,
      color: "legs",
      progressions: PROG_GLUTE,
    },
    {
      id: "legs_calf",
      label: "Calf",
      focus: "Calf Endurance",
      note: "Bounce at the bottom, explode up. Chase the burn.",
      sets: 2,
      color: "legs",
      progressions: PROG_CALF,
    },
    {
      id: "legs_core",
      label: "Core",
      focus: "Leg Day",
      note: "Feel the tension.",
      sets: 2,
      color: "legs",
      progressions: PROG_CORE_LEGS,
    },
  ],
};

// ============================================================
// STATE
// ============================================================
let appState = {
  onboarded: false,
  name: "",
  split: "default",
  date: "",
  reps: {},
  variations: {},
  history: {},
  sessionPRs: {},
  completed: {},
  personalRecords: {},
  completedVariations: {},
  lastMissedAcknowledged: "",
  nfiBaselines: {},
  sessionBaseline: {},
  upgradedExercises: {},
  override: null,
};

function getLocalTime() {
  return new Date();
}

function getLocalDateStr() {
  const t = getLocalTime();
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}

function getSchedule() {
  return appState.split === "6day" ? SCHEDULE_6DAY : SCHEDULE_DEFAULT;
}

// Listen for Auth changes continuously
supabaseClient.auth.onAuthStateChange((event, session) => {
  if (
    event === "SIGNED_IN" ||
    event === "TOKEN_REFRESHED" ||
    event === "INITIAL_SESSION"
  ) {
    if (session) {
      currentUser = session.user;
      document.getElementById("nav-signout").style.display = "flex";
      localStorage.removeItem("hq_is_guest");

      // Only load if we haven't loaded yet to prevent loops
      if (!appState.onboarded && !appState.name) {
        loadFromSupabase();
      }
    }
  } else if (event === "SIGNED_OUT") {
    // 1. Tell the app there is no user
    currentUser = null;

    // 2. Wipe the local browser cache completely
    localStorage.removeItem("hq_workout_state");
    localStorage.removeItem("hq_is_guest");

    // 3. Hard reload the page.
    // This guarantees absolutely NO ghost DOM elements (like old charts, names, or stats)
    // are left in the background. The app will restart, see no user, and show a pristine login screen.
    window.location.reload();
  }
});

// ============================================================
// STATE LOAD & SAVE
// ============================================================
async function loadState() {
  const { data, error } = await supabaseClient.auth.getUser();

  if (error || !data.user) {
    // If no user, FORCE the modal to show
    document.getElementById("auth-modal").classList.add("show");
    return;
  }

  currentUser = data.user;
  document.getElementById("nav-signout").style.display = "flex";
  await loadFromSupabase();
}

function handleForceLogout() {
  console.log("Account not found on server.");
  currentUser = null;
  document.getElementById("nav-signout").style.display = "none";

  appState = {};
  localStorage.removeItem("hq_workout_state");

  document.getElementById("auth-username").value = "";
  document.getElementById("auth-password").value = "";

  document.getElementById("auth-modal").classList.add("show");
  showAuthError("Session expired or account deleted. Please sign in.");
}

async function loadFromSupabase() {
  if (!currentUser) {
    document.getElementById("auth-modal").classList.add("show");
    return;
  }

  try {
    const { data, error } = await supabaseClient
      .from("user_data")
      .select("app_state")
      .eq("user_id", currentUser.id)
      .single();

    const localSaved = localStorage.getItem("hq_workout_state");
    const localData = localSaved ? JSON.parse(localSaved) : null;

    // 2. Scenario: Cloud Data Exists -> Load it
    if (data && data.app_state && Object.keys(data.app_state).length > 0) {
      appState = { ...appState, ...data.app_state };
      localStorage.setItem("hq_workout_state", JSON.stringify(appState));
      initAppAfterLoad();
      document.getElementById("auth-modal").classList.remove("show");
    }
    // 3. Scenario: New Cloud Account + Old Local Data -> Migrate
    else if (localData && localData.onboarded) {
      appState = { ...appState, ...localData };
      document.getElementById("migrate-modal").classList.add("show");
      document.getElementById("auth-modal").classList.remove("show");
    }
    // 4. Scenario: Brand New User -> Initialize Default
    else {
      appState = {
        onboarded: false,
        name: "",
        split: "default",
        date: "",
        reps: {},
        variations: {},
        history: {},
        sessionPRs: {},
        completed: {},
        personalRecords: {},
        completedVariations: {},
        lastMissedAcknowledged: "",
        nfiBaselines: {},
        sessionBaseline: {},
        upgradedExercises: {},
        override: null,
      };
      initAppAfterLoad();
      document.getElementById("auth-modal").classList.remove("show");
    }
  } catch (error) {
    console.error("Cloud load error:", error);
    // 🚨 FIX: Do NOT load local state here.
  }
}

function initAppAfterLoad() {
  let isFirstRun = !appState.onboarded;

  const todayStr = getLocalDateStr();
  if (appState.date !== todayStr) {
    appState.date = todayStr;
    appState.reps = {};
    appState.sessionBaseline = {};
    appState.upgradedExercises = {};
    appState.override = null; //
    saveState(true);
  }

  Object.values(EXERCISES)
    .flat()
    .forEach((ex) => {
      if (!appState.reps[ex.id]) appState.reps[ex.id] = Array(ex.sets).fill("");

      appState.sessionBaseline = appState.sessionBaseline || {};
      if (!appState.sessionBaseline[ex.id]) {
        appState.sessionBaseline[ex.id] =
          appState.variations[ex.id] || ex.progressions[0].name;
      }
    });

  if (isFirstRun) openSettings(true);
  else initUI();
}

async function saveState(skipRender = false) {
  if (appState.history) {
    Object.keys(appState.history).forEach((dateStr) => {
      const val = appState.history[dateStr];
      if (typeof val === "number") {
        appState.history[dateStr] = {
          total: val,
          type: null,
          exercises: {},
        };
      }
    });
  }

  // Save cache
  localStorage.setItem("hq_workout_state", JSON.stringify(appState));

  // Sync to Cloud
  if (currentUser) {
    supabaseClient
      .from("user_data")
      .upsert({
        user_id: currentUser.id,
        app_state: appState,
      })
      .then(({ error }) => {
        if (error) console.error("Cloud sync error:", error);
      });
  }

  if (!skipRender) {
    renderGraph();
    renderStats();
    renderTacticalAnalysis();
  }
}

// ============================================================
// AUTH CONTROLLERS
// ============================================================
function showAuthError(msg) {
  document.getElementById("auth-error").textContent = msg;
}

function togglePassword() {
  const input = document.getElementById("auth-password");
  const icon = document.getElementById("eye-icon");

  if (input.type === "password") {
    input.type = "text";
    icon.src = "icons/eye2.png"; // Shows when password is visible
  } else {
    input.type = "password";
    icon.src = "icons/eye1.png"; // Shows when password is hidden
  }
}

let pendingSignUp = null;
let skipWarningConfirmed = false; // temporarily holds details for confirmation

async function handleAuth(action) {
  // 1. Get and clean inputs
  const rawUsername = document
    .getElementById("auth-username")
    .value.trim()
    .toLowerCase();
  const password = document.getElementById("auth-password").value;

  // 2. Basic Validation
  if (!rawUsername || !password)
    return showAuthError("Username and password required.");
  if (password.length < 6)
    return showAuthError("Password must be at least 6 characters.");

  const email = `${rawUsername}@calithex.local`;

  if (action === "signup") {
    showAuthError("Checking availability...");

    const { data: isTaken, error } = await supabaseClient.rpc(
      "check_if_user_exists",
      {
        email_check: email,
      },
    );

    if (error) {
      console.error("RPC Error:", error);
    } else if (isTaken) {
      showAuthError("Username already taken. Try another or Sign In.");
      return;
    }

    showAuthError(""); // Clear "Checking..." text
    document.getElementById("confirm-username-display").textContent =
      rawUsername;
    document.getElementById("confirm-password-display").textContent = password;
    pendingSignUp = { email, password };
    document.getElementById("signup-confirm-modal").classList.add("show");
    return;
  }

  executeAuthCall("signin", email, password);
}

async function executeSignUp() {
  document.getElementById("signup-confirm-modal").classList.remove("show");
  if (pendingSignUp) {
    executeAuthCall("signup", pendingSignUp.email, pendingSignUp.password);
    pendingSignUp = null;
  }
}

async function executeAuthCall(action, email, password) {
  const overlay = document.getElementById("transfer-overlay");
  const msgEl = document.getElementById("transfer-msg");
  const subEl = document.getElementById("transfer-sub");

  showAuthError("");
  msgEl.textContent =
    action === "signup" ? "Creating Account..." : "Authenticating...";
  subEl.textContent =
    action === "signup" ? "Securing your vault" : "Verifying credentials";
  overlay.classList.add("show");

  let error;
  if (action === "signup") {
    const res = await supabaseClient.auth.signUp({ email, password });
    error = res.error;
    if (error && error.message.includes("already registered")) {
      error.message = "Username already taken. Try another or Sign In.";
    }
  } else {
    const res = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    error = res.error;
    if (error && error.message.includes("Invalid login")) {
      error.message = "Incorrect username or password.";
    }
  }

  if (error) {
    overlay.classList.remove("show");
    showAuthError(error.message);
  } else {
    msgEl.textContent = "Access Granted.";
    subEl.textContent = "Loading your programme...";
    document.getElementById("auth-modal").classList.remove("show");
    document.getElementById("auth-error").textContent = "";

    await loadState();

    setTimeout(() => overlay.classList.remove("show"), 600);
  }
}

function openSignOutModal() {
  document.getElementById("signout-modal").classList.add("show");
}

function closeSignOutModal() {
  document.getElementById("signout-modal").classList.remove("show");
}

async function confirmSignOut() {
  closeSignOutModal();
  showToast("⏳", "Signing out securely...");
  await supabaseClient.auth.signOut();
}

// ============================================================
// MIGRATION CONTROLLERS
// ============================================================
async function migrateLocalData() {
  document.getElementById("migrate-modal").classList.remove("show");
  showToast("⏳", "Migrating data to cloud...");
  await saveState(true);
  initAppAfterLoad();
  showToast("✅", "Data successfully synced to account.");
}

function discardLocalData() {
  document.getElementById("migrate-modal").classList.remove("show");
  // Reset appState to empty. The saveState function will overwrite
  // the old local storage automatically when the app initializes.
  appState = {
    onboarded: false,
    name: "",
    split: "default",
    date: "",
    reps: {},
    variations: {},
    history: {},
    sessionPRs: {},
    completed: {},
    personalRecords: {},
    completedVariations: {},
    lastMissedAcknowledged: "",
    nfiBaselines: {},
    sessionBaseline: {},
    upgradedExercises: {},
    override: null,
  };
  initAppAfterLoad();

  showToast(
    "<img src='icons/bin.png' style='width:24px;height:24px;'>",
    "<strong>Local guest data discarded.</strong><br>Starting fresh.",
  );
}

// ============================================================
// TACTICAL OVERRIDE LOGIC
// ============================================================
let pendingOverride = null;

function requestOverride(dayType) {
  pendingOverride = dayType;
  document.getElementById("override-modal").classList.add("show");
}

function closeOverrideModal() {
  pendingOverride = null;
  document.getElementById("override-modal").classList.remove("show");
}

function executeOverride() {
  const todayStr = getLocalDateStr();
  appState.override = { date: todayStr, type: pendingOverride };
  saveState();
  closeOverrideModal();

  // Re-render everything to unlock the inputs
  initUI();

  // Open the block they just unlocked
  if (!blockOpen[pendingOverride]) toggleBlock(pendingOverride);

  showToast(
    "🔓",
    `<strong>Protocol Unlocked</strong><br>${pendingOverride.charAt(0).toUpperCase() + pendingOverride.slice(1)} Day activated.`,
  );
}

// ============================================================
// PASSWORD CHANGE LOGIC
// ============================================================
let pendingNewPassword = "";

function openChangePasswordModal() {
  // Close settings first so they don't overlap
  document.getElementById("settings-modal").classList.remove("show");
  document.getElementById("new-password-input").value = "";
  document.getElementById("change-password-modal").classList.add("show");
}

function toggleNewPasswordVisibility() {
  const input = document.getElementById("new-password-input");
  const icon = document.getElementById("new-eye-icon");
  if (input.type === "password") {
    input.type = "text";
    icon.src = "icons/eye2.png";
  } else {
    input.type = "password";
    icon.src = "icons/eye1.png";
  }
}

function executePasswordChange() {
  const newPass = document.getElementById("new-password-input").value;
  if (newPass.length < 6) {
    showToast("❌", "Password must be at least 6 characters.");
    return;
  }

  // 1. Close input modal
  document.getElementById("change-password-modal").classList.remove("show");

  // 2. Store temporarily and Show Confirmation Modal
  pendingNewPassword = newPass;
  document.getElementById("confirm-new-pass-display").textContent = newPass;
  document.getElementById("password-confirm-modal").classList.add("show");
}

async function finalizePasswordChange() {
  document.getElementById("password-confirm-modal").classList.remove("show");
  showToast("⏳", "Updating password...");

  const { data, error } = await supabaseClient.auth.updateUser({
    password: pendingNewPassword,
  });

  pendingNewPassword = ""; // Clear memory

  if (error) {
    showToast("❌", "Error: " + error.message);
    setTimeout(
      () =>
        document.getElementById("change-password-modal").classList.add("show"),
      500,
    );
  } else {
    showToast("✅", "Password updated successfully.");
  }
}

// ============================================================
// ONBOARDING
// ============================================================
const ONBOARD_MAP = {
  "ob-push-vert": { prog: () => PROG_VERT_PUSH, exId: "push_vert" },
  "ob-push-horiz": { prog: () => PROG_HORIZ_PUSH, exId: "push_horiz" },
  "ob-push-shoulder": {
    prog: () => PROG_SHOULDER,
    exId: "push_shoulder",
  },
  "ob-push-core": { prog: () => PROG_CORE_PUSH, exId: "push_core" },
  "ob-pull-vert": { prog: () => PROG_VERT_PULL, exId: "pull_vert" },
  "ob-pull-horiz": { prog: () => PROG_HORIZ_PULL, exId: "pull_horiz" },
  "ob-pull-core": { prog: () => PROG_CORE_PULL, exId: "pull_core" },
  "ob-legs-squat": { prog: () => PROG_SQUAT, exId: "legs_squat" },
  "ob-legs-single": { prog: () => PROG_SINGLE_LEG, exId: "legs_single" },
  "ob-legs-glute": { prog: () => PROG_GLUTE, exId: "legs_glute" },
  "ob-legs-calf": { prog: () => PROG_CALF, exId: "legs_calf" },
  "ob-legs-core": { prog: () => PROG_CORE_LEGS, exId: "legs_core" },
};

function populateOnboardingSelects() {
  Object.entries(ONBOARD_MAP).forEach(([selectId, cfg]) => {
    const sel = document.getElementById(selectId);
    if (!sel) return;
    const prog = cfg.prog();
    sel.innerHTML = prog
      .map((p, i) => `<option value="${i}">${p.name}</option>`)
      .join("");

    const saved = appState.variations[cfg.exId];
    if (saved) {
      const idx = prog.findIndex((p) => p.name === saved);
      if (idx > -1) {
        sel.value = idx;
      } else {
        sel.value = 0;
      }
    } else {
      sel.value = 0;
    }
  });
}

function computeVariationAssignments() {
  const result = {};
  Object.entries(ONBOARD_MAP).forEach(([selectId, cfg]) => {
    const sel = document.getElementById(selectId);
    if (!sel) return;
    const prog = cfg.prog();
    result[cfg.exId] = prog[parseInt(sel.value)].name;
  });
  return result;
}

function updateOnboardingPreview() {
  const preview = document.getElementById("onboard-preview");
  if (!preview) return;

  const allSlots = [
    ...EXERCISES.push.map((e) => e.id),
    ...EXERCISES.pull.map((e) => e.id),
    ...EXERCISES.legs.map((e) => e.id),
  ];

  const colorOf = (id) =>
    id.startsWith("push") ? "push" : id.startsWith("pull") ? "pull" : "legs";

  // Read current select values to show preview
  const current = {};
  Object.entries(ONBOARD_MAP).forEach(([selectId, cfg]) => {
    const sel = document.getElementById(selectId);
    if (!sel) return;
    const prog = cfg.prog();
    current[cfg.exId] = prog[parseInt(sel.value)]?.name || "—";
  });

  preview.innerHTML = `
    <div class="preview-table-header">
      <span>Slot</span>
      <span>Exercise Assigned</span>
    </div>
    ${allSlots
      .map(
        (id) => `
      <div class="preview-row">
        <div>
          <div class="preview-slot">${SLOT_LABELS[id].label}</div>
          <div style="font-size:10px;color:var(--muted);margin-top:2px">${SLOT_LABELS[id].focus}</div>
        </div>
        <div class="preview-val ${colorOf(id)}">${current[id] || "—"}</div>
      </div>
    `,
      )
      .join("")}
  `;
}

let isMandatoryOnboard = false;

function openSettings(isFirst = false) {
  isMandatoryOnboard = isFirst;
  document.getElementById("setup-name").value = appState.name || "";
  document.getElementById("setup-split").value = appState.split || "default";
  document.getElementById("close-modal-btn").style.display = isFirst
    ? "none"
    : "block";
  document.getElementById("settings-modal").classList.add("show");
  populateOnboardingSelects();
  updateOnboardingPreview();
}

function closeSettings() {
  if (isMandatoryOnboard) return;
  document.getElementById("settings-modal").classList.remove("show");
}

function saveSettings() {
  // If it's a brand new user (first run), just save immediately. No warning needed.
  if (!appState.onboarded) {
    executeSaveSettings();
    return;
  }

  // If it's an existing user, STOP and show the warning.
  document.getElementById("settings-confirm-modal").classList.add("show");
}

function executeSaveSettings() {
  // 1. Close Modals
  document.getElementById("settings-confirm-modal").classList.remove("show");
  document.getElementById("settings-modal").classList.remove("show");

  // 2. Capture Values
  const nameVal =
    document.getElementById("setup-name").value.trim() || "Athlete";
  const splitVal = document.getElementById("setup-split").value;

  // 3. Update State
  appState.name = nameVal;
  appState.split = splitVal;

  // 4. Apply Exercises from Dropdowns (This overwrites current levels)
  const assignments = computeVariationAssignments();
  Object.assign(appState.variations, assignments);

  // 5. Reset Reps for the new routine structure
  Object.values(EXERCISES)
    .flat()
    .forEach((ex) => {
      appState.reps[ex.id] = Array(ex.sets).fill("");
    });

  // 6. Save & Refresh
  appState.onboarded = true;
  appState.sessionBaseline = {}; // 🚨 Force fresh snapshot
  saveState();

  initUI(); // Re-render the app

  showToast(
    "🔄",
    `<strong>Programme Re-Initialized.</strong><br>Split and exercises updated.`,
  );
}
function forceReset() {
  // Close settings modal first, open reset flow
  document.getElementById("settings-modal").classList.remove("show");
  resetStep1();
}

function resetStep1() {
  document.getElementById("reset-step-1").style.display = "block";
  document.getElementById("reset-step-2").style.display = "none";
  document.getElementById("reset-step-3").style.display = "none";
  document.getElementById("reset-modal").classList.add("show");
}

function resetStep2() {
  document.getElementById("reset-step-1").style.display = "none";
  document.getElementById("reset-step-2").style.display = "block";
}

function resetStep3() {
  document.getElementById("reset-step-2").style.display = "none";
  document.getElementById("reset-step-3").style.display = "block";
}

function closeResetModal() {
  document.getElementById("reset-modal").classList.remove("show");
  // Reopen settings so user isn't left on a blank screen
  setTimeout(() => openSettings(false), 200);
}

async function executeReset() {
  const overlay = document.getElementById("transfer-overlay");
  const msgEl = document.getElementById("transfer-msg");
  const subEl = document.getElementById("transfer-sub");

  msgEl.textContent = "Factory Resetting...";
  subEl.textContent = "Scrubbing cloud archives";
  overlay.classList.add("show");

  document.getElementById("reset-modal").classList.remove("show");

  appState = {
    onboarded: false,
    name: "",
    split: "default",
    date: "",
    reps: {},
    variations: {},
    history: {},
    sessionPRs: {},
    completed: {},
    personalRecords: {},
    completedVariations: {},
    lastMissedAcknowledged: "",
    nfiBaselines: {},
    sessionBaseline: {},
    upgradedExercises: {},
    override: null,
  };

  appState.sessionBaseline = {};

  if (currentUser) {
    const { error } = await supabaseClient.from("user_data").upsert({
      user_id: currentUser.id,
      app_state: appState,
    });

    if (error) {
      console.error("Reset failed:", error);
      overlay.classList.remove("show");
      showToast("❌", "Reset failed. Network error.");
      return;
    }
  }

  localStorage.removeItem("hq_workout_state");

  document.getElementById("setup-name").value = "";
  document.getElementById("setup-split").value = "default";

  Object.keys(ONBOARD_MAP).forEach((selectId) => {
    const sel = document.getElementById(selectId);
    if (sel) sel.selectedIndex = 0;
  });

  ["push", "pull", "legs"].forEach((day) => {
    if (blockOpen[day]) toggleBlock(day);
  });

  setTimeout(() => {
    overlay.classList.remove("show");
    showToast(
      "<img src='icons/bin.png' style='width:24px;height:24px;'>",
      "<strong>All data wiped.</strong><br>Starting fresh.",
    );

    document.getElementById("hero-user-name").textContent = "Athlete";
    document.getElementById("today-vol-total").textContent = "Today: 0";

    initAppAfterLoad();
  }, 800);
}

function resetToday() {
  document.getElementById("reset-today-modal").classList.add("show");
}

function confirmResetToday() {
  const todayStr = getLocalDateStr();
  const todayType = getSchedule()[getLocalTime().getDay()].type;
  const sessionPRs = appState.sessionPRs?.[todayStr];

  // Capture varNames BEFORE any rollback happens (for PR rollback)
  const varNameSnapshot = {};
  if (todayType !== "rest") {
    EXERCISES[todayType].forEach((ex) => {
      varNameSnapshot[ex.id] =
        appState.variations[ex.id] || ex.progressions[0].name;
    });
  }

  // 🚨 BUG 2 FIX: Perfectly restore the day's original baseline
  if (
    appState.sessionBaseline &&
    Object.keys(appState.sessionBaseline).length > 0
  ) {
    Object.assign(appState.variations, appState.sessionBaseline);
  }

  // Clean up all the temporary day trackers
  if (appState.completedVariations)
    delete appState.completedVariations[todayStr];
  if (appState.upgradedExercises) delete appState.upgradedExercises[todayStr];
  appState.nfiBaselines = {};

  // Now roll back PRs using the pre-rollback varNames
  if (sessionPRs !== undefined) {
    if (todayType !== "rest") {
      EXERCISES[todayType].forEach((ex) => {
        const varName = varNameSnapshot[ex.id];
        if (sessionPRs[varName]) {
          appState.personalRecords[varName] = sessionPRs[varName];
        } else {
          delete appState.personalRecords[varName];
        }
      });
    }
    delete appState.sessionPRs[todayStr];
  }

  // Wipe today's reps
  Object.values(EXERCISES)
    .flat()
    .forEach((ex) => {
      appState.reps[ex.id] = Array(ex.sets).fill("");
    });

  delete appState.completed[todayStr];
  appState.history[todayStr] = { total: 0, type: null, exercises: {} };

  saveState();
  initUI();
  document.getElementById("reset-today-modal").classList.remove("show");
  showToast(
    "<img src='icons/bin.png' style='width:24px;height:24px;'>",
    `<strong>Log Reset</strong><br>Today's numbers cleared. PRs rolled back.`,
  );
} // ============================================================
// FINISH WORKOUT
// ============================================================
let pendingUpgrades = [];

function openFinishModal() {
  pendingUpgrades = [];
  let upgradeHTML = "";
  let skippedExercises = []; // 🚨 NEW: Track missed exercises

  const today = getLocalTime().getDay();
  const type = getSchedule()[today].type;

  if (type !== "rest") {
    EXERCISES[type].forEach((ex) => {
      const vals = appState.reps[ex.id] || [];

      // 🚨 LOGIC: Check if exercise was skipped (all inputs empty or 0)
      const totalReps = vals.reduce((a, b) => a + (parseInt(b) || 0), 0);
      if (totalReps === 0) {
        skippedExercises.push(SLOT_LABELS[ex.id]?.label || ex.id);
      }

      const varType = getVarType(ex.id);
      const threshold = varType === "hold" ? 60 : 50;
      const anySetHit50 = vals.some((v) => parseInt(v) >= threshold);
      const baseline =
        appState.sessionBaseline[ex.id] || ex.progressions[0].name;
      const isOnBaseline =
        (appState.variations[ex.id] || ex.progressions[0].name) === baseline;

      if (anySetHit50 && isOnBaseline) {
        const currentName =
          appState.variations[ex.id] || ex.progressions[0].name;
        const currentIdx = ex.progressions.findIndex(
          (p) => p.name === currentName,
        );
        if (currentIdx > -1 && currentIdx < ex.progressions.length - 1) {
          const next = ex.progressions[currentIdx + 1];
          pendingUpgrades.push({
            id: ex.id,
            name: next.name,
            oldName: currentName,
          });
          upgradeHTML += `
            <div class="upgrade-item">
              <input type="checkbox" class="upgrade-check" id="upg-${ex.id}" checked>
              <div class="upgrade-text">
                <strong>${SLOT_LABELS[ex.id]?.label || ex.id}</strong>
                <span class="upgrade-arrow">${currentName} → ${next.name}</span>
              </div>
            </div>`;
        }
      }
    });
  }

  const sub = document.getElementById("finish-modal-sub");

  // 🚨 DYNAMIC CONTENT: Warn about skips or show upgrades
  let warningHTML = "";
  if (skippedExercises.length > 0) {
    warningHTML = `
            <div style="background:rgba(255, 77, 46, 0.1); border:1px solid var(--push); padding:12px; border-radius:8px; margin-bottom:15px; color:var(--push); font-size:13px;">
              <strong>⚠️ Incomplete Session:</strong><br>
              You haven't logged reps for: ${skippedExercises.join(", ")}.
            </div>`;
  }

  if (pendingUpgrades.length > 0) {
    sub.innerHTML = `${warningHTML}
            <strong>💪 You maxed out ${pendingUpgrades.length} exercise${pendingUpgrades.length > 1 ? "s" : ""}!</strong><br>
            <div style="margin-top: 8px; margin-bottom: 12px; font-size: 13px; color: var(--dim); line-height: 1.5;">
              Keep checked to <strong>automatically advance</strong> to the next variation next session.<br>
              Uncheck to stay on your current level and perfect your form.
            </div>
            <div class="upgrade-list">${upgradeHTML}</div>`;
  } else {
    sub.innerHTML = `${warningHTML}
            <strong>⚠️ Review your numbers before confirming.</strong><br><br>
            Once locked, this session can only be edited before midnight. If you need to log missing sets or edit reps, do so before midnight.`;
  }

  document.getElementById("finish-modal").classList.add("show");
}

function closeFinishModal() {
  document.getElementById("finish-modal").classList.remove("show");
}

function confirmFinish() {
  // 1. Snapshot variations BEFORE applying upgrades
  const preUpgradeVariations = { ...appState.variations };

  // 2. Restore NFI (Not Feeling It) baselines so next session reverts to normal
  if (appState.nfiBaselines) {
    Object.keys(appState.nfiBaselines).forEach((exId) => {
      appState.variations[exId] = appState.nfiBaselines[exId];
    });
    appState.nfiBaselines = {}; // Clear them out
  }

  // 3. Track Upgrades
  const todayStr = getLocalDateStr();
  appState.upgradedExercises = appState.upgradedExercises || {};
  appState.upgradedExercises[todayStr] = [];

  let upgradeCount = 0;
  pendingUpgrades.forEach((upg) => {
    const cb = document.getElementById(`upg-${upg.id}`);
    if (cb && cb.checked) {
      appState.variations[upg.id] = upg.name;
      appState.upgradedExercises[todayStr].push(upg.id);
      upgradeCount++;
    }
  });

  const today = getLocalTime().getDay();
  const baseType = getSchedule()[today].type;
  const type =
    appState.override && appState.override.date === todayStr
      ? appState.override.type
      : baseType;

  appState.completed[todayStr] = true;
  appState.completedVariations = appState.completedVariations || {};
  appState.completedVariations[todayStr] = preUpgradeVariations;

  // 4. Lock session type into rich history entry
  if (type !== "rest") {
    const existing = appState.history?.[todayStr];
    appState.history[todayStr] = {
      ...(typeof existing === "object" ? existing : { total: existing || 0 }),
      type: type,
      split: appState.split,
    };
  }

  // 5. Snapshot PRs for rollback
  appState.sessionPRs = appState.sessionPRs || {};
  appState.sessionPRs[todayStr] = {};
  if (type !== "rest") {
    EXERCISES[type].forEach((ex) => {
      const varName = preUpgradeVariations[ex.id] || ex.progressions[0].name;
      const prevPR = appState.personalRecords?.[varName];
      if (prevPR) appState.sessionPRs[todayStr][varName] = prevPR;
    });
  }

  // 6. Log New PRs
  const newPRs = [];
  if (type !== "rest") {
    EXERCISES[type].forEach((ex) => {
      const varName = preUpgradeVariations[ex.id] || ex.progressions[0].name;
      if (!appState.personalRecords) appState.personalRecords = {};
      (appState.reps[ex.id] || []).forEach((v) => {
        const val = parseInt(v);
        if (!isNaN(val) && val > 0) {
          const varType = (() => {
            const entry = ex.progressions.find((p) => p.name === varName);
            return entry?.type || "reps";
          })();
          const prev = appState.personalRecords[varName]?.value || 0;
          if (val > prev) {
            appState.personalRecords[varName] = {
              value: val,
              unit: varType === "hold" ? "s" : "reps",
            };
            newPRs.push(
              `${varName}: ${val}${varType === "hold" ? "s" : " reps"}`,
            );
          }
        }
      });
    });
  }

  saveState();
  closeFinishModal();
  initUI();

  let msg = `<strong>Session Locked, ${appState.name}.</strong><br>Numbers saved to history.`;
  if (upgradeCount > 0) {
    msg += `<br><img src="icons/levelup.png" style="width:18px;height:18px;vertical-align:middle;margin-right:4px;">${upgradeCount} exercise${upgradeCount > 1 ? "s" : ""} levelled up for next session!`;
  }
  showToast("🏆", msg);

  if (newPRs.length > 0) {
    setTimeout(() => {
      showToast(
        "<img src='icons/best.png' style='width:24px;height:24px;'>",
        `<strong>New PR${newPRs.length > 1 ? "s" : ""} this session!</strong><br>${newPRs.join("<br>")}`,
      );
    }, 2000);
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ============================================================
// PR TRACKER
// ============================================================
function openPRModal() {
  const prs = appState.personalRecords || {};
  const keys = Object.keys(prs);
  const list = document.getElementById("pr-list");

  if (keys.length === 0) {
    list.innerHTML = `<div style="text-align:center;padding:40px 20px;color:var(--muted);font-size:14px;line-height:1.6;">
      <img src="icons/best.png" style="width:48px;height:48px;display:block;margin:0 auto 12px;opacity:0.3;">
      <strong style="color:var(--dim);display:block;margin-bottom:6px">No records yet</strong>
      Start logging reps to track your personal bests here.
    </div>`;
  } else {
    const val = (k) => prs[k]?.value ?? prs[k];
    const sorted = keys.sort((a, b) => val(b) - val(a));
    list.innerHTML = sorted
      .map(
        (k) => `
      <div style="display:flex;justify-content:space-between;align-items:center;
                  padding:14px 0;border-bottom:1px solid var(--border);">
        <span style="font-size:14px;color:var(--text);line-height:1.3">${k}</span>
        <span style="font-family:'Syne',sans-serif;font-size:22px;font-weight:700;
                     color:var(--gold);white-space:nowrap;margin-left:12px">
          ${prs[k]?.value ?? prs[k]} <span style="font-size:11px;color:var(--muted);font-family:'Outfit',sans-serif">${prs[k]?.unit ?? "reps"}</span>
        </span>
      </div>`,
      )
      .join("");
  }
  document.getElementById("pr-modal").classList.add("show");
}

// ============================================================
// HERO
// ============================================================
const GREETINGS = [
  "Salam, legend. Your body is a weapon — today we sharpen it.",
  "Back again. Consistency is the only cheat code that actually works.",
  "You showed up. That's already 80% of the battle won.",
  "Let's get this done. No excuses, no shortcuts.",
  "The bar wasn't going to lift itself.",
  "Welcome back, champion. Every session is a vote for the person you're becoming.",
  "Progress doesn't care about motivation — just showing up.",
  "Long time no see? Doesn't matter. We go again.",
  "Endurance is built in the shadows. Keep pushing.",
  "Start strong, finish stronger.",
];

const REST_TIPS = [
  "Active recovery. Parkour, light run, or mobility work.",
  "Eat big today. Tomorrow we push.",
  "Visualise the reps. Mental reps count.",
  "A day off the gym is a day on for growth.",
  "Stretch your hip flexors and chest.",
];

const DONE_TIPS = [
  "Great session. Get your protein in.",
  "Relax, legend. You earned it.",
  "Consistency over intensity. See you next session.",
];

function getTimeGreeting(h) {
  if (h < 5) return "Working late —";
  if (h < 12) return "Good morning —";
  if (h < 17) return "Good afternoon —";
  if (h < 21) return "Good evening —";
  return "Night mode —";
}

function updateHero() {
  const t = getLocalTime();
  const h = t.getHours();
  const day = t.getDay();
  const todayStr = getLocalDateStr();
  const isComplete = appState.completed[todayStr];
  const sess = getSchedule()[day];

  document.getElementById("today-day").textContent = DAYS[day];
  document.getElementById("hero-user-name").textContent = appState.name;
  document.getElementById("split-display").textContent =
    appState.split === "6day" ? "P·P·L·P·P·L·R" : "P·R·P·L·R·R";

  const baseType = sess.type;
  const activeType =
    appState.override && appState.override.date === todayStr
      ? appState.override.type
      : baseType;

  const sessEl = document.getElementById("today-session");
  if (activeType !== baseType) {
    sessEl.textContent =
      activeType.charAt(0).toUpperCase() + activeType.slice(1) + " (Make-up)";
    sessEl.className = `status-val ${activeType}`;
    sessEl.style.color = "var(--text)";
  } else {
    sessEl.textContent = sess.label;
    sessEl.className =
      sess.type !== "rest" ? `status-val ${sess.type}` : "status-val";
    if (sess.type === "rest") sessEl.style.color = "var(--muted)";
  }

  let greeting = getTimeGreeting(h);
  let chipText = `${DAYS[day]} · Active`;

  if (isComplete) {
    greeting = "Well done,";
    chipText = `${DAYS[day]} · Complete ✓`;
    const tip = DONE_TIPS[Math.floor(Math.random() * DONE_TIPS.length)];
    document.getElementById("hero-tagline").innerHTML =
      `<em>Mission accomplished.</em> ${tip}`;
  } else if (activeType === "rest") {
    // 🚨 Changed sess.type to activeType
    greeting = "Recovery mode,";
    chipText = `${DAYS[day]} · Rest`;
    const tip = REST_TIPS[Math.floor(Math.random() * REST_TIPS.length)];
    document.getElementById("hero-tagline").innerHTML =
      `<em>Take it easy.</em> ${tip}`;
  } else {
    const g =
      GREETINGS[Math.floor(Math.random() * GREETINGS.length)].split(".");
    document.getElementById("hero-tagline").innerHTML =
      `<em>${g[0]}.</em>${g.slice(1).join(".")}`;
  }

  document.getElementById("hero-greeting").textContent = greeting;
  document.getElementById("greeting-chip-text").textContent = chipText;
}

// ============================================================
// WEEK STRIP
// ============================================================
function buildWeekStrip() {
  const today = getLocalTime().getDay();
  const sched = getSchedule();
  const strip = document.getElementById("week-strip");
  const names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const order = [1, 2, 3, 4, 5, 6, 0];
  strip.innerHTML = "";
  order.forEach((dayIdx, i) => {
    const s = sched[dayIdx];
    const div = document.createElement("div");
    div.className = `day-card ${s.type}${dayIdx === today ? " today" : ""}`;
    div.innerHTML = `<div class="day-n">${names[i]}</div><div class="day-t">${s.label}</div>`;
    strip.appendChild(div);
  });
}

function getVarType(exId) {
  const ex = Object.values(EXERCISES)
    .flat()
    .find((e) => e.id === exId);
  const varName = appState.variations[exId] || ex.progressions[0].name;
  const entry = ex.progressions.find((p) => p.name === varName);
  return entry?.type || "reps";
}

// ============================================================
// EXERCISE LIST
// ============================================================
function buildExerciseList(day) {
  const list = document.getElementById(`list-${day}`);
  list.innerHTML = "";

  const todayStr = getLocalDateStr();
  const isDayComplete = !!appState.completed[todayStr];

  // 🚨 CHECK FOR OVERRIDE
  const baseType = getSchedule()[getLocalTime().getDay()].type;
  const activeType =
    appState.override && appState.override.date === todayStr
      ? appState.override.type
      : baseType;
  const isTodayBlock = activeType === day;
  const isRestDay = baseType === "rest";

  EXERCISES[day].forEach((ex) => {
    const row = document.createElement("div");
    row.className = "ex-row";
    row.id = `row-${ex.id}`;

    const colorVar = `var(--${ex.color})`;
    const sessionVariations =
      isDayComplete && appState.completedVariations?.[todayStr]
        ? appState.completedVariations[todayStr]
        : appState.variations;

    const slotInfo = SLOT_LABELS[ex.id];
    const vals = appState.reps[ex.id] || [];
    const varType = getVarType(ex.id);
    const threshold = varType === "hold" ? 60 : 50;
    const hitTarget = vals.some((v) => parseInt(v) >= threshold);

    const currentName = appState.variations[ex.id] || ex.progressions[0].name;
    const completedVariationName =
      appState.completedVariations?.[todayStr]?.[ex.id] || currentName;
    const baseName =
      appState.nfiBaselines?.[ex.id] ||
      appState.sessionBaseline?.[ex.id] ||
      currentName;

    const currentIdx = ex.progressions.findIndex((p) => p.name === currentName);
    const completedIdx = ex.progressions.findIndex(
      (p) => p.name === completedVariationName,
    );
    const baseIdx = ex.progressions.findIndex((p) => p.name === baseName);

    const nextProg =
      currentIdx > -1 && currentIdx < ex.progressions.length - 1
        ? ex.progressions[currentIdx + 1]
        : null;

    // 🚨 Explicitly check our new tracking array so refreshes don't break it
    const wasUpgraded =
      isDayComplete && appState.upgradedExercises?.[todayStr]?.includes(ex.id);

    // If they didn't upgrade, but their current baseline is higher than what they completed today, they used NFI today.
    const wasDowngraded =
      isDayComplete && !wasUpgraded && currentIdx > completedIdx;

    let setsHTML = "";
    for (let i = 0; i < ex.sets; i++) {
      const val = appState.reps[ex.id][i] || "";
      const thr = varType === "hold" ? 60 : 50;
      const maxed = val !== "" && Number(val) >= thr ? "maxed" : "";

      const isDisabled = isDayComplete || !isTodayBlock;

      setsHTML += `
        <div class="set-input-wrap">
          <div class="set-num">SET ${i + 1}</div>
          <input type="number" class="rep-input ${maxed}" id="inp-${ex.id}-${i}"
            placeholder="${varType === "hold" ? "s" : "-"}"
            ${isDisabled ? "disabled" : ""}
            oninput="handleRepInput('${ex.id}',${i},'${ex.color}')"
            value="${val}">
        </div>`;
    }

    let readinessHTML = `<div class="readiness-hint"></div>`;
    if (isDayComplete && hitTarget) {
      if (wasUpgraded) {
        readinessHTML = `<div class="readiness-hint visible" style="border-color:rgba(57,255,143,0.2);background:rgba(57,255,143,0.05)">
    <strong><img src="icons/levelup.png" style="width:16px;height:16px;vertical-align:text-bottom;margin-right:4px;">Levelled up — ${currentName} awaits next session.</strong>
  </div>`;
      } else if (wasDowngraded) {
        readinessHTML = `<div class="readiness-hint visible" style="border-color:rgba(255,209,102,0.2);background:rgba(255,209,102,0.05);color:var(--gold)">
                <strong>💪 Strong session on a modified level.</strong> Return to ${baseName} next session to chase the upgrade.
              </div>`;
      } else if (nextProg) {
        readinessHTML = `<div class="readiness-hint visible">
                <strong>🔼 ${varType === "hold" ? "Hit 60s — ready to level up?" : "Hit 50+ reps — ready to level up?"}</strong>
                Next session, consider: <em>${nextProg.name}</em>
              </div>`;
      }
    }

    // Level controls — only show on today's active block, session not complete
    let levelControlsHTML = "";
    if (isTodayBlock && !isDayComplete) {
      const isModified = currentName !== baseName; // 🚨 UPDATED

      levelControlsHTML = `
        <div class="level-controls">
          ${
            !isModified
              ? `<button class="not-feeling-btn" onclick="openNotFeelingIt('${ex.id}')">
                😮‍💨 Not Feeling It
               </button>`
              : `<span class="level-tag modified">Today: ${currentName} <span style="color:var(--muted)">/ Base: ${baseName}</span></span>
               <button class="not-feeling-btn revert" onclick="revertToBaseline('${ex.id}')">
                 ↩ Revert
               </button>`
          }
        </div>`;
    }

    // Decide which name to show in the UI header
    const displayVariationName = isDayComplete
      ? completedVariationName
      : currentName;
    const displayVariationIdx = isDayComplete ? completedIdx : currentIdx;

    row.innerHTML = `
      <div class="ex-top">
        <div class="ex-info">
          <div class="ex-name-row">
            <span class="ex-category">${slotInfo.focus}</span>
          </div>
          <div class="ex-name" id="ex-name-${ex.id}">${displayVariationName}</div>
          <div class="ex-variation-tag">
            <span>${slotInfo.label}</span>
            ${displayVariationIdx > 0 ? `<span style="color:var(--legs);border-color:rgba(57,255,143,0.2)">Level ${displayVariationIdx + 1}</span>` : ""}
          </div>
          ${levelControlsHTML}
          <div class="ex-note">${ex.note}</div>
        </div>
        <div class="sets-display" style="color:${colorVar}">
          ${ex.sets} sets · <span style="font-size:14px;opacity:0.7;letter-spacing:0.5px">${varType === "hold" ? "30–60s hold" : "30–50 reps"}</span>
        </div>
      </div>
      <div class="rep-tracker">
        <span class="rt-label">${varType === "hold" ? "Log Secs" : "Log Reps"}</span>
        <div class="rep-sets">${setsHTML}</div>
        <div class="progress-bar-wrap">
          <div class="progress-bar">
            <div class="progress-fill" id="fill-${ex.id}" style="width:0%;background:${colorVar}"></div>
          </div>
          <div class="progress-label" id="prog-label-${ex.id}">
            ${isDayComplete ? "Session locked ✓" : !isTodayBlock ? "Scheduled for another day" : "Enter reps above"}
          </div>
        </div>
      </div>
      ${readinessHTML}`;

    list.appendChild(row);
  });

  if (isTodayBlock && !isDayComplete) {
    const fin = document.createElement("div");
    fin.className = "finish-area";
    fin.innerHTML = `<button class="finish-workout-btn" onclick="openFinishModal()">Finish & Lock Session</button>`;
    list.appendChild(fin);
  }
  // 🚨 NEW: Show Override button if it's a Rest Day and the block isn't active
  else if (!isTodayBlock && isRestDay && !isDayComplete) {
    const over = document.createElement("div");
    over.className = "finish-area";
    over.innerHTML = `<button class="finish-workout-btn" style="background:transparent; border:1px dashed var(--muted); color:var(--muted)" onclick="requestOverride('${day}')">🔓 Override Rest & Unlock ${day.charAt(0).toUpperCase() + day.slice(1)}</button>`;
    list.appendChild(over);
  }
}

function updateRepProgress(exId, sets, color) {
  const maxRep = getVarType(exId) === "hold" ? 60 : 50;
  const vals = Array.from({ length: sets }, (_, i) => {
    const v = parseInt(
      document.getElementById(`inp-${exId}-${i}`)?.value || "0",
    );
    return isNaN(v) ? 0 : v;
  });
  const total = vals.reduce((a, b) => a + b, 0);
  const bestSet = Math.max(...vals);
  const pct = Math.min(100, Math.round((bestSet / maxRep) * 100));
  const maxTotal = maxRep * sets;

  const fill = document.getElementById(`fill-${exId}`);
  const label = document.getElementById(`prog-label-${exId}`);
  if (fill) {
    fill.style.width = pct + "%";
    fill.style.background =
      pct >= 100
        ? "var(--legs)"
        : pct >= 80
          ? "var(--gold)"
          : `var(--${color})`;
  }

  if (label && !appState.completed[getLocalDateStr()]) {
    // Check if this exercise belongs to today's block
    const baseType = getSchedule()[getLocalTime().getDay()].type;
    const todayStr = getLocalDateStr();
    const activeType =
      appState.override && appState.override.date === todayStr
        ? appState.override.type
        : baseType;
    const isTodayBlock = activeType === color; // <--- Replace 'todayType' with 'activeType'

    if (!isTodayBlock) {
      label.textContent = "Scheduled for another day";
    } else {
      const unit = getVarType(exId) === "hold" ? "s" : "reps";
      const unitLabel = getVarType(exId) === "hold" ? "Best hold" : "Best set";
      label.textContent =
        total > 0
          ? `${unitLabel}: ${bestSet}${unit} · Total: ${total}${unit}${pct >= 100 ? " — Ready to level up ✓" : ""}`
          : `Enter ${unit} above`;
    }
  }

  vals.forEach((v, i) => {
    const inp = document.getElementById(`inp-${exId}-${i}`);
    if (inp) {
      v >= maxRep ? inp.classList.add("maxed") : inp.classList.remove("maxed");
    }
  });

  return total;
}

function handleRepInput(exId, setIdx, color) {
  const ex = Object.values(EXERCISES)
    .flat()
    .find((e) => e.id === exId);
  const inp = document.getElementById(`inp-${exId}-${setIdx}`);

  appState.reps[exId][setIdx] = inp.value;

  updateRepProgress(exId, ex.sets, color);
  updateDailyVolume();

  clearTimeout(saveTimer);

  saveTimer = setTimeout(() => {
    saveState(true);
  }, 1000);
}

function updateDailyVolume() {
  const todayStr = getLocalDateStr();
  const today = getLocalTime().getDay();
  const baseType = getSchedule()[today].type;
  const type =
    appState.override && appState.override.date === todayStr
      ? appState.override.type
      : baseType;

  let total = 0;
  const exercises = {};

  Object.values(EXERCISES)
    .flat()
    .forEach((ex) => {
      const sets = (appState.reps[ex.id] || []).map((v) => {
        const p = parseInt(v);
        return isNaN(p) ? 0 : p;
      });
      const exTotal = sets.reduce((a, b) => a + b, 0);
      total += exTotal;
      if (exTotal > 0) {
        exercises[ex.id] = {
          sets,
          variation: appState.variations[ex.id] || ex.progressions[0].name,
          total: exTotal,
        };
      }
    });

  if (!appState.history) appState.history = {};

  // Preserve rich format if already exists, otherwise build it
  const existing = appState.history[todayStr];
  if (typeof existing === "object" && existing !== null) {
    appState.history[todayStr] = {
      ...existing,
      total,
      exercises,
    };
  } else {
    appState.history[todayStr] = {
      total,
      type: type !== "rest" ? type : null,
      exercises,
    };
  }

  document.getElementById("today-vol-total").textContent = `Today: ${total}`;
}

function exportData() {
  const EXPORT_MSGS = [
    ["Encrypting your gains...", "Compiling history"],
    ["Packing your PRs...", "Serialising records"],
    ["Bundling progression levels...", "Almost ready"],
    ["Sealing the vault...", "One moment"],
    ["Done. Stay backed up.", "Download starting"],
  ];

  showTransferOverlay(EXPORT_MSGS, 400, () => {
    const json = JSON.stringify(appState, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const t = getLocalTime();
    const timestamp = `${getLocalDateStr()}-${String(t.getHours()).padStart(2, "0")}${String(t.getMinutes()).padStart(2, "0")}${String(t.getSeconds()).padStart(2, "0")}`;
    a.download = `${appState.name ? appState.name.toLowerCase().replace(/\s+/g, "-") + "-" : ""}hq-backup-${timestamp}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(
      "<img src='export.png' style='width:24px;height:24px;'>",
      `<strong>Data exported.</strong><br>Save that file somewhere safe.`,
    );
  });
}

// Variable to hold the file data while the user clicks "Confirm"
let pendingImportData = null;

function importData() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (!parsed.onboarded) throw new Error("Invalid backup file");

        // Data Age Check
        const getLatestDate = (state) =>
          Object.keys(state.history || {})
            .sort()
            .pop() || "";
        const currentLatest = getLatestDate(appState);
        const importLatest = getLatestDate(parsed);
        const isOlder =
          currentLatest && importLatest && currentLatest > importLatest;

        // Store data temporarily
        pendingImportData = parsed;

        // Setup Modal Text based on age
        const titleEl = document.getElementById("import-modal-title");
        const msgEl = document.getElementById("import-modal-msg");
        const btnEl = document.getElementById("import-confirm-btn");

        if (isOlder) {
          titleEl.innerHTML = "⚠️ Older Backup Detected";
          msgEl.innerHTML =
            "The backup you are trying to import is <strong>OLDER</strong> than your current progress!<br><br>If you continue, you will lose your recent logs. Are you absolutely sure you want to overwrite your current data?";
          btnEl.textContent = "Yes, Downgrade";
          btnEl.style.background = "var(--push)";
          btnEl.style.color = "#000";
        } else {
          titleEl.innerHTML = "Overwrite Data?";
          msgEl.innerHTML =
            "This will overwrite your current programme with the backup file.<br><br>Continue?";
          btnEl.textContent = "Yes, Import";
          btnEl.style.background = "var(--gold)";
          btnEl.style.color = "var(--bg)";
        }

        // Show Modal
        document.getElementById("import-confirm-modal").classList.add("show");
      } catch (err) {
        showToast(
          "❌",
          `<strong>Import failed.</strong><br>File doesn't look right. Use a valid backup.`,
        );
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

function executeImport() {
  if (!pendingImportData) return;

  // Hide modal
  document.getElementById("import-confirm-modal").classList.remove("show");

  const IMPORT_MSGS = [
    ["Hold on tight...", "Reading backup file"],
    ["Decrypting your gains...", "Parsing data"],
    ["Restoring progression levels...", "Rebuilding variations"],
    ["Reloading your history...", "Almost there"],
    [`You're back.`, "Welcome home"],
  ];

  // Run the cool loading animation
  showTransferOverlay(IMPORT_MSGS, 500, () => {
    appState = { ...appState, ...pendingImportData };
    saveState();
    document.getElementById("settings-modal").classList.remove("show");
    initUI();
    showToast(
      "✅",
      `<strong>Welcome back, ${pendingImportData.name || "Athlete"}.</strong><br>Data successfully restored and synced.`,
    );
    pendingImportData = null; // Clear memory
  });
}

function showTransferOverlay(messages, interval, onComplete) {
  const overlay = document.getElementById("transfer-overlay");
  const msgEl = document.getElementById("transfer-msg");
  const subEl = document.getElementById("transfer-sub");

  overlay.classList.add("show");
  let i = 0;

  msgEl.textContent = messages[0][0];
  subEl.textContent = messages[0][1];

  const cycle = setInterval(() => {
    i++;
    if (i >= messages.length) {
      clearInterval(cycle);
      setTimeout(() => {
        overlay.classList.remove("show");
        onComplete();
      }, 400);
      return;
    }
    msgEl.style.opacity = "0";
    setTimeout(() => {
      msgEl.textContent = messages[i][0];
      subEl.textContent = messages[i][1];
      msgEl.style.opacity = "1";
    }, 200);
  }, interval);
}
// ============================================================
// GRAPH
// ============================================================
let graphMode = "week";
let activeTypeFilters = new Set(["push", "pull", "legs"]);

function setGraphMode(mode) {
  graphMode = mode;
  document
    .querySelectorAll(".g-btn[id^='btn-']")
    .forEach((b) => b.classList.remove("active"));
  document.getElementById(`btn-${mode}`).classList.add("active");
  renderGraph();
}

function toggleTypeFilter(type) {
  if (activeTypeFilters.has(type)) {
    if (activeTypeFilters.size === 1) return; // keep at least one
    activeTypeFilters.delete(type);
    document.getElementById(`filter-${type}`).classList.remove("active");
  } else {
    activeTypeFilters.add(type);
    document.getElementById(`filter-${type}`).classList.add("active");
  }
  renderGraph();
}

function getHistoryTotal(dateStr) {
  const entry = appState.history?.[dateStr];
  if (!entry) return { total: 0, type: null };
  if (typeof entry === "number") return { total: entry, type: null };

  // Filter by active type filters
  if (entry.type && !activeTypeFilters.has(entry.type))
    return { total: 0, type: entry.type, filtered: true };

  return { total: entry.total || 0, type: entry.type };
}

function getScheduledType(date) {
  const sched = getSchedule();
  return sched[date.getDay()]?.type || "rest";
}

function renderGraph() {
  const container = document.getElementById("volume-graph");
  if (!container) return;
  container.innerHTML = "";

  const hist = appState.history || {};
  const histEntries = Object.entries(hist)
    .map(([d, v]) => ({
      date: new Date(d + "T00:00:00"),
      dateStr: d,
      vol: typeof v === "object" ? v.total : v,
    }))
    .sort((a, b) => a.date - b.date);

  let chartData = [];
  let maxVol = 1;
  const todayStr = getLocalDateStr();

  if (graphMode === "week") {
    const today = getLocalTime();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today.getTime() - i * 86400000);
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      const { total, type, filtered } = getHistoryTotal(dateStr);
      const histEntry = appState.history?.[dateStr];
      const historicalSplit =
        typeof histEntry === "object" && histEntry?.split
          ? histEntry.split
          : appState.split;
      const scheduledType =
        (historicalSplit === "6day" ? SCHEDULE_6DAY : SCHEDULE_DEFAULT)[
          d.getDay()
        ]?.type || "rest";
      const isPast = dateStr < todayStr;
      const isMissed =
        isPast && scheduledType !== "rest" && total === 0 && !filtered;

      if (total > maxVol) maxVol = total;
      chartData.push({
        label: i === 0 ? "Today" : DAYS[d.getDay()].substring(0, 3),
        vol: total,
        type,
        scheduledType,
        isHighlight: i === 0,
        isMissed,
        dateStr,
      });
    }
  } else if (graphMode === "month") {
    const today = getLocalTime();
    for (let i = 27; i >= 0; i--) {
      const d = new Date(today.getTime() - i * 86400000);
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      const { total, type, filtered } = getHistoryTotal(dateStr);
      const histEntry = appState.history?.[dateStr];
      const historicalSplit =
        typeof histEntry === "object" && histEntry?.split
          ? histEntry.split
          : appState.split;
      const scheduledType =
        (historicalSplit === "6day" ? SCHEDULE_6DAY : SCHEDULE_DEFAULT)[
          d.getDay()
        ]?.type || "rest";
      const isPast = dateStr < todayStr;
      const isMissed =
        isPast && scheduledType !== "rest" && total === 0 && !filtered;

      if (total > maxVol) maxVol = total;
      chartData.push({
        label: i % 7 === 0 ? String(d.getDate()) : "",
        vol: total,
        type,
        scheduledType,
        isHighlight: dateStr === todayStr,
        isMissed,
        dateStr,
      });
    }
  } else {
    const today = getLocalTime();
    const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      let vol = 0;
      let dominantType = null;
      let typeCounts = { push: 0, pull: 0, legs: 0 };
      histEntries.forEach((e) => {
        if (e.dateStr.startsWith(key)) {
          const entry = hist[e.dateStr];
          const t = typeof entry === "object" ? entry.type : null;
          if (t && activeTypeFilters.has(t)) {
            vol += e.vol;
            if (t) typeCounts[t] = (typeCounts[t] || 0) + 1;
          } else if (!t) {
            vol += e.vol;
          }
        }
      });
      dominantType = Object.entries(typeCounts).sort(
        (a, b) => b[1] - a[1],
      )[0]?.[0];
      if (vol > maxVol) maxVol = vol;
      chartData.push({
        label: months[d.getMonth()],
        vol,
        type: dominantType,
        isHighlight: i === 0,
        isMissed: false,
        dateStr: key,
      });
    }
  }

  const hasData = chartData.some((d) => d.vol > 0);

  if (!hasData) {
    container.innerHTML = `
      <div class="graph-empty">
        <div class="graph-empty-icon">📊</div>
        <div class="graph-empty-text">
          <strong>No volume logged yet</strong>
          Complete your first session to see history here.
        </div>
      </div>`;
    document.getElementById("today-vol-total").textContent = "Today: 0";
    return;
  }

  const typeColors = {
    push: "var(--push)",
    pull: "var(--pull)",
    legs: "var(--legs)",
  };

  chartData.forEach((data) => {
    const wrap = document.createElement("div");
    wrap.className = "graph-bar-wrap";
    const hPct =
      maxVol > 0
        ? Math.max(data.vol > 0 ? 6 : 0, (data.vol / maxVol) * 100)
        : 0;

    let barColor;
    if (data.isHighlight) barColor = "var(--gold)";
    else if (data.isMissed) barColor = "transparent";
    else if (data.type && typeColors[data.type])
      barColor = typeColors[data.type];
    else if (data.vol > 0) barColor = "var(--dim)";
    else barColor = "var(--border)";

    const bar = document.createElement("div");
    bar.className = `graph-bar${data.isMissed ? " missed" : ""}`;
    bar.style.height = data.isMissed ? "100%" : `${hPct}%`;
    bar.style.background = barColor;
    bar.setAttribute("data-val", data.isMissed ? "Missed" : String(data.vol));

    const label = document.createElement("div");
    label.className = `graph-day${data.isHighlight ? " today-label" : ""}`;
    label.textContent = data.label;

    wrap.appendChild(bar);
    wrap.appendChild(label);
    container.appendChild(wrap);
  });

  const todayEntry = getHistoryTotal(todayStr);
  document.getElementById("today-vol-total").textContent =
    `Today: ${todayEntry.total}`;
}

// ============================================================
// COLLAPSE
// ============================================================
const blockOpen = { push: false, pull: false, legs: false };
const blockBuilt = { push: false, pull: false, legs: false };

function toggleBlock(day) {
  blockOpen[day] = !blockOpen[day];
  const body = document.getElementById(`body-${day}`);
  const toggle = document.getElementById(`toggle-${day}`);
  const header = document.getElementById(`header-${day}`);
  if (blockOpen[day]) {
    if (!blockBuilt[day]) {
      buildExerciseList(day);
      EXERCISES[day].forEach((ex) =>
        updateRepProgress(ex.id, ex.sets, ex.color),
      );
      blockBuilt[day] = true;
    }
    body.style.maxHeight = body.scrollHeight + 1200 + "px";
    toggle.textContent = "▾";
    header.classList.add("open");
  } else {
    body.style.maxHeight = "0";
    toggle.textContent = "▸";
    header.classList.remove("open");
  }
}

function openBlock(day) {
  if (!blockOpen[day]) toggleBlock(day);
}

// ============================================================
// TOAST
// ============================================================
let toastTimer;
function showToast(icon, msg) {
  const t = document.getElementById("toast");
  document.getElementById("toast-icon").innerHTML = icon;
  document.getElementById("toast-msg").innerHTML = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 4500);
}

// ============================================================
// LEVEL CHANGE — "NOT FEELING IT"
// ============================================================

function openNotFeelingIt(exId) {
  const ex = Object.values(EXERCISES)
    .flat()
    .find((e) => e.id === exId);
  const baseline = appState.sessionBaseline[exId] || ex.progressions[0].name;
  const baselineIdx = ex.progressions.findIndex((p) => p.name === baseline);

  // Build list of all variations BELOW baseline (index 0 to baselineIdx-1)
  const options = ex.progressions.slice(0, baselineIdx);
  if (options.length === 0) {
    showToast(
      "💪",
      `<strong>Already at the floor.</strong><br>No easier variation exists.`,
    );
    return;
  }

  document.getElementById("level-modal-title").textContent = "Not Feeling It?";
  document.getElementById("level-modal-sub").textContent =
    "Pick an easier variation for today only. Reverts to baseline next session.";
  document.getElementById("level-modal-detail").innerHTML = `
    <span style="color:var(--muted);font-size:11px;text-transform:uppercase;letter-spacing:1px">Your baseline</span><br>
    <span style="color:var(--text);font-weight:600">${baseline}</span>
    <span class="revert">↩ Auto-restores next session</span>`;

  // Render variation options, highest first (closest to baseline at top)
  const listEl = document.getElementById("nfi-variation-list");
  listEl.innerHTML = options
    .slice()
    .reverse()
    .map((p, i) => {
      const realIdx = baselineIdx - 1 - i;
      return `<div class="nfi-variation-item" onclick="confirmNotFeelingIt('${exId}', '${p.name.replace(/'/g, "\\'")}')">
      <span class="nfi-name">${p.name}</span>
      <span class="nfi-level">Level ${realIdx + 1}</span>
    </div>`;
    })
    .join("");

  document.getElementById("level-modal").classList.add("show");
}

function confirmNotFeelingIt(exId, targetName) {
  const ex = Object.values(EXERCISES)
    .flat()
    .find((e) => e.id === exId);

  // Lock in the real baseline BEFORE overwriting variations
  if (!appState.sessionBaseline[exId]) {
    appState.sessionBaseline[exId] =
      appState.variations[exId] || ex.progressions[0].name;
  }
  const trueBaseline = appState.sessionBaseline[exId];

  // Persist true baseline so confirmResetToday can restore it
  // even if sessionBaseline gets clobbered by a login/initUI cycle
  appState.nfiBaselines = appState.nfiBaselines || {};
  appState.nfiBaselines[exId] = trueBaseline;

  appState.reps[exId] = Array(ex.sets).fill("");
  appState.variations[exId] = targetName;

  appState.sessionBaseline[exId] = trueBaseline;

  appState.reps[exId] = Array(ex.sets).fill("");
  appState.variations[exId] = targetName;

  // Immediately re-assert baseline in case saveState/initUI clobbers it
  appState.sessionBaseline[exId] = trueBaseline;

  saveState();
  closeLevelModal();

  const today = getLocalTime().getDay();
  const type = getSchedule()[today].type;
  buildExerciseList(type);
  EXERCISES[type].forEach((e) => updateRepProgress(e.id, e.sets, e.color));
  updateDailyVolume();
  openBlock(type);
  appState.sessionBaseline[exId] = trueBaseline;

  showToast(
    "😮‍💨",
    `<strong>Modified for today.</strong><br>Now on: ${targetName}`,
  );
}

function revertToBaseline(exId) {
  const ex = Object.values(EXERCISES)
    .flat()
    .find((e) => e.id === exId);
  const baseline = appState.sessionBaseline[exId] || ex.progressions[0].name;
  appState.reps[exId] = Array(ex.sets).fill("");
  appState.variations[exId] = baseline;
  if (appState.nfiBaselines) delete appState.nfiBaselines[exId];

  saveState();

  const today = getLocalTime().getDay();
  const type = getSchedule()[today].type;
  buildExerciseList(type);
  EXERCISES[type].forEach((e) => updateRepProgress(e.id, e.sets, e.color));
  updateDailyVolume();
  openBlock(type);

  showToast("↩", `<strong>Reverted.</strong><br>Back to: ${baseline}`);
}

function closeLevelModal() {
  document.getElementById("level-modal").classList.remove("show");
}

// ============================================================
// TACTICAL ANALYSIS
// ============================================================
function renderTacticalAnalysis() {
  const hist = appState.history || {};
  const today = getLocalTime();

  // ── Push:Pull ratio (last 30 days) ────────────────────────
  let pushVol = 0,
    pullVol = 0;
  for (let i = 0; i < 30; i++) {
    const d = new Date(today.getTime() - i * 86400000);
    const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const entry = hist[ds];
    if (!entry || typeof entry !== "object") continue;
    if (entry.type === "push") pushVol += entry.total || 0;
    if (entry.type === "pull") pullVol += entry.total || 0;
  }
  const totalPP = pushVol + pullVol;
  const pushPct = totalPP > 0 ? Math.round((pushVol / totalPP) * 100) : 50;
  const ratio = pullVol > 0 ? pushVol / pullVol : null;

  const pushBar = document.getElementById("tac-push-bar");
  const pullBar = document.getElementById("tac-pull-bar");
  if (pushBar) {
    pushBar.style.width = pushPct + "%";
    pushBar.style.background =
      ratio !== null && ratio > 1.5
        ? "var(--push)"
        : ratio !== null && ratio > 1.15
          ? "var(--gold)"
          : "var(--legs)";
  }
  if (pullBar) pullBar.style.width = 100 - pushPct + "%";
  const pushLbl = document.getElementById("tac-push-label");
  const pullLbl = document.getElementById("tac-pull-label");
  if (pushLbl) pushLbl.textContent = `Push ${pushVol}`;
  if (pullLbl) pullLbl.textContent = `Pull ${pullVol}`;

  // ── Plateau detection ─────────────────────────────────────
  const sortedDates = Object.keys(hist).sort().reverse();
  const sessionsByType = { push: [], pull: [], legs: [] };
  for (const ds of sortedDates) {
    const entry = hist[ds];
    if (!entry || typeof entry !== "object" || !entry.exercises || !entry.type)
      continue;
    const t = entry.type;
    if (!sessionsByType[t] || sessionsByType[t].length >= 6) continue;
    sessionsByType[t].push(entry.exercises);
  }
  const plateaus = [];
  for (const [, sessions] of Object.entries(sessionsByType)) {
    if (sessions.length < 3) continue;
    const allIds = new Set(sessions.flatMap((s) => Object.keys(s)));
    for (const exId of allIds) {
      const repCounts = sessions
        .map((s) => (s[exId] ? s[exId].sets.reduce((a, r) => a + r, 0) : null))
        .filter((v) => v !== null);
      if (repCounts.length < 3) continue;
      const recent3 = repCounts.slice(0, 3);
      const max3 = Math.max(...recent3);
      const min3 = Math.min(...recent3);
      const improvement = min3 > 0 ? ((max3 - min3) / min3) * 100 : 0;
      if (improvement < 5 && max3 > 0) {
        const exData = Object.values(EXERCISES)
          .flat()
          .find((e) => e.id === exId);
        if (exData) plateaus.push({ name: exData.label, reps: recent3[0] });
      }
    }
  }
  const plateauEl = document.getElementById("tac-plateau-list");
  if (plateauEl) {
    plateauEl.innerHTML =
      plateaus.length === 0
        ? `<div class="plateau-item" style="color:var(--legs)"><span class="plateau-dot" style="background:var(--legs)"></span>No stagnation detected.</div>`
        : plateaus
            .slice(0, 3)
            .map(
              (p) =>
                `<div class="plateau-item"><span class="plateau-dot"></span>${p.name}: ~${p.reps} reps flat</div>`,
            )
            .join("");
  }

  // ── Level-up proximity (from personalRecords) ─────────────
  let levelUpTargets = [];
  let seenExNames = new Set(); // Prevent duplicate entries like "Plank" showing up twice

  Object.values(EXERCISES)
    .flat()
    .forEach((ex) => {
      const varName = appState.variations[ex.id] || ex.progressions[0].name;

      // Skip if we already tracked this exact variation
      if (seenExNames.has(varName)) return;

      const pr = appState.personalRecords?.[varName]?.value || 0;
      const baselineIdx = ex.progressions.findIndex((p) => p.name === varName);
      const hasNext =
        baselineIdx > -1 && baselineIdx < ex.progressions.length - 1;

      // Figure out if it's a rep or a hold to set the correct math
      const entry = ex.progressions[baselineIdx];
      const varType = entry?.type || "reps";
      const maxTarget = varType === "hold" ? 60 : 50;
      const minTarget = varType === "hold" ? 50 : 40; // Tracking range: 50-59s or 40-49 reps
      const unit = varType === "hold" ? "s" : " reps";

      if (pr >= minTarget && pr < maxTarget && hasNext) {
        levelUpTargets.push({
          name: varName,
          reps: pr,
          gap: maxTarget - pr,
          unit: unit,
        });
        seenExNames.add(varName);
      }
    });

  // Sort so the ones you are closest to beating appear first
  levelUpTargets.sort((a, b) => a.gap - b.gap);

  // ── Priority briefing ─────────────────────────────────────
  const briefEl = document.getElementById("tac-briefing-container");
  if (!briefEl) return;

  let cls = "priority-good",
    icon = "✅",
    body = "";

  if (ratio !== null && ratio > 1.5 && totalPP > 0) {
    cls = "priority-safety";
    icon = "⚠️";
    body = `<strong style="color:var(--push)">Imbalance Detected:</strong> You're doing <strong>${ratio.toFixed(1)}×</strong> more Push than Pull over 30 days. Prioritise Pull sessions to protect your shoulders.`;
  } else if (plateaus.length > 0) {
    cls = "priority-plateau";
    icon = "📉";
    body = `<strong style="color:var(--gold)">Stagnation — ${plateaus[0].name}:</strong> No rep improvement in 3 sessions. Try an extra set or slower eccentric tempo.`;
  } else if (levelUpTargets.length > 0) {
    cls = "priority-levelup";
    icon =
      "<img src='icons/critical.png' style='width:20px;height:20px;margin-top:2px;' />";

    if (levelUpTargets.length === 1) {
      const t = levelUpTargets[0];
      body = `<strong style="color:var(--legs)">Mission Critical — ${t.name}:</strong> Your best is ${t.reps}${t.unit}. Only <strong>${t.gap}${t.unit}</strong> away from unlocking the next level.`;
    } else {
      const listStr = levelUpTargets
        .map(
          (t) =>
            `${t.name} (<strong style="color:var(--legs)">${t.gap}${t.unit} away</strong>)`,
        )
        .join(", ");
      body = `<strong style="color:var(--legs)">Mission Critical — Push for the next level:</strong> You are close to graduating on multiple fronts: ${listStr}.`;
    }
  } else if (totalPP === 0) {
    cls = "priority-good";
    icon = "";
    body = `<span style="color:var(--muted)">Complete a few sessions to unlock analysis.</span>`;
  } else {
    body = `<strong style="color:var(--legs)">All clear.</strong> No imbalances or plateaus detected. Keep logging.`;
  }

  briefEl.innerHTML = `
          <div class="tac-briefing ${cls}">
            <span class="tac-briefing-icon">${icon}</span>
            <div class="tac-briefing-text">${body}</div>
          </div>`;
}

function renderStats() {
  const container = document.getElementById("stats-section");
  if (!container) return;

  const hist = appState.history || {};
  const todayStr = getLocalDateStr();
  const prs = appState.personalRecords || {};

  // Total sessions
  const totalSessions = Object.keys(appState.completed || {}).length;

  // Current streak
  let streak = 0;
  const sched = getSchedule();
  const today = getLocalTime();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today.getTime() - i * 86400000);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const scheduledType = sched[d.getDay()]?.type;
    if (scheduledType === "rest") continue;
    if (appState.completed?.[dateStr]) {
      streak++;
    } else if (dateStr < todayStr) {
      break; // missed a scheduled day — streak over
    }
  }

  // Best session volume
  let bestVol = 0;
  let bestVolDate = null;
  Object.entries(hist).forEach(([dateStr, entry]) => {
    const vol = typeof entry === "object" ? entry.total : entry;
    if (vol > bestVol) {
      bestVol = vol;
      bestVolDate = dateStr;
    }
  });

  // Average reps per set (last 7 days)
  let totalRepsLast7 = 0;
  let totalSetsLast7 = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(today.getTime() - i * 86400000);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const entry = hist[dateStr];
    if (entry && typeof entry === "object" && entry.exercises) {
      Object.values(entry.exercises).forEach((ex) => {
        ex.sets.forEach((s) => {
          if (s > 0) {
            totalRepsLast7 += s;
            totalSetsLast7++;
          }
        });
      });
    }
  }
  const avgReps =
    totalSetsLast7 > 0 ? Math.round(totalRepsLast7 / totalSetsLast7) : 0;

  // Days since last PR
  let daysSincePR = null;
  let lastPRDate = null;
  // We don't store PR dates yet so show total PR count instead
  const totalPRs = Object.keys(prs).length;

  // Missed sessions last 30 days — only count days after first session
  let missedSessions = 0;
  const firstSessionDate = Object.keys(appState.completed || {}).sort()[0];
  if (firstSessionDate) {
    for (let i = 1; i < 30; i++) {
      const d = new Date(today.getTime() - i * 86400000);
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      if (dateStr < firstSessionDate) break; // don't count before app was started
      const histEntry = appState.history?.[dateStr];
      const historicalSplit =
        typeof histEntry === "object" && histEntry?.split
          ? histEntry.split
          : appState.split;
      const historicalSched =
        historicalSplit === "6day" ? SCHEDULE_6DAY : SCHEDULE_DEFAULT;
      const scheduledType = historicalSched[d.getDay()]?.type;
      if (scheduledType !== "rest" && !appState.completed?.[dateStr])
        missedSessions++;
    }
  }

  // Volume trend — this week vs last week
  let thisWeekVol = 0,
    lastWeekVol = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(today.getTime() - i * 86400000);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const entry = hist[dateStr];
    thisWeekVol += entry
      ? typeof entry === "object"
        ? entry.total
        : entry
      : 0;
  }
  for (let i = 7; i < 14; i++) {
    const d = new Date(today.getTime() - i * 86400000);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const entry = hist[dateStr];
    lastWeekVol += entry
      ? typeof entry === "object"
        ? entry.total
        : entry
      : 0;
  }
  const volTrend =
    lastWeekVol === 0
      ? null
      : Math.round(((thisWeekVol - lastWeekVol) / lastWeekVol) * 100);
  const trendColor =
    volTrend === null
      ? "var(--muted)"
      : volTrend >= 0
        ? "var(--legs)"
        : "var(--push)";
  const trendSign = volTrend === null ? "" : volTrend >= 0 ? "+" : "";

  container.innerHTML = `
    <div class="stat-card">
      <div class="stat-label">Total Sessions</div>
      <div class="stat-val gold">${totalSessions}</div>
      <div class="stat-sub">sessions completed</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Current Streak</div>
      <div class="stat-val" style="color:var(--gold)">
        ${streak} <span class="streak-fire" style="font-size:20px">${streak >= 3 ? "🔥" : "💤"}</span>
      </div>
      <div class="stat-sub">scheduled sessions</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Best Session</div>
      <div class="stat-val gold">${bestVol}</div>
      <div class="stat-sub">${bestVolDate ? `reps on ${bestVolDate.slice(5).replace("-", "/")}` : "no data yet"}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Avg Reps / Set</div>
      <div class="stat-val">${avgReps || "—"}</div>
      <div class="stat-sub">last 7 days</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Volume Trend</div>
      <div class="stat-val" style="color:${trendColor}">${volTrend === null ? "—" : `${trendSign}${volTrend}%`}</div>
      <div class="stat-sub">this week vs last</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Personal Records</div>
      <div class="stat-val gold">${totalPRs}</div>
      <div class="stat-sub">variations tracked</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Missed (30d)</div>
      <div class="stat-val" style="color:${missedSessions > 3 ? "var(--push)" : missedSessions > 0 ? "var(--gold)" : "var(--legs)"}">${missedSessions}</div>
      <div class="stat-sub">scheduled sessions</div>
    </div>
  `;
}

// ============================================================
// QUICK NAME EDIT
// ============================================================
function openEditName() {
  // Only allow edits if the user has already onboarded
  if (!appState.onboarded) return;
  document.getElementById("new-display-name").value = appState.name || "";
  document.getElementById("edit-name-modal").classList.add("show");
}

function saveNewName() {
  const newName = document.getElementById("new-display-name").value.trim();
  if (newName) {
    appState.name = newName;
    saveState(true); // Save to Supabase and LocalStorage
    updateHero(); // Instantly update the UI
    document.getElementById("edit-name-modal").classList.remove("show");
    showToast("✅", "Display name updated.");
  }
}

// ============================================================
// INIT
// ============================================================
function initUI() {
  // Reset block built flags so all blocks rebuild fresh
  blockBuilt.push = false;
  blockBuilt.pull = false;
  blockBuilt.legs = false;
  // Snapshot baseline at session start
  const todayStr = getLocalDateStr();
  const isDayComplete = !!appState.completed[todayStr];
  if (!isDayComplete) {
    appState.sessionBaseline = appState.sessionBaseline || {};
    Object.values(EXERCISES)
      .flat()
      .forEach((ex) => {
        if (!appState.sessionBaseline[ex.id]) {
          appState.sessionBaseline[ex.id] =
            appState.variations[ex.id] || ex.progressions[0].name;
        }
      });
  }

  updateHero();
  buildWeekStrip();
  const baseType = getSchedule()[getLocalTime().getDay()].type;
  const todayType =
    appState.override && appState.override.date === todayStr
      ? appState.override.type
      : baseType;
  const buildNow = todayType && todayType !== "rest" ? todayType : "push";
  buildExerciseList(buildNow);
  EXERCISES[buildNow].forEach((ex) =>
    updateRepProgress(ex.id, ex.sets, ex.color),
  );
  blockBuilt[buildNow] = true;
  setTimeout(() => {
    renderGraph();
    renderStats();
    renderTacticalAnalysis();
  }, 100);

  const today = getLocalTime().getDay();
  const sess = getSchedule()[today];
  const isComplete = !!appState.completed[todayStr];

  checkMissedSessions();
  setTimeout(() => {
    if (isComplete) {
      showToast(
        "🏆",
        `<strong>Already done for today, ${appState.name}.</strong><br>Rest up. See you next session.`,
      );
    } else if (sess.type !== "rest") {
      openBlock(sess.type);
      document
        .getElementById(`block-${sess.type}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      showToast(
        "💪",
        `<strong>Today is ${sess.label} Day, ${appState.name}.</strong><br>Track your reps and chase the pump.`,
      );
    } else {
      showToast(
        `<img src="icons/rest.png" style="width:28px;height:28px;object-fit:contain">`,
        `<strong>Rest day, ${appState.name}.</strong><br>Stay active — stretch, run, or parkour.`,
      );
    }
  }, 1000);
}

// ============================================================
// MISSED SESSION DETECTION
// ============================================================
function checkMissedSessions() {
  if (!appState.onboarded || Object.keys(appState.completed || {}).length === 0)
    return;

  const today = getLocalTime();
  const todayStr = getLocalDateStr();
  const lastAck = appState.lastMissedAcknowledged || "";
  const SCAN_LIMIT = 90;

  // Find the earliest completed session — don't scan before this
  const completedDates = Object.keys(appState.completed || {}).sort();
  const firstEverSession = completedDates[0] || todayStr;

  const missed = [];

  for (let i = 1; i <= SCAN_LIMIT; i++) {
    const d = new Date(today.getTime() - i * 86400000);
    const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

    // Don't go before the user's first session
    if (ds < firstEverSession) break;

    // Stop if we've reached the last acknowledged date
    if (lastAck && ds <= lastAck) break;

    // Stop if we hit a completed session — that's the anchor
    if (appState.completed?.[ds]) break;

    const histEntry = appState.history?.[ds];
    const splitUsed =
      typeof histEntry === "object" && histEntry?.split
        ? histEntry.split
        : appState.split;
    const sched = splitUsed === "6day" ? SCHEDULE_6DAY : SCHEDULE_DEFAULT;
    const scheduledType = sched[d.getDay()]?.type;

    if (!scheduledType || scheduledType === "rest") continue;

    if (ds < todayStr) {
      const label =
        scheduledType.charAt(0).toUpperCase() + scheduledType.slice(1);
      const dayName = DAYS[d.getDay()];
      const dateFormatted = `${d.getDate()} ${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getMonth()]} ${d.getFullYear()}`;
      missed.push({ type: label, day: dayName, date: dateFormatted, ds });
    }
  }

  if (missed.length === 0) return;

  const listEl = document.getElementById("missed-session-list");
  if (listEl) {
    listEl.innerHTML = missed
      .reverse()
      .map(
        (m) => `
      <div class="missed-session-item">
        <span class="missed-session-type">${m.type} Day</span>
        <span class="missed-session-date">${m.day}, ${m.date}</span>
      </div>`,
      )
      .join("");
  }

  document.getElementById("missed-modal").classList.add("show");
}

function acknowledgeMissed() {
  // Store yesterday's date as last acknowledged so we don't re-show same misses
  const yesterday = new Date(getLocalTime().getTime() - 86400000);
  appState.lastMissedAcknowledged = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;
  saveState(true);
  document.getElementById("missed-modal").classList.remove("show");
}

function initClocks() {
  setInterval(() => {
    const t = getLocalTime();
    const h = t.getHours(),
      m = t.getMinutes(),
      s = t.getSeconds();
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    document.getElementById("local-time").textContent =
      `${h12}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")} ${ampm}`;
  }, 1000);
}

loadState();
initClocks();
