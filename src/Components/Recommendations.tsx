// components/Recommendations.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiStar, FiUser, FiTrendingUp, FiRefreshCw } from "react-icons/fi";

interface Course {
  id: string;
  _id?: string;
  title: string;
  instructor: string;
  rating: number;
  price: number;
  category: string;
  level: string;
  imageUrl: string;
}

export default function Recommendations() {
  const [recommended, setRecommended] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // রেকমেন্ডেশন ফেচ করার ফাংশন
  const fetchRecommendations = async (showFullLoader = true) => {
    if (showFullLoader) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }

    try {
      const history = JSON.parse(localStorage.getItem("courseHistory") || "[]");
      if (history.length === 0) {
        setRecommended([]);
        setLoading(false);
        setRefreshing(false);
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/courses`);
      const allCourses = await res.json();

      const recoRes = await fetch("/api/ai/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history, allCourses }),
      });
      const result = await recoRes.json();
      setRecommended(result.data || []);
    } catch (error) {
      console.error("Recommendation error:", error);
      setRecommended([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // পেজ লোড হলে অটো ফেচ
  useEffect(() => {
    fetchRecommendations(true);
  }, []);

  // লোডিং স্টেট
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FiTrendingUp className="text-blue-400" /> Loading recommendations...
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-slate-800/60 rounded-xl h-48 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  // খালি স্টেট (কোনো হিস্ট্রি না থাকলে)
  if (recommended.length === 0) {
    return (
      <div className="text-center py-8 bg-slate-900/40 rounded-2xl border border-slate-700/60">
        <p className="text-slate-400 text-sm">Start exploring courses to get personalized recommendations! 🚀</p>
      </div>
    );
  }

  // রেকমেন্ডেশন দেখানোর UI
  return (
    <div className="space-y-4">
      {/* হেডার + রিফ্রেশ বাটন */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FiTrendingUp className="text-blue-400" /> Recommended For You
        </h2>
        <button
          onClick={() => fetchRecommendations(false)}
          disabled={refreshing}
          className="flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500/10 px-3 py-1.5 rounded-xl border border-blue-500/20"
        >
          <FiRefreshCw className={refreshing ? "animate-spin" : ""} size={14} />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* রেকমেন্ডেড কোর্সের গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommended.map((course) => (
          <Link
            key={course.id || course._id}
            href={`/courseDetails/${course._id || course.id}`}
            className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all hover:-translate-y-1 shadow-lg shadow-black/40 group"
          >
            <div className="relative h-32 overflow-hidden">
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <span className="absolute top-2 left-2 text-[8px] font-bold uppercase bg-blue-500/80 text-white px-2 py-0.5 rounded-full">
                {course.category}
              </span>
            </div>
            <div className="p-3 space-y-1">
              <h3 className="text-sm font-bold text-white line-clamp-1">{course.title}</h3>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <FiUser className="text-blue-400" size={12} />
                <span>{course.instructor}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400 text-xs">
                  <FiStar className="fill-current" size={12} />
                  <span>{course.rating.toFixed(1)}</span>
                </div>
                <span className="text-sm font-bold text-white">${course.price}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}