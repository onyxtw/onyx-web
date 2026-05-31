/**
 * Core type definitions for Project ONYX
 */

export type SiteStatus = 'active' | 'inactive' | 'maintenance' | 'offline';
export type MetricUnit = 'ms' | 'Mbps' | '%' | 'W';

/**
 * Site configuration interface
 */
export interface SiteConfig {
  id: string;
  name: string;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  status: SiteStatus;
  description?: string;
  tags?: string[];
}

/**
 * Real-time metric data point
 */
export interface Metric {
  timestamp: number;
  label: string;
  value: number;
  unit: MetricUnit;
  threshold?: {
    warning: number;
    critical: number;
  };
}

/**
 * 3D Topology node representation
 */
export interface TopologyNode {
  id: string;
  label: string;
  position: [number, number, number];
  siteId?: string;
  color?: string;
  size?: number;
}

/**
 * Connection between topology nodes
 */
export interface TopologyEdge {
  source: string;
  target: string;
  bandwidth?: number;
  latency?: number;
}

/**
 * Topology graph data
 */
export interface TopologyData {
  nodes: TopologyNode[];
  edges: TopologyEdge[];
}

/**
 * Pitch script content
 */
export interface PitchScript {
  language: string;
  title: string;
  sections: PitchSection[];
}

/**
 * Pitch section with timing
 */
export interface PitchSection {
  id: string;
  duration: number;
  title: string;
  subtitle?: string;
  content: string;
  visualMode?: 'topology' | 'metrics' | 'text' | 'slideshow';
}

/**
 * Dashboard state
 */
export interface DashboardState {
  currentSite?: string;
  isPitchMode: boolean;
  isPitchPlaying: boolean;
  currentPitchSection?: number;
  selectedMetrics: string[];
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
}
