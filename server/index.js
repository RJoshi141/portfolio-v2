import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Profile context for Ritika - UPDATE THIS WITH YOUR INFORMATION
const RITIKA_PROFILE_CONTEXT = `
Ritika Joshi is a Full-Stack Developer & Tech-Creative based in San Francisco, CA.

**Current Role:**
- Full Stack App Developer at Joydrop (Sep '25 – Present)
  - Building a full-stack platform using Next.js, Nest.js, and Firebase
  - Optimizing frontend and backend performance, improving responsiveness by ~30%
  - Integrating AI-powered text generation features using LLMs
  - Contributing to UI/UX improvements for accessibility and user retention

**Previous Experience:**
- UI/UX Web Developer at Bright Mind Enrichment (Sep '24 – Jul '25)
  - Developed donation pages, improving conversions by 20%
  - Optimized site responsiveness and load times by 30%
  - Accelerated backend performance, cutting API response times by 35%

- Full Stack Developer at Toyota – Production Control (May '23 – Aug '23)
  - Reduced manual errors by 20% with SQL pipelines
  - Improved process scalability by 30% with MS Azure automation
  - Cut manual reporting efforts by 40% with Power BI dashboards

- UI Process Engineer at BECO Ventures, Singapore (Sep '22 – Dec '22)
  - Enabled real-time monitoring of 10K+ greenhouse sensor readings
  - Increased user efficiency by 40% with interactive dashboards
  - Improved product reliability with 99.9% AWS uptime

- Data Analyst at P&G – UC Simulation Center (Jan '22 – Apr '22)
  - Designed automated analytics with Excel VBA + REST APIs
  - Produced Power BI dashboards improving decision-making speed by 25%

- CS Intern at Kroger – Virtual Innovation Studio (Jan '20 – Apr '20)
  - Increased customer engagement by 15% and retention by 10%
  - Improved accessibility for 500K+ users

**Tech Stack:**
TypeScript, JavaScript (ES6+), React, Angular, Next.js, Nest.js, Node.js, Firebase, Python, Swift, C++, PostgreSQL, SQL, GraphQL, MongoDB, AWS, Docker, Vercel, Tailwind CSS, LLMs

**Notable Projects:**
- Zoomies: Retro 2D endless runner built with SpriteKit + Swift
- Cinemate: Movie discovery and tracking app with personalized recommendations (React, TypeScript, Tailwind CSS, TMDB API)
- EventReady: Full-stack event management web app with goal tracking and budget planning (Django, React, MUI)
- Taskly: Clean, minimal to-do list iOS app built with SwiftUI and SwiftData
- Reddit Clone: Reddit-style site with post creation, upvoting, and comments (React, Node.js, MongoDB, Express)
- SkyCast: Weather app with real-time forecasts (React, Tailwind CSS, Weather API)
- KroDash: Flask-based data dashboard for Kroger (Flask, SQLAlchemy, Azure, PostgreSQL)

**Education & Interests:**
Based in San Francisco, Ritika enjoys combining design and engineering to build experiences that feel joyful, accessible, and human. She loves building products that balance technical precision with thoughtful design.
`;

// System prompt for the AI assistant
const SYSTEM_PROMPT = `You are an AI assistant that speaks on behalf of Ritika Joshi, a software engineer and designer. You only answer questions about Ritika's background, skills, projects, interests, and work style. Be concise, friendly, and clear. If the user asks about anything unrelated (politics, math problems, random trivia, etc.), gently redirect them back to questions about Ritika and her work.

Here is information about Ritika:

${RITIKA_PROFILE_CONTEXT}

Always be helpful and conversational, but stay focused on Ritika's professional background and work.`;

// API endpoint
app.post("/api/ritika-assistant", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: "Invalid request. 'messages' array is required.",
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not set");
      return res.status(500).json({
        reply:
          "Sorry, the AI assistant is not configured properly. Please contact the site administrator.",
      });
    }

    // Prepare messages for OpenAI (include system prompt)
    const openaiMessages = [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      ...messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Using gpt-4o-mini for cost efficiency, can be changed to gpt-4 or gpt-3.5-turbo
      messages: openaiMessages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

    res.json({ reply });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);

    // Handle specific OpenAI errors
    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        return res.status(500).json({
          reply:
            "Sorry, there's an authentication issue with the AI service. Please try again later.",
        });
      }
      if (error.status === 429) {
        return res.status(500).json({
          reply:
            "Sorry, the AI service is currently rate-limited. Please try again in a moment.",
        });
      }
    }

    // Generic error response
    res.status(500).json({
      reply:
        "Sorry, something went wrong while I was trying to respond. Please try again in a bit.",
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "ritika-assistant-api" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Ritika's AI Assistant API running on http://localhost:${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/health`);
  if (!process.env.OPENAI_API_KEY) {
    console.warn("⚠️  WARNING: OPENAI_API_KEY is not set. The API will not work properly.");
  }
});

