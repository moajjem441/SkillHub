"use client";

import { FiArrowRight, FiPlayCircle } from "react-icons/fi";

export default function CallToAction() {
  return (
    <section className="w-full max-w-7xl mx-auto py-16 px-4">
      {/* Dark Premium Glass Container */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-slate-950/90 backdrop-blur-xl text-white p-8 sm:p-16 lg:p-20 shadow-2xl shadow-black/40 border border-slate-700/60 text-center">
        
        {/* Abstract Dynamic Light Burst Overlays (Dark version) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.08),transparent_60%)]" />

        {/* Action Content Core Panel */}
        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          
          <div className="space-y-4">
            <span className="inline-block text-xs font-bold uppercase tracking-widest bg-blue-500/20 backdrop-blur-md text-blue-400 px-4 py-1.5 rounded-full border border-blue-500/30">
              Ready to Begin?
            </span>
            <h2 className="text-3xl font-black tracking-tight sm:text-5xl text-white leading-tight">
              Transform Your Theoretical Knowledge Into Production-Grade Skills
            </h2>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Join thousands of final-year software engineering students and working professionals building scalable enterprise systems, robust deep learning layers, and cloud-integrated embedded ecosystems.
            </p>
          </div>

          {/* Dual Interactive Button Subsystems */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            
            {/* Primary Action Control */}
            <button
              type="button"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base rounded-xl tracking-wide shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer border-none"
            >
              <span>Get Started Now</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-200" size={18} />
            </button>

            {/* Secondary Action Control */}
            <button
              type="button"
              className="w-full sm:w-auto px-8 py-4 bg-slate-800/60 backdrop-blur-md text-slate-300 hover:text-white font-bold text-sm sm:text-base rounded-xl tracking-wide border border-slate-700/60 hover:border-blue-500/50 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <FiPlayCircle className="text-blue-400 group-hover:scale-110 transition-transform duration-200" size={18} />
              <span>Watch Platform Demo</span>
            </button>
            
          </div>

        </div>
        
      </div>
    </section>
  );
}