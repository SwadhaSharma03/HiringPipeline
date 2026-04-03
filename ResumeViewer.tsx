
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ZoomIn, ZoomOut, RotateCw } from "lucide-react";
import { cn } from "../lib/utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  candidateName: string;
}

export function ResumeViewer({ isOpen, onClose, candidateName }: Props) {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn  = () => setZoom(z => Math.min(z + 25, 200));
  const handleZoomOut = () => setZoom(z => Math.max(z - 25, 50));
  const handleRotate  = () => setRotation(r => (r + 90) % 360);
  const handleDownload = () => {
    // Trigger a mock download by creating a Blob with resume text
    const content = `Resume of ${candidateName}\n\nSenior Full Stack Engineer\n\nExperience: 8+ years\nSkills: React, Node.js, TypeScript, AWS`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${candidateName}_Resume.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative h-[85vh] w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-2xl flex flex-col ring-1 ring-white/20"
          >
            {/* Toolbar */}
            <div className="flex h-16 items-center justify-between border-b border-slate-100 bg-white px-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleDownload}
                  title="Download Resume"
                  className="rounded-xl bg-emerald-600 p-2 text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 transition-colors active:scale-95"
                >
                  <Download size={18} />
                </button>
                <div>
                   <h3 className="text-sm font-bold text-slate-900 tracking-tight">{candidateName}_Resume.pdf</h3>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">PDF Document • 2.4 MB</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-xl bg-slate-50 p-1 ring-1 ring-slate-200">
                    <button
                      onClick={handleZoomOut}
                      title="Zoom Out"
                      disabled={zoom <= 50}
                      className="rounded-lg p-1.5 text-slate-500 hover:bg-white hover:text-slate-900 transition-all hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ZoomOut size={16} />
                    </button>
                    <span className="text-[11px] font-bold px-2 text-slate-700 w-12 text-center">{zoom}%</span>
                    <button
                      onClick={handleZoomIn}
                      title="Zoom In"
                      disabled={zoom >= 200}
                      className="rounded-lg p-1.5 text-slate-500 hover:bg-white hover:text-slate-900 transition-all hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ZoomIn size={16} />
                    </button>
                </div>
                
                <div className="h-6 w-[1px] bg-slate-200 mx-1" />
                
                <button
                  onClick={handleRotate}
                  title="Rotate"
                  className="rounded-xl p-2.5 text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all"
                >
                    <RotateCw size={18} />
                </button>
                <button 
                    onClick={onClose}
                    className="ml-2 group h-10 w-10 flex items-center justify-center rounded-2xl bg-slate-900 text-white hover:bg-emerald-600 transition-all active:scale-90 shadow-xl shadow-slate-900/10"
                >
                    <X size={20} strokeWidth={3} />
                </button>
              </div>
            </div>

            {/* Resume Content */}
            <div className="flex-1 overflow-y-auto bg-slate-50 p-12 scrollbar-hide">
                <div
                  className="mx-auto transition-all duration-300 origin-top"
                  style={{ transform: `scale(${zoom / 100}) rotate(${rotation}deg)`, transformOrigin: "top center" }}
                >
                  <div className="w-[210mm] min-h-[297mm] bg-white p-[20mm] shadow-[0_20px_50px_rgba(0,0,0,0.08)] ring-1 ring-slate-100 rounded-lg">
                    <div className="mb-10 text-center">
                        <h1 className="mb-2 text-3xl font-black text-slate-900 uppercase tracking-tighter">{candidateName}</h1>
                        <p className="text-sm font-bold text-emerald-600 tracking-wide uppercase">Senior Full Stack Engineer</p>
                        <div className="mt-4 flex items-center justify-center gap-4 text-[11px] font-bold text-slate-400">
                            <span>{candidateName.toLowerCase().replace(' ', '.')}@example.com</span>
                            <span>•</span>
                            <span>+1 (555) 123-4567</span>
                            <span>•</span>
                            <span>San Francisco, CA</span>
                        </div>
                    </div>
                    <div className="space-y-12">
                        <section>
                            <h2 className="mb-4 text-xs font-black text-slate-900 uppercase tracking-[0.2em] border-b-2 border-slate-900 inline-block pb-1">Professional Summary</h2>
                            <p className="text-sm font-medium text-slate-600 leading-relaxed">
                                Innovative Senior Full Stack Engineer with over 8 years of experience building scalable web applications and distributed systems. 
                                Expert in React, Node.js, and Cloud Infrastructure with a passion for high-performance UI and clean architectural design.
                            </p>
                        </section>
                        <section>
                            <h2 className="mb-6 text-xs font-black text-slate-900 uppercase tracking-[0.2em] border-b-2 border-slate-900 inline-block pb-1">Experience</h2>
                            <div className="space-y-8">
                                <ExperienceItem company="TechFlow Solutions" role="Senior Software Engineer" period="2020 - Present" description="Directed architecture for high-performance React applications, achieving 40% improvement in load times. Led a team of 12 engineers." />
                                <ExperienceItem company="CloudScale Systems" role="Full Stack Developer" period="2017 - 2020" description="Developed scalable microservices using Node.js and AWS. Implemented CI/CD pipelines reducing deployment time by 60%." />
                            </div>
                        </section>
                        <section>
                             <h2 className="mb-6 text-xs font-black text-slate-900 uppercase tracking-[0.2em] border-b-2 border-slate-900 inline-block pb-1">Skills</h2>
                             <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-[11px] font-bold text-slate-900 mb-2 uppercase tracking-widest">Frontend</h3>
                                    <p className="text-xs font-medium text-slate-500">React, Next.js, TypeScript, Tailwind, Framer Motion, Redux</p>
                                </div>
                                <div>
                                    <h3 className="text-[11px] font-bold text-slate-900 mb-2 uppercase tracking-widest">Backend</h3>
                                    <p className="text-xs font-medium text-slate-500">Node.js, PostgreSQL, Go, GraphQL, Redis, Docker</p>
                                </div>
                             </div>
                        </section>
                    </div>
                  </div>
                </div>
            </div>

            {/* Footer */}
            <div className="h-14 border-t border-slate-100 bg-white flex items-center justify-center px-8">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Page 1 of 1</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function ExperienceItem({ company, role, period, description }: { company: string, role: string, period: string, description: string }) {
    return (
        <div>
            <div className="flex items-start justify-between mb-2">
                <div>
                    <h3 className="text-sm font-bold text-slate-900">{role}</h3>
                    <p className="text-xs font-bold text-emerald-500">{company}</p>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{period}</span>
            </div>
            <p className="text-xs font-medium text-slate-500 leading-relaxed">{description}</p>
        </div>
    )
}
