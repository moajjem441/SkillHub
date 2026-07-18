// components/ContactForm.tsx
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiSend } from "react-icons/fi";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const inputBaseStyles = `
  w-full px-4 py-3 
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

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    const loadingToast = toast.loading("Sending message...", {
      style: {
        background: "rgba(15, 23, 42, 0.95)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(59, 130, 246, 0.3)",
        borderRadius: "12px",
        color: "#f8fafc",
      },
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      toast.success("Message sent successfully! We'll get back to you soon. 🚀", {
        id: loadingToast,
        duration: 5000,
      });
      reset();
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to send message. Please try again.", {
        id: loadingToast,
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-8 shadow-2xl shadow-black/40">
      <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center text-slate-500">
              <FiUser size={16} />
            </div>
            <input
              type="text"
              placeholder="John Doe"
              className={`${inputBaseStyles} pl-10 ${getInputStateStyles(!!errors.name)}`}
              {...register("name")}
            />
          </div>
          {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center text-slate-500">
              <FiMail size={16} />
            </div>
            <input
              type="email"
              placeholder="john@example.com"
              className={`${inputBaseStyles} pl-10 ${getInputStateStyles(!!errors.email)}`}
              {...register("email")}
            />
          </div>
          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Subject</label>
          <input
            type="text"
            placeholder="How can we help?"
            className={`${inputBaseStyles} ${getInputStateStyles(!!errors.subject)}`}
            {...register("subject")}
          />
          {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject.message}</p>}
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Message</label>
          <textarea
            rows={5}
            placeholder="Write your message here..."
            className={`${inputBaseStyles} resize-none ${getInputStateStyles(!!errors.message)}`}
            {...register("message")}
          />
          {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-60 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
          <FiSend size={16} />
        </button>
      </form>
    </div>
  );
}