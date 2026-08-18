const supabaseClient = window.supabase.createClient(
  window.ABIDTYPE_SUPABASE_URL,
  window.ABIDTYPE_SUPABASE_PUBLISHABLE_KEY
);

const SITE_URL = "https://abidhossainbro2007-cyber.github.io/AbidType/";

const passages = {
  en: "Typing is a skill that improves with regular practice. Focus on accuracy first and speed will follow naturally. Every day is a new opportunity to improve your typing speed, confidence, and consistency.",
  bn: "নিয়মিত অনুশীলন করলে টাইপিংয়ের গতি এবং নির্ভুলতা ধীরে ধীরে বাড়ে। প্রথমে নির্ভুলতার দিকে মনোযোগ দিন। প্রতিদিন একটু একটু করে অনুশীলন করলে আপনার আত্মবিশ্বাস এবং টাইপিং দক্ষতা আরও ভালো হবে।"
};

let test = {
  running: false,
  finished: false,
  start: 0,
  timer: null,
  duration: 60,
  text: "",
  errors: 0,
  typed: 0
};

const $ = id => document.getElementById(id);

const authModal = $("authModal");

function setupText() {
  test.text = passages[$("language").value] || passages.en;

  $("textDisplay").innerHTML = [...test.text]
    .map((c, i) =>
      `<span data-i="${i}">${c === " " ? "&nbsp;" : c}</span>`
    )
    .join("");
}

function reset() {
  clearInterval(test.timer);

  test.running = false;
  test.finished = false;
  test.start = 0;
  test.errors = 0;
  test.typed = 0;
  test.duration = Number($("duration").value);

  $("time").textContent = test.duration;
  $("wpm").textContent = "0";
  $("accuracy").textContent = "100%";
  $("errors").textContent = "0";
  $("typingInput").value = "";
  $("typingInput").disabled = false;

  $("result").classList.add("hidden");
  $("result").textContent = "";

  setupText();
}

function updateStats() {
  if (!test.start) {
    return { wpm: 0, accuracy: 100, errors: 0 };
  }

  const input = $("typingInput").value;
  const chars = [...input];
  const target = [...test.text];

  let errors = 0;

  chars.forEach((char, i) => {
    if (char !== target[i]) errors++;
  });

  test.errors = errors;
  test.typed = chars.length;

  const elapsed = Math.max(
    1,
    (Date.now() - test.start) / 1000
  );

  const minutes = elapsed / 60;

  // Correct WPM: only typed characters are counted.
  const wpm = Math.max(
    0,
    Math.round((chars.length / 5) / minutes)
  );

  const accuracy = chars.length
    ? Math.max(
        0,
        Math.round(((chars.length - errors) / chars.length) * 100)
      )
    : 100;

  $("wpm").textContent = wpm;
  $("accuracy").textContent = accuracy + "%";
  $("errors").textContent = errors;

  [...$("textDisplay").children].forEach((span, i) => {
    if (i < chars.length) {
      span.className =
        chars[i] === target[i] ? "correct" : "wrong";
    } else if (i === chars.length) {
      span.className = "current";
    } else {
      span.className = "";
    }
  });

  return { wpm, accuracy, errors };
}

async function finish() {
  if (test.finished || !test.start) return;

  test.finished = true;
  test.running = false;

  clearInterval(test.timer);

  const stats = updateStats();

  $("time").textContent = "0";
  $("typingInput").disabled = true;

  $("result").classList.remove("hidden");
  $("result").textContent =
    `Test finished — ${stats.wpm} WPM · ${stats.accuracy}% accuracy · ${stats.errors} errors`;

  await saveResult(stats);
}

function start() {
  if (test.running || test.finished) return;

  test.running = true;
  test.start = Date.now();

  test.timer = setInterval(() => {
    if (test.finished) {
      clearInterval(test.timer);
      return;
    }

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

async function saveResult(stats) {
  try {
    const { data, error } =
      await supabaseClient.auth.getUser();

    if (error || !data?.user) return;

    const { error: insertError } =
      await supabaseClient
        .from("typing_results")
        .insert({
          user_id: data.user.id,
          language_code: $("language").value,
          duration_seconds: test.duration,
          wpm: stats.wpm,
          accuracy: stats.accuracy,
          errors: stats.errors,
          characters_typed: test.typed
        });

    if (insertError) {
      console.error("History save error:", insertError);
    }
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
        redirectTo: SITE_URL
      }
    });

  if (error) {
    $("authMessage").textContent = error.message;
  }
}

const googleBtn = document.createElement("button");

googleBtn.type = "button";
googleBtn.textContent = "Continue with Google";
googleBtn.className = "google-login-btn";
googleBtn.onclick = signInWithGoogle;

const submitButton = $("submitAuth");

if (submitButton && submitButton.parentElement) {
  submitButton.parentElement.insertBefore(
    googleBtn,
    submitButton
  );
}

let loginMode = false;

$("switchAuth").onclick = () => {
  loginMode = !loginMode;

  $("authTitle").textContent =
    loginMode ? "Welcome back" : "Create your account";

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

  if (!email) {
    $("authMessage").textContent =
      "Please enter your email address.";
    return;
  }

  if (password.length < 6) {
    $("authMessage").textContent =
      "Password must contain at least 6 characters.";
    return;
  }

  $("authMessage").textContent =
    loginMode ? "Logging in..." : "Creating your account...";

  try {
    let res;

    if (loginMode) {
      res = await supabaseClient.auth.signInWithPassword({
        email,
        password
      });
    } else {
      res = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name:
              name || "AbidType User"
          },
          emailRedirectTo: SITE_URL
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
        "Account created. Check your email to confirm your account.";
    }

  } catch (error) {
    console.error(error);

    $("authMessage").textContent =
      "Something went wrong. Please try again.";
  }
};

$("typingInput").addEventListener("input", () => {
  if (test.finished) return;

  const input = $("typingInput").value;

  if (!input) return;

  start();

  // Prevent typing beyond the passage.
  if (input.length > test.text.length) {
    $("typingInput").value =
      input.slice(0, test.text.length);
  }

  updateStats();
});

$("finishBtn").onclick = finish;

$("restartBtn").onclick = reset;

$("language").onchange = reset;

$("duration").onchange = reset;

$("historyBtn").onclick = loadHistory;

$("themeBtn").onclick = () => {
  document.body.classList.toggle("light");
};

async function refreshUser() {
  try {
    const { data, error } =
      await supabaseClient.auth.getUser();

    if (error || !data?.user) {
      $("authBtn").textContent =
        "Login / Sign up";

      $("welcome").textContent =
        "Practice as a guest";

      $("accountNote").textContent =
        "Create an account to save your typing results and build your personal record.";

      return;
    }

    const user = data.user;

    $("authBtn").textContent = "Logout";

    $("welcome").textContent =
      "Welcome, " +
      (user.user_metadata?.display_name ||
        "AbidType User");

    $("accountNote").textContent =
      user.email || "";
  } catch (error) {
    console.error("User refresh error:", error);
  }
}

$("authBtn").addEventListener(
  "click",
  async () => {
    try {
      const { data } =
        await supabaseClient.auth.getUser();

      const user = data?.user;

      if (user) {
        await supabaseClient.auth.signOut();

        await refreshUser();

        $("history").classList.add("hidden");
      } else {
        openAuth();
      }
    } catch (error) {
      console.error(error);
      openAuth();
    }
  }
);

async function loadHistory() {
  try {
    const { data, error } =
      await supabaseClient.auth.getUser();

    const user = data?.user;

    if (error || !user) {
      openAuth();
      return;
    }

    const { data: results, error: historyError } =
      await supabaseClient
        .from("typing_results")
        .select(
          "language_code,duration_seconds,wpm,accuracy,created_at"
        )
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false
        })
        .limit(10);

    const box = $("history");

    box.classList.remove("hidden");

    if (historyError) {
      console.error(historyError);
      box.textContent =
        "Could not load history yet.";
      return;
    }

    box.innerHTML =
      results && results.length
        ? results
            .map(
              x =>
                `<div class="history-row">
                  <span>${
                    x.language_code === "bn"
                      ? "বাংলা"
                      : "English"
                  }</span>
                  <b>${x.wpm} WPM</b>
                  <b>${x.accuracy}%</b>
                  <span>${new Date(
                    x.created_at
                  ).toLocaleDateString()}</span>
                </div>`
            )
            .join("")
        : "No typing results yet.";

  } catch (error) {
    console.error("History error:", error);
    $("history").textContent =
      "Could not load history yet.";
  }
}

setupText();
reset();
refreshUser();

supabaseClient.auth.onAuthStateChange(
  async (_event, session) => {
    if (session?.user) {
      await refreshUser();
    } else {
      await refreshUser();
    }
  }
);
