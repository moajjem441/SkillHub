"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

// 1. TypeScript Interfaces
interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export default function Faq() {
  // 2. Focused Professional Mock Data
  const faqData: FaqItem[] = [
    {
      id: "faq-1",
      question: "Are the course materials updated for Next.js 16 and Turbopack?",
      answer: "Yes, 100%. All architectural guidelines, modular layouts, and optimization steps are thoroughly revised to accommodate the latest Next.js 16 production features, including full Turbopack compiler compatibility.",
    },
    {
      id: "faq-2",
      question: "What hardware setup do I need for the IoT & Embedded Systems track?",
      answer: "For a seamless experience, we recommend having an ESP32 or ESP32-CAM development board, a standard ultrasonic sensor, and basic jumping wires. The curriculum walks you through cloud configuration on platforms like ThingSpeak step-by-step.",
    },
    {
      id: "faq-3",
      question: "How long do I maintain access to the premium repository templates?",
      answer: "Once enrolled, you gain lifetime access to all core curriculum source code repos, full-stack boilerplate structures (Next.js, Tailwind CSS, TypeScript configurations), and future framework upgrades at no extra cost.",
    },
    {
      id: "faq-4",
      question: "Is there support available if I get stuck on a deep learning model?",
      answer: "Absolutely. We offer an integrated developer ecosystem where you can clarify concepts on complex computer vision datasets, modular U-Net layers, or CNN tuning alongside our dedicated engineering mentors.",
    },
  ];
  

  return (
    <section className="w-full max-w-4xl mx-auto py-16 px-4 space-y-12">
      {/* Section Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full border border-blue-200/20">
          Questions & Answers
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
          Got questions about our production-grade technical engineering programs? Find quick answers right here.
        </p>
      </div>

      {/* 3. Accordion List Layout */}
      <div className="space-y-4 w-full text-left">
        {faqData.map((item) => (
          <FaqAccordionItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

// 4. Isolated Accordion Item Component for Independent Smooth Toggling
function FaqAccordionItem({ item }: { item: FaqItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full border border-slate-200/60 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:border-slate-300 dark:hover:border-slate-700">
      {/* Header Button Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 sm:p-6 flex justify-between items-center gap-4 text-left font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base group select-none"
      >
        <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 tracking-tight">
          {item.question}
        </span>
        <span
          className={`p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 transition-all duration-300 ${
            isOpen ? "rotate-180 bg-blue-500/10 text-blue-600 dark:text-blue-400" : ""
          }`}
        >
          <FiChevronDown size={18} />
        </span>
      </button>

      {/* Dynamic Animated Content Panel Container */}
      <div
        className={`transition-all duration-300 ease-in-out grid overflow-hidden ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm leading-relaxed text-slate-500 dark:text-slate-400 border-t border-slate-100/60 dark:border-slate-850/60 pt-4">
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  );
}