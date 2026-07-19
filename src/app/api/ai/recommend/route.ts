// app/api/ai/recommend/route.ts
import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { history, allCourses } = await request.json();

    if (!history || history.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        message: "No history found. Explore some courses first!",
      });
    }

    // ইউজারের পছন্দের ক্যাটাগরি ও লেভেল বের করুন
    const categories = history.map((h: any) => h.category);
    const levels = history.map((h: any) => h.level);
    const mostViewedCategory = categories.sort((a: string, b: string) =>
      categories.filter((v: string) => v === a).length -
      categories.filter((v: string) => v === b).length
    ).pop();

    const mostViewedLevel = levels.sort((a: string, b: string) =>
      levels.filter((v: string) => v === a).length -
      levels.filter((v: string) => v === b).length
    ).pop();

    // AI-কে প্রম্পট দিন
    const prompt = `
      Based on the user's viewing history, suggest 3-4 courses they might like.
      
      User's preferred category: "${mostViewedCategory || 'Any'}"
      User's preferred level: "${mostViewedLevel || 'Any'}"
      Recent courses viewed: ${history.slice(0, 5).map((h: any) => h.title).join(", ")}

      Available courses (choose from these only):
      ${allCourses.map((c: any) => `- ${c.title} (${c.category}, ${c.level}, rating: ${c.rating})`).join("\n")}

      Return ONLY a JSON array of course IDs (from the available courses) that best match the user's interests.
      Example: ["c-1", "c-3", "c-5"]
    `;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are a recommendation engine. Return only a JSON array of course IDs." },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
    });

    const content = completion.choices[0]?.message?.content || "[]";
    const cleanContent = content.replace(/```json/g, "").replace(/```/g, "").trim();
    const recommendedIds = JSON.parse(cleanContent);

    // রেকমেন্ডেড কোর্সগুলো ফিল্টার করুন
    const recommendedCourses = allCourses.filter((c: any) =>
      recommendedIds.includes(c.id || c._id)
    );

    return NextResponse.json({ success: true, data: recommendedCourses }, { status: 200 });
  } catch (error: any) {
    console.error("Recommendation API Error:", error);
    // ব্যর্থ হলে র্যান্ডম ৩টি কোর্স সুপারিশ করুন
    const fallback = allCourses.slice(0, 3);
    return NextResponse.json({ success: true, data: fallback }, { status: 200 });
  }
}