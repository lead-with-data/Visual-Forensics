
import React from 'react';
import { ResearchReport } from '../types';

interface ResearchReportViewProps {
  report: ResearchReport;
}

const ResearchReportView: React.FC<ResearchReportViewProps> = ({ report }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#FF5C00]">Phase 05 / Finality</p>
        <h2 className="text-5xl font-black uppercase tracking-tighter">Forensic Conclusion</h2>
      </div>

      <div className="bg-[#111111] border border-white/5 rounded-forensic p-12 space-y-12 shadow-2xl">
        <section className="space-y-6">
          <h3 className="text-[10px] font-black text-[#FF5C00] uppercase tracking-[0.4em] flex items-center">
            <i className="fa-solid fa-file-contract mr-4"></i> Executive Summary
          </h3>
          <p className="text-neutral-300 leading-relaxed text-2xl font-medium tracking-tight">
            {report.executive_summary}
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-12 border-t border-white/5">
          <section className="space-y-8">
            <h3 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.4em]">Methodology_Trace</h3>
            <div className="glass p-8 rounded-forensic border border-white/5 space-y-6">
              <div>
                <span className="text-[10px] font-mono text-neutral-500">AGENTS_ACTIVE</span>
                <div className="flex flex-wrap gap-2 mt-4">
                  {report.methodology.agents_deployed.map((agent, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-black uppercase tracking-widest text-white border border-white/10">
                      {agent}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[10px] font-mono text-neutral-500">HEURISTIC_FRAMEWORK</span>
                <p className="text-sm text-neutral-400 mt-2 font-medium">{report.methodology.analysis_framework}</p>
              </div>
              <div className="pt-4">
                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 mb-2">
                  <span>CONFIDENCE_SCORE</span>
                  <span className="text-white font-black tracking-widest">{Math.round(report.methodology.confidence_level * 100)}%</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#FF5C00] h-full transition-all duration-[2000ms] ease-out shadow-[0_0_15px_rgba(255,92,0,0.5)]" 
                    style={{ width: `${report.methodology.confidence_level * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h3 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.4em]">Key_Signal_Results</h3>
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] font-black text-[#FF5C00] uppercase tracking-widest bg-[#FF5C00]/10 px-3 py-1 rounded-full">Critical Blockers</span>
                <ul className="space-y-4">
                  {report.key_findings.critical_blockers.map((f, i) => (
                    <li key={i} className="flex items-start space-x-3 text-sm font-medium text-neutral-300">
                      <div className="w-1.5 h-1.5 bg-[#FF5C00] rounded-full mt-1.5 shrink-0"></div>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4 pt-4 border-t border-white/5">
                <span className="text-[10px] font-black text-[#C9FF4D] uppercase tracking-widest bg-[#C9FF4D]/10 px-3 py-1 rounded-full">High-Velocity Wins</span>
                <ul className="space-y-4">
                  {report.key_findings.quick_wins.map((f, i) => (
                    <li key={i} className="flex items-start space-x-3 text-sm font-medium text-neutral-300">
                      <div className="w-1.5 h-1.5 bg-[#C9FF4D] rounded-full mt-1.5 shrink-0"></div>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>

        <div className="pt-12 border-t border-white/5 text-center">
          <button className="px-12 py-5 bg-white text-black hover:bg-[#FF5C00] rounded-full font-black transition-all duration-500 text-xs tracking-[0.2em] uppercase shadow-2xl active:scale-95">
            <i className="fa-solid fa-download mr-3"></i> Export Full Documentation
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResearchReportView;
