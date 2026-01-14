import express from "express";
import cors from "cors";

// .env ichida: GEMINI_API_KEY=YOUR_KEY
const API_KEY = process.env.GEMINI_API_KEY;
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Imagen 3 (Google AI) — v1beta images.generate endpoint
// Docs: https://ai.google.dev/gemini-api/docs/images
app.post("/api/generate", async (req, res) => {
  try {
    const { prompt, size = "1024x1024" } = req.body || {};
    if (!API_KEY) {
      return res.status(500).json({ error: "API key yo'q. .env ichida GEMINI_API_KEY ni kiriting." });
    }
    const [width, height] = size.split("x").map(Number);

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/images:generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY
      },
      body: JSON.stringify({
        // Imagen 3 model nomlari: "imagen-3.0-generate" yoki "imagen-3.0-fast"
        // Fast arzonroq va tezroq:
        model: "imagen-3.0-fast",
        prompt: {
          text: prompt || "nano banana, minimal, high contrast, studio lighting"
        },
        // Optional: safety, style, cfg, steps va hokazo — soddalik uchun default
        // Output config:
        config: {
          // PNG yoki JPEG
          mimeType: "image/png",
          // O'lcham
          size: { width, height }
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: "Gemini error", details: errText });
    }

    const data = await response.json();
    // Response format: { images: [{ data: { mimeType, base64Data }, ... }] }
    const img = data?.images?.[0]?.data?.base64Data;
    const mime = data?.images?.[0]?.data?.mimeType || "image/png";

    if (!img) {
      return res.status(500).json({ error: "Tasvir kelmadi", raw: data });
    }

    res.json({ base64: img, mime });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server xatosi", details: String(e) });
  }
});

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => {
  console.log(`Proxy ishga tushdi: http://localhost:${PORT}`);
});
