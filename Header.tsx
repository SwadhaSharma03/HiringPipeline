
"use client";

import { Bell, Search, Plus, SlidersHorizontal, ChevronRight, Home, HelpCircle, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onMenuOpen?: () => void;
}

export function Header({ onMenuOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-xl px-4 md:px-8 transition-all">
      {/* Mobile Menu & Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuOpen}
          className="lg:hidden p-2.5 rounded-2xl bg-indigo-50 text-indigo-950 active:scale-95 transition-all outline-none ring-1 ring-indigo-200"
        >
          <Menu size={22} strokeWidth={2.5} />
        </button>

        {/* Desktop Breadcrumbs (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <div className="flex items-center gap-2 hover:text-indigo-950 cursor-pointer transition-colors px-2 py-1.5 rounded-xl hover:bg-slate-50">
            <Home size={14} className="text-indigo-400" />
            <span>Dashboard</span>
          </div>
          <ChevronRight size={14} className="opacity-20 mx-1" />
          <div className="flex items-center gap-2 hover:text-indigo-950 cursor-pointer transition-colors px-2 py-1.5 rounded-xl hover:bg-slate-50">
            <span>Jobs</span>
          </div>
          <ChevronRight size={14} className="opacity-20 mx-1" />
          <span className="text-emerald-800 font-semibold px-3.5 py-1.5 bg-emerald-50 rounded-xl ring-1 ring-emerald-100 shadow-sm shadow-emerald-500/5">Senior Full Stack Engineer</span>
        </div>

        {/* Mobile Job Title (Condensed) */}
        <div className="lg:hidden">
          <h1 className="text-sm font-black text-indigo-950 truncate max-w-[120px] uppercase tracking-tight">Engineer Pipeline</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-6 w-[1px] bg-slate-100 mx-1 hidden sm:block" />

        {/* <button className="flex h-12 items-center gap-2.5 rounded-2xl bg-emerald-600 px-5 text-[10px] font-bold text-white shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95 uppercase tracking-widest whitespace-nowrap group">
          <Plus size={18} strokeWidth={3} className="hidden sm:block group-hover:rotate-90 transition-transform duration-300" />
          <span>Post Job</span>
        </button> */}
      </div>
    </header>
  );
}
