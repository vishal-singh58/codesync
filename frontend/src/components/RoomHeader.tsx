import React from 'react';
import { X, Lock, Share2, Wifi, Users, ChevronDown } from 'lucide-react';

export default function RoomHeader({ roomName, onLeave }: any) {
  return (
    <div className="h-12 bg-[#010409] border-b border-[#30363d] flex items-center justify-between px-4 select-none">
      
      {/* Left Section: Room Info */}
      <div className="flex items-center gap-3">
        <div className="bg-[#161b22] p-1.5 rounded-md border border-[#30363d]">
          <Lock size={14} className="text-gray-400" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
            {roomName}
            <ChevronDown size={12} className="text-gray-500 cursor-pointer" />
          </h1>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Live Collaborative Session
          </div>
        </div>
      </div>

      {/* Right Section: Controls */}
      <div className="flex items-center gap-2">
        {/* Connection Status */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#161b22] rounded-md border border-[#30363d] text-gray-400">
          <Wifi size={12} className="text-green-500" />
          <span className="text-[10px] font-medium">Connected</span>
        </div>
        
        {/* Share Button */}
        <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-[11px] font-bold transition-all shadow-md shadow-indigo-900/20">
          <Share2 size={13} /> Share
        </button>

        {/* Close Button (Workspace Exit) */}
        <button 
          onClick={onLeave} 
          className="p-2 hover:bg-[#1f2937] rounded-md text-gray-400 hover:text-white transition-all ml-2"
          title="Exit Workspace"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}