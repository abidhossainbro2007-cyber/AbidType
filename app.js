const supabaseClient = window.supabase.createClient(
  window.ABIDTYPE_SUPABASE_URL,
  window.ABIDTYPE_SUPABASE_PUBLISHABLE_KEY
);

/* =========================
   PASSAGES
========================= */

const passages = {
  en: "Typing is a skill that improves with regular practice. Focus on accuracy first and speed will follow naturally. Every day is a new opportunity to improve your typing speed, confidence, and consistency.",
  bn: "নিয়মিত অনুশীলন করলে টাইপিংয়ের গতি এবং নির্ভুলতা ধীরে ধীরে বাড়ে। প্রথমে নির্ভুলতার দিকে মনোযোগ দিন। প্রতিদিন একটু একটু করে অনুশীলন করলে আপনার আত্মবিশ্বাস এবং টাইপিং দক্ষতা আরও ভালো হবে।"
};

/* =========================
   TEST STATE
========================= */

let test = {
  running: false,
  start: 0,
  timer: null,
  duration: 60,
  text: "",
  errors: 0,
  typed: 0,
  correct: 0,
  mode: "normal",
  graph: [],
  lastGraphSecond: -1
};

/* =========================
   HELPERS
========================= */

const $ = id => document.getElementById(id);

const authModal = $("authModal");

/* =========================
   MODE SYSTEM
========================= */

function createModeSelector() {
  if ($("typingMode")) return;

  const controls = document.querySelector(".controls");
  if (!controls) return;

  const label = document.createElement("label");
  label.innerHTML = `
    Mode
    <select id="typingMode">
      <option value="normal">Normal</option>
      <option value="small">Small Letters</option>
      <option value="capital">Capital Letters</option>
      <option value="punctuation">Punctuation</option>
    </select>
  `;

  controls.appendChild(label);

  $("typingMode").addEventListener("change", () => {
    test.mode = $("typingMode").value;
    reset();
  });
}

/* =========================
   TEXT GENERATION
========================= */

function buildText() {
  const language = $("language").value;
  let text = passages[language] || passages.en;

  if (test.mode === "small") {
    text = text
      .replace(/[.,!?;:'"()\-]/g, "")
      .toLowerCase();
  }

  if (test.mode === "capital") {
    text = text
      .replace(/[.,!?;:'"()\-]/g, "")
      .toUpperCase();
  }

  if (test.mode === "punctuation") {
    text =
      "Typing well means using punctuation correctly. Practice commas, periods, question marks, exclamation marks, and other symbols. Accuracy matters more than speed, so type every character carefully.";
  }

  return text;
}

function setupText() {
  test.text = buildText();

  $("textDisplay").innerHTML = [...test.text]
    .map(
      (c, i) =>
        `<span data-i="${i}">${
          c === " " ? "&nbsp;" : escapeHtml(c)
        }</span>`
    )
    .join("");

  highlightCurrent();
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* =========================
   RESET
========================= */

function reset() {
  clearInterval(test.timer);

  test.running = false;
  test.start = 0;
  test.errors = 0;
  test.typed = 0;
  test.correct = 0;
  test.graph = [];
  test.lastGraphSecond = -1;

  test.duration = Number($("duration").value);

  $("time").textContent = test.duration;
  $("wpm").textContent = "0";
  $("accuracy").textContent = "100%";
  $("errors").textContent = "0";
  $("typingInput").value = "";

  $("result").classList.add("hidden");

  setupText();
}

/* =========================
   ACCURACY + WPM
========================= */

function calculateStats() {
  const input = $("typingInput").value;

  let errors = 0;
  let correct = 0;

  [...input].forEach((char, index) => {
    if (char === test.text[index]) {
      correct++;
    } else {
      errors++;
    }
  });

  test.errors = errors;
  test.correct = correct;
  test.typed = input.length;

  let elapsed = 0;

  if (test.start) {
    elapsed = (Date.now() - test.start) / 1000;
  }

  elapsed = Math.max(elapsed, 0.1);

  const minutes = elapsed / 60;

  const wpm = Math.max(
    0,
    Math.round((correct / 5) / minutes)
  );

  const accuracy =
    input.length === 0
      ? 100
      : Math.max(
          0,
          Math.round((correct / input.length) * 100)
        );

  const words = input.trim()
    ? input.trim().split(/\s+/).length
    : 0;

  return {
    wpm,
    accuracy,
    errors,
    correct,
    typed: input.length,
    words
  };
}

/* =========================
   UPDATE SCREEN
========================= */

function updateStats() {
  const stats = calculateStats();

  $("wpm").textContent = stats.wpm;
  $("accuracy").textContent = stats.accuracy + "%";
  $("errors").textContent = stats.errors;

  highlightCharacters();

  recordGraphPoint(stats);

  return stats;
}

/* =========================
   CHARACTER COLORS
========================= */

function highlightCharacters() {
  const input = [...$("typingInput").value];
  const spans = [...$("textDisplay").children];

  spans.forEach((span, index) => {
    span.className = "";

    if (index < input.length) {
      if (input[index] === test.text[index]) {
        span.className = "correct";
      } else {
        span.className = "wrong";
      }
    }

    if (index === input.length) {
      span.classList.add("current");
    }
  });
}

function highlightCurrent() {
  const spans = [...$("textDisplay").children];

  spans.forEach(span => {
    span.className = "";
  });

  if (spans[0]) {
    spans[0].classList.add("current");
  }
}

/* =========================
   GRAPH DATA
========================= */

function recordGraphPoint(stats) {
  if (!test.running || !test.start) return;

  const elapsedSecond = Math.floor(
    (Date.now() - test.start) / 1000
  );

  if (elapsedSecond === test.lastGraphSecond) return;

  test.lastGraphSecond = elapsedSecond;

  test.graph.push({
    second: elapsedSecond,
    wpm: stats.wpm,
    accuracy: stats.accuracy,
    errors: stats.errors
  });
}

/* =========================
   START TEST
========================= */

function start() {
  if (test.running) return;

  test.running = true;
  test.start = Date.now();
  test.graph = [];
  test.lastGraphSecond = -1;

  test.timer = setInterval(() => {
    if (!test.running) return;

    const elapsed = Math.floor(
      (Date.now() - test.start) / 1000
    );

    const left = Math.max(
      0,
      test.duration - elapsed
    );

    $("time").textContent = left;

    updateStats();

    if (left <= 0) {
      finish();
    }
  }, 250);
}

/* =========================
   FINISH TEST
========================= */

async function finish() {
  if (!test.running) return;

  const stats = updateStats();

  clearInterval(test.timer);
  test.timer = null;
  test.running = false;

  $("time").textContent = "0";

  showResult(stats);

  await saveResult(stats);
}

/* =========================
   RESULT SCREEN
========================= */

function showResult(stats) {
  const result = $("result");

  result.classList.remove("hidden");

  result.innerHTML = `
    <div class="result-title">Test Finished 🎉</div>

    <div class="result-grid">
      <div>
        <small>WPM</small>
        <strong>${stats.wpm}</strong>
      </div>

      <div>
        <small>ACCURACY</small>
        <strong>${stats.accuracy}%</strong>
      </div>

      <div>
        <small>WORDS</small>
        <strong>${stats.words}</strong>
      </div>

      <div>
        <small>ERRORS</small>
        <strong>${stats.errors}</strong>
      </div>
    </div>

    <div class="result-message">
      ${
        stats.accuracy >= 95
          ? "Excellent accuracy! 🔥"
          : stats.accuracy >= 85
          ? "Good job! Keep practicing."
          : "Keep practicing. Accuracy first!"
      }
    </div>

    <div class="graph-title">Performance</div>

    <div class="performance-graph">
      ${createGraph(stats)}
    </div>

    <button id="resultRestart" class="primary-btn full">
      Try Again
    </button>
  `;

  $("resultRestart").onclick = reset;
}

/* =========================
   GRAPH
========================= */

function createGraph(stats) {
  if (!test.graph.length) {
    return `<div class="graph-empty">No graph data available.</div>`;
  }

  const maxWpm = Math.max(
    10,
    ...test.graph.map(p => p.wpm)
  );

  return `
    <div class="graph-line">
      ${test.graph
        .map(point => {
          const left =
            test.duration > 0
              ? (point.second / test.duration) * 100
              : 0;

          const bottom =
            Math.max(
              5,
              (point.wpm / maxWpm) * 85
            );

          let dotClass = "yellow";

          if (point.errors > 0) {
            dotClass = "red";
          } else if (point.accuracy >= 95) {
            dotClass = "green";
          }

          return `
            <span
              class="graph-dot ${dotClass}"
              style="left:${Math.min(left, 98)}%;bottom:${Math.min(
                bottom,
                90
              )}%"
              title="${point.second}s — ${point.wpm} WPM — ${point.accuracy}%"
            ></span>
          `;
        })
        .join("")}
    </div>

    <div class="graph-axis">
      <span>0s</span>
      <span>${Math.round(test.duration / 2)}s</span>
      <span>${test.duration}s</span>
    </div>

    <div class="graph-legend">
      <span><i class="green-dot"></i> Correct</span>
      <span><i class="yellow-dot"></i> Normal</span>
      <span><i class="red-dot"></i> Error</span>
    </div>
  `;
}

/* =========================
   SAVE RESULT
========================= */

async function saveResult(stats) {
  try {
    const {
      data: { user }
    } = await supabaseClient.auth.getUser();

    if (!user) return;

    await supabaseClient
      .from("typing_results")
      .insert({
        user_id: user.id,
        language_code: $("language").value,
        duration_seconds: test.duration,
        wpm: stats.wpm,
        accuracy: stats.accuracy,
        errors: stats.errors,
        characters_typed: test.typed
      });
  } catch (error) {
    console.error("Save result error:", error);
  }
}

/* =========================
   AUTH
========================= */

function openAuth() {
  authModal.classList.remove("hidden");
  $("authMessage").textContent = "";
}

function closeAuth() {
  authModal.classList.add("hidden");
}

async function signInWithGoogle() {
  $("authMessage").textContent =
    "Opening Google sign in...";

  const { error } =
    await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          window.location.origin +
          window.location.pathname
      }
    });

  if (error) {
    $("authMessage").textContent =
      error.message;
  }
}

/* =========================
   GOOGLE BUTTON
========================= */

const googleBtn = document.createElement("button");

googleBtn.type = "button";
googleBtn.textContent = "Continue with Google";
googleBtn.className = "google-login-btn";
googleBtn.onclick = signInWithGoogle;

const submitButton = $("submitAuth");

if (
  submitButton &&
  submitButton.parentElement
) {
  submitButton.parentElement.insertBefore(
    googleBtn,
    submitButton
  );
}

/* =========================
   EMAIL AUTH
========================= */

let loginMode = false;

$("switchAuth").onclick = () => {
  loginMode = !loginMode;

  $("authTitle").textContent =
    loginMode
      ? "Welcome back"
      : "Create your account";

  $("submitAuth").textContent =
    loginMode ? "Login" : "Sign up";

  $("displayName").classList.toggle(
    "hidden",
    loginMode
  );

  $("switchAuth").textContent =
    loginMode
      ? "Need an account? Sign up"
      : "Already have an account? Login";

  $("authMessage").textContent = "";
};

$("submitAuth").onclick = async () => {
  const email = $("email").value.trim();
  const password = $("password").value;
  const name = $("displayName").value.trim();

  if (!email || password.length < 6) {
    $("authMessage").textContent =
      "Enter an email and a password with at least 6 characters.";
    return;
  }

  $("authMessage").textContent =
    loginMode
      ? "Logging in..."
      : "Creating your account...";

  let res;

  try {
    if (loginMode) {
      res =
        await supabaseClient.auth.signInWithPassword({
          email,
          password
        });
    } else {
      res =
        await supabaseClient.auth.signUp({
          email,
          password,
          options: {
            data: {
              display_name:
                name || "AbidType User"
            }
          }
        });
    }

    if (res.error) {
      $("authMessage").textContent =
        res.error.message;
      return;
    }

    if (loginMode) {
      closeAuth();
      await refreshUser();
      await loadHistory();
    } else {
      $("authMessage").textContent =
        "Account created. Check your email to confirm, then login.";
    }
  } catch (error) {
    $("authMessage").textContent =
      "Something went wrong. Please try again.";
    console.error(error);
  }
};

/* =========================
   TYPING INPUT
========================= */

$("typingInput").addEventListener(
  "input",
  () => {
    const value = $("typingInput").value;

    /*
      Timer starts ONLY when the first
      character is actually typed.
    */

    if (value.length > 0 && !test.running) {
      start();
    }

    if (test.running) {
      updateStats();
    }
  }
);

/* =========================
   BUTTONS
========================= */

$("finishBtn").onclick = finish;

$("restartBtn").onclick = reset;

$("language").onchange = reset;

$("duration").onchange = reset;

$("historyBtn").onclick = loadHistory;

$("themeBtn").onclick = () => {
  document.body.classList.toggle("light");
};

$("closeAuth").onclick = closeAuth;

/* =========================
   USER
========================= */

async function refreshUser() {
  const {
    data: { user }
  } = await supabaseClient.auth.getUser();

  if (user) {
    $("authBtn").textContent = "Logout";

    $("welcome").textContent =
      "Welcome, " +
      (user.user_metadata?.display_name ||
        "AbidType User");

    $("accountNote").textContent =
      user.email;
  } else {
    $("authBtn").textContent =
      "Login / Sign up";

    $("welcome").textContent =
      "Practice as a guest";

    $("accountNote").textContent =
      "Create an account to save your typing results and build your personal record.";
  }
}

/* =========================
   AUTH BUTTON
========================= */

$("authBtn").addEventListener(
  "click",
  async () => {
    const {
      data: { user }
    } = await supabaseClient.auth.getUser();

    if (user) {
      await supabaseClient.auth.signOut();

      await refreshUser();

      $("history").classList.add("hidden");
    } else {
      openAuth();
    }
  }
);

/* =========================
   HISTORY
========================= */

async function loadHistory() {
  const {
    data: { user }
  } = await supabaseClient.auth.getUser();

  if (!user) {
    openAuth();
    return;
  }

  const { data, error } =
    await supabaseClient
      .from("typing_results")
      .select(
        "language_code,duration_seconds,wpm,accuracy,created_at"
      )
      .order("created_at", {
        ascending: false
      })
      .limit(10);

  const box = $("history");

  box.classList.remove("hidden");

  if (error) {
    box.textContent =
      "Could not load history yet.";
    return;
  }

  box.innerHTML = data.length
    ? data
        .map(
          x => `
            <div class="history-row">
              <span>
                ${
                  x.language_code === "bn"
                    ? "বাংলা"
                    : "English"
                }
              </span>

              <b>${x.wpm} WPM</b>

              <b>${x.accuracy}%</b>

              <span>
                ${new Date(
                  x.created_at
                ).toLocaleDateString()}
              </span>
            </div>
          `
        )
        .join("")
    : "No typing results yet.";
}

/* =========================
   INITIALIZE
========================= */

createModeSelector();

setupText();

reset();

refreshUser();
