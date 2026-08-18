```javascript
const supabaseClient = window.supabase.createClient(
  window.ABIDTYPE_SUPABASE_URL,
  window.ABIDTYPE_SUPABASE_PUBLISHABLE_KEY
);

const $ = (id) => document.getElementById(id);

/* =========================================================
   GLOBAL LANGUAGE WORD BANKS
========================================================= */

const languageWords = {

  en: `
    the of and to in a is that for it as was with be by on not he this are or his from at
    which but have an had they you were their one all we can her has there been if more
    when will would who so no about what up into than them could time only other new
    some these two may first any like now my such make over think also after back use
    good work life day world way many well through even want still see because where
    much before great how every people should little while long right too old same
    tell does set three place need large another must big high small house number part
    public around school country family student group problem hand home water room
    mother father friend child city story idea name important different possible
  `,

  bn: `
    আমি তুমি সে আমরা তারা এই সেই এবং অথবা কিন্তু তাই যে যদি তবে জন্য থেকে সঙ্গে মধ্যে
    একটি মানুষ ভালো করা হয় আছে ছিল হবে করতে পারে পারেন চাই চাইলে যখন তখন এখানে সেখানে
    আজ কাল দিন রাত সময় জীবন কাজ কথা দেশ শহর বাড়ি ঘর পরিবার বন্ধু শিক্ষা স্কুল বই
    পৃথিবী বিশ্ব বাংলা ভাষা নিয়মিত অনুশীলন টাইপিং গতি দ্রুত ধীরে সঠিক ভুল নতুন পুরোনো
    বড় ছোট সুন্দর গুরুত্বপূর্ণ প্রয়োজন সুযোগ চেষ্টা সফলতা আত্মবিশ্বাস নিজের আরও অনেক
    কিছু সবাই প্রতিদিন শিখুন শেখা উন্নতি দক্ষতা মনোযোগ ধৈর্য লক্ষ্য শুরু শেষ
  `,

  hi: `
    मैं तुम वह हम वे यह वह और या लेकिन इसलिए कि अगर तो के लिए से साथ में एक
    आदमी अच्छा करना है था होगा कर सकते हैं चाहता जब तब यहां वहां आज कल दिन रात
    समय जीवन काम बात देश शहर घर परिवार दोस्त शिक्षा स्कूल किताब दुनिया भाषा
    नियमित अभ्यास टाइपिंग गति तेज धीरे सही गलत नया पुराना बड़ा छोटा सुंदर
    महत्वपूर्ण जरूरत अवसर कोशिश सफलता आत्मविश्वास अपना अधिक बहुत कुछ सभी
  `,

  ur: `
    میں تم وہ ہم یہ اور یا لیکن اس لیے کہ اگر تو کے لیے سے ساتھ میں ایک انسان
    اچھا کرنا ہے تھا ہوگا کر سکتے ہیں چاہتا جب تب یہاں وہاں آج کل دن رات وقت
    زندگی کام بات ملک شہر گھر خاندان دوست تعلیم اسکول کتاب دنیا زبان باقاعدہ
    مشق ٹائپنگ رفتار تیز آہستہ درست غلط نیا پرانا بڑا چھوٹا خوبصورت اہم
    ضرورت موقع کوشش کامیابی اعتماد اپنا زیادہ بہت کچھ سب
  `,

  ar: `
    أنا أنت هو نحن هم هذا هذه و أو لكن لأن إذا ثم من إلى في على عن مع كان
    يكون يمكن يريد عندما هنا هناك اليوم غدا وقت حياة عمل كلمة بلد مدينة بيت
    عائلة صديق تعليم مدرسة كتاب عالم لغة تدريب ممارسة كتابة سرعة سريع بطيء
    صحيح خطأ جديد قديم كبير صغير جميل مهم حاجة فرصة محاولة نجاح ثقة كل بعض
  `,

  es: `
    el la de que y en un ser se no por con para como una su al lo más del los
    las es ha pero sus le ya o fue este sí porque puede hacer todo cuando
    tiempo año día vida trabajo mundo país ciudad casa familia amigo escuela
    libro lenguaje práctica escribir velocidad rápido lento correcto error
    nuevo grande pequeño importante oportunidad éxito confianza cada mucho
  `,

  fr: `
    le la de et les des en un une que est pour dans ce avec sur pas plus
    par comme au du se son cette il elle nous vous ils elles mais ou qui
    quand temps jour vie travail monde pays ville maison famille ami école
    livre langue pratique écrire vitesse rapide lent correct erreur nouveau
    grand petit important occasion succès confiance chaque beaucoup
  `,

  de: `
    der die das und ist zu von den mit ein eine für auf nicht auch es sich
    im dem als an werden aus er sie wir sie aber oder wie bei nach nur
    noch kann haben hat war wird wenn dann schon sehr mehr durch über
    zeit tag leben arbeit welt land stadt haus familie freund schule buch
    sprache übung schreiben geschwindigkeit schnell langsam richtig falsch
    neu groß klein wichtig möglichkeit erfolg vertrauen jeden viel
  `,

  it: `
    il lo la i gli le di che e a da in un una per con su non si è come
    questo quello essere avere fare ma anche più quando dove tutto tempo
    giorno vita lavoro mondo paese città casa famiglia amico scuola libro
    lingua pratica scrivere velocità veloce lento corretto errore nuovo
    grande piccolo importante opportunità successo fiducia ogni molto
  `,

  pt: `
    o a os as de que e em um uma para por com não se do da no na ao
    como mais este esse isso ser ter fazer mas também quando onde tudo
    tempo dia vida trabalho mundo país cidade casa família amigo escola
    livro língua prática escrever velocidade rápido lento correto erro
    novo grande pequeno importante oportunidade sucesso confiança cada muito
  `,

  ru: `
    и в не на что я быть с он а это как по но они мы из за для от до
    уже или если так все его она их был будет может можно время день
    жизнь работа мир страна город дом семья друг школа книга язык практика
    писать скорость быстро медленно правильно ошибка новый большой маленький
    важный возможность успех уверенность каждый много
  `,

  tr: `
    bir ve bu için ile de da ne o ben sen biz siz onlar olan olarak
    çok daha en gibi ama veya çünkü zaman gün hayat iş dünya ülke şehir
    ev aile arkadaş okul kitap dil pratik yazmak hız hızlı yavaş doğru
    yanlış yeni büyük küçük önemli fırsat başarı güven her çok
  `,

  id: `
    yang dan di ke dari untuk dengan ini itu tidak adalah saya kamu dia
    kita mereka pada akan bisa sudah lebih sangat semua waktu hari hidup
    kerja dunia negara kota rumah keluarga teman sekolah buku bahasa latihan
    menulis kecepatan cepat lambat benar salah baru besar kecil penting
    kesempatan sukses percaya setiap banyak
  `,

  vi: `
    và của là trong một cho với không có những được tôi bạn anh chị chúng
    ta họ này đó khi từ vào về như nhưng cũng rất nhiều thời gian ngày
    cuộc sống công việc thế giới đất nước thành phố nhà gia đình bạn bè
    trường sách ngôn ngữ luyện tập viết tốc độ nhanh chậm đúng sai mới lớn
    nhỏ quan trọng cơ hội thành công tự tin mỗi nhiều
  `,

  th: `
    และ ของ ที่ เป็น ใน มี การ ได้ ให้ ไม่ จาก กับ นี้ นั้น ฉัน คุณ เขา เรา
    พวกเขา เมื่อ เวลา วัน ชีวิต งาน โลก ประเทศ เมือง บ้าน ครอบครัว เพื่อน
    โรงเรียน หนังสือ ภาษา ฝึก เขียน ความเร็ว เร็ว ช้า ถูก ผิด ใหม่ ใหญ่
    เล็ก สำคัญ โอกาส ความสำเร็จ ความมั่นใจ ทุก มาก
  `,

  nl: `
    de het een van en in is dat op voor met niet zijn als aan er maar
    door meer ook om te dit deze die hij zij wij jullie hun kan kunnen
    tijd dag leven werk wereld land stad huis familie vriend school boek
    taal oefenen schrijven snelheid snel langzaam goed fout nieuw groot
    klein belangrijk kans succes vertrouwen elke veel
  `,

  pl: `
    i w na z że do nie to jest jak o a się dla ze od przez ten ta
    być mieć może już tylko więcej czas dzień życie praca świat kraj
    miasto dom rodzina przyjaciel szkoła książka język ćwiczenie pisać
    szybkość szybko wolno dobrze źle nowy duży mały ważny szansa sukces
    pewność każdy dużo
  `,

  uk: `
    і в не на що я бути з він це як по але ми вони для від до вже або
    якщо так все його вона їх був буде може можна час день життя робота
    світ країна місто дім сімя друг школа книга мова практика писати
    швидкість швидко повільно правильно помилка новий великий малий
    важливий можливість успіх впевненість кожен багато
  `,

  el: `
    και το η ο τα των σε με για από είναι δεν που να αυτό αυτή
    αλλά όπως όταν χρόνος ημέρα ζωή εργασία κόσμος χώρα πόλη σπίτι
    οικογένεια φίλος σχολείο βιβλίο γλώσσα πρακτική γράφω ταχύτητα
    γρήγορα αργά σωστό λάθος νέο μεγάλο μικρό σημαντικό ευκαιρία
    επιτυχία εμπιστοσύνη κάθε πολύ
  `,

  he: `
    אני אתה הוא היא אנחנו הם זה זאת ו או אבל כי אם אז של את עם על
    אל לא יש היה יהיה יכול רוצה כאשר כאן שם היום מחר זמן חיים עבודה
    עולם מדינה עיר בית משפחה חבר בית ספר ספר שפה תרגול כתיבה מהירות
    מהר לאט נכון טעות חדש גדול קטן חשוב הזדמנות הצלחה ביטחון כל הרבה
  `,

  fa: `
    من تو او ما شما آنها این آن و یا اما زیرا اگر برای از با در یک
    انسان خوب کار زندگی زمان روز دنیا کشور شهر خانه خانواده دوست مدرسه
    کتاب زبان تمرین نوشتن سرعت سریع آهسته درست غلط جدید بزرگ کوچک مهم
    فرصت موفقیت اعتماد هر بسیار
  `,

  ms: `
    yang dan di ke dari untuk dengan ini itu tidak adalah saya kamu dia
    kita mereka akan boleh sudah lebih sangat semua masa hari hidup kerja
    dunia negara bandar rumah keluarga kawan sekolah buku bahasa latihan
    menulis kelajuan cepat perlahan betul salah baru besar kecil penting
    peluang kejayaan keyakinan setiap banyak
  `,

  sv: `
    och det att en i på som för är av till med den inte jag han hon vi
    de kan har var blir när från men eller mycket mer tid dag liv arbete
    värld land stad hus familj vän skola bok språk övning skriva hastighet
    snabbt långsamt rätt fel ny stor liten viktig möjlighet framgång
    självförtroende varje mycket
  `,

  da: `
    og det en at i på som til for er af med den ikke jeg han hun vi
    de kan har var bliver når fra men eller meget mere tid dag liv arbejde
    verden land by hus familie ven skole bog sprog øvelse skrive hastighed
    hurtigt langsomt rigtigt forkert ny stor lille vigtig mulighed succes
    tillid hver meget
  `,

  no: `
    og det en å i på som for er av med den ikke jeg han hun vi de kan
    har var blir når fra men eller mye mer tid dag liv arbeid verden
    land by hus familie venn skole bok språk øvelse skrive hastighet
    raskt sakte riktig feil ny stor liten viktig mulighet suksess tillit
    hver mye
  `,

  fi: `
    ja se että on ei yksi minä sinä hän me he tämä tuo kanssa varten
    kuin mutta kun aika päivä elämä työ maailma maa kaupunki koti perhe
    ystävä koulu kirja kieli harjoitus kirjoittaa nopeus nopeasti hitaasti
    oikein väärin uusi suuri pieni tärkeä mahdollisuus menestys luottamus
    jokainen paljon
  `,

  cs: `
    a je že v na se to z pro jako s do o u být mít tento tato který
    která ale nebo když čas den život práce svět země město dům rodina
    přítel škola kniha jazyk cvičení psát rychlost rychle pomalu správně
    špatně nový velký malý důležitý příležitost úspěch důvěra každý mnoho
  `,

  ro: `
    și de în la un o este pentru cu nu din pe că se mai acest această
    eu tu el ea noi ei poate avea timp zi viață muncă lume țară oraș
    casă familie prieten școală carte limbă practică scrie viteză rapid
    lent corect greșit nou mare mic important oportunitate succes încredere
    fiecare mult
  `,

  hu: `
    és a az hogy egy nem van én te ő mi ti ők ez azzal de vagy mert
    ha akkor minden idő nap élet munka világ ország város ház család
    barát iskola könyv nyelv gyakorlat írni sebesség gyors lassú helyes
    hibás új nagy kicsi fontos lehetőség siker bizalom minden sok
  `,

  ta: `
    நான் நீ அவர் நாம் அவர்கள் இது அது மற்றும் அல்லது ஆனால் என்று ஒரு
    மனிதன் நல்ல வேலை வாழ்க்கை நேரம் நாள் உலகம் நாடு நகரம் வீடு குடும்பம்
    நண்பர் பள்ளி புத்தகம் மொழி பயிற்சி எழுத வேகம் வேகமாக மெதுவாக சரி
    தவறு புதிய பெரிய சிறிய முக்கிய வாய்ப்பு வெற்றி நம்பிக்கை ஒவ்வொரு
  `,

  te: `
    నేను నువ్వు అతను ఆమె మనం వారు ఇది అది మరియు లేదా కానీ ఒక మంచి
    మనిషి పని జీవితం సమయం రోజు ప్రపంచం దేశం నగరం ఇల్లు కుటుంబం స్నేహితుడు
    పాఠశాల పుస్తకం భాష సాధన రాయడం వేగం వేగంగా నెమ్మదిగా సరైన తప్పు కొత్త
    పెద్ద చిన్న ముఖ్యమైన అవకాశం విజయం నమ్మకం ప్రతి చాలా
  `,

  mr: `
    मी तू तो ती आम्ही ते हे ते आणि किंवा पण कारण जर मग एक चांगले
    माणूस काम जीवन वेळ दिवस जग देश शहर घर कुटुंब मित्र शाळा पुस्तक
    भाषा सराव लिहिणे वेग जलद हळू बरोबर चूक नवीन मोठे लहान महत्त्वाचे
    संधी यश आत्मविश्वास प्रत्येक खूप
  `,

  gu: `
    હું તમે તે અમે તેઓ આ તે અને અથવા પરંતુ કારણ જો પછી એક સારો
    માણસ કામ જીવન સમય દિવસ દુનિયા દેશ શહેર ઘર પરિવાર મિત્ર શાળા પુસ્તક
    ભાષા અભ્યાસ લખવું ઝડપ ઝડપી ધીમું સાચું ખોટું નવું મોટું નાનું
    મહત્વપૂર્ણ તક સફળતા વિશ્વાસ દરેક ઘણું
  `,

  kn: `
    ನಾನು ನೀನು ಅವನು ಅವಳು ನಾವು ಅವರು ಇದು ಅದು ಮತ್ತು ಅಥವಾ ಆದರೆ ಒಂದು ಒಳ್ಳೆಯ
    ಮನುಷ್ಯ ಕೆಲಸ ಜೀವನ ಸಮಯ ದಿನ ಜಗತ್ತು ದೇಶ ನಗರ ಮನೆ ಕುಟುಂಬ ಸ್ನೇಹಿತ ಶಾಲೆ
    ಪುಸ್ತಕ ಭಾಷೆ ಅಭ್ಯಾಸ ಬರೆಯುವುದು ವೇಗ ವೇಗವಾಗಿ ನಿಧಾನವಾಗಿ ಸರಿಯಾದ ತಪ್ಪು ಹೊಸ
    ದೊಡ್ಡ ಸಣ್ಣ ಮುಖ್ಯ ಅವಕಾಶ ಯಶಸ್ಸು ನಂಬಿಕೆ ಪ್ರತಿ
  `,

  ml: `
    ഞാൻ നീ അവൻ അവൾ ഞങ്ങൾ അവർ ഇത് അത് കൂടാതെ അല്ലെങ്കിൽ പക്ഷേ ഒരു
    നല്ല മനുഷ്യൻ ജോലി ജീവിതം സമയം ദിവസം ലോകം രാജ്യം നഗരം വീട് കുടുംബം
    സുഹൃത്ത് സ്കൂൾ പുസ്തകം ഭാഷ പരിശീലനം എഴുതുക വേഗം വേഗത്തിൽ പതുക്കെ
    ശരി തെറ്റ് പുതിയ വലിയ ചെറിയ പ്രധാന അവസരം വിജയം ആത്മവിശ്വാസം ഓരോ
  `,

  pa: `
    ਮੈਂ ਤੁਸੀਂ ਉਹ ਅਸੀਂ ਉਹਨਾਂ ਇਹ ਉਹ ਅਤੇ ਜਾਂ ਪਰ ਕਿਉਂਕਿ ਇੱਕ ਚੰਗਾ ਮਨੁੱਖ
    ਕੰਮ ਜੀਵਨ ਸਮਾਂ ਦਿਨ ਦੁਨੀਆ ਦੇਸ਼ ਸ਼ਹਿਰ ਘਰ ਪਰਿਵਾਰ ਦੋਸਤ ਸਕੂਲ ਕਿਤਾਬ
    ਭਾਸ਼ਾ ਅਭਿਆਸ ਲਿਖਣਾ ਗਤੀ ਤੇਜ਼ ਹੌਲੀ ਸਹੀ ਗਲਤ ਨਵਾਂ ਵੱਡਾ ਛੋਟਾ ਮਹੱਤਵਪੂਰਨ
    ਮੌਕਾ ਸਫਲਤਾ ਭਰੋਸਾ ਹਰ ਬਹੁਤ
  `,

  zh: `
    我 你 他 她 我们 他们 这 那 和 或者 但是 因为 如果 一个 人
    好 做 工作 生活 时间 今天 明天 世界 国家 城市 家庭 朋友
    学校 书 语言 练习 打字 速度 快 慢 正确 错误 新 大 小
    重要 机会 成功 信心 每天 很多 学习 进步
  `,

  ja: `
    私 あなた 彼 彼女 私たち これ それ そして また しかし
    だから もし 一つ 人 良い 仕事 生活 時間 今日 明日 世界
    国 都市 家族 友達 学校 本 言語 練習 タイピング 速度
    速い 遅い 正しい 間違い 新しい 大きい 小さい 重要
    機会 成功 自信 毎日 学ぶ 上達
  `,

  ko: `
    나 너 그 그녀 우리 그들 이것 그것 그리고 또는 하지만
    그래서 만약 하나 사람 좋은 일 생활 시간 오늘 내일 세계
    나라 도시 가족 친구 학교 책 언어 연습 타이핑 속도 빠른
    느린 정확한 오류 새로운 큰 작은 중요한 기회 성공 자신감
    매일 배우다 발전
  `
};


/* =========================================================
   PUNCTUATION SENTENCE BANK
========================================================= */

const punctuationTexts = {

  en: [
    "Practice makes progress. Stay focused, type carefully, and improve every day!",
    "Accuracy comes first; speed will follow naturally. Can you beat your best score?",
    "Keep your fingers relaxed, watch the text, and type with confidence!",
    "Every minute of practice matters. Stay consistent, stay patient, and keep improving."
  ],

  bn: [
    "নিয়মিত অনুশীলন করুন। নির্ভুলতার দিকে মনোযোগ দিন, তারপর ধীরে ধীরে গতি বাড়ান!",
    "প্রতিদিন একটু একটু করে অনুশীলন করলে টাইপিং দক্ষতা আরও ভালো হবে। আপনি কি আজকের স্কোর ছাড়াতে পারবেন?",
    "মনোযোগ ধরে রাখুন, ভুল কমান এবং আত্মবিশ্বাসের সঙ্গে টাইপ করুন!",
    "অনুশীলনের প্রতিটি মিনিট গুরুত্বপূর্ণ। ধৈর্য ধরুন, নিয়মিত থাকুন এবং উন্নতি করুন।"
  ],

  es: [
    "La práctica mejora la velocidad. Escribe con cuidado, mantén la calma y sigue adelante!",
    "La precisión es importante; después llegará la velocidad. ¿Puedes mejorar tu récord?"
  ],

  fr: [
    "La pratique améliore la vitesse. Écrivez avec soin, restez concentré et continuez!",
    "La précision vient d'abord; la vitesse suivra naturellement. Pouvez-vous battre votre record?"
  ],

  de: [
    "Regelmäßiges Üben verbessert die Geschwindigkeit. Bleib konzentriert und tippe sorgfältig!",
    "Genauigkeit kommt zuerst; Geschwindigkeit folgt später. Kannst du deinen Rekord verbessern?"
  ],

  ar: [
    "الممارسة المنتظمة تحسن السرعة. ركز جيدًا واكتب بثقة كل يوم!",
    "الدقة تأتي أولًا، ثم ستتحسن السرعة بشكل طبيعي. هل يمكنك تحسين نتيجتك؟"
  ],

  hi: [
    "नियमित अभ्यास से गति और सटीकता बेहतर होती है। ध्यान से टाइप करें और आगे बढ़ते रहें!",
    "पहले सटीकता पर ध्यान दें; गति बाद में अपने आप बढ़ेगी। क्या आप अपना रिकॉर्ड तोड़ सकते हैं?"
  ],

  ur: [
    "باقاعدہ مشق سے رفتار اور درستگی بہتر ہوتی ہے۔ توجہ سے ٹائپ کریں اور مسلسل آگے بڑھیں!",
    "پہلے درستگی پر توجہ دیں، رفتار بعد میں بہتر ہوگی۔ کیا آپ اپنا ریکارڈ توڑ سکتے ہیں؟"
  ]
};


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
  errors: 0,
  typed: 0,
  wordResults: []
};

const authModal = $("authModal");


/* =========================================================
   HELPERS
========================================================= */

function cleanSpaces(text) {
  return text
    .replace(/\s+/g, " ")
    .trim();
}

function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function randomWords(language, count = 55) {
  const source =
    languageWords[language] ||
    languageWords.en;

  const words = source
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!words.length) {
    return languageWords.en
      .trim()
      .split(/\s+/);
  }

  const result = [];

  const shuffled = shuffle(words);

  for (let i = 0; i < count; i++) {
    result.push(
      shuffled[i % shuffled.length]
    );
  }

  return result;
}


/* =========================================================
   BUILD RANDOM TEXT
========================================================= */

function buildText() {

  const language = $("language").value;
  const mode = $("mode").value;

  /* Punctuation mode */

  if (mode === "punctuation") {

    const available =
      punctuationTexts[language];

    if (available && available.length) {

      const random =
        available[
          Math.floor(
            Math.random() *
            available.length
          )
        ];

      return cleanSpaces(random);
    }

    const words =
      randomWords(language, 45);

    const sentences = [];

    for (let i = 0; i < words.length; i += 8) {

      const sentence =
        words
          .slice(i, i + 8)
          .join(" ");

      if (sentence) {
        sentences.push(
          sentence.charAt(0).toUpperCase() +
          sentence.slice(1) +
          (
            i % 16 === 0
              ? "!"
              : "."
          )
        );
      }
    }

    return cleanSpaces(
      sentences.join(" ")
    );
  }


  /* Normal / Capital / Small */

  let words =
    randomWords(language, 60);


  /* Small Letter Mode */

  if (mode === "small") {

    return cleanSpaces(
      words
        .join(" ")
        .replace(
          /[.,!?;:'"()[\]{}\-—–]/g,
          ""
        )
        .toLowerCase()
    );
  }


  let text =
    cleanSpaces(
      words.join(" ")
    );


  /* Capital Mode */

  if (mode === "capital") {
    text = text.toUpperCase();
  }


  return text;
}


/* =========================================================
   DISPLAY TEXT
========================================================= */

function setupText() {

  test.text = buildText();

  $("textDisplay").innerHTML =
    [...test.text]
      .map(
        (char, index) =>
          `<span data-i="${index}">${
            char === " "
              ? "&nbsp;"
              : char
          }</span>`
      )
      .join("");
}


/* =========================================================
   MODE INFO
========================================================= */

function updateModeInfo() {

  const mode =
    $("mode").value;

  const messages = {

    normal:
      "Normal typing practice with common words.",

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
   RESET
========================================================= */

function resetTest() {

  clearInterval(test.timer);

  test.running = false;
  test.started = false;
  test.start = 0;
  test.errors = 0;
  test.typed = 0;
  test.wordResults = [];

  test.duration =
    Number($("duration").value);

  $("setupArea")
    .classList.remove("hidden");

  $("testArea")
    .classList.add("hidden");

  $("resultArea")
    .classList.add("hidden");

  $("time").textContent =
    test.duration;

  $("typingInput").value = "";

  setupText();

  updateModeInfo();
}


/* =========================================================
   START TIMER
========================================================= */

function startTest() {

  if (test.started) return;

  test.started = true;
  test.running = true;
  test.start = Date.now();

  clearInterval(test.timer);

  test.timer = setInterval(() => {

    const elapsed =
      Math.floor(
        (Date.now() - test.start) /
        1000
      );

    const left =
      Math.max(
        0,
        test.duration - elapsed
      );

    $("time").textContent =
      left;

    if (left <= 0) {
      finishTest();
    }

  }, 250);
}


/* =========================================================
   STATISTICS
========================================================= */

function calculateStats() {

  const input =
    $("typingInput").value;

  const target =
    test.text;

  let errors = 0;
  let correctChars = 0;

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
          (Date.now() -
            test.start) /
            1000
        )
      : 1;


  const minutes =
    elapsedSeconds / 60;


  const language =
    $("language").value;


  /*
    Chinese / Japanese / Korean:
    Character based speed
  */

  const isCJK =
    ["zh", "ja", "ko"]
      .includes(language);


  let wpm;


  if (isCJK) {

    const cpm =
      correctChars / minutes;

    wpm =
      Math.max(
        0,
        Math.round(cpm)
      );

  } else {

    wpm =
      Math.max(
        0,
        Math.round(
          (correctChars / 5) /
          minutes
        )
      );

  }


  const accuracy =
    input.length > 0
      ? Math.max(
          0,
          Math.round(
            (correctChars /
              input.length) *
              100
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


  const wrongWords =
    Math.max(
      0,
      totalWords -
        correctWords
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


/* =========================================================
   LIVE TEXT DISPLAY
========================================================= */

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

      span.className = "";


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
}


/* =========================================================
   LIVE TYPING
========================================================= */

function updateLiveTyping() {

  if (!test.started) {
    startTest();
  }

  updateTypingDisplay();
}


/* =========================================================
   WORD GRAPH DATA
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


  const results = [];


  inputWords.forEach(
    (word, index) => {

      const target =
        targetWords[index] ||
        "";


      if (
        word === target
      ) {

        results.push(
          "correct"
        );

      } else {

        results.push(
          "wrong"
        );

      }

    }
  );


  return results;
}


/* =========================================================
   PERFORMANCE GRAPH
========================================================= */

function drawGraph() {

  const canvas =
    $("performanceChart");

  if (!canvas) return;


  const ctx =
    canvas.getContext("2d");


  const width =
    canvas.clientWidth ||
    800;

  const height = 260;


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


  ctx.beginPath();

  ctx.moveTo(
    30,
    height - 35
  );

  ctx.lineTo(
    width - 20,
    height - 35
  );

  ctx.strokeStyle =
    "rgba(255,255,255,.12)";

  ctx.stroke();


  const results =
    test.wordResults;


  if (!results.length) {

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
        (results.length - 1);


  results.forEach(
    (result, index) => {

      const x =
        results.length === 1
          ? width / 2
          : 30 +
            index * step;


      let y;


      if (
        result ===
        "correct"
      ) {

        y =
          height - 100;

      } else {

        y =
          height - 175;

      }


      ctx.beginPath();

      ctx.arc(
        x,
        y,
        5,
        0,
        Math.PI * 2
      );


      if (
        result ===
        "correct"
      ) {

        ctx.fillStyle =
          "#22c55e";

      } else {

        ctx.fillStyle =
          "#ef4444";

      }


      ctx.fill();


      if (index > 0) {

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


/* =========================================================
   FINISH TEST
========================================================= */

async function finishTest() {

  if (!test.started)
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
    .classList.add(
      "hidden"
    );


  $("resultArea")
    .classList.remove(
      "hidden"
    );


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
          $("language")
            .value,

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
   AUTH
========================================================= */

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


/* =========================================================
   LOGIN / SIGNUP
========================================================= */

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


/* =========================================================
   START TEST BUTTON
========================================================= */

$("startTestBtn")
  .onclick =
  () => {

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


    test.duration =
      Number(
        $("duration")
          .value
      );


    setupText();


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
      .value = "";


    /*
      Timer starts immediately
      after pressing Start Test.
    */

    startTest();

    $("typingInput")
      .focus();

  };


/* =========================================================
   INPUT
========================================================= */

$("typingInput")
  .addEventListener(
    "input",
    () => {

      /*
        Do not allow typing beyond
        the generated passage.
      */

      const input =
        $("typingInput")
          .value;


      if (
        input.length >
        test.text.length
      ) {

        $("typingInput")
          .value =
          input.slice(
            0,
            test.text.length
          );

      }


      updateLiveTyping();

    }
  );


/* =========================================================
   BUTTONS
========================================================= */

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


/* =========================================================
   SETTINGS
========================================================= */

$("language")
  .onchange =
  () => {

    resetTest();

  };


$("duration")
  .onchange =
  () => {

    resetTest();

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
      .toggle(
        "light"
      );

  };


/* =========================================================
   USER
========================================================= */

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
        user
          .user_metadata
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
          ascending: false
        }
      )
      .limit(10);


  const box =
    $("history");


  box
    .classList
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
        (item) => `

          <div class="history-row">

            <span>
              ${item.language_code}
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


/* =========================================================
   SUPABASE AUTH STATE
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
        .contains(
          "hidden"
        )
    ) {

      drawGraph();

    }

  }
);


/* =========================================================
   INITIALIZE
========================================================= */

addGoogleButton();

updateModeInfo();

resetTest();

refreshUser();
```
