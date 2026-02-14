import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Health check
app.get("/api/health", (req, res) => res.json({ ok: true }));

app.post("/api/chat", async (req, res) => {
  try {
    const { model = "gpt-4.1-mini", messages = [] } = req.body || {};

    const response = await client.responses.create({
      model,
      input: messages.map(({ role, content }) => ({ role, content })),
    });

    const text = response.output_text ?? "(no output_text)";
    return res.json({ text });

  } catch (error) {
    console.error("OpenAI Error:", error);

    // Detect quota exceeded (429)
    if (error.status === 429 || error.response?.status === 429) {
      return res.json({
        text: "⚠️ AI service temporarily unavailable. Showing demo response.\n\nThis is a simulated AI response for demonstration purposes.",
        demo: true
      });
    }

    // Other errors
    return res.status(500).json({
      error: "Something went wrong. Please try again later."
    });
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ API ready on http://localhost:${PORT}`));