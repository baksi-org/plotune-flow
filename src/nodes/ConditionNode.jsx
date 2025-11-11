import React from "react";
import { Handle, Position } from "reactflow";

export default function ConditionNode({ data }) {
  return (
    <div
      style={{
        background: "#ede9fe",
        border: "1px solid #7c3aed",
        borderRadius: 8,
        padding: 12,
        width: 180,
        textAlign: "center",
        fontWeight: 500,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <Handle type="target" position={Position.Top} id="in" />
      <div>🟣 {data.label || "Condition"}</div>
      <Handle type="source" position={Position.Bottom} id="true" style={{ left: "30%" }} />
      <Handle type="source" position={Position.Bottom} id="false" style={{ left: "70%" }} />
    </div>
  );
}
