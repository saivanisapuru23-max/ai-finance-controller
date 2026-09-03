const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --------------------------------------------------
// GEMINI SETUP
// --------------------------------------------------

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// --------------------------------------------------
// HEALTH CHECK
// --------------------------------------------------

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "FinanceAI backend is running",
    gemini: process.env.GEMINI_API_KEY
      ? "configured"
      : "missing",
  });
});

// --------------------------------------------------
// GEMINI AI FUNCTION
// RETRY + MODEL FALLBACK
// --------------------------------------------------

async function generateFinanceAnalysis(prompt) {
  const models = [
    "gemini-3.5-flash",
    "gemini-3.5-flash-lite",
    "gemini-3.1-flash-lite",
  ];

  let lastError = null;

  for (const model of models) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(
          `Trying Gemini model: ${model} | Attempt: ${attempt}`
        );

        const response = await ai.models.generateContent({
          model: model,
          contents: prompt,
        });

        console.log(
          `Gemini success with: ${model}`
        );

        return response.text.trim();
      } catch (error) {
        lastError = error;

        console.error(
          `Gemini failed: ${model} | Attempt: ${attempt} | Status: ${
            error.status || "unknown"
          }`
        );

        // Wait before retry
        if (attempt === 1) {
          await new Promise((resolve) =>
            setTimeout(resolve, 1500)
          );
        }
      }
    }
  }

  throw lastError;
}

// --------------------------------------------------
// AI FINANCIAL ANALYSIS
// --------------------------------------------------

app.post("/api/analyze-finance", async (req, res) => {
  try {
    const {
      revenue,
      expenses,
      cashBalance,
      transactions,
    } = req.body;

    // Validate input
    if (
      revenue === undefined ||
      expenses === undefined ||
      cashBalance === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Revenue, expenses and cash balance are required.",
      });
    }

    // ------------------------------------------------
    // GEMINI PROMPT
    // ------------------------------------------------

    const prompt = `
You are FinanceAI, an AI financial analysis assistant.

Analyze the following business financial data.

Total Revenue: ₹${revenue}
Total Expenses: ₹${expenses}
Cash Balance: ₹${cashBalance}

Transactions:
${JSON.stringify(
  transactions || [],
  null,
  2
)}

Calculate and explain:

1. Net profit
2. Profit margin
3. Expense ratio
4. Cash position
5. Financial risk level
6. Three important financial insights
7. Three practical cost-saving or improvement recommendations

Return ONLY valid JSON.

Use exactly this structure:

{
  "netProfit": 0,
  "profitMargin": 0,
  "expenseRatio": 0,
  "riskLevel": "Low",
  "summary": "",
  "insights": [
    "",
    "",
    ""
  ],
  "recommendations": [
    "",
    "",
    ""
  ]
}

Rules:

- netProfit must be a number.
- profitMargin must be a percentage number.
- expenseRatio must be a percentage number.
- riskLevel must be exactly one of:
  Low
  Medium
  High
- insights must contain exactly 3 items.
- recommendations must contain exactly 3 items.
- summary must be a short financial summary.
- Do not use markdown.
- Do not use code fences.
- Return JSON only.
`;

    // ------------------------------------------------
    // CALL GEMINI
    // ------------------------------------------------

    const text =
      await generateFinanceAnalysis(prompt);

    console.log("AI Response:", text);

    // ------------------------------------------------
    // PARSE JSON
    // ------------------------------------------------

    let analysis;

    try {
      analysis = JSON.parse(text);
    } catch (parseError) {
      console.error(
        "AI JSON parsing failed:",
        text
      );

      return res.status(500).json({
        success: false,
        message:
          "AI returned an invalid response.",
      });
    }

    // ------------------------------------------------
    // SEND RESULT TO FRONTEND
    // ------------------------------------------------

    res.json({
      success: true,
      analysis: analysis,
    });

  } catch (error) {
    console.error(
      "Finance AI Error:",
      error
    );

    res.status(503).json({
      success: false,
      message:
        "Gemini AI is temporarily unavailable. Please try again.",
      error: error.message,
    });
  }
});

// --------------------------------------------------
// START SERVER
// --------------------------------------------------

app.listen(PORT, () => {
  console.log(
    `FinanceAI backend running on http://localhost:${PORT}`
  );
});