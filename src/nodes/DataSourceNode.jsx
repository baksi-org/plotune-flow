import React from "react";
import { Handle, Position } from "reactflow";

export default function DataSourceNode({ id, data }) {
  const label = data?.signalName || data?.constantValue || `Signal ${id}`;

  return (
    <div
      style={{
        background: "#f3f4f6",
        border: "1px solid #d1d5db",
        borderRadius: 12,
        padding: 16,
        width: 200,
        textAlign: "center",
        fontWeight: 500,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
      className="data-source-node"
    >
      <div
        style={{
          marginBottom: 8,
          fontSize: 14,
          color: "#1f2937",
          fontWeight: 600,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        title={label}
      >
        {label}
      </div>
      <div
        style={{
          height: 4,
          backgroundColor: "#0969da",
          borderRadius: 2,
          marginBottom: 8,
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="out"
        style={{ background: "#0969da", border: "none", width: 12, height: 12 }}
      />
    </div>
  );
}
