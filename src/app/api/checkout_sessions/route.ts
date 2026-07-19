import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27" as any, // আপনার কারেন্ট স্ট্রাইপ SDK ভার্সন অনুযায়ী (অথবা টাইপ কাস্ট করতে পারেন)
});

export async function POST(req: Request) {
  try {
    // 🔄 ফ্রন্টএন্ড থেকে ডাইনামিক কোর্সের ডিটেইলস রিসিভ করা হচ্ছে
    const { title, price, imageUrl, id } = await req.json();

    // ১. ভ্যালিডেশন চেক
    if (!title || !price) {
      return NextResponse.json({ error: "Missing required course data" }, { status: 400 });
    }

    // ২. ডাইনামিক প্রাইস ডাটা দিয়ে সেশন ক্রিয়েট
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          // 💡 price_id এর বদলে price_data ব্যবহার করে সরাসরি প্রোডাক্ট ডিফাইন করা
          price_data: {
            currency: "usd", // আপনার কারেন্সি (যেমন: usd, bdt)
            product_data: {
              name: title, // কোর্সের নাম
              images: imageUrl ? [imageUrl] : [], // কোর্সের ব্যানার ইমেজ
              metadata: {
                courseId: id, // ডাটাবেজের কোর্স আইডি ট্র্যাকিংয়ের জন্য
              },
            },
            unit_amount: price * 100, // স্ট্রাইপ সেন্ট (cents) হিসাব করে, তাই $৯৯ হলে ৯৯০০ পাঠাতে হবে
          },
          quantity: 1,
        },
      ],
      mode: "payment", 
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}&courseId=${id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}