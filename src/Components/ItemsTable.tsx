"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEye, FiTrash2, FiStar, FiUser, FiAlertTriangle, FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";

interface Course {
  id: string;
  _id?: string;
  title: string;
  instructor: string;
  rating: number;
  price: number;
  category: string;
  level: string;
  imageUrl: string;
}

interface ItemsTableProps {
  items: Course[];
  onDelete: (id: string) => Promise<void>;
}

export default function ItemsTable({ items, onDelete }: ItemsTableProps) {
  const router = useRouter();

  // 🗑️ Delete handler with Premium Toast Confirmation
  const handleDeleteClick = (id: string, title: string) => {
    toast.custom(
      (t) => (
        <div className="relative w-full max-w-md mx-auto bg-slate-900/95 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6 shadow-2xl shadow-black/60 transition-all duration-300 animate-in fade-in slide-in-from-top-4">
          {/* আইকন */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
              <FiAlertTriangle size={20} />
            </div>
            <h3 className="text-white font-bold text-lg">Delete Course?</h3>
          </div>

          {/* মেসেজ - "Are you sure..." সরানো হয়েছে */}
          <p className="text-slate-300 text-sm leading-relaxed mb-2">
            You are about to delete <span className="text-white font-semibold">"{title}"</span>.
          </p>
          <p className="text-slate-400 text-xs mb-4">
            ⚠️ This action cannot be undone. All associated data will be permanently removed.
          </p>

          {/* বাটন */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-5 py-2 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 font-medium rounded-xl text-sm transition-all border border-slate-700/50"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await onDelete(id);
                } catch (error) {
                  console.error("Delete error:", error);
                  toast.error("Failed to delete course. Please try again.");
                }
              }}
              className="px-5 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-red-500/30 flex items-center gap-2"
            >
              <FiTrash2 size={14} />
              Yes, Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: "top-center",
        style: {
          background: "transparent",
          boxShadow: "none",
          padding: 0,
        },
      }
    );
  };

  // 🔄 খালি অবস্থায় দেখানোর UI
  if (items.length === 0) {
    return (
      <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-slate-400 text-lg">No courses found</p>
          <button
            onClick={() => router.push("/admin/courses/add")}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/30 transition-all"
          >
            <FiPlus size={18} />
            Add New Course
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-800/60 border-b border-slate-700/60">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Course</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Instructor</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Category</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Level</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Rating</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Price</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/60">
            {items.map((item) => (
              <tr key={item.id || item._id} className="hover:bg-slate-800/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                    />
                    <span className="text-sm font-medium text-white line-clamp-1">{item.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">{item.instructor}</td>
                <td className="px-6 py-4 text-sm text-slate-400">{item.category}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    item.level === "Advanced"
                      ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                      : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  }`}>
                    {item.level}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-amber-400 text-sm font-semibold">
                    <FiStar className="fill-current" size={14} />
                    {item.rating.toFixed(1)}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-white">${item.price}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    {/* View Button */}
                    <Link
                      href={`/courseDetails/${item._id || item.id}`}
                      className="p-2 rounded-xl bg-blue-500/20 text-blue-400 hover:bg-blue-500/40 transition-colors"
                      title="View Details"
                    >
                      <FiEye size={18} />
                    </Link>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteClick(item._id || item.id, item.title)}
                      className="p-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors"
                      title="Delete Course"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden p-4 space-y-4">
        {items.map((item) => (
          <div
            key={item._id || item.id}
            className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 space-y-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-white truncate">{item.title}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <FiUser size={12} /> {item.instructor}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-slate-700/60 px-2.5 py-1 rounded-full text-slate-300">{item.category}</span>
              <span className={`px-2.5 py-1 rounded-full font-bold ${
                item.level === "Advanced"
                  ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                  : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              }`}>
                {item.level}
              </span>
              <span className="bg-slate-700/60 px-2.5 py-1 rounded-full text-slate-300 flex items-center gap-1">
                <FiStar className="fill-current text-amber-400" size={12} /> {item.rating.toFixed(1)}
              </span>
              <span className="bg-slate-700/60 px-2.5 py-1 rounded-full text-white font-bold">${item.price}</span>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-slate-700/60">
              <Link
                href={`/courseDetails/${item._id || item.id}`}
                className="flex-1 text-center bg-blue-500/20 text-blue-400 hover:bg-blue-500/40 font-bold text-xs py-2 rounded-xl transition-colors"
              >
                View
              </Link>
              <button
                onClick={() => handleDeleteClick(item._id || item.id, item.title)}
                className="flex-1 text-center bg-red-500/20 text-red-400 hover:bg-red-500/40 font-bold text-xs py-2 rounded-xl transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}