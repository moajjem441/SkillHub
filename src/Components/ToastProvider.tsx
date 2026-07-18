"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "rgba(15, 23, 42, 0.95)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(71, 85, 105, 0.5)",
          borderRadius: "12px",
          color: "#f8fafc",
          padding: "16px 20px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
        },
        success: {
          style: {
            border: "1px solid rgba(52, 211, 153, 0.3)",
          },
          iconTheme: {
            primary: "#34d399",
            secondary: "#0f172a",
          },
        },
        error: {
          style: {
            border: "1px solid rgba(251, 113, 133, 0.3)",
          },
          iconTheme: {
            primary: "#fb7185",
            secondary: "#0f172a",
          },
        },
      }}
    />
  );
}