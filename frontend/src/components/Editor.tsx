import React from 'react';

interface EditorProps {
  workspaceType: 'room' | 'solo';
  workspaceId: string;
  workspaceName: string;
  onLeave: () => void;
}

export default function Editor({ workspaceType, workspaceId, workspaceName, onLeave }: EditorProps) {
  return (
    <div className="min-h-screen bg-[#040612] text-[#F3F4F6] font-sans flex flex-col">
      {/* Mini Workspace Bar */}
      <header className="border-b border-gray-900 bg-[#060814]/90 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onLeave}
            className="text-xs font-semibold px-3 py-1.5 bg-gray-950 hover:bg-gray-900 border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            &larr; Dashboard
          </button>
          <div className="h-px w-4 bg-gray-800" />
          <span className="text-xs font-mono bg-indigo-950/40 border border-indigo-900/50 px-2 py-0.5 rounded text-indigo-400 capitalize">
            {workspaceType} Mode
          </span>
          <span className="text-sm font-bold text-white font-mono">{workspaceName}</span>
        </div>
        <span className="text-[10px] text-gray-500 font-mono">ID: {workspaceId}</span>
      </header>

      {/* Main Working Dev Layout */}
      <main className="flex-1 p-6 font-mono text-sm text-gray-500 flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-gray-400">// Active development sandbox loaded completely.</p>
          <p className="text-xs text-indigo-400/80">Ready for editing {workspaceName}...</p>
        </div>
      </main>
    </div>
  );
}