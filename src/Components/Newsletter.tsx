"use client";

import React, { useState } from "react";
import { FiMail, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    // Trim input values
    const cleanEmail = email.trim();

    // 1. Basic empty validation Check
    if (!cleanEmail) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // 2. Comprehensive Email Regex RFC 5322 Standard Check
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(cleanEmail)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address format (e.g., name@domain.com).");
      return;
    }

    // Mock API success action
    setStatus("success");
    setErrorMessage("");
    setEmail("");
  };

  return (
    <section className="w-full max-w-5xl mx-auto py-12 px-4">
      {/* Premium Dark Glass Card Container */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-slate-900/80 backdrop-blur-xl text-slate-100 p-8 sm:p-12 lg:p-16 border border-slate-700/60 shadow-2xl shadow-black/40">
        {/* Subtle Decorative Architectural Grid Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.04),transparent_45%)]" />

        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
          {/* Typography Heading Info */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
              Stay Updated
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-4xl text-white">
              Accelerate Your Engineering Journey
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto leading-relaxed">
              Get modular code architectures, deployment masterclasses, and framework deep-dives delivered straight to your inbox.
            </p>
          </div>

          {/* Form Processing Module */}
          <form onSubmit={handleSubscribe} className="w-full max-w-md mx-auto space-y-3" noValidate>
            <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 w-full">
              {/* Input Interactive Element Wrapper */}
              <div className="relative flex-grow group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors duration-200">
                  <FiMail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder="Enter your professional email"
                  className={`w-full pl-11 pr-4 py-3 bg-slate-800/60 backdrop-blur-sm border text-slate-100 placeholder-slate-500 text-sm rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                    status === "error"
                      ? "border-rose-500/60 focus:ring-rose-500/20"
                      : "border-slate-700/70 focus:border-blue-500/50 focus:ring-blue-500/20"
                  }`}
                />
              </div>

              {/* Action Button Element */}
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] text-white font-bold text-sm rounded-xl tracking-wide shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300 whitespace-nowrap border-none"
              >
                Subscribe Now
              </button>
            </div>

            {/* Validation Notification UI Overlay Components */}
            <div className="min-h-[24px] transition-all duration-300">
              {status === "error" && (
                <div className="flex items-center gap-1.5 justify-center text-xs text-rose-400 font-medium animate-fadeIn">
                  <FiAlertCircle className="flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {status === "success" && (
                <div className="flex items-center gap-1.5 justify-center text-xs text-emerald-400 font-medium animate-fadeIn">
                  <FiCheckCircle className="flex-shrink-0" />
                  <span>Subscription successful! Welcome aboard our global network.</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}