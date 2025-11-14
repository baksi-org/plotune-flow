import React from "react";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import { useFlow } from "./FlowContext";
import FlowToolbar from "./FlowToolbar";
import nodeTypes from "../nodes";

export default function FlowEditor() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useFlow();

  return (
    <div style={{ height: "100vh", background: "#f8f9fb" }}>
      <FlowToolbar />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        connectionLineStyle={{ stroke: "#555", strokeWidth: 1.5 }}
        defaultEdgeOptions={{
          type: "segmented",
          style: { stroke: "#555", strokeWidth: 1.5 },
        }}
      >
        <MiniMap
          nodeColor={() => "#999"}
          maskColor="rgba(240,240,240,0.6)"
          style={{ background: "#fff" }}
        />
        <Controls showInteractive={false} />
        <Background color="#e5e7eb" gap={24} />
      </ReactFlow>
    </div>
  );
}
