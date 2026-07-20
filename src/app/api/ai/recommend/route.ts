// app/api/ai/recommend/route.ts
import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
  // ✅ allCourses ও history বাইরে ডিক্লেয়ার করুন, যাতে catch-এ অ্যাক্সেস পাওয়া যায়
  let allCourses: any[] = [];
  let history: any[] = [];

  try {
    const body = await request.json();
    history = body.history || [];
    allCourses = body.allCourses || [];

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
    const mostViewedCategory =
      categories.sort(
        (a: string, b: string) =>
          categories.filter((v: string) => v === a).length -
          categories.filter((v: string) => v === b).length
      ).pop() || "Any";

    const mostViewedLevel =
      levels.sort(
        (a: string, b: string) =>
          levels.filter((v: string) => v === a).length -
          levels.filter((v: string) => v === b).length
      ).pop() || "Any";

    // AI প্রম্পট
    const prompt = `
      Based on the user's viewing history, suggest 3-4 courses they might like.
      
      User's preferred category: "${mostViewedCategory}"
      User's preferred level: "${mostViewedLevel}"
      Recent courses viewed: ${history
        .slice(0, 5)
        .map((h: any) => h.title)
        .join(", ")}

      Available courses (choose from these only):
      ${allCourses
        .map(
          (c: any) =>
            `- ${c.title} (${c.category}, ${c.level}, rating: ${c.rating})`
        )
        .join("\n")}

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
    // ✅ fallback হিসাবে allCourses-এর প্রথম ৩টি কোর্স দিন (যদি থাকে)
    const fallback = allCourses.length > 0 ? allCourses.slice(0, 3) : [];
    return NextResponse.json({ success: true, data: fallback }, { status: 200 });
  }
}