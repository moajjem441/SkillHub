"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FiStar, FiUser, FiLayers, FiClock, FiVideo, 
  FiSmartphone, FiAward, FiCheckCircle, FiBookOpen, 
  FiShield, FiArrowRight 
} from "react-icons/fi";

interface ViewCoursesProps {
  courseId: string;
}

export default function ViewCourses({ courseId }: ViewCoursesProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "curriculum">("overview");

  // Dynamic Content Data Set
  const courseData = {
    id: courseId,
    title: "Complete Next.js Enterprise Starter Guide (v16+)",
    subtitle: "Architect production-scale Next.js systems using Turbopack, advanced parallel routing, rigid TypeScript frameworks, and dynamic caching configurations.",
    instructor: "Moajjem Hossain",
    instructorRole: "Enterprise Software Engineer & Architecture Lead",
    rating: 4.9,
    reviewsCount: 482,
    price: 99,
    originalPrice: 199,
    category: "Web Development",
    level: "Advanced",
    duration: "42 Hours",
    lectures: 148,
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=400&q=80"
    ],
    features: [
      "Full access to standard boilerplate architectures",
      "Production deployment pipelines configurations (Vercel/AWS)",
      "Rigid security modules (IAM, validation, iron-session)",
      "Real-world capstone enterprise engine development",
      "Direct code-review access pipelines"
    ],
    curriculum: [
      { chapter: "Module 1: Caching Engine & Server Component Internals", duration: "8.5 hrs" },
      { chapter: "Module 2: Turbopack Pipelines & Monorepo Scaling Structures", duration: "10 hrs" },
      { chapter: "Module 3: Advanced IAM Middleware & Cryptographic Session Validation", duration: "12 hrs" },
      { chapter: "Module 4: Global Performance Audits & Edge Network Deployments", duration: "11.5 hrs" }
    ],
    related: [
      {
        id: "react-core",
        title: "React Core Internals & Advanced State Architecture",
        instructor: "Dan Abramov",
        rating: 4.9,
        price: 79,
        imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "tailwind-ui",
        title: "Tailwind CSS Production UI Systems & Engineering",
        instructor: "Adam Wathan",
        rating: 4.8,
        price: 49,
        imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80"
      }
    ]
  };

  return (
    <div className="w-full text-slate-100 pb-20">
      
      {/* ১. BANNER (HERO SECTION) - ফুল-উইথ ও সেন্টার অ্যালাইনড */}
      <section className="w-full max-w-7xl mx-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-12 md:py-20 px-4 border-b border-slate-700/60">
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8 items-center text-center">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2.5 justify-center">
              <span className="text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full">
                {courseData.category}
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest bg-slate-800/80 text-blue-400 border border-slate-700/60 px-3 py-1 rounded-full">
                {courseData.level}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {courseData.title}
            </h1>
            <p className="text-slate-400 text-sm md:text-base font-medium max-w-3xl mx-auto leading-relaxed">
              {courseData.subtitle}
            </p>
            
            {/* RATING */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm pt-2">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <FiStar className="fill-current" />
                <span>{courseData.rating.toFixed(1)}</span>
                <span className="text-slate-400 font-normal">({courseData.reviewsCount} verified reviews)</span>
              </div>
              <div className="text-slate-600 hidden md:inline">|</div>
              <div className="flex items-center gap-1 text-slate-300">
                <FiUser className="text-blue-400" />
                <span>By <span className="font-semibold underline decoration-blue-400">{courseData.instructor}</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 relative items-start">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* ২. GALLERY */}
          <section className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              System Environment Gallery
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-3 md:col-span-2 h-64 md:h-80 rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl shadow-black/20 bg-slate-800">
                <img src={courseData.gallery[0]} alt="Primary Landscape Context" className="w-full h-full object-cover" />
              </div>
              <div className="col-span-3 md:col-span-1 grid grid-cols-2 md:grid-cols-1 gap-3">
                <div className="h-32 md:h-[154px] rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl shadow-black/20 bg-slate-800">
                  <img src={courseData.gallery[1]} alt="Environment Mock 1" className="w-full h-full object-cover" />
                </div>
                <div className="h-32 md:h-[154px] rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl shadow-black/20 bg-slate-800">
                  <img src={courseData.gallery[2]} alt="Environment Mock 2" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </section>

          {/* TAB SYSTEM */}
          <div className="border-b border-slate-700/60 flex gap-6 text-sm">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-3 font-bold uppercase tracking-wide transition-all border-b-2 bg-transparent cursor-pointer ${
                activeTab === "overview" ? "border-blue-400 text-blue-400" : "border-transparent text-slate-400 hover:text-slate-300"
              }`}
            >
              Overview & Specs
            </button>
            <button
              onClick={() => setActiveTab("curriculum")}
              className={`pb-3 font-bold uppercase tracking-wide transition-all border-b-2 bg-transparent cursor-pointer ${
                activeTab === "curriculum" ? "border-blue-400 text-blue-400" : "border-transparent text-slate-400 hover:text-slate-300"
              }`}
            >
              Syllabus Blueprint
            </button>
          </div>

          {/* DYNAMIC CONTENT SWITCHES */}
          <div className="w-full">
            {activeTab === "overview" ? (
              <div className="space-y-8">
                {/* ৩. DESCRIPTION */}
                <article className="space-y-3">
                  <h2 className="text-xl font-extrabold tracking-tight text-white">Program Architecture Blueprint</h2>
                  <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                    This deep-dive architectural syllabus focuses on scaling robust enterprise architectures utilizing modern framework mechanisms. We avoid high-level basic abstractions, navigating straight into core internal file systems, multi-tiered security layer validation engines, and custom caching configurations.
                  </p>
                </article>

                {/* ৪. COURSE FEATURES */}
                <section className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6 space-y-4 shadow-xl shadow-black/40">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <FiLayers className="text-blue-400" /> Embedded Structural Deliverables
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {courseData.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <FiCheckCircle className="text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* ৫. INSTRUCTOR INFO */}
                <section className="border-t border-slate-700/60 pt-8 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Lead System Architect
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-slate-900/50 backdrop-blur-sm p-5 rounded-2xl border border-slate-700/60 shadow-xl shadow-black/20">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-blue-500/30 border-2 border-slate-700/60 flex-shrink-0">
                      {courseData.instructor.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-black text-white">{courseData.instructor}</h4>
                      <p className="text-xs text-blue-400 font-bold">{courseData.instructorRole}</p>
                      <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                        Specializes in full-stack next-gen deployment modules, distributed computing matrices, and deep-learning pipeline architectures.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            ) : (
              /* CURRICULUM SYLLABUS LAYOUT */
              <div className="space-y-3">
                {courseData.curriculum.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 bg-slate-900/80 backdrop-blur-sm border border-slate-700/60 rounded-xl shadow-lg shadow-black/20 hover:border-blue-500/50 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <FiBookOpen className="text-blue-400 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-bold tracking-tight text-white">{item.chapter}</span>
                    </div>
                    <span className="text-[10px] md:text-xs font-extrabold bg-slate-800/60 px-2.5 py-1 rounded-md text-slate-400">{item.duration}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR PANEL: ৬. PRICE & FEATURES ACCREDITATION */}
        <aside className="w-full lg:sticky lg:top-6 bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6 shadow-2xl shadow-black/40 space-y-6">
          <div className="space-y-1 border-b border-slate-700/60 pb-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">Single Purchase Value</span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-white">${courseData.price}</span>
              <span className="text-sm font-medium line-through text-slate-500">${courseData.originalPrice}</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/30">50% OFF</span>
            </div>
          </div>

          {/* Micro-Features Metadata */}
          <div className="space-y-3 text-xs font-semibold text-slate-400">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2"><FiClock className="text-blue-400" /> Runtime Scope</span>
              <span className="text-white font-bold">{courseData.duration}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2"><FiVideo className="text-blue-400" /> Lectures Breakdown</span>
              <span className="text-white font-bold">{courseData.lectures} Units</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2"><FiSmartphone className="text-blue-400" /> Access Protocol</span>
              <span className="text-white font-bold">Mobile / Desktop</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2"><FiAward className="text-blue-400" /> Accreditation</span>
              <span className="text-white font-bold">Crypto-Badge Verification</span>
            </div>
          </div>

          <button type="button" className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer border-none active:scale-[0.98]">
            Initialize Purchase <FiArrowRight />
          </button>
          
          <div className="text-[10px] font-medium text-slate-500 text-center flex items-center justify-center gap-1.5">
            <FiShield className="text-blue-400" /> 30-Day Automated Micro-Refund Standard Secure Link
          </div>
        </aside>
      </div>

      {/* ৭. RELATED COURSES */}
      <section className="max-w-7xl mx-auto px-4 mt-16 pt-10 border-t border-slate-700/60 space-y-6">
        <div className="space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400">Synergistic Paths</h3>
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
            Explore Interconnected Ecosystem Programs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courseData.related.map((relCourse) => (
            <Link 
              href={`/courses/${relCourse.id}`}
              key={relCourse.id} 
              className="border border-slate-700/60 hover:border-blue-500/50 bg-slate-900/80 backdrop-blur-xl rounded-xl p-4 flex gap-4 shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0 border border-slate-700/60">
                <img src={relCourse.imageUrl} alt={relCourse.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="flex flex-col justify-between py-1 flex-1">
                <div className="space-y-1">
                  <h4 className="text-xs md:text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-blue-400 transition-colors">
                    {relCourse.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">By {relCourse.instructor}</p>
                </div>
                <div className="flex items-center justify-between gap-2 mt-2">
                  <div className="flex items-center gap-1 text-[11px] text-amber-400 font-bold">
                    <FiStar className="fill-current" />
                    <span>{relCourse.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-sm font-black text-white">${relCourse.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}