import React from "react";
import { Handle, Position } from "reactflow";
import logo from "../assets/logo.png";

export default function PlotuneSinkNode({ id, data, type }) {
  const label = data?.label || "Plotune Sink";
  const description = data?.description || "Data output to Plotune runtime";
  const targetType = data?.targetType || "local";
  const ip = data?.ip || "—";
  const port = data?.port || "—";

  const inputHandles = ["input"];

  const getLeft = (index, total) => `${(100 / (total + 1)) * (index + 1)}%`;

  // ✅ Allow only one connection to the sink input
  const isValidConnection = (connection, reactFlowInstance) => {
    const edges = reactFlowInstance.getEdges();
    const existing = edges.filter(
      (e) => e.target === id && e.targetHandle === connection.targetHandle
    );
    return existing.length === 0;
  };

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid rgba(13,27,42,0.06)",
        borderRadius: 10,
        padding: 12,
        width: 240,
        boxShadow: "0 6px 18px rgba(41, 41, 41, 0.74)",
        fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto",
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          marginBottom: 8,
        }}
      >
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
            overflow: "hidden",
          }}
        >
          <img
            src={logo}
            alt="Plotune"
            style={{ width: 24, height: 24, objectFit: "contain" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0f1724" }}>
            {label}
          </div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>{type}</div>
        </div>
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: 12,
          color: "#374151",
          marginBottom: 12,
          lineHeight: 1.4,
        }}
      >
        {description}
      </div>

      {/* Target display */}
      <div
        style={{
          fontSize: 12,
          padding: "6px 8px",
          background:
            targetType === "local"
              ? "rgba(34,197,94,0.08)"
              : "rgba(59,130,246,0.08)",
          border: `1px solid ${
            targetType === "local"
              ? "rgba(34,197,94,0.2)"
              : "rgba(59,130,246,0.2)"
          }`,
          borderRadius: 8,
          color: targetType === "local" ? "#15803d" : "#1d4ed8",
          textAlign: "center",
          fontWeight: 600,
        }}
      >
        {targetType === "local"
          ? "Local Plotune"
          : `Remote: ${ip}:${port}`}
      </div>

      {/* Input handle (TOP) */}
      {inputHandles.map((hid, idx) => {
        const left = getLeft(idx, inputHandles.length);
        return (
          <React.Fragment key={hid}>
            <Handle
              type="target"
              position={Position.Top}
              id={hid}
              isValidConnection={isValidConnection}
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
    </div>
  );
}
