import React from "react";
import LoginForm from "@/Components/LoginForm";

export const metadata = {
  title: "Log In | SkillHub",
  description: "Log in to your SkillHub account and continue your learning journey.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 flex items-center justify-center selection:bg-blue-500 selection:text-white">
      <LoginForm />
    </main>
  );
}