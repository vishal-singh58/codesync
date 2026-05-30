import React, { useState } from 'react';

type CodingLanguage = 'TypeScript' | 'Python' | 'Rust' | 'JavaScript' | 'Go';

interface RoomItem {
  id: string;
  name: string;
  language: CodingLanguage;
  updatedAt: string;
  membersOnline: number;
}

interface SoloProjectItem {
  id: string;
  title: string;
  language: CodingLanguage;
  createdAt: string;
  fileSize: string;
}

interface RoomDashboardProps {
  onSelectWorkspace: (type: 'room' | 'solo', id: string, name: string) => void;
}

export default function RoomDashboard({ onSelectWorkspace }: RoomDashboardProps) {
  const [activeTab, setActiveTab] = useState<'rooms' | 'solo'>('rooms');

  const [rooms, setRooms] = useState<RoomItem[]>([
    { id: '1', name: 'api-refactor', language: 'TypeScript', updatedAt: '2 hrs ago', membersOnline: 3 },
    { id: '2', name: 'ml-pipeline', language: 'Python', updatedAt: 'yesterday', membersOnline: 1 },
    { id: '3', name: 'async-runtime', language: 'Rust', updatedAt: '3 days ago', membersOnline: 2 },
  ]);

  const [soloProjects, setSoloProjects] = useState<SoloProjectItem[]>([
    { id: 's1', title: 'leetcode-solutions', language: 'Python', createdAt: '2 mins ago', fileSize: '42 KB' },
    { id: 's2', title: 'personal-portfolio', language: 'TypeScript', createdAt: '5 days ago', fileSize: '1.2 MB' },
    { id: 's3', title: 'wasm-parser-test', language: 'Rust', createdAt: '1 week ago', fileSize: '284 KB' },
  ]);

  const [isCreatingForm, setIsCreatingForm] = useState(false);
  const [inputName, setInputName] = useState('');
  const [selectedLang, setSelectedLang] = useState<CodingLanguage>('TypeScript');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) return;

    const formattedName = inputName.toLowerCase().replace(/\s+/g, '-');

    if (activeTab === 'rooms') {
      const newRoom: RoomItem = {
        id: Date.now().toString(),
        name: formattedName,
        language: selectedLang,
        updatedAt: 'Just now',
        membersOnline: 1,
      };
      setRooms([newRoom, ...rooms]);
      onSelectWorkspace('room', newRoom.id, newRoom.name);
    } else {
      const newSoloProject: SoloProjectItem = {
        id: Date.now().toString(),
        title: formattedName,
        language: selectedLang,
        createdAt: 'Just now',
        fileSize: '4 KB',
      };
      setSoloProjects([newSoloProject, ...soloProjects]);
      onSelectWorkspace('solo', newSoloProject.id, newSoloProject.title);
    }

    setInputName('');
    setIsCreatingForm(false);
  };

  const getLangBadgeColor = (lang: CodingLanguage) => {
    switch (lang) {
      case 'TypeScript': return 'text-blue-400 bg-blue-950/40 border-blue-800/50';
      case 'Python': return 'text-yellow-400 bg-yellow-950/40 border-yellow-800/50';
      case 'Rust': return 'text-orange-400 bg-orange-950/40 border-orange-800/50';
      case 'JavaScript': return 'text-amber-400 bg-amber-950/40 border-amber-800/50';
      case 'Go': return 'text-cyan-400 bg-cyan-950/40 border-cyan-800/50';
    }
  };

  return (
    <div className="min-h-screen bg-[#060814] text-[#F3F4F6] font-sans flex flex-col selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      
      <div className="absolute top-0 left-1/3 w-[500px] h-[250px] bg-gradient-to-br from-indigo-600/10 to-purple-600/5 blur-[120px] pointer-events-none rounded-full" />

      <header className="border-b border-gray-900 bg-[#060814]/80 backdrop-blur-md px-6 lg:px-12 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center font-black text-white shadow-md">
            CS
          </div>
          <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            CodeSync<span className="text-indigo-500 font-medium text-xs ml-1 bg-indigo-950/60 border border-indigo-800/40 px-1.5 py-0.5 rounded">AN</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-white">Vishal Singh</p>
            <p className="text-[10px] text-gray-500 font-mono">ID: sync-9082</p>
          </div>
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 font-bold text-sm text-white flex items-center justify-center border border-gray-800">
            VS
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-5xl w-full mx-auto px-6 py-12 relative z-10">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-900/60">
          
          <div className="flex bg-gray-950/60 p-1 border border-gray-900 rounded-xl max-w-xs">
            <button
              onClick={() => { setActiveTab('rooms'); setIsCreatingForm(false); }}
              className={`flex-1 px-4 py-2 rounded-lg text-xs font-bold tracking-tight transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                activeTab === 'rooms' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
              Collaborative Rooms
            </button>
            <button
              onClick={() => { setActiveTab('solo'); setIsCreatingForm(false); }}
              className={`flex-1 px-4 py-2 rounded-lg text-xs font-bold tracking-tight transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                activeTab === 'solo' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Solo Projects
            </button>
          </div>

          {!isCreatingForm && (
            <button 
              onClick={() => setIsCreatingForm(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 transition-all text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/10 active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
              {activeTab === 'rooms' ? 'New Room' : 'New Solo Project'}
            </button>
          )}
        </div>

        {isCreatingForm && (
          <form onSubmit={handleFormSubmit} className="mb-6 p-5 bg-[#090d1a]/80 border border-indigo-500/20 rounded-2xl max-w-xl animate-fade-in shadow-xl space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Create {activeTab === 'rooms' ? 'Shared Environment Room' : 'Private Sandbox Project'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-gray-400 font-bold mb-1.5 uppercase">Identifier / Title</label>
                <input 
                  type="text"
                  required
                  placeholder={activeTab === 'rooms' ? 'e.g. dev-cluster' : 'e.g. fast-api-test'}
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-950 border border-gray-800 focus:border-indigo-500 rounded-xl focus:outline-none text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-400 font-bold mb-1.5 uppercase">Core Language Base</label>
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value as CodingLanguage)}
                  className="w-full px-3 py-2 text-xs bg-gray-950 border border-gray-800 focus:border-indigo-500 rounded-xl focus:outline-none text-white font-medium"
                >
                  <option value="TypeScript">TypeScript</option>
                  <option value="Python">Python</option>
                  <option value="Rust">Rust</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Go">Go</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button 
                type="button" 
                onClick={() => setIsCreatingForm(false)} 
                className="text-xs text-gray-400 hover:text-white font-semibold px-3"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-500 transition-colors text-white px-4 py-1.5 rounded-lg text-xs font-bold"
              >
                Deploy Engine
              </button>
            </div>
          </form>
        )}

        {/* --- GRID RENDER VIEW --- */}
        {activeTab === 'rooms' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((room) => (
              <div 
                key={room.id}
                onClick={() => onSelectWorkspace('room', room.id, room.name)}
                className="group p-5 bg-[#090d1a]/40 border border-gray-900 hover:border-indigo-500/20 rounded-xl transition-all duration-200 flex flex-col justify-between relative overflow-hidden shadow-md cursor-pointer"
              >
                <div className="absolute top-0 inset-x-0 h-[2px] bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded border ${getLangBadgeColor(room.language)}`}>
                      {room.language}
                    </span>
                    <span className="text-[10px] text-gray-500 flex items-center gap-1 font-medium font-mono">
                      <span className={`h-1.5 w-1.5 rounded-full ${room.membersOnline > 1 ? 'bg-emerald-500 animate-pulse' : 'bg-gray-600'}`} />
                      {room.membersOnline} {room.membersOnline === 1 ? 'member' : 'online'}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white font-mono tracking-tight truncate">
                    {room.name}
                  </h3>
                </div>
                <div className="mt-6 pt-3 border-t border-gray-950/60 flex items-center justify-between text-[11px] text-gray-500">
                  <span>Updated {room.updatedAt}</span>
                  <span className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors flex items-center gap-0.5">
                    Connect 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                  </span>
                </div>
              </div>
            ))}

            {!isCreatingForm && (
              <button 
                onClick={() => setIsCreatingForm(true)}
                className="p-5 border-2 border-dashed border-gray-900 hover:border-indigo-500/30 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-gray-400 transition-colors duration-200 group min-h-[140px]"
              >
                <div className="h-8 w-8 rounded-full bg-gray-950 flex items-center justify-center border border-gray-900 group-hover:scale-105 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                </div>
                <span className="text-xs font-semibold tracking-tight">Launch collaborative environment</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {soloProjects.map((project) => (
              <div 
                key={project.id}
                onClick={() => onSelectWorkspace('solo', project.id, project.title)}
                className="group p-5 bg-[#090d1a]/20 border border-gray-900/60 hover:border-purple-500/20 rounded-xl transition-all duration-200 flex flex-col justify-between relative overflow-hidden shadow-sm cursor-pointer"
              >
                <div className="absolute top-0 inset-x-0 h-[2px] bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded border ${getLangBadgeColor(project.language)}`}>
                      {project.language}
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono tracking-tight">
                      {project.fileSize}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white font-mono tracking-tight truncate">
                    {project.title}
                  </h3>
                  <p className="text-[10px] text-gray-600 mt-1 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-2.5 h-2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                    Private Workspace
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-gray-950/60 flex items-center justify-between text-[11px] text-gray-500">
                  <span>Created {project.createdAt}</span>
                  <span className="text-purple-400 font-bold hover:text-purple-300 transition-colors flex items-center gap-0.5">
                    Open Editor 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                  </span>
                </div>
              </div>
            ))}

            {!isCreatingForm && (
              <button 
                onClick={() => setIsCreatingForm(true)}
                className="p-5 border-2 border-dashed border-gray-900 hover:border-purple-500/30 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-gray-400 transition-colors duration-200 group min-h-[140px]"
              >
                <div className="h-8 w-8 rounded-full bg-gray-950 flex items-center justify-center border border-gray-900 group-hover:scale-105 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                </div>
                <span className="text-xs font-semibold tracking-tight">Open individual local sandbox</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}