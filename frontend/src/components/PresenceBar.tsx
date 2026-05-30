import React, { useContext } from 'react';
import { SyncContext } from '../context/SyncContext';

export const PresenceBar = () => {
  const { users } = useContext(SyncContext);

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-[#010409] border-b border-[#30363d]">
      {/* Left: Connection Count */}
      <div className="text-[10px] font-bold text-gray-500 tracking-wider">
        ONLINE ({users.length})
      </div>

      {/* Right: Avatar Stack */}
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {users.map((u: any, i: number) => (
            <div 
              key={i} 
              className="relative group flex items-center justify-center w-7 h-7 rounded-full border-2 border-[#010409] bg-gradient-to-tr from-indigo-500 to-purple-500 text-[10px] font-bold text-white shadow-lg transition-transform hover:z-10 hover:scale-110"
              title={u.name || "Anonymous"}
            >
              {/* Initials */}
              {(u.name || "U").slice(0, 2).toUpperCase()}
              
              {/* Status Indicator */}
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full border border-[#010409] bg-green-500 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};