// Best-effort mapping from a free-text color name to a swatch hex, for filter
// UI dots. Falls back to a neutral gray when no keyword matches.
const KEYWORD_HEX: [string, string][] = [
  ["gold", "#cba135"], ["champagne", "#e6d2a8"], ["mustard", "#d4a017"],
  ["yellow", "#eab308"], ["rani pink", "#e0218a"], ["pink", "#ec4899"],
  ["blush", "#f4c2c2"], ["peach", "#ffcba4"], ["coral", "#ff7f50"],
  ["rose gold", "#b76e79"], ["rust", "#b7410e"], ["orange", "#f97316"],
  ["copper", "#b87333"], ["red", "#dc2626"], ["crimson", "#b91c1c"],
  ["maroon", "#7a1f3d"], ["wine", "#722f37"], ["lavender", "#c4a3e8"],
  ["mauve", "#b48ead"], ["lilac", "#c8a2c8"], ["purple", "#7c3aed"],
  ["violet", "#7c3aed"], ["navy", "#1e3a5f"], ["blue", "#2563eb"],
  ["turquoise", "#14b8a6"], ["teal", "#0d9488"], ["sky", "#38bdf8"],
  ["peacock", "#0f766e"], ["sea green", "#2e8b57"], ["emerald", "#10b981"],
  ["mint", "#98d8c8"], ["pistachio", "#93c572"], ["olive", "#708238"],
  ["green", "#16a34a"], ["bottle green", "#0b3d2e"], ["ivory", "#fffff0"],
  ["beige", "#e8dcc4"], ["cream", "#fffdd0"], ["white", "#ffffff"],
  ["black", "#18181b"], ["silver", "#c0c0c0"], ["grey", "#9ca3af"],
  ["gray", "#9ca3af"], ["multicolor", "#a78bfa"],
];

export function guessColorHex(name: string): string {
  const lower = name.toLowerCase();
  for (const [keyword, hex] of KEYWORD_HEX) {
    if (lower.includes(keyword)) return hex;
  }
  return "#a3a3a3";
}
