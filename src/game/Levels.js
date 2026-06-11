export const LEVELS = {
  1: { world: 'candy', tier: 1, targets: { stars1: 200, stars2: 400, stars3: 700 }, preFill: [] },
  2: { world: 'candy', tier: 1, targets: { stars1: 300, stars2: 500, stars3: 800 }, preFill: [] },
  11: { world: 'candy', tier: 1, targets: { stars1: 500, stars2: 800, stars3: 1200 }, preFill: [], unlockHolder: true },
  12: { world: 'candy', tier: 1, targets: { stars1: 600, stars2: 1000, stars3: 1500 }, preFill: [{ r: 0, c: 0, color: '#FF6B9D' }, { r: 0, c: 1, color: '#FF6B9D' }] }
};
for (let i = 3; i <= 80; i++) {
  if (LEVELS[i]) continue;
  const world = i <= 15 ? 'candy' : i <= 30 ? 'ocean' : i <= 45 ? 'jungle' : i <= 60 ? 'space' : 'rainbow';
  const tier = i <= 15 ? 1 : i <= 30 ? 2 : i <= 45 ? 3 : 4;
  LEVELS[i] = { world, tier, targets: { stars1: i * 100, stars2: i * 200, stars3: i * 350 }, preFill: [] };
}
