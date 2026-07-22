"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import ItemsTable from "@/Components/ItemsTable";
import toast from "react-hot-toast";

export default function ManageItemsPage() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ সঠিক টোকেন ফেচ পদ্ধতি (শুধু authClient.token())
  const fetchToken = async (): Promise<string | null> => {
    try {
      const { data: tokenData } = await authClient.token();
      return tokenData?.token || null;
    } catch (error) {
      console.error("Token fetch error:", error);
      return null;
    }
  };

  // 🔐 Session check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: session } = await authClient.getSession();
        if (!session) {
          router.push("/login");
        } else {
          setIsCheckingAuth(false);
          fetchItems();
        }
      } catch (error) {
        console.error("Auth error:", error);
        router.push("/login");
      }
    };
    checkAuth();
  }, [router]);

  // 📦 Fetch items (পাবলিক এন্ডপয়েন্ট, তবে টোকেন যোগ করা হলো)
  const fetchItems = async () => {
    try {
      setLoading(true);
      const token = await fetchToken();
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/courses`, {
        headers,
      });
      if (!res.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
      toast.error("Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete handler – টোকেন সহ DELETE কল
  const handleDelete = async (id: string) => {
    try {
      const token = await fetchToken();
      if (!token) {
        toast.error("Authentication token missing. Please login again.");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/course/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete");

      toast.success("Course deleted successfully!");
      fetchItems(); // Refresh list
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete course");
    }
  };

  if (isCheckingAuth || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">{loading ? "Loading items..." : "Checking authentication..."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">Manage Courses</h1>
            <p className="text-slate-400 text-sm mt-1">View and manage all courses</p>
          </div>
          {/* <button
            onClick={() => router.push("/admin/courses/add")}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all"
          >
            + Add New
          </button> */}
        </div>

        {/* Table – ItemsTable ইতিমধ্যে Toast কনফার্মেশন দেখায় */}
        <ItemsTable items={items} onDelete={handleDelete} />
      </div>
    </div>
  );
}