import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import Room from './Room'; // Room Dashboard ki jagah ab direct Room import ho raha hai

interface LandingProps {
  onSelectWorkspace: (type: 'room' | 'solo', id: string, name: string) => void;
}

export default function Landing({ onSelectWorkspace }: LandingProps) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  // Custom Minimal Routing Node Stack
  const [currentView, setCurrentView] = useState<'landing' | 'room'>('landing');

  const handleAuthSuccess = () => {
    setIsAuthOpen(false);
    // Authentication confirm hote hi redirect flow straight Room component ko push karega
    setCurrentView('room');
  };

  // Safe execution routing guard: Agar route view state 'room' par switch ho chuki hai
  if (currentView === 'room') {
    // CRITICAL FIX: Yahan Room component ko prop forward kar rahe hain
    return <Room onSelectWorkspace={onSelectWorkspace} />;
  }

  return (
    <div className="min-h-screen bg-[#060814] text-[#F3F4F6] font-sans relative overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* Background Micro Glow Layers */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-indigo-600/10 via-purple-600/5 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-[400px] -left-40 w-96 h-96 bg-indigo-500/5 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-[200px] -right-40 w-96 h-96 bg-purple-500/5 blur-[100px] pointer-events-none rounded-full" />

      {/* Transparent Sticky Header Navigation */}
      <header className="border-b border-gray-900/80 bg-[#060814]/70 backdrop-blur-md sticky top-0 z-40 px-6 lg:px-16 py-4 flex items-center justify-between transition-all">
        <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => setCurrentView('landing')}>
          <div className="h-9 w-9 bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 duration-200">
            CS
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            CodeSync
          </span>
        </div>

        <div className="flex items-center gap-5">
          <button 
            onClick={() => { setAuthMode('login'); setIsAuthOpen(true); }} 
            className="text-sm font-semibold text-gray-400 hover:text-white transition-colors"
          >
            Sign In
          </button>
          <button 
            onClick={() => { setAuthMode('signup'); setIsAuthOpen(true); }} 
            className="bg-indigo-600 hover:bg-indigo-500 transition-all text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/20 active:scale-95"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Main Container Layout */}
      <main className="max-w-6xl mx-auto px-6 pt-20 pb-24 relative z-10">
        
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 bg-indigo-950/30 border border-indigo-500/20 rounded-full px-4 py-1.5 text-xs font-semibold text-indigo-300 backdrop-blur-sm shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
            Real-time multi-user synchronization engine ready
          </div>
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.1] bg-gradient-to-b from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
            Code together,<br />like you're in the same room
          </h1>
          <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Multi-user editing with live cursors, presence indicators, context-aware AI autocomplete, and a built-in chat. Zero complex setups.
          </p>
          
          <div className="mb-20">
            <button 
              onClick={() => { setAuthMode('login'); setIsAuthOpen(true); }} 
              className="px-10 py-4.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-2xl shadow-indigo-600/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              Create an Editor Room
            </button>
          </div>
        </div>

        {/* Dynamic Studio Code View Display Box */}
        <div className="w-full bg-[#0b0f19]/60 border border-gray-800/80 rounded-2xl p-1 shadow-2xl shadow-black/80 backdrop-blur-sm mb-24 max-w-4xl mx-auto relative group">
          <div className="absolute -inset-px bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="bg-[#080b12] rounded-xl overflow-hidden border border-gray-900">
            <div className="flex items-center justify-between px-4 py-3 bg-[#05070c] border-b border-gray-900/80">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/40" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/40" />
                <span className="w-3 h-3 rounded-full bg-green-500/40" />
                <span className="text-xs text-gray-500 font-mono ml-2">App.tsx — CodeSync</span>
              </div>
              <div className="flex -space-x-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-500 border border-[#080b12] text-[8px] font-bold flex items-center justify-center">VS</span>
                <span className="w-5 h-5 rounded-full bg-purple-500 border border-[#080b12] text-[8px] font-bold flex items-center justify-center">AI</span>
              </div>
            </div>
            <div className="p-6 font-mono text-xs md:text-sm text-gray-400 space-y-2 select-none overflow-x-auto whitespace-nowrap">
              <p><span className="text-purple-400">import</span> React, &#123; <span className="text-blue-400">useState</span> &#125; <span className="text-purple-400">from</span> <span className="text-emerald-400">'react'</span>;</p>
              <p><span className="text-purple-400">import</span> &#123; <span className="text-blue-400">YjsProvider</span> &#125; <span className="text-purple-400">from</span> <span className="text-emerald-400">'./lib/yjs-provider'</span>;</p>
              <p className="relative inline-block w-full">
                <span className="text-blue-500">export default function</span> <span className="text-yellow-400">SharedRoom</span>() &#123;
                <span className="absolute left-[160px] top-0 bg-indigo-500 text-[10px] text-white px-1.5 py-0.5 rounded font-sans font-bold shadow-md animate-bounce">Vishal typing...</span>
                <span className="w-0.5 h-4 bg-indigo-500 inline-block ml-0.5 animate-pulse align-middle" />
              </p>
              <p className="pl-4 text-gray-500">// CRDT Sync engine is operational.</p>
              <p className="pl-4"><span className="text-purple-400">return</span> &lt;<span className="text-blue-400">div</span> className=<span className="text-emerald-400">"editor-workspace"</span>&gt;...&lt;/<span className="text-blue-400">div</span>&gt;;</p>
              <p>&#125;</p>
            </div>
          </div>
        </div>

        {/* Feature Layout Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-900/60 pt-16">
          <div className="p-6 bg-gradient-to-b from-gray-900/20 to-gray-950/40 border border-gray-900 hover:border-indigo-500/30 rounded-xl transition-all duration-300 group shadow-lg">
            <div className="h-10 w-10 rounded-lg bg-indigo-950/60 border border-indigo-800/40 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-105 duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 9.152c.582.448 1.148.89 1.676 1.345m-1.676-1.345c-.38-.3-.763-.615-1.146-.937m2.822 2.282c.553.477 1.02.954 1.388 1.41a12.23 12.23 0 01-2.822-2.282zm0 0c-.443-.383-.893-.78-1.346-1.189" /></svg>
            </div>
            <h3 className="text-base font-bold text-white mb-2">Live Cursors</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Track your peers instantly. Watch every collaborator's pointer move, select code, and edit blocks latency-free.</p>
          </div>

          <div className="p-6 bg-gradient-to-b from-gray-900/20 to-gray-950/40 border border-gray-900 hover:border-purple-500/30 rounded-xl transition-all duration-300 group shadow-lg">
            <div className="h-10 w-10 rounded-lg bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-105 duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.795H13.19l1.108-5.121L5.318 15.904h4.495z" /></svg>
            </div>
            <h3 className="text-base font-bold text-white mb-2">AI Autocomplete</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Deep inline contextual autocompletions and architecture advice powered by fine-tuned models.</p>
          </div>

          <div className="p-6 bg-gradient-to-b from-gray-900/20 to-gray-950/40 border border-gray-900 hover:border-emerald-500/30 rounded-xl transition-all duration-300 group shadow-lg">
            <div className="h-10 w-10 rounded-lg bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7" /></svg>
            </div>
            <h3 className="text-base font-bold text-white mb-2">CRDT Sync Engine</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Powered by algorithmic Yjs math. Guarantees zero edit collisions or sequence errors across networks.</p>
          </div>
        </div>
      </main>

      {/* Auth Modals Container Overlay */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all">
          <div className="relative w-full max-w-md bg-[#090d1a] border border-gray-800/80 rounded-2xl shadow-2xl p-0.5">
            
            <button 
              onClick={() => setIsAuthOpen(false)} 
              className="absolute top-5 right-5 z-20 text-gray-500 hover:text-white transition-colors p-1 bg-gray-900/40 border border-gray-800/60 rounded-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="bg-[#090d1a] rounded-2xl overflow-hidden">
              {authMode === 'login' ? (
                <Login 
                  onSwitchToSignup={() => setAuthMode('signup')} 
                  onLoginSuccess={handleAuthSuccess} 
                />
              ) : (
                <Signup 
                  onSwitchToLogin={() => setAuthMode('login')} 
                  onSignupSuccess={handleAuthSuccess} 
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}