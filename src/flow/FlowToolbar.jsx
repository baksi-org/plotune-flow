// src/flow/FlowToolbar.jsx
import React, { useState } from "react";
import { useFlow } from "../flow/FlowContext";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// icons
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FilterListIcon from "@mui/icons-material/FilterList";
import TuneIcon from "@mui/icons-material/Tune";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HistoryIcon from "@mui/icons-material/History";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FunctionsIcon from "@mui/icons-material/Functions";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";


import logoImg from "../assets/logo.png";

export default function FlowToolbar() {
  const {
    addNode,
    clearNodes,
    exportFlow,
    setNodes,
    setEdges,
  } = useFlow();
  const [expanded, setExpanded] = useState(false);

  const [anchor, setAnchor] = useState(null);
  const [openCategory, setOpenCategory] = useState(null);

  const openMenu = (event, category) => {
    setAnchor(event.currentTarget);
    setOpenCategory(category);
  };
  const closeMenu = () => {
    setAnchor(null);
    setOpenCategory(null);
  };

  const onAdd = (typeKey) => {
    addNode(typeKey);
    closeMenu();
  };
  const handleLoad = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target.result);
        if (json.nodes && json.edges) {
          setNodes(json.nodes);
          setEdges(json.edges);
          console.log("✅ Flow loaded successfully");
        } else {
          alert("Invalid flow JSON format.");
        }
      } catch (err) {
        alert("Failed to parse JSON file.");
        console.error(err);
      }
    };
    reader.readAsText(file);
  };
  const iconButtonBase = {
    borderRadius: 8,
    padding: 8,
    transition: "all 0.18s ease",
  };

  const menuDefs = [
    {
      key: "source",
      icon: <PlayArrowIcon />,
      tooltip: "Source",
      items: [
        { key: "live_signal_source", label: "Live Signal", icon: <FiberManualRecordIcon /> },
        { key: "synthetic_generator", label: "Synthetic", icon: <AutoFixHighIcon /> },
        { key: "constants", label: "Constants", icon: <DonutSmallIcon /> },
      ],
    },
    {
      key: "filter",
      icon: <FilterListIcon />,
      tooltip: "Filter",
      items: [
        { key: "threshold_filter", label: "Threshold", icon: <TuneIcon /> },
        { key: "value_range_filter", label: "Value Range", icon: <FunctionsIcon /> },
        { key: "expression_filter", label: "Expression", icon: <DeviceHubIcon /> },
        { key: "deduplication_filter", label: "Deduplication", icon: <MergeTypeIcon /> },
      ],
    },
    {
      key: "transform",
      icon: <TuneIcon />,
      tooltip: "Transform",
      items: [
        { key: "map_transform", label: "Map", icon: <AutoFixHighIcon /> },
        { key: "scale_transform", label: "Scale", icon: <FunctionsIcon /> },
        { key: "aggregate_window", label: "Aggregate", icon: <DonutSmallIcon /> },
        { key: "derivative_delta", label: "Derivative", icon: <FunctionsIcon /> },
        { key: "fft_transform", label: "FFT", icon: <DeviceHubIcon /> },
        { key: "smoothing", label: "Smoothing", icon: <HistoryIcon /> },
      ],
    },
    {
      key: "math",
      icon: <FunctionsIcon />,
      tooltip: "Math",
      items: [
        { key: "sum", label: "Sum", icon: <AddCircleOutlineIcon /> },
        { key: "subtract", label: "Subtract", icon: <RemoveIcon /> },
        { key: "multiply", label: "Multiply", icon: <CloseIcon /> },
        { key: "divide", label: "Divide", icon: <HorizontalRuleIcon /> },
      ],
    },
    {
      key: "logic",
      icon: <CallSplitIcon />,
      tooltip: "Logic",
      items: [
        { key: "if_else", label: "If / Else", icon: <CallSplitIcon /> },
        { key: "switch", label: "Switch", icon: <MergeTypeIcon /> },
        { key: "merge", label: "Merge", icon: <MergeTypeIcon /> },
        { key: "join", label: "Join", icon: <DeviceHubIcon /> },
      ],
    },
    {
      key: "feature",
      icon: <TrendingUpIcon />,
      tooltip: "Feature",
      items: [
        { key: "trend_detector", label: "Trend", icon: <TrendingUpIcon /> },
        { key: "event_correlation", label: "Correlation", icon: <DeviceHubIcon /> },
        { key: "pattern_matcher", label: "Pattern", icon: <FunctionsIcon /> },
      ],
    },
    {
      key: "output",
      icon: <CloudUploadIcon />,
      tooltip: "Output",
      items: [
        { key: "plotune_sink", label: "Plotune Sink", icon: <CloudUploadIcon /> },
        { key: "metric_sink", label: "Metric Sink", icon: <DonutSmallIcon /> },
        { key: "alerts", label: "Alerts", icon: <FiberManualRecordIcon /> },
        { key: "storage", label: "Storage", icon: <HistoryIcon /> },
      ],
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "8px 12px",
        gap: 8,
        borderBottom: "1px solid #e1e4eb",
        background: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        position: "relative",
        zIndex: 15,
        fontFamily: "Roboto, sans-serif",
        overflowX: "auto",
      }}
    >
      {/* Logo */}
      <a
        href="https://plotune.net"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        <img
          src={logoImg}
          alt="Plotune"
          style={{
            width: expanded ? 48 : 36,
            height: expanded ? 48 : 36,
            borderRadius: 18,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(6,18,40,0.06)",
          }}
        />
      </a>

      <IconButton
        onClick={() => setExpanded((s) => !s)}
        size="small"
        style={{
          ...iconButtonBase,
          minWidth: 36,
          minHeight: 36,
        }}
        title={expanded ? "Collapse toolbar" : "Expand toolbar"}
      >
        {expanded ? "«" : "»"}
      </IconButton>

      {menuDefs.map((cat) => {
        const containerStyle = {
          display: "flex",
          flexDirection: expanded ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          gap: expanded ? 6 : 0,
          marginRight: 8,
          padding: expanded ? "6px 4px" : "0px",
          minWidth: expanded ? 56 : "auto",
        };

        const labelStyle = {
          fontSize: 11,
          fontWeight: 500,
          marginTop: 4,
          textAlign: "center",
          whiteSpace: "nowrap",
          color: "#263238",
          opacity: 0.9,
          maxWidth: 72,
          overflow: "hidden",
          textOverflow: "ellipsis",
        };

        return (
          <div key={cat.key} style={containerStyle}>
            <Tooltip title={cat.tooltip}>
              <IconButton
                onClick={(e) => openMenu(e, cat.key)}
                size="small"
                style={{
                  ...iconButtonBase,
                  minWidth: expanded ? 44 : 36,
                  minHeight: expanded ? 44 : 36,
                  boxShadow: expanded ? "0 2px 6px rgba(16,24,40,0.04)" : "none",
                }}
              >
                {cat.icon}
              </IconButton>
            </Tooltip>

            {expanded && <div style={labelStyle}>{cat.tooltip}</div>}

            <Menu
              anchorEl={anchor}
              open={openCategory === cat.key}
              onClose={closeMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              {cat.items.map((it) => (
                <MenuItem key={it.key} onClick={() => onAdd(it.key)} style={{ minWidth: 220 }}>
                  <ListItemIcon style={{ minWidth: 36 }}>{it.icon}</ListItemIcon>
                  <ListItemText primary={it.label} />
                </MenuItem>
              ))}
            </Menu>
          </div>
        );
      })}

      <div style={{ flex: 1 }} />

      <Tooltip title="Clear All">
        <IconButton
          onClick={() => {
            if (window.confirm("Clear all nodes and edges?")) clearNodes();
          }}
          size="small"
          style={{ ...iconButtonBase, minWidth: 36, minHeight: 36 }}
        >
          <AddCircleOutlineIcon style={{ transform: "rotate(45deg)" }} />
        </IconButton>
      </Tooltip>
      {expanded && <div style={{ marginLeft: 8, fontSize: 12, opacity: 0.9 }}>Clear</div>}
      
      <Tooltip title="Load Flow JSON">
        <IconButton
          component="label"
          size="small"
          style={{ ...iconButtonBase, minWidth: 36, minHeight: 36, marginLeft: 12 }}
        >
          <input type="file" accept=".json" hidden onChange={handleLoad} />
          <FileDownloadIcon style={{ transform: "rotate(180deg)" }} />
        </IconButton>
      </Tooltip>
      {expanded && <div style={{ marginLeft: 8, fontSize: 12, opacity: 0.9 }}>Load</div>}

      <Tooltip title="Export Flow JSON">
        <IconButton onClick={exportFlow} size="small" style={{ ...iconButtonBase, minWidth: 36, minHeight: 36, marginLeft: 12 }}>
          <FileDownloadIcon />
        </IconButton>
      </Tooltip>
      {expanded && <div style={{ marginLeft: 8, fontSize: 12, opacity: 0.9 }}>Export</div>}
    </div>
  );
}
