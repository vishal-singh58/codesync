import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

export default function ChatPanel() {
  const [messages] = useState([
    { id: 1, user: 'Alex N.', text: 'No — stable ref, safe to omit', time: '10:42 PM', isBot: false },
    { id: 2, user: 'Marco K.', text: 'AI suggestion on ln 14 looks solid', time: '10:43 PM', isBot: false },
    { id: 3, user: 'CodeSync AI', text: 'Refactor complete. Ready to deploy?', time: '10:45 PM', isBot: true },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="h-full flex flex-col bg-[#010409] border-l border-[#30363d]">
      {/* Header */}
      <div className="p-4 border-b border-[#30363d] font-bold text-xs text-gray-500 tracking-wider">
        ROOM CHAT
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages.map((m) => (
          <div key={m.id} className={`flex gap-3 ${m.isBot ? 'opacity-80' : ''}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${m.isBot ? 'bg-indigo-900' : 'bg-[#21262d]'}`}>
              {m.isBot ? <Bot size={14} className="text-indigo-400" /> : <User size={14} className="text-gray-400" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-bold ${m.isBot ? 'text-indigo-400' : 'text-blue-400'}`}>{m.user}</span>
                <span className="text-[9px] text-gray-600">{m.time}</span>
              </div>
              <p className="text-[12px] text-gray-300 mt-0.5 leading-relaxed bg-[#161b22] p-2 rounded-md rounded-tl-none border border-[#30363d]/50">
                {m.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-[#30363d] bg-[#010409]">
        <div className="relative flex items-center">
          <input 
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg py-2.5 pl-3 pr-10 text-xs focus:outline-none focus:border-indigo-500 transition-colors" 
            placeholder="Type a message..." 
          />
          <Send size={14} className="absolute right-3 text-gray-500 hover:text-indigo-400 cursor-pointer transition-colors" />
        </div>
      </div>
    </div>
  );
}