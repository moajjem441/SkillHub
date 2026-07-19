// app/api/ai/generate-course/route.ts
import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { title, category, level } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: "Course title is required." },
        { status: 400 }
      );
    }

    const prompt = `
      You are an expert course curriculum designer.
      Based on the course title: "${title}", category: "${category}", and level: "${level}",
      generate the following details for a professional online course:

      1. A compelling course description (at least 30 words, professional tone).
      2. A realistic duration (e.g., "8 Weeks", "10 Weeks").
      3. A reasonable number of lessons (between 10 and 60).
      4. A list of 5 key learning outcomes or features.
      5. A suggested price in USD (between $20 and $200, based on course depth and market value).

      Return ONLY a valid JSON object in this exact format:
      {
        "description": "string",
        "duration": "string",
        "lessons": number,
        "features": ["string", "string", "string", "string", "string"],
        "price": number
      }
    `;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are a helpful assistant that only returns valid JSON." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content || "";

    // JSON ক্লিন করুন
    let cleanContent = content;
    if (content.includes('```json')) {
      cleanContent = content.split('```json')[1].split('```')[0].trim();
    } else if (content.includes('```')) {
      cleanContent = content.split('```')[1].split('```')[0].trim();
    }

    const data = JSON.parse(cleanContent);

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error("Groq API Error Details:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate course content." },
      { status: 500 }
    );
  }
}