"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { registerSchema, RegisterFormValues } from "@/schemas/auth";
import { authClient } from "@/lib/auth-client";

import { useRouter } from "next/navigation";


const inputBaseStyles = `
  w-full h-11 pl-10 pr-4 py-2.5 
  bg-slate-800/60 backdrop-blur-sm
  border rounded-2xl text-sm font-medium
  placeholder-slate-500
  text-slate-100
  transition-all duration-200 ease-in-out
  disabled:opacity-50 disabled:bg-slate-800/30 disabled:cursor-not-allowed
`;

const getInputStateStyles = (hasError: boolean) => hasError 
  ? "border-red-500/60 focus:border-red-500 focus:ring-4 focus:ring-red-500/20" 
  : "border-slate-700/70 hover:border-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20";

const iconContainerStyles = "absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors duration-200";

export default function RegisterForm() {

  const router = useRouter();


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

const handleRegister = async (values: RegisterFormValues) => {
    setIsSubmitting(true);
    try {
      const { data, error } = await authClient.signUp.email({
        name: values.name,        
        email: values.email,     
        password: values.password, 
       
      });

      if(data){
        router.push("/login");
      }

      if (error) {
        // Better-Auth কোনো এরর দিলে তা হ্যান্ডেল করুন (যেমন: ইমেইল ইতিমধ্যে ব্যবহার করা হয়েছে)
        console.error("Auth error:", error.message);
        // এখানে আপনি চাইলে toast বা কোনো স্টেট দিয়ে ইউজারকে এরর দেখাতে পারেন
        return;
      }

      console.log("Registration successful:", data);
    } catch (error) {
      console.error("Registration error boundary caught exception:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleRegister = () => {
    console.log("Redirecting to social authentication framework context...");
  };





  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/40 space-y-6 transition-all">
        
        {/* Platform Branding Heading */}
        <div className="space-y-2 text-center">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/30">
            S
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white pt-1">
            Create your account
          </h1>
          <p className="text-xs md:text-sm text-slate-400 font-medium max-w-xs mx-auto">
            Join the SkillHub platform to access specialized workspaces and build your engineering profile.
          </p>
        </div>

        {/* Main Registration Input Interface */}
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-5" noValidate>
          
          {/* Full Name Input Block */}
          <div className="space-y-1.5">
            <label 
              htmlFor="name"
              className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block text-left select-none"
            >
              Full Name
            </label>
            <div className="relative group">
              <div className={iconContainerStyles}>
                <FiUser size={16} className="transition-transform duration-200 group-focus-within:scale-105" />
              </div>
              <input
                id="name"
                type="text"
                autoComplete="name"
                aria-invalid={errors.name ? "true" : "false"}
                {...register("name")}
                placeholder="Moajjem Hossain"
                className={`${inputBaseStyles} ${getInputStateStyles(!!errors.name)}`}
              />
            </div>
            {errors.name && (
              <p className="text-[11px] font-semibold text-red-400 text-left flex items-center gap-1.5 pl-1 pt-0.5 animate-fadeIn" role="alert">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 block" />
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Address Input Block */}
          <div className="space-y-1.5">
            <label 
              htmlFor="email"
              className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block text-left select-none"
            >
              Email Address
            </label>
            <div className="relative group">
              <div className={iconContainerStyles}>
                <FiMail size={16} className="transition-transform duration-200 group-focus-within:scale-105" />
              </div>
              <input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email")}
                placeholder="name@example.com"
                className={`${inputBaseStyles} ${getInputStateStyles(!!errors.email)}`}
              />
            </div>
            {errors.email && (
              <p className="text-[11px] font-semibold text-red-400 text-left flex items-center gap-1.5 pl-1 pt-0.5 animate-fadeIn" role="alert">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 block" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Security Tokens Grouting Structure */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Password Input Component */}
            <div className="space-y-1.5">
              <label 
                htmlFor="password"
                className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block text-left select-none"
              >
                Password
              </label>
              <div className="relative group">
                <div className={iconContainerStyles}>
                  <FiLock size={16} className="transition-transform duration-200 group-focus-within:scale-105" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  aria-invalid={errors.password ? "true" : "false"}
                  {...register("password")}
                  placeholder="••••••••"
                  className={`${inputBaseStyles} pr-10 ${getInputStateStyles(!!errors.password)}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-300 transition-colors bg-transparent border-none cursor-pointer focus:outline-none"
                  aria-label={showPassword ? "Hide password field" : "Reveal password field"}
                >
                  {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] font-semibold text-red-400 text-left flex items-center gap-1.5 pl-1 pt-0.5 leading-tight" role="alert">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 block flex-shrink-0" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Input Component */}
            <div className="space-y-1.5">
              <label 
                htmlFor="confirmPassword"
                className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block text-left select-none"
              >
                Confirm Password
              </label>
              <div className="relative group">
                <div className={iconContainerStyles}>
                  <FiLock size={16} className="transition-transform duration-200 group-focus-within:scale-105" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                  {...register("confirmPassword")}
                  placeholder="••••••••"
                  className={`${inputBaseStyles} pr-10 ${getInputStateStyles(!!errors.confirmPassword)}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-300 transition-colors bg-transparent border-none cursor-pointer focus:outline-none"
                  aria-label={showConfirmPassword ? "Hide password field" : "Reveal password field"}
                >
                  {showConfirmPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-[11px] font-semibold text-red-400 text-left flex items-center gap-1.5 pl-1 pt-0.5" role="alert">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 block flex-shrink-0" />
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Action Form Direct Trigger */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-blue-600/60 disabled:to-indigo-600/60 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border-none"
          >
            {isSubmitting ? "Setting Up Instance..." : "Create Account"}
            {!isSubmitting && <FiArrowRight />}
          </button>
        </form>

        {/* Visual Midpoint Separation Divider */}
        <div className="relative flex py-1 items-center text-xs text-slate-500 font-bold uppercase tracking-widest">
          <div className="flex-grow border-t border-slate-700"></div>
          <span className="flex-shrink mx-4">or continue with</span>
          <div className="flex-grow border-t border-slate-700"></div>
        </div>

        {/* Federated Identity Provider Blocks */}
        <div className="w-full">
          <button
            type="button"
            onClick={handleGoogleRegister}
            className="w-full py-2.5 bg-slate-800/80 border border-slate-700/80 hover:bg-slate-700/80 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2.5 cursor-pointer text-slate-200"
          >
            <FcGoogle size={18} />
            Sign Up with Google
          </button>
        </div>

        {/* Direct route alternative redirect linkage */}
        <p className="text-center text-xs font-medium text-slate-400">
          Already have an account?{" "}
          <Link 
            href="/login" 
            className="font-bold text-blue-400 hover:text-blue-300 hover:underline inline-flex items-center gap-0.5 transition-colors"
          >
            Login here <FiCheckCircle className="inline scale-90" />
          </Link>
        </p>
      </div>
    </div>
  );
}