
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  LayoutDashboard,
  Settings,
  Zap,
  X,
  CreditCard,
  Target
} from "lucide-react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/#" },
  { icon: Briefcase, label: "Jobs", href: "/", active: true },
  { icon: Target, label: "Candidates", href: "/#" },
];



interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

export function Sidebar({ isOpen, onClose, className }: SidebarProps) {
  return (
    <aside className={cn(
      "fixed left-0 top-0 z-50 h-screen w-64 border-r border-slate-200/60 bg-slate-50 transition-all duration-300 ease-in-out",
      "lg:translate-x-0",
      !isOpen && "-translate-x-full lg:translate-x-0",
      className
    )}>
      <div className="flex h-full flex-col px-4 py-8">
        {/* Logo & Mobile Close */}
        <div className="mb-10 flex items-center justify-between px-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
              <Zap size={20} fill="currentColor" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">TalentFlow</span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Main Nav */}
        <nav className="flex-1 space-y-1 pt-4">
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 ml-1">Workspace</p>
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200",
                item.active
                  ? "bg-white text-emerald-600 shadow-sm border border-slate-200 font-bold"
                  : "text-slate-500 hover:bg-white/50 hover:text-slate-900 font-medium"
              )}
            >
              <item.icon size={18} className={cn(item.active ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-600", "transition-colors")} />
              <span>{item.label}</span>
              {item.active && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-600" />}
            </Link>
          ))}
        </nav>

        {/* Bottom Nav */}
        <nav className="mt-auto space-y-1 px-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">Management</p>


          <div className="mt-6 pt-6 border-t border-slate-200/60">
            <div className="flex items-center gap-3 px-1">
              <div className="h-9 w-9 rounded-xl bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-[10px] shadow-sm">
                JD
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-slate-900 truncate">Swadha Sharma</span>
                <span className="text-[10px] font-medium text-slate-400 truncate">Admin Access</span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
