"use client";

import React, { useState, useEffect, useMemo } from "react";
import { FiSearch, FiStar, FiUser, FiSliders, FiChevronLeft, FiChevronRight, FiRefreshCw } from "react-icons/fi";

// 1. TypeScript Contracts exported for clean type checking elsewhere
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

interface CoursesExploreProps {
  initialCourses: Course[];
}

const ITEMS_PER_PAGE = 4;

export default function CoursesExplore({ initialCourses }: CoursesExploreProps) {
  // --- UI Filter States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Dynamic clean mapping for categories
  const categories = ["All", "Web Development", "App Development", "Artificial Intelligence", "Cyber Security", "Cloud Computing"];

  // Simulate network fetch latency on state modifications
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, maxPrice, sortBy]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  // --- Search & Filtering Pipeline ---
  const filteredAndSortedCourses = useMemo(() => {
    let result = [...initialCourses];

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
  }, [initialCourses, searchQuery, selectedCategory, maxPrice, sortBy]);

  // --- Pagination Slice Calculators ---
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
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Page Top Header Section */}
        <div className="text-left space-y-2 border-b border-slate-200 dark:border-slate-800 pb-6">
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl text-slate-900 dark:text-white">
            Explore Engineering Programs
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed">
            Search, filter, and isolate specialized production-ready courses built for advanced engineering milestones.
          </p>
        </div>

        {/* Global Toolbar Control Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start w-full">
          
          {/* LEFT PANEL: Advanced Search Filter Mechanics */}
          <aside className="w-full bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-6 lg:sticky lg:top-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="flex items-center gap-2 font-bold text-sm tracking-wide uppercase text-slate-900 dark:text-slate-200">
                <FiSliders className="text-blue-500" /> Filter Blueprint
              </span>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <FiRefreshCw size={12} /> Reset All
              </button>
            </div>

            {/* Input Element */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Search Catalog
              </label>
              <div className="relative w-full group">
                <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
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
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            {/* Category Filter Element */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
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
                        ? "bg-blue-500 text-white font-bold shadow-sm shadow-blue-500/20"
                        : "bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter Slider Module */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                <span className="text-slate-400 dark:text-slate-500">Max Budget</span>
                <span className="text-blue-600 dark:text-blue-400 font-black">${maxPrice}</span>
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
                className="w-full accent-blue-500 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>$40</span>
                <span>$120</span>
                <span>$200</span>
              </div>
            </div>
          </aside>

          {/* RIGHT PANEL: Dynamic Sorting Header + Cards View Engine */}
          <main className="lg:col-span-3 space-y-6 w-full">
            
            {/* Action Meta Filters Bar Component */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 px-5 py-4 rounded-2xl shadow-sm w-full">
              <p className="text-xs sm:text-sm font-medium text-slate-500">
                Showing <span className="font-bold text-slate-800 dark:text-slate-200">{filteredAndSortedCourses.length}</span> programs found
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
                  className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-1.5 text-xs sm:text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 dark:text-slate-200 font-medium cursor-pointer"
                >
                  <option value="featured">Featured Setup</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Customer Rated</option>
                </select>
              </div>
            </div>

            {/* Dynamic Card Map Core Container */}
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
                <div className="w-full text-center py-20 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-white/40 dark:bg-slate-900/10 backdrop-blur-sm space-y-3">
                  <div className="text-slate-300 dark:text-slate-700 font-bold text-5xl">ⓘ</div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No matching programs found</h3>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-xs mx-auto">
                    Try modifying your active search string terms, shifting the max price constraint, or clearing options.
                  </p>
                </div>
              )}
            </div>

            {/* Pagination Segment Footer Component Trigger */}
            {!isLoading && totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-6 w-full">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-800 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-850/60 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FiChevronLeft size={14} /> Previous
                </button>
                
                <span className="text-xs sm:text-sm font-semibold text-slate-500">
                  Page <span className="font-bold text-slate-800 dark:text-slate-200">{currentPage}</span> of {totalPages}
                </span>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-800 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-850/60 transition-colors flex items-center gap-1.5 cursor-pointer"
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

// 📄 Reusable Card Presentation Component
function CourseCatalogCard({ course }: { course: Course }) {
  return (
    <div className="w-full border border-slate-200/60 dark:border-slate-800 hover:border-blue-500/40 bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 group rounded-2xl overflow-hidden flex flex-col justify-between text-left cursor-pointer">
      <div className="relative w-full h-44 overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 text-[9px] font-extrabold uppercase tracking-widest bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-full border border-slate-200/50 dark:border-slate-700/80">
          {course.category}
        </span>
        <span className={`absolute top-3 right-3 text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
          course.level === "Advanced" 
            ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" 
            : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
        }`}>
          {course.level}
        </span>
      </div>

      <div className="p-5 space-y-4 w-full flex-grow flex flex-col justify-between">
        <div className="space-y-2 w-full">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight line-clamp-2 min-h-[48px] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {course.title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <FiUser className="text-blue-500" />
            <span>{course.instructor}</span>
          </div>
          <div className="flex items-center gap-1 text-amber-500 text-sm font-semibold">
            <FiStar className="fill-current" />
            <span>{course.rating.toFixed(1)}</span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">(120+ reviews)</span>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between w-full">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500 block font-bold">Total Fee</span>
            <span className="text-lg font-black text-slate-800 dark:text-slate-100">${course.price}</span>
          </div>
          <button
            type="button"
            className="text-xs font-bold px-4 py-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300 cursor-pointer"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

// 📄 Reusable Component: Isolated Loading Skeleton UI
function CourseCatalogCardSkeleton() {
  return (
    <div className="w-full border border-slate-200/50 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/30 rounded-2xl overflow-hidden flex flex-col items-start animate-pulse">
      <div className="w-full h-44 bg-slate-200 dark:bg-slate-800"></div>
      <div className="p-5 space-y-5 w-full">
        <div className="space-y-3">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-5/6"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-2/3"></div>
          <div className="h-3 bg-slate-100 dark:bg-slate-850 rounded-lg w-1/3 mt-2"></div>
        </div>
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