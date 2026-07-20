// app/success/page.tsx
import { redirect } from "next/navigation";
import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { MongoClient } from "mongodb";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  // ১. Stripe সেশন রিট্রিভ করুন
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const { status, customer_details, metadata } = session;
  const customerEmail = customer_details?.email || "your email";

  // ২. পেমেন্ট সফল হলে (complete) → এনরোল করুন
  if (status === "complete") {
    const courseId = metadata?.courseId;
    const userId = metadata?.userId;

    if (courseId && userId) {
      try {
        const client = new MongoClient(process.env.MONGODB_URI!);
        await client.connect();
        const db = client.db("skillhub");
        const enrollCollection = db.collection("enrollments");
        const coursesCollection = db.collection("courses");

        // ডুপ্লিকেট চেক
        const existing = await enrollCollection.findOne({ courseId, userId });
        if (!existing) {
          // এনরোল করুন
          await enrollCollection.insertOne({
            courseId,
            userId,
            enrolledAt: new Date(),
            status: "active",
          });

          // কোর্সের enrolledCount বাড়ান
          await coursesCollection.updateOne(
            { id: courseId },
            { $inc: { enrolledCount: 1 } }
          );

          console.log(`✅ (Success Page) User ${userId} enrolled in course ${courseId}`);
        }
      } catch (err) {
        console.error("Enrollment error on success page:", err);
      }
    }
  }

  // ৩. পেমেন্ট open থাকলে হোমে রিডাইরেক্ট
  if (status === "open") {
    return redirect("/");
  }

  // ৪. সফল পেজ রেন্ডার করুন
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/40 text-center space-y-6">
        <div className="mx-auto w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <FiCheckCircle className="w-10 h-10 text-emerald-400" />
        </div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
          Payment Successful! 🎉
        </h1>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          You are now enrolled in the course. A confirmation email will be sent to{" "}
          <span className="text-blue-400 font-medium">{customerEmail}</span>.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/my-courses"
            className="w-full sm:flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
          >
            Go to My Courses <FiArrowRight />
          </Link>
          <Link
            href="/courses"
            className="w-full sm:flex-1 py-3 bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 font-bold rounded-xl border border-slate-700/60 transition-all"
          >
            Browse More Courses
          </Link>
        </div>
        <p className="text-[10px] font-medium text-slate-500">
          If you have any questions, email{" "}
          <a href="mailto:support@skillhub.com" className="text-blue-400 hover:underline">
            support@skillhub.com
          </a>
        </p>
      </div>
    </div>
  );
}