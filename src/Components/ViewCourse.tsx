"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { 
  FiStar, FiUser, FiLayers, FiClock, FiVideo, 
  FiSmartphone, FiAward, FiCheckCircle, FiBookOpen, 
  FiShield, FiArrowRight, FiLogIn 
} from "react-icons/fi";

// 🎯 TypeScript Interface for Course Data
interface CourseData {
  id: string;
  title: string;
  subtitle: string;
  instructor: string;
  instructorRole: string;
  rating: number;
  reviewsCount: number;
  price: number;
  originalPrice: number;
  category: string;
  level: string;
  duration: string;
  lectures: number;
  gallery: string[];
  features: string[];
  curriculum: { chapter: string; duration: string }[];
  related: any[];
}

interface ViewCoursesProps {
  courseData: CourseData;
}

export default function ViewCourses({ courseData }: ViewCoursesProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "curriculum">("overview");
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [checkingEnrollment, setCheckingEnrollment] = useState(true);
  const router = useRouter();

  // Better Auth session
  const { data: session, isPending } = authClient.useSession();

  // 🔍 চেক করা – ইউজার ইতিমধ্যে এনরোল করেছে কিনা
  useEffect(() => {
    const checkEnrollment = async () => {
      if (!session?.user?.id) {
        setCheckingEnrollment(false);
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/check-enrollment?courseId=${courseData.id}&userId=${session.user.id}`
        );
        const data = await res.json();
        if (data.success) {
          setIsEnrolled(data.enrolled);
        }
      } catch (error) {
        console.error("Error checking enrollment:", error);
      } finally {
        setCheckingEnrollment(false);
      }
    };

    checkEnrollment();
  }, [session, courseData.id]);




  // 🔥 Enroll Handler (Stripe Payment) – আপডেটেড ভার্সন
  const handleEnroll = async () => {
    // 1️⃣ লগইন চেক
    if (!session) {
      toast.error("Please login to enroll.", { duration: 4000 });
      router.push("/login");
      return;
    }

    // 2️⃣ অ্যাডমিন চেক
    if (session.user.role === "admin") {
      toast.error("Admins cannot enroll.", { duration: 4000 });
      return;
    }

    setEnrolling(true);
    const loadingToast = toast.loading("Preparing checkout...");

    try {
      const payload = {
        title: courseData.title,
        price: courseData.price,
        imageUrl: courseData.gallery[0],
        id: courseData.id,
        userId: session.user.id,
      };

      console.log("📦 Sending to /api/checkout_sessions:", payload);

      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("📨 Response from API:", data);

      if (!response.ok) {
        throw new Error(data.error || data.message || "Checkout initialization failed");
      }

      if (!data.url) {
        throw new Error("No checkout URL received from server.");
      }

      // ✅ Stripe Checkout-এ রিডাইরেক্ট
      window.location.href = data.url;
    } catch (error: any) {
      console.error("❌ Enroll error:", error);
      toast.error(error.message || "Something went wrong", {
        id: loadingToast,
        duration: 5000,
      });
    } finally {
      setEnrolling(false);
    }
  };




  // 🔥 Enroll Handler (Direct Enrollment – No Payment)
// const handleEnroll = async () => {
//   // 1️⃣ লগইন চেক
//   if (!session) {
//     toast.error("Please login to enroll.", { duration: 4000 });
//     router.push("/login");
//     return;
//   }

//   // 2️⃣ অ্যাডমিন চেক
//   if (session.user.role === "admin") {
//     toast.error("Admins cannot enroll.", { duration: 4000 });
//     return;
//   }

//   setEnrolling(true);
//   const loadingToast = toast.loading("Enrolling...");

//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/enroll`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         userId: session.user.id,
//         courseId: courseData.id,
//       }),
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       throw new Error(result.message || result.error || "Enrollment failed");
//     }

//     // ✅ সফল হলে UI আপডেট
//     setIsEnrolled(true);
//     toast.success("Successfully enrolled! 🎉", {
//       id: loadingToast,
//       duration: 4000,
//     });
//   } catch (error: any) {
//     console.error("Enroll error:", error);
//     toast.error(error.message || "Failed to enroll.", {
//       id: loadingToast,
//       duration: 5000,
//     });
//   } finally {
//     setEnrolling(false);
//   }
// };





  // 🟢 বাটন রেন্ডার করার ফাংশন (অ্যাডমিন চেক সহ)
  const renderEnrollButton = () => {
    // ⛔ অ্যাডমিন হলে বাটন ডিজেবল করে দিন
    if (session?.user?.role === "admin") {
      return (
        <button
          disabled
          className="w-full py-3 bg-slate-700/50 text-slate-400 font-bold rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
        >
          <FiShield className="text-slate-500" size={18} />
          Admin cannot enroll
        </button>
      );
    }

    if (checkingEnrollment) {
      return (
        <button
          disabled
          className="w-full py-3 bg-slate-700/50 text-slate-400 font-bold rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span className="animate-spin">⏳</span> Checking...
        </button>
      );
    }

    if (isEnrolled) {
      return (
        <button
          disabled
          className="w-full py-3 bg-slate-700/60 text-slate-300 font-bold rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
        >
          <FiCheckCircle className="text-emerald-400" size={18} />
          Already Enrolled
        </button>
      );
    }

    return (
      <button
        onClick={handleEnroll}
        disabled={enrolling}
        className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-60 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer border-none active:scale-[0.98]"
      >
        {enrolling ? (
          <>
            <span className="animate-spin">⏳</span> Enrolling...
          </>
        ) : (
          <>
            <FiLogIn size={18} />
            Enroll Now
          </>
        )}
      </button>
    );
  };

  return (
    <div className="w-full text-slate-100 pb-20">
      
      {/* 🏆 ১. BANNER (HERO SECTION) - ফুল-উইথ */}
      <section className="w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-12 md:py-20 px-4 border-b border-slate-700/60">
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
            
            {/* ⭐ RATING */}
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

      {/* 📦 MAIN CONTAINER LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 relative items-start">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* 🖼️ ২. GALLERY */}
          <section className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              System Environment Gallery
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-3 md:col-span-2 h-64 md:h-80 rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl shadow-black/20 bg-slate-800">
                <img src={courseData.gallery[0]} alt={courseData.title} className="w-full h-full object-cover" />
              </div>
              <div className="col-span-3 md:col-span-1 grid grid-cols-2 md:grid-cols-1 gap-3">
                <div className="h-32 md:h-[154px] rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl shadow-black/20 bg-slate-800">
                  <img src={courseData.gallery[1] || courseData.gallery[0]} alt="Course preview" className="w-full h-full object-cover" />
                </div>
                <div className="h-32 md:h-[154px] rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl shadow-black/20 bg-slate-800">
                  <img src={courseData.gallery[2] || courseData.gallery[0]} alt="Course preview" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </section>

          {/* 📑 TAB SYSTEM */}
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

          {/* 🔄 DYNAMIC CONTENT SWITCHES */}
          <div className="w-full">
            {activeTab === "overview" ? (
              <div className="space-y-8">
                {/* ৩. DESCRIPTION */}
                <article className="space-y-3">
                  <h2 className="text-xl font-extrabold tracking-tight text-white">Program Architecture Blueprint</h2>
                  <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                    {courseData.subtitle}
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
              /* 📚 CURRICULUM SYLLABUS LAYOUT */
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

        {/* 📌 RIGHT SIDEBAR PANEL: ৬. PRICE & FEATURES ACCREDITATION */}
        <aside className="w-full lg:sticky lg:top-6 bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6 shadow-2xl shadow-black/40 space-y-6">
          <div className="space-y-1 border-b border-slate-700/60 pb-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">Single Purchase Value</span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-white">${courseData.price}</span>
              <span className="text-sm font-medium line-through text-slate-500">${courseData.originalPrice}</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/30">
                {Math.round(((courseData.originalPrice - courseData.price) / courseData.originalPrice) * 100)}% OFF
              </span>
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

          {/* 🟢 Enroll Button (Dynamic) */}
          {renderEnrollButton()}

          {/* Initialize Purchase Button (commented out) */}
          {/* <button type="button" className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer border-none active:scale-[0.98]">
            Initialize Purchase <FiArrowRight />
          </button> */}
          
          <div className="text-[10px] font-medium text-slate-500 text-center flex items-center justify-center gap-1.5">
            <FiShield className="text-blue-400" /> 30-Day Automated Micro-Refund Standard Secure Link
          </div>
        </aside>
      </div>

      {/* 🔗 ৭. RELATED COURSES */}
      {courseData.related && courseData.related.length > 0 && (
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
      )}

    </div>
  );
}