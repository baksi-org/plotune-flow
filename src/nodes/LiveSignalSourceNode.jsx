// src/nodes/LiveSignalSourceNode.jsx
import React from "react";
import { Handle, Position } from "reactflow";

export default function LiveSignalSourceNode({ id, data, type }) {
  const label = data?.signalName || `Live Signal`;
  const description = data?.description || "No description provided";

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid rgba(13,27,42,0.06)",
        borderRadius: 10,
        padding: 12,
        width: 220,
        boxShadow: "0 6px 18px rgba(6,18,40,0.04)",
        fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto",
      }}
    >
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: "linear-gradient(180deg,#f8fafc,#fff)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(13,27,42,0.04)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 6h16v4H4zM4 14h16v4H4z" fill="#0f1724" opacity="0.9" />
          </svg>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0f1724" }}>{label}</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>{type}</div>
        </div>
      </div>

      <div style={{ fontSize: 12, color: "#374151" }}>{description}</div>

      {/* Only one output handle at the bottom */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="out"
        style={{ background: "#0969da", border: "none", width: 12, height: 12 }}
      />
    </div>
  );
}
