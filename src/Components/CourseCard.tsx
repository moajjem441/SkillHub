"use client";

import React from "react";
import Link from "next/link";
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
    /* ডার্ক প্রিমিয়াম গ্লাস-মর্ফিজম কার্ড */
    <div 
      className="w-full border border-slate-700/60 hover:border-blue-500/50 bg-slate-900/80 backdrop-blur-xl shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1.5 group rounded-2xl overflow-hidden flex flex-col justify-between text-left cursor-pointer"
    >
      {/* কোর্স ইমেজ ও ক্যাটাগরি ব্যাজ */}
      <div className="relative w-full h-48 overflow-hidden bg-slate-800">
        <img 
          src={course.imageUrl} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 text-[10px] font-extrabold uppercase tracking-widest bg-slate-900/90 backdrop-blur-md text-blue-400 px-3 py-1 rounded-full border border-slate-700/80">
          {course.category}
        </span>
      </div>

      {/* কার্ডের ভেতরের কন্টেন্ট */}
      <div className="p-5 space-y-4 w-full flex-grow flex flex-col justify-between">
        <div className="space-y-2 w-full">
          {/* কোর্স টাইটেল */}
          <h3 className="text-base font-bold text-white tracking-tight line-clamp-2 min-h-[48px] group-hover:text-blue-400 transition-colors duration-200">
            {course.title}
          </h3>

          {/* ইন্সট্রাক্টর */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <FiUser className="text-blue-400" />
            <span>{course.instructor}</span>
          </div>
          

          {/* রেটিং ও রিভিউ */}
          <div className="flex items-center gap-1 text-amber-400 text-sm font-semibold">
            <FiStar className="fill-current" />
            <span>{course.rating.toFixed(1)}</span>
            <span className="text-xs text-slate-500 font-normal">(120+ reviews)</span>
          </div>
        </div>

        {/* প্রাইজ এবং ভিউ ডিটেইলস বাটন */}
        <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between w-full">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-semibold">Course Fee</span>
            <span className="text-lg font-black text-white">${course.price}</span>
          </div>
          
          {/* কাস্টম ডিজাইনড বাটন */}
           <Link
  href={`/courseDetails/${course._id}`}
  className="text-xs font-bold px-4 py-2 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white transition-all duration-300 cursor-pointer border border-blue-500/30 hover:border-transparent"
>
  View Details
</Link>
        </div>
      </div>
    </div>
  );
}

// ২. অ্যানিমেটেড স্কেলেটন লোডার (ডার্ক ভার্সন)
export function CourseCardSkeleton() {
  return (
    <div className="w-full border border-slate-700/60 bg-slate-900/60 backdrop-blur-sm rounded-2xl overflow-hidden flex flex-col items-start animate-pulse">
      {/* ইমেজ স্কেলেটন */}
      <div className="w-full h-48 bg-slate-800/80"></div>
      
      {/* কন্টেন্ট স্কেলেটন */}
      <div className="p-5 space-y-5 w-full">
        <div className="space-y-3">
          {/* টাইটেল লাইন্স */}
          <div className="h-4 bg-slate-800/80 rounded-lg w-5/6"></div>
          <div className="h-4 bg-slate-800/80 rounded-lg w-2/3"></div>
          {/* ইন্সট্রাক্টর লাইন */}
          <div className="h-3 bg-slate-800/50 rounded-lg w-1/3 mt-2"></div>
        </div>

        {/* ফুটার স্কেলেটন */}
        <div className="pt-4 border-t border-slate-700/60 flex justify-between items-center w-full">
          <div className="space-y-2">
            <div className="h-2 bg-slate-800/50 rounded w-8"></div>
            <div className="h-4 bg-slate-800/80 rounded-lg w-12"></div>
          </div>
          <div className="h-8 bg-slate-800/80 rounded-xl w-24"></div>
        </div>
      </div>
    </div>
  );
}