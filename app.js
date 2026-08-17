const supabaseClient = window.supabase.createClient(
  window.ABIDTYPE_SUPABASE_URL,
  window.ABIDTYPE_SUPABASE_PUBLISHABLE_KEY
);

const passages = {
  en: "Typing is a skill that improves with regular practice. Focus on accuracy first and speed will follow naturally. Every day is a new opportunity to improve your typing speed, confidence, and consistency.",
  bn: "নিয়মিত অনুশীলন করলে টাইপিংয়ের গতি এবং নির্ভুলতা ধীরে ধীরে বাড়ে। প্রথমে নির্ভুলতার দিকে মনোযোগ দিন। প্রতিদিন একটু একটু করে অনুশীলন করলে আপনার আত্মবিশ্বাস এবং টাইপিং দক্ষতা আরও ভালো হবে।"
};

let test = {running:false, start:0, timer:null, duration:60, text:"", errors:0, typed:0};

const $=id=>document.getElementById(id);
const authModal=$("authModal");

function setupText(){
  test.text=passages[$("language").value];
  $("textDisplay").innerHTML=[...test.text].map((c,i)=>`<span data-i="${i}">${c===" "?"&nbsp;":c}</span>`).join("");
}
function reset(){
  clearInterval(test.timer); test.running=false; test.start=0; test.errors=0; test.typed=0;
  test.duration=Number($("duration").value); $("time").textContent=test.duration; $("wpm").textContent="0";
  $("accuracy").textContent="100%"; $("errors").textContent="0"; $("typingInput").value=""; $("result").classList.add("hidden"); setupText();
}
function updateStats(){
  const input=$("typingInput").value, elapsed=Math.max(1,(Date.now()-test.start)/1000);
  let errors=0; [...input].forEach((c,i)=>{if(c!==test.text[i])errors++});
  test.errors=errors; test.typed=input.length;
  const mins=elapsed/60, wpm=Math.max(0,Math.round((input.length/5)/mins));
  const accuracy=input.length?Math.max(0,Math.round(((input.length-errors)/input.length)*100)):100;
  $("wpm").textContent=wpm; $("accuracy").textContent=accuracy+"%"; $("errors").textContent=errors;
  [...$("textDisplay").children].forEach((s,i)=>{s.className=i<input.length?(input[i]===test.text[i]?"correct":"wrong"):(i===input.length?"current":"")});
  return {wpm,accuracy,errors};
}
function finish(){
  if(!test.running && !test.start) return;
  const stats=updateStats(); clearInterval(test.timer); test.running=false;
  $("result").classList.remove("hidden"); $("result").textContent=`Test finished — ${stats.wpm} WPM · ${stats.accuracy}% accuracy · ${stats.errors} errors`;
  saveResult(stats);
}
function start(){
  if(test.running)return;
  test.running=true; test.start=Date.now();
  test.timer=setInterval(()=>{
    const left=Math.max(0,test.duration-Math.floor((Date.now()-test.start)/1000));
    $("time").textContent=left; updateStats(); if(left<=0)finish();
  },250);
}
async function saveResult(stats){
  const {data:{user}}=await supabaseClient.auth.getUser();
  if(!user) return;
  await supabaseClient.from("typing_results").insert({
    user_id:user.id, language_code:$("language").value, duration_seconds:test.duration,
    wpm:stats.wpm, accuracy:stats.accuracy, errors:stats.errors, characters_typed:test.typed
  });
}
function openAuth(){authModal.classList.remove("hidden");$("authMessage").textContent=""}
function closeAuth(){authModal.classList.add("hidden")}
let loginMode=false;
$("authBtn").onclick=openAuth;$("closeAuth").onclick=closeAuth;
$("switchAuth").onclick=()=>{loginMode=!loginMode;$("authTitle").textContent=loginMode?"Welcome back":"Create your account";$("submitAuth").textContent=loginMode?"Login":"Sign up";$("displayName").classList.toggle("hidden",loginMode);$("switchAuth").textContent=loginMode?"Need an account? Sign up":"Already have an account? Login"};
$("submitAuth").onclick=async()=>{
  const email=$("email").value.trim(), password=$("password").value, name=$("displayName").value.trim();
  if(!email||password.length<6){$("authMessage").textContent="Enter an email and a password with at least 6 characters.";return}
  $("authMessage").textContent="Please wait...";
  let res;
  if(loginMode) res=await supabaseClient.auth.signInWithPassword({email,password});
  else res=await supabaseClient.auth.signUp({email,password,options:{data:{display_name:name||"AbidType User"}}});
  if(res.error){$("authMessage").textContent=res.error.message;return}
  if(loginMode){closeAuth();refreshUser();loadHistory()}
  else $("authMessage").textContent="Account created. Check your email to confirm, then login.";
};

$("typingInput").addEventListener("input",()=>{if(!$("typingInput").value) return; start(); updateStats()});
$("finishBtn").onclick=finish;$("restartBtn").onclick=reset;$("language").onchange=reset;$("duration").onchange=reset;
$("historyBtn").onclick=loadHistory;
$("themeBtn").onclick=()=>document.body.classList.toggle("light");

async function refreshUser(){
  const {data:{user}}=await supabaseClient.auth.getUser();
  if(user){$("authBtn").textContent="Logout";$("welcome").textContent="Welcome, "+(user.user_metadata?.display_name||"AbidType User");$("accountNote").textContent=user.email}
  else {$("authBtn").textContent="Login / Sign up";$("welcome").textContent="Practice as a guest";$("accountNote").textContent="Create an account to save your typing results and build your personal record."}
}
$("authBtn").addEventListener("click",async()=>{
  const {data:{user}}=await supabaseClient.auth.getUser();
  if(user){await supabaseClient.auth.signOut();refreshUser();$("history").classList.add("hidden");}
});

async function loadHistory(){
  const {data:{user}}=await supabaseClient.auth.getUser();
  if(!user){openAuth();return}
  const {data,error}=await supabaseClient.from("typing_results").select("language_code,duration_seconds,wpm,accuracy,created_at").order("created_at",{ascending:false}).limit(10);
  const box=$("history");box.classList.remove("hidden");
  if(error){box.textContent="Could not load history yet.";return}
  box.innerHTML=data.length?data.map(x=>`<div class="history-row"><span>${x.language_code==="bn"?"বাংলা":"English"}</span><b>${x.wpm} WPM</b><b>${x.accuracy}%</b><span>${new Date(x.created_at).toLocaleDateString()}</span></div>`).join(""):"No typing results yet.";
}
setupText(); reset(); refreshUser();
