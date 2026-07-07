// Colors sourced from the dataviz skill's validated reference palette
// (references/palette.md), re-validated against our white admin surface
// (`node scripts/validate_palette.js "#2a78d6,#1baf7a,#eda100,#008300"
// --mode light --surface "#ffffff"` -> all checks pass, 2 slots need direct
// labels per the relief rule -- charts below always pair color with a label).
// Kept separate from the maroon/gold brand chrome per the skill's guidance:
// chart series identity should not double as brand color.

export const CATEGORICAL = {
  blue: "#2a78d6",
  aqua: "#1baf7a",
  yellow: "#eda100",
  green: "#008300",
  violet: "#4a3aa7",
  red: "#e34948",
  magenta: "#e87ba4",
  orange: "#eb6834",
} as const;

export const CATEGORICAL_ORDER = [
  CATEGORICAL.blue,
  CATEGORICAL.aqua,
  CATEGORICAL.yellow,
  CATEGORICAL.green,
  CATEGORICAL.violet,
  CATEGORICAL.red,
  CATEGORICAL.magenta,
  CATEGORICAL.orange,
];

// Sequential blue ramp, light -> dark (magnitude-only encodings: single-series bars).
export const SEQUENTIAL_BLUE = {
  100: "#cde2fb",
  200: "#9ec5f4",
  300: "#6da7ec",
  400: "#3987e5",
  450: "#2a78d6",
  500: "#256abf",
  600: "#184f95",
  700: "#0d366b",
};

export const CHART_CHROME = {
  surface: "#ffffff",
  gridline: "#e1e0d9",
  axis: "#c3c2b7",
  primaryInk: "#0b0b0b",
  secondaryInk: "#52514e",
  mutedInk: "#898781",
};

export const STATUS = {
  good: "#0ca30c",
  warning: "#fab219",
  serious: "#ec835a",
  critical: "#d03b3b",
};
