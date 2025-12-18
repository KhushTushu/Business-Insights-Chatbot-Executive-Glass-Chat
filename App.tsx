
import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import TypingIndicator from './components/TypingIndicator';
import { Message } from './types';
import { getBusinessInsights } from './services/geminiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Good morning. I am prepared to provide high-level strategic analysis for your current business initiatives. How may I assist your decision-making process today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const history = messages.map(m => ({ role: m.role, content: m.content }));
    const response = await getBusinessInsights(userMsg.content, history);

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date()
    };

    setIsTyping(false);
    setMessages(prev => [...prev, aiMsg]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-purple-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute top-[40%] right-[10%] w-[20%] h-[20%] bg-pink-600/5 blur-[100px] rounded-full"></div>
      </div>

      <Header />

      <main className="flex-1 overflow-hidden flex flex-col items-center justify-center p-4 md:p-8 relative z-10">
        <div className="w-full max-w-5xl h-full flex flex-col glass rounded-3xl shadow-2xl overflow-hidden border border-white/10">
          
          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 custom-scrollbar"
          >
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'} animate-fade-in-bottom`}
              >
                <div 
                  className={`max-w-[85%] md:max-w-[70%] p-4 md:p-6 rounded-2xl shadow-sm ${
                    msg.role === 'assistant' 
                      ? 'bg-gradient-to-br from-blue-600 to-purple-700 text-white ai-glow relative' 
                      : 'bg-slate-800/80 border border-slate-700/50 text-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                      {msg.role === 'assistant' ? 'Strategic Analysis' : 'Executive Input'}
                    </span>
                    <span className="text-[10px] opacity-40">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </div>
                  {msg.role === 'assistant' && (
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-blue-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && <TypingIndicator />}
          </div>

          {/* Input Area */}
          <div className="p-4 md:p-6 border-t border-white/10 bg-white/5">
            <div className="max-w-4xl mx-auto flex items-end gap-3 glass p-2 rounded-2xl border border-white/20">
              <button className="p-3 text-slate-400 hover:text-blue-400 transition-colors">
                <i className="fa-solid fa-paperclip"></i>
              </button>
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Submit operational data or strategy inquiry..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-slate-100 placeholder-slate-500 resize-none max-h-32 py-3 text-sm"
                rows={1}
                style={{ height: 'auto', minHeight: '44px' }}
              />
              <button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className={`p-3 rounded-xl transition-all flex items-center justify-center w-12 h-12 ${
                  inputValue.trim() && !isTyping 
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20' 
                    : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                }`}
              >
                <i className={`fa-solid ${isTyping ? 'fa-spinner animate-spin' : 'fa-arrow-up-long'}`}></i>
              </button>
            </div>
            <div className="text-center mt-3">
              <p className="text-[10px] text-slate-500 font-medium">
                POWERED BY GEMINI PRO • ENTERPRISE GRADE SECURITY
              </p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Floating Info Cards - Decorative */}
      <div className="hidden lg:block fixed bottom-10 right-10 z-20 space-y-4">
        <div className="glass p-4 rounded-xl border border-white/10 flex items-center gap-4 w-64 animate-fade-in-bottom">
           <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
             <i className="fa-solid fa-microchip"></i>
           </div>
           <div>
             <p className="text-xs font-bold text-slate-200">Neural Engine</p>
             <p className="text-[10px] text-slate-500">Processing real-time KPIs</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default App;
