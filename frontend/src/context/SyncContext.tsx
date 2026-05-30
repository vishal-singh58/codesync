import React, { createContext, useState, useEffect, useMemo } from 'react';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';

export const SyncContext = createContext<any>(null);

export const SyncProvider = ({ roomId, children }: any) => {
  // 1. Initialize Yjs document (Persistence Layer)
  const ydoc = useMemo(() => new Y.Doc(), []);

  // 2. Initialize WebRTC Provider for real-time sync
  const [provider, setProvider] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const p = new WebrtcProvider(roomId, ydoc);
    setProvider(p);

    // 3. Presence (Awareness) logic
    // Jab bhi koi user join/leave karega ya cursor hilaega, yeh update hoga
    p.awareness.on('change', () => {
      const states = Array.from(p.awareness.getStates().values());
      setUsers(states);
    });

    // Cleanup on component unmount
    return () => {
      p.destroy();
    };
  }, [roomId, ydoc]);

  return (
    <SyncContext.Provider value={{ ydoc, provider, users }}>
      {children}
    </SyncContext.Provider>
  );
};