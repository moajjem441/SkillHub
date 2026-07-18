import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiAward, FiUsers, FiBookOpen, FiTrendingUp } from "react-icons/fi";

export const metadata = {
  title: "About Us | SkillHub",
  description: "Learn about SkillHub - our mission, vision, team, and impact on the developer community.",
};

// Stat Card Component
function StatCard({ icon: Icon, label, value, suffix = "" }: any) {
  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6 text-center shadow-2xl shadow-black/40 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1">
      <div className="w-12 h-12 mx-auto rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
        <Icon size={24} />
      </div>
      <div className="text-3xl font-black text-white">{value}{suffix}</div>
      <div className="text-sm text-slate-400 mt-1">{label}</div>
    </div>
  );
}

// Team Member Card
function TeamMember({ name, role, image, bio }: any) {
  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6 text-center shadow-2xl shadow-black/40 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1">
      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-blue-500/30 mb-4">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-lg font-bold text-white">{name}</h3>
      <p className="text-sm text-blue-400 font-semibold">{role}</p>
      <p className="text-xs text-slate-400 mt-2">{bio}</p>
    </div>
  );
}

export default function AboutPage() {
  const stats = [
    { icon: FiUsers, label: "Active Students", value: "15,000", suffix: "+" },
    { icon: FiBookOpen, label: "Courses Available", value: "120", suffix: "+" },
    { icon: FiAward, label: "Certifications", value: "8,500", suffix: "+" },
    { icon: FiTrendingUp, label: "Satisfaction Rate", value: "98", suffix: "%" },
  ];

  const team = [
    {
      name: "Moajjem Hossain",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      bio: "Full-stack engineer with 10+ years of experience in enterprise architecture and developer education.",
    },
    {
      name: "Sarah Johnson",
      role: "Head of Curriculum",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      bio: "Former CS professor with a passion for making complex topics accessible and engaging.",
    },
    {
      name: "Dr. Emily Watson",
      role: "AI & ML Lead",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      bio: "PhD in Machine Learning with 8 years of industry experience in AI research and deployment.",
    },
  ];

  return (
    <div className="w-full text-slate-100 pb-20">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-16 md:py-24 px-4 border-b border-slate-700/60">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30 inline-block mb-4">
            About Us
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Empowering the Next Generation of <br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Developers & Engineers
            </span>
          </h1>
          <p className="text-sm md:text-lg text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed">
            SkillHub is a premier online learning platform dedicated to equipping aspiring and experienced developers with production-grade skills for the modern tech industry.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-8 shadow-2xl shadow-black/40 hover:border-blue-500/50 transition-all duration-300">
          <div className="text-4xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
          <p className="text-slate-400 leading-relaxed">
            To bridge the gap between theoretical knowledge and real-world engineering by providing accessible, high-quality, production-focused courses that empower developers to build scalable, secure, and innovative solutions.
          </p>
        </div>
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-8 shadow-2xl shadow-black/40 hover:border-blue-500/50 transition-all duration-300">
          <div className="text-4xl mb-4">🌟</div>
          <h2 className="text-2xl font-bold text-white mb-3">Our Vision</h2>
          <p className="text-slate-400 leading-relaxed">
            A world where every developer, regardless of background, has access to the skills and resources they need to build the future—one line of code at a time.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-black text-white text-center mb-10">Our Impact in Numbers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-black text-white text-center mb-4">Meet the Team</h2>
        <p className="text-slate-400 text-center max-w-xl mx-auto mb-10">
          Passionate educators and engineers dedicated to your learning journey.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, idx) => (
            <TeamMember key={idx} {...member} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-slate-700/60 rounded-3xl p-10 text-center shadow-2xl shadow-black/40">
          <h2 className="text-2xl font-bold text-white mb-2">Ready to Start Learning?</h2>
          <p className="text-slate-400 mb-6">Join thousands of students building their dream careers.</p>
          <Link
            href="/register"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-blue-500/30 transition-all"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}