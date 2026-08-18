const supabaseClient = window.supabase.createClient(
  window.ABIDTYPE_SUPABASE_URL,
  window.ABIDTYPE_SUPABASE_PUBLISHABLE_KEY
);


/* =========================
   PASSAGES
========================= */

const passages = {

  en:
    "Typing is a skill that improves with regular practice. Focus on accuracy first and speed will follow naturally. Every day is a new opportunity to improve your typing speed confidence and consistency. Practice regularly and you will become faster and more accurate.",

  bn:
    "নিয়মিত অনুশীলন করলে টাইপিংয়ের গতি এবং নির্ভুলতা ধীরে ধীরে বাড়ে। প্রথমে নির্ভুলতার দিকে মনোযোগ দিন। প্রতিদিন একটু একটু করে অনুশীলন করলে আপনার আত্মবিশ্বাস এবং টাইপিং দক্ষতা আরও ভালো হবে।"

};


/* =========================
   HELPER
========================= */

const $ = id =>
  document.getElementById(id);

const authModal =
  $("authModal");


/* =========================
   TEST STATE
========================= */

let test = {

  running:false,

  start:0,

  timer:null,

  duration:60,

  text:"",

  errors:0,

  typed:0,

  points:[],

  lastPointTime:0

};


/* =========================
   MODE
========================= */

function getModeText(){

  const language =
    $("language").value;

  const mode =
    $("mode").value;

  let text =
    passages[language];


  if(mode === "capital"){

    text =
      text
        .replace(/[.,!?;:'"()\-]/g,"")
        .toUpperCase();

  }


  if(mode === "small"){

    text =
      text
        .replace(/[.,!?;:'"()\-]/g,"")
        .toLowerCase()
        .replace(/\s+/g," ");

  }


  if(mode === "punctuation"){

    if(language === "en"){

      text =
        "Typing every day is a great habit! Can you improve your speed, accuracy, and confidence? Practice carefully, stay focused, and keep going.";

    }

  }


  return text;

}


/* =========================
   SETUP TEXT
========================= */

function setupText(){

  test.text =
    getModeText();


  $("textDisplay").innerHTML =
    [...test.text]
      .map((char,index) => {

        return `
          <span data-i="${index}">
            ${
              char === " "
                ? "&nbsp;"
                : char
            }
          </span>
        `;

      })
      .join("");

}


/* =========================
   MODE DESCRIPTION
========================= */

function updateModeInfo(){

  const mode =
    $("mode").value;


  const info = {

    normal:
      "Normal typing with natural sentences.",

    punctuation:
      "Practice commas, full stops, question marks and other punctuation.",

    capital:
      "All letters are CAPITAL letters. Punctuation is removed.",

    small:
      "All words are lowercase and punctuation/symbols are removed."

  };


  $("modeInfo").textContent =
    info[mode];

}


/* =========================
   RESET
========================= */

function resetTest(){

  clearInterval(test.timer);

  test.running = false;

  test.start = 0;

  test.errors = 0;

  test.typed = 0;

  test.points = [];

  test.lastPointTime = 0;


  test.duration =
    Number($("duration").value);


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


/* =========================
   START TEST
========================= */

function startTest(){

  clearInterval(test.timer);


  test.running = true;

  test.start = Date.now();

  test.errors = 0;

  test.typed = 0;

  test.points = [];

  test.lastPointTime = 0;


  $("setupArea")
    .classList
    .add("hidden");


  $("testArea")
    .classList
    .remove("hidden");


  $("resultArea")
    .classList
    .add("hidden");


  $("typingInput").value = "";


  $("time").textContent =
    test.duration;


  setupText();


  $("typingInput").focus();


  test.timer =
    setInterval(() => {

      const elapsed =
        (Date.now() - test.start)
        / 1000;


      const left =
        Math.max(
          0,
          test.duration -
          Math.floor(elapsed)
        );


      $("time").textContent =
        left;


      updateStats();


      if(left <= 0){

        finishTest();

      }

    },100);

}


/* =========================
   CALCULATE STATS
========================= */

function calculateStats(){

  const input =
    $("typingInput").value;


  let errors = 0;

  let correctCharacters = 0;


  [...input].forEach(
    (char,index) => {

      if(char === test.text[index]){

        correctCharacters++;

      }else{

        errors++;

      }

    }
  );


  const elapsed =
    Math.max(
      1,
      Math.min(
        test.duration,
        (Date.now() - test.start)
        / 1000
      )
    );


  const minutes =
    elapsed / 60;


  /*
    Standard WPM:
    5 characters = 1 word
  */

  const wpm =
    Math.max(
      0,
      Math.round(
        (input.length / 5)
        / minutes
      )
    );


  /*
    Accuracy is based on
    every typed character.
  */

  const accuracy =
    input.length === 0
      ? 100
      : Math.max(
          0,
          Math.round(
            (
              correctCharacters /
              input.length
            ) * 100
          )
        );


  return {

    wpm,

    accuracy,

    errors,

    correctCharacters,

    elapsed,

    inputLength:input.length

  };

}


/* =========================
   UPDATE LIVE TEXT
========================= */

function updateStats(){

  if(!test.running)
    return;


  const input =
    $("typingInput").value;


  const stats =
    calculateStats();


  test.errors =
    stats.errors;


  test.typed =
    input.length;


  /*
    Highlight typed characters
  */

  [...$("textDisplay").children]
    .forEach(
      (span,index) => {

        span.className = "";


        if(index < input.length){

          if(
            input[index] ===
            test.text[index]
          ){

            span.className =
              "correct";

          }else{

            span.className =
              "wrong";

          }

        }


        if(index === input.length){

          span.className =
            "current";

        }

      }
    );


  /*
    Graph point every second
  */

  const second =
    Math.floor(
      stats.elapsed
    );


  if(
    second >
    test.lastPointTime
  ){

    test.lastPointTime =
      second;


    let status =
      "yellow";


    if(input.length > 0){

      const last =
        input[input.length - 1];

      const expected =
        test.text[input.length - 1];


      status =
        last === expected
          ? "green"
          : "red";

    }


    test.points.push({

      time:second,

      wpm:stats.wpm,

      status

    });

  }

}


/* =========================
   FINISH TEST
========================= */

async function finishTest(){

  if(!test.running)
    return;


  clearInterval(test.timer);

  updateStats();

  test.running = false;


  const stats =
    calculateStats();


  /*
    Count words
  */

  const typedWords =
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


  let correctWords = 0;

  let wrongWords = 0;


  typedWords.forEach(
    (word,index) => {

      if(
        word ===
        targetWords[index]
      ){

        correctWords++;

      }else{

        wrongWords++;

      }

    }
  );


  $("testArea")
    .classList
    .add("hidden");


  $("resultArea")
    .classList
    .remove("hidden");


  $("resultWpm").textContent =
    stats.wpm;


  $("resultAccuracy").textContent =
    stats.accuracy + "%";


  $("resultWords").textContent =
    typedWords.length;


  $("resultErrors").textContent =
    stats.errors;


  $("correctWords").textContent =
    correctWords;


  $("wrongWords").textContent =
    wrongWords;


  drawChart();


  await saveResult({

    wpm:stats.wpm,

    accuracy:stats.accuracy,

    errors:stats.errors,

    characters_typed:
      test.typed

  });

}


/* =========================
   GRAPH
========================= */

function drawChart(){

  const canvas =
    $("performanceChart");


  const ctx =
    canvas.getContext("2d");


  const rect =
    canvas.getBoundingClientRect();


  const dpr =
    window.devicePixelRatio || 1;


  canvas.width =
    rect.width * dpr;


  canvas.height =
    rect.height * dpr;


  ctx.scale(
    dpr,
    dpr
  );


  const width =
    rect.width;


  const height =
    rect.height;


  ctx.clearRect(
    0,
    0,
    width,
    height
  );


  const points =
    test.points;


  if(!points.length){

    ctx.fillStyle =
      "#9ba4b5";

    ctx.font =
      "14px Arial";

    ctx.textAlign =
      "center";

    ctx.fillText(
      "No graph data",
      width / 2,
      height / 2
    );

    return;

  }


  const maxWpm =
    Math.max(
      10,
      ...points.map(
        p => p.wpm
      )
    );


  /*
    Grid
  */

  ctx.strokeStyle =
    "#252b36";

  ctx.lineWidth = 1;


  for(
    let i = 1;
    i <= 4;
    i++
  ){

    const y =
      20 +
      (
        i / 5
      ) *
      (height - 45);


    ctx.beginPath();

    ctx.moveTo(
      20,
      y
    );

    ctx.lineTo(
      width - 20,
      y
    );

    ctx.stroke();

  }


  /*
    Draw performance line
  */

  const coords =
    points.map(
      (point,index) => {

        const x =
          20 +
          (
            index /
            Math.max(
              1,
              points.length - 1
            )
          )
          *
          (width - 40);


        const y =
          height -
          25 -
          (
            point.wpm /
            maxWpm
          )
          *
          (height - 50);


        return {
          x,
          y,
          status:
            point.status
        };

      }
    );


  /*
    Line
  */

  ctx.strokeStyle =
    "#8b7cff";

  ctx.lineWidth = 2;

  ctx.beginPath();


  coords.forEach(
    (point,index) => {

      if(index === 0){

        ctx.moveTo(
          point.x,
          point.y
        );

      }else{

        ctx.lineTo(
          point.x,
          point.y
        );

      }

    }
  );


  ctx.stroke();


  /*
    Colored points
  */

  coords.forEach(
    point => {

      if(point.status === "green"){

        ctx.fillStyle =
          "#35d07f";

      }else if(
        point.status === "red"
      ){

        ctx.fillStyle =
          "#ff536d";

      }else{

        ctx.fillStyle =
          "#ffd45c";

      }


      ctx.beginPath();

      ctx.arc(
        point.x,
        point.y,
        4,
        0,
        Math.PI * 2
      );

      ctx.fill();

    }
  );

}


/* =========================
   SAVE RESULT
========================= */

async function saveResult(stats){

  try{

    const {
      data:{
        user
      }
    } =
      await supabaseClient
        .auth
        .getUser();


    if(!user)
      return;


    await supabaseClient
      .from("typing_results")
      .insert({

        user_id:user.id,

        language_code:
          $("language").value,

        duration_seconds:
          test.duration,

        wpm:stats.wpm,

        accuracy:stats.accuracy,

        errors:stats.errors,

        characters_typed:
          stats.characters_typed

      });

  }catch(error){

    console.error(
      "Save result error:",
      error
    );

  }

}


/* =========================
   AUTH
========================= */

function openAuth(){

  authModal
    .classList
    .remove("hidden");

  $("authMessage")
    .textContent = "";

}


function closeAuth(){

  authModal
    .classList
    .add("hidden");

}


async function signInWithGoogle(){

  $("authMessage")
    .textContent =
    "Opening Google sign in...";


  const {
    error
  } =
    await supabaseClient
      .auth
      .signInWithOAuth({

        provider:"google",

        options:{

          redirectTo:
            window.location.origin +
            window.location.pathname

        }

      });


  if(error){

    $("authMessage")
      .textContent =
      error.message;

  }

}


/* =========================
   GOOGLE BUTTON
========================= */

const googleBtn =
  document.createElement(
    "button"
  );


googleBtn.type =
  "button";


googleBtn.textContent =
  "Continue with Google";


googleBtn.className =
  "google-login-btn";


googleBtn.onclick =
  signInWithGoogle;


const submitButton =
  $("submitAuth");


if(
  submitButton &&
  submitButton.parentElement
){

  submitButton.parentElement
    .insertBefore(
      googleBtn,
      submitButton
    );

}


/* =========================
   LOGIN / SIGNUP
========================= */

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
      $("password")
        .value;


    const name =
      $("displayName")
        .value
        .trim();


    if(
      !email ||
      password.length < 6
    ){

      $("authMessage")
        .textContent =
        "Enter an email and a password with at least 6 characters.";

      return;

    }


    $("authMessage")
      .textContent =
      "Please wait...";


    try{

      let res;


      if(loginMode){

        res =
          await supabaseClient
            .auth
            .signInWithPassword({

              email,

              password

            });

      }else{

        res =
          await supabaseClient
            .auth
            .signUp({

              email,

              password,

              options:{

                data:{

                  display_name:
                    name ||
                    "AbidType User"

                }

              }

            });

      }


      if(res.error){

        $("authMessage")
          .textContent =
          res.error.message;

        return;

      }


      if(loginMode){

        closeAuth();

        refreshUser();

        loadHistory();

      }else{

        $("authMessage")
          .textContent =
          "Account created. Check your email to confirm, then login.";

      }

    }catch(error){

      $("authMessage")
        .textContent =
        error.message;

    }

  };


/* =========================
   AUTH BUTTON
========================= */

$("authBtn").onclick =
  async () => {

    const {
      data:{
        user
      }
    } =
      await supabaseClient
        .auth
        .getUser();


    if(user){

      await supabaseClient
        .auth
        .signOut();


      refreshUser();


      $("history")
        .classList
        .add("hidden");

    }else{

      openAuth();

    }

  };


$("closeAuth").onclick =
  closeAuth;


/* =========================
   USER
========================= */

async function refreshUser(){

  const {
    data:{
      user
    }
  } =
    await supabaseClient
      .auth
      .getUser();


  if(user){

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

  }else{

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


/* =========================
   HISTORY
========================= */

async function loadHistory(){

  const {
    data:{
      user
    }
  } =
    await supabaseClient
      .auth
      .getUser();


  if(!user){

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
          ascending:false
        }
      )
      .limit(10);


  const box =
    $("history");


  box.classList
    .remove("hidden");


  if(error){

    box.textContent =
      "Could not load history yet.";

    return;

  }


  if(!data.length){

    box.textContent =
      "No typing results yet.";

    return;

  }


  box.innerHTML =
    data.map(
      x => `

        <div class="history-row">

          <span>
            ${
              x.language_code === "bn"
                ? "বাংলা"
                : "English"
            }
          </span>

          <b>
            ${x.wpm} WPM
          </b>

          <b>
            ${x.accuracy}%
          </b>

          <span>
            ${
              new Date(
                x.created_at
              ).toLocaleDateString()
            }
          </span>

        </div>

      `
    ).join("");

}


/* =========================
   EVENTS
========================= */

$("startTestBtn").onclick =
  startTest;


$("finishBtn").onclick =
  finishTest;


$("restartBtn").onclick =
  resetTest;


$("tryAgainBtn").onclick =
  resetTest;


$("language").onchange =
  resetTest;


$("duration").onchange =
  resetTest;


$("mode").onchange =
  () => {

    setupText();

    updateModeInfo();

  };


$("historyBtn").onclick =
  loadHistory;


$("themeBtn").onclick =
  () => {

    document.body
      .classList
      .toggle("light");

  };


$("typingInput")
  .addEventListener(
    "input",
    () => {

      if(test.running){

        updateStats();

      }

    }
  );


/*
  Stop paste.
  This prevents users from
  pasting the answer.
*/

$("typingInput")
  .addEventListener(
    "paste",
    event => {

      event.preventDefault();

    }
  );


$("typingInput")
  .addEventListener(
    "drop",
    event => {

      event.preventDefault();

    }
  );


/* =========================
   INITIALIZE
========================= */

setupText();

resetTest();

refreshUser();
