// src/flow/FlowContext.js
import React, { createContext, useContext, useState, useCallback } from "react";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow";

const FlowContext = createContext();
export const useFlow = () => useContext(FlowContext);

function formatTimestampForFilename(date = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  const Y = date.getFullYear();
  const M = pad(date.getMonth() + 1);
  const D = pad(date.getDate());
  const h = pad(date.getHours());
  const m = pad(date.getMinutes());
  const s = pad(date.getSeconds());
  return `${Y}${M}${D}_${h}${m}${s}`;
}

export function FlowProvider({ children }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [id, setId] = useState(1);
  const [selectedNode, setSelectedNode] = useState(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            type: "smoothstep",
            style: { stroke: "#555", strokeWidth: 1.5 },
          },
          eds
        )
      ),
    []
  );

  const addNode = useCallback(
    (type = "DataSourceNode") => {
      const newNode = {
        id: id.toString(),
        type,
        data: { label: `${type.toUpperCase()} ${id}`, signalName: "" },
        position: { x: Math.random() * 500, y: Math.random() * 400 },
      };
      setNodes((nds) => [...nds, newNode]);
      setId((prev) => prev + 1);
    },
    [id]
  );

  const clearNodes = useCallback(() => {
    setNodes([]);
    setEdges([]);
  }, []);

  const removeLastNode = useCallback(() => {
    setNodes((nds) => nds.slice(0, -1));
  }, []);

  const exportFlow = useCallback(() => {
    try {
      const payload = {
        meta: {
          generatedAt: new Date().toISOString(),
          version: "1.0",
        },
        nodes,
        edges,
      };

      const json = JSON.stringify(payload, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const filename = `flow-${formatTimestampForFilename()}.json`;

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();

      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      console.error("Export failed:", err);
    }
  }, [nodes, edges]);

  return (
    <FlowContext.Provider
      value={{
        nodes,
        setNodes,
        edges,
        setEdges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        addNode,
        clearNodes,
        removeLastNode,
        selectedNode,
        setSelectedNode,
        exportFlow,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
}
