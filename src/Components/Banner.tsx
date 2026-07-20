"use client";

import NextLink from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiPlay } from "react-icons/fi";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const, // ✅ সঠিক প্রপার্টি
      },
    },
  };

  return (
    <section className="relative w-full lg:max-w-7xl min-h-[60vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900 px-4 sm:px-6 lg:px-8 py-12 lg:py-0 border-b border-slate-700/60">
      
      <div className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/20 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-96 w-96 translate-x-1/2 rounded-full bg-indigo-500/20 blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[100px]" />

      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        <motion.div
          className="space-y-6 text-center lg:text-left z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wide w-fit mx-auto lg:mx-0">
            🚀 Platform Launch v2.0
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]"
          >
            Master Creative & <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-slate-400 leading-relaxed"
          >
            Access ultra-focused, production-ready courses led by industry authorities. Build verifiable real-world applications and break into tech.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
          >
            <NextLink href="/courses" passHref>
              <button className="w-full sm:w-auto font-semibold shadow-lg shadow-blue-500/30 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border-none transition-all px-8 py-6 text-base rounded-xl flex items-center justify-center gap-2">
                Explore Courses
                <FiArrowRight size={16} />
              </button>
            </NextLink>

            <NextLink href="/about" passHref>
              <button className="w-full sm:w-auto font-medium text-slate-300 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/60 hover:border-blue-500/50 transition-all px-8 py-6 text-base rounded-xl flex items-center justify-center gap-2">
                <FiPlay className="text-blue-400 fill-blue-400/20" size={16} />
                Watch Demo
              </button>
            </NextLink>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/32?img=${i + 10}`}
                    alt="Student"
                    className="w-8 h-8 rounded-full border-2 border-slate-800"
                  />
                ))}
              </div>
              <span className="text-xs text-slate-400">
                <span className="text-white font-bold">2.5k+</span> students enrolled
              </span>
            </div>
            <div className="flex items-center gap-1 text-amber-400">
              <span className="text-xs font-bold">★ 4.9</span>
              <span className="text-xs text-slate-400">(1.2k reviews)</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative w-full aspect-square max-h-[500px] lg:max-h-[600px]"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" as const, delay: 0.2 }} // ✅ সঠিক প্রপার্টি
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500/30 via-indigo-500/20 to-purple-500/20 p-2 border border-slate-700/60 shadow-2xl shadow-black/40">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop"
              alt="SkillHub Interactive Learning Platform Showcase"
              className="w-full h-full object-cover rounded-[20px]"
            />
          </div>
          
          <div className="absolute -top-6 -right-6 bg-slate-900/90 backdrop-blur-md border border-slate-700/60 p-4 rounded-2xl shadow-2xl shadow-black/40 flex items-center gap-3 animate-float">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
              99%
            </div>
            <div>
              <p className="text-xs font-bold text-white">Satisfaction</p>
              <p className="text-[10px] text-slate-400">Rate</p>
            </div>
          </div>
          
          <div className="absolute -bottom-6 -left-6 bg-slate-900/90 backdrop-blur-md border border-slate-700/60 p-4 rounded-2xl shadow-2xl shadow-black/40 flex items-center gap-3 animate-pulse">
            <div className="h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-semibold text-slate-300">1,200+ Active Students Now</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}