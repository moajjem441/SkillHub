"use client";

import { FiStar } from "react-icons/fi";

// ১. টাইপস্ক্রিপ্ট ইন্টারফেস
interface Testimonial {
  id: string;
  name: string;
  position: string;
  avatarUrl: string;
  rating: number;
  review: string;
  badge?: string;
}

export default function Testimonials() {
  // ২. রিয়ালিস্টিক সাকসেস স্টোরি মক ডেটা
  const reviews: Testimonial[] = [
    {
     id: "1",
      name: "Aditya Ahmed",
      position: "Junior Frontend Developer",
      avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      review: "The Next.js 16 Enterprise course completely transformed my career. The modules on Turbopack and production-grade folder structures were so thorough that I confidently answered every question in my interview board!",
      badge: "BUBT Graduate",
    },
    {
      id: "2",
      name: "Sarah Jenkins",
      position: "MERN Stack Engineer",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      review: "The multimodal deep learning modular setup was incredibly clear. Building U-Net architectures for production apps seemed scary at first, but the instructor broke it down into simple pieces.",
    },
    {
      id: "3",
      name: "Rahat Kabir",
      position: "IoT & Embedded Systems Engineer",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      review: "The real-time object detection project guide using ESP32-CAM and ultrasonic sensors was absolutely brilliant. Every single step for cloud data logging on ThingSpeak worked flawlessly out of the box.",
      badge: "Top Learner",
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto py-16 px-4 space-y-12">
      {/* সেকশন হেডার */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full border border-blue-200/20">
          Wall of Love
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 sm:text-4xl">
          Loved by Thousands of Developers
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
          Don't just take our word for it. Here is what our successful graduates from top institutions say about us.
        </p>
      </div>

      {/* ৩. প্রিমিয়াম SaaS রেসপন্সিভ গ্রিড লেআউট */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {reviews.map((item) => (
          /* কাস্টম প্রিমিয়াম SaaS কার্ড উইথ গ্লাস-মর্ফিজম এবং থ্রিডি হোভার অ্যানিমেশন */
          <div
            key={item.id}
            className="w-full border border-slate-200/60 dark:border-slate-800 hover:border-blue-500/40 bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group flex flex-col justify-between text-left relative"
          >
            {/* যদি ব্যাজ থাকে তবে উপরে কাস্টম ব্যাজ */}
            {item.badge && (
              <span className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md border border-blue-500/20">
                {item.badge}
              </span>
            )}

            <div className="space-y-4">
              {/* স্ট্যাটিক গোল্ডেন স্টার রেটিং */}
              <div className="flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: item.rating }).map((_, idx) => (
                  <FiStar key={idx} className="fill-current w-4 h-4" />
                ))}
              </div>

              {/* রিভিউ মেসেজ */}
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 italic">
                "{item.review}"
              </p>
            </div>

            {/* ইউজার ইনফো (এভাটার, নাম, পজিশন) */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <img
                src={item.avatarUrl}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800 group-hover:ring-blue-500/30 transition-all duration-300"
                loading="lazy"
              />
              <div className="text-left">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {item.name}
                </h4>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                  {item.position}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}