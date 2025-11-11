import React from "react";
import { Handle, Position } from "reactflow";

export default function ActionNode({ data }) {
  return (
    <div
      style={{
        background: "#dbeafe",
        border: "1px solid #1d4ed8",
        borderRadius: 8,
        padding: 12,
        width: 180,
        textAlign: "center",
        fontWeight: 500,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <Handle type="target" position={Position.Top} id="in" />
      <div>🔵 {data.label || "Action"}</div>
      <Handle type="source" position={Position.Bottom} id="out" />
    </div>
  );
}
