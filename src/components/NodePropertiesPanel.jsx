// src/components/NodePropertiesPanel.jsx
import React, { useState, useEffect } from "react";
import { useFlow } from "../flow/FlowContext";
import { nodePropertiesConfig } from "../nodes";
import DeleteIcon from "@mui/icons-material/Delete";

const TOOLBAR_HEIGHT = 64; // toolbar ile eşleşmeli

export default function NodePropertiesPanel() {
  const { selectedNode, setNodes, nodes, setSelectedNode } = useFlow();
  const [localData, setLocalData] = useState({});
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (selectedNode) {
      setLocalData({ ...(selectedNode.data || {}) });
      setVisible(true);
    } else {
      setLocalData({});
      setVisible(false);
    }
  }, [selectedNode]);

  if (!selectedNode) return null;

  const handleChange = (key, value) => {
    setLocalData((prev) => ({ ...prev, [key]: value }));
  };

  const handleConfirm = () => {
    setNodes(
      nodes.map((n) =>
        n.id === selectedNode.id ? { ...n, data: { ...n.data, ...localData } } : n
      )
    );
    setVisible(false);
    setSelectedNode(null);
  };

  const handleCancel = () => {
    setLocalData(selectedNode.data || {});
    setVisible(false);
    setSelectedNode(null);
  };

  const togglePanel = () => setVisible((v) => !v);

  if (!visible) {
    return (
      <button
        onClick={togglePanel}
        aria-label="Open properties"
        style={{
          position: "absolute",
          right: 12,
          top: TOOLBAR_HEIGHT + 12,
          zIndex: 20,
          background: "linear-gradient(180deg,#0b69f3,#0753c6)",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "8px 12px",
          cursor: "pointer",
          boxShadow: "0 6px 18px rgba(5,25,50,0.15)",
          fontWeight: 600,
          fontSize: 13,
        }}
      >
        Properties
      </button>
    );
  }

  const fields =
    nodePropertiesConfig[selectedNode.type] ||
    Object.keys(localData).map((k) => ({ key: k, label: k, type: "text" }));

  return (
    <aside
      role="region"
      aria-label="Node properties panel"
      style={{
        position: "absolute",
        right: 12,
        top: TOOLBAR_HEIGHT + 12,
        width: 360,
        maxHeight: "75vh",
        background: "linear-gradient(180deg,#ffffff,#f7f9fb)",
        border: "1px solid rgba(13, 27, 42, 0.06)",
        padding: 16,
        boxShadow: "0 10px 30px rgba(14,20,30,0.08)",
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        overflowX: "hidden",
        borderRadius: 12,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 3,
            background: "#0969da",
            boxShadow: "0 1px 4px rgba(9,105,218,0.25)",
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#0f1724" }}>
            {(selectedNode.type || "").replace(/_/g, " ").toUpperCase()} Properties
          </div>
          <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
            id: {selectedNode.id}
          </div>
        </div>

        <button
          onClick={() => {
            setVisible(false);
            setSelectedNode(null);
          }}
          aria-label="Close properties"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: 18,
            color: "#374151",
            padding: 6,
            borderRadius: 6,
          }}
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: "grid", gap: 12 }}>
        {fields.length === 0 && (
          <div
            style={{
              padding: 12,
              borderRadius: 8,
              background: "rgba(10,20,40,0.02)",
              color: "#374151",
              fontSize: 13,
            }}
          >
            No editable properties for this node.
          </div>
        )}

        {fields.map(({ key, label, type = "text", options = [] }) => (
          <div key={key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, color: "#374151", fontWeight: 600 }}>{label}</label>

            {type === "textarea" ? (
              <textarea
                value={localData[key] ?? ""}
                onChange={(e) => handleChange(key, e.target.value)}
                style={{
                  minHeight: 96,
                  padding: "8px 12px",
                  fontSize: 14,
                  borderRadius: 8,
                  border: "1px solid rgba(13,27,42,0.08)",
                  background: "#fff",
                  boxShadow: "inset 0 1px 2px rgba(2,6,23,0.03)",
                  outline: "none",
                  resize: "vertical",
                }}
              />
            ) : type === "checkbox" ? (
              <input
                type="checkbox"
                checked={!!localData[key]}
                onChange={(e) => handleChange(key, e.target.checked)}
                style={{ width: 18, height: 18 }}
              />
            ) : type === "select" ? (
              <select
                value={localData[key] ?? ""}
                onChange={(e) => handleChange(key, e.target.value)}
                style={{
                  height: 40,
                  padding: "8px 12px",
                  fontSize: 14,
                  borderRadius: 8,
                  border: "1px solid rgba(13,27,42,0.08)",
                  background: "#fff",
                  outline: "none",
                }}
              >
                <option value="" disabled>
                  — select —
                </option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={localData[key] ?? ""}
                onChange={(e) => handleChange(key, e.target.value)}
                style={{
                  height: 40,
                  padding: "8px 12px",
                  fontSize: 14,
                  borderRadius: 8,
                  border: "1px solid rgba(13,27,42,0.08)",
                  background: "#fff",
                  boxShadow: "inset 0 1px 2px rgba(2,6,23,0.03)",
                  outline: "none",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <button
          onClick={handleCancel}
          style={{
            flex: 1,
            height: 42,
            background: "transparent",
            border: "1px solid rgba(13,27,42,0.06)",
            color: "#374151",
            borderRadius: 10,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Cancel
        </button>

        <button
          onClick={handleConfirm}
          style={{
            flex: 1,
            height: 42,
            background: "linear-gradient(180deg,#0969da,#0753c6)",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            fontWeight: 700,
            boxShadow: "0 8px 20px rgba(7,83,198,0.12)",
          }}
        >
          Confirm
        </button>
      </div>
    </aside>
  );
}
