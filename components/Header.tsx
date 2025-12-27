
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="fixed top-8 left-0 right-0 z-[100] px-6">
      <header className="container mx-auto max-w-[1400px] flex items-center justify-between glass h-16 px-8 rounded-full border-white/10 shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-[#FF5C00] rounded-full flex items-center justify-center">
            <i className="fa-solid fa-eye text-black text-[10px]"></i>
          </div>
          <h1 className="font-black text-sm tracking-[0.3em] uppercase">
            Visual <span className="text-neutral-500">Forensics</span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 mr-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Node_01_Active</span>
          </div>
          <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#FF5C00] hover:text-black transition-all duration-500">
            <i className="fa-solid fa-ellipsis-v text-xs"></i>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
