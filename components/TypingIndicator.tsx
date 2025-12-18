
import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 p-4 glass rounded-2xl w-fit ml-4 mt-2 animate-fade-in-bottom">
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
      <span className="text-xs text-slate-400 ml-2 font-medium uppercase tracking-wider">Analyzing Market Dynamics...</span>
    </div>
  );
};

export default TypingIndicator;
