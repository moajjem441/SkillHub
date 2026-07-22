import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

console.log("✅ Better Auth API route loaded!"); // 👈 এই লাইন যোগ করুন

export const { GET, POST } = toNextJsHandler(auth);