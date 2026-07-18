// app/contact/page.tsx
import React from "react";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact Us | SkillHub",
  description: "Get in touch with SkillHub. We'd love to hear from you!",
};

export default function ContactPage() {
  const contactInfo = [
    { icon: FiMapPin, label: "Address", value: "Mirpur 10, Dhaka, Bangladesh" },
    { icon: FiPhone, label: "Phone", value: "+880 1708372039" },
    { icon: FiMail, label: "Email", value: "support@skillhub.com" },
    { icon: FiClock, label: "Working Hours", value: "Sat-Thu, 10:00 AM - 8:00 PM" },
  ];

  return (
    <div className="w-full text-slate-100 pb-20">
      {/* Hero */}
      <section className="w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-16 md:py-20 px-4 border-b border-slate-700/60">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30 inline-block mb-4">
            Contact Us
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Get in <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-sm md:text-lg text-slate-400 max-w-xl mx-auto mt-4 leading-relaxed">
            Have questions, feedback, or ideas? We'd love to hear from you. Reach out and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ContactForm />

        <div className="space-y-8">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-8 shadow-2xl shadow-black/40">
            <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              We're here to help! Whether you have a question about a course, need support, or want to share feedback — we're all ears.
            </p>
            <div className="space-y-5">
              {contactInfo.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-8 shadow-2xl shadow-black/40 text-center">
            <p className="text-sm text-slate-400">
              📍 Visit our <span className="text-blue-400 font-semibold">Mirpur 10</span> campus or connect with us on social media!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}