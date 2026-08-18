/* =========================================================
   ABIDTYPE — GLOBAL TYPING TEST
   10FASTFINGERS STYLE ENGINE
========================================================= */

const supabaseClient = window.supabase.createClient(
  window.ABIDTYPE_SUPABASE_URL,
  window.ABIDTYPE_SUPABASE_PUBLISHABLE_KEY
);

const $ = (id) => document.getElementById(id);


/* =========================================================
   LANGUAGE WORD BANKS
========================================================= */

const wordBanks = {

  en: `
  the of and to a in is you that it he was for on are as with his they I at be this have from or one had by word but not what all were we when your can said there use an each which she do how their if will up other about out many then them these so some her would make like him into time has look two more write go see number no way could people my than first water been call who oil its now find long down day did get come made may part
  typing practice speed accuracy keyboard computer learning improve skill focus work every words sentence language global test result performance correct wrong fast slow strong better daily training professional student user website
  `,

  bn: `
  আমি তুমি সে তারা আমরা আপনার আমার এই সেই এবং কিন্তু অথবা যদি যে একটি একটি করে থেকে জন্য সঙ্গে আছে হবে ছিল ছিলাম ছিলে করা করতে পারেন পারে যাবে আসবে মানুষ সময় দিন রাত ভালো নতুন পুরোনো বড় ছোট দ্রুত ধীরে কাজ শেখা শিক্ষা অনুশীলন টাইপিং কিবোর্ড কম্পিউটার গতি নির্ভুলতা দক্ষতা পরীক্ষা ফলাফল শব্দ বাক্য ভাষা বিশ্ব বাংলা নিয়মিত প্রতিদিন চেষ্টা সফলতা উন্নতি আত্মবিশ্বাস
  `,

  hi: `
  मैं तुम वह हम आप यह वह और लेकिन या अगर जो एक से के लिए साथ है होगा था करना सकते हैं जाएगा आएगा लोग समय दिन रात अच्छा नया पुराना बड़ा छोटा तेज धीरे काम सीखना शिक्षा अभ्यास टाइपिंग कीबोर्ड कंप्यूटर गति सटीकता कौशल परीक्षण परिणाम शब्द वाक्य भाषा दुनिया हिंदी नियमित रोज प्रयास सफलता सुधार आत्मविश्वास
  `,

  ur: `
  میں تم وہ ہم آپ یہ اور لیکن یا اگر جو ایک سے کے لیے ساتھ ہے ہوگا تھا کرنا سکتے ہیں جائے گا آئے گا لوگ وقت دن رات اچھا نیا پرانا بڑا چھوٹا تیز آہستہ کام سیکھنا تعلیم مشق ٹائپنگ کی بورڈ کمپیوٹر رفتار درستگی مہارت ٹیسٹ نتیجہ لفظ جملہ زبان دنیا اردو روزانہ کوشش کامیابی بہتری اعتماد
  `,

  ar: `
  أنا أنت هو هي نحن أنتم هذا هذه و لكن أو إذا الذي التي من إلى في على مع عن كان يكون سوف يمكن الناس الوقت اليوم الليل جيد جديد قديم كبير صغير سريع بطيء عمل تعلم تعليم تدريب كتابة لوحة مفاتيح حاسوب سرعة دقة مهارة اختبار نتيجة كلمة جملة لغة عالم عربي ممارسة يومية نجاح تحسين ثقة
  `,

  es: `
  el la los las de que y a en un una es se no por con para como está del más pero sus le ya o este sí porque cuando muy sin sobre también me hasta hay donde quien todo esta puede tiempo año día vida mundo persona trabajo casa bueno nuevo grande pequeño rápido lento aprender práctica escribir teclado computadora velocidad precisión habilidad prueba resultado palabra frase idioma español diario mejorar confianza
  `,

  fr: `
  le la les de et un une à en est que pour dans avec sur par plus pas ce se il elle nous vous ils mais comme son sa au aussi très tout cette peut temps jour monde personne travail maison bon nouveau grand petit rapide lent apprendre pratique écrire clavier ordinateur vitesse précision compétence test résultat mot phrase langue français quotidien améliorer confiance
  `,

  de: `
  der die das und ein eine zu in ist von mit auf für nicht ich du er sie wir ihr sie auch als bei aus nach über aber oder wenn dann nur sehr mehr kann werden war haben sein machen gehen kommen gut neu alt groß klein schnell langsam lernen üben schreiben tastatur computer geschwindigkeit genauigkeit fähigkeit test ergebnis wort satz sprache deutsch täglich verbessern sicherheit
  `,

  it: `
  il la lo i gli le di e un una a in è che per con su da non io tu lui lei noi voi loro anche come questo questa più molto può essere fare andare venire bene nuovo vecchio grande piccolo veloce lento imparare pratica scrivere tastiera computer velocità precisione abilità test risultato parola frase lingua italiano ogni giorno migliorare fiducia
  `,

  pt: `
  o a os as de e um uma para em é que com por não eu você ele ela nós vocês eles também como este esta mais muito pode ser fazer ir vir bom novo velho grande pequeno rápido lento aprender prática escrever teclado computador velocidade precisão habilidade teste resultado palavra frase idioma português todos dia melhorar confiança
  `,

  ru: `
  и в не на я что с он как а это по из за мы для вы они от но о его она так все уже быть был была были можно будет делать делать идти день время человек новый старый большой маленький быстро медленно учиться практика писать клавиатура компьютер скорость точность навык тест результат слово предложение язык русский каждый день улучшение уверенность
  `,

  zh: `
  我 你 他 她 我们 他们 这 那 和 但是 或者 如果 一个 这个 什么 是 有 在 不 会 可以 要 来 去 看 做 说 人 时间 今天 明天 世界 工作 学习 学生 老师 好 新 大 小 快 慢 练习 打字 键盘 电脑 速度 准确 技能 测试 结果 单词 句子 语言 中文 每天 提高 成功 信心
  `,

  ja: `
  私 あなた 彼 彼女 私たち これ それ そして しかし また もし 一つ です あります できます します 行く 来る 見る 人 時間 今日 明日 世界 仕事 学習 学生 良い 新しい 大きい 小さい 速い 遅い 練習 タイピング キーボード コンピューター 速度 正確 技能 テスト 結果 言葉 文 日本語 毎日 上達 成功 自信
  `,

  ko: `
  나 너 그 그녀 우리 이것 저것 그리고 하지만 또는 만약 하나 이다 있다 할 수 있다 하다 가다 오다 보다 사람 시간 오늘 내일 세계 일 공부 학생 좋은 새로운 큰 작은 빠른 느린 연습 타이핑 키보드 컴퓨터 속도 정확도 기술 테스트 결과 단어 문장 한국어 매일 향상 성공 자신감
  `,

  tr: `
  ben sen o biz siz onlar bu şu ve ama veya eğer bir için ile de da ne olmak yapmak gitmek gelmek görmek insan zaman bugün yarın dünya iş öğrenmek öğrenci iyi yeni eski büyük küçük hızlı yavaş pratik yazmak klavye bilgisayar hız doğruluk beceri test sonuç kelime cümle dil Türkçe günlük geliştirmek başarı güven
  `,

  id: `
  saya kamu dia kita mereka ini itu dan tetapi atau jika satu untuk dengan dari dalam adalah bisa akan melakukan pergi datang melihat orang waktu hari dunia kerja belajar siswa baik baru lama besar kecil cepat lambat latihan mengetik keyboard komputer kecepatan akurasi keterampilan tes hasil kata kalimat bahasa Indonesia setiap hari meningkatkan sukses percaya diri
  `,

  ms: `
  saya kamu dia kami mereka ini itu dan tetapi atau jika satu untuk dengan dari dalam adalah boleh akan buat pergi datang lihat orang masa hari dunia kerja belajar pelajar baik baru lama besar kecil cepat perlahan latihan menaip papan kekunci komputer kelajuan ketepatan kemahiran ujian keputusan perkataan ayat bahasa Melayu setiap hari meningkat berjaya yakin
  `,

  vi: `
  tôi bạn anh cô chúng ta họ này đó và nhưng hoặc nếu một cho với từ trong là có thể sẽ làm đi đến xem người thời gian hôm nay ngày mai thế giới công việc học sinh tốt mới cũ lớn nhỏ nhanh chậm luyện tập gõ bàn phím máy tính tốc độ chính xác kỹ năng kiểm tra kết quả từ câu ngôn ngữ Việt Nam mỗi ngày cải thiện thành công tự tin
  `,

  th: `
  ฉัน คุณ เขา เรา พวกเขา นี้ นั้น และ แต่ หรือ ถ้า หนึ่ง สำหรับ กับ จาก ใน คือ มี สามารถ จะ ทำ ไป มา ดู คน เวลา วันนี้ พรุ่งนี้ โลก งาน เรียน นักเรียน ดี ใหม่ เก่า ใหญ่ เล็ก เร็ว ช้า ฝึก พิมพ์ แป้นพิมพ์ คอมพิวเตอร์ ความเร็ว ความแม่นยำ ทักษะ ทดสอบ ผลลัพธ์ คำ ประโยค ภาษาไทย ทุกวัน พัฒนา ความสำเร็จ ความมั่นใจ
  `,

  nl: `
  ik jij hij zij wij jullie zij dit dat en maar of als een voor met van in is zijn kan zal doen gaan komen zien mensen tijd vandaag morgen wereld werk leren student goed nieuw oud groot klein snel langzaam oefenen typen toetsenbord computer snelheid nauwkeurigheid vaardigheid test resultaat woord zin taal nederlands elke dag verbeteren succes vertrouwen
  `

};


/* =========================================================
   CONVERT WORD BANK TO ARRAYS
========================================================= */

Object.keys(wordBanks).forEach((language) => {

  wordBanks[language] = wordBanks[language]
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);

});


/* =========================================================
   TEST STATE
========================================================= */

let test = {

  running: false,

  started: false,

  start: 0,

  timer: null,

  duration: 60,

  text: "",

  words: [],

  errors: 0,

  typed: 0,

  wordResults: [],

  correctChars: 0,

  lastInputLength: 0

};


/* =========================================================
   AUDIO
========================================================= */

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
      audioContext.state === "suspended"
    ) {

      audioContext.resume();

    }


    const oscillator =
      audioContext.createOscillator();

    const gain =
      audioContext.createGain();


    oscillator.type = "sine";

    oscillator.frequency.value =
      380 + Math.random() * 130;


    gain.gain.setValueAtTime(
      0.025,
      audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.04
    );


    oscillator.connect(gain);

    gain.connect(
      audioContext.destination
    );


    oscillator.start();

    oscillator.stop(
      audioContext.currentTime + 0.045
    );

  } catch (error) {

    console.log(
      "Typing sound unavailable"
    );

  }

}


/* =========================================================
   AUTH MODAL
========================================================= */

const authModal =
  $("authModal");


function openAuth() {

  if (!authModal) return;

  authModal.classList.remove(
    "hidden"
  );

  if ($("authMessage")) {

    $("authMessage").textContent =
      "";

  }

}


function closeAuth() {

  if (!authModal) return;

  authModal.classList.add(
    "hidden"
  );

}


/* =========================================================
   RANDOM WORD
========================================================= */

function randomWord(language) {

  const bank =
    wordBanks[language] ||
    wordBanks.en;

  return bank[
    Math.floor(
      Math.random() * bank.length
    )
  ];

}


/* =========================================================
   BUILD INITIAL TEXT
========================================================= */

function buildText() {

  const language =
    $("language").value;

  const mode =
    $("mode").value;


  const words = [];


  /*
    Generate a large amount initially.
    More words are added automatically later.
  */

  for (
    let i = 0;
    i < 300;
    i++
  ) {

    let word =
      randomWord(language);


    if (
      mode === "capital"
    ) {

      word =
        word.toUpperCase();

    }


    if (
      mode === "small"
    ) {

      word =
        word
          .replace(
            /[.,!?;:'"()[\]{}\-—–]/g,
            ""
          )
          .toLowerCase();

    }


    words.push(word);

  }


  if (
    mode === "punctuation"
  ) {

    const punctuation =
      [
        ",",
        ".",
        "!",
        "?",
        ":",
        ";"
      ];


    for (
      let i = 0;
      i < words.length;
      i++
    ) {

      if (
        Math.random() < 0.22
      ) {

        const mark =
          punctuation[
            Math.floor(
              Math.random() *
                punctuation.length
            )
          ];

        words[i] += mark;

      }

    }

  }


  return words.join(" ");

}


/* =========================================================
   SETUP TEXT DISPLAY
========================================================= */

function setupText() {

  test.text =
    buildText();


  test.words =
    test.text
      .split(/\s+/)
      .filter(Boolean);


  const display =
    $("textDisplay");


  if (!display) return;


  display.innerHTML =
    "";


  test.words.forEach(
    (word, wordIndex) => {

      const span =
        document.createElement(
          "span"
        );

      span.className =
        "typing-word";

      span.dataset.word =
        wordIndex;

      span.textContent =
        word;


      display.appendChild(
        span
      );


      /*
        Space between words.
      */

      if (
        wordIndex <
        test.words.length - 1
      ) {

        display.appendChild(
          document.createTextNode(
            " "
          )
        );

      }

    }
  );


  updateTypingDisplay();

}


/* =========================================================
   ADD MORE WORDS
========================================================= */

function addMoreWords() {

  const language =
    $("language").value;

  const mode =
    $("mode").value;


  const extra = [];


  for (
    let i = 0;
    i < 200;
    i++
  ) {

    let word =
      randomWord(language);


    if (
      mode === "capital"
    ) {

      word =
        word.toUpperCase();

    }


    if (
      mode === "small"
    ) {

      word =
        word
          .replace(
            /[.,!?;:'"()[\]{}\-—–]/g,
            ""
          )
          .toLowerCase();

    }


    if (
      mode === "punctuation"
    ) {

      const punctuation =
        [
          ",",
          ".",
          "!",
          "?",
          ":",
          ";"
        ];


      if (
        Math.random() < 0.22
      ) {

        word +=
          punctuation[
            Math.floor(
              Math.random() *
                punctuation.length
            )
          ];

      }

    }


    extra.push(word);

  }


  const oldLength =
    test.words.length;


  test.words =
    test.words.concat(
      extra
    );


  test.text =
    test.words.join(
      " "
    );


  const display =
    $("textDisplay");


  if (!display) return;


  extra.forEach(
    (word, index) => {

      const realIndex =
        oldLength +
        index;


      if (
        display.lastChild &&
        display.lastChild.nodeType ===
          Node.TEXT_NODE
      ) {

        display.appendChild(
          document.createTextNode(
            " "
          )
        );

      }


      const span =
        document.createElement(
          "span"
        );

      span.className =
        "typing-word";

      span.dataset.word =
        realIndex;

      span.textContent =
        word;


      display.appendChild(
        span
      );


      if (
        realIndex <
        test.words.length - 1
      ) {

        display.appendChild(
          document.createTextNode(
            " "
          )
        );

      }

    }
  );

}


/* =========================================================
   MODE INFORMATION
========================================================= */

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


/* =========================================================
   CUSTOM TIMER
========================================================= */

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

  const wrap =
    $("customTimeWrap");


  if (!wrap) return;


  if (
    $("duration").value ===
    "custom"
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


/* =========================================================
   RESET TEST
========================================================= */

function resetTest() {

  clearInterval(
    test.timer
  );


  test.running =
    false;

  test.started =
    false;

  test.start =
    0;

  test.errors =
    0;

  test.typed =
    0;

  test.correctChars =
    0;

  test.wordResults =
    [];

  test.lastInputLength =
    0;


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


/* =========================================================
   START TEST
========================================================= */

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


  $("typingInput")
    .focus();


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


        /*
          IMPORTANT:
          Only timer ends the test.
        */

        if (
          left <= 0
        ) {

          finishTest();

        }

      },
      250
    );

}


/* =========================================================
   CALCULATE STATS
========================================================= */

function calculateStats() {

  const input =
    $("typingInput")
      .value;


  const target =
    test.text;


  let errors =
    0;

  let correctChars =
    0;


  const inputChars =
    [...input];


  const targetChars =
    [...target];


  inputChars.forEach(
    (char, index) => {

      if (
        char ===
        targetChars[index]
      ) {

        correctChars++;

      } else {

        errors++;

      }

    }
  );


  /*
    Extra characters are errors.
  */

  if (
    inputChars.length >
    targetChars.length
  ) {

    errors +=
      inputChars.length -
      targetChars.length;

  }


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
    input
      .trim()
      ? input
          .trim()
          .split(/\s+/)
          .filter(Boolean)
      : [];


  const targetWords =
    target
      .trim()
      ? target
          .trim()
          .split(/\s+/)
          .filter(Boolean)
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

  test.correctChars =
    correctChars;


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


/* =========================================================
   UPDATE TEXT DISPLAY
========================================================= */

function updateTypingDisplay() {

  const input =
    $("typingInput")
      .value;


  const display =
    $("textDisplay");


  if (!display) return;


  const spans =
    [
      ...display.querySelectorAll(
        ".typing-word"
      )
    ];


  /*
    Calculate character positions
    for every word.
  */

  let position =
    0;


  spans.forEach(
    (span, wordIndex) => {

      const word =
        test.words[
          wordIndex
        ] || "";


      const start =
        position;


      const end =
        position +
        word.length;


      span.classList.remove(
        "correct",
        "wrong",
        "current"
      );


      /*
        Current word.
      */

      if (
        input.length >= start &&
        input.length <= end
      ) {

        span.classList.add(
          "current"
        );

      }


      /*
        Word completely typed.
      */

      if (
        input.length >= end
      ) {

        const typedWord =
          input.slice(
            start,
            end
          );


        if (
          typedWord ===
          word
        ) {

          span.classList.add(
            "correct"
          );

        } else {

          span.classList.add(
            "wrong"
          );

        }

      }


      position =
        end + 1;

    }
  );


  /*
    Automatically add more words
    before reaching the end.
  */

  if (
    input.length >
    test.text.length -
      500
  ) {

    addMoreWords();

  }


  /*
    Keep current word visible.
  */

  const current =
    display.querySelector(
      ".current"
    );


  if (current) {

    current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest"
    });

  }

}


/* =========================================================
   LIVE TYPING
========================================================= */

function updateLiveTyping() {

  if (
    !test.started
  ) {

    startTest();

  }


  const input =
    $("typingInput")
      .value;


  /*
    Sound only when new character
    is actually typed.
  */

  if (
    input.length >
    test.lastInputLength
  ) {

    playTypingSound();

  }


  test.lastInputLength =
    input.length;


  updateTypingDisplay();

}


/* =========================================================
   WORD RESULTS
========================================================= */

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


/* =========================================================
   GRAPH
========================================================= */

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
          results[
            index - 1
          ];


        const previousY =
          previous === "correct"
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


/* =========================================================
   FINISH TEST
========================================================= */

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


  test.started =
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


/* =========================================================
   SAVE RESULT
========================================================= */

async function saveResult(
  stats
) {

  try {

    const {
      data: {
        user
      }
    } =
      await supabaseClient
        .auth
        .getUser();


    if (!user) return;


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


/* =========================================================
   GOOGLE LOGIN
========================================================= */

async function signInWithGoogle() {

  $("authMessage")
    .textContent =
    "Opening Google sign in...";


  const {
    error
  } =
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


/* =========================================================
   GOOGLE BUTTON
========================================================= */

function addGoogleButton() {

  if (
    $("googleLoginBtn")
  ) return;


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


/* =========================================================
   LOGIN / SIGNUP SWITCH
========================================================= */

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


/* =========================================================
   EMAIL AUTH
========================================================= */

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


/* =========================================================
   AUTH BUTTON
========================================================= */

$("authBtn")
  .addEventListener(
    "click",
    async () => {

      const {
        data: {
          user
        }
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


/* =========================================================
   CLOSE AUTH
========================================================= */

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


/* =========================================================
   START BUTTON
========================================================= */

$("startTestBtn")
  .onclick =
  () => {

    setupText();


    test.duration =
      getSelectedDuration();


    test.started =
      false;


    test.running =
      false;


    test.start =
      0;


    test.lastInputLength =
      0;


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


    $("typingInput")
      .value =
      "";


    $("typingInput")
      .focus();

  };


/* =========================================================
   TYPING INPUT
========================================================= */

$("typingInput")
  .addEventListener(
    "input",
    updateLiveTyping
  );


/* =========================================================
   FINISH BUTTON
========================================================= */

$("finishBtn")
  .onclick =
  finishTest;


/* =========================================================
   RESTART
========================================================= */

$("restartBtn")
  .onclick =
  () => {

    resetTest();

  };


/* =========================================================
   TRY AGAIN
========================================================= */

$("tryAgainBtn")
  .onclick =
  () => {

    resetTest();

  };


/* =========================================================
   LANGUAGE
========================================================= */

$("language")
  .onchange =
  () => {

    resetTest();

  };


/* =========================================================
   DURATION
========================================================= */

$("duration")
  .onchange =
  () => {

    updateDurationUI();

    resetTest();

  };


/* =========================================================
   CUSTOM TIME
========================================================= */

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


/* =========================================================
   MODE
========================================================= */

$("mode")
  .onchange =
  () => {

    updateModeInfo();

    resetTest();

  };


/* =========================================================
   HISTORY
========================================================= */

$("historyBtn")
  .onclick =
  loadHistory;


/* =========================================================
   THEME
========================================================= */

$("themeBtn")
  .onclick =
  () => {

    document.body
      .classList
      .toggle(
        "light"
      );

  };


/* =========================================================
   USER
========================================================= */

async function refreshUser() {

  const {
    data: {
      user
    }
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


/* =========================================================
   HISTORY
========================================================= */

async function loadHistory() {

  const {
    data: {
      user
    }
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
              ${(
                item.language_code ||
                "en"
              ).toUpperCase()}
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


/* =========================================================
   AUTH STATE
========================================================= */

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


/* =========================================================
   GRAPH RESIZE
========================================================= */

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


/* =========================================================
   LANGUAGE DISPLAY
========================================================= */

$("language")
  .addEventListener(
    "change",
    () => {

      const selected =
        $("language")
          .options[
            $("language")
              .selectedIndex
          ];


      const current =
        $("currentLanguage");


      if (
        current &&
        selected
      ) {

        current.textContent =
          selected.textContent;

      }

    }
  );


/* =========================================================
   INITIALIZE
========================================================= */

addGoogleButton();

updateModeInfo();

updateDurationUI();

resetTest();

refreshUser();
