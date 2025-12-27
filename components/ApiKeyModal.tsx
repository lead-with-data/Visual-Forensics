import React, { useState } from 'react';

interface ApiKeyModalProps {
    onSave: (key: string) => void;
    isOpen: boolean;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSave, isOpen }) => {
    const [inputKey, setInputKey] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputKey.trim()) {
            onSave(inputKey.trim());
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-full max-w-md p-8 bg-[#111] border border-white/10 rounded-forensic shadow-2xl space-y-6 animate-in zoom-in-95 duration-300">
                <div className="flex items-center space-x-4 text-[#FF5C00]">
                    <i className="fa-solid fa-key text-2xl"></i>
                    <h2 className="text-xl font-bold uppercase tracking-widest">Authentication Required</h2>
                </div>

                <p className="text-neutral-400 text-sm leading-relaxed">
                    Operational Security Warning: System requires manual override.
                    Please add your Gemini API key for this incognito temporary session.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="apiKey" className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                            Enter API Key
                        </label>
                        <input
                            type="password"
                            id="apiKey"
                            value={inputKey}
                            onChange={(e) => setInputKey(e.target.value)}
                            placeholder="AIzaSy..."
                            className="w-full bg-black border border-white/10 rounded p-4 text-white placeholder-neutral-700 outline-none focus:border-[#FF5C00] transition-colors font-mono text-sm"
                            autoFocus
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!inputKey.trim()}
                        className="w-full py-4 bg-[#FF5C00] text-black font-black uppercase tracking-widest text-xs hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Initialize Session
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ApiKeyModal;
