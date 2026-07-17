"use client";

import React from "react";
import CoursesExplore, { Course } from "@/Components/CoursesExplore";

export default function ExploreCoursesPage() {
  // 1. Core Mock Dataset managed at page level
  const coursesData: Course[] = [
    {
      id: "c-1",
      title: "Complete Next.js Enterprise Starter Guide (v16+)",
      instructor: "Moajjem Hossain",
      rating: 4.9,
      price: 99,
      category: "Web Development",
      level: "Advanced",
      imageUrl: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "c-2",
      title: "Flutter & React Native: Ultimate Cross-Platform Guide",
      instructor: "Dr. Angela Yu",
      rating: 4.8,
      price: 89,
      category: "App Development",
      level: "Intermediate",
      imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "c-3",
      title: "Multimodal Deep Learning & Computer Vision Foundations",
      instructor: "Prof. Andrew Ng",
      rating: 4.9,
      price: 149,
      category: "Artificial Intelligence",
      level: "Advanced",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "c-4",
      title: "Advanced Penetration Testing & Secure IAM Systems",
      instructor: "Nathaniel Cole",
      rating: 4.7,
      price: 119,
      category: "Cyber Security",
      level: "Advanced",
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "c-5",
      title: "React Core Internals & Advanced State Architecture",
      instructor: "Dan Abramov",
      rating: 4.9,
      price: 79,
      category: "Web Development",
      level: "Advanced",
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "c-6",
      title: "Tailwind CSS Production UI Systems & Engineering",
      instructor: "Adam Wathan",
      rating: 4.8,
      price: 49,
      category: "Web Development",
      level: "Beginner",
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "c-7",
      title: "iOS 19 & Swift UI Architecture Masterclass",
      instructor: "Paul Hudson",
      rating: 4.6,
      price: 129,
      category: "App Development",
      level: "Intermediate",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "c-8",
      title: "Introduction to Cloud-Native Fog Architecture",
      instructor: "Dr. Architectural Expert",
      rating: 4.5,
      price: 159,
      category: "Cloud Computing",
      level: "Advanced",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return <CoursesExplore initialCourses={coursesData} />;
}