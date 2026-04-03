
"use client";

import { Candidate } from "../lib/types";
import { cn, timeAgo, formatDate } from "../lib/utils";
import { MoreVertical, Star, CheckCircle2, AlertCircle, Clock, ExternalLink, ArrowUpRight, MessageSquare, Paperclip } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  candidates: Candidate[];
  onCandidateClick: (candidate: Candidate) => void;
}

export function ListView({ candidates, onCandidateClick }: Props) {
  return (
    <div className="w-full overflow-x-auto rounded-[2rem] md:rounded-[3rem] bg-white ring-1 ring-slate-100 shadow-2xl shadow-indigo-500/10 backdrop-blur-3xl transition-all border-b-8 border-transparent hover:border-violet-500/20">
      <table className="w-full min-w-[1000px] text-left border-collapse border-spacing-0">
        <thead className="sticky top-0 bg-slate-50/90 backdrop-blur-xl z-10">
          <tr className="border-b border-slate-100">
            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Talent Candidate</th>
            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Score</th>
            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Experience</th>
            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Hiring Phase</th>
            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Activity Tags</th>
            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {candidates.map((candidate, idx) => (
            <motion.tr
              key={candidate.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.3 }}
              onClick={() => onCandidateClick(candidate)}
              className="group cursor-pointer transition-all hover:bg-violet-50/40 active:bg-violet-100/50 relative overflow-hidden"
            >
              <td className="px-8 py-6">
                <div className="flex items-center gap-5">
                  <div className="relative group-hover:scale-105 transition-transform duration-500">
                    <div className="h-14 w-14 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-violet-100 to-fuchsia-50 ring-1 ring-slate-100 shadow-sm relative">
                        <img 
                          src={candidate.avatar} 
                          alt={candidate.name} 
                          className="h-full w-full rounded-2xl object-cover bg-white" 
                        />
                         <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight size={10} strokeWidth={4} className="text-violet-600" />
                        </div>
                    </div>
                    <div className={cn(
                        "absolute -bottom-1 -right-1 h-5 w-5 rounded-lg border-4 border-white shadow-xl ring-0 transition-transform group-hover:scale-110",
                        candidate.status === 'Hired' ? "bg-emerald-500" : "bg-violet-500"
                    )} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-indigo-950 group-hover:text-indigo-600 transition-colors uppercase tracking-tight truncate max-w-[140px]">{candidate.name}</span>
                        <div className="h-4 w-[1px] bg-slate-200" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{candidate.experience}y</span>
                    </div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1.5 truncate group-hover:text-slate-600 transition-colors leading-none">{candidate.currentRole}</p>
                    <div className="mt-2 flex items-center gap-4">
                        <div className="flex items-center gap-1 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            <MessageSquare size={10} strokeWidth={4} className="text-violet-400" />
                            <span>{candidate.notes.length} notes</span>
                        </div>
                        <div className="flex items-center gap-1 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            <Paperclip size={10} strokeWidth={4} className="text-rose-400" />
                            <span>v2.pdf</span>
                        </div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-8 py-6 text-center">
                <div className="inline-flex flex-col items-center gap-2">
                   <div className="relative h-12 w-12 flex items-center justify-center">
                        <svg className="h-full w-full -rotate-90 transform">
                            <circle
                                className="text-slate-100"
                                strokeWidth="3.5"
                                stroke="currentColor"
                                fill="transparent"
                                r="18"
                                cx="24"
                                cy="24"
                            />
                            <circle
                                className="text-violet-600 transition-all duration-1000 ease-out"
                                strokeWidth="3.5"
                                strokeDasharray={113}
                                strokeDashoffset={113 - (113 * candidate.matchScore) / 100}
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="transparent"
                                r="18"
                                cx="24"
                                cy="24"
                            />
                        </svg>
                        <span className="absolute text-[10px] font-black text-indigo-950 group-hover:text-indigo-600 transition-colors">{candidate.matchScore}%</span>
                   </div>
                </div>
              </td>
              <td className="px-8 py-6">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-slate-100/50 rounded-2xl text-[10px] font-black text-indigo-950 tracking-widest uppercase ring-1 ring-slate-200 group-hover:bg-white group-hover:shadow-sm transition-all">
                    <Clock size={12} strokeWidth={3} className="text-indigo-500" />
                    <span>{candidate.experience} Years Exp</span>
                </div>
              </td>
              <td className="px-8 py-6">
                <span className={cn(
                  "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest ring-1 ring-inset shadow-sm group-hover:scale-105 transition-transform duration-300",
                  candidate.status === 'Applied' && "bg-slate-100 text-slate-700 ring-slate-200",
                  candidate.status === 'Shortlisted' && "bg-cyan-50 text-cyan-700 ring-cyan-200 shadow-cyan-500/5",
                  candidate.status === 'Interview' && "bg-violet-50 text-violet-700 ring-violet-200 shadow-violet-500/5",
                  candidate.status === 'Offered' && "bg-orange-50 text-orange-700 ring-orange-200 shadow-orange-500/5",
                  candidate.status === 'Hired' && "bg-emerald-50 text-emerald-700 ring-emerald-200 shadow-emerald-500/5"
                )}>
                  <div className={cn(
                      "h-1.5 w-1.5 rounded-full animate-pulse",
                      candidate.status === 'Hired' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" : 
                      candidate.status === 'Interview' ? "bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]" : 
                      "bg-slate-400"
                  )} />
                  {candidate.status}
                </span>
              </td>
              <td className="px-8 py-6">
                 <div className="flex flex-col">
                    <span className="text-[11px] font-black text-indigo-950 tracking-tighter uppercase group-hover:text-indigo-600 transition-colors">{timeAgo(candidate.lastActivity)}</span>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1 opacity-70 border-t border-slate-100 pt-1 border-dashed">{formatDate(candidate.lastActivity)}</span>
                 </div>
              </td>
              <td className="px-8 py-6 text-center">
                <button
                  onClick={(e) => { e.stopPropagation(); onCandidateClick(candidate); }}
                  className="rounded-xl px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100 hover:border-emerald-600 active:scale-95"
                >
                  View
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
