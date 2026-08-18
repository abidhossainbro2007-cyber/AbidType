const supabaseClient = window.supabase.createClient(
  window.ABIDTYPE_SUPABASE_URL,
  window.ABIDTYPE_SUPABASE_PUBLISHABLE_KEY
);


/* =========================
   PASSAGES
========================= */

const passages = {
  en: "Typing is a skill that improves with regular practice. Focus on accuracy first and speed will follow naturally. Every day is a new opportunity to improve your typing speed, confidence, and consistency. Practice regularly and you will become faster and more accurate.",

  bn: "নিয়মিত অনুশীলন করলে টাইপিংয়ের গতি এবং নির্ভুলতা ধীরে ধীরে বাড়ে। প্রথমে নির্ভুলতার দিকে মনোযোগ দিন। প্রতিদিন একটু একটু করে অনুশীলন করলে আপনার আত্মবিশ্বাস এবং টাইপিং দক্ষতা আরও ভালো হবে।"
};


/* =========================
   HELPERS
========================= */

const $ = id => document.getElementById(id);

const authModal = $("authModal");


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
  history: []
};


/* =========================
   TEST SETUP
========================= */

function setupText(){

  test.text = passages[$("language").value];

  $("textDisplay").innerHTML =
    [...test.text]
      .map((c, i) => {

        const char =
          c === " "
            ? "&nbsp;"
            : c;

        return `<span data-i="${i}">${char}</span>`;

      })
      .join("");

}


/* =========================
   RESET TEST
========================= */

function resetTest(){

  clearInterval(test.timer);

  test.running = false;
  test.start = 0;
  test.errors = 0;
  test.typed = 0;
  test.history = [];

  test.duration =
    Number($("duration").value);

  $("setupArea").classList.remove("hidden");
  $("testArea").classList.add("hidden");
  $("resultArea").classList.add("hidden");

  $("time").textContent =
    test.duration;

  $("typingInput").value = "";

  setupText();

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
  test.history = [];

  $("setupArea").classList.add("hidden");
  $("testArea").classList.remove("hidden");
  $("resultArea").classList.add("hidden");

  $("typingInput").value = "";

  $("time").textContent =
    test.duration;

  setupText();

  $("typingInput").focus();

  test.timer = setInterval(() => {

    const elapsed =
      (Date.now() - test.start) / 1000;

    const left =
      Math.max(
        0,
        test.duration -
        Math.floor(elapsed)
      );

    $("time").textContent = left;

    updateStats();

    if(left <= 0){

      finishTest();

    }

  }, 250);

}


/* =========================
   UPDATE TYPING DISPLAY
========================= */

function updateStats(){

  if(!test.running)
    return;

  const input =
    $("typingInput").value;

  let errors = 0;

  [...input].forEach((char, i) => {

    if(char !== test.text[i]){
      errors++;
    }

  });

  test.errors = errors;
  test.typed = input.length;


  /* Save performance point */

  const elapsed =
    Math.max(
      1,
      (Date.now() - test.start) / 1000
    );

  const mins =
    elapsed / 60;

  const wpm =
    Math.max(
      0,
      Math.round(
        (input.length / 5) / mins
      )
    );

  test.history.push({
    time: Math.floor(elapsed),
    wpm: wpm
  });


  /* Highlight text */

  [...$("textDisplay").children]
    .forEach((span, i) => {

      span.className = "";

      if(i < input.length){

        if(
          input[i] === test.text[i]
        ){

          span.className = "correct";

        }else{

          span.className = "wrong";

        }

      }

      else if(i === input.length){

        span.className = "current";

      }

    });

}


/* =========================
   FINISH TEST
========================= */

function finishTest(){

  if(!test.running)
    return;

  clearInterval(test.timer);

  updateStats();

  test.running = false;


  const input =
    $("typingInput").value;

  const elapsed =
    Math.max(
      1,
      Math.min(
        test.duration,
        (Date.now() - test.start) / 1000
      )
    );


  /* =========================
     WPM
  ========================= */

  const wpm =
    Math.max(
      0,
      Math.round(
        (input.length / 5) /
        (elapsed / 60)
      )
    );


  /* =========================
     ACCURACY
  ========================= */

  const accuracy =
    input.length
      ? Math.max(
          0,
          Math.round(
            (
              (input.length - test.errors)
              /
              input.length
            ) * 100
          )
        )
      : 100;


  /* =========================
     WORDS
  ========================= */

  const typedWords =
    input
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


  typedWords.forEach((word, index) => {

    if(word === targetWords[index]){

      correctWords++;

    }else{

      wrongWords++;

    }

  });


  const totalWords =
    typedWords.length;


  /* =========================
     SHOW RESULT
  ========================= */

  $("testArea").classList.add("hidden");

  $("resultArea").classList.remove("hidden");

  $("resultWpm").textContent =
    wpm;

  $("resultAccuracy").textContent =
    accuracy + "%";

  $("resultWords").textContent =
    totalWords;

  $("resultErrors").textContent =
    test.errors;

  $("correctWords").textContent =
    correctWords;

  $("wrongWords").textContent =
    wrongWords;


  drawChart();


  saveResult({

    wpm,
    accuracy,
    errors: test.errors,
    characters_typed: test.typed

  });

}


/* =========================
   PERFORMANCE GRAPH
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

  ctx.scale(dpr, dpr);


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


  if(test.history.length < 2){

    ctx.fillStyle = "#9ba4b5";

    ctx.font = "14px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
      "Type more to see your performance graph",
      width / 2,
      height / 2
    );

    return;

  }


  const points = [];


  /* Remove duplicate times */

  const unique =
    test.history.filter(
      (item, index, arr) =>
        index ===
        arr.findIndex(
          x => x.time === item.time
        )
    );


  const maxWpm =
    Math.max(
      10,
      ...unique.map(x => x.wpm)
    );


  unique.forEach((item, index) => {

    const x =
      20 +
      (
        index /
        Math.max(1, unique.length - 1)
      )
      *
      (width - 40);

    const y =
      height -
      25 -
      (
        item.wpm /
        maxWpm
      )
      *
      (height - 50);

    points.push({
      x,
      y
    });

  });


  /* Grid */

  ctx.strokeStyle =
    "#252b36";

  ctx.lineWidth = 1;

  for(let i = 1; i <= 4; i++){

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


  /* Line */

  ctx.strokeStyle =
    "#8b7cff";

  ctx.lineWidth = 3;

  ctx.beginPath();


  points.forEach((point, index) => {

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

  });


  ctx.stroke();


  /* Points */

  ctx.fillStyle =
    "#8b7cff";

  points.forEach(point => {

    ctx.beginPath();

    ctx.arc(
      point.x,
      point.y,
      3,
      0,
      Math.PI * 2
    );

    ctx.fill();

  });

}


/* =========================
   SAVE RESULT
========================= */

async function saveResult(stats){

  try{

    const {
      data: {
        user
      }
    } =
      await supabaseClient.auth.getUser();


    if(!user)
      return;


    await supabaseClient
      .from("typing_results")
      .insert({

        user_id: user.id,

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

  authModal.classList.remove(
    "hidden"
  );

  $("authMessage").textContent = "";

}


function closeAuth(){

  authModal.classList.add(
    "hidden"
  );

}


async function signInWithGoogle(){

  $("authMessage").textContent =
    "Opening Google sign in...";


  const {
    error
  } =
    await supabaseClient.auth.signInWithOAuth({

      provider: "google",

      options: {

        redirectTo:
          window.location.origin +
          window.location.pathname

      }

    });


  if(error){

    $("authMessage").textContent =
      error.message;

  }

}


/* =========================
   GOOGLE BUTTON
========================= */

const googleBtn =
  document.createElement("button");

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
   LOGIN / SIGN UP
========================= */

let loginMode = false;


$("switchAuth").onclick = () => {

  loginMode =
    !loginMode;


  $("authTitle").textContent =
    loginMode
      ? "Welcome back"
      : "Create your account";


  $("submitAuth").textContent =
    loginMode
      ? "Login"
      : "Sign up";


  $("displayName")
    .classList
    .toggle(
      "hidden",
      loginMode
    );


  $("switchAuth").textContent =
    loginMode
      ? "Need an account? Sign up"
      : "Already have an account? Login";

};


$("submitAuth").onclick =
  async () => {

    const email =
      $("email").value.trim();

    const password =
      $("password").value;

    const name =
      $("displayName")
        .value
        .trim();


    if(
      !email ||
      password.length < 6
    ){

      $("authMessage").textContent =
        "Enter an email and a password with at least 6 characters.";

      return;

    }


    $("authMessage").textContent =
      "Please wait...";


    let res;


    try{

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

              options: {

                data: {

                  display_name:
                    name ||
                    "AbidType User"

                }

              }

            });

      }


      if(res.error){

        $("authMessage").textContent =
          res.error.message;

        return;

      }


      if(loginMode){

        closeAuth();

        refreshUser();

        loadHistory();

      }else{

        $("authMessage").textContent =
          "Account created. Check your email to confirm, then login.";

      }

    }catch(error){

      $("authMessage").textContent =
        error.message ||
        "Something went wrong.";

    }

  };


/* =========================
   AUTH BUTTON
========================= */

$("authBtn").onclick =
  async () => {

    const {
      data: {
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
   REFRESH USER
========================= */

async function refreshUser(){

  const {
    data: {
      user
    }
  } =
    await supabaseClient
      .auth
      .getUser();


  if(user){

    $("authBtn").textContent =
      "Logout";


    $("welcome").textContent =
      "Welcome, " +
      (
        user.user_metadata
          ?.display_name ||
        "AbidType User"
      );


    $("accountNote").textContent =
      user.email;

  }else{

    $("authBtn").textContent =
      "Login / Sign up";


    $("welcome").textContent =
      "Practice as a guest";


    $("accountNote").textContent =
      "Create an account to save your typing results and build your personal record.";

  }

}


/* =========================
   HISTORY
========================= */

async function loadHistory(){

  const {
    data: {
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


  box.classList.remove(
    "hidden"
  );


  if(error){

    box.textContent =
      "Could not load history yet.";

    console.error(error);

    return;

  }


  if(!data.length){

    box.textContent =
      "No typing results yet.";

    return;

  }


  box.innerHTML =
    data
      .map(x => {

        return `
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
        `;

      })
      .join("");

}


/* =========================
   BUTTON EVENTS
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


$("historyBtn").onclick =
  loadHistory;


$("themeBtn").onclick =
  () => {

    document.body
      .classList
      .toggle("light");

  };


/* =========================
   TYPING INPUT
========================= */

$("typingInput")
  .addEventListener(
    "input",
    () => {

      if(!test.running)
        return;

      updateStats();

    }
  );


/* Prevent pasting */

$("typingInput")
  .addEventListener(
    "paste",
    event => {

      event.preventDefault();

    }
  );


/* Prevent dragging text */

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
