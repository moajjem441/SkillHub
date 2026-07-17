"use client";

import React, { useState, useEffect, useMemo } from "react";
import { FiSearch, FiStar, FiUser, FiSliders, FiChevronLeft, FiChevronRight, FiRefreshCw } from "react-icons/fi";

// 1. TypeScript Contract
export interface Course {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  price: number;
  category: string;
  imageUrl: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

const ITEMS_PER_PAGE = 4;

export default function CoursesExplore() {
  // 2. Localized Dataset
  const internalCourses: Course[] = [
    {
      id: "c-1",
      title: "Complete Next.js Enterprise Starter Guide (v16+)",
      instructor: "Moajjem Hossain",
      rating: 4.9,
      price: 99,
      category: "Web Development",
      level: "Advanced",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80", 
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
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80",
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

  // --- UI Filter States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const categories = ["All", "Web Development", "App Development", "Artificial Intelligence", "Cyber Security", "Cloud Computing"];

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, maxPrice, sortBy]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const filteredAndSortedCourses = useMemo(() => {
    let result = [...internalCourses];

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.instructor.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((c) => c.category === selectedCategory);
    }

    result = result.filter((c) => c.price <= maxPrice);

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchQuery, selectedCategory, maxPrice, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedCourses.length / ITEMS_PER_PAGE);
  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedCourses.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedCourses, currentPage]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setMaxPrice(200);
    setSortBy("featured");
    setCurrentPage(1);
  };

  return (
    <div className="w-full bg-transparent text-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Title Elements */}
        <div className="text-center space-y-2 max-w-xl mx-auto mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Course Catalog
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Filter & Find Your Perfect Path
          </h2>
        </div>

        {/* Catalog Blueprint Wrapper Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start w-full">
          
          {/* Filtering Control Bar Side Drawer */}
          <aside className="w-full bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 p-6 rounded-2xl shadow-2xl shadow-black/40 space-y-6 lg:sticky lg:top-6">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
              <span className="flex items-center gap-2 font-bold text-sm tracking-wide uppercase text-slate-200">
                <FiSliders className="text-blue-400" /> Filter Blueprint
              </span>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1 cursor-pointer transition-colors"
              >
                <FiRefreshCw size={12} /> Reset All
              </button>
            </div>

            {/* Input Element */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block text-left">
                Search Catalog
              </label>
              <div className="relative w-full group">
                <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                  <FiSearch size={16} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Titles, instructors..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 backdrop-blur-sm border border-slate-700/70 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all text-slate-100 placeholder-slate-500"
                />
              </div>
            </div>

            {/* Category Filter Element */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block text-left">
                Course Category
              </label>
              <div className="flex flex-col gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    className={`w-full text-left px-3 py-2 text-xs sm:text-sm rounded-xl font-medium transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-blue-500/30"
                        : "bg-transparent text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider Module */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                <span className="text-slate-400">Max Budget</span>
                <span className="text-blue-400 font-black">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="40"
                max="200"
                step="10"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full accent-blue-500 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                <span>$40</span>
                <span>$120</span>
                <span>$200</span>
              </div>
            </div>
          </aside>

          {/* RIGHT PANEL: Dynamic Sort Header + Card Render System */}
          <main className="lg:col-span-3 space-y-6 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 px-5 py-4 rounded-2xl shadow-2xl shadow-black/40 w-full">
              <p className="text-xs sm:text-sm font-medium text-slate-400">
                Showing <span className="font-bold text-white">{filteredAndSortedCourses.length}</span> programs found
              </p>
              
              <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between">
                <label htmlFor="sort-select" className="text-xs font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">
                  Sort By:
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/70 px-3 py-1.5 text-xs sm:text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-200 font-medium cursor-pointer"
                >
                  <option value="featured">Featured Setup</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Customer Rated</option>
                </select>
              </div>
            </div>

            {/* Layout Box */}
            <div className="w-full">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                  {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                    <CourseCatalogCardSkeleton key={index} />
                  ))}
                </div>
              ) : paginatedCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                  {paginatedCourses.map((course) => (
                    <CourseCatalogCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="w-full text-center py-20 border border-dashed border-slate-700/60 rounded-3xl bg-slate-900/40 backdrop-blur-sm space-y-3">
                  <div className="text-slate-600 font-bold text-5xl">ⓘ</div>
                  <h3 className="text-lg font-bold text-slate-200">No matching programs found</h3>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-xs mx-auto">
                    Try modifying your search query or expanding your max price filter range.
                  </p>
                </div>
              )}
            </div>

            {/* Pagination Component Toggles */}
            {!isLoading && totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-slate-700/60 pt-6 w-full">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="px-4 py-2 border border-slate-700/60 text-xs font-bold rounded-xl bg-slate-900/80 backdrop-blur-sm text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800/80 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FiChevronLeft size={14} /> Previous
                </button>
                
                <span className="text-xs sm:text-sm font-semibold text-slate-400">
                  Page <span className="font-bold text-white">{currentPage}</span> of {totalPages}
                </span>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="px-4 py-2 border border-slate-700/60 text-xs font-bold rounded-xl bg-slate-900/80 backdrop-blur-sm text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800/80 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  Next <FiChevronRight size={14} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// Reusable Presentation Layer
function CourseCatalogCard({ course }: { course: Course }) {
  return (
    <div className="w-full border border-slate-700/60 hover:border-blue-500/50 bg-slate-900/80 backdrop-blur-xl shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1.5 group rounded-2xl overflow-hidden flex flex-col justify-between text-left cursor-pointer">
      <div className="relative w-full h-44 overflow-hidden bg-slate-800">
        <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <span className="absolute top-3 left-3 text-[9px] font-extrabold uppercase tracking-widest bg-slate-900/90 backdrop-blur-md text-blue-400 px-2.5 py-1 rounded-full border border-slate-700/80">
          {course.category}
        </span>
        <span className={`absolute top-3 right-3 text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
          course.level === "Advanced" 
            ? "bg-purple-500/20 text-purple-400 border-purple-500/30" 
            : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
        }`}>
          {course.level}
        </span>
      </div>

      <div className="p-5 space-y-4 w-full flex-grow flex flex-col justify-between">
        <div className="space-y-2 w-full">
          <h3 className="text-base font-bold text-white tracking-tight line-clamp-2 min-h-[48px] group-hover:text-blue-400 transition-colors duration-200">
            {course.title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <FiUser className="text-blue-400" />
            <span>{course.instructor}</span>
          </div>
          <div className="flex items-center gap-1 text-amber-400 text-sm font-semibold">
            <FiStar className="fill-current" />
            <span>{course.rating.toFixed(1)}</span>
            <span className="text-xs text-slate-500 font-normal">(120+ reviews)</span>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between w-full">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-slate-500 block font-bold">Total Fee</span>
            <span className="text-lg font-black text-white">${course.price}</span>
          </div>
          <button 
            type="button" 
            className="text-xs font-bold px-4 py-2 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white transition-all duration-300 cursor-pointer border border-blue-500/30 hover:border-transparent"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

// Skeleton Component Layer
function CourseCatalogCardSkeleton() {
  return (
    <div className="w-full border border-slate-700/60 bg-slate-900/60 backdrop-blur-sm rounded-2xl overflow-hidden flex flex-col items-start animate-pulse">
      <div className="w-full h-44 bg-slate-800/80"></div>
      <div className="p-5 space-y-5 w-full">
        <div className="space-y-3">
          <div className="h-4 bg-slate-800/80 rounded-lg w-5/6"></div>
          <div className="h-4 bg-slate-800/80 rounded-lg w-2/3"></div>
          <div className="h-3 bg-slate-800/50 rounded-lg w-1/3 mt-2"></div>
        </div>
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