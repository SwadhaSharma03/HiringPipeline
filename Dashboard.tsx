
"use client";

import { useState, useMemo, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { JobOverview } from "./JobOverview";
import { KanbanView } from "./KanbanView";
import { ListView } from "./ListView";
import { CandidateDetailDrawer } from "./CandidateDetailDrawer";
import { candidates as initialCandidates, jobOverview } from "../lib/data";
import { Candidate, Stage } from "../lib/types";
import { Search, SlidersHorizontal, ChevronDown, RotateCcw, Filter, LayoutGrid, List as ListIcon, Zap, Download, X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

export default function Dashboard() {
  const [candidateList, setCandidateList] = useState<Candidate[]>(initialCandidates);
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState<Stage | 'All'>('All');
  const [minExperience, setMinExperience] = useState<number>(0);
  const [minScore, setMinScore] = useState<number>(0);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleStageChange = (candidateId: string, newStage: Stage) => {
    setCandidateList(prev => prev.map(c => c.id === candidateId ? { ...c, status: newStage } : c));
  };

  const handleArchive = (candidateId: string) => {
    setCandidateList(prev => prev.filter(c => c.id !== candidateId));
  };

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredCandidates = useMemo(() => {
    return candidateList.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           c.currentRole.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStage = selectedStage === 'All' || c.status === selectedStage;
      const matchesExperience = c.experience >= minExperience;
      const matchesScore = c.matchScore >= minScore;
      return matchesSearch && matchesStage && matchesExperience && matchesScore;
    });
  }, [candidateList, searchQuery, selectedStage, minExperience, minScore]);

  const handleExport = () => {
    const csvRows = [
      ["Name", "Role", "Company", "Stage", "Experience", "Match Score", "Email"].join(","),
      ...filteredCandidates.map(c =>
        [c.name, c.currentRole, c.currentCompany, c.status, c.experience, c.matchScore, c.email].join(",")
      )
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "candidates_export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative flex min-h-screen bg-slate-50 font-sans text-indigo-950 selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-indigo-950/40 backdrop-blur-sm lg:hidden transition-all duration-300"
          />
        )}
      </AnimatePresence>

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <main className={cn(
        "flex-1 transition-all duration-300 min-w-0",
        "lg:pl-64"
      )}>
        <Header onMenuOpen={() => setIsSidebarOpen(true)} />
        
        <div className="mx-auto max-w-[1600px] px-4 md:px-8 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <JobOverview 
              job={jobOverview} 
              view={view} 
              onViewChange={setView} 
            />

            {/* Premium Interaction Bar */}
            <div className="mb-8 md:mb-10 flex flex-col xl:flex-row items-center justify-between gap-4 md:gap-6 bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm ring-1 ring-slate-100/50">
              <div className="relative flex-1 w-full max-w-xl group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-indigo-600 transition-colors">
                  <Search size={20} strokeWidth={2.5} />
                </div>
                <input
                  type="text"
                  placeholder="Find candidates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 md:h-14 w-full rounded-[1rem] md:rounded-[1.5rem] bg-slate-50 border border-slate-100 px-12 md:px-14 text-xs md:text-sm font-bold focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 transition-all outline-none text-indigo-950 placeholder:text-slate-400 group-hover:bg-white"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 md:gap-4 w-full xl:w-auto">
                <div className="flex flex-wrap items-center gap-2 px-3 md:px-4 py-2 bg-slate-50 rounded-2xl ring-1 ring-slate-100 flex-1 sm:flex-none justify-between sm:justify-start">
                    <Filter size={16} className="text-indigo-500 hidden sm:block" strokeWidth={3} />
                    <div className="h-4 w-[1px] bg-slate-200 mx-2 hidden sm:block" />
                    
                    <div className="relative">
                        <select 
                            value={selectedStage}
                            onChange={(e) => setSelectedStage(e.target.value as any)}
                            className="appearance-none bg-transparent pr-6 text-[10px] font-black uppercase tracking-widest text-indigo-950 focus:outline-none cursor-pointer"
                        >
                            <option value="All">Stage</option>
                            <option value="Applied">Applied</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Interview">Interview</option>
                            <option value="Offered">Offered</option>
                            <option value="Hired">Hired</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none text-slate-400">
                            <ChevronDown size={14} strokeWidth={3} />
                        </div>
                    </div>

                    <div className="h-4 w-[1px] bg-slate-200 mx-2" />

                    <div className="relative">
                        <select 
                            value={minExperience}
                            onChange={(e) => setMinExperience(Number(e.target.value))}
                            className="appearance-none bg-transparent pr-6 text-[10px] font-black uppercase tracking-widest text-indigo-950 focus:outline-none cursor-pointer"
                        >
                            <option value="0">Exp</option>
                            <option value="3">3+ y</option>
                            <option value="5">5+ y</option>
                            <option value="8">8+ y</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none text-slate-400">
                            <ChevronDown size={14} strokeWidth={3} />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 flex-none ml-auto xl:ml-0">
                    <button 
                    onClick={() => {
                        setSearchQuery("");
                        setSelectedStage("All");
                        setMinExperience(0);
                        setMinScore(0);
                    }}
                    className="h-12 w-12 md:h-14 md:w-14 flex items-center justify-center rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-indigo-950 hover:bg-slate-50 transition-all shadow-sm active:scale-90"
                    >
                    <RotateCcw size={20} strokeWidth={3} />
                    </button>

                    <button
                      onClick={handleExport}
                      className="h-12 md:h-14 px-4 md:px-6 flex items-center gap-2 md:gap-3 rounded-2xl bg-emerald-600 text-white font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-emerald-700 shadow-xl shadow-emerald-600/20 active:scale-95 group"
                    >
                    <Download size={16} strokeWidth={3} />
                    <span className="hidden sm:inline">Export</span>
                    </button>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="relative min-h-[500px]">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-6">
                        <div className="h-16 w-16 relative">
                             <div className="absolute inset-0 border-8 border-indigo-50 rounded-2xl" />
                             <div className="absolute inset-0 border-8 border-indigo-600 rounded-2xl border-t-transparent animate-spin" />
                        </div>
                        <span className="text-[9px] font-black text-slate-400 animate-pulse tracking-[0.2em] uppercase">Cloud Syncing...</span>
                    </div>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={view}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    className="w-full"
                  >
                    {filteredCandidates.length > 0 ? (
                        view === 'kanban' ? (
                            <KanbanView 
                            candidates={filteredCandidates} 
                            onCandidateClick={setSelectedCandidate} 
                            />
                        ) : (
                            <ListView 
                            candidates={filteredCandidates} 
                            onCandidateClick={setSelectedCandidate} 
                            />
                        )
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[400px] text-center p-8 bg-white rounded-[2rem] border-2 border-dashed border-slate-100">
                             <h3 className="text-xl font-black text-indigo-950 uppercase tracking-tight">No results</h3>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Try different filters</p>
                        </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <CandidateDetailDrawer 
        candidate={selectedCandidate} 
        onClose={() => setSelectedCandidate(null)} 
        onStageChange={handleStageChange}
        onArchive={handleArchive}
      />
    </div>
  );
}
