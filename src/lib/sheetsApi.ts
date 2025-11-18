// Use environment variable for production backend URL, or '/api' for local development
// In production, use full URL. In local dev, use '/api' which proxies to localhost:3001
const API_BASE = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

export interface MainDashboardData {
  overallRate: number;
  overallChange: number;
  competitors: Array<{ name: string; rate: number }>;
  chartData: Array<{ day: string; user: number; competitor: number }>;
}

export interface CategoryData {
  metadata: {
    brandvisibility?: string;
    brandvisibilitychange?: string;
    keywords?: string;
    linksclicked?: string;
    homedepottotal?: string;
    lowestotal?: string;
  };
  competitorData: Array<{ name: string; value: number; color: string }>;
  phrases: Array<{ phrase: string; userVisibility: number; competitorVisibility: number }>;
}

export interface MetricsData {
  'Metric Name': string;
  Value: number;
}

export async function fetchMainDashboard(): Promise<MainDashboardData> {
  const response = await fetch(`${API_BASE}/main-dashboard`);
  if (!response.ok) throw new Error('Failed to fetch main dashboard');
  return response.json();
}

export async function fetchCompetitors() {
  const response = await fetch(`${API_BASE}/competitors`);
  if (!response.ok) throw new Error('Failed to fetch competitors');
  const result = await response.json();
  return result.data;
}

export async function fetchCategory(categoryName: string): Promise<CategoryData> {
  const response = await fetch(`${API_BASE}/category/${encodeURIComponent(categoryName)}`);
  if (!response.ok) throw new Error(`Failed to fetch category: ${categoryName}`);
  return response.json();
}

export async function fetchMetrics(): Promise<MetricsData[]> {
  const response = await fetch(`${API_BASE}/metrics`);
  if (!response.ok) throw new Error('Failed to fetch metrics');
  const result = await response.json();
  return result.data;
}

