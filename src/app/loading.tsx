"use client";

import { Spinner } from "@heroui/react";

export default function GlobalLoading() {
  return (
    <div className="flex min-h-[75vh] w-full flex-col items-center justify-center gap-4 px-4 bg-slate-900">
      <div className="flex flex-col items-center justify-center p-8 rounded-3xl border border-slate-700/60 bg-slate-900/80 backdrop-blur-sm max-w-xs w-full shadow-2xl shadow-black/40">
        {/* ✅ HeroUI Spinner – color "current" ব্যবহার করুন */}
        <Spinner 
          color="current"   // primary → current (বা আপনি "accent" ব্যবহার করতে পারেন)
          size="lg" 
          className="scale-110 text-blue-400" // রং কাস্টমাইজ করতে চাইলে
        />
        
        {/* Subtle Supporting Label */}
        <div className="mt-4 text-center space-y-1">
          <p className="text-sm font-semibold tracking-wide text-white animate-pulse">
            Loading SkillHub...
          </p>
          <p className="text-xs text-slate-400">
            Fetching secure platform assets
          </p>
        </div>
      </div>
    </div>
  );
}