import { describe, expect, it } from 'vitest';
import { createGame, solveAll } from './engine';
import { LEVELS } from './levels';

describe('bundled levels', () => {
  for (const level of LEVELS) {
    it(`${level.id} has exactly one solution, equal to the stored one`, () => {
      const all = solveAll(level);
      expect(all).toHaveLength(1);
      expect(all[0]).toEqual(level.solution);
    });
  }
});

describe('game rules', () => {
  const level = LEVELS[0];
  const wrongCol = (r: number) => (level.solution[r] + 1) % level.size;

  it('marking toggles', () => {
    const g = createGame(level);
    expect(g.mark(0, 0)).toBe('marked');
    expect(g.cells[0][0]).toBe('x');
    g.mark(0, 0);
    expect(g.cells[0][0]).toBe('');
  });

  it('a wrong plant costs a life and locks the cell', () => {
    const g = createGame(level);
    expect(g.plant(0, wrongCol(0))).toBe('wrong');
    expect(g.lives).toBe(2);
    expect(g.cells[0][wrongCol(0)]).toBe('bad');
    expect(g.mark(0, wrongCol(0))).toBe('locked');
  });

  it('three wrong plants lock the board', () => {
    const g = createGame(level);
    g.plant(0, wrongCol(0)); g.plant(1, wrongCol(1));
    expect(g.plant(2, wrongCol(2))).toBe('over');
    expect(g.over).toBe(true);
    expect(g.plant(3, level.solution[3])).toBe('locked');
  });

  it('planting the solution solves it, with no mistakes', () => {
    const g = createGame(level);
    let res = '';
    level.solution.forEach((c, r) => { res = g.plant(r, c); });
    expect(res).toBe('solved');
    expect(g.solved).toBe(true);
    expect(g.mistakes).toBe(0);
  });

  it('reset restores the start state', () => {
    const g = createGame(level);
    g.mark(0, 0); g.plant(1, wrongCol(1)); g.plant(2, level.solution[2]);
    g.reset();
    expect(g.lives).toBe(3);
    expect(g.cells.flat().every((v) => v === '')).toBe(true);
  });
});
