import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { jobDescription, currentExperience } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an expert ATS resume writer. Format the resume explicitly with SUMMARY, EXPERIENCE, and SKILLS sections.
    
    Optimize this experience:
    ${currentExperience}
    
    For this job description:
    ${jobDescription}
    
    Return the resume in clean markdown.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ result: text || "Synthesis failed to generate content." });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
