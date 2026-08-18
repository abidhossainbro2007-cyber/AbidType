```javascript
/* =====================================================
   ABIDTYPE — MAIN APP
   Clean typing engine
===================================================== */

const supabaseClient = window.supabase.createClient(
  window.ABIDTYPE_SUPABASE_URL,
  window.ABIDTYPE_SUPABASE_PUBLISHABLE_KEY
);

const $ = (id) => document.getElementById(id);


/* =====================================================
   PASSAGES
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

  nl: "Typen is een vaardigheid die beter wordt door regelmatig te oefenen. Richt je eerst op nauwkeurigheid en snelheid zal vanzelf volgen.",

  pl: "Regularne ćwiczenie pisania pomaga poprawić szybkość i dokładność. Najpierw skup się na poprawnym pisaniu, a następnie stopniowo zwiększaj prędkość.",

  uk: "Регулярна практика друку допомагає покращити швидкість і точність. Спочатку зосередьтеся на правильності, а потім поступово збільшуйте швидкість.",

  cs: "Pravidelné procvičování psaní pomáhá zlepšit rychlost a přesnost. Nejprve se zaměřte na správnost a potom postupně zvyšujte rychlost.",

  sk: "Pravidelné precvičovanie písania pomáha zlepšiť rýchlosť a presnosť. Najprv sa sústreďte na správnosť a potom postupne zvyšujte rýchlosť.",

  ro: "Exersarea regulată a tastării ajută la îmbunătățirea vitezei și preciziei. Concentrează-te mai întâi pe corectitudine și apoi crește treptat viteza.",

  hu: "A rendszeres gépelési gyakorlás javítja a sebességet és a pontosságot. Először a helyes gépelésre figyelj, majd fokozatosan növeld a sebességedet.",

  el: "Η τακτική εξάσκηση στην πληκτρολόγηση βελτιώνει την ταχύτητα και την ακρίβεια. Εστίασε πρώτα στη σωστή πληκτρολόγηση και μετά αύξησε σταδιακά την ταχύτητά σου.",

  he: "תרגול הקלדה קבוע עוזר לשפר את המהירות והדיוק. התמקדו קודם בהקלדה נכונה ולאחר מכן הגדילו בהדרגה את המהירות.",

  fa: "تمرین منظم تایپ کردن باعث افزایش سرعت و دقت می‌شود. ابتدا روی درست تایپ کردن تمرکز کنید و سپس به تدریج سرعت خود را افزایش دهید.",

  ta: "தொடர்ந்து தட்டச்சு பயிற்சி செய்வது வேகத்தையும் துல்லியத்தையும் மேம்படுத்துகிறது. முதலில் சரியாக தட்டச்சு செய்வதில் கவனம் செலுத்துங்கள்.",

  te: "క్రమం తప్పకుండా టైపింగ్ సాధన చేయడం వల్ల వేగం మరియు ఖచ్చితత్వం మెరుగుపడతాయి. ముందుగా సరిగ్గా టైప్ చేయడంపై దృష్టి పెట్టండి.",

  ml: "ക്രമമായി ടൈപ്പിംഗ് പരിശീലിക്കുന്നത് വേഗവും കൃത്യതയും മെച്ചപ്പെടുത്താൻ സഹായിക്കുന്നു. ആദ്യം ശരിയായി ടൈപ്പ് ചെയ്യുന്നതിൽ ശ്രദ്ധിക്കുക.",

  kn: "ನಿಯಮಿತ ಟೈಪಿಂಗ್ ಅಭ್ಯಾಸವು ವೇಗ ಮತ್ತು ನಿಖರತೆಯನ್ನು ಸುಧಾರಿಸುತ್ತದೆ. ಮೊದಲು ಸರಿಯಾಗಿ ಟೈಪ್ ಮಾಡುವುದರ ಮೇಲೆ ಗಮನ ಹರಿಸಿ.",

  gu: "નિયમિત ટાઇપિંગ અભ્યાસ ઝડપ અને ચોકસાઈ સુધારવામાં મદદ કરે છે. પહેલા યોગ્ય રીતે ટાઇપ કરવા પર ધ્યાન આપો.",

  mr: "नियमित टायपिंग सराव केल्याने वेग आणि अचूकता सुधारते. प्रथम योग्य टायपिंगवर लक्ष द्या आणि नंतर हळूहळू वेग वाढवा.",

  pa: "ਨਿਯਮਿਤ ਟਾਈਪਿੰਗ ਅਭਿਆਸ ਨਾਲ ਗਤੀ ਅਤੇ ਸ਼ੁੱਧਤਾ ਵਿੱਚ ਸੁਧਾਰ ਹੁੰਦਾ ਹੈ। ਪਹਿਲਾਂ ਸਹੀ ਟਾਈਪ ਕਰਨ ਉੱਤੇ ਧਿਆਨ ਦਿਓ.",

  ne: "नियमित टाइपिङ अभ्यासले गति र शुद्धता सुधार गर्न मद्दत गर्छ। पहिले सही टाइप गर्न ध्यान दिनुहोस् र त्यसपछि बिस्तारै गति बढाउनुहोस्।",

  si: "නිතිපතා ටයිප් කිරීමේ පුහුණුව වේගය සහ නිවැරදිභාවය වැඩි දියුණු කරයි. පළමුව නිවැරදිව ටයිප් කිරීමට අවධානය යොමු කරන්න.",

  my: "ပုံမှန်စာရိုက်လေ့ကျင့်ခြင်းသည် မြန်နှုန်းနှင့် တိကျမှုကို တိုးတက်စေသည်။ ပထမဦးစွာ မှန်ကန်စွာရိုက်ရန် အာရုံစိုက်ပါ။",

  km: "ការអនុវត្តការវាយអក្សរជាប្រចាំជួយបង្កើនល្បឿន និងភាពត្រឹមត្រូវ។ ផ្តោតលើការវាយឲ្យត្រឹមត្រូវជាមុនសិន។",

  lo: "ການຝຶກພິມເປັນປະຈຳຊ່ວຍໃຫ້ຄວາມໄວແລະຄວາມແມ່ນຍຳດີຂຶ້ນ. ເນັ້ນການພິມໃຫ້ຖືກຕ້ອງກ່ອນ.",

  sw: "Mazoezi ya kuandika kwa kibodi mara kwa mara husaidia kuongeza kasi na usahihi. Zingatia usahihi kwanza kisha ongeza kasi taratibu.",

  af: "Gereelde tik oefening help om jou spoed en akkuraatheid te verbeter. Fokus eers op korrekte tik en verhoog daarna jou spoed geleidelik.",

  fil: "Ang regular na pagsasanay sa pagta-type ay nakakatulong upang mapabuti ang bilis at katumpakan. Unahin ang tamang pag-type bago unti-unting dagdagan ang bilis.",

  da: "Regelmæssig skriveøvelse hjælper med at forbedre hastighed og nøjagtighed. Fokuser først på at skrive korrekt og øg derefter hastigheden gradvist.",

  sv: "Regelbunden tangentbordsträning hjälper dig att förbättra hastighet och noggrannhet. Fokusera först på att skriva korrekt och öka sedan hastigheten stegvis.",

  no: "Regelmessig skriveøvelse hjelper deg med å forbedre hastighet og nøyaktighet. Fokuser først på å skrive riktig og øk deretter hastigheten gradvis.",

  fi: "Säännöllinen kirjoitusharjoittelu auttaa parantamaan nopeutta ja tarkkuutta. Keskity ensin oikeaan kirjoittamiseen ja lisää sitten nopeutta vähitellen."
};


/* =====================================================
   PUNCTUATION PASSAGES
===================================================== */

const punctuationPassages = {

  en: "Typing well requires practice. Stay focused, keep your fingers relaxed, and remember: accuracy comes first! Can you improve your speed today?",

  bn: "নিয়মিত অনুশীলন করুন। প্রথমে নির্ভুলতা ঠিক রাখুন, তারপর গতি বাড়ান! আপনি কি আজ আপনার টাইপিং আরও ভালো করতে পারবেন?",

  es: "Practica con atención, mantén los dedos relajados y recuerda: ¡la precisión es lo primero!",

  fr: "Entraînez-vous régulièrement, gardez les doigts détendus et souvenez-vous : la précision passe avant la vitesse!",

  de: "Übe regelmäßig, halte deine Finger entspannt und denke daran: Genauigkeit kommt zuerst!",

  hi: "नियमित अभ्यास करें, अपनी उंगलियों को आराम दें और याद रखें: सटीकता सबसे पहले आती है!",

  ar: "تدرب بانتظام، حافظ على استرخاء أصابعك وتذكر: الدقة تأتي أولاً!"
};


/* =====================================================
   TEST STATE
===================================================== */

const test = {

  started: false,
  running: false,

  startTime: 0,

  timer: null,

  duration: 60,

  text: "",

  typedChars: 0,

  errors: 0,

  wordResults: [],

  lastSecond: 0,

  wpmHistory: []

};


/* =====================================================
   AUDIO
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
      0.025,
      audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.04
    );

    oscillator.connect(gain);

    gain.connect(audioContext.destination);

    oscillator.start();

    oscillator.stop(
      audioContext.currentTime + 0.045
    );

  } catch (error) {
    // Audio is optional.
  }
}


/* =====================================================
   DURATION
===================================================== */

function getSelectedDuration() {

  const value = $("duration").value;

  if (value === "custom") {

    let custom =
      Number($("customTime").value);

    if (!custom || custom < 10) {
      custom = 60;
    }

    return Math.min(custom, 3600);
  }

  return Number(value) || 60;
}


function updateDurationUI() {

  const wrap =
    $("customTimeWrap");

  if (!wrap) return;

  wrap.classList.toggle(
    "hidden",
    $("duration").value !== "custom"
  );
}


/* =====================================================
   MODE
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
    messages[mode] || messages.normal;
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
    passages[language] || passages.en;


  if (mode === "punctuation") {

    text =
      punctuationPassages[language] ||
      punctuationPassages.en;

  }


  if (mode === "capital") {

    text =
      text.toUpperCase();

  }


  if (mode === "small") {

    text =
      text
        .replace(
          /[.,!?;:'"()[\]{}\-—–]/g,
          ""
        )
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();

  }


  return text;
}


/* =====================================================
   CREATE LONG TEXT
===================================================== */

function createUnlimitedText() {

  const base =
    buildText();

  let result = "";

  for (let i = 0; i < 120; i++) {

    result +=
      base + " ";

  }

  return result.trim();
}


/* =====================================================
   SETUP TEXT
===================================================== */

function setupText() {

  test.text =
    createUnlimitedText();

  renderText();
}


/* =====================================================
   RENDER ONLY VISIBLE TEXT
===================================================== */

function renderText() {

  const display =
    $("textDisplay");

  const input =
    $("typingInput").value;

  display.innerHTML = "";

  const start =
    Math.max(
      0,
      input.length - 20
    );

  const end =
    Math.min(
      test.text.length,
      input.length + 220
    );

  const fragment =
    document.createDocumentFragment();

  for (
    let i = start;
    i < end;
    i++
  ) {

    const span =
      document.createElement("span");

    span.textContent =
      test.text[i];

    if (i < input.length) {

      span.className =
        input[i] === test.text[i]
          ? "correct"
          : "wrong";

    }

    if (i === input.length) {

      span.className =
        "current";

    }

    fragment.appendChild(span);

  }

  display.appendChild(fragment);
}


/* =====================================================
   DYNAMIC TEXT
===================================================== */

function makeSureTextExists() {

  const inputLength =
    $("typingInput").value.length;

  if (
    inputLength >
    test.text.length - 1000
  ) {

    test.text +=
      " " +
      createUnlimitedText();

  }
}


/* =====================================================
   RESET
===================================================== */

function resetTest() {

  clearInterval(test.timer);

  test.started = false;
  test.running = false;

  test.startTime = 0;
  test.duration =
    getSelectedDuration();

  test.text = "";
  test.typedChars = 0;
  test.errors = 0;
  test.wordResults = [];
  test.lastSecond = 0;
  test.wpmHistory = [];

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

  $("typingInput").value = "";

  setupText();

  updateModeInfo();
}


/* =====================================================
   START
===================================================== */

function startTest() {

  if (test.started) return;

  test.started = true;
  test.running = true;

  test.startTime =
    Date.now();

  clearInterval(test.timer);

  test.timer =
    setInterval(updateTimer, 200);

  $("typingInput").focus();

}


/* =====================================================
   TIMER
===================================================== */

function updateTimer() {

  if (!test.running) return;

  const elapsed =
    Math.floor(
      (Date.now() - test.startTime) /
      1000
    );

  const remaining =
    Math.max(
      0,
      test.duration - elapsed
    );

  $("time").textContent =
    remaining;

  const currentSecond =
    Math.floor(
      elapsed
    );

  if (
    currentSecond !==
    test.lastSecond
  ) {

    test.lastSecond =
      currentSecond;

    const stats =
      calculateStats();

    test.wpmHistory.push({
      second: currentSecond,
      wpm: stats.wpm
    });

  }

  if (remaining <= 0) {

    finishTest();

  }
}


/* =====================================================
   TYPING
===================================================== */

function handleTyping() {

  if (!test.started) {

    startTest();

  }

  makeSureTextExists();

  playTypingSound();

  const input =
    $("typingInput").value;

  test.typedChars =
    input.length;

  updateTypingDisplay();

}


/* =====================================================
   DISPLAY TYPING
===================================================== */

function updateTypingDisplay() {

  renderText();

}


/* =====================================================
   STATS
===================================================== */

function calculateStats() {

  const input =
    $("typingInput").value;

  const target =
    test.text;

  let correctChars = 0;
  let errors = 0;

  for (
    let i = 0;
    i < input.length;
    i++
  ) {

    if (
      input[i] ===
      target[i]
    ) {

      correctChars++;

    } else {

      errors++;

    }

  }

  const elapsedSeconds =
    test.startTime
      ? Math.max(
          1,
          (Date.now() -
            test.startTime) /
            1000
        )
      : 1;

  const minutes =
    elapsedSeconds / 60;

  const wpm =
    Math.max(
      0,
      Math.round(
        (correctChars / 5) /
        minutes
      )
    );

  const accuracy =
    input.length
      ? Math.round(
          (correctChars /
            input.length) *
            100
        )
      : 100;

  const typedWords =
    input.trim()
      ? input.trim().split(/\s+/)
      : [];

  const targetWords =
    target.trim()
      ? target.trim().split(/\s+/)
      : [];

  let correctWords = 0;

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

  test.typedChars =
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

      return word ===
        targetWords[index]
        ? "correct"
        : "wrong";

    }
  );

}


/* =====================================================
   FINISH
===================================================== */

async function finishTest() {

  if (!test.started) return;

  clearInterval(test.timer);

  test.running = false;

  const stats =
    calculateStats();

  test.wordResults =
    createWordResults();

  $("time").textContent =
    "0";

  $("resultWpm").textContent =
    stats.wpm;

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

  $("testArea")
    .classList
    .add("hidden");

  $("resultArea")
    .classList
    .remove("hidden");

  setTimeout(
    drawGraph,
    100
  );

  await saveResult(stats);

}


/* =====================================================
   GRAPH
===================================================== */

function drawGraph() {

  const canvas =
    $("performanceChart");

  if (!canvas) return;

  const ctx =
    canvas.getContext("2d");

  const width =
    canvas.clientWidth || 800;

  const height =
    260;

  const ratio =
    window.devicePixelRatio || 1;

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


  const data =
    test.wpmHistory.length
      ? test.wpmHistory
      : [
          {
            second: 0,
            wpm: calculateStats().wpm
          }
        ];


  const padding = 35;

  const maxWpm =
    Math.max(
      10,
      ...data.map(
        item => item.wpm
      )
    );


  ctx.strokeStyle =
    "rgba(255,255,255,.10)";

  ctx.lineWidth = 1;

  for (
    let i = 0;
    i < 4;
    i++
  ) {

    const y =
      padding +
      i *
      (
        (height -
          padding * 2) /
        3
      );

    ctx.beginPath();

    ctx.moveTo(
      padding,
      y
    );

    ctx.lineTo(
      width - padding,
      y
    );

    ctx.stroke();

  }


  if (data.length === 1) {

    const x =
      width / 2;

    const y =
      height -
      padding -
      (
        data[0].wpm /
        maxWpm
      ) *
      (
        height -
        padding * 2
      );

    ctx.fillStyle =
      "#8b5cf6";

    ctx.beginPath();

    ctx.arc(
      x,
      y,
      5,
      0,
      Math.PI * 2
    );

    ctx.fill();

    return;

  }


  const step =
    (
      width -
      padding * 2
    ) /
    (
      data.length - 1
    );


  ctx.beginPath();

  data.forEach(
    (item, index) => {

      const x =
        padding +
        index * step;

      const y =
        height -
        padding -
        (
          item.wpm /
          maxWpm
        ) *
        (
          height -
          padding * 2
        );

      if (index === 0) {

        ctx.moveTo(
          x,
          y
        );

      } else {

        ctx.lineTo(
          x,
          y
        );

      }

    }
  );


  ctx.strokeStyle =
    "#8b5cf6";

  ctx.lineWidth =
    3;

  ctx.stroke();


  data.forEach(
    (item, index) => {

      const x =
        padding +
        index * step;

      const y =
        height -
        padding -
        (
          item.wpm /
          maxWpm
        ) *
        (
          height -
          padding * 2
        );

      ctx.fillStyle =
        "#a78bfa";

      ctx.beginPath();

      ctx.arc(
        x,
        y,
        4,
        0,
        Math.PI * 2
      );

      ctx.fill();

    }
  );

}


/* =====================================================
   SAVE RESULT
===================================================== */

async function saveResult(stats) {

  try {

    const {
      data: { user }
    } =
      await supabaseClient
        .auth
        .getUser();

    if (!user) return;

    await supabaseClient
      .from("typing_results")
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
          test.typedChars

      });

  } catch (error) {

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
    .textContent = "";

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

        provider: "google",

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

  if ($("googleLoginBtn"))
    return;

  const button =
    document.createElement("button");

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

let loginMode = false;

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
      $("password").value;

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

    if (loginMode) {

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

    if (result.error) {

      $("authMessage")
        .textContent =
        result.error.message;

      return;

    }

    if (loginMode) {

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
  event => {

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

    clearInterval(test.timer);

    test.started = false;
    test.running = false;

    test.duration =
      getSelectedDuration();

    test.startTime = 0;

    test.typedChars = 0;
    test.errors = 0;
    test.wpmHistory = [];

    $("typingInput").value = "";

    setupText();

    $("setupArea")
      .classList
      .add("hidden");

    $("testArea")
      .classList
      .remove("hidden");

    $("resultArea")
      .classList
      .add("hidden");

    $("time")
      .textContent =
      test.duration;

    $("typingInput").focus();

  };


/* =====================================================
   INPUT
===================================================== */

$("typingInput")
  .addEventListener(
    "input",
    handleTyping
  );


/* =====================================================
   FINISH / RESTART
===================================================== */

$("finishBtn")
  .onclick =
  finishTest;


$("restartBtn")
  .onclick =
  resetTest;


$("tryAgainBtn")
  .onclick =
  resetTest;


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

      $("time").textContent =
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
      .from("typing_results")
      .select(
        "language_code,duration_seconds,wpm,accuracy,created_at"
      )
      .order(
        "created_at",
        {
          ascending: false
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

    console.error(error);

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
        item => `

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

      if (session?.user) {

        await refreshUser();

      } else {

        await refreshUser();

      }

    }
  );


/* =====================================================
   RESIZE GRAPH
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
   INITIALIZE
===================================================== */

addGoogleButton();

updateModeInfo();

updateDurationUI();

resetTest();

refreshUser();
```
