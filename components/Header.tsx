
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg ai-glow">
          <i className="fa-solid fa-chart-line text-white"></i>
        </div>
        <div>
          <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Executive Glass Chat
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-semibold">Strategic Insights AI</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs text-slate-300">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          Node: Strategic Analysis Alpha
        </div>
        <button className="text-slate-400 hover:text-white transition-colors">
          <i className="fa-solid fa-gear text-lg"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
