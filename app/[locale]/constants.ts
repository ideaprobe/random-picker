// 轮盘颜色配置
export const WHEEL_COLORS = [
  { start: "#FF6B9D", end: "#C44569" },
  { start: "#4FACFE", end: "#00F2FE" },
  { start: "#43E97B", end: "#38F9D7" },
  { start: "#FA709A", end: "#FEE140" },
  { start: "#A8EDEA", end: "#FED6E3" },
  { start: "#FFD89B", end: "#19547B" },
  { start: "#667EEA", end: "#764BA2" },
  { start: "#F093FB", end: "#F5576C" },
  { start: "#4FACFE", end: "#00F2FE" },
  { start: "#30CFD0", end: "#330867" },
  { start: "#A8EDEA", end: "#FED6E3" },
  { start: "#FDBB2D", end: "#22C1C3" },
] as const;

// 轮盘配置
export const WHEEL_CONFIG = {
  MAX_ITEMS: 12,
  MIN_ITEMS: 2,
  SPIN_DURATION: 4000,
  MIN_SPINS: 5,
  MAX_EXTRA_SPINS: 3,
} as const;
