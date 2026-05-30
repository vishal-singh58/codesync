import React from 'react';
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Editor from '@monaco-editor/react';

// Components imports
import RoomHeader from './RoomHeader'; 
import { PresenceBar } from './PresenceBar';
import  FileTree  from './FileTree';
import  ChatPanel  from './ChatPanel';

export default function EditorComponent({ workspaceName, onLeave }: any) {
  return (
    <div className="h-screen flex flex-col bg-[#0d1117] text-white overflow-hidden">
      
      {/* 1. Header (Context & Actions) */}
      <RoomHeader roomName={workspaceName} onLeave={onLeave} />
      
      {/* 2. Presence Bar (Online Users) */}
      <PresenceBar />

      {/* 3. Main Workspace (Resizing Layout) */}
      <div className="flex-1">
        <Allotment>
          {/* File Explorer */}
          <Allotment.Pane preferredSize={220} minSize={150}>
            <FileTree />
          </Allotment.Pane>
          
          {/* Main Editor */}
          <Allotment.Pane>
            <Editor 
              height="100%" 
              theme="vs-dark" 
              defaultLanguage="typescript"
              options={{
                fontSize: 14,
                fontFamily: "'JetBrains Mono', monospace",
                minimap: { enabled: true }
              }}
            />
          </Allotment.Pane>
          
          {/* Chat Panel */}
          <Allotment.Pane preferredSize={300} minSize={200}>
            <ChatPanel />
          </Allotment.Pane>
        </Allotment>
      </div>
    </div>
  );
}