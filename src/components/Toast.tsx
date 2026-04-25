"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: -20, x: "-50%" }}
      className={`fixed top-20 left-1/2 z-100 px-6 py-3 rounded-lg shadow-lg border flex items-center gap-3 ${
        type === "success"
          ? "bg-navy-800 border-gold-500/30 text-gold-500"
          : "bg-navy-800 border-red-500/30 text-red-400"
      }`}
    >
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="text-neutral-200 hover:text-neutral-50 transition-colors">
        <X size={14} />
      </button>
    </motion.div>
  );
}

interface ToastProviderProps {
  children: React.ReactNode;
}

interface ToastState {
  message: string;
  type: "success" | "error";
  id: number;
}

import { useState, useCallback } from "react";

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const addToast = useCallback((message: string, type: "success" | "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { message, type, id }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}

import { createContext, useContext } from "react";

interface ToastContextType {
  addToast: (message: string, type: "success" | "error") => void;
}

const ToastContext = createContext<ToastContextType>({ addToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}
