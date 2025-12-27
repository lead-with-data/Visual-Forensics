
import React from 'react';
import { AnalysisResult } from '../types';

interface AuditViewProps {
  result: AnalysisResult;
}

const AuditView: React.FC<AuditViewProps> = ({ result }) => {
  return (
    <div className="space-y-32">
      {/* Evidence-Based Findings */}
      <div className="space-y-12">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#FF5C00]">Phase 01 / Forensic Evidence</p>
          <h2 className="text-5xl font-black uppercase tracking-tighter">Grounded Findings</h2>
          <p className="text-neutral-500 text-xs font-mono">Observations anchored to [X, Y] pixel coordinates.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {result.findings?.map((finding, idx) => (
            <div key={idx} className="bg-[#111111] rounded-forensic p-10 space-y-6 border border-white/5 hover:border-white/20 transition-all duration-700 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 flex flex-col items-end">
                <span className="text-[8px] font-mono text-neutral-600 uppercase">Confidence</span>
                <span className="text-sm font-black text-[#FF5C00]">{Math.round(finding.confidence_score * 100)}%</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-black uppercase tracking-widest text-neutral-400">
                    {finding.agent}
                  </div>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight">{finding.title}</h3>
                <p className="text-neutral-400 text-base font-medium leading-relaxed italic border-l-2 border-[#FF5C00]/30 pl-4">
                  "{finding.observation}"
                </p>
                <div className="bg-black/40 p-4 rounded-2xl border border-white/5 space-y-2">
                   <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">Visual Evidence</p>
                   <p className="text-[#FF5C00] text-xs leading-relaxed font-mono">{finding.visual_evidence}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Persona Traces */}
      <div className="space-y-12">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#FF5C00]">Phase 02 / Swarm Simulation</p>
          <h2 className="text-5xl font-black uppercase tracking-tighter">Synthetic Persona Paths</h2>
          <p className="text-neutral-500 text-xs font-mono">Aggregate behavior of 50 simulated specialized agents.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {result.persona_traces?.map((trace, idx) => (
            <div key={idx} className="bg-[#111111] rounded-forensic p-10 border border-white/5 group hover:border-white/10 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-black uppercase tracking-tight text-white">{trace.persona_type}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${trace.success_probability > 0.7 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                      {Math.round(trace.success_probability * 100)}% Success Rate
                    </span>
                  </div>
                  <p className="text-neutral-500 text-sm font-medium">Goal: {trace.primary_goal}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {trace.interaction_path.map((step, i) => (
                    <div key={i} className="flex items-center">
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-neutral-300">
                        {step}
                      </span>
                      {i < trace.interaction_path.length - 1 && (
                        <i className="fa-solid fa-chevron-right text-[8px] text-neutral-700 mx-2"></i>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="space-y-1">
                   <p className="text-[9px] font-bold uppercase text-neutral-500 tracking-widest">Time-to-Task</p>
                   <p className="text-2xl font-black text-white">{trace.time_to_task_ms}ms</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[9px] font-bold uppercase text-neutral-500 tracking-widest">Error Probability</p>
                   <p className={`text-2xl font-black ${trace.error_rate > 0.3 ? 'text-red-500' : 'text-green-500'}`}>
                    {(trace.error_rate * 100).toFixed(1)}%
                   </p>
                </div>
                <div className="space-y-1">
                   <p className="text-[9px] font-bold uppercase text-neutral-500 tracking-widest">Cognitive Load</p>
                   <p className="text-2xl font-black text-white uppercase">{trace.cognitive_friction_points.length > 2 ? 'High' : 'Low'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agent Debate Section */}
      {result.agent_debates && result.agent_debates.length > 0 && (
        <div className="space-y-12">
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#FF5C00]">Agent Friction Log</p>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Council Contradictions</h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {result.agent_debates.map((debate, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-forensic p-10 space-y-6">
                <div className="flex items-center space-x-4">
                   <div className="flex -space-x-3">
                      {debate.agents.map((a, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-[#FF5C00] border-2 border-black flex items-center justify-center text-[10px] font-black text-black uppercase">
                          {a.charAt(0)}
                        </div>
                      ))}
                   </div>
                   <h4 className="text-xl font-black uppercase tracking-tight text-white">{debate.topic}</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4 border-t border-white/5">
                   <div className="space-y-2">
                      <p className="text-[10px] font-bold uppercase text-red-500 tracking-widest">Conflict</p>
                      <p className="text-neutral-400 text-sm font-medium leading-relaxed italic">"{debate.conflict}"</p>
                   </div>
                   <div className="space-y-2">
                      <p className="text-[10px] font-bold uppercase text-green-500 tracking-widest">Resolution</p>
                      <p className="text-white text-sm font-bold leading-relaxed">{debate.resolution}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditView;
