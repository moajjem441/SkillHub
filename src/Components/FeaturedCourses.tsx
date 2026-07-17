"use client";

import React, { useState, useEffect } from "react";
import CourseCard, { CourseCardSkeleton, Course } from "./CourseCard";

export default function FeaturedCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // বাস্তবসম্মত মক ডেটা (৪টি ইউনিক কোর্স কার্ড)
  const mockCourses: Course[] = [
    {
      id: "1",
      title: "Complete Next.js Enterprise Starter Guide (v16+)",
      instructor: "Moajjem Hossain",
      rating: 4.9,
      price: 99,
      category: "Web Development",
      imageUrl: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "2",
      title: "Flutter & React Native: Ultimate Cross-Platform Guide",
      instructor: "Dr. Angela Yu",
      rating: 4.8,
      price: 89,
      category: "App Development",
      imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "3",
      title: "Multimodal Deep Learning & Computer Vision Foundations",
      instructor: "Prof. Andrew Ng",
      rating: 4.9,
      price: 149,
      category: "Artificial Intelligence",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "4",
      title: "Advanced Penetration Testing & Secure IAM Systems",
      instructor: "Nathaniel Cole",
      rating: 4.7,
      price: 119,
      category: "Cyber Security",
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    },
  ];

  useEffect(() => {
    // ডাটা লোডিং ইফেক্ট দেখানোর জন্য ১.৫ সেকেন্ডের কৃত্রিম বিলম্ব (Delay)
    const timer = setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
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

      {/* রেসপন্সিভ গ্রিড লেআউট (৪টি কলাম বড় স্ক্রিনে, ১টি মোবাইলে) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {loading
          ? // যদি ডাটা লোড হতে থাকে, তবে ৪টি ডামি স্কেলেটন দেখাও
            Array.from({ length: 4 }).map((_, index) => (
              <CourseCardSkeleton key={index} />
            ))
          : // ডাটা লোড হয়ে গেলে আসল কোর্স কার্ড দেখাও
            courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
        }
      </div>
    </section>
  );
}