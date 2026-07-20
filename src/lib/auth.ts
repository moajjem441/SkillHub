import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";
import { jwt } from "better-auth/plugins";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is missing!");

const client = new MongoClient(uri);
const db = client.db("skillhub");

export const auth = betterAuth({
  // ✅ Better Auth-এর বেস URL (আপনার Next.js অ্যাপের URL)
  url: process.env.BETTER_AUTH_URL || "http://localhost:3000",

  // ✅ সিক্রেট কী (এনভায়রনমেন্ট থেকে নিচ্ছি)
  secret: process.env.BETTER_AUTH_SECRET!,

  // ✅ ডেটাবেস অ্যাডাপ্টার
  database: mongodbAdapter(db),

  // ✅ ইমেইল/পাসওয়ার্ড লগইন সক্রিয়
  emailAndPassword: {
    enabled: true,
  },

  // ✅ সেশন কনফিগারেশন – JWT স্ট্র্যাটেজি ব্যবহার করছি
  session: {
    strategy: "jwt", // 👈 JWT সেশন চালু
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60, // ৭ দিন
    },
  },

  // ✅ প্লাগইন – শুধু একটি অ্যারে
  plugins: [
    admin({
      defaultRole: "user", // নতুন ইউজার ডিফল্ট 'user'
    }),
    // jwt() প্লাগইন দরকার নেই, কারণ session.strategy = "jwt" ই যথেষ্ট
    // কিন্তু আপনি চাইলে jwt() প্লাগইনও ব্যবহার করতে পারেন (কাস্টম ক্লেইম যোগ করতে)
    // jwt(),

    jwt(),
  ],
});