"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: "linear-gradient(to right, #2563eb, #7c3aed)",
          color: "#fff",
          borderRadius: "14px",
          padding: "18px 28px",
          marginBottom: "2rem",
          boxShadow: "0 20px 40px rgba(37, 99, 235, 0.45)",
          fontSize: "1rem",
          textAlign: "center",
        },
        success: {
          duration: 3000,
          iconTheme: {
            primary: "#4ade80",
            secondary: "#fff",
          },
        },
        error: {
          duration: 4000,
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
        },
      }}
    />
  );
}
