const supabaseClient = window.supabase.createClient(
  window.ABIDTYPE_SUPABASE_URL,
  window.ABIDTYPE_SUPABASE_PUBLISHABLE_KEY
);

const $ = (id) => document.getElementById(id);

const passages = {
  en: "Typing is a skill that improves with regular practice. Focus on accuracy first and speed will follow naturally. Every day is a new opportunity to improve your typing speed, confidence, and consistency.",
  bn: "নিয়মিত অনুশীলন করলে টাইপিংয়ের গতি এবং নির্ভুলতা ধীরে ধীরে বাড়ে। প্রথমে নির্ভুলতার দিকে মনোযোগ দিন। প্রতিদিন একটু একটু করে অনুশীলন করলে আপনার আত্মবিশ্বাস এবং টাইপিং দক্ষতা আরও ভালো হবে।"
};

let test = {
  running: false,
  started: false,
  start: 0,
  timer: null,
  duration: 60,
  text: "",
  errors: 0,
  typed: 0,
  wordResults: []
};

const authModal = $("authModal");

function buildText() {
  const language = $("language").value;
  const mode = $("mode").value;

  let text = passages[language] || passages.en;

  if (mode === "capital") {
    text = text.toUpperCase();
  }

  if (mode === "small") {
    text = text
      .replace(/[.,!?;:'"()[\]{}\-—–]/g, "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
  }

  if (mode === "punctuation") {
    if (language === "en") {
      text =
        "Typing well requires practice. Stay focused, keep your fingers relaxed, and remember: accuracy comes first! Can you improve your speed today?";
    } else {
      text =
        "নিয়মিত অনুশীলন করুন। প্রথমে নির্ভুলতা ঠিক রাখুন, তারপর গতি বাড়ান! আপনি কি আজ আপনার টাইপিং আরও ভালো করতে পারবেন?";
    }
  }

  return text;
}

function setupText() {
  test.text = buildText();

  $("textDisplay").innerHTML = [...test.text]
    .map(
      (char, index) =>
        `<span data-i="${index}">${char === " " ? "&nbsp;" : char}</span>`
    )
    .join("");
}

function updateModeInfo() {
  const mode = $("mode").value;

  const messages = {
    normal: "Normal typing practice.",
    punctuation: "Practice typing with punctuation marks.",
    capital: "Practice typing CAPITAL letters.",
    small: "Practice lowercase letters without punctuation."
  };

  $("modeInfo").textContent =
    messages[mode] || messages.normal;
}

function resetTest() {
  clearInterval(test.timer);

  test.running = false;
  test.started = false;
  test.start = 0;
  test.errors = 0;
  test.typed = 0;
  test.wordResults = [];

  test.duration = Number($("duration").value);

  $("setupArea").classList.remove("hidden");
  $("testArea").classList.add("hidden");
  $("resultArea").classList.add("hidden");

  $("time").textContent = test.duration;

  $("typingInput").value = "";

  setupText();
  updateModeInfo();
}

function startTest() {
  if (test.started) return;

  test.started = true;
  test.running = true;
  test.start = Date.now();

  $("typingInput").focus();

  clearInterval(test.timer);

  test.timer = setInterval(() => {
    const elapsed = Math.floor(
      (Date.now() - test.start) / 1000
    );

    const left = Math.max(
      0,
      test.duration - elapsed
    );

    $("time").textContent = left;

    if (left <= 0) {
      finishTest();
    }
  }, 250);
}

function calculateStats() {
  const input = $("typingInput").value;
  const target = test.text;

  let errors = 0;
  let correctChars = 0;

  [...input].forEach((char, index) => {
    if (char === target[index]) {
      correctChars++;
    } else {
      errors++;
    }
  });

  const elapsedSeconds = test.start
    ? Math.max(
        1,
        (Date.now() - test.start) / 1000
      )
    : 1;

  const minutes = elapsedSeconds / 60;

  const wpm = Math.max(
    0,
    Math.round((correctChars / 5) / minutes)
  );

  const accuracy =
    input.length > 0
      ? Math.max(
          0,
          Math.round(
            (correctChars / input.length) * 100
          )
        )
      : 100;

  const totalWords = input.trim()
    ? input.trim().split(/\s+/).length
    : 0;

  const targetWords = target.trim()
    ? target.trim().split(/\s+/)
    : [];

  const typedWords = input.trim()
    ? input.trim().split(/\s+/)
    : [];

  let correctWords = 0;

  typedWords.forEach((word, index) => {
    if (word === targetWords[index]) {
      correctWords++;
    }
  });

  const wrongWords = Math.max(
    0,
    totalWords - correctWords
  );

  test.errors = errors;
  test.typed = input.length;

  return {
    wpm,
    accuracy,
    errors,
    totalWords,
    correctWords,
    wrongWords,
    correctChars
  };
}

function updateTypingDisplay() {
  const input = $("typingInput").value;
  const spans = [...$("textDisplay").children];

  spans.forEach((span, index) => {
    span.className = "";

    if (index < input.length) {
      span.classList.add(
        input[index] === test.text[index]
          ? "correct"
          : "wrong"
      );
    }

    if (index === input.length) {
      span.classList.add("current");
    }
  });
}

function updateLiveTyping() {
  if (!test.started) {
    startTest();
  }

  updateTypingDisplay();
}

function createWordResults() {
  const inputWords = $("typingInput").value
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const targetWords = test.text
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const results = [];

  inputWords.forEach((word, index) => {
    const target = targetWords[index] || "";

    if (word === target) {
      results.push("correct");
    } else {
      results.push("wrong");
    }
  });

  return results;
}

function drawGraph() {
  const canvas = $("performanceChart");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  const width = canvas.clientWidth || 800;
  const height = 260;

  const ratio = window.devicePixelRatio || 1;

  canvas.width = width * ratio;
  canvas.height = height * ratio;

  canvas.style.height = height + "px";

  ctx.setTransform(
    ratio,
    0,
    0,
    ratio,
    0,
    0
  );

  ctx.clearRect(0, 0, width, height);

  ctx.beginPath();
  ctx.moveTo(30, height - 35);
  ctx.lineTo(width - 20, height - 35);
  ctx.strokeStyle = "rgba(255,255,255,.12)";
  ctx.stroke();

  const results = test.wordResults;

  if (!results.length) {
    ctx.fillStyle = "#9ba4b5";
    ctx.font = "14px Arial";
    ctx.fillText(
      "Type some words to see your performance.",
      30,
      50
    );
    return;
  }

  const usableWidth = width - 60;
  const step =
    results.length === 1
      ? 0
      : usableWidth / (results.length - 1);

  results.forEach((result, index) => {
    const x =
      results.length === 1
        ? width / 2
        : 30 + index * step;

    let y;

    if (result === "correct") {
      y = height - 100;
    } else if (result === "wrong") {
      y = height - 175;
    } else {
      y = height - 135;
    }

    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);

    if (result === "correct") {
      ctx.fillStyle = "#22c55e";
    } else if (result === "wrong") {
      ctx.fillStyle = "#ef4444";
    } else {
      ctx.fillStyle = "#eab308";
    }

    ctx.fill();

    if (index > 0) {
      const previous = results[index - 1];

      let previousY =
        previous === "correct"
          ? height - 100
          : previous === "wrong"
          ? height - 175
          : height - 135;

      ctx.beginPath();
      ctx.moveTo(
        30 + (index - 1) * step,
        previousY
      );
      ctx.lineTo(x, y);

      ctx.strokeStyle =
        "rgba(255,255,255,.18)";

      ctx.stroke();
    }
  });
}

async function finishTest() {
  if (!test.started) return;

  const stats = calculateStats();

  clearInterval(test.timer);

  test.running = false;

  $("time").textContent = "0";

  test.wordResults = createWordResults();

  $("resultWpm").textContent = stats.wpm;
  $("resultAccuracy").textContent =
    stats.accuracy + "%";
  $("resultWords").textContent =
    stats.totalWords;
  $("resultErrors").textContent =
    stats.errors;

  $("correctWords").textContent =
    stats.correctWords;

  $("wrongWords").textContent =
    stats.wrongWords;

  $("testArea").classList.add("hidden");
  $("resultArea").classList.remove("hidden");

  setTimeout(drawGraph, 50);

  await saveResult(stats);
}

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

function addGoogleButton() {
  if ($("googleLoginBtn")) return;

  const button =
    document.createElement("button");

  button.id = "googleLoginBtn";
  button.type = "button";
  button.textContent = "Continue with Google";
  button.className = "google-login-btn";

  button.onclick = signInWithGoogle;

  const submitButton = $("submitAuth");

  if (
    submitButton &&
    submitButton.parentElement
  ) {
    submitButton.parentElement.insertBefore(
      button,
      submitButton
    );
  }
}

let loginMode = false;

$("switchAuth").onclick = () => {
  loginMode = !loginMode;

  $("authTitle").textContent =
    loginMode
      ? "Welcome back"
      : "Create your account";

  $("submitAuth").textContent =
    loginMode
      ? "Login"
      : "Sign up";

  $("displayName").classList.toggle(
    "hidden",
    loginMode
  );

  $("switchAuth").textContent =
    loginMode
      ? "Need an account? Sign up"
      : "Already have an account? Login";
};

$("submitAuth").onclick = async () => {
  const email =
    $("email").value.trim();

  const password =
    $("password").value;

  const name =
    $("displayName").value.trim();

  if (
    !email ||
    password.length < 6
  ) {
    $("authMessage").textContent =
      "Enter an email and a password with at least 6 characters.";
    return;
  }

  $("authMessage").textContent =
    "Please wait...";

  let result;

  if (loginMode) {
    result =
      await supabaseClient.auth.signInWithPassword({
        email,
        password
      });
  } else {
    result =
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

  if (result.error) {
    $("authMessage").textContent =
      result.error.message;
    return;
  }

  if (loginMode) {
    closeAuth();
    await refreshUser();
  } else {
    $("authMessage").textContent =
      "Account created. Check your email to confirm, then login.";
  }
};

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

$("closeAuth").onclick = closeAuth;

authModal.addEventListener(
  "click",
  (event) => {
    if (event.target === authModal) {
      closeAuth();
    }
  }
);

$("startTestBtn").onclick = () => {
  setupText();

  $("setupArea").classList.add("hidden");
  $("testArea").classList.remove("hidden");

  $("time").textContent =
    test.duration;

  $("typingInput").value = "";

  $("typingInput").focus();
};

$("typingInput").addEventListener(
  "input",
  updateLiveTyping
);

$("finishBtn").onclick = finishTest;

$("restartBtn").onclick = () => {
  resetTest();
};

$("tryAgainBtn").onclick = () => {
  resetTest();
};

$("language").onchange = () => {
  resetTest();
};

$("duration").onchange = () => {
  resetTest();
};

$("mode").onchange = () => {
  updateModeInfo();
  resetTest();
};

$("historyBtn").onclick = loadHistory;

$("themeBtn").onclick = () => {
  document.body.classList.toggle("light");
};

async function refreshUser() {
  const {
    data: { user }
  } = await supabaseClient.auth.getUser();

  if (user) {
    $("authBtn").textContent =
      "Logout";

    $("welcome").textContent =
      "Welcome, " +
      (
        user.user_metadata?.display_name ||
        "AbidType User"
      );

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

async function loadHistory() {
  const {
    data: { user }
  } = await supabaseClient.auth.getUser();

  if (!user) {
    openAuth();
    return;
  }

  const {
    data,
    error
  } = await supabaseClient
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
    console.error(error);
    return;
  }

  if (!data || !data.length) {
    box.textContent =
      "No typing results yet.";
    return;
  }

  box.innerHTML = data
    .map(
      (item) => `
        <div class="history-row">
          <span>
            ${
              item.language_code === "bn"
                ? "বাংলা"
                : "English"
            }
          </span>

          <b>${item.wpm} WPM</b>

          <b>${item.accuracy}%</b>

          <span>
            ${new Date(
              item.created_at
            ).toLocaleDateString()}
          </span>
        </div>
      `
    )
    .join("");
}

supabaseClient.auth.onAuthStateChange(
  async (event, session) => {
    if (session?.user) {
      await refreshUser();
    }
  }
);

window.addEventListener(
  "resize",
  () => {
    if (
      !$("resultArea").classList.contains(
        "hidden"
      )
    ) {
      drawGraph();
    }
  }
);

addGoogleButton();
updateModeInfo();
resetTest();
refreshUser();
