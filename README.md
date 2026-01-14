<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Cheksiz AI Surat Generator</title>
  <style>
    :root {
      --bg: #0f0f10;
      --panel: #151517;
      --text: #eaeaea;
      --muted: #9aa0a6;
      --accent: #4f8cff;
      --accent-2: #7c5cff;
      --border: #242428;
      --success: #3ecf8e;
      --danger: #ff5c7a;
    }
    * { box-sizing: border-box; }
    html, body {
      height: 100%;
      background: var(--bg);
      color: var(--text);
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial;
      margin: 0;
    }
    .wrap {
      max-width: 1100px;
      margin: 0 auto;
      padding: 24px;
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 20px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .logo {
      width: 36px; height: 36px;
      border-radius: 8px;
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      box-shadow: 0 8px 24px rgba(79,140,255,0.35);
    }
    .title {
      font-weight: 700;
      letter-spacing: 0.2px;
    }
    .subtitle {
      color: var(--muted);
      font-size: 14px;
    }
    .controls {
      display: grid;
      grid-template-columns: 1fr auto auto auto;
      gap: 10px;
      background: var(--panel);
      border: 1px solid var(--border);
      padding: 12px;
      border-radius: 12px;
    }
    input[type="text"] {
      width: 100%;
      padding: 12px 14px;
      border-radius: 10px;
      border: 1px solid var(--border);
      background: #0c0c0d;
      color: var(--text);
      outline: none;
    }
    input[type="text"]::placeholder { color: #6b7280; }
    .btn {
      padding: 10px 14px;
      border-radius: 10px;
      border: 1px solid var(--border);
      background: #101114;
      color: var(--text);
      cursor: pointer;
      transition: 0.2s ease;
      font-weight: 600;
    }
    .btn:hover { filter: brightness(1.1); }
    .btn-primary {
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      border: none;
      box-shadow: 0 6px 18px rgba(79,140,255,0.35);
    }
    .btn-success { background: var(--success); border: none; color: #0b0b0c; }
    .btn-danger { background: var(--danger); border: none; }
    .status {
      margin-top: 10px;
      color: var(--muted);
      font-size: 13px;
    }
    .grid {
      margin-top: 18px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }
    @media (max-width: 1024px) { .grid { grid-template-columns: repeat(3, 1fr); } }
    @media (max-width: 768px)  { .grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 480px)  { .grid { grid-template-columns: 1fr; } }

    .card {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid var(--border);
      background: #0c0c0d;
      min-height: 180px;
    }
    .card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      filter: saturate(1.05) contrast(1.05);
    }
    .badge {
      position: absolute;
      left: 10px; top: 10px;
      background: rgba(0,0,0,0.55);
      color: #fff;
      padding: 6px 10px;
      border-radius: 999px;
      font-size: 12px;
      border: 1px solid rgba(255,255,255,0.12);
      backdrop-filter: blur(6px);
    }
    .footer {
      margin: 24px 0 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--muted);
      font-size: 13px;
    }
    .switch {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      user-select: none;
    }
    .switch input { display: none; }
    .toggle {
      width: 42px; height: 24px;
      background: #1a1b1f;
      border: 1px solid var(--border);
      border-radius: 999px;
      position: relative;
      transition: 0.2s ease;
    }
    .toggle::after {
      content: "";
      position: absolute;
      top: 2px; left: 2px;
      width: 20px; height: 20px;
      background: #fff;
      border-radius: 50%;
      transition: 0.2s ease;
      box-shadow: 0 2px 8px rgba(0,0,0,0.35);
    }
    .switch input:checked + .toggle {
      background: var(--success);
      border-color: var(--success);
    }
    .switch input:checked + .toggle::after { left: 20px; }
    .empty {
      border: 1px dashed var(--border);
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      color: var(--muted);
    }
  </style>
</head>
<body>
  <div class="wrap">
    <header>
      <div class="brand">
        <div class="logo"></div>
        <div>
          <div class="title">Infinite AI Image Generator</div>
          <div class="subtitle">Prompt kiriting, generate bosing—galereya cheksiz to‘lib boradi.</div>
        </div>
      </div>
      <div class="subtitle">v1.0 — minimal & tez</div>
    </header>

    <section class="controls">
      <input id="prompt" type="text" placeholder="Masalan: 'Monospace minimal poster, black & white, high contrast'" />
      <button id="generateBtn" class="btn btn-primary">Generate</button>
      <button id="autoBtn" class="btn btn-success">Auto: Off</button>
      <button id="clearBtn" class="btn btn-danger">Clear</button>
    </section>

    <div class="status" id="status">Tayyor. Placeholder tasvirlar random tanlanadi.</div>

    <section id="gallery" class="grid">
      <!-- Dynamic images will appear here -->
    </section>

    <div id="emptyState" class="empty">Hali hech narsa yo‘q. Biror prompt yozib, “Generate” bosing yoki “Auto”ni yoqing.</div>

    <div class="footer">
      <label class="switch">
        <input id="infiniteScroll" type="checkbox" />
        <span class="toggle"></span>
        <span>Infinite scroll: On/Off</span>
      </label>
      <div>Mock mode — keyin haqiqiy API bilan almashtirish oson.</div>
    </div>
  </div>

  <script>
    // Placeholder manbalar — istasangiz o'zingiznikiga almashtiring
    const SOURCES = [
      // Unsplash random endpoints
      "https://source.unsplash.com/random/800x600?sig=",
      "https://picsum.photos/seed/",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1200&q=60"
    ];

    const gallery = document.getElementById("gallery");
    const statusEl = document.getElementById("status");
    const promptEl = document.getElementById("prompt");
    const generateBtn = document.getElementById("generateBtn");
    const autoBtn = document.getElementById("autoBtn");
    const clearBtn = document.getElementById("clearBtn");
    const emptyState = document.getElementById("emptyState");
    const infiniteScrollEl = document.getElementById("infiniteScroll");

    let autoMode = false;
    let autoTimer = null;
    let imageCount = 0;

    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function buildImageUrl(prompt) {
      // Promptni seed sifatida ishlatamiz
      const seed = encodeURIComponent(prompt || "default") + "-" + Date.now() + "-" + randomInt(1, 999999);
      const pick = SOURCES[randomInt(0, SOURCES.length - 1)];

      // Ba'zi manbalar seed talab qiladi, ba'zilari sig parametri bilan ishlaydi
      if (pick.includes("source.unsplash.com/random")) {
        return pick + randomInt(1, 999999);
      }
      if (pick.includes("picsum.photos/seed")) {
        return `${pick}${seed}/800/600`;
      }
      // Statik unsplash URL'lari — prompt bilan bog'liq emas, lekin galereyani to'ldiradi
      return pick;
    }

    function createCard(url, prompt) {
      const card = document.createElement("div");
      card.className = "card";

      const img = document.createElement("img");
      img.loading = "lazy";
      img.src = url;
      img.alt = prompt || "Generated image";

      const badge = document.createElement("div");
      badge.className = "badge";
      badge.textContent = prompt ? prompt.slice(0, 40) : "AI Mock";

      card.appendChild(img);
      card.appendChild(badge);
      return card;
    }

    function addImage(prompt) {
      const url = buildImageUrl(prompt);
      const card = createCard(url, prompt);
      gallery.appendChild(card);
      imageCount++;
      emptyState.style.display = "none";
      statusEl.textContent = `Yaratildi: ${imageCount} ta. Prompt: "${prompt || "—"}"`;
    }

    function generateBatch(n = 4) {
      const p = promptEl.value.trim();
      for (let i = 0; i < n; i++) addImage(p);
    }

    function startAuto() {
      if (autoTimer) return;
      autoMode = true;
      autoBtn.textContent = "Auto: On";
      statusEl.textContent = "Auto rejim yoqildi — tasvirlar oqimi davom etadi.";
      autoTimer = setInterval(() => {
        // Har siklda 2–3 ta tasvir
        generateBatch(randomInt(2, 3));
      }, 1400);
    }

    function stopAuto() {
      autoMode = false;
      autoBtn.textContent = "Auto: Off";
      statusEl.textContent = "Auto rejim o‘chirildi.";
      clearInterval(autoTimer);
      autoTimer = null;
    }

    generateBtn.addEventListener("click", () => {
      generateBatch(6);
    });

    autoBtn.addEventListener("click", () => {
      autoMode ? stopAuto() : startAuto();
    });

    clearBtn.addEventListener("click", () => {
      stopAuto();
      gallery.innerHTML = "";
      imageCount = 0;
      emptyState.style.display = "block";
      statusEl.textContent = "Tozalandi. Yangi prompt bilan boshlang.";
    });

    // Infinite scroll — pastga yaqinlashganda avtomatik qo'shadi
    let scrollLock = false;
    window.addEventListener("scroll", () => {
      if (!infiniteScrollEl.checked) return;
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
      if (nearBottom && !scrollLock) {
        scrollLock = true;
        generateBatch(8);
        setTimeout(() => { scrollLock = false; }, 600);
      }
    });

    // Dastlabki holat — kichik batch
    generateBatch(4);
  </script>
</body>
</html>
