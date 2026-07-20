"use client";

import React, { useState, useEffect } from "react";
import CourseCard, { CourseCardSkeleton, Course } from "./CourseCard";

export default function FeaturedCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // শুরুতে লোডিং true থাকবে

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/courses/data`);
        const data = await res.json();
        
        setCourses(data); // API এর ডেটা স্টেটে সেট করা হলো
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false); // ডেটা ফেচিং শেষ (সফল বা ব্যর্থ যাই হোক), তাই লোডিং false
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto space-y-10 py-16 px-4">
      {/* সেকশন হেডার */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
          Academic Excellence
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Explore Our Featured Courses
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
          Join our highly rated premium courses to transform your concepts into production-grade professional skills.
        </p>
      </div>

      {/* রেসপন্সিভ গ্রিড লেআউট */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {loading
          ? // ডাটা লোড হতে থাকলে ৪টি ডামি স্কেলেটন দেখাবে
            Array.from({ length: 4 }).map((_, index) => (
              <CourseCardSkeleton key={index} />
            ))
          : // ডাটা লোড হয়ে গেলে আসল কোর্স কার্ড দেখাবে
            courses.map((course) => (
              // 🛠️ এখানে courses.id এর বদলে course.id বা course._id (API অনুযায়ী) দেওয়া হয়েছে
              <CourseCard key={course.id} course={course} />
            ))
        }
      </div>
    </section>
  );
}