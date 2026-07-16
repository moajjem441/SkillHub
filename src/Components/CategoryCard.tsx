"use client";

import React from "react";
// react-icons থেকে আইকন ইম্পোর্ট
import { FiCode, FiSmartphone, FiCpu, FiShield } from "react-icons/fi";

export default function CategoryCard() {
  // ১. মক ডাটা
  const catalogCategories = [
    {
      title: "Web Development",
      description: "Master React, Next.js, Node.js, and advanced cloud native full stack systems.",
      icon: FiCode,
      coursesCount: 42,
    },
    {
      title: "App Development",
      description: "Build high-performance cross platform applications via Flutter and React Native.",
      icon: FiSmartphone,
      coursesCount: 28,
    },
    {
      title: "Artificial Intelligence",
      description: "Dive deep into Neural Networks, Deep Learning models, and Multimodal computer vision.",
      icon: FiCpu,
      coursesCount: 19,
    },
    {
      title: "Cyber Security",
      description: "Understand penetration testing, network defense systems, and secure IAM operations.",
      icon: FiShield,
      coursesCount: 15,
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto space-y-10 py-12">
      {/* সেকশন হেডার */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Browse Top Categories
        </h2>
        <p className="text-slate-500">Choose your favorite domain to start learning</p>
      </div>

      {/* ২. গ্রিড লেআউট এবং লুপ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {catalogCategories.map((category) => {
          const Icon = category.icon;
          return (
            /* আমরা HeroUI Card এর বদলে স্ট্যান্ডার্ড HTML/Tailwind Card ব্যবহার করছি যা মোটেও ক্র্যাশ করবে না */
            <div 
              key={category.title}
              className="w-full border border-divider hover:border-primary/40 bg-content1/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group rounded-2xl p-6 flex flex-col items-start text-left gap-4 cursor-pointer"
            >
              {/* আইকন বক্স */}
              <div className="p-3 rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                {Icon && <Icon size={24} />}
              </div>
              
              {/* টাইটেল ও বর্ণনা */}
              <div className="space-y-1.5 flex-grow">
                <h3 className="text-lg font-bold text-foreground tracking-tight">
                  {category.title}
                </h3>
                <p className="text-sm text-foreground-500 leading-relaxed line-clamp-2">
                  {category.description}
                </p>
              </div>

              {/* কোর্স কাউন্টার */}
              <div className="mt-2 pt-3 border-t border-divider w-full text-xs font-semibold text-primary">
                {category.coursesCount} Active Courses
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}