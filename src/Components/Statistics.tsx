"use client";

import React, { useState, useEffect } from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from "recharts";
import { FiUsers, FiAward, FiBookOpen, FiTrendingUp } from "react-icons/fi";

// ১. টাইপস্ক্রিপ্ট ইন্টারফেসসমূহ
interface StatCardProps {
  title: string;
  value: number;
  suffix?: string;
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
  bgClass: string;
}

interface ChartDataPoint {
  month: string;
  students: number;
  completions: number;
}

// ২. Recharts-এর জন্য রিয়ালিস্টিক ডেটা
const chartData: ChartDataPoint[] = [
  { month: "Jan", students: 1200, completions: 400 },
  { month: "Feb", students: 2100, completions: 850 },
  { month: "Mar", students: 3400, completions: 1600 },
  { month: "Apr", students: 5100, completions: 2900 },
  { month: "May", students: 7800, completions: 4300 },
  { month: "Jun", students: 9500, completions: 6200 },
];

export default function Statistics() {
  return (
    <section className="w-full max-w-7xl mx-auto py-16 px-4 space-y-12">
      {/* সেকশন হেডার */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
          Our Impact in Numbers
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Empowering Learners Worldwide
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
          Track our real-time community growth, course completion velocity, and global academic milestones.
        </p>
      </div>

      {/* ৩. ৪টি চমৎকার অ্যানিমেটেড কাউন্টার কার্ড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        <StatCard 
          title="Active Students" 
          value={9500} 
          suffix="+" 
          icon={FiUsers} 
          colorClass="text-blue-400"
          bgClass="bg-blue-500/20"
        />
        <StatCard 
          title="Courses Completed" 
          value={6200} 
          suffix="+" 
          icon={FiAward} 
          colorClass="text-emerald-400"
          bgClass="bg-emerald-500/20"
        />
        <StatCard 
          title="Premium Tutors" 
          value={150} 
          suffix="+" 
          icon={FiBookOpen} 
          colorClass="text-purple-400"
          bgClass="bg-purple-500/20"
        />
        <StatCard 
          title="Satisfaction Rate" 
          value={99} 
          suffix="%" 
          icon={FiTrendingUp} 
          colorClass="text-rose-400"
          bgClass="bg-rose-500/20"
        />
      </div>

      {/* ৪. Recharts ইন্টারেক্টিভ চার্ট সেকশন */}
      <div className="w-full border border-slate-700/60 bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 lg:p-8 shadow-2xl shadow-black/40 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">Growth & Completion Trends</h3>
            <p className="text-xs text-slate-400">Monthly breakdown of registered active learners and successful graduates</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span className="text-slate-400">Active Learners</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="text-slate-400">Completions</span>
            </div>
          </div>
        </div>

        {/* রেসপন্সিভ চার্ট কন্টেইনার */}
        <div className="w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCompletions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.08)" />
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: "#94a3b8", fontSize: 12 }} 
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: "#94a3b8", fontSize: 11 }} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "rgba(15, 23, 42, 0.95)", 
                  borderRadius: "12px", 
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  color: "#f8fafc",
                  fontSize: "12px",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="students" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorStudents)" 
              />
              <Area 
                type="monotone" 
                dataKey="completions" 
                stroke="#10b981" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorCompletions)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

// ৫. কাস্টম অ্যানিমেটেড কাউন্টার কার্ড (ডার্ক ভার্সন)
function StatCard({ title, value, suffix = "", icon: Icon, colorClass, bgClass }: StatCardProps) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1000;
    const increment = Math.ceil(end / (duration / 16));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="w-full border border-slate-700/60 hover:border-blue-500/50 bg-slate-900/80 backdrop-blur-xl shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-blue-500/10 rounded-2xl p-6 flex items-center justify-between transition-all duration-300 group hover:-translate-y-1.5">
      <div className="space-y-1 text-left">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
          {title}
        </span>
        <span className="text-3xl font-black text-white tracking-tight block">
          {count.toLocaleString()}{suffix}
        </span>
      </div>
      <div className={`p-4 rounded-2xl ${bgClass} ${colorClass} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/20`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}