"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { 
  FiBook, FiUser, FiDollarSign, FiTag, FiAward, 
  FiClock, FiFileText, FiImage, FiUpload, FiX,
  FiZap
} from "react-icons/fi";

// 🎨 Zod Schema for Course Validation
const courseSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  instructor: z.string().min(3, { message: "Instructor name is required." }),
  rating: z.number().min(0).max(5, { message: "Rating must be between 0 and 5." }),
  price: z.number().min(0, { message: "Price must be a positive number." }),
  category: z.string().min(1, { message: "Category is required." }),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  imageUrl: z.string().url({ message: "Please enter a valid image URL." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
  duration: z.string().min(1, { message: "Duration is required." }),
  lessons: z.number().min(1, { message: "Number of lessons is required." }),
  language: z.string().min(1, { message: "Language is required." }),
  certificate: z.boolean().default(false),
  featured: z.boolean().default(false),
});

type CourseFormValues = z.infer<typeof courseSchema>;

// 🎨 Input Styles
const inputBaseStyles = `
  w-full h-11 px-4 py-2.5 
  bg-slate-800/60 backdrop-blur-sm
  border rounded-xl text-sm font-medium
  placeholder-slate-500
  text-slate-100
  transition-all duration-200 ease-in-out
  disabled:opacity-50 disabled:bg-slate-800/30 disabled:cursor-not-allowed
`;

const getInputStateStyles = (hasError: boolean) => hasError 
  ? "border-red-500/60 focus:border-red-500 focus:ring-4 focus:ring-red-500/20" 
  : "border-slate-700/70 hover:border-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20";

const labelStyles = "text-[11px] font-bold uppercase tracking-wider text-slate-400 block text-left select-none";

export default function AddCourseForm() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // ✅ Better Auth-এর useSession – শুধু data ও isPending (UI-র জন্য)
  const { data: session, isPending } = authClient.useSession();

  // 🎯 টোকেন ফেচ করার ফাংশন (Client Component পদ্ধতি)
  const fetchToken = async (): Promise<string | null> => {
    try {
      // ১. authClient.token() চেষ্টা করুন (প্রথম পছন্দ)
      const { data: tokenData } = await authClient.token();
      if (tokenData?.token) return tokenData.token;

      // ২. যদি না হয়, getSession() থেকে টোকেন বের করার চেষ্টা
      const sessionData = await authClient.getSession();
      if (sessionData?.token) return sessionData.token;

      return null;
    } catch (error) {
      console.error("Token fetch error:", error);
      return null;
    }
  };

  // 🔐 Session check – শুধু session দেখছি, token আলাদা
  useEffect(() => {
    if (!isPending) {
      if (session) {
        setIsCheckingAuth(false);
      } else {
        router.push("/login");
      }
    }
  }, [session, isPending, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      instructor: "",
      rating: 4.5,
      price: 0,
      category: "",
      level: "Intermediate",
      imageUrl: "",
      description: "",
      duration: "",
      lessons: 0,
      language: "English",
      certificate: false,
      featured: false,
    },
  });

  const watchedImageUrl = watch("imageUrl");

  // ✨ AI Generate function
  const generateWithAI = async () => {
    const title = watch("title");
    const category = watch("category");
    const level = watch("level");

    if (!title) {
      toast.error("Please enter a course title first.");
      return;
    }

    setIsGenerating(true);
    const loadingToast = toast.loading("AI is crafting your course content...", {
      style: {
        background: "rgba(15, 23, 42, 0.95)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(59, 130, 246, 0.3)",
        borderRadius: "12px",
        color: "#f8fafc",
      },
    });

    try {
      const response = await fetch("/api/ai/generate-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, category, level }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to generate");
      }

      setValue("description", result.data.description);
      setValue("duration", result.data.duration);
      setValue("lessons", result.data.lessons);
      setValue("price", result.data.price);

      console.log("✅ Generated Features:", result.data.features);

      toast.success("Course content generated successfully! 🎉", {
        id: loadingToast,
        duration: 3000,
      });
    } catch (error) {
      console.error("AI Generation Error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate content. Please try again.", {
        id: loadingToast,
        duration: 4000,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // 📤 Submit handler – টোকেন ফেচ করে headers-এ যোগ
  const onSubmit = async (data: CourseFormValues) => {
    // ✅ টোকেন ফেচ করুন
    const token = await fetchToken();
    if (!token) {
      toast.error("Authentication token missing. Please login again.");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Adding course...", {
      style: {
        background: "rgba(15, 23, 42, 0.95)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(59, 130, 246, 0.3)",
        borderRadius: "12px",
        color: "#f8fafc",
      },
    });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/course`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add course");
      }

      const result = await response.json();
      console.log("Course added successfully:", result);

      toast.success("Course added successfully! 🎉", {
        id: loadingToast,
        duration: 4000,
      });

      reset();

      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }

    } catch (error) {
      console.error("Error adding course:", error);
      toast.error("Failed to add course. Please try again.", {
        id: loadingToast,
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🔄 Loading state
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-start justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-4xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/40 space-y-6 transition-all my-8">
        
        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/30">
            <FiBook size={24} />
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white pt-1">
            Add New Course
          </h1>
          <p className="text-xs md:text-sm text-slate-400 font-medium max-w-xs mx-auto">
            Fill in the details below to add a new course to the catalog.
          </p>
        </div>

        <form 
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)} 
          className="space-y-6" 
          noValidate
        >
          {/* 🏷️ Basic Information Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400">
                Basic Information
              </h2>
              {/* ✨ AI Generate Button */}
              <button
                type="button"
                onClick={generateWithAI}
                disabled={isGenerating}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500/10 px-3 py-1.5 rounded-xl border border-blue-500/20"
              >
                {isGenerating ? (
                  <>
                    <span className="animate-spin">⏳</span> Generating...
                  </>
                ) : (
                  <>
                    <FiZap size={14} /> Generate with AI
                  </>
                )}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div className="space-y-1.5">
                <label htmlFor="title" className={labelStyles}>Course Title</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                    <FiBook size={16} />
                  </div>
                  <input
                    id="title"
                    type="text"
                    placeholder="Complete Next.js Enterprise Guide"
                    className={`${inputBaseStyles} pl-10 ${getInputStateStyles(!!errors.title)}`}
                    {...register("title")}
                  />
                </div>
                {errors.title && (
                  <p className="text-[11px] font-semibold text-red-400 flex items-center gap-1.5 pl-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 block" />
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Instructor */}
              <div className="space-y-1.5">
                <label htmlFor="instructor" className={labelStyles}>Instructor</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                    <FiUser size={16} />
                  </div>
                  <input
                    id="instructor"
                    type="text"
                    placeholder="Moajjem Hossain"
                    className={`${inputBaseStyles} pl-10 ${getInputStateStyles(!!errors.instructor)}`}
                    {...register("instructor")}
                  />
                </div>
                {errors.instructor && (
                  <p className="text-[11px] font-semibold text-red-400 flex items-center gap-1.5 pl-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 block" />
                    {errors.instructor.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category */}
              <div className="space-y-1.5">
                <label htmlFor="category" className={labelStyles}>Category</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                    <FiTag size={16} />
                  </div>
                  <select
                    id="category"
                    className={`${inputBaseStyles} pl-10 ${getInputStateStyles(!!errors.category)}`}
                    {...register("category")}
                  >
                    <option value="">Select Category</option>
                    <option value="Web Development">Web Development</option>
                    <option value="App Development">App Development</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                  </select>
                </div>
                {errors.category && (
                  <p className="text-[11px] font-semibold text-red-400 flex items-center gap-1.5 pl-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 block" />
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Level */}
              <div className="space-y-1.5">
                <label htmlFor="level" className={labelStyles}>Level</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                    <FiAward size={16} />
                  </div>
                  <select
                    id="level"
                    className={`${inputBaseStyles} pl-10 ${getInputStateStyles(!!errors.level)}`}
                    {...register("level")}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                {errors.level && (
                  <p className="text-[11px] font-semibold text-red-400 flex items-center gap-1.5 pl-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 block" />
                    {errors.level.message}
                  </p>
                )}
              </div>

              {/* Language */}
              <div className="space-y-1.5">
                <label htmlFor="language" className={labelStyles}>Language</label>
                <input
                  id="language"
                  type="text"
                  placeholder="English"
                  className={`${inputBaseStyles} ${getInputStateStyles(!!errors.language)}`}
                  {...register("language")}
                />
                {errors.language && (
                  <p className="text-[11px] font-semibold text-red-400 flex items-center gap-1.5 pl-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 block" />
                    {errors.language.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 💰 Pricing & Stats Section */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400 border-b border-slate-700/60 pb-2">
              Pricing & Statistics
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Price */}
              <div className="space-y-1.5">
                <label htmlFor="price" className={labelStyles}>Price ($)</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                    <FiDollarSign size={16} />
                  </div>
                  <input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="99"
                    className={`${inputBaseStyles} pl-10 ${getInputStateStyles(!!errors.price)}`}
                    {...register("price", { valueAsNumber: true })}
                  />
                </div>
                {errors.price && (
                  <p className="text-[11px] font-semibold text-red-400 flex items-center gap-1.5 pl-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 block" />
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Duration */}
              <div className="space-y-1.5">
                <label htmlFor="duration" className={labelStyles}>Duration</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                    <FiClock size={16} />
                  </div>
                  <input
                    id="duration"
                    type="text"
                    placeholder="12 Weeks"
                    className={`${inputBaseStyles} pl-10 ${getInputStateStyles(!!errors.duration)}`}
                    {...register("duration")}
                  />
                </div>
                {errors.duration && (
                  <p className="text-[11px] font-semibold text-red-400 flex items-center gap-1.5 pl-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 block" />
                    {errors.duration.message}
                  </p>
                )}
              </div>

              {/* Lessons */}
              <div className="space-y-1.5">
                <label htmlFor="lessons" className={labelStyles}>Number of Lessons</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                    <FiFileText size={16} />
                  </div>
                  <input
                    id="lessons"
                    type="number"
                    placeholder="48"
                    className={`${inputBaseStyles} pl-10 ${getInputStateStyles(!!errors.lessons)}`}
                    {...register("lessons", { valueAsNumber: true })}
                  />
                </div>
                {errors.lessons && (
                  <p className="text-[11px] font-semibold text-red-400 flex items-center gap-1.5 pl-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 block" />
                    {errors.lessons.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Rating */}
              <div className="space-y-1.5">
                <label htmlFor="rating" className={labelStyles}>Rating (0-5)</label>
                <input
                  id="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  placeholder="4.9"
                  className={`${inputBaseStyles} ${getInputStateStyles(!!errors.rating)}`}
                  {...register("rating", { valueAsNumber: true })}
                />
                {errors.rating && (
                  <p className="text-[11px] font-semibold text-red-400 flex items-center gap-1.5 pl-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 block" />
                    {errors.rating.message}
                  </p>
                )}
              </div>

              {/* Image URL */}
              <div className="space-y-1.5">
                <label htmlFor="imageUrl" className={labelStyles}>Image URL</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                    <FiImage size={16} />
                  </div>
                  <input
                    id="imageUrl"
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    className={`${inputBaseStyles} pl-10 ${getInputStateStyles(!!errors.imageUrl)}`}
                    {...register("imageUrl")}
                  />
                </div>
                {errors.imageUrl && (
                  <p className="text-[11px] font-semibold text-red-400 flex items-center gap-1.5 pl-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 block" />
                    {errors.imageUrl.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 📝 Description */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400 border-b border-slate-700/60 pb-2">
              Course Description
            </h2>
            
            <div className="space-y-1.5">
              <label htmlFor="description" className={labelStyles}>Description</label>
              <textarea
                id="description"
                rows={4}
                placeholder="Master modern Next.js from fundamentals to enterprise-level architecture..."
                className={`w-full px-4 py-2.5 bg-slate-800/60 backdrop-blur-sm border rounded-xl text-sm font-medium placeholder-slate-500 text-slate-100 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 ${
                  errors.description ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/20" : "border-slate-700/70 hover:border-slate-500 focus:border-blue-500/50"
                }`}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-[11px] font-semibold text-red-400 flex items-center gap-1.5 pl-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 block" />
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* ⚙️ Settings */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400 border-b border-slate-700/60 pb-2">
              Settings
            </h2>
            
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-700 bg-slate-800/60 text-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-0 cursor-pointer"
                  {...register("certificate")}
                />
                <span className="text-sm text-slate-300">Certificate Available</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-700 bg-slate-800/60 text-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-0 cursor-pointer"
                  {...register("featured")}
                />
                <span className="text-sm text-slate-300">Featured Course</span>
              </label>
            </div>
          </div>

          {/* 🖼️ Image Preview */}
          {watchedImageUrl && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-400">Image Preview:</p>
              <div className="relative w-full max-w-xs h-40 rounded-xl overflow-hidden border border-slate-700/60">
                <img 
                  src={watchedImageUrl} 
                  alt="Course preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x200?text=Invalid+Image+URL";
                  }}
                />
              </div>
            </div>
          )}

          {/* 🚀 Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-blue-600/60 disabled:to-indigo-600/60 text-white font-bold rounded-xl text-sm shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border-none"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin">⏳</span> Adding Course...
              </>
            ) : (
              <>
                <FiUpload size={18} /> Add Course
              </>
            )}
          </button>

          {/* ↩️ Cancel Button */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="w-full py-2.5 bg-slate-800/60 border border-slate-700/60 hover:bg-slate-700/60 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer text-slate-400 hover:text-slate-200"
          >
            <FiX size={16} /> Cancel
          </button>
        </form>
      </div>
    </div>
  );
}