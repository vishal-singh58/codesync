import React, { useState } from 'react';
import Landing from "./pages/Landing";
import Editor from "./components/Editor";
import { SyncProvider } from "./context/SyncContext";

interface ActiveWorkspace {
  type: 'room' | 'solo';
  id: string;
  name: string;
}

function App() {
  const [activeWorkspace, setActiveWorkspace] = useState<ActiveWorkspace | null>(null);

  // Dashboard se editor select karne ka mechanism
  const handleSelectWorkspace = (type: 'room' | 'solo', id: string, name: string) => {
    setActiveWorkspace({ type, id, name });
  };

  // Editor se wapas dashboard (Landing) par aane ka handler
  const handleLeaveWorkspace = () => {
    setActiveWorkspace(null);
  };

  return (
    <>
      {activeWorkspace ? (
        <SyncProvider roomId="x7k2-alpha">
  

        <Editor 
          workspaceType={activeWorkspace.type}
          workspaceId={activeWorkspace.id}
          workspaceName={activeWorkspace.name}
          onLeave={handleLeaveWorkspace}
        />
        </SyncProvider>
      ) : (
        /* Passing the routing event handler down to your Landing/Dashboard layout */
        <Landing onSelectWorkspace={handleSelectWorkspace} />
      )}
    </>
  );
}

export default App;