// Fruidoku web demo: pure game logic, no DOM. Rules follow the app (see Fruidoku README).
import type { Level } from './levels';

export type Cell = '' | 'x' | 'bad' | 'fruit';
export type Result = 'locked' | 'marked' | 'planted' | 'solved' | 'wrong' | 'over';

export const FRUITS = ['cherry', 'orange', 'banana', 'blueberry', 'grape', 'pear'] as const;
export const MAX_LIVES = 3;

export function createGame(level: Level) {
  const n = level.size;
  let cells: Cell[][] = [];
  let lives = MAX_LIVES;
  let mistakes = 0;
  let planted = 0;

  function reset() {
    cells = Array.from({ length: n }, () => Array<Cell>(n).fill(''));
    lives = MAX_LIVES;
    mistakes = 0;
    planted = 0;
  }
  reset();
  const solved = () => planted === n;

  return {
    level,
    size: n,
    get cells() { return cells; },
    get lives() { return lives; },
    get mistakes() { return mistakes; },
    get solved() { return solved(); },
    get over() { return lives === 0; },
    reset,
    /** Used by the double-tap gesture to undo the first tap's × before planting. */
    restore(r: number, c: number, v: Cell) { if (cells[r][c] !== 'fruit') cells[r][c] = v; },
    mark(r: number, c: number): Result {
      if (solved() || lives === 0) return 'locked';
      const v = cells[r][c];
      if (v === 'fruit' || v === 'bad') return 'locked';
      cells[r][c] = v === 'x' ? '' : 'x';
      return 'marked';
    },
    plant(r: number, c: number): Result {
      if (solved() || lives === 0 || cells[r][c] === 'fruit') return 'locked';
      if (level.solution[r] === c) {
        cells[r][c] = 'fruit';
        planted++;
        return solved() ? 'solved' : 'planted';
      }
      cells[r][c] = 'bad';
      lives--;
      mistakes++;
      return lives === 0 ? 'over' : 'wrong';
    },
  };
}
export type Game = ReturnType<typeof createGame>;

/** Brute-force solver over the four rules; used by the tests to prove each bundled level is unique. */
export function solveAll(level: Level): number[][] {
  const n = level.size, out: number[][] = [], cols: number[] = [];
  const usedCol = new Set<number>(), usedReg = new Set<number>();
  const go = (r: number) => {
    if (r === n) { out.push([...cols]); return; }
    for (let c = 0; c < n; c++) {
      const reg = level.regions[r][c];
      if (usedCol.has(c) || usedReg.has(reg)) continue;
      if (r > 0 && Math.abs(cols[r - 1] - c) <= 1) continue; // touching, incl. diagonal
      cols[r] = c; usedCol.add(c); usedReg.add(reg);
      go(r + 1);
      usedCol.delete(c); usedReg.delete(reg);
    }
  };
  go(0);
  return out;
}
