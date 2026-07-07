"use client";

import { useEffect, useState } from "react";

const TOAST_EVENT = "ethnic-studio-toast";

export function showToast(message: string) {
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: message }));
}

export function ToastHost() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;
    function handler(e: Event) {
      const detail = (e as CustomEvent<string>).detail;
      setMessage(detail);
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setMessage(null), 2200);
    }
    window.addEventListener(TOAST_EVENT, handler);
    return () => {
      window.removeEventListener(TOAST_EVENT, handler);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-navy-900 px-5 py-3 text-sm font-medium text-white shadow-lg">
      {message}
    </div>
  );
}
