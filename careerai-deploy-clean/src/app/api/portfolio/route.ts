import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { sourceResume } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an expert web designer and copywriter. Convert the following resume into a JSON payload representing a personal portfolio website.
    
    Resume:
    ${sourceResume}
    
    Respond STRICTLY with valid JSON containing:
    { "name": string, "title": string, "shortBio": string, "projects": [{ "title": string, "description": string }] }
    Do not include any markdown formatting or \`\`\`json blocks. Just the raw JSON.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanJson = text.replace(/```json|```/gi, "").trim();
    const data = JSON.parse(cleanJson);

    return NextResponse.json(data);
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
