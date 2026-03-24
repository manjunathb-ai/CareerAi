import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini AI SDK with the provided API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface ChatMessage {
  role: string;
  content: string;
}

/**
 * AI Interview Coach Backend:
 * Acts as a professional technical and behavioral interviewer.
 * Uses high-performance Gemini-1.5-Flash (or current best available flash model)
 * to provide real-time, context-aware feedback and follow-up questions.
 */
export async function POST(req: Request) {
  try {
    const { history, userMessage, persona = "Professional" } = await req.json();

    // Use gemini-1.5-flash for speed and lower latency during live conversation
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Sanitize and format chat history for the Gemini standard
    const chatHistory = history.map((msg: ChatMessage) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    /**
     * Persona Scopes:
     * - Professional: Balanced, standard corporate interview.
     * - Critical: Focuses on edge cases and deep technical vetting.
     * - Friendly: Encouraging tone for junior or culture-fit prep.
     */
    const systemInstruction = `You are CareerAI, a sophisticated tech recruiter from a top-tier firm.
    Current Persona: ${persona}.
    
    Guidelines:
    1. Conduct a realistic technical and behavioral interview.
    2. Keep responses concise (max 3 sentences) to maintain a fast-paced "live" feel.
    3. Ask exactly one follow-up question at a time.
    4. Provide subtle constructive feedback if the user's answer is weak.
    5. Maintain a professional, high-stakes atmosphere.`;

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemInstruction }] },
        { role: "model", parts: [{ text: "System calibrated. I am ready to begin the interview." }] },
        ...chatHistory
      ],
    });

    /**
     * Safe Content Synthesis:
     * Sends the user's latest message and extracts the synthesized response.
     */
    const result = await chat.sendMessage(userMessage);
    const text = result.response.text();

    return NextResponse.json({ 
      result: text,
      metadata: {
        tokensUsed: result.response.usageMetadata?.totalTokenCount,
        personaActive: persona
      }
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("AI Coach Engine Error:", error);
    return NextResponse.json({ error: "The AI Coach encountered a network disturbance. Please retry." }, { status: 500 });
  }
}
