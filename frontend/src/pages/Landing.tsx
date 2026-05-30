import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

type CodingLanguage = 'TypeScript' | 'Python' | 'Rust' | 'JavaScript' | 'Go';

interface RoomItem {
  id: string;
  name: string;
  language: CodingLanguage;
  updatedAt: string;
  membersOnline: number;
}

// --- PREMIUM ROOM DASHBOARD ---
function RoomDashboard({ onLogout }: { onLogout: () => void }) {
  const [rooms, setRooms] = useState<RoomItem[]>([
    { id: '1', name: 'api-refactor', language: 'TypeScript', updatedAt: '2 hrs ago', membersOnline: 3 },
    { id: '2', name: 'ml-pipeline', language: 'Python', updatedAt: 'yesterday', membersOnline: 1 },
    { id: '3', name: 'async-runtime', language: 'Rust', updatedAt: '3 days ago', membersOnline: 2 },
  ]);

  // Inline forms state so everything feels native and gorgeous
  const [isCreating, setIsCreating] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomLang, setNewRoomLang] = useState<CodingLanguage>('TypeScript');
  const [connectingId, setConnectingId] = useState<string | null>(null);

  const handleCreateRoomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;

    const newRoom: RoomItem = {
      id: Date.now().toString(),
      name: newRoomName.toLowerCase().replace(/\s+/g, '-'),
      language: newRoomLang,
      updatedAt: 'Just now',
      membersOnline: 1,
    };

    setRooms([newRoom, ...rooms]);
    setNewRoomName('');
    setIsCreating(false);
  };

  const handleConnect = (id: string) => {
    setConnectingId(id);
    setTimeout(() => {
      setConnectingId(null);
    }, 1500);
  };

  const getLangBadge = (lang: CodingLanguage) => {
    switch (lang) {
      case 'TypeScript': return 'text-blue-400 bg-blue-500/5 border-blue-500/20';
      case 'Python': return 'text-yellow-400 bg-yellow-500/5 border-yellow-500/20';
      case 'Rust': return 'text-orange-400 bg-orange-500/5 border-orange-500/20';
      case 'JavaScript': return 'text-amber-400 bg-amber-500/5 border-amber-500/20';
      case 'Go': return 'text-cyan-400 bg-cyan-500/5 border-cyan-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#040612] text-[#F3F4F6] font-sans flex flex-col selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-indigo-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-purple-500/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Modern Dashboard Header */}
      <header className="border-b border-gray-900/60 bg-[#040612]/70 backdrop-blur-xl px-6 lg:px-16 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="h-9 w-9 bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-indigo-500/20">
            CS
          </div>
          <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            CodeSync<span className="text-indigo-400 font-bold text-[10px] ml-1.5 bg-indigo-950/40 border border-indigo-900/40 px-2 py-0.5 rounded-full">AN</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-gray-950/40 border border-gray-900 rounded-full py-1 pl-4 pr-1.5">
            <div className="text-right">
              <p className="text-xs font-bold text-white leading-tight">Vishal Singh</p>
              <span className="text-[9px] text-gray-500 font-mono tracking-wide">sync-9082</span>
            </div>
            <button 
              onClick={onLogout}
              className="text-xs bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white transition-all px-3.5 py-1.5 rounded-full font-semibold border border-gray-800"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-12 relative z-10">
        
        {/* Header Metadata Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-gray-900/60">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Active Cloud Rooms</h2>
            <p className="text-xs text-gray-400 mt-1">Boot instances or coordinate real-time code environments.</p>
          </div>
          {!isCreating && (
            <button 
              onClick={() => setIsCreating(true)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 transition-all text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
              New Room
            </button>
          )}
        </div>

        {/* Embedded Dynamic Workspace Box Form */}
        {isCreating && (
          <form onSubmit={handleCreateRoomSubmit} className="mb-8 p-6 bg-[#080d1a]/60 border border-indigo-500/20 rounded-2xl animate-fade-in space-y-4 max-w-xl shadow-xl">
            <h3 className="text-sm font-bold text-white">Initialize Environment</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Room Identifier</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. auth-service-fix"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-gray-950 border border-gray-800 focus:border-indigo-500 rounded-xl text-white placeholder-gray-600 focus:outline-none text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Language Profile</label>
                <select 
                  value={newRoomLang}
                  onChange={(e) => setNewRoomLang(e.target.value as CodingLanguage)}
                  className="w-full px-3.5 py-2 bg-gray-950 border border-gray-800 focus:border-indigo-500 rounded-xl text-white focus:outline-none text-xs font-medium"
                >
                  <option value="TypeScript">TypeScript</option>
                  <option value="Python">Python</option>
                  <option value="Rust">Rust</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Go">Go</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2 justify-end pt-2">
              <button 
                type="button" 
                onClick={() => setIsCreating(false)}
                className="px-3.5 py-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition-all"
              >
                Launch Cluster
              </button>
            </div>
          </form>
        )}

        {/* High-End Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rooms.map((room) => (
            <div 
              key={room.id}
              onClick={() => handleConnect(room.id)}
              className="group p-5 bg-[#070b14]/50 border border-gray-900/80 hover:border-indigo-500/30 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden shadow-md"
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[9px] font-bold tracking-wider px-2 py-0.5 rounded border ${getLangBadge(room.language)}`}>
                    {room.language}
                  </span>
                  <span className="text-[10px] text-gray-500 flex items-center gap-1.5 font-mono">
                    <span className={`h-1.5 w-1.5 rounded-full ${room.membersOnline > 1 ? 'bg-emerald-400 animate-pulse' : 'bg-gray-600'}`} />
                    {room.membersOnline} {room.membersOnline === 1 ? 'member' : 'online'}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors font-mono tracking-tight truncate">
                  {room.name}
                </h3>
              </div>

              <div className="mt-8 pt-3.5 border-t border-gray-900/40 flex items-center justify-between text-[11px] text-gray-500">
                <span>Active {room.updatedAt}</span>
                <span className="text-indigo-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  {connectingId === room.id ? (
                    <span className="flex items-center gap-1 text-emerald-400">
                      <span className="h-1 w-1 rounded-full bg-emerald-400 animate-ping"/> Connected
                    </span>
                  ) : (
                    <>Connect <span className="text-xs">&rarr;</span></>
                  )}
                </span>
              </div>
            </div>
          ))}

          {/* Dotted Quick Create Action Slot */}
          {!isCreating && (
            <button 
              onClick={() => setIsCreating(true)}
              className="p-5 border-2 border-dashed border-gray-900 hover:border-gray-800 rounded-2xl flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-gray-400 transition-all group min-h-[146px] bg-gray-950/10"
            >
              <div className="h-7 w-7 rounded-lg bg-gray-950 flex items-center justify-center border border-gray-900 text-gray-400 group-hover:text-white transition-colors">
                +
              </div>
              <span className="text-xs font-bold tracking-tight">Create a new workspace</span>
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

// --- MAIN WRAPPER COMPONENT ENGINE ---
export default function Landing() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Structural Intercept: If dynamic user state hits true, route directly to pristine dashboard
  if (isLoggedIn) {
    return <RoomDashboard onLogout={() => setIsLoggedIn(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#060814] text-[#F3F4F6] font-sans relative overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* Background Micro Glow Layers */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-indigo-600/10 via-purple-600/5 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-[400px] -left-40 w-96 h-96 bg-indigo-500/5 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-[200px] -right-40 w-96 h-96 bg-purple-500/5 blur-[100px] pointer-events-none rounded-full" />

      {/* Transparent Sticky Header Navigation */}
      <header className="border-b border-gray-900/80 bg-[#060814]/70 backdrop-blur-md sticky top-0 z-40 px-6 lg:px-16 py-4 flex items-center justify-between transition-all">
        <div className="flex items-center gap-2.5 group cursor-pointer">
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
                  onLoginSuccess={() => { setIsLoggedIn(true); setIsAuthOpen(false); }} 
                />
              ) : (
                <Signup 
                  onSwitchToLogin={() => setAuthMode('login')} 
                  onSignupSuccess={() => { setIsLoggedIn(true); setIsAuthOpen(false); }} 
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}