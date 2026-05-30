import React, { useState } from 'react';
import { FileCode2, ChevronRight, ChevronDown, Folder, FolderOpen } from 'lucide-react';

export default function FileTree() {
  const [activeFile, setActiveFile] = useState('App.tsx');
  const files = ['App.tsx', 'store.ts', 'api.ts', 'types.d.ts'];

  return (
    <div className="h-full bg-[#010409] py-4 select-none">
      {/* Header */}
      <div className="px-4 mb-3 flex items-center justify-between text-[11px] font-bold text-gray-500 tracking-wider">
        <span>EXPLORER</span>
      </div>

      {/* Root Folder */}
      <div className="px-2">
        <div className="flex items-center gap-1.5 py-1 text-white text-[13px] font-medium cursor-pointer hover:bg-[#161b22] rounded">
          <ChevronDown size={16} /> 
          <FolderOpen size={16} className="text-blue-400" /> 
          src
        </div>

        {/* File List */}
        <div className="pl-6 mt-1 space-y-[2px]">
          {files.map((file) => (
            <div
              key={file}
              onClick={() => setActiveFile(file)}
              className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-all duration-200 text-[13px] 
                ${activeFile === file 
                  ? 'bg-[#1f2937] text-white border-l-2 border-indigo-500' 
                  : 'text-gray-400 hover:bg-[#161b22] hover:text-gray-200'}`}
            >
              <FileCode2 size={14} className={activeFile === file ? 'text-indigo-400' : 'text-gray-500'} />
              {file}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}