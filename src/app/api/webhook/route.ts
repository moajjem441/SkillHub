import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb"; // আপনার MongoDB সংযোগ

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event;

  try {
    // 🔐 Webhook সিক্রেট দিয়ে ইভেন্ট ভেরিফাই করুন
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // ✅ পেমেন্ট সফল হলে
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const courseId = session.metadata?.courseId;
    const userId = session.metadata?.userId;

    if (!courseId || !userId) {
      console.error("Missing metadata: courseId or userId");
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    try {
      // 📌 MongoDB-তে এনরোলমেন্ট সেভ করুন
      const db = await connectDB();
      const enrollCollection = db.collection("enrollments");
      const coursesCollection = db.collection("courses");

      // ১. ইতিমধ্যে এনরোল আছে কিনা চেক করুন
      const existing = await enrollCollection.findOne({ courseId, userId });
      if (existing) {
        console.log("User already enrolled.");
        return NextResponse.json({ received: true });
      }

      // ২. এনরোলমেন্ট সেভ করুন
      await enrollCollection.insertOne({
        courseId,
        userId,
        enrolledAt: new Date(),
        status: "active",
      });

      // ৩. কোর্সের enrolledCount বাড়ান
      await coursesCollection.updateOne(
        { id: courseId },
        { $inc: { enrolledCount: 1 } }
      );

      console.log(`✅ User ${userId} enrolled in course ${courseId}`);
    } catch (err) {
      console.error("Database error in webhook:", err);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}