// app/api/checkout_sessions/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // apiVersion কমেন্ট করে দিন, Stripe নিজে ডিফল্ট নেবে
});

export async function POST(req: Request) {
  try {
    const { title, price, imageUrl, id, userId } = await req.json();

    // 🧪 ডিবাগ লগ (ঐচ্ছিক)
    console.log("📦 Received:", { title, price, id, userId });

    if (!title || !price || !id || !userId) {
      return NextResponse.json(
        { error: "Missing required course data" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: title,
              images: imageUrl ? [imageUrl] : [],
              metadata: { courseId: id, userId },
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: { courseId: id, userId },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses`,
    });

    if (!session.url) {
      throw new Error("Stripe session created but no URL returned.");
    }

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("❌ Stripe Checkout Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}