// src/flow/FlowToolbar.jsx
import React, { useState } from "react";
import { useFlow } from "../flow/FlowContext";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// category icons
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

export default function FlowToolbar() {
  const { addNode, removeLastNode, exportFlow } = useFlow();
  const [expanded, setExpanded] = useState(false);

  // anchor state keyed by category
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

  const iconButtonStyle = {
    borderRadius: 8,
    padding: 8,
    transition: "all 0.2s ease",
  };

  // menu definitions
  const menuDefs = [
    {
      key: "source",
      icon: <PlayArrowIcon />,
      tooltip: "Source Nodes",
      items: [
        { key: "live_signal_source", label: "LiveSignalSource", icon: <FiberManualRecordIcon /> },
        { key: "historical_signal_source", label: "HistoricalSignalSource", icon: <HistoryIcon /> },
        { key: "synthetic_generator", label: "SyntheticGenerator", icon: <AutoFixHighIcon /> },
        { key: "constants", label: "Constants", icon: <DonutSmallIcon /> },
      ],
    },
    {
      key: "filter",
      icon: <FilterListIcon />,
      tooltip: "Filter / Condition",
      items: [
        { key: "threshold_filter", label: "Threshold Filter", icon: <TuneIcon /> },
        { key: "value_range_filter", label: "Value Range Filter", icon: <FunctionsIcon /> },
        { key: "expression_filter", label: "Expression Filter", icon: <DeviceHubIcon /> },
        { key: "deduplication_filter", label: "Deduplication Filter", icon: <MergeTypeIcon /> },
      ],
    },
    {
      key: "transform",
      icon: <TuneIcon />,
      tooltip: "Transformation",
      items: [
        { key: "map_transform", label: "MapTransform", icon: <AutoFixHighIcon /> },
        { key: "scale_transform", label: "ScaleTransform", icon: <FunctionsIcon /> },
        { key: "aggregate_window", label: "AggregateWindow", icon: <DonutSmallIcon /> },
        { key: "derivative_delta", label: "Derivative/Delta", icon: <FunctionsIcon /> },
        { key: "fft_transform", label: "FFTTransform", icon: <DeviceHubIcon /> },
        { key: "smoothing", label: "Smoothing", icon: <HistoryIcon /> },
      ],
    },
    {
      key: "logic",
      icon: <CallSplitIcon />,
      tooltip: "Logic / Branch",
      items: [
        { key: "if_else", label: "IfElse", icon: <CallSplitIcon /> },
        { key: "switch", label: "Switch", icon: <MergeTypeIcon /> },
        { key: "merge", label: "Merge", icon: <MergeTypeIcon /> },
        { key: "join", label: "Join", icon: <DeviceHubIcon /> },
      ],
    },
    {
      key: "feature",
      icon: <TrendingUpIcon />,
      tooltip: "Feature / Analytics",
      items: [
        { key: "trend_detector", label: "TrendDetector", icon: <TrendingUpIcon /> },
        { key: "event_correlation", label: "Event Correlation", icon: <DeviceHubIcon /> },
        { key: "pattern_matcher", label: "Pattern Matcher", icon: <FunctionsIcon /> },
      ],
    },
    {
      key: "output",
      icon: <CloudUploadIcon />,
      tooltip: "Output / Sink",
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
      }}
    >
      <IconButton
        onClick={() => setExpanded((s) => !s)}
        size="small"
        style={{ ...iconButtonStyle }}
        title={expanded ? "Collapse toolbar" : "Expand toolbar"}
      >
        {expanded ? "«" : "»"}
      </IconButton>

      {menuDefs.map((cat) => (
        <div key={cat.key} style={{ display: "flex", alignItems: "center" }}>
          <Tooltip title={cat.tooltip}>
            <IconButton
              onClick={(e) => openMenu(e, cat.key)}
              size="small"
              style={iconButtonStyle}
            >
              {cat.icon}
              {expanded && <span style={{ marginLeft: 8, fontWeight: 600 }}>{cat.tooltip}</span>}
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchor}
            open={openCategory === cat.key}
            onClose={closeMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
          >
            {cat.items.map((it) => (
              <MenuItem
                key={it.key}
                onClick={() => onAdd(it.key)}
                style={{ minWidth: 220 }}
              >
                <ListItemIcon style={{ minWidth: 36 }}>{it.icon}</ListItemIcon>
                <ListItemText primary={it.label} />
              </MenuItem>
            ))}
          </Menu>
        </div>
      ))}

      <div style={{ flex: 1 }} />

      <Tooltip title="Remove Last Node">
        <IconButton onClick={removeLastNode} size="small" style={iconButtonStyle}>
          <AddCircleOutlineIcon style={{ transform: "rotate(45deg)" }} />
          {expanded && <span style={{ marginLeft: 8 }}>Remove</span>}
        </IconButton>
      </Tooltip>

      <Tooltip title="Export Flow JSON">
        <IconButton onClick={exportFlow} size="small" style={iconButtonStyle}>
          <FileDownloadIcon />
          {expanded && <span style={{ marginLeft: 8 }}>Export</span>}
        </IconButton>
      </Tooltip>
    </div>
  );
}
