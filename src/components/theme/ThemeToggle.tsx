"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div 
        className={`h-9 w-9 rounded-xl border border-slate-700/60 bg-slate-900/60 p-2 text-slate-400 ${className}`} 
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300 active:scale-95 ${
        isDark
          ? "border-slate-700/80 bg-slate-900/90 text-amber-300 hover:border-amber-400/50 hover:bg-slate-800 shadow-md shadow-black/40"
          : "border-slate-300 bg-white text-slate-700 hover:border-blue-500/50 hover:bg-slate-50 shadow-md shadow-slate-200/50"
      } ${className}`}
      aria-label={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
      title={isDark ? "Switch to Clean Light Theme" : "Switch to Obsidian Dark Theme"}
    >
      {isDark ? (
        <Sun className="h-4 w-4 transition-transform duration-300 rotate-0 hover:rotate-45 text-amber-300" />
      ) : (
        <Moon className="h-4 w-4 transition-transform duration-300 -rotate-12 hover:rotate-0 text-slate-700" />
      )}
    </button>
  );
}
