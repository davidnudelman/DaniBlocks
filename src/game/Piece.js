export const PIECES = {
  pebble: { cells: [[0, 0]], name: "Pebble", tier: 1 },
  dominoH: { cells: [[0, 0], [0, 1]], name: "Domino H", tier: 1 },
  dominoV: { cells: [[0, 0], [1, 0]], name: "Domino V", tier: 1 },
  stripe3H: { cells: [[0, 0], [0, 1], [0, 2]], name: "Stripe H", tier: 1 },
  stripe3V: { cells: [[0, 0], [1, 0], [2, 0]], name: "Stripe V", tier: 1 },
  block: { cells: [[0, 0], [0, 1], [1, 0], [1, 1]], name: "Block", tier: 1 },
  lLeft: { cells: [[0, 0], [1, 0], [2, 0], [2, 1]], name: "L-shape Left", tier: 2 },
  lRight: { cells: [[0, 0], [1, 0], [2, 0], [2, -1]], name: "L-shape Right", tier: 2 },
  iH: { cells: [[0, 0], [0, 1], [0, 2], [0, 3]], name: "I-shape H", tier: 2 },
  iV: { cells: [[0, 0], [1, 0], [2, 0], [3, 0]], name: "I-shape V", tier: 2 },
  sShape: { cells: [[0, 0], [0, 1], [-1, 1], [-1, 2]], name: "S-shape", tier: 2 },
  zShape: { cells: [[0, 0], [0, 1], [1, 1], [1, 2]], name: "Z-shape", tier: 2 },
  tShape: { cells: [[0, 0], [0, 1], [0, 2], [1, 1]], name: "T-shape", tier: 2 }
};
export const TIER_POOLS = {
  1: ["pebble", "dominoH", "dominoV", "stripe3H", "stripe3V", "block"],
  2: ["pebble", "dominoH", "dominoV", "stripe3H", "stripe3V", "block", "lLeft", "lRight", "iH", "iV", "sShape", "zShape", "tShape"]
};
