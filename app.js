const supabaseClient = window.supabase.createClient(
  window.ABIDTYPE_SUPABASE_URL,
  window.ABIDTYPE_SUPABASE_PUBLISHABLE_KEY
);

const $ = (id) => document.getElementById(id);


/* =====================================================
   LANGUAGE TEXT
   ===================================================== */

const passages = {

  en: "Typing is a skill that improves with regular practice. Focus on accuracy first and speed will follow naturally. Every day is a new opportunity to improve your typing speed, confidence, and consistency.",

  bn: "নিয়মিত অনুশীলন করলে টাইপিংয়ের গতি এবং নির্ভুলতা ধীরে ধীরে বাড়ে। প্রথমে নির্ভুলতার দিকে মনোযোগ দিন। প্রতিদিন একটু একটু করে অনুশীলন করলে আপনার আত্মবিশ্বাস এবং টাইপিং দক্ষতা আরও ভালো হবে।",

  hi: "नियमित अभ्यास से टाइपिंग की गति और सटीकता धीरे धीरे बेहतर होती है। पहले सटीकता पर ध्यान दें और फिर अपनी गति बढ़ाएं। हर दिन सीखने और बेहतर बनने का एक नया अवसर है।",

  ur: "باقاعدگی سے مشق کرنے سے ٹائپنگ کی رفتار اور درستگی بہتر ہوتی ہے۔ پہلے درستگی پر توجہ دیں اور پھر اپنی رفتار بڑھائیں۔ ہر دن بہتر سیکھنے کا ایک نیا موقع ہے۔",

  ar: "تتحسن سرعة الكتابة ودقتها مع التدريب المنتظم. ركز على الدقة أولاً ثم ستزداد السرعة بشكل طبيعي. كل يوم هو فرصة جديدة لتحسين مهاراتك وثقتك.",

  es: "Escribir es una habilidad que mejora con la práctica regular. Concéntrate primero en la precisión y la velocidad llegará de forma natural. Cada día es una nueva oportunidad para mejorar.",

  fr: "La frappe est une compétence qui s'améliore avec une pratique régulière. Concentrez-vous d'abord sur la précision et la vitesse viendra naturellement. Chaque jour est une nouvelle occasion de progresser.",

  de: "Tippen ist eine Fähigkeit, die sich durch regelmäßiges Üben verbessert. Konzentriere dich zuerst auf Genauigkeit und die Geschwindigkeit wird ganz natürlich folgen.",

  it: "La digitazione è un'abilità che migliora con la pratica regolare. Concentrati prima sulla precisione e la velocità arriverà naturalmente.",

  pt: "A digitação é uma habilidade que melhora com a prática regular. Concentre-se primeiro na precisão e a velocidade virá naturalmente.",

  ru: "Печать — это навык, который улучшается благодаря регулярной практике. Сначала сосредоточьтесь на точности, а скорость придет естественно.",

  zh: "打字是一项可以通过定期练习不断提高的技能。首先专注于准确性，然后速度会自然提高。每天都是提升打字能力的新机会。",

  ja: "タイピングは定期的な練習によって上達するスキルです。まず正確さを意識しましょう。毎日少しずつ練習することで速度と自信を高めることができます。",

  ko: "타이핑은 꾸준한 연습을 통해 향상되는 기술입니다. 먼저 정확성에 집중하면 속도는 자연스럽게 따라옵니다.",

  tr: "Yazma becerisi düzenli pratik ile gelişir. Önce doğruluğa odaklanın ve hızınız doğal olarak artacaktır.",

  id: "Mengetik adalah keterampilan yang meningkat dengan latihan rutin. Fokuslah pada ketepatan terlebih dahulu dan kecepatan akan mengikuti secara alami.",

  ms: "Kemahiran menaip akan bertambah baik dengan latihan yang konsisten. Fokus pada ketepatan terlebih dahulu dan kelajuan akan meningkat secara semula jadi.",

  vi: "Gõ bàn phím là một kỹ năng được cải thiện thông qua việc luyện tập thường xuyên. Hãy tập trung vào độ chính xác trước và tốc độ sẽ tự nhiên tăng lên.",

  th: "การพิมพ์เป็นทักษะที่สามารถพัฒนาได้ด้วยการฝึกฝนอย่างสม่ำเสมอ ควรให้ความสำคัญกับความถูกต้องก่อน แล้วความเร็วจะเพิ่มขึ้นตามธรรมชาติ",

  nl: "Typen is een vaardigheid die beter wordt door regelmatig te oefenen. Richt je eerst op nauwkeurigheid en snelheid zal vanzelf volgen."
};


/* =====================================================
   TEST STATE
   ===================================================== */

let test = {

  started: false,
  running: false,

  start: 0,

  timer: null,

  duration: 60,

  text: "",

  input: "",

  errors: 0,

  typed: 0,

  wordResults: []

};


/* =====================================================
   KEYBOARD SOUND
   ===================================================== */

let audioContext = null;

function playTypingSound() {

  try {

    if (!audioContext) {

      audioContext =
        new (
          window.AudioContext ||
          window.webkitAudioContext
        )();

    }

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    const oscillator =
      audioContext.createOscillator();

    const gain =
      audioContext.createGain();

    oscillator.type = "sine";

    oscillator.frequency.value =
      420 + Math.random() * 100;

    gain.gain.setValueAtTime(
      0.035,
      audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.045
    );

    oscillator.connect(gain);

    gain.connect(
      audioContext.destination
    );

    oscillator.start();

    oscillator.stop(
      audioContext.currentTime + 0.05
    );

  } catch (error) {
    console.log("Keyboard sound unavailable");
  }
}


/* =====================================================
   GET DURATION
   ===================================================== */

function getSelectedDuration() {

  const value =
    $("duration").value;

  if (value === "custom") {

    let custom =
      Number(
        $("customTime").value
      );

    if (!custom || custom < 10) {
      custom = 60;
    }

    return Math.min(
      custom,
      3600
    );
  }

  return Number(value);
}


/* =====================================================
   DURATION UI
   ===================================================== */

function updateDurationUI() {

  const wrap =
    $("customTimeWrap");

  if (!wrap) return;

  if (
    $("duration").value === "custom"
  ) {

    wrap.classList.remove(
      "hidden"
    );

  } else {

    wrap.classList.add(
      "hidden"
    );

  }
}


/* =====================================================
   BUILD PASSAGE
   ===================================================== */

function buildText() {

  const language =
    $("language").value;

  const mode =
    $("mode").value;

  let text =
    passages[language] ||
    passages.en;


  /* CAPITAL */

  if (mode === "capital") {

    text =
      text.toUpperCase();

  }


  /* SMALL */

  if (mode === "small") {

    text =
      text
        .replace(
          /[.,!?;:'"()[\]{}\-—–]/g,
          ""
        )
        .toLowerCase()
        .replace(
          /\s+/g,
          " "
        )
        .trim();

  }


  /* PUNCTUATION */

  if (
    mode === "punctuation"
  ) {

    const punctuationTexts = {

      en: "Typing well requires practice. Stay focused, keep your fingers relaxed, and remember: accuracy comes first! Can you improve your speed today?",

      bn: "নিয়মিত অনুশীলন করুন। প্রথমে নির্ভুলতা ঠিক রাখুন, তারপর গতি বাড়ান! আপনি কি আজ আপনার টাইপিং আরও ভালো করতে পারবেন?",

      es: "Practica con atención, mantén los dedos relajados y recuerda: ¡la precisión es lo primero!",

      fr: "Entraînez-vous régulièrement, gardez les doigts détendus et souvenez-vous : la précision passe avant la vitesse!",

      de: "Übe regelmäßig, halte deine Finger entspannt und denke daran: Genauigkeit kommt zuerst!",

      hi: "नियमित अभ्यास करें, अपनी उंगलियों को आराम दें और याद रखें: सटीकता सबसे पहले आती है!",

      ar: "تدرب بانتظام، حافظ على استرخاء أصابعك وتذكر: الدقة تأتي أولاً!"
    };

    text =
      punctuationTexts[language] ||
      text;
  }


  return text;
}


/* =====================================================
   CREATE UNLIMITED TEXT
   ===================================================== */

function createUnlimitedText() {

  const base =
    buildText();

  let result = "";

  /*
    অনেকবার একই passage যোগ করা হচ্ছে।
    তাই timer শেষ হওয়ার আগে text শেষ হবে না।
  */

  for (
    let i = 0;
    i < 80;
    i++
  ) {

    result +=
      base + " ";

  }

  return result.trim();
}


/* =====================================================
   TEXT DISPLAY
   ===================================================== */

function setupText() {

  test.text =
    createUnlimitedText();

  const display =
    $("textDisplay");

  display.innerHTML = "";

  const fragment =
    document.createDocumentFragment();

  [...test.text].forEach(
    (char, index) => {

      const span =
        document.createElement(
          "span"
        );

      span.dataset.i =
        index;

      span.textContent =
        char === " "
          ? "\u00A0"
          : char;

      fragment.appendChild(
        span
      );

    }
  );

  display.appendChild(
    fragment
  );

  updateTypingDisplay();
}


/* =====================================================
   MODE INFO
   ===================================================== */

function updateModeInfo() {

  const mode =
    $("mode").value;

  const messages = {

    normal:
      "Normal typing practice.",

    punctuation:
      "Practice typing with punctuation marks.",

    capital:
      "Practice typing CAPITAL letters.",

    small:
      "Practice lowercase letters without punctuation."
  };

  $("modeInfo").textContent =
    messages[mode] ||
    messages.normal;
}


/* =====================================================
   RESET TEST
   ===================================================== */

function resetTest() {

  clearInterval(
    test.timer
  );

  test.started =
    false;

  test.running =
    false;

  test.start =
    0;

  test.errors =
    0;

  test.typed =
    0;

  test.wordResults =
    [];

  test.input =
    "";

  test.duration =
    getSelectedDuration();


  $("setupArea")
    .classList
    .remove("hidden");

  $("testArea")
    .classList
    .add("hidden");

  $("resultArea")
    .classList
    .add("hidden");


  $("time").textContent =
    test.duration;


  $("typingInput").value =
    "";


  setupText();

  updateModeInfo();
}


/* =====================================================
   START TEST
   ===================================================== */

function startTest() {

  if (
    test.started
  ) return;

  test.started =
    true;

  test.running =
    true;

  test.start =
    Date.now();


  $("typingInput").focus();


  clearInterval(
    test.timer
  );


  test.timer =
    setInterval(
      () => {

        const elapsed =
          Math.floor(
            (
              Date.now() -
              test.start
            ) / 1000
          );


        const left =
          Math.max(
            0,
            test.duration -
              elapsed
          );


        $("time")
          .textContent =
          left;


        if (
          left <= 0
        ) {

          finishTest();

        }

      },
      200
    );
}


/* =====================================================
   TYPING DISPLAY
   ===================================================== */

function updateTypingDisplay() {

  const input =
    $("typingInput").value;

  const spans =
    [
      ...$("textDisplay")
        .children
    ];


  spans.forEach(
    (span, index) => {

      span.className =
        "";


      if (
        index < input.length
      ) {

        span.classList.add(

          input[index] ===
            test.text[index]

            ? "correct"

            : "wrong"

        );

      }


      if (
        index ===
        input.length
      ) {

        span.classList.add(
          "current"
        );

        /*
          Current character
          screen-এর মাঝামাঝি
          রাখার চেষ্টা।
        */

        span.scrollIntoView({
          behavior: "auto",
          block: "center",
          inline: "nearest"
        });

      }

    }
  );
}


/* =====================================================
   LIVE TYPING
   ===================================================== */

function updateLiveTyping() {

  if (
    !test.started
  ) {

    startTest();

  }


  playTypingSound();


  updateTypingDisplay();

}


/* =====================================================
   CALCULATE STATS
   ===================================================== */

function calculateStats() {

  const input =
    $("typingInput").value;

  const target =
    test.text;


  let errors =
    0;

  let correctChars =
    0;


  [...input].forEach(
    (char, index) => {

      if (
        char ===
        target[index]
      ) {

        correctChars++;

      } else {

        errors++;

      }

    }
  );


  const elapsedSeconds =
    test.start

      ? Math.max(
          1,
          (
            Date.now() -
            test.start
          ) / 1000
        )

      : 1;


  const minutes =
    elapsedSeconds /
    60;


  const wpm =
    Math.max(
      0,
      Math.round(
        (
          correctChars /
          5
        ) /
        minutes
      )
    );


  const accuracy =
    input.length > 0

      ? Math.max(
          0,
          Math.round(
            (
              correctChars /
              input.length
            ) *
            100
          )
        )

      : 100;


  const typedWords =
    input.trim()
      ? input
          .trim()
          .split(/\s+/)
      : [];


  const targetWords =
    target.trim()
      ? target
          .trim()
          .split(/\s+/)
      : [];


  let correctWords =
    0;


  typedWords.forEach(
    (word, index) => {

      if (
        word ===
        targetWords[index]
      ) {

        correctWords++;

      }

    }
  );


  const totalWords =
    typedWords.length;


  const wrongWords =
    Math.max(
      0,
      totalWords -
        correctWords
    );


  test.errors =
    errors;

  test.typed =
    input.length;


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


/* =====================================================
   WORD RESULTS
   ===================================================== */

function createWordResults() {

  const inputWords =
    $("typingInput")
      .value
      .trim()
      .split(/\s+/)
      .filter(Boolean);


  const targetWords =
    test.text
      .trim()
      .split(/\s+/)
      .filter(Boolean);


  return inputWords.map(
    (word, index) => {

      return (
        word ===
        targetWords[index]
      )
        ? "correct"
        : "wrong";

    }
  );
}


/* =====================================================
   FINISH TEST
   ===================================================== */

async function finishTest() {

  if (
    !test.started
  ) return;


  const stats =
    calculateStats();


  clearInterval(
    test.timer
  );


  test.running =
    false;


  $("time")
    .textContent =
    "0";


  test.wordResults =
    createWordResults();


  $("resultWpm")
    .textContent =
    stats.wpm;


  $("resultAccuracy")
    .textContent =
    stats.accuracy +
    "%";


  $("resultWords")
    .textContent =
    stats.totalWords;


  $("resultErrors")
    .textContent =
    stats.errors;


  $("correctWords")
    .textContent =
    stats.correctWords;


  $("wrongWords")
    .textContent =
    stats.wrongWords;


  $("testArea")
    .classList
    .add("hidden");


  $("resultArea")
    .classList
    .remove("hidden");


  setTimeout(
    drawGraph,
    50
  );


  await saveResult(
    stats
  );
}


/* =====================================================
   GRAPH
   ===================================================== */

function drawGraph() {

  const canvas =
    $("performanceChart");

  if (!canvas) return;


  const ctx =
    canvas.getContext(
      "2d"
    );


  const width =
    canvas.clientWidth ||
    800;

  const height =
    260;


  const ratio =
    window.devicePixelRatio ||
    1;


  canvas.width =
    width * ratio;

  canvas.height =
    height * ratio;


  canvas.style.height =
    height + "px";


  ctx.setTransform(
    ratio,
    0,
    0,
    ratio,
    0,
    0
  );


  ctx.clearRect(
    0,
    0,
    width,
    height
  );


  const results =
    test.wordResults;


  if (
    !results.length
  ) {

    ctx.fillStyle =
      "#9ba4b5";

    ctx.font =
      "14px Arial";

    ctx.fillText(
      "Type some words to see your performance.",
      30,
      50
    );

    return;

  }


  const usableWidth =
    width - 60;


  const step =
    results.length === 1

      ? 0

      : usableWidth /
        (
          results.length -
          1
        );


  results.forEach(
    (result, index) => {

      const x =
        results.length === 1

          ? width / 2

          : 30 +
            index *
              step;


      const y =
        result ===
        "correct"

          ? height - 100

          : height - 175;


      ctx.beginPath();

      ctx.arc(
        x,
        y,
        5,
        0,
        Math.PI * 2
      );


      ctx.fillStyle =
        result ===
        "correct"

          ? "#22c55e"

          : "#ef4444";


      ctx.fill();


      if (
        index > 0
      ) {

        const previous =
          results[
            index - 1
          ];


        const previousY =
          previous ===
          "correct"

            ? height - 100

            : height - 175;


        ctx.beginPath();


        ctx.moveTo(
          30 +
            (
              index - 1
            ) *
              step,
          previousY
        );


        ctx.lineTo(
          x,
          y
        );


        ctx.strokeStyle =
          "rgba(255,255,255,.18)";


        ctx.stroke();

      }

    }
  );
}


/* =====================================================
   SAVE RESULT
   ===================================================== */

async function saveResult(
  stats
) {

  try {

    const {
      data: { user }
    } =
      await supabaseClient
        .auth
        .getUser();


    if (!user)
      return;


    await supabaseClient
      .from(
        "typing_results"
      )
      .insert({

        user_id:
          user.id,

        language_code:
          $("language").value,

        duration_seconds:
          test.duration,

        wpm:
          stats.wpm,

        accuracy:
          stats.accuracy,

        errors:
          stats.errors,

        characters_typed:
          test.typed

      });


  } catch (
    error
  ) {

    console.error(
      "Save result error:",
      error
    );

  }
}


/* =====================================================
   AUTH
   ===================================================== */

const authModal =
  $("authModal");


function openAuth() {

  authModal
    .classList
    .remove("hidden");

  $("authMessage")
    .textContent =
    "";
}


function closeAuth() {

  authModal
    .classList
    .add("hidden");

}


async function signInWithGoogle() {

  $("authMessage")
    .textContent =
    "Opening Google sign in...";


  const { error } =
    await supabaseClient
      .auth
      .signInWithOAuth({

        provider:
          "google",

        options: {

          redirectTo:
            window.location.origin +
            window.location.pathname

        }

      });


  if (error) {

    $("authMessage")
      .textContent =
      error.message;

  }

}


/* =====================================================
   GOOGLE BUTTON
   ===================================================== */

function addGoogleButton() {

  if (
    $("googleLoginBtn")
  )
    return;


  const button =
    document.createElement(
      "button"
    );


  button.id =
    "googleLoginBtn";


  button.type =
    "button";


  button.textContent =
    "Continue with Google";


  button.className =
    "google-login-btn";


  button.onclick =
    signInWithGoogle;


  const submitButton =
    $("submitAuth");


  if (
    submitButton &&
    submitButton.parentElement
  ) {

    submitButton
      .parentElement
      .insertBefore(
        button,
        submitButton
      );

  }

}


/* =====================================================
   LOGIN / SIGNUP
   ===================================================== */

let loginMode =
  false;


$("switchAuth")
  .onclick =
  () => {

    loginMode =
      !loginMode;


    $("authTitle")
      .textContent =
      loginMode

        ? "Welcome back"

        : "Create your account";


    $("submitAuth")
      .textContent =
      loginMode

        ? "Login"

        : "Sign up";


    $("displayName")
      .classList
      .toggle(
        "hidden",
        loginMode
      );


    $("switchAuth")
      .textContent =
      loginMode

        ? "Need an account? Sign up"

        : "Already have an account? Login";

  };


$("submitAuth")
  .onclick =
  async () => {

    const email =
      $("email")
        .value
        .trim();


    const password =
      $("password")
        .value;


    const name =
      $("displayName")
        .value
        .trim();


    if (
      !email ||
      password.length < 6
    ) {

      $("authMessage")
        .textContent =
        "Enter an email and a password with at least 6 characters.";

      return;

    }


    $("authMessage")
      .textContent =
      "Please wait...";


    let result;


    if (
      loginMode
    ) {

      result =
        await supabaseClient
          .auth
          .signInWithPassword({

            email,

            password

          });

    } else {

      result =
        await supabaseClient
          .auth
          .signUp({

            email,

            password,

            options: {

              data: {

                display_name:
                  name ||
                  "AbidType User"

              }

            }

          });

    }


    if (
      result.error
    ) {

      $("authMessage")
        .textContent =
        result.error.message;

      return;

    }


    if (
      loginMode
    ) {

      closeAuth();

      await refreshUser();

    } else {

      $("authMessage")
        .textContent =
        "Account created. Check your email to confirm, then login.";

    }

  };


/* =====================================================
   AUTH BUTTON
   ===================================================== */

$("authBtn")
  .addEventListener(
    "click",
    async () => {

      const {
        data: { user }
      } =
        await supabaseClient
          .auth
          .getUser();


      if (user) {

        await supabaseClient
          .auth
          .signOut();


        await refreshUser();


        $("history")
          .classList
          .add("hidden");

      } else {

        openAuth();

      }

    }
  );


$("closeAuth")
  .onclick =
  closeAuth;


authModal
  .addEventListener(
    "click",
    (event) => {

      if (
        event.target ===
        authModal
      ) {

        closeAuth();

      }

    }
  );


/* =====================================================
   START BUTTON
   ===================================================== */

$("startTestBtn")
  .onclick =
  () => {

    setupText();


    test.duration =
      getSelectedDuration();


    $("setupArea")
      .classList
      .add("hidden");


    $("testArea")
      .classList
      .remove("hidden");


    $("time")
      .textContent =
      test.duration;


    $("typingInput")
      .value =
      "";


    /*
      এখানে textarea-কে
      typing display-এর
      ভিতরের typing area হিসেবে
      focus করা হচ্ছে।
    */

    $("typingInput")
      .focus();

  };


/* =====================================================
   TYPING INPUT
   ===================================================== */

$("typingInput")
  .addEventListener(
    "input",
    updateLiveTyping
  );


/* =====================================================
   FINISH / RESTART
   ===================================================== */

$("finishBtn")
  .onclick =
  finishTest;


$("restartBtn")
  .onclick =
  () => {

    resetTest();

  };


$("tryAgainBtn")
  .onclick =
  () => {

    resetTest();

  };


/* =====================================================
   CONTROLS
   ===================================================== */

$("language")
  .onchange =
  () => {

    resetTest();

  };


$("duration")
  .onchange =
  () => {

    updateDurationUI();

    resetTest();

  };


$("customTime")
  .oninput =
  () => {

    if (
      $("duration").value ===
      "custom"
    ) {

      test.duration =
        getSelectedDuration();

      $("time")
        .textContent =
        test.duration;

    }

  };


$("mode")
  .onchange =
  () => {

    updateModeInfo();

    resetTest();

  };


$("historyBtn")
  .onclick =
  loadHistory;


/* =====================================================
   THEME
   ===================================================== */

$("themeBtn")
  .onclick =
  () => {

    document.body
      .classList
      .toggle("light");

  };


/* =====================================================
   USER
   ===================================================== */

async function refreshUser() {

  const {
    data: { user }
  } =
    await supabaseClient
      .auth
      .getUser();


  if (user) {

    $("authBtn")
      .textContent =
      "Logout";


    $("welcome")
      .textContent =
      "Welcome, " +
      (
        user.user_metadata
          ?.display_name ||
        "AbidType User"
      );


    $("accountNote")
      .textContent =
      user.email;

  } else {

    $("authBtn")
      .textContent =
      "Login / Sign up";


    $("welcome")
      .textContent =
      "Practice as a guest";


    $("accountNote")
      .textContent =
      "Create an account to save your typing results and build your personal record.";

  }

}


/* =====================================================
   HISTORY
   ===================================================== */

async function loadHistory() {

  const {
    data: { user }
  } =
    await supabaseClient
      .auth
      .getUser();


  if (!user) {

    openAuth();

    return;

  }


  const {
    data,
    error
  } =
    await supabaseClient
      .from(
        "typing_results"
      )
      .select(
        "language_code,duration_seconds,wpm,accuracy,created_at"
      )
      .order(
        "created_at",
        {
          ascending:
            false
        }
      )
      .limit(10);


  const box =
    $("history");


  box.classList
    .remove("hidden");


  if (error) {

    box.textContent =
      "Could not load history yet.";

    console.error(
      error
    );

    return;

  }


  if (
    !data ||
    !data.length
  ) {

    box.textContent =
      "No typing results yet.";

    return;

  }


  box.innerHTML =
    data
      .map(
        (item) => `

          <div class="history-row">

            <span>
              ${item.language_code.toUpperCase()}
            </span>

            <b>
              ${item.wpm} WPM
            </b>

            <b>
              ${item.accuracy}%
            </b>

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


/* =====================================================
   AUTH STATE
   ===================================================== */

supabaseClient
  .auth
  .onAuthStateChange(
    async (
      event,
      session
    ) => {

      if (
        session?.user
      ) {

        await refreshUser();

      }

    }
  );


/* =====================================================
   GRAPH RESIZE
   ===================================================== */

window.addEventListener(
  "resize",
  () => {

    if (
      !$("resultArea")
        .classList
        .contains("hidden")
    ) {

      drawGraph();

    }

  }
);


/* =====================================================
   INIT
   ===================================================== */

addGoogleButton();

updateModeInfo();

updateDurationUI();

resetTest();

refreshUser();
