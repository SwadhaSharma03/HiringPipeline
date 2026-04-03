
"use client";

import { Candidate, Stage } from "../lib/types";
import { stages } from "../lib/data";
import { cn, timeAgo } from "../lib/utils";
import { MoreHorizontal, Star, Calendar, MessageSquare, Plus, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  candidates: Candidate[];
  onCandidateClick: (candidate: Candidate) => void;
}

export function KanbanView({ candidates, onCandidateClick }: Props) {
  const getCandidatesByStage = (stage: Stage) => {
    return candidates.filter((c) => c.status === stage);
  };

  return (
    <div className="flex select-none gap-8 overflow-x-auto pb-10 scrollbar-hide">
      {stages.map((stage) => {
        const stageCandidates = getCandidatesByStage(stage);
        
        return (
          <div key={stage} className="flex min-w-[340px] flex-1 flex-col gap-6">
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <div className={cn(
                    "h-2 w-2 rounded-full",
                    stage === 'Hired' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" : 
                    stage === 'Interview' ? "bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]" : 
                    "bg-slate-400"
                )} />
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-950">{stage}</h3>
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-black text-indigo-950 shadow-sm transition-transform hover:scale-110">
                  {stageCandidates.length}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-5 min-h-[500px] rounded-[2.5rem] bg-slate-50/50 p-5 ring-1 ring-slate-100/10 backdrop-blur-[2px] shadow-inner transition-all hover:bg-slate-100/40">
               <AnimatePresence mode="popLayout">
                {stageCandidates.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex h-32 items-center justify-center rounded-[2rem] border-2 border-dashed border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-400 p-8 text-center"
                  >
                    No candidates currently in {stage}
                  </motion.div>
                ) : (
                  stageCandidates.map((candidate) => (
                    <CandidateCard 
                      key={candidate.id} 
                      candidate={candidate} 
                      onClick={() => onCandidateClick(candidate)} 
                    />
                  ))
                )}
               </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CandidateCard({ candidate, onClick }: { candidate: Candidate, onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", damping: 30, stiffness: 400, mass: 1 }}
      onClick={onClick}
      className="group flex flex-col gap-4 rounded-[2rem] bg-white p-5 shadow-[0_4px_25px_rgba(30,41,59,0.03)] ring-1 ring-slate-100 transition-all hover:shadow-[0_25px_50px_rgba(30,41,59,0.08)] cursor-pointer overflow-hidden relative border-b-4 border-transparent hover:border-violet-500"
    >
      <div className="absolute top-0 right-0 h-10 w-10 bg-violet-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-[1.5rem] flex items-center justify-center">
            <ArrowUpRight size={16} className="text-violet-600" />
      </div>
      
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <div className="h-14 w-14 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-violet-100 to-fuchsia-50 ring-1 ring-slate-100 shadow-sm group-hover:scale-105 transition-transform duration-500">
            <img 
                src={candidate.avatar} 
                alt={candidate.name} 
                className="h-full w-full rounded-2xl object-cover bg-white" 
            />
          </div>
          {candidate.matchScore > 90 && (
            <div className="absolute -bottom-1.5 -right-1.5 h-6 w-6 rounded-lg bg-emerald-500 border-4 border-white flex items-center justify-center text-white shadow-xl ring-0 group-hover:rotate-12 transition-transform">
                <CheckCircle2 size={10} strokeWidth={4} />
            </div>
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <h4 className="text-[13px] font-black text-indigo-950 tracking-tight leading-none group-hover:text-indigo-600 transition-colors uppercase truncate pr-4">{candidate.name}</h4>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mt-1.5 truncate pr-2">{candidate.currentRole}</p>
          <div className="mt-2 flex items-center gap-2">
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{candidate.currentCompany}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {candidate.skills.slice(0, 3).map((skill) => (
          <span key={skill} className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-slate-500 transition-all group-hover:bg-violet-50 group-hover:border-violet-100 group-hover:text-violet-600 shadow-sm">
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-1 flex items-center justify-between border-t border-slate-100 pt-5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-6 w-6 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 transition-transform">
                <Star size={10} strokeWidth={4} fill={candidate.matchScore > 90 ? "currentColor" : "none"} />
            </div>
            <span className="text-[11px] font-black text-indigo-950">{candidate.matchScore}%</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-black text-slate-400 group-hover:text-indigo-950 transition-colors">
            <MessageSquare size={12} strokeWidth={2.5} />
            <span>{candidate.notes.length}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 group-hover:text-violet-500 transition-colors">
          <Calendar size={12} strokeWidth={2.5} className="opacity-70" />
          <span>{timeAgo(candidate.lastActivity)}</span>
        </div>
      </div>
    </motion.div>
  );
}
