// src/flow/FlowToolbar.jsx
import React, { useState, useEffect } from "react";
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
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Dark mode icon
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Light mode icon

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
  const [darkMode, setDarkMode] = useState(false);

// Initialize dark mode from system preference
useEffect(() => {
  const isDarkSystem = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedMode = localStorage.getItem('darkMode');
  
  if (savedMode !== null) {
    const isDark = savedMode === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  } else {
    // No saved preference, use system
    setDarkMode(isDarkSystem);
    if (isDarkSystem) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.add('light-mode');
    }
  }
}, []);

// Apply dark mode class to document
useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add('dark-mode');
    document.documentElement.classList.remove('light-mode');
  } else {
    document.documentElement.classList.add('light-mode');
    document.documentElement.classList.remove('dark-mode');
  }
  localStorage.setItem('darkMode', darkMode.toString());
}, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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
        { key: "sum_node", label: "Sum", icon: <AddCircleOutlineIcon /> },
        { key: "multiply_node", label: "Multiply", icon: <CloseIcon /> },
        { key: "divide_node", label: "Divide", icon: <HorizontalRuleIcon /> },
      ],
    },
    {
      key: "logic",
      icon: <CallSplitIcon />,
      tooltip: "Logic",
      items: [
        { key: "if_else", label: "If / Else", icon: <CallSplitIcon /> },
      ],
    },
    {
      key: "output",
      icon: <CloudUploadIcon />,
      tooltip: "Output",
      items: [
        { key: "plotune_sink", label: "Plotune Sink", icon: <CloudUploadIcon /> },
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
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        boxShadow: "var(--shadow-sm)",
        position: "relative",
        zIndex: 15,
        fontFamily: "var(--font-sans)",
        overflowX: "auto",
        color: "var(--text)",
      }}
    >
      {/* Logo */}
      <a
        href="https://plotune.net"
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
            boxShadow: "var(--shadow-sm)",
            hightQuality: "high",
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
          color: "var(--text)",
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
          gap: expanded ? 4 : 0,
          marginRight: 4,
          padding: expanded ? "6px 4px" : "0px",
          minWidth: expanded ? 56 : "auto",
        };

        const labelStyle = {
          fontSize: 11,
          fontWeight: 500,
          marginTop: 4,
          textAlign: "center",
          whiteSpace: "nowrap",
          color: "var(--subtext)",
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
                  minWidth: expanded ? 36 : 24,
                  minHeight: expanded ? 36 : 24,
                  boxShadow: expanded ? "var(--shadow-sm)" : "none",
                  color: "var(--text)",
                  backgroundColor: expanded ? "var(--glass)" : "transparent",
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
              PaperProps={{
                style: {
                  backgroundColor: 'var(--surface)',
                  color: 'var(--text)',
                  backgroundImage: 'none',
                }
              }}
            >
              {cat.items.map((it) => (
                <MenuItem 
                  key={it.key} 
                  onClick={() => onAdd(it.key)} 
                  style={{ 
                    minWidth: 220,
                    color: 'var(--text)',
                  }}
                >
                  <ListItemIcon style={{ minWidth: 36, color: 'var(--text)' }}>
                    {it.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={it.label} 
                    primaryTypographyProps={{ style: { color: 'var(--text)' } }}
                  />
                </MenuItem>
              ))}
            </Menu>
          </div>
        );
      })}

      <div style={{ flex: 1 }} />

      {/* Dark Mode Toggle */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <Tooltip title={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
          <IconButton
            onClick={toggleDarkMode}
            size="small"
            style={{ 
              ...iconButtonBase, 
              minWidth: 36, 
              minHeight: 36,
              color: "var(--text)",
            }}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
        {expanded && (
          <div style={{ fontSize: 12, opacity: 0.9, color: "var(--subtext)" }}>
            {darkMode ? "Light" : "Dark"}
          </div>
        )}
      </div>

      {/* Right side controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Clear */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          <Tooltip title="Clear All">
            <IconButton
              onClick={() => {
                if (window.confirm("Clear all nodes and edges?")) clearNodes();
              }}
              size="small"
              style={{ 
                ...iconButtonBase, 
                minWidth: 36, 
                minHeight: 36,
                color: "var(--text)",
              }}
            >
              <AddCircleOutlineIcon style={{ transform: "rotate(45deg)" }} />
            </IconButton>
          </Tooltip>
          {expanded && <div style={{ fontSize: 12, opacity: 0.9, color: "var(--subtext)" }}>Clear</div>}
        </div>

        {/* Load */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <Tooltip title="Load Flow JSON">
            <IconButton
              component="label"
              size="small"
              style={{ 
                ...iconButtonBase, 
                minWidth: 36, 
                minHeight: 36,
                color: "var(--text)",
              }}
            >
              <input type="file" accept=".json" hidden onChange={handleLoad} />
              <FileDownloadIcon style={{ transform: "rotate(180deg)" }} />
            </IconButton>
          </Tooltip>
          {expanded && <div style={{ fontSize: 12, opacity: 0.9, color: "var(--subtext)" }}>Load</div>}
        </div>

        {/* Export */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <Tooltip title="Export Flow JSON">
            <IconButton
              onClick={exportFlow}
              size="small"
              style={{ 
                ...iconButtonBase, 
                minWidth: 36, 
                minHeight: 36,
                color: "var(--text)",
              }}
            >
              <FileDownloadIcon />
            </IconButton>
          </Tooltip>
          {expanded && <div style={{ fontSize: 12, opacity: 0.9, color: "var(--subtext)" }}>Export</div>}
        </div>
      </div>
    </div>
  );
}