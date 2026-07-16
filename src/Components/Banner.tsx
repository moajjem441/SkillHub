"use client";


import NextLink from "next/link";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { FiArrowRight, FiPlay } from "react-icons/fi";

export default function Hero() {
  // Framer Motion Animation Variants for staggering effect
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
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  return (
    <section className="relative w-full min-h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden bg-background px-4 sm:px-6 lg:px-8 py-12 lg:py-0 border-b border-divider/50">
      
      {/* --- BACKGROUND DECORATION (SaaS Ambient Glow) --- */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[80px]" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-72 w-72 translate-x-1/2 rounded-full bg-indigo-500/10 blur-[80px]" />

      {/* Main Grid Chassis */}
      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* --- LEFT COLUMN: TEXT CONTENT (6 Columns) --- */}
        <motion.div 
          className="lg:col-span-7 space-y-5 text-center lg:text-left z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wide w-fit">
            🚀 Platform Launch v2.0
          </motion.div>

          <motion.h1 
            variants={itemVariants} 
            className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl leading-[1.1]"
          >
            Master Creative & <br />
            <span className="bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants} 
            className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-foreground-500 leading-relaxed"
          >
            Access ultra-focused, production-ready courses led by industry authorities. Build verifiable real-world applications and break into tech.
          </motion.p>

          <motion.div 
            variants={itemVariants} 
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2"
          >
            {/* Primary CTA */}
            <Button
              as={NextLink}
              href="/courses"
              color="primary"
              variant="solid"
              radius="xl"
              size="lg"
              endContent={<FiArrowRight size={16} />}
              className="w-full sm:w-auto font-semibold shadow-md shadow-primary/20"
            >
              Explore Courses
            </Button>

            {/* Secondary Button */}
            <Button
              as={NextLink}
              href="/about"
              variant="bordered"
              radius="xl"
              size="lg"
              startContent={<FiPlay className="text-primary fill-primary/10" size={16} />}
              className="w-full sm:w-auto font-medium text-foreground bg-background hover:bg-content2 transition-all"
            >
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* --- RIGHT COLUMN: PREMIUM ILLUSTRATION (5 Columns + 1 Offset) --- */}
        <motion.div 
          className="hidden lg:block lg:col-span-5 relative w-full aspect-square max-h-[400px]"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/20 to-indigo-500/10 p-2 border border-divider">
            {/* Real Unsplash SaaS Learning Image */}
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop"
              alt="SkillHub Interactive Learning Platform Showcase"
              className="w-full h-full object-cover rounded-[20px] shadow-xl"
            />
          </div>
          
          {/* Micro floating dashboard item for SaaS aesthetics */}
          <div className="absolute -bottom-4 -left-6 bg-background/90 backdrop-blur-md border border-divider p-4 rounded-2xl shadow-lg flex items-center gap-3 animate-pulse">
            <div className="h-3 w-3 rounded-full bg-success" />
            <span className="text-xs font-semibold text-foreground-700">1,200+ Active Students Now</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}