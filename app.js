const supabaseClient = window.supabase.createClient(
  window.ABIDTYPE_SUPABASE_URL,
  window.ABIDTYPE_SUPABASE_PUBLISHABLE_KEY
);

const $ = (id) => document.getElementById(id);


/* =====================================================
   LANGUAGE PASSAGES
===================================================== */

const passages = {

  en: [
    "Typing is a skill that improves with regular practice. Focus on accuracy first and speed will follow naturally.",
    "Every day is a new opportunity to improve your typing speed, confidence, and consistency.",
    "Practice regularly, stay focused, and keep your fingers relaxed while typing."
  ],

  bn: [
    "নিয়মিত অনুশীলন করলে টাইপিংয়ের গতি এবং নির্ভুলতা ধীরে ধীরে বাড়ে। প্রথমে নির্ভুলতার দিকে মনোযোগ দিন।",
    "প্রতিদিন একটু একটু করে অনুশীলন করলে আপনার আত্মবিশ্বাস এবং টাইপিং দক্ষতা আরও ভালো হবে।",
    "নিয়মিত টাইপিং অনুশীলন করুন এবং ধীরে ধীরে আপনার গতি ও নির্ভুলতা বাড়ান।"
  ],

  hi: [
    "नियमित अभ्यास से टाइपिंग की गति और सटीकता धीरे धीरे बेहतर होती है। पहले सटीकता पर ध्यान दें।",
    "हर दिन सीखने और बेहतर बनने का एक नया अवसर है। नियमित अभ्यास आपकी गति बढ़ाता है।"
  ],

  ur: [
    "باقاعدگی سے مشق کرنے سے ٹائپنگ کی رفتار اور درستگی بہتر ہوتی ہے۔ پہلے درستگی پر توجہ دیں۔",
    "ہر دن بہتر سیکھنے اور اپنی ٹائپنگ کی رفتار بڑھانے کا ایک نیا موقع ہے۔"
  ],

  ar: [
    "تتحسن سرعة الكتابة ودقتها مع التدريب المنتظم. ركز على الدقة أولاً ثم ستزداد السرعة بشكل طبيعي.",
    "كل يوم هو فرصة جديدة لتحسين مهارات الكتابة وزيادة السرعة والثقة."
  ],

  es: [
    "Escribir es una habilidad que mejora con la práctica regular. Concéntrate primero en la precisión.",
    "Cada día es una nueva oportunidad para mejorar tu velocidad y confianza al escribir."
  ],

  fr: [
    "La frappe est une compétence qui s'améliore avec une pratique régulière. Concentrez-vous d'abord sur la précision.",
    "Chaque jour est une nouvelle occasion de progresser et d'améliorer votre vitesse."
  ],

  de: [
    "Tippen ist eine Fähigkeit, die sich durch regelmäßiges Üben verbessert. Konzentriere dich zuerst auf Genauigkeit.",
    "Jeder Tag bietet eine neue Möglichkeit, deine Geschwindigkeit und Genauigkeit zu verbessern."
  ],

  it: [
    "La digitazione è un'abilità che migliora con la pratica regolare. Concentrati prima sulla precisione.",
    "Ogni giorno è una nuova opportunità per migliorare la velocità e la sicurezza."
  ],

  pt: [
    "A digitação é uma habilidade que melhora com a prática regular. Concentre-se primeiro na precisão.",
    "Cada dia é uma nova oportunidade para melhorar sua velocidade e confiança."
  ],

  ru: [
    "Печать — это навык, который улучшается благодаря регулярной практике. Сначала сосредоточьтесь на точности.",
    "Каждый день дает новую возможность улучшить скорость и уверенность."
  ],

  zh: [
    "打字是一项可以通过规律练习不断提高的技能。首先要专注于准确性，然后速度会自然提高。",
    "每天都是提升打字能力和信心的新机会。"
  ],

  ja: [
    "タイピングは नियमितな練習によって上達するスキルです。まず正確さを意識しましょう。",
    "毎日少しずつ練習することで、速度と自信を高めることができます。"
  ],

  ko: [
    "타이핑은 꾸준한 연습을 통해 향상되는 기술입니다. 먼저 정확성에 집중하세요.",
    "매일 조금씩 연습하면 자신감과 타이핑 실력도 향상됩니다."
  ],

  tr: [
    "Yazma becerisi düzenli pratik ile gelişir. Önce doğruluğa odaklanın ve hızınız doğal olarak artacaktır.",
    "Her gün kendinizi geliştirmek için yeni bir fırsattır."
  ],

  id: [
    "Mengetik adalah keterampilan yang meningkat dengan latihan rutin. Fokuslah pada ketepatan terlebih dahulu.",
    "Setiap hari adalah kesempatan baru untuk meningkatkan kecepatan dan kemampuan mengetik."
  ],

  ms: [
    "Kemahiran menaip akan bertambah baik dengan latihan yang konsisten. Fokus pada ketepatan terlebih dahulu.",
    "Setiap hari ialah peluang baharu untuk menjadi lebih baik."
  ],

  vi: [
    "Gõ bàn phím là một kỹ năng được cải thiện thông qua việc luyện tập thường xuyên.",
    "Hãy tập trung vào độ chính xác trước và tốc độ sẽ tự nhiên tăng lên."
  ],

  th: [
    "การพิมพ์เป็นทักษะที่สามารถพัฒนาได้ด้วยการฝึกฝนอย่างสม่ำเสมอ",
    "ควรให้ความสำคัญกับความถูกต้องก่อน แล้วความเร็วจะเพิ่มขึ้นตามธรรมชาติ"
  ],

  nl: [
    "Typen is een vaardigheid die beter wordt door regelmatig te oefenen.",
    "Richt je eerst op nauwkeurigheid en snelheid zal vanzelf volgen."
  ],

  pl: [
    "Pisanie na klawiaturze to umiejętność, która poprawia się dzięki regularnym ćwiczeniom.",
    "Każdy dzień jest nową okazją do poprawy szybkości i dokładności."
  ],

  sv: [
    "Att skriva på tangentbordet är en färdighet som förbättras genom regelbunden träning.",
    "Varje dag är en ny möjlighet att förbättra din hastighet och noggrannhet."
  ],

  da: [
    "At skrive på tastaturet er en færdighed, der forbedres gennem regelmæssig øvelse.",
    "Hver dag er en ny mulighed for at blive bedre."
  ],

  no: [
    "Skriving er en ferdighet som blir bedre med regelmessig trening.",
    "Hver dag er en ny mulighet til å forbedre hastigheten og nøyaktigheten."
  ],

  fi: [
    "Kirjoittaminen on taito, joka kehittyy säännöllisellä harjoittelulla.",
    "Jokainen päivä tarjoaa uuden mahdollisuuden kehittyä."
  ],

  cs: [
    "Psaní na klávesnici je dovednost, která se zlepšuje pravidelným tréninkem.",
    "Každý den je nová příležitost ke zlepšení."
  ],

  uk: [
    "Друкування — це навичка, яка покращується завдяки регулярній практиці.",
    "Кожен день дає нову можливість стати кращим."
  ],

  ro: [
    "Tastarea este o abilitate care se îmbunătățește prin practică regulată.",
    "Fiecare zi este o nouă oportunitate de a deveni mai bun."
  ],

  el: [
    "Η πληκτρολόγηση είναι μια δεξιότητα που βελτιώνεται με τακτική εξάσκηση.",
    "Κάθε μέρα είναι μια νέα ευκαιρία για βελτίωση."
  ],

  he: [
    "הקלדה היא מיומנות שמשתפרת באמצעות תרגול קבוע.",
    "כל יום הוא הזדמנות חדשה לשפר את המהירות והדיוק."
  ],

  fa: [
    "تایپ کردن مهارتی است که با تمرین منظم بهتر می‌شود.",
    "هر روز فرصت جدیدی برای افزایش سرعت و دقت تایپ است."
  ]
};


/* =====================================================
   LANGUAGE NAMES
===================================================== */

const languageNames = {
  en: "English",
  bn: "বাংলা",
  hi: "हिन्दी",
  ur: "اردو",
  ar: "العربية",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  pt: "Português",
  ru: "Русский",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  tr: "Türkçe",
  id: "Bahasa Indonesia",
  ms: "Bahasa Melayu",
  vi: "Tiếng Việt",
  th: "ไทย",
  nl: "Nederlands",
  pl: "Polski",
  sv: "Svenska",
  da: "Dansk",
  no: "Norsk",
  fi: "Suomi",
  cs: "Čeština",
  uk: "Українська",
  ro: "Română",
  el: "Ελληνικά",
  he: "עברית",
  fa: "فارسی"
};


/* =====================================================
   TEST STATE
===================================================== */

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


/* =====================================================
   RANDOM PASSAGE
===================================================== */

function getRandomPassage(language) {

  const list =
    passages[language] ||
    passages.en;

  return list[
    Math.floor(
      Math.random() * list.length
    )
  ];
}


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

    if (
      audioContext.state ===
      "suspended"
    ) {

      audioContext.resume();

    }

    const oscillator =
      audioContext.createOscillator();

    const gain =
      audioContext.createGain();

    oscillator.type = "sine";

    oscillator.frequency.value =
      380 +
      Math.random() * 100;

    gain.gain.setValueAtTime(
      0.025,
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
      audioContext.currentTime +
      0.05
    );

  } catch (error) {

    console.log(
      "Keyboard sound unavailable"
    );

  }

}


/* =====================================================
   AUTH
===================================================== */

const authModal =
  $("authModal");


function openAuth() {

  authModal.classList.remove(
    "hidden"
  );

  $("authMessage").textContent =
    "";

}


function closeAuth() {

  authModal.classList.add(
    "hidden"
  );

}


/* =====================================================
   BUILD TEXT
===================================================== */

function buildText() {

  const language =
    $("language").value;

  const mode =
    $("mode").value;

  let text =
    getRandomPassage(
      language
    );


  /* CAPITAL MODE */

  if (
    mode === "capital"
  ) {

    text =
      text.toUpperCase();

  }


  /* SMALL MODE */

  if (
    mode === "small"
  ) {

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


  /* PUNCTUATION MODE */

  if (
    mode === "punctuation"
  ) {

    const punctuationTexts = {

      en:
        "Typing well requires practice. Stay focused, keep your fingers relaxed, and remember: accuracy comes first! Can you improve your speed today?",

      bn:
        "নিয়মিত অনুশীলন করুন। প্রথমে নির্ভুলতা ঠিক রাখুন, তারপর গতি বাড়ান! আপনি কি আজ আপনার টাইপিং আরও ভালো করতে পারবেন?",

      es:
        "Practica con atención, mantén los dedos relajados y recuerda: ¡la precisión es lo primero!",

      fr:
        "Entraînez-vous régulièrement, gardez les doigts détendus et souvenez-vous : la précision passe avant la vitesse!",

      de:
        "Übe regelmäßig, halte deine Finger entspannt und denke daran: Genauigkeit kommt zuerst!",

      hi:
        "नियमित अभ्यास करें, अपनी उंगलियों को आराम दें और याद रखें: सटीकता सबसे पहले आती है!",

      ar:
        "تدرب بانتظام، حافظ على استرخاء أصابعك وتذكر: الدقة تأتي أولاً!"
    };

    text =
      punctuationTexts[language] ||
      text;

  }


  return text;

}


/* =====================================================
   TEXT DISPLAY
===================================================== */

function setupText() {

  test.text =
    buildText();

  const display =
    $("textDisplay");

  display.innerHTML = "";

  [
    ...test.text
  ].forEach(
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

      display.appendChild(
        span
      );

    }
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
   DURATION
===================================================== */

function getSelectedDuration() {

  const value =
    $("duration").value;


  if (
    value === "custom"
  ) {

    let custom =
      Number(
        $("customTime").value
      );

    if (
      !custom ||
      custom < 10
    ) {

      custom = 60;

    }

    return Math.min(
      custom,
      3600
    );

  }


  return Number(value);

}


function updateDurationUI() {

  const customWrap =
    $("customTimeWrap");

  if (
    $("duration").value ===
    "custom"
  ) {

    customWrap.classList.remove(
      "hidden"
    );

  } else {

    customWrap.classList.add(
      "hidden"
    );

  }

}


/* =====================================================
   RESET
===================================================== */

function resetTest() {

  clearInterval(
    test.timer
  );

  test.running = false;
  test.started = false;
  test.start = 0;
  test.errors = 0;
  test.typed = 0;
  test.wordResults = [];

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

        $("time").textContent =
          left;

        if (
          left <= 0
        ) {

          finishTest();

        }

      },
      250
    );

}


/* =====================================================
   STATS
===================================================== */

function calculateStats() {

  const input =
    $("typingInput").value;

  const target =
    test.text;

  let errors = 0;

  let correctChars = 0;


  [
    ...input
  ].forEach(
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
    elapsedSeconds / 60;


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
            ) * 100
          )
        )
      : 100;


  const totalWords =
    input.trim()
      ? input
          .trim()
          .split(/\s+/)
          .length
      : 0;


  const targetWords =
    target.trim()
      ? target
          .trim()
          .split(/\s+/)
      : [];


  const typedWords =
    input.trim()
      ? input
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
        index <
        input.length
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

      }

    }
  );


  /* Keep current character visible */

  const current =
    spans[input.length];

  if (
    current
  ) {

    current.scrollIntoView({
      behavior: "auto",
      block: "nearest",
      inline: "nearest"
    });

  }

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


  const results =
    [];


  inputWords.forEach(
    (word, index) => {

      const target =
        targetWords[index] ||
        "";

      results.push(
        word === target
          ? "correct"
          : "wrong"
      );

    }
  );


  return results;

}


/* =====================================================
   GRAPH
===================================================== */

function drawGraph() {

  const canvas =
    $("performanceChart");

  if (!canvas)
    return;


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
          results.length - 1
        );


  results.forEach(
    (result, index) => {

      const x =
        results.length === 1
          ? width / 2
          : 30 +
            index * step;


      const y =
        result === "correct"
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
        result === "correct"
          ? "#22c55e"
          : "#ef4444";

      ctx.fill();


      if (
        index > 0
      ) {

        const previous =
          results[index - 1];


        const previousY =
          previous === "correct"
            ? height - 100
            : height - 175;


        ctx.beginPath();

        ctx.moveTo(
          30 +
          (index - 1) *
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
   FINISH TEST
===================================================== */

async function finishTest() {

  if (
    !test.started
  )
    return;


  const stats =
    calculateStats();


  clearInterval(
    test.timer
  );


  test.running =
    false;


  $("time").textContent =
    "0";


  test.wordResults =
    createWordResults();


  $("resultWpm")
    .textContent =
    stats.wpm;


  $("resultAccuracy")
    .textContent =
    stats.accuracy + "%";


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


  } catch (error) {

    console.error(
      "Save result error:",
      error
    );

  }

}


/* =====================================================
   GOOGLE LOGIN
===================================================== */

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

    submitButton.parentElement
      .insertBefore(
        button,
        submitButton
      );

  }

}


/* =====================================================
   LOGIN / SIGN UP
===================================================== */

let loginMode =
  false;


$("switchAuth").onclick =
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


$("submitAuth").onclick =
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


authModal.addEventListener(
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


    $("typingInput")
      .focus();

  };


/* =====================================================
   INPUT
===================================================== */

$("typingInput")
  .addEventListener(
    "input",
    updateLiveTyping
  );


/* =====================================================
   BUTTONS
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


  box.classList.remove(
    "hidden"
  );


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
              ${
                languageNames[
                  item.language_code
                ] ||
                item.language_code
              }
            </span>

            <b>
              ${item.wpm} WPM
            </b>

            <b>
              ${item.accuracy}%
            </b>

            <span>
              ${
                new Date(
                  item.created_at
                ).toLocaleDateString()
              }
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
   RESIZE
===================================================== */

window.addEventListener(
  "resize",
  () => {

    if (
      !$("resultArea")
        .classList
        .contains(
          "hidden"
        )
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
