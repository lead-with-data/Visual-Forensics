
import React from 'react';
import { ABTestProposal } from '../types';

interface ABTestsViewProps {
  tests: ABTestProposal[];
}

const ABTestsView: React.FC<ABTestsViewProps> = ({ tests }) => {
  if (!tests || tests.length === 0) return null;

  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#FF5C00]">Phase 03 / Swarm Simulation</p>
        <h2 className="text-5xl font-black uppercase tracking-tighter">Persona Crowd Hypotheses</h2>
        <p className="text-neutral-500 text-xs font-mono">Simulating 50+ unique vision and cognitive profiles per test</p>
      </div>

      <div className="space-y-8">
        {tests.map((test, idx) => {
          const setup = test.test_setup || { control: 'N/A', variant_a: 'N/A' };
          
          return (
            <div key={idx} className="bg-[#111111] rounded-forensic p-12 border border-white/5 hover:border-[#FF5C00]/30 transition-all duration-700">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4 space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono text-[#FF5C00] tracking-widest">{test.id || `SWARM_${idx}`}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-800"></span>
                    <span className="text-[8px] font-bold uppercase text-neutral-500">Crowd_Size: 50+</span>
                  </div>
                  <h4 className="text-2xl font-black uppercase tracking-tight leading-none">{test.hypothesis || 'Pending Hypothesis'}</h4>
                  <div className="flex items-center space-x-3 pt-4">
                     <div className="bg-[#C9FF4D] text-black px-4 py-1 rounded-full text-[10px] font-black uppercase">
                       +{test.expected_lift || '0%'} Success Rate
                     </div>
                     <div className="border border-white/10 text-neutral-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                       {test.priority || 'Medium'} Priority
                     </div>
                  </div>
                </div>
                
                <div className="lg:col-span-8 space-y-10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">Control Baseline</p>
                        <p className="text-neutral-400 text-sm font-medium border-l-2 border-white/10 pl-4 leading-relaxed">{setup.control}</p>
                      </div>
                      <div className="space-y-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#FF5C00]">Variant Optimization</p>
                        <p className="text-white text-sm font-medium border-l-2 border-[#FF5C00] pl-4 leading-relaxed">{setup.variant_a}</p>
                      </div>
                   </div>

                   <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-neutral-500">Persona Swarm Analysis</span>
                        <div className="flex -space-x-2">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-6 h-6 rounded-full border border-black bg-neutral-800 flex items-center justify-center text-[8px] text-white">
                              <i className="fa-solid fa-user"></i>
                            </div>
                          ))}
                          <div className="w-6 h-6 rounded-full border border-black bg-[#FF5C00] flex items-center justify-center text-[8px] text-black font-black">+45</div>
                        </div>
                      </div>
                      <p className="text-neutral-300 text-xs italic font-medium leading-relaxed">
                        "{test.swarm_summary}"
                      </p>
                   </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ABTestsView;
