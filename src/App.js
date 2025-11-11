// src/App.js
import React from "react";
import ReactFlow, { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import { FlowProvider, useFlow } from "./flow/FlowContext";
import { nodeTypes } from "./nodes";
import FlowToolbar from "./flow/FlowToolbar";
import NodePropertiesPopover from "./components/NodePropertiesPanel"; // ✅ isimle eşleştirdik

function FlowCanvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNode,
  } = useFlow();

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <FlowToolbar />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(e, node) => setSelectedNode(node)}
        nodeTypes={nodeTypes}
        fitView
      />
      <NodePropertiesPopover /> {/* ✅ güncel isim */}
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <FlowProvider>
        <FlowCanvas />
      </FlowProvider>
    </ReactFlowProvider>
  );
}
