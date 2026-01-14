<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>15-in-1 AI Playground — Minimal Jamlanma</title>
  <style>
    :root {
      --bg: #0f0f10; --panel: #151517; --text: #eaeaea; --muted: #9aa0a6;
      --accent: #4f8cff; --accent-2: #7c5cff; --border: #242428;
      --success: #3ecf8e; --danger: #ff5c7a; --warn: #f5a524;
    }
    * { box-sizing: border-box; }
    body { margin:0; background:var(--bg); color:var(--text); font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial; }
    .wrap { max-width:1200px; margin:0 auto; padding:24px; }
    header { display:flex; align-items:center; justify-content:space-between; gap:16px; margin-bottom:20px; }
    .brand { display:flex; align-items:center; gap:12px; }
    .logo { width:36px; height:36px; border-radius:8px; background:linear-gradient(135deg,var(--accent),var(--accent-2)); box-shadow:0 8px 24px rgba(79,140,255,0.35); }
    .title { font-weight:700; letter-spacing:0.2px; }
    .subtitle { color:var(--muted); font-size:14px; }
    nav { position:sticky; top:0; z-index:10; background:rgba(15,15,16,0.85); backdrop-filter: blur(6px); border-bottom:1px solid var(--border); }
    .menu { display:flex; flex-wrap:wrap; gap:8px; padding:10px; }
    .menu a { color:#cfd3d7; text-decoration:none; padding:8px 10px; border:1px solid var(--border); border-radius:8px; font-size:13px; }
    .menu a:hover { color:#fff; border-color:#3a3a40; }
    .grid { display:grid; grid-template-columns: repeat(3, 1fr); gap:16px; margin-top:18px; }
    @media (max-width:1024px){ .grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width:720px){ .grid { grid-template-columns: 1fr; } }
    .card { background:var(--panel); border:1px solid var(--border); border-radius:12px; padding:14px; }
    .card h3 { margin:0 0 8px; font-size:18px; }
    .desc { color:var(--muted); font-size:13px; margin-bottom:10px; }
    .row { display:flex; gap:8px; margin-bottom:10px; }
    .col { flex:1; }
    input, textarea, select {
      width:100%; padding:10px 12px; border-radius:10px; border:1px solid var(--border);
      background:#0c0c0d; color:var(--text); outline:none; font-size:14px;
    }
    textarea { min-height:90px; resize:vertical; }
    .btn { padding:10px 14px; border-radius:10px; border:1px solid var(--border); background:#101114; color:var(--text); cursor:pointer; transition:0.2s ease; font-weight:600; }
    .btn:hover { filter:brightness(1.1); }
    .btn-primary { background:linear-gradient(135deg,var(--accent),var(--accent-2)); border:none; box-shadow:0 6px 18px rgba(79,140,255,0.35); }
    .btn-success { background:var(--success); border:none; color:#0b0b0c; }
    .btn-danger { background:var(--danger); border:none; }
    .btn-warn { background:var(--warn); border:none; color:#0b0b0c; }
    .out { background:#0c0c0d; border:1px dashed var(--border); border-radius:10px; padding:10px; min-height:60px; font-size:14px; }
    .imgbox { display:grid; grid-template-columns: repeat(2, 1fr); gap:8px; }
    .imgbox img { width:100%; height:160px; object-fit:cover; border-radius:10px; border:1px solid var(--border); }
    .small { font-size:12px; color:var(--muted); }
    footer { margin:24px 0 8px; color:var(--muted); font-size:13px; text-align:center; }
  </style>
</head>
<body>
  <nav>
    <div class="menu">
      <a href="#t1">1. Summarizer</a>
      <a href="#t2">2. Sentiment</a>
      <a href="#t3">3. Image caption</a>
      <a href="#t4">4. TTS</a>
      <a href="#t5">5. STT</a>
      <a href="#t6">6. Chatbot</a>
      <a href="#t7">7. Image gen</a>
      <a href="#t8">8. Code format</a>
      <a href="#t9">9. Translate</a>
      <a href="#t10">10. Classifier</a>
      <a href="#t11">11. Face detect</a>
      <a href="#t12">12. Object recog</a>
      <a href="#t13">13. Style transfer</a>
      <a href="#t14">14. Text gen</a>
      <a href="#t15">15. Joke gen</a>
    </div>
  </nav>

  <div class="wrap">
    <header>
      <div class="brand">
        <div class="logo"></div>
        <div>
          <div class="title">15-in-1 AI Playground</div>
          <div class="subtitle">Minimal, tez va jamlangan — real brauzer API + yengil simulyatsiyalar</div>
        </div>
      </div>
      <div class="subtitle">v1.0 — single file</div>
    </header>

    <section class="grid">
      <!-- 1) Text Summarizer -->
      <div class="card" id="t1">
        <h3>1) Text summarizer</h3>
        <div class="desc">Uzun matndan asosiy fikrlarni ajratib, qisqa xulosa yaratadi (heuristic).</div>
        <textarea id="sumInput" placeholder="Matnni kiriting..."></textarea>
        <div class="row">
          <button class="btn btn-primary" id="sumBtn">Summarize</button>
          <select id="sumLen">
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>
        <div class="out" id="sumOut"></div>
      </div>

      <!-- 2) Sentiment Analyzer -->
      <div class="card" id="t2">
        <h3>2) Sentiment analyzer</h3>
        <div class="desc">Pozitiv/negativ neytralni taxmin qiladi (lexicon-based).</div>
        <input id="sentInput" placeholder="Matn..." />
        <div class="row">
          <button class="btn btn-primary" id="sentBtn">Analyze</button>
        </div>
        <div class="out" id="sentOut"></div>
      </div>

      <!-- 3) Image Caption Generator (mock) -->
      <div class="card" id="t3">
        <h3>3) Image caption generator (mock)</h3>
        <div class="desc">Tasvir URL kiriting — soddalashtirilgan tasvir tavsifi yaratadi.</div>
        <input id="capUrl" placeholder="https://..." />
        <div class="row">
          <button class="btn btn-primary" id="capBtn">Generate caption</button>
        </div>
        <div class="imgbox">
          <img id="capImg" alt="Preview" />
          <div class="out" id="capOut"></div>
        </div>
      </div>

      <!-- 4) Text-to-Speech -->
      <div class="card" id="t4">
        <h3>4) Text-to-speech (real)</h3>
        <div class="desc">Brauzer Web Speech API orqali matnni ovozga o‘qiydi.</div>
        <textarea id="ttsInput" placeholder="O‘qiladigan matn...">Salom, bu AI playground — minimal va tez.</textarea>
        <div class="row">
          <select id="ttsVoice"></select>
          <input id="ttsRate" type="range" min="0.5" max="1.5" step="0.1" value="1" />
          <button class="btn btn-success" id="ttsSpeak">Speak</button>
          <button class="btn btn-danger" id="ttsStop">Stop</button>
        </div>
        <div class="small">Agar ovozlar bo‘lmasa, brauzer Web Speech API’ni qo‘llamasligi mumkin.</div>
      </div>

      <!-- 5) Speech-to-Text (mock/real) -->
      <div class="card" id="t5">
        <h3>5) Speech-to-text</h3>
        <div class="desc">Web Speech Recognition mavjud bo‘lsa — real; bo‘lmasa mock.</div>
        <div class="row">
          <button class="btn btn-success" id="sttStart">Start</button>
          <button class="btn btn-danger" id="sttStop">Stop</button>
        </div>
        <div class="out" id="sttOut"></div>
      </div>

      <!-- 6) Chatbot (rule-based) -->
      <div class="card" id="t6">
        <h3>6) Chatbot (rule-based)</h3>
        <div class="desc">Oddiy qoidalar bilan javob qaytaradi; minimal kontekst.</div>
        <div class="row">
          <input id="chatInput" placeholder="Savol yozing..." />
          <button class="btn btn-primary" id="chatSend">Send</button>
        </div>
        <div class="out" id="chatOut"></div>
      </div>

      <!-- 7) Image generator (mock) -->
      <div class="card" id="t7">
        <h3>7) Image generator (mock)</h3>
        <div class="desc">Prompt asosida random tasvirlar (placeholder) — keyin real API bilan almashtirasiz.</div>
        <div class="row">
          <input id="imgPrompt" placeholder="Masalan: nano banana, minimal, high contrast" />
          <button class="btn btn-primary" id="imgGen">Generate</button>
        </div>
        <div class="imgbox" id="imgBox"></div>
      </div>

      <!-- 8) Code formatter (simple) -->
      <div class="card" id="t8">
        <h3>8) Code formatter</h3>
        <div class="desc">JS/HTML kodni soddalashtirib tartibga soladi (indenter).</div>
        <textarea id="fmtInput" placeholder="Kod kiriting..."></textarea>
        <div class="row">
          <button class="btn btn-primary" id="fmtBtn">Format</button>
        </div>
        <div class="out" id="fmtOut"></div>
      </div>

      <!-- 9) Language translator (mock) -->
      <div class="card" id="t9">
        <h3>9) Language translator (mock)</h3>
        <div class="desc">Uz–En–Ru o‘rtasida oddiy lug‘at asosida tarjima.</div>
        <textarea id="trInput" placeholder="Matn...">Salom dunyo</textarea>
        <div class="row">
          <select id="trFrom">
            <option value="uz">Uzbek</option>
            <option value="en">English</option>
            <option value="ru">Russian</option>
          </select>
          <select id="trTo">
            <option value="en">English</option>
            <option value="uz">Uzbek</option>
            <option value="ru">Russian</option>
          </select>
          <button class="btn btn-primary" id="trBtn">Translate</button>
        </div>
        <div class="out" id="trOut"></div>
      </div>

      <!-- 10) Text classifier (topics) -->
      <div class="card" id="t10">
        <h3>10) Text classifier</h3>
        <div class="desc">Matnni mavzularga ajratadi (tech, sport, finance, art...).</div>
        <textarea id="clsInput" placeholder="Matn..."></textarea>
        <div class="row">
          <button class="btn btn-primary" id="clsBtn">Classify</button>
        </div>
        <div class="out" id="clsOut"></div>
      </div>

      <!-- 11) Face detection (mock) -->
      <div class="card" id="t11">
        <h3>11) Face detection (mock)</h3>
        <div class="desc">Tasvirda yuz bor/yo‘qligini taxmin qiladi (heuristic: skin-tone dominant).</div>
        <input id="faceUrl" placeholder="Image URL..." />
        <div class="row">
          <button class="btn btn-primary" id="faceBtn">Detect</button>
        </div>
        <div class="imgbox">
          <img id="faceImg" alt="Preview" />
          <div class="out" id="faceOut"></div>
        </div>
      </div>

      <!-- 12) Object recognition (mock) -->
      <div class="card" id="t12">
        <h3>12) Object recognition (mock)</h3>
        <div class="desc">Tasvir nomidan obyektlarni taxmin qiladi (keyword-based).</div>
        <input id="objUrl" placeholder="Image URL yoki nom..." />
        <div class="row">
          <button class="btn btn-primary" id="objBtn">Recognize</button>
        </div>
        <div class="out" id="objOut"></div>
      </div>

      <!-- 13) AI art style transfer (mock) -->
      <div class="card" id="t13">
        <h3>13) Style transfer (mock)</h3>
        <div class="desc">Rasmga stil nomi qo‘llanadi (filter simulyatsiyasi).</div>
        <input id="stUrl" placeholder="Image URL..." />
        <div class="row">
          <select id="stStyle">
            <option value="bw">Black & White</option>
            <option value="noir">Noir</option>
            <option value="vivid">Vivid</option>
            <option value="retro">Retro</option>
          </select>
          <button class="btn btn-primary" id="stBtn">Apply</button>
        </div>
        <div class="imgbox">
          <img id="stImg" alt="Preview" />
          <img id="stImg2" alt="Styled" />
        </div>
      </div>

      <!-- 14) Text generator (n-gram-ish) -->
      <div class="card" id="t14">
        <h3>14) Text generator</h3>
        <div class="desc">Seed so‘zlardan soddalashtirilgan generator (markov-ish).</div>
        <input id="tgSeed" placeholder="Seed: nano banana minimal" value="nano banana minimal" />
        <div class="row">
          <button class="btn btn-primary" id="tgBtn">Generate</button>
        </div>
        <div class="out" id="tgOut"></div>
      </div>

      <!-- 15) AI joke generator -->
      <div class="card" id="t15">
        <h3>15) Joke generator</h3>
        <div class="desc">Qisqa hazillar — promptga mos soddalashtirilgan generator.</div>
        <input id="jkTopic" placeholder="Mavzu: dizayn, kod, AI..." value="AI" />
        <div class="row">
          <button class="btn btn-primary" id="jkBtn">Make a joke</button>
        </div>
        <div class="out" id="jkOut"></div>
      </div>
    </section>

    <footer>© 2026 — 15-in-1 AI Playground. Minimal jamlanma, tez prototiplash uchun.</footer>
  </div>

  <script>
    // 1) Summarizer
    function summarize(text, mode="short"){
      const sents = text.split(/(?<=[.!?])\s+/).filter(Boolean);
      if(sents.length===0) return "";
      const score = sents.map(s=>{
        const len = s.length;
        const caps = (s.match(/[A-Z]/g)||[]).length;
        const nums = (s.match(/\d/g)||[]).length;
        const keywords = (s.match(/\b(important|key|main|summary|result|conclusion|yakun|asosiy)\b/gi)||[]).length;
        return len*0.001 + caps*0.05 + nums*0.02 + keywords*0.6;
      });
      const idx = score.map((v,i)=>({v,i})).sort((a,b)=>b.v-a.v).map(x=>x.i);
      const take = mode==="short"? Math.min(2, sents.length)
                 : mode==="medium"? Math.min(4, sents.length)
                 : Math.min(6, sents.length);
      const pick = idx.slice(0,take).sort((a,b)=>a-b).map(i=>sents[i]);
      return pick.join(" ");
    }
    document.getElementById("sumBtn").onclick = ()=>{
      const text = document.getElementById("sumInput").value.trim();
      const mode = document.getElementById("sumLen").value;
      document.getElementById("sumOut").textContent = summarize(text, mode) || "—";
    };

    // 2) Sentiment
    const POS = ["good","great","excellent","love","awesome","yaxshi","zo'r","ajoyib","pozitiv","happy"];
    const NEG = ["bad","terrible","hate","awful","worst","yomon","salbiy","sad","angry","bug"];
    function sentiment(s){
      const t = s.toLowerCase();
      let p=0,n=0;
      POS.forEach(w=>{ if(t.includes(w)) p++; });
      NEG.forEach(w=>{ if(t.includes(w)) n++; });
      if(p>n) return `Positive (+${p-n})`;
      if(n>p) return `Negative (${n-p})`;
      return "Neutral";
    }
    document.getElementById("sentBtn").onclick = ()=>{
      const s = document.getElementById("sentInput").value;
      document.getElementById("sentOut").textContent = sentiment(s);
    };

    // 3) Image caption (mock)
    document.getElementById("capBtn").onclick = ()=>{
      const url = document.getElementById("capUrl").value.trim();
      const img = document.getElementById("capImg");
      img.src = url || "https://source.unsplash.com/random/800x600?sig=1";
      const guess = url.toLowerCase();
      let tags = [];
      if(guess.includes("cat")) tags.push("cat");
      if(guess.includes("dog")) tags.push("dog");
      if(guess.includes("city")) tags.push("city");
      if(guess.includes("mountain")) tags.push("mountain");
      if(guess.includes("banana")) tags.push("banana");
      const caption = tags.length? `A photo of ${tags.join(", ")}.` : "A visually appealing scene.";
      document.getElementById("capOut").textContent = caption;
    };

    // 4) TTS
    const ttsVoiceSel = document.getElementById("ttsVoice");
    let voices = [];
    function loadVoices(){
      voices = speechSynthesis.getVoices();
      ttsVoiceSel.innerHTML = voices.map((v,i)=>`<option value="${i}">${v.name} (${v.lang})</option>`).join("");
    }
    if("speechSynthesis" in window){
      loadVoices();
      speechSynthesis.onvoiceschanged = loadVoices;
    }
    document.getElementById("ttsSpeak").onclick = ()=>{
      const text = document.getElementById("ttsInput").value;
      const rate = parseFloat(document.getElementById("ttsRate").value);
      const u = new SpeechSynthesisUtterance(text);
      const idx = parseInt(ttsVoiceSel.value||"0",10);
      if(voices[idx]) u.voice = voices[idx];
      u.rate = rate;
      speechSynthesis.speak(u);
    };
    document.getElementById("ttsStop").onclick = ()=> speechSynthesis.cancel();

    // 5) STT
    const sttOut = document.getElementById("sttOut");
    let recog = null;
    document.getElementById("sttStart").onclick = ()=>{
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if(SR){
        recog = new SR();
        recog.lang = "uz-UZ";
        recog.continuous = true;
        recog.interimResults = true;
        recog.onresult = (e)=>{
          let txt = "";
          for(let i= e.resultIndex; i<e.results.length; i++){
            txt += e.results[i][0].transcript + " ";
          }
          sttOut.textContent = txt.trim();
        };
        recog.start();
      } else {
        sttOut.textContent = "STT mavjud emas — mock: 'Salom, bu test transkripsiya.'";
      }
    };
    document.getElementById("sttStop").onclick = ()=>{ if(recog) recog.stop(); };

    // 6) Chatbot (rule-based)
    const chatOut = document.getElementById("chatOut");
    document.getElementById("chatSend").onclick = ()=>{
      const q = document.getElementById("chatInput").value.toLowerCase();
      let a = "Qiziqarli savol. Batafsil yozing.";
      if(q.includes("salom")) a = "Salom! Bugun nima yaratamiz?";
      else if(q.includes("ai")) a = "AI — vosita. Maqsad aniq bo‘lsa, natija chiroyli bo‘ladi.";
      else if(q.includes("design")) a = "Minimal dizayn — ortiqcha bezaksiz, ma’no markazda.";
      chatOut.textContent = "Bot: " + a;
    };

    // 7) Image generator (mock)
    const IMG_SRC = [
      "https://source.unsplash.com/random/800x600?sig=",
      "https://picsum.photos/seed/"
    ];
    function rand(n){ return Math.floor(Math.random()*n); }
    document.getElementById("imgGen").onclick = ()=>{
      const p = document.getElementById("imgPrompt").value.trim() || "default";
      const box = document.getElementById("imgBox");
      box.innerHTML = "";
      for(let i=0;i<4;i++){
        const pick = IMG_SRC[rand(IMG_SRC.length)];
        const url = pick.includes("source.unsplash") ? pick + rand(999999) : `${pick}${encodeURIComponent(p)}-${Date.now()}-${rand(999999)}/600/400`;
        const img = document.createElement("img");
        img.src = url;
        box.appendChild(img);
      }
    };

    // 8) Code formatter (simple indenter)
    function simpleFormat(code){
      let indent=0, out=[];
      const lines = code.split("\n");
      for(let line of lines){
        const trimmed = line.trim();
        if(trimmed.match(/^(\}|<\/)/)) indent = Math.max(0, indent-1);
        out.push("  ".repeat(indent) + trimmed);
        if(trimmed.match(/(\{|\<$)/) || trimmed.endsWith("{")) indent++;
      }
      return out.join("\n");
    }
    document.getElementById("fmtBtn").onclick = ()=>{
      const code = document.getElementById("fmtInput").value;
      document.getElementById("fmtOut").textContent = simpleFormat(code);
    };

    // 9) Translator (mock)
    const DICT = {
      "salom":"hello","dunyo":"world","kitob":"book","ish":"work","ai":"ai",
      "hello":"salom","world":"dunyo","book":"kitob","work":"ish",
      "privet":"salom","mir":"dunyo","kniga":"kitob","rabota":"ish"
    };
    function translate(text, from, to){
      const words = text.toLowerCase().split(/\s+/);
      return words.map(w=>DICT[w]||w).join(" ");
    }
    document.getElementById("trBtn").onclick = ()=>{
      const t = document.getElementById("trInput").value;
      const from = document.getElementById("trFrom").value;
      const to = document.getElementById("trTo").value;
      document.getElementById("trOut").textContent = translate(t, from, to);
    };

    // 10) Classifier
    const TOPICS = {
      tech: ["code","ai","api","server","design","frontend","backend","model"],
      sport:["match","goal","team","stadium","player","sport"],
      finance:["market","stock","price","budget","money","finance"],
      art:["design","color","style","art","minimal","poster"]
    };
    function classify(text){
      const t = text.toLowerCase();
      const scores = {};
      for(const k in TOPICS){
        scores[k] = TOPICS[k].reduce((acc,w)=> acc + (t.includes(w)?1:0), 0);
      }
      const best = Object.entries(scores).sort((a,b)=>b[1]-a[1])[0];
      return best && best[1]>0 ? `${best[0]} (${best[1]})` : "unknown";
    }
    document.getElementById("clsBtn").onclick = ()=>{
      const t = document.getElementById("clsInput").value;
      document.getElementById("clsOut").textContent = classify(t);
    };

    // 11) Face detection (mock)
    document.getElementById("faceBtn").onclick = ()=>{
      const url = document.getElementById("faceUrl").value.trim();
      document.getElementById("faceImg").src = url || "https://source.unsplash.com/random/800x600?face";
      const guess = url.toLowerCase();
      const hasFace = guess.includes("face") || guess.includes("portrait") || guess.includes("person");
      document.getElementById("faceOut").textContent = hasFace ? "Face likely detected." : "No face detected (mock).";
    };

    // 12) Object recognition (mock)
    document.getElementById("objBtn").onclick = ()=>{
      const s = document.getElementById("objUrl").value.toLowerCase();
      const objs = [];
      ["car","tree","banana","phone","laptop","cat","dog","city","mountain"].forEach(k=>{
        if(s.includes(k)) objs.push(k);
      });
      document.getElementById("objOut").textContent = objs.length? `Objects: ${objs.join(", ")}` : "No objects recognized (mock).";
    };

    // 13) Style transfer (mock)
    document.getElementById("stBtn").onclick = ()=>{
      const url = document.getElementById("stUrl").value.trim();
      const style = document.getElementById("stStyle").value;
      const img = document.getElementById("stImg");
      const img2 = document.getElementById("stImg2");
      img.src = url || "https://source.unsplash.com/random/800x600?sig=77";
      img2.src = img.src;
      img2.style.filter = style==="bw" ? "grayscale(1) contrast(1.2)"
                       : style==="noir" ? "grayscale(0.9) contrast(1.4) brightness(0.9)"
                       : style==="vivid" ? "saturate(1.6) contrast(1.1)"
                       : "sepia(0.6) contrast(1.1)";
    };

    // 14) Text generator (simple markov-ish)
    function genText(seed){
      const words = seed.split(/\s+/).filter(Boolean);
      if(words.length===0) return "";
      const bank = ["minimal","robust","clean","fast","black","white","contrast","studio","design","nano","banana","ai","clarity","bold","mono"];
      let out = [];
      for(let i=0;i<24;i++){
        const pick = Math.random()<0.6 ? words[rand(words.length)] : bank[rand(bank.length)];
        out.push(pick);
      }
      return out.join(" ");
    }
    document.getElementById("tgBtn").onclick = ()=>{
      const seed = document.getElementById("tgSeed").value.trim();
      document.getElementById("tgOut").textContent = genText(seed);
    };

    // 15) Joke generator
    function joke(topic){
      const t = topic.toLowerCase();
      if(t.includes("ai")) return "AI dizaynerga dedi: 'Minimal qilaymi?' — Dizayner: 'Minimal bo‘lsa ham ma’no maksimal bo‘lsin.'";
      if(t.includes("kod")) return "Kod yozdim: ishladi. Refactor qildim: yanada ishladi. Manager: 'Nega kecha ishlamagan?'";
      if(t.includes("design")) return "Minimal dizayn: 1 ta tugma. Foydalanuvchi: 'Qaysi biri?'";
      return "Bugun hazil ham minimal: kuling, keyin yaratishda davom eting.";
    }
    document.getElementById("jkBtn").onclick = ()=>{
      const topic = document.getElementById("jkTopic").value;
      document.getElementById("jkOut").textContent = joke(topic);
    };
  </script>
</body>
</html>
