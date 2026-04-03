
"use client";

import { useState } from "react";
import { Candidate, Stage } from "../lib/types";
import { cn, formatDate } from "../lib/utils";
import { ResumeViewer } from "./ResumeViewer";
import { 
    X, Mail, Phone, MapPin, 
    Link as LinkIcon, MessageSquare, 
    CheckCircle2, 
    ArrowUpRight,
    Star, 
    Clock, Paperclip, 
    Pencil, Plus, Maximize2,
    Copy, Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STAGE_ORDER: Stage[] = ['Applied', 'Shortlisted', 'Interview', 'Offered', 'Hired'];

interface Props {
  candidate: Candidate | null;
  onClose: () => void;
  onStageChange: (candidateId: string, newStage: Stage) => void;
  onArchive: (candidateId: string) => void;
}

export function CandidateDetailDrawer({ candidate, onClose, onStageChange, onArchive }: Props) {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [newNote, setNewNote] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  if (!candidate) return null;

  const currentStageIndex = STAGE_ORDER.indexOf(candidate.status);
  const nextStage = currentStageIndex < STAGE_ORDER.length - 1 ? STAGE_ORDER[currentStageIndex + 1] : null;

  const handleCopy = (value: string, field: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1500);
    });
  };

  const handleNextStage = () => {
    if (nextStage) {
      onStageChange(candidate.id, nextStage);
      onClose();
    }
  };

  const handleArchive = () => {
    onArchive(candidate.id);
    onClose();
  };

  const handlePortfolioOpen = () => {
    window.open("https://github.com", "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center md:items-stretch justify-center md:justify-end overflow-hidden">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-indigo-950/40 backdrop-blur-sm"
          />

          {/* Drawer Content */}
          <motion.aside
            initial={{ x: "100%", opacity: 0.9 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.9 }}
            transition={{ type: "spring", damping: 28, stiffness: 220, mass: 1 }}
            className="relative z-10 h-[92vh] md:h-full w-full md:max-w-[500px] bg-white shadow-2xl shadow-indigo-950/30 overflow-hidden flex flex-col rounded-t-[2.5rem] md:rounded-none"
          >
            {/* Mobile handle */}
            <div className="h-1.5 w-12 bg-slate-100 rounded-full mx-auto mt-4 mb-2 md:hidden" />
            
            {/* Header */}
            <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-20">
               <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <span className="text-emerald-600">Stage {currentStageIndex + 1}</span>
                  <span className="text-slate-300">/</span>
                  <span>{candidate.status}</span>
               </div>
               
               <button 
                  onClick={onClose}
                  className="group flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 hover:bg-slate-900 hover:text-white transition-all active:scale-90 shadow-sm"
                >
                  <X size={20} strokeWidth={3} className="text-slate-500 group-hover:text-white" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6 scrollbar-hide">
                {/* Candidate Header Profile */}
                <div className="flex flex-col items-center text-center mb-8">
                <div className="relative mb-4">
                    <div className="h-28 w-28 rounded-[2.5rem] overflow-hidden p-1 bg-gradient-to-tr from-emerald-600 to-teal-400 ring-4 ring-white shadow-2xl">
                        <img 
                        src={candidate.avatar} 
                        alt={candidate.name} 
                        className="h-full w-full rounded-[2.2rem] object-cover bg-white" 
                        />
                    </div>
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter">{candidate.name}</h2>
                <p className="mt-1 text-[10px] font-black text-emerald-600 tracking-widest uppercase">{candidate.currentRole}</p>
                <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest leading-none">{candidate.currentCompany}</p>
                
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <div className="flex flex-col items-center justify-center px-5 py-3 bg-slate-50 rounded-2xl ring-1 ring-slate-100 shadow-sm min-w-24">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Score</span>
                    <span className="text-xl font-black text-slate-900 mt-1 tracking-tighter">{candidate.matchScore}%</span>
                    </div>
                    <div className="flex flex-col items-center justify-center px-5 py-3 bg-slate-50 rounded-2xl ring-1 ring-slate-100 shadow-sm min-w-24">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Exp</span>
                    <span className="text-xl font-black text-slate-900 mt-1 tracking-tighter">{candidate.experience}y</span>
                    </div>
                    <div className={cn(
                        "flex flex-col items-center justify-center px-5 py-3 rounded-2xl ring-1 shadow-lg min-w-24",
                        candidate.status === 'Hired' ? "bg-emerald-600 ring-emerald-500 shadow-emerald-500/20" : "bg-slate-900 ring-slate-800 shadow-slate-900/20"
                    )}>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Stage</span>
                    <span className="text-sm font-black text-white mt-1 uppercase tracking-tight">{candidate.status}</span>
                    </div>
                </div>
                </div>

                <div className="space-y-8">
                    {/* Contact Info */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">Contact Information</h3>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Click to copy</span>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            <ContactRow icon={Mail} value={candidate.email} field="email" copiedField={copiedField} onCopy={handleCopy} />
                            <ContactRow icon={Phone} value={candidate.phone} field="phone" copiedField={copiedField} onCopy={handleCopy} />
                            <ContactRow icon={MapPin} value="San Francisco, CA" field="location" copiedField={copiedField} onCopy={handleCopy} />
                            <ContactRow icon={LinkIcon} value="linkedin.com/in/profile" field="linkedin" copiedField={copiedField} onCopy={handleCopy} />
                        </div>
                    </section>

                    {/* Skills */}
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4">Core Skills & Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {candidate.skills.map((skill) => (
                                <span key={skill} className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-100 transition-all cursor-default">
                                    {skill}
                                </span>
                            ))}
                            {isAddingSkill ? (
                              <form onSubmit={(e) => { e.preventDefault(); if (newSkill.trim()) { candidate.skills.push(newSkill.trim()); setNewSkill(""); setIsAddingSkill(false); } }}>
                                <input
                                  autoFocus
                                  value={newSkill}
                                  onChange={e => setNewSkill(e.target.value)}
                                  onBlur={() => setIsAddingSkill(false)}
                                  placeholder="Add skill…"
                                  className="rounded-xl border-2 border-emerald-400 px-3 py-1.5 text-xs font-bold text-slate-700 outline-none w-28"
                                />
                              </form>
                            ) : (
                              <button
                                onClick={() => setIsAddingSkill(true)}
                                className="rounded-xl border-2 border-dashed border-slate-200 px-4 py-2 text-xs font-bold text-slate-400 hover:border-emerald-400 hover:text-emerald-500 transition-all"
                              >
                                + Add skill
                              </button>
                            )}
                        </div>
                    </section>

                    {/* Notes */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">Assessment Notes</h3>
                            <button
                              onClick={() => setIsAddingNote(v => !v)}
                              className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:scale-110 active:scale-95 transition-all shadow-sm"
                            >
                                <Plus size={14} strokeWidth={3} />
                            </button>
                        </div>
                        <AnimatePresence>
                          {isAddingNote && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mb-4 overflow-hidden"
                            >
                              <textarea
                                autoFocus
                                value={newNote}
                                onChange={e => setNewNote(e.target.value)}
                                placeholder="Write a note about this candidate…"
                                className="w-full rounded-2xl border border-slate-200 p-4 text-sm font-medium text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10 resize-none"
                                rows={3}
                              />
                              <div className="flex gap-2 mt-2">
                                <button
                                  onClick={() => { if (newNote.trim()) { candidate.notes.push({ id: Date.now().toString(), text: newNote.trim(), author: "You", date: new Date().toISOString().split("T")[0] }); setNewNote(""); setIsAddingNote(false); } }}
                                  className="flex-1 h-9 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                                >Save Note</button>
                                <button onClick={() => setIsAddingNote(false)} className="h-9 px-4 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition-colors">Cancel</button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <div className="space-y-4">
                            {candidate.notes.length > 0 ? candidate.notes.map((note) => (
                                <div key={note.id} className="relative rounded-2xl bg-slate-50/70 p-4 ring-1 ring-slate-100 shadow-sm border-l-4 border-emerald-500">
                                    <p className="text-sm font-medium text-slate-700 leading-relaxed italic">{note.text}</p>
                                    <div className="mt-3 flex items-center justify-between">
                                        <div className="flex items-center gap-1.5">
                                            <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-600">
                                                {note.author[0]}
                                            </div>
                                            <span className="text-[11px] font-bold text-slate-900">{note.author}</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{formatDate(note.date)}</span>
                                    </div>
                                </div>
                            )) : (
                                <div className="flex h-24 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 text-slate-400">
                                    <MessageSquare size={20} className="mb-2 opacity-50" />
                                    <span className="text-xs font-medium">No notes yet. Click + to add one.</span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Documents */}
                    <section className="mb-24">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4">Documents</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button 
                                onClick={() => setIsResumeOpen(true)}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-white ring-1 ring-slate-100 hover:ring-emerald-300 hover:bg-emerald-50/30 hover:shadow-xl hover:shadow-emerald-500/5 transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Maximize2 size={12} className="text-emerald-400" />
                                </div>
                                <div className="p-3 rounded-2xl bg-rose-50 text-rose-600 transition-transform group-hover:scale-110">
                                    <Paperclip size={20} />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-xs font-black text-slate-800 tracking-tight group-hover:text-emerald-600 transition-colors">Resume_Final.pdf</span>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">PDF Document • 2.4 MB</span>
                                </div>
                            </button>
                            <button
                              onClick={handlePortfolioOpen}
                              className="flex items-center gap-4 p-4 rounded-2xl bg-white ring-1 ring-slate-100 hover:ring-sky-300 hover:bg-sky-50/30 hover:shadow-xl hover:shadow-sky-500/5 transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight size={12} className="text-sky-400" />
                                </div>
                                <div className="p-3 rounded-2xl bg-sky-50 text-sky-600 transition-transform group-hover:scale-110">
                                    <LinkIcon size={20} />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-xs font-black text-slate-800 tracking-tight group-hover:text-sky-600 transition-colors">Portfolio Site</span>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Opens in new tab</span>
                                </div>
                            </button>
                        </div>
                    </section>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="px-8 py-6 border-t border-slate-100 bg-white/80 backdrop-blur-md sticky bottom-0 z-20 flex gap-4 shadow-[0_-15px_40px_rgba(0,0,0,0.03)]">
                <button
                  onClick={handleArchive}
                  className="flex-1 h-14 rounded-2xl bg-slate-100 text-slate-700 font-black text-xs uppercase tracking-[0.1em] hover:bg-slate-200 transition-all active:scale-95 shadow-sm"
                >
                    Archive
                </button>
                {nextStage ? (
                  <button
                    onClick={handleNextStage}
                    className="flex-[2] h-14 rounded-2xl bg-emerald-600 text-white font-black text-xs uppercase tracking-[0.1em] hover:bg-emerald-700 shadow-2xl shadow-emerald-600/20 transition-all hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2"
                  >
                      <span>Move to {nextStage}</span>
                      <ArrowUpRight size={16} />
                  </button>
                ) : (
                  <div className="flex-[2] h-14 rounded-2xl bg-emerald-100 text-emerald-700 font-black text-xs uppercase tracking-[0.1em] flex items-center justify-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>Hired ✓</span>
                  </div>
                )}
            </div>
          </motion.aside>
        </div>
      </AnimatePresence>

      <ResumeViewer 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
        candidateName={candidate.name} 
      />
    </>
  );
}

function ContactRow({ icon: Icon, value, field, copiedField, onCopy }: { icon: any, value: string, field: string, copiedField: string | null, onCopy: (v: string, f: string) => void }) {
    const isCopied = copiedField === field;
    return (
        <button
          onClick={() => onCopy(value, field)}
          className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/50 ring-1 ring-slate-100 transition-all hover:bg-white hover:ring-emerald-200 hover:shadow-sm w-full text-left group"
        >
            <div className="text-slate-400 bg-white p-2 rounded-xl shadow-sm ring-1 ring-slate-100 flex items-center justify-center flex-shrink-0">
                <Icon size={14} className="text-emerald-500" />
            </div>
            <span className="text-sm font-bold text-slate-700 tracking-tight flex-1 truncate">{value}</span>
            <div className={cn("flex-shrink-0 transition-all", isCopied ? "text-emerald-500" : "text-slate-300 group-hover:text-slate-400")}>
              {isCopied ? <Check size={14} /> : <Copy size={14} />}
            </div>
        </button>
    )
}
