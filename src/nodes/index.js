// src/nodes/index.js
import BaseNode from "./BaseNode";
import LiveSignalSourceNode from "./LiveSignalSourceNode";
import ConstantNode from "./ConstantNode";

// map keys -> components
export const nodeTypes = {
  // Source Nodes
  live_signal_source: LiveSignalSourceNode,
  historical_signal_source: BaseNode,
  synthetic_generator: BaseNode,
  constants: ConstantNode,

  // Filter / Condition Nodes
  threshold_filter: BaseNode,
  value_range_filter: BaseNode,
  expression_filter: BaseNode,
  deduplication_filter: BaseNode,

  // Transformation Nodes
  map_transform: BaseNode,
  scale_transform: BaseNode,
  aggregate_window: BaseNode,
  derivative_delta: BaseNode,
  fft_transform: BaseNode,
  smoothing: BaseNode,

  // Logic / Branching
  if_else: BaseNode,
  switch: BaseNode,
  merge: BaseNode,
  join: BaseNode,

  // Feature / Analytics
  trend_detector: BaseNode,
  event_correlation: BaseNode,
  pattern_matcher: BaseNode,

  // Output / Sink
  plotune_sink: BaseNode,
  metric_sink: BaseNode,
  alerts: BaseNode,
  storage: BaseNode,
};

// nodePropertiesConfig: minimal default fields (customize later)
export const nodePropertiesConfig = {
  live_signal_source: [{ key: "signalName", label: "Signal Name", type: "text" }, { key: "description", label: "Description", type: "text" }],
  historical_signal_source: [{ key: "signalName", label: "Signal Name", type: "text" }, { key: "description", label: "Description", type: "text" }],
  synthetic_generator: [{ key: "signalName", label: "Signal Name", type: "text" }, { key: "frequency", label: "Frequency (ms)", type: "text" }],
  constants: [{ key: "signalName", label: "Signal Name", type: "text" }, { key: "constantValue", label: "Constant Value", type: "text" }],

  threshold_filter: [{ key: "threshold", label: "Threshold", type: "text" }],
  value_range_filter: [{ key: "min", label: "Min", type: "text" }, { key: "max", label: "Max", type: "text" }],
  expression_filter: [{ key: "expr", label: "Expression", type: "text" }],
  deduplication_filter: [{ key: "window", label: "Window (ms)", type: "text" }],

  map_transform: [{ key: "mapExpr", label: "Map Expression", type: "text" }],
  scale_transform: [{ key: "scale", label: "Scale Factor", type: "text" }],
  aggregate_window: [{ key: "window", label: "Window (ms)", type: "text" }],
  derivative_delta: [{ key: "period", label: "Period", type: "text" }],
  fft_transform: [{ key: "n", label: "N (samples)", type: "text" }],
  smoothing: [{ key: "method", label: "Method", type: "text" }],

  if_else: [{ key: "condition", label: "Condition", type: "text" }],
  switch: [{ key: "cases", label: "Cases", type: "text" }],
  merge: [{ key: "strategy", label: "Strategy", type: "text" }],
  join: [{ key: "on", label: "Join On", type: "text" }],

  trend_detector: [{ key: "period", label: "Period", type: "text" }],
  event_correlation: [{ key: "window", label: "Window", type: "text" }],
  pattern_matcher: [{ key: "pattern", label: "Pattern", type: "text" }],

  plotune_sink: [{ key: "target", label: "Target", type: "text" }],
  metric_sink: [{ key: "metricName", label: "Metric Name", type: "text" }],
  alerts: [{ key: "alertName", label: "Alert Name", type: "text" }],
  storage: [{ key: "path", label: "Storage Path", type: "text" }],
};
