
import React, { useState } from 'react';
import { SaliencyMap, HeatmapPoint } from '../types';

interface SaliencyHeatmapProps {
  image: string;
  heatmap: SaliencyMap;
}

const SaliencyHeatmap: React.FC<SaliencyHeatmapProps> = ({ image, heatmap }) => {
  const [activePoint, setActivePoint] = useState<HeatmapPoint | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(true);

  return (
    <div className="relative group cursor-crosshair">
      <img 
        src={image} 
        alt="Forensic Scan" 
        className={`w-full h-auto block mx-auto transition-all duration-[1000ms] ${showHeatmap ? 'brightness-[0.6]' : 'brightness-100'}`} 
      />
      
      {showHeatmap && (
        <svg 
          viewBox="0 0 1000 1000" 
          className="absolute inset-0 w-full h-full pointer-events-auto"
          preserveAspectRatio="none"
        >
          {heatmap.points.map((point, idx) => (
            <g key={idx}>
              <defs>
                <radialGradient id={`grad-${idx}`}>
                  <stop offset="0%" stopColor={`rgba(255, 92, 0, ${point.weight * 0.9})`} />
                  <stop offset="50%" stopColor={`rgba(255, 92, 0, ${point.weight * 0.3})`} />
                  <stop offset="100%" stopColor="rgba(255, 92, 0, 0)" />
                </radialGradient>
              </defs>
              <circle
                cx={point.x}
                cy={point.y}
                r={140 * point.weight}
                fill={`url(#grad-${idx})`}
                className="animate-pulse"
                style={{ animationDuration: `${2500 / point.weight}ms` }}
              />
              <circle
                cx={point.x}
                cy={point.y}
                r={10}
                fill="rgba(255,255,255,0.1)"
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer hover:stroke-[#FF5C00] transition-all duration-300"
                onMouseEnter={() => setActivePoint(point)}
                onMouseLeave={() => setActivePoint(null)}
              />
            </g>
          ))}
        </svg>
      )}

      {activePoint && (
        <div 
          className="absolute z-[100] glass border border-white/20 p-6 rounded-3xl shadow-2xl w-80 animate-in fade-in zoom-in-95 duration-500 pointer-events-none"
          style={{ 
            left: `${activePoint.x / 10}%`, 
            top: `${activePoint.y / 10}%`,
            transform: `translate(${activePoint.x > 700 ? '-110%' : '10%'}, ${activePoint.y > 700 ? '-110%' : '10%'})`
          }}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FF5C00]">{activePoint.label}</span>
              <span className="text-[10px] font-mono text-neutral-500">REF_{Math.floor(Math.random()*9999)}</span>
            </div>
            <p className="text-white text-sm font-medium leading-relaxed">{activePoint.reasoning}</p>
            <div className="pt-3 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-neutral-400">
               <span>PREDICTED_GAZE:</span>
               <span className="text-[#FF5C00] font-black">{activePoint.predicted_fixation_time_ms}ms</span>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-8 right-8">
        <button 
          onClick={() => setShowHeatmap(!showHeatmap)}
          className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-700 border ${
            showHeatmap 
              ? 'bg-[#FF5C00] text-black border-[#FF5C00] shadow-2xl shadow-[#FF5C00]/40' 
              : 'bg-white text-black border-white hover:bg-neutral-200'
          }`}
        >
          {showHeatmap ? 'Saliency Active' : 'Reveal Original'}
        </button>
      </div>

      <div className="absolute top-8 right-8 glass border-white/10 px-6 py-4 rounded-3xl">
        <div className="space-y-2">
          <div className="flex flex-col">
            <span className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest">Confidence</span>
            <span className="text-xl font-black text-white">{heatmap.confidence_level}</span>
          </div>
          <div className="w-40 bg-white/5 h-1 rounded-full overflow-hidden">
            <div className="h-full bg-[#FF5C00]" style={{ width: heatmap.confidence_level === 'High' ? '95%' : '75%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaliencyHeatmap;
