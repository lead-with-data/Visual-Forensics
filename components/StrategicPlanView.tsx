
import React from 'react';
import { StrategicAction } from '../types';

interface StrategicPlanViewProps {
  plan: StrategicAction[];
}

const StrategicPlanView: React.FC<StrategicPlanViewProps> = ({ plan }) => {
  const getPriorityColor = (priority?: string) => {
    const p = (priority || '').toLowerCase();
    if (p === 'critical') return 'bg-[#FF5C00]';
    if (p === 'high') return 'bg-[#FFB800]';
    return 'bg-neutral-800';
  };

  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#FF5C00]">Phase 04 / Strategy</p>
        <h2 className="text-5xl font-black uppercase tracking-tighter">Action Matrix</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {plan.map((item, idx) => (
          <div key={idx} className="bg-[#111111] border border-white/5 rounded-forensic overflow-hidden flex flex-col md:flex-row hover:border-white/20 transition-all duration-700">
            <div className={`w-full md:w-2 ${getPriorityColor(item.priority)}`}></div>
            <div className="p-10 flex-1 grid grid-cols-1 md:grid-cols-4 gap-10">
              <div className="md:col-span-1 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Origin & Cause</span>
                <h4 className="text-xl font-bold text-white leading-tight">{item.issue}</h4>
                <p className="text-sm text-neutral-400 font-medium">{item.root_cause}</p>
              </div>
              <div className="md:col-span-1 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Requirement</span>
                <p className="text-base text-neutral-300 font-medium leading-relaxed">{item.recommended_fix}</p>
              </div>
              <div className="md:col-span-1 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Projected Impact</span>
                <div className="flex items-center space-x-2 text-[#C9FF4D]">
                  <i className="fa-solid fa-chart-line text-xs"></i>
                  <span className="text-lg font-black uppercase">{item.expected_impact}</span>
                </div>
              </div>
              <div className="md:col-span-1 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Assignee</span>
                <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-full border border-white/5">
                  <div className="w-8 h-8 rounded-full bg-[#FF5C00] flex items-center justify-center text-[10px] text-black font-black">
                    {(item.owner_agent || 'A').charAt(0)}
                  </div>
                  <span className="text-xs font-bold text-white tracking-tight uppercase">{item.owner_agent || 'System'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrategicPlanView;
