# DaniBlocks — Game Design Document
### A Kid-Friendly Block Puzzle Game
---

## 1. Overview

**Genre:** Casual Block Puzzle  
**Target Audience:** Ages 5–12 (accessible to all ages)  
**Platform:** Browser-based (HTML5 / JavaScript / Canvas or DOM-based rendering)  
**Technology Stack:** Vanilla JS + HTML5 Canvas OR React + Tailwind CSS (either works; prefer React for component reusability)  
**Art Direction:** Chunky, rounded shapes. Bright but not neon. Think pastel candy store, not laser tag.

**Elevator Pitch:**  
A drag-and-drop block puzzle game where kids place colorful animal-themed blocks onto a grid, clear full rows and columns, and earn stars to unlock new worlds. No timers. No stress. Just satisfying snaps, fun sounds, and cheerful characters.

---

## 2. Reference Games Analyzed

| Game | Key Takeaway |
|---|---|
| **Block Blast** | 8×8 grid, 3 pieces at a time, no rotation, survival mode, combo scoring |
| **Block Puzzle Brain Test** | 10×10 grid, drag-and-drop, holder mechanic, rotation power-up, endless with high score |
| **Tetris Block Party** | Tetromino shapes, party/social skin, drag-and-drop (no falling), colorful cartoony aesthetic |

**What we're keeping:** drag-and-drop placement, row/column clearing, piece queue of 3, satisfying combo animations.  
**What we're skipping:** microtransactions, ads, time pressure, anything stressful.  
**What we're adding:** level-based structure, star ratings, themed worlds, a mascot character, encouraging feedback, undo button for kids.

---

## 3. Core Mechanics

### 3.1 The Grid
- **Default size:** 8×8 cells
- Each cell is a square that can be either empty or filled with a colored block
- Grid has rounded corners and a soft drop-shadow background
- Cells show a faint grid line so kids can see where pieces will go

### 3.2 The Piece Queue
- 3 pieces are displayed in a "tray" below (or beside) the grid
- Each piece is a **polyomino** — a shape made of connected squares (see Section 5 for full shape library)
- Pieces sit in fixed slots labeled with small icons (Star 1, Star 2, Star 3)
- When all 3 pieces are placed, 3 new pieces appear automatically
- Pieces are randomly selected from a shape pool filtered by the current difficulty tier

### 3.3 Drag-and-Drop Placement
- Player clicks/taps a piece and drags it onto the grid
- A **ghost preview** shows where the piece will land as the player hovers
- Ghost is green = valid placement. Ghost is red/faded = invalid
- Piece **snaps** to the nearest valid grid position on release
- No rotation (keeping it simple for kids; rotation is an optional power-up at higher levels)
- On mobile: touch drag with finger; on desktop: mouse drag

### 3.4 Line Clearing
- When any **full row** (all 8 cells in a row filled) is completed, it clears with an animation
- When any **full column** (all 8 cells in a column filled) is completed, it clears with an animation
- Both rows and columns can clear simultaneously from a single placement
- Cleared cells burst into stars/confetti particles
- Points are awarded based on lines cleared (see Section 6 — Scoring)

### 3.5 Combos
- Clearing **2 lines at once** = Combo x2 — triggers "Nice!" callout from mascot
- Clearing **3 lines at once** = Combo x3 — triggers "Amazing!" callout + screen shake
- Clearing **4+ lines at once** = Combo x4 — triggers "LEGENDARY!" callout + big particle explosion
- Combo multipliers stack within a single turn (one placement that clears multiple lines)

### 3.6 Game Over Condition
- After placing a piece, if **none of the remaining pieces in the queue can fit anywhere** on the grid, the game is over
- Game over screen is friendly — mascot looks sad, not scary
- Shows: stars earned, score, and an encouraging "Try Again?" button
- Optional: one free **Rescue** (undo last 3 moves) per level, earnable by watching a short animation (no real ads — just a fun little in-game animation of the mascot doing something silly)

### 3.7 Undo Button
- Kids get **3 undos per level** (displayed as small heart icons)
- Undo reverses the last piece placement, restoring the grid and piece to hand
- Once 3 undos are used, the button grays out
- Visual: small backwards arrow button near the grid, always visible

### 3.8 Holder Slot (Unlocks at Level 11)
- One "Holder" slot beside the tray
- Player can drag any piece into the Holder to save it for later
- Can only swap in/out once per turn (prevents infinite cycling)
- Holder slot has a small lock icon that shows when it's been used this turn
- Visual: looks like a little treasure chest or gift box

---

## 4. Game Structure — Levels & Worlds

### 4.1 Level Format
Each level is defined by:
- **World theme** (see 4.2)
- **Piece pool** (which shapes can appear — filtered by difficulty tier)
- **Target score** for 1, 2, and 3 stars
- **Board pre-fill** (some cells are pre-filled with fixed colored blocks that cannot be cleared without completing the line they're in)
- **Special objective** (optional — e.g., "Clear at least 2 combos," "Score 1000 points")

### 4.2 Worlds

| World | Levels | Theme | Color Palette | Mascot Mood |
|---|---|---|---|---|
| **Candy Land** | 1–15 | Sweets, cupcakes, lollipops | Pinks, yellows, light purples | Bouncy & excitable |
| **Ocean Reef** | 16–30 | Fish, coral, bubbles | Teals, blues, corals | Calm & curious |
| **Jungle Jump** | 31–45 | Leaves, animals, vines | Greens, oranges, browns | Adventurous |
| **Space Station** | 46–60 | Stars, planets, rockets | Dark blues, purples, golds | Wide-eyed & amazed |
| **Rainbow Mountain** | 61–80 | Clouds, rainbows, gems | All colors, bright | Pure joy |

Each world has:
- A unique **background image/pattern**
- Unique **block color palette** (pieces use world colors)
- Unique **clear animation** (candy explodes → bubbles pop → leaves flutter → stars burst → gems sparkle)
- A **world unlock screen** with a short 3-second celebration animation when first entering

### 4.3 Difficulty Tiers

#### Tier 1 — "Cozy" (Levels 1–15)
- Grid: 8×8
- Piece pool: Only small shapes (1×1, 1×2, 2×1, 1×3, 2×2 square, L-shape small)
- Board pre-fill: None, or 1–2 "helper" filled cells that make the first line obvious
- Target score: Very forgiving — 1 star at 200 pts, 2 stars at 500 pts, 3 stars at 900 pts
- Undo: 3 per level
- Special objectives: None in levels 1–5; simple objectives from 6–15
- First 5 levels have a **guided tutorial** showing which piece to drag and where

#### Tier 2 — "Warming Up" (Levels 16–30)
- Grid: 8×8
- Piece pool: All Tier 1 shapes + L-shapes, S-shapes, T-shapes (standard tetrominoes)
- Board pre-fill: 2–4 fixed cells, creating partial rows/columns for the kid to complete
- Target score: Moderate — 3 stars requires 1–2 combos
- Undo: 3 per level
- Holder slot: Unlocked at level 11
- Special objectives introduced: "Clear 3 rows," "Get a Combo," "Use the Holder once"

#### Tier 3 — "Getting Good" (Levels 31–45)
- Grid: 8×8
- Piece pool: All Tier 2 shapes + pentominoes (5-cell shapes), 1×5, 3×2 rectangle
- Board pre-fill: 4–8 fixed cells creating challenging partial patterns
- Target score: Requires multi-line clears for 3 stars
- Undo: 2 per level
- Special objectives: "Clear 5 rows total," "Get 2 Combos," "Clear a row using the Holder piece"

#### Tier 4 — "Pro Puzzler" (Levels 46–60)
- Grid: 8×8 (or optionally 10×10 for final 5 levels)
- Piece pool: All shapes, including larger irregular pieces
- Board pre-fill: 6–12 fixed cells, requiring planning
- Target score: Demanding — 3 stars requires strategic play
- Undo: 1 per level
- Special objectives: Multiple objectives per level, e.g., "Score 2000 pts AND get 3 Combos"

#### Tier 5 — "Legendary" (Levels 61–80)
- Grid: 10×10
- Piece pool: Full shape library including complex 6-cell shapes
- Board pre-fill: 10–16 fixed cells, sometimes creating a visual pattern or image
- Target score: Challenging but still completable for dedicated kids
- Undo: 1 per level
- Special objectives: "Complete without using Undo," "Clear the board to 20% or less filled"

---

## 5. Piece Library

All pieces are defined by their cell coordinates relative to a bounding box. No rotation required — pieces can be shown in one fixed orientation.

### Small Shapes (Tier 1 Pool)
```
[ ] — 1×1 single cell (the "Pebble")

[ ][ ] — 1×2 horizontal ("Domino H")
[ ]
[ ] — 2×1 vertical ("Domino V")

[ ][ ][ ] — 1×3 ("Stripe H")
[ ]
[ ]
[ ] — 3×1 ("Stripe V")

[ ][ ]
[ ][ ] — 2×2 square ("Block")
```

### Medium Shapes (Tier 2 Pool — Tetrominoes)
```
[ ][ ]
[ ]
[ ] — L-shape (4 cells, L-left)

   [ ][ ]
      [ ]
      [ ] — L-shape (4 cells, L-right)

[ ][ ][ ][ ] — I-shape H (4 cells)

[ ]
[ ]
[ ]
[ ] — I-shape V (4 cells)

[ ][ ]
   [ ][ ] — S-shape

   [ ][ ]
[ ][ ]     — Z-shape

[ ][ ][ ]
   [ ]     — T-shape
```

### Large Shapes (Tier 3+ Pool — Pentominoes & Bigger)
```
[ ][ ][ ][ ][ ] — I-5 horizontal
[ ][ ][ ]
[ ][ ]         — 2×3 L big
[ ][ ][ ]
   [ ][ ]       — 3×2 S big
[ ]
[ ][ ][ ]
      [ ]       — Z-big
[ ][ ][ ]
[ ][ ][ ]       — 2×3 full rectangle
```

**Naming convention in code:** All pieces stored as arrays of `[row, col]` offsets from anchor cell `[0,0]`.  
**Example:** L-shape = `[[0,0],[1,0],[2,0],[2,1]]`

---

## 6. Scoring System

### Base Points
| Event | Points |
|---|---|
| Place a piece (any) | 10 pts |
| Clear 1 row OR 1 column | 100 pts |
| Clear 2 lines (same placement) | 250 pts |
| Clear 3 lines (same placement) | 500 pts |
| Clear 4+ lines (same placement) | 1000 pts |
| Use Holder strategically (clear on next turn) | +50 bonus |

### Star Thresholds
Each level has custom thresholds, but the general formula:
- ⭐ 1 Star = Clear the board without game-over (just keep playing until 3 new pieces can't be placed)
- ⭐⭐ 2 Stars = Reach the level's 2-star score target
- ⭐⭐⭐ 3 Stars = Reach the level's 3-star score target (requires combos in most levels)

### Score Display
- Large, friendly number in top-center of screen
- When points are earned, a floating "+100!" animation rises from where the line cleared
- Current stars earned shown in real-time (stars light up as thresholds are crossed)

---

## 7. Characters & Mascot

### Main Mascot: "Blocky"
- A small, round-cornered cube character with big eyes and tiny arms
- Color changes with each world (pink in Candy Land, blue in Ocean, green in Jungle, etc.)
- Appears in the corner of the screen and reacts to gameplay:
  - **Idle:** bobs gently up and down
  - **Piece placed:** quick approving nod
  - **Line cleared:** jumps with excitement, simple bounce animation
  - **Combo:** Blocky spins and shoots tiny stars
  - **Game over:** droops, gives a small shrug, then perks back up immediately
  - **3 stars earned:** Blocky does a happy dance (wiggle + sparkles)

### Blocky's Speech Bubbles
- Brief, cheerful, text-only callouts appear for 1.5 seconds
- Examples: "Nice one!", "You're on fire!", "Almost there!", "Keep going!", "Wow, a combo!", "You got this!"
- Never negative — even on game over: "Oops! Give it another shot!"

---

## 8. Visual Design

### Grid & Board
- Cells: 48×48px desktop, 40×40px mobile
- Cell border: 1px, color slightly darker than background, rounded corners (4px radius)
- Empty cell: light off-white or very light version of world color
- Filled cell: vibrant piece color with a small top-left highlight and bottom-right shadow (give it a soft 3D feel)
- Grid container: rounded (12px), soft drop-shadow, world-colored border

### Pieces in Tray
- Each piece displayed in a bounding box, centered
- Slightly bounces when it appears (spring animation, 200ms)
- Lifts slightly (scale 1.05) and casts a shadow when picked up for dragging

### Animations Required
| Animation | Description |
|---|---|
| Line clear | Cells flash white, then burst into 12 confetti particles upward |
| Combo text | "+COMBO x2!" banner slides in from top, fades out after 1.5s |
| Piece snap | Quick scale pulse (1.0 → 1.05 → 1.0, 100ms) when placed |
| Star earn | Star icon fills with golden color + shine sweep |
| Level complete | Blocky dances, stars rain from top, "Level Complete!" card slides in |
| World unlock | Animated banner with world theme art, 3-second cutscene |
| Game over | Board dims, game-over card fades in with Blocky's sad-but-hopeful expression |

### Typography
- Font: **Fredoka One** or **Nunito** (Google Fonts) — rounded, friendly, legible for kids
- Score: Large, bold, drop-shadowed
- Buttons: Rounded pill shape, high contrast, large hit targets (minimum 44×44px)
- All text in sentence case, friendly tone

### Color Palette (Candy Land World — Default/First World)
```
Background:     #FFF0F5  (very light pink)
Grid BG:        #FFE4EE
Piece colors:   #FF6B9D (pink), #FFC947 (yellow), #A8E6CF (mint), #FF8B94 (coral), #B5A9FF (lavender)
Combo banner:   #FF6B9D
Button primary: #FF6B9D  (with white text)
Button hover:   #FF4B8C
Star fill:      #FFD700
Star empty:     #E0E0E0
```
*(Each world has its own palette — see World table above for color directions)*

---

## 9. UI Layout

```
┌─────────────────────────────────────┐
│  [←Back]  Level 12 ⭐⭐☆  Score: 1250  │  ← Top bar
├─────────────────────────────────────┤
│                                     │
│   ┌──────────────────────────┐      │
│   │                          │      │
│   │         8×8 GRID         │      │ ← Main game area
│   │                          │      │
│   └──────────────────────────┘      │
│         [↩ Undo ❤️❤️❤️]               │ ← Undo button + heart count
│                                     │
│   ┌────┐  ┌────┐  ┌────┐  [📦]     │
│   │ P1 │  │ P2 │  │ P3 │  Holder   │ ← Piece tray + holder
│   └────┘  └────┘  └────┘           │
│                                     │
│      [Blocky mascot + bubble]       │ ← Mascot
└─────────────────────────────────────┘
```

**Mobile:** Stack vertically. Grid on top, tray below. Holder slot to the right of tray.  
**Desktop:** Grid centered, tray below, mascot in bottom-right corner.

---

## 10. Progression & Rewards

### Stars & Unlocking
- Each level awards 1–3 stars based on score
- Next level unlocks when the previous level earns at least 1 star
- World unlock requires earning a cumulative star count:
  - Ocean Reef unlocks: 25 total stars
  - Jungle Jump unlocks: 55 total stars
  - Space Station unlocks: 90 total stars
  - Rainbow Mountain unlocks: 130 total stars

### Trophy Room
- Simple trophy screen shows all levels as a grid of buttons
- Each level button shows its star rating (⭐⭐☆ etc.)
- Locked levels show a padlock icon
- Current world shown as a banner above the level grid

### Daily Bonus Level
- One special "bonus" level per day (procedurally generated or from a rotating set of 30)
- Completion gives a "Bonus Star" used to unlock cosmetics
- Bonus star unlocks: alternate piece color themes (e.g., "Galaxy skin," "Rainbow skin," "Dino skin")
- Cosmetics are visual only — no gameplay effect

---

## 11. Sound Design

All sounds should be soft, pleasant, and non-startling. No buzzing, harsh tones, or failure sounds.

| Event | Sound |
|---|---|
| Piece picked up | Soft "pop" |
| Piece placed (valid) | Light "click" or "thunk" |
| Piece invalid (can't place) | Gentle "boing" |
| Single line clear | Chime ding |
| Combo clear | Rising chime sequence (do-re-mi style) |
| Level complete | Short upbeat fanfare (5 notes) |
| Star earned | Sparkle jingle |
| Game over | Gentle descending note (not sad — more like a "whoops") |
| Background music | Soft, looping, world-appropriate (bubbly for Candy, wavy for Ocean, etc.) — volume at ~30% by default |

**Implementation note:** Use the Web Audio API for generated tones (avoids requiring audio files). Define frequencies and durations as constants.

---

## 12. Accessibility

- **Color blindness:** All piece colors have distinct shapes + optional pattern fills (stripes, dots, diamonds) toggled via settings
- **Font size:** Min 16px on mobile, 18px on desktop
- **Hit targets:** All interactive elements minimum 44×44px
- **Animations:** Respect `prefers-reduced-motion` — disable particle effects and screen shake if set
- **Keyboard support:** Tab to select pieces, arrow keys to move on grid, Enter to place (desktop)
- **No time pressure:** Zero time-based mechanics — kids can take as long as they need

---

## 13. Data Persistence

Use `localStorage` to save:
```json
{
  "levelProgress": {
    "1": { "stars": 3, "highScore": 1400 },
    "2": { "stars": 2, "highScore": 850 }
  },
  "totalStars": 47,
  "currentWorld": "ocean",
  "settings": {
    "soundOn": true,
    "musicOn": true,
    "reducedMotion": false,
    "colorblindMode": false
  },
  "dailyBonus": {
    "lastPlayed": "2025-09-01",
    "bonusStars": 5
  }
}
```

---

## 14. Technical Implementation Notes for Claude Code

### File Structure
```
/block-burst-buddies/
├── index.html
├── style.css
├── main.js
├── game/
│   ├── Grid.js         ← Grid state, line detection, clear logic
│   ├── Piece.js        ← Piece definitions, rendering
│   ├── Queue.js        ← Piece queue management
│   ├── Scorer.js       ← Scoring, star calculation
│   ├── Levels.js       ← All level definitions (score targets, pre-fills, piece pools)
│   ├── Worlds.js       ← World themes, color palettes
│   └── Mascot.js       ← Blocky animation state machine
├── ui/
│   ├── DragDrop.js     ← Mouse/touch drag-and-drop handler
│   ├── Animations.js   ← CSS/canvas animation helpers
│   ├── Audio.js        ← Web Audio API sound synthesis
│   └── Screen.js       ← Screen manager (main menu, game, level select, trophy)
└── assets/
    └── (SVG icons only — no external image dependencies)
```

### State Management
Use a single `GameState` object:
```javascript
const GameState = {
  grid: Array(8).fill(null).map(() => Array(8).fill(null)),  // null = empty, string = color
  queue: [],          // Array of 3 piece objects
  holder: null,       // Held piece or null
  holderUsedThisTurn: false,
  undosLeft: 3,
  score: 0,
  stars: 0,
  level: 1,
  world: 'candy',
  history: [],        // Stack for undo (store full grid snapshots)
};
```

### Grid Logic
```javascript
// Check if a piece can be placed at (row, col)
function canPlace(grid, piece, row, col) {
  return piece.cells.every(([dr, dc]) => {
    const r = row + dr, c = col + dc;
    return r >= 0 && r < 8 && c >= 0 && c < 8 && grid[r][c] === null;
  });
}

// Place a piece and return updated grid
function placePiece(grid, piece, row, col, color) {
  const newGrid = grid.map(r => [...r]);
  piece.cells.forEach(([dr, dc]) => {
    newGrid[row + dr][col + dc] = color;
  });
  return newGrid;
}

// Detect and clear full rows/columns, return { newGrid, linesCleared }
function clearLines(grid) {
  let newGrid = grid.map(r => [...r]);
  let linesCleared = 0;
  // Check rows
  for (let r = 0; r < 8; r++) {
    if (newGrid[r].every(cell => cell !== null)) {
      newGrid[r] = Array(8).fill(null);
      linesCleared++;
    }
  }
  // Check columns
  for (let c = 0; c < 8; c++) {
    if (newGrid.every(row => row[c] !== null)) {
      newGrid.forEach(row => row[c] = null);
      linesCleared++;
    }
  }
  return { newGrid, linesCleared };
}

// Check if any piece in queue can be placed anywhere
function hasValidMove(grid, queue) {
  return queue.some(piece =>
    Array.from({ length: 8 }, (_, r) => r).some(r =>
      Array.from({ length: 8 }, (_, c) => c).some(c =>
        canPlace(grid, piece, r, c)
      )
    )
  );
}
```

### Level Definition Format
```javascript
const LEVELS = {
  1: {
    world: 'candy',
    piecePool: 'tier1',
    targets: { oneStar: 200, twoStar: 400, threeStar: 700 },
    preFill: [],  // No pre-filled cells for Level 1
    objective: null,
    tutorialSteps: [
      { highlightPiece: 0, targetCell: [3, 3], message: "Drag this block here!" },
      { highlightPiece: 1, targetCell: [3, 5], message: "Now try this one!" },
    ]
  },
  12: {
    world: 'candy',
    piecePool: 'tier1',
    targets: { oneStar: 300, twoStar: 600, threeStar: 1000 },
    preFill: [
      { row: 0, col: 0, color: '#FF6B9D' },
      { row: 0, col: 1, color: '#FF6B9D' },
      // ... more pre-filled cells
    ],
    objective: { type: 'combo', count: 1, description: "Get 1 Combo!" }
  }
};
```

### Drag-and-Drop (Touch + Mouse unified)
```javascript
// Normalize events for both mouse and touch
function getEventPos(e) {
  if (e.touches) {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  return { x: e.clientX, y: e.clientY };
}

// Use pointer events API (works on both):
piece.addEventListener('pointerdown', startDrag);
document.addEventListener('pointermove', updateDrag);
document.addEventListener('pointerup', endDrag);
```

---

## 15. Phase Rollout Plan

Build in this order to get something playable fast:

### Phase 1 — Playable Core (MVP)
- [ ] 8×8 grid renders correctly
- [ ] 3 pieces in tray, drawn from Tier 1 pool
- [ ] Drag-and-drop piece placement (desktop mouse)
- [ ] Ghost preview on hover
- [ ] Row and column line clearing
- [ ] Basic score counter
- [ ] Game over detection
- [ ] Undo (3 uses)
- [ ] "Try Again" button

### Phase 2 — Level Structure
- [ ] Level definitions for Levels 1–15
- [ ] Star rating display (real-time)
- [ ] Level complete screen
- [ ] Level select screen (World 1 only)
- [ ] Pre-filled cell support
- [ ] Tutorial overlay for Levels 1–5

### Phase 3 — Juice & Feel
- [ ] Blocky mascot (CSS animated SVG)
- [ ] Line clear particle animations
- [ ] Combo banner animation
- [ ] Sound effects (Web Audio API)
- [ ] Background music (simple generated tones)
- [ ] Piece pickup/placement animations

### Phase 4 — Full Content
- [ ] All 80 levels across 5 worlds
- [ ] World unlock screens
- [ ] Holder slot mechanic
- [ ] Daily bonus level
- [ ] Cosmetic skins (color themes)
- [ ] Trophy room / progress screen
- [ ] Touch/mobile support
- [ ] localStorage persistence
- [ ] Accessibility (colorblind mode, reduced motion)

---

## 16. Out of Scope (Keep It Clean)

These are intentional exclusions — do not add:
- No in-app purchases or currency systems
- No ads of any kind
- No social login / accounts / leaderboards (privacy for kids)
- No time limits or countdown mechanics
- No energy/lives systems that gate play
- No push notifications
- No data collection

---

*This document is the complete specification for BlockBurst Buddies v1.0. Use it as the primary instruction set when developing with Claude Code. Build Phase 1 first, confirm it's fun, then proceed.*
