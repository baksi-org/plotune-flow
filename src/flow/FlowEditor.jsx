import React from "react";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import { useFlow } from "./FlowContext";
import FlowToolbar from "./FlowToolbar";
import nodeTypes from "../nodes";

export default function FlowEditor() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useFlow();

  // Check if dark mode is enabled
  const isDarkMode = document.documentElement.classList.contains('dark-mode');

  return (
    <div style={{ 
      height: "100vh", 
      background: "var(--bg)",
      color: "var(--text)"
    }}>
      <FlowToolbar />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        connectionLineStyle={{ 
          stroke: isDarkMode ? "#94a3b8" : "#555", 
          strokeWidth: 1.5 
        }}
        defaultEdgeOptions={{
          type: "segmented",
          style: { 
            stroke: isDarkMode ? "#94a3b8" : "#555", 
            strokeWidth: 1.5 
          },
        }}
      >
        <MiniMap
          nodeColor={() => isDarkMode ? "#64748b" : "#999"}
          maskColor={isDarkMode ? "rgba(15,23,42,0.6)" : "rgba(240,240,240,0.6)"}
          style={{ 
            background: "var(--surface)",
            border: `1px solid var(--border)`
          }}
        />
        <Controls showInteractive={false} />
        <Background 
          color={isDarkMode ? "#334155" : "#e5e7eb"} 
          gap={24} 
        />
      </ReactFlow>
    </div>
  );
}