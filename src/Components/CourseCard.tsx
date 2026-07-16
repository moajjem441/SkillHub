"use client";

import React from "react";
import { FiStar, FiUser } from "react-icons/fi";

// ১. টাইপস্ক্রিপ্ট ইন্টারফেস
export interface Course {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  price: number;
  category: string;
  imageUrl: string;
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    /* কাস্টম এইচটিএমএল কার্ড উইথ গ্লাস-মর্ফিজম ডিজাইন ও ক্লিক ইফেক্ট */
    <div 
      className="w-full border border-slate-200/60 dark:border-slate-800 hover:border-blue-500/40 bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 group rounded-2xl overflow-hidden flex flex-col justify-between text-left cursor-pointer"
    >
      {/* কোর্স ইমেজ ও ক্যাটাগরি ব্যাজ */}
      <div className="relative w-full h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img 
          src={course.imageUrl} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 text-[10px] font-extrabold uppercase tracking-widest bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full border border-slate-200/50 dark:border-slate-700">
          {course.category}
        </span>
      </div>

      {/* কার্ডের ভেতরের কন্টেন্ট */}
      <div className="p-5 space-y-4 w-full flex-grow flex flex-col justify-between">
        <div className="space-y-2 w-full">
          {/* কোর্স টাইটেল */}
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight line-clamp-2 min-h-[48px] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {course.title}
          </h3>

          {/* ইন্সট্রাক্টর */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <FiUser className="text-blue-500" />
            <span>{course.instructor}</span>
          </div>
          

          {/* রেটিং ও রিভিউ */}
          <div className="flex items-center gap-1 text-amber-500 text-sm font-semibold">
            <FiStar className="fill-current" />
            <span>{course.rating.toFixed(1)}</span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">(120+ reviews)</span>
          </div>
        </div>

        {/* প্রাইজ এবং ভিউ ডিটেইলস বাটন */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between w-full">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 block font-semibold">Course Fee</span>
            <span className="text-lg font-black text-slate-800 dark:text-slate-100">${course.price}</span>
          </div>
          
          {/* কাস্টম ডিজাইনড বাটন */}
          <button 
            type="button"
            className="text-xs font-bold px-4 py-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

// ২. অ্যানিমেটেড স্কেলেটন লোডার (Pure HTML/Tailwind)
export function CourseCardSkeleton() {
  return (
    <div className="w-full border border-slate-200/50 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/30 rounded-2xl overflow-hidden flex flex-col items-start animate-pulse">
      {/* ইমেজ স্কেলেটন */}
      <div className="w-full h-48 bg-slate-200 dark:bg-slate-800"></div>
      
      {/* কন্টেন্ট স্কেলেটন */}
      <div className="p-5 space-y-5 w-full">
        <div className="space-y-3">
          {/* টাইটেল লাইন্স */}
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-5/6"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-2/3"></div>
          {/* ইন্সট্রাক্টর লাইন */}
          <div className="h-3 bg-slate-100 dark:bg-slate-850 rounded-lg w-1/3 mt-2"></div>
        </div>

        {/* ফুটার স্কেলেটন */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex justify-between items-center w-full">
          <div className="space-y-2">
            <div className="h-2 bg-slate-100 dark:bg-slate-850 rounded w-8"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-12"></div>
          </div>
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl w-24"></div>
        </div>
      </div>
    </div>
  );
}