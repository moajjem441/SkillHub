"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FiBookOpen, FiClock, FiStar, FiUser, FiArrowRight } from "react-icons/fi";

interface EnrolledCourse {
  enrollmentId: string;
  enrolledAt: string;
  status: string;
  course: {
    _id: string;
    id: string;
    title: string;
    instructor: string;
    rating: number;
    price: number;
    category: string;
    level: string;
    imageUrl: string;
    duration?: string;
    lessons?: number;
  } | null;
}

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.push("/login");
      return;
    }

    const fetchMyCourses = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/my-courses?userId=${session.user.id}`
        );
        const result = await res.json();
        if (result.success) {
          setCourses(result.data);
        } else {
          toast.error("Failed to load your courses.");
        }
      } catch (error) {
        console.error("Error fetching my courses:", error);
        toast.error("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, [session, isPending, router]);

  // লোডিং স্টেট
  if (isPending || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading your courses...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  // খালি স্টেট
  if (courses.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-slate-900/80 border border-slate-700/60 rounded-2xl p-10 text-center shadow-2xl shadow-black/40">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-white mb-2">No courses yet</h2>
          <p className="text-slate-400 text-sm mb-6">
            Start exploring and enroll in your first course today!
          </p>
          <Link
            href="/courses"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/30 transition-all"
          >
            Explore Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* হেডার */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white">My Courses</h1>
          <p className="text-slate-400 text-sm mt-1">
            {courses.length} course{courses.length !== 1 ? "s" : ""} enrolled
          </p>
        </div>

        {/* কোর্স গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((item) => {
            const course = item.course;
            if (!course) {
              return (
                <div
                  key={item.enrollmentId}
                  className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-6 text-center shadow-xl shadow-black/40"
                >
                  <p className="text-slate-400 text-sm">Course data not available</p>
                </div>
              );
            }

            return (
              <div
                key={item.enrollmentId}
                className="group bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:-translate-y-1 shadow-xl shadow-black/40 flex flex-col"
              >
                {/* ইমেজ সেকশন */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="text-[9px] font-bold uppercase bg-blue-500/80 text-white px-2.5 py-1 rounded-full">
                      {course.category}
                    </span>
                    <span className="text-[9px] font-bold uppercase bg-slate-900/80 text-white px-2.5 py-1 rounded-full border border-slate-700/60">
                      {course.level}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span
                      className={`text-[9px] font-bold uppercase px-2.5 py-1 rounded-full ${
                        item.status === "active"
                          ? "bg-emerald-500/80 text-white"
                          : "bg-slate-700/80 text-slate-300"
                      }`}
                    >
                      {item.status === "active" ? "Active" : item.status}
                    </span>
                  </div>
                </div>

                {/* কন্টেন্ট সেকশন */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-white tracking-tight line-clamp-2 group-hover:text-blue-400 transition-colors">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <FiUser className="text-blue-400" size={14} />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                        <FiStar className="fill-current" size={14} />
                        <span>{course.rating.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <FiClock size={14} />
                        <span>Enrolled {new Date(item.enrolledAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* নিচের অংশ: প্রাইস ও ভিউ ডিটেইলস বাটন */}
                  <div className="pt-3 mt-3 border-t border-slate-700/60 flex items-center justify-between">
                    <span className="text-lg font-black text-white">${course.price}</span>
                    <Link
                      href={`/courseDetails/${course._id}`}
                      className="flex items-center gap-1 text-xs font-bold px-4 py-2 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white transition-all duration-300 border border-blue-500/30 hover:border-transparent"
                    >
                      View Details <FiArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}