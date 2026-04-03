
"use client";

import { MapPin, Building2, User, Users, Briefcase, Share2, MoreVertical, LayoutGrid, List, CheckCircle2 } from "lucide-react";
import { JobOverview as IJobOverview } from "../lib/types";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";

interface Props {
  job: IJobOverview;
  view: 'kanban' | 'list';
  onViewChange: (view: 'kanban' | 'list') => void;
}

export function JobOverview({ job, view, onViewChange }: Props) {
  return (
    <div className="mb-10 space-y-8">
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black text-emerald-600 ring-1 ring-emerald-500/20 uppercase tracking-[0.1em] shadow-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active</span>
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">• 12 days ago</span>
            <div className="flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1 text-[10px] font-black text-indigo-600 ring-1 ring-indigo-500/10 uppercase tracking-widest shadow-sm">
              <CheckCircle2 size={12} strokeWidth={3} />
              <span>Verified</span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
              {job.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest pt-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200/50 hover:bg-slate-200 transition-colors">
                <Building2 size={12} className="text-slate-400" />
                <span>{job.department}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200/50 hover:bg-slate-200 transition-colors">
                <MapPin size={12} className="text-slate-400" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200/50 hover:bg-slate-200 transition-colors">
                <User size={12} className="text-slate-400" />
                <span>{job.hiringManager}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 pt-4">
        {[
          { label: "Total Talent", value: job.totalApplicants, icon: Users, color: "bg-emerald-50 text-emerald-600 ring-emerald-100" },
          { label: "In Pipeline", value: "48", icon: Briefcase, color: "bg-emerald-50 text-emerald-600 ring-emerald-100" },
          { label: "In Review", value: "14", icon: User, color: "bg-emerald-50 text-emerald-600 ring-emerald-100" },
          { label: "Slots Open", value: job.openPositions, icon: LayoutGrid, color: "bg-emerald-50 text-emerald-600 ring-emerald-100" },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative rounded-3xl bg-white p-6 transition-all hover:shadow-xl hover:shadow-emerald-600/5 hover:-translate-y-1 cursor-pointer border border-slate-100 hover:border-emerald-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-emerald-600 transition-colors mb-2">{stat.label}</p>
                <h3 className="mt-1 text-4xl font-extrabold text-slate-950 tracking-tighter leading-none">{stat.value}</h3>
              </div>
              <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl ring-1 transition-transform group-hover:scale-110", stat.color)}>
                <stat.icon size={20} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between border-b border-slate-100 py-4 -mt-6 -mb-4">
        <div className="flex gap-2 rounded-2xl bg-slate-100 p-1.5 border border-slate-200">
          <button
            onClick={() => onViewChange('kanban')}
            className={cn(
              "flex items-center gap-3 rounded-xl px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all",
              view === 'kanban' ? "bg-emerald-600 text-white shadow-xl shadow-emerald-600/20" : "text-slate-500 hover:text-slate-950"
            )}
          >
            <LayoutGrid size={16} />
            <span>Board</span>
          </button>
          <button
            onClick={() => onViewChange('list')}
            className={cn(
              "flex items-center gap-3 rounded-xl px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all",
              view === 'list' ? "bg-emerald-600 text-white shadow-xl shadow-emerald-600/20" : "text-slate-500 hover:text-slate-950"
            )}
          >
            <List size={16} />
            <span>List</span>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <img key={i} src={`https://i.pravatar.cc/150?u=${i + 20}`} className="h-10 w-10 rounded-2xl ring-4 ring-white shadow-lg" alt="Avatar" />
            ))}
            <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-emerald-600 text-white text-[10px] font-bold shadow-lg ring-4 ring-white">
              +8
            </div>
          </div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Hiring Team</p>
        </div>
      </div>
    </div>
  );
}
