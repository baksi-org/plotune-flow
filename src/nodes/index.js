// src/nodes/index.js
import BaseNode from "./BaseNode";
import LiveSignalSourceNode from "./LiveSignalSourceNode";
import SyntheticGeneratorNode from "./SyntheticGeneratorNode";
import ConstantsNode from "./ConstantsNode";
import ThresholdNode from "./ThresholdNode";
import ValueRangeFilterNode from "./ValueRangeFilterNode";
import ExpressionNode from "./ExpressionNode";
import PlotuneSinkNode from "./PlotuneSinkNode";

// map keys -> components
export const nodeTypes = {
  // Source Nodes
  live_signal_source: LiveSignalSourceNode,
  historical_signal_source: BaseNode,
  synthetic_generator: SyntheticGeneratorNode,
  constants: ConstantsNode,

  // Filter / Condition Nodes
  threshold_filter: ThresholdNode,
  value_range_filter: ValueRangeFilterNode,
  expression_filter: ExpressionNode,
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
  plotune_sink: PlotuneSinkNode,
  metric_sink: BaseNode,
  alerts: BaseNode,
  storage: BaseNode,
};

// nodePropertiesConfig: minimal default fields (customize later)
export const nodePropertiesConfig = {
  live_signal_source: [
    { key: "signalName", label: "Signal Name", type: "text" }, 
    { key: "description", label: "Description", type: "text" }],
  historical_signal_source: [
    { key: "signalName", label: "Signal Name", type: "text" }, 
    { key: "description", label: "Description", type: "text" }],
  synthetic_generator: [
    { key: "label", label: "Signal Label", type: "text" }, 
    { key: "description", label: "Description", type: "text" }, 
    { key: "waveformType", label: "Waveform Type", type: "select", options: ["sine", "square", "triangle", "sawtooth", "noise"] },
    { key: "frequency", label: "Frequency (Hz)", type: "number" },
    { key: "amplitude", label: "Amplitude", type: "number" },
    { key: "offset", label: "DC Offset", type: "number" },
    { key: "phase", label: "Phase (deg)", type: "number" },
    { key: "noiseLevel", label: "Noise Level (%)", type: "number" },
    { key: "sampleRate", label: "Sample Rate (Hz)", type: "number" },
    { key: "duration", label: "Duration (s)", type: "number" },
  ],
  constants: [
    { key: "label", label: "Label Name", type: "text" },  
    { key: "description", label: "Description", type: "text" },
    { key: "constantValue", label: "Value", type: "text" }],

  threshold_filter: [
    { key: "label", label: "Label Name", type: "text" },
    { key: "threshold", label: "Threshold", type: "number" }],
  value_range_filter: [
    { key: "label", label: "Label Name", type: "text" },
    { key: "description", label: "Description", type: "text" },
    { key: "min", label: "Min", type: "number" }, 
    { key: "max", label: "Max", type: "number" },
    { key: "inclusive", label: "Inclusive", type: "checkbox"},
    { key: "exclude", label: "Exclude", type: "checkbox"},
    { key: "action", label: "Action", type: "select", options: ["pass", "limit", "block"] }
  ],
  expression_filter: [
    { key: "signalName", label: "Signal Name", type: "text" },
    { key: "description", label: "Description", type: "text" },
    { key: "expr", label: "Expression", type: "text" }],
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

  plotune_sink: [
    { key: "description", label: "Description", type: "text"},
    { key: "targetType", label: "Target Type", type: "select", options: ["local", "remote"] },
    { key: "ip", label: "IP Address", type: "text" },
    { key: "port", label: "Port", type: "number" }
  ],
  metric_sink: [{ key: "metricName", label: "Metric Name", type: "text" }],
  alerts: [{ key: "alertName", label: "Alert Name", type: "text" }],
  storage: [{ key: "path", label: "Storage Path", type: "text" }],
};
