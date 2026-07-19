import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins"; // 👈 অ্যাডমিন প্লাগইন ইম্পোর্ট করুন

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing in environment variables!");
}

const client = new MongoClient(uri);
const db = client.db("skillhub");

export const auth = betterAuth({
  
  database: mongodbAdapter(db), 

  emailAndPassword: { 
    enabled: true, 
  },


  plugins: [
    admin({
      
      defaultRole: "user", 
    })
  ],
});