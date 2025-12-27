
import React, { useEffect, useRef } from 'react';

interface AgentLogProps {
  logs: string[];
  isAnalyzing: boolean;
}

const AgentLog: React.FC<AgentLogProps> = ({ logs, isAnalyzing }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const displayLogs = logs || [];

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-10 space-y-4 font-mono text-[11px] leading-relaxed selection:bg-white selection:text-black scroll-smooth"
    >
      {displayLogs.length === 0 && !isAnalyzing && (
        <div className="h-full flex flex-col items-center justify-center opacity-20 space-y-4">
          <i className="fa-solid fa-radar text-4xl"></i>
          <p className="text-[10px] font-bold uppercase tracking-widest text-center">Awaiting Pulse Signal</p>
        </div>
      )}
      
      {displayLogs.map((log, idx) => {
        const safeLog = log || "";
        const parts = safeLog.split('→');
        const isAgent = parts.length > 1;
        
        return (
          <div key={idx} className="animate-in fade-in slide-in-from-left-4 duration-500 border-b border-white/5 pb-2 last:border-0 group">
            <p className="text-neutral-300 group-hover:text-white transition-colors">
              {isAgent ? (
                <>
                  <span className="text-[#FF5C00] font-black uppercase tracking-widest">{parts[0]}</span>
                  <span className="text-neutral-500 px-2">→</span>
                  <span className="text-neutral-400 font-medium">{parts[1]}</span>
                </>
              ) : (
                <span className="text-neutral-500 italic uppercase tracking-tighter opacity-80">{safeLog}</span>
              )}
            </p>
          </div>
        );
      })}

      {isAnalyzing && (
        <div className="flex items-center space-x-3 pt-6">
          <div className="flex space-x-1">
            <div className="w-1.5 h-1.5 bg-[#FF5C00] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-1.5 h-1.5 bg-[#FF5C00] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-1.5 h-1.5 bg-[#FF5C00] rounded-full animate-bounce"></div>
          </div>
          <span className="text-[#FF5C00] font-black uppercase tracking-[0.3em] text-[10px]">Scanning Matrix...</span>
        </div>
      )}
    </div>
  );
};

export default AgentLog;
