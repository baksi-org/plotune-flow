// src/nodes/LiveSignalSourceNode.jsx
import React from "react";
import { Handle, Position } from "reactflow";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export default function ThresholdNode({ id, data, type }) {
  const label = data?.label || `Threshold Filter`;
  const description = data?.description || "No description provided";

  // Define your input and output IDs
  const inputHandles = ["input"];
  const outputHandles = ["output"];

  // helper to compute left position percentage
  const getLeft = (index, total) => {
    const spacing = 100 / (total + 1);
    return `${spacing * (index + 1)}%`;
  };

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
        position: "relative",
      }}
    >
      {/* Header */}
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
          <FiberManualRecordIcon style={{ fontSize: 20, color: "#0f1724", opacity: 0.9 }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0f1724" }}>{label}</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>{type}</div>
        </div>
      </div>

      <div style={{ fontSize: 12, color: "#374151", marginBottom: 16 }}>{description}</div>

      {/* Input handles (TOP) */}
      {inputHandles.map((hid, idx) => {
        const left = getLeft(idx, inputHandles.length);
        return (
          <React.Fragment key={hid}>
            <Handle
              type="target"
              position={Position.Top}
              id={hid}
              style={{
                left,
                transform: "translateX(-50%)",
                background: "#9ca3af",
                border: "none",
                width: 12,
                height: 12,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: -24,
                left,
                transform: "translateX(-50%)",
                fontSize: 9,
                borderRadius: 4,
                color: "rgba(10, 16, 23, 0.74)",
              }}
            >
              {hid}
            </div>
          </React.Fragment>
        );
      })}

      {/* Output handles (BOTTOM) */}
      {outputHandles.map((hid, idx) => {
        const left = getLeft(idx, outputHandles.length);
        return (
          <React.Fragment key={hid}>
            <Handle
              type="source"
              position={Position.Bottom}
              id={hid}
              style={{
                left,
                transform: "translateX(-50%)",
                background: "#0969da",
                border: "none",
                width: 12,
                height: 12,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -24,
                left,
                transform: "translateX(-50%)",
                fontSize: 9,
                borderRadius: 4,
                color: "rgba(10, 16, 23, 0.74)",
              }}
            >
              {hid}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
