import React from "react";
import RegisterForm from "@/components/RegisterForm";

export const metadata = {
  title: "Create Your Account | SkillHub",
  description: "Join the SkillHub platform to advance your skills and manage your profile.",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 flex items-center justify-center  selection:bg-blue-500 selection:text-white">
      <RegisterForm />
    </main>
  );
}