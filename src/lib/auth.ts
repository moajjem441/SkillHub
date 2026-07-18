import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing in environment variables!");
}

const client = new MongoClient(uri);

// Better-Auth এর জন্য মঙ্গোডিবি ক্লায়েন্ট এবং স্পেসিফিক ডাটাবেজ অবজেক্ট পাস করা
export const auth = betterAuth({
  database: mongodbAdapter(client.db("skillhub")), // 👈 এখানে ডাটাবেজের নাম 'skillhub' বা আপনার পছন্দমতো নাম দিন

  emailAndPassword: { 
    enabled: true, 
  },
});