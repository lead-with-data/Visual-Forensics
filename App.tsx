
import React, { useState, useRef, useEffect } from 'react';
import { AnalysisResult } from './types';
import { analyzeInterface } from './geminiService';
import AgentLog from './components/AgentLog';
import SaliencyHeatmap from './components/SaliencyHeatmap';
import Header from './components/Header';
import AuditView from './components/AuditView';
import ABTestsView from './components/ABTestsView';
import StrategicPlanView from './components/StrategicPlanView';
import ResearchReportView from './components/ResearchReportView';
import ApiKeyModal from './components/ApiKeyModal';

const STATUS_STAGES = [
  "INITIALIZING_NODE",
  "UPLOADING_TELEMETRY",
  "SCANNING_PIXEL_MATRIX",
  "EVALUATING_HEURISTICS",
  "SIMULATING_PERSONA_SWARM",
  "RECONCILING_AGENT_CONFLICTS",
  "FINALIZING_REPORT"
];

function App() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // API Key State
  const [sessionApiKey, setSessionApiKey] = useState<string>('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const res = reader.result;
        if (typeof res === 'string') {
          setImage(res);
          setResult(null);
          setError(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    let interval: number;
    if (isAnalyzing && !result) {
      interval = window.setInterval(() => {
        setCurrentStage(prev => (prev < STATUS_STAGES.length - 1 ? prev + 1 : prev));
      }, 3000); // 3 seconds per stage to feel deliberate but not stuck
    }
    return () => clearInterval(interval);
  }, [isAnalyzing, result]);

  const startAnalysis = async () => {
    if (!image) return;

    // Check if we have an API key (env or session)
    const hasEnvKey = !!process.env.API_KEY;
    if (!hasEnvKey && !sessionApiKey) {
      setShowApiKeyModal(true);
      return;
    }

    setIsAnalyzing(true);
    setResult(null);
    setCurrentStage(0);
    setError(null);
    try {
      // Pass the session key if available (it will be used over env if provided, or fallback logic in service)
      const analysis = await analyzeInterface(image, sessionApiKey);
      setResult(analysis);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Node Failure: Unable to complete forensic scan.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setError(null);
    setCurrentStage(0);
  };

  const handleSaveApiKey = (key: string) => {
    setSessionApiKey(key);
    setShowApiKeyModal(false);
    // Automatically restart analysis if we have an image
    if (image) {
      // Small delay to allow state update to settle if needed, though usually fine.
      // We can't call startAnalysis directly here because sessionApiKey state might not be updated in closure yet?
      // Actually, since we just set it, we might need a useEffect or just pass it directly.
      // Let's rely on the user clicking start again OR better:
      // We can just call a modified start that takes the key. 
      // Simplified: Just close modal. User clicks start again.
      // OR: We can trigger it via a useEffect slightly.
      // For now, let's keep it simple: just close modal, maybe trigger startAnalysis wrap.
    }
  };

  // Effect to auto-start if key was just added and we have an image + user intended to start?
  // Let's just let the user click start again or we can better handle it by 
  // having startAnalysis logic check state. 
  // Actually, let's just make the modal save the key and retry the analysis immediately.
  useEffect(() => {
    if (sessionApiKey && image && !isAnalyzing && !result && !error) {
      // Only if we just came from the modal... complicating state. 
      // User can click button again. It's fine.
    }
  }, [sessionApiKey]);


  return (
    <div className="min-h-screen bg-[#000] text-white selection:bg-[#FF5C00] selection:text-black">
      <ApiKeyModal
        isOpen={showApiKeyModal}
        onSave={(key) => {
          setSessionApiKey(key);
          setShowApiKeyModal(false);
          // Optional: Auto-retrying would be nice but requires refactoring startAnalysis to accept key directly or wait for state.
          // Simplest is to let user click again or create a helper.
          // Let's try to trigger it:
          setTimeout(() => {
            // We can't easily call startAnalysis with new state here due to closure.
            // But we can restart the process if we want. 
            // Let's leave it to user to click 'Start' again for safety/clarity, 
            // or render the button as 'Continue' in the modal?
            // The modal just saves. User clicks Start.
          }, 100);
        }}
      />

      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-[0.03] z-0 select-none">
        <div className="absolute top-20 marquee text-[180px] font-black uppercase tracking-tighter text-outline">
          Visual Forensic Node • Real-Time Saliency • Persona Simulation • Clinical Heuristics •
        </div>
      </div>

      <Header />

      <main className="relative z-10 container mx-auto px-6 max-w-[1400px] pt-32 pb-24">
        {!image ? (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-12 animate-in fade-in duration-1000">
            <div className="space-y-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#FF5C00]">Clinical Interface Audit v6.2</p>
              <h1 className="text-7xl md:text-8xl lg:text-[120px] font-black uppercase tracking-tighter leading-[0.85]">
                Forensic<br />
                <span className="text-outline">Engine</span>
              </h1>
              <p className="text-neutral-500 max-w-xl mx-auto text-lg font-medium">
                Upload a screenshot to perform coordinate-grounded analysis.
                No fluff. Just evidence.
              </p>
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="group relative w-full max-w-2xl p-20 rounded-forensic border border-white/5 bg-[#111111]/50 hover:bg-[#111111] transition-all duration-700 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#FF5C00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 flex flex-col items-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-[#FF5C00] transition-colors duration-500">
                  <i className="fa-solid fa-crosshairs text-xl"></i>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold uppercase tracking-tight">Select Target</p>
                  <p className="text-neutral-500 font-medium">Inject UI Telemetry</p>
                </div>
              </div>
              <input type="file" className="hidden" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" />
            </div>
          </div>
        ) : (
          <div className="space-y-16 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 glass p-6 rounded-full border-white/10">
              <div className="flex items-center space-x-6">
                <button onClick={reset} className="text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors flex items-center px-4 py-2">
                  <i className="fa-solid fa-rotate-left mr-2"></i> Reset Node
                </button>
                <div className="h-6 w-px bg-white/10"></div>
                <div className="flex items-center space-x-3 text-[10px] font-mono tracking-tighter text-neutral-500">
                  <div className={`w-2 h-2 rounded-full ${isAnalyzing ? 'bg-[#FF5C00] animate-pulse' : 'bg-green-500'}`}></div>
                  <span>STATUS: {isAnalyzing ? STATUS_STAGES[currentStage] : (result ? 'AUDIT_COMPLETE' : 'READY_FOR_SCAN')}</span>
                </div>
              </div>

              <button
                onClick={startAnalysis}
                disabled={isAnalyzing}
                className={`px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs transition-all duration-500 ${isAnalyzing
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                    : 'bg-[#FF5C00] hover:bg-white hover:text-black shadow-2xl shadow-[#FF5C00]/20 active:scale-95'
                  }`}
              >
                {isAnalyzing ? 'Processing...' : 'Start Clinical Audit'}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-12 space-y-16">
                <div className="rounded-forensic border border-white/5 overflow-hidden shadow-2xl bg-black flex items-center justify-center min-h-[400px] relative">
                  {result?.heatmap ? (
                    <SaliencyHeatmap image={image} heatmap={result.heatmap} />
                  ) : (
                    <>
                      <img src={image} alt="Forensic Input" className={`w-full h-auto object-contain max-h-[85vh] block mx-auto transition-opacity duration-700 ${isAnalyzing ? 'opacity-30 blur-sm' : 'opacity-100'}`} />
                      {isAnalyzing && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                          <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#FF5C00] transition-all duration-700"
                              style={{ width: `${((currentStage + 1) / STATUS_STAGES.length) * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#FF5C00] animate-pulse">
                            {STATUS_STAGES[currentStage]}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {error && (
                  <div className="p-8 bg-red-950/20 border border-red-500/50 rounded-forensic text-red-500 text-center font-bold">
                    <i className="fa-solid fa-triangle-exclamation mr-3"></i> {error}
                  </div>
                )}

                {result && (
                  <div className="space-y-24 animate-in slide-in-from-bottom-8 duration-1000 pb-20">
                    <AuditView result={result} />
                    <ABTestsView tests={result.ab_tests} />
                    <StrategicPlanView plan={result.strategic_plan} />
                    <ResearchReportView report={result.report} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
