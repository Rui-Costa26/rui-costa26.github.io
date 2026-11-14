// <fruidoku-board> custom element. The Astro component renders the initial markup on the
// server; this module takes over the same DOM when the board nears the viewport.
import { createGame, FRUITS, MAX_LIVES, type Cell, type Game, type Result } from './engine';
import { LEVELS } from './levels';

type Strings = Record<string, string> & { fruits: Record<string, string> };

const fill = (s: string, o: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(o[k]));
const X = '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M33 33 67 67M67 33 33 67"/></svg>';
const FRUIT = (f: string) => `<svg viewBox="0 0 100 100" aria-hidden="true"><use href="#fw-${f}"/></svg>`;
const DOUBLE_TAP_MS = 380;

class FruidokuBoard extends HTMLElement {
  private s!: Strings;
  private li = 0;
  private game!: Game;
  private mode: 'mark' | 'plant' = 'mark';
  private msg = 'intro';
  private focusRC: [number, number] = [0, 0];
  private last = { r: -1, c: -1, t: 0, prev: '' as Cell };
  private board!: HTMLElement;

  connectedCallback() {
    this.s = JSON.parse(this.dataset.strings || '{}');
    this.game = createGame(LEVELS[0]);
    this.board = this.querySelector('.fd-board')!;
    this.board.addEventListener('click', (e) => this.onTap(e));
    this.board.addEventListener('keydown', (e) => this.onKey(e));
    this.querySelector('.fd-controls')!.addEventListener('click', (e) => this.onControl(e));
    this.querySelectorAll<HTMLButtonElement>('.fd-cell, .fd-controls button').forEach((b) => (b.disabled = false));
    this.dataset.ready = '';
    this.build();
    this.render();
  }

  private build() {
    const n = this.game.size;
    this.board.style.setProperty('--n', String(n));
    this.board.innerHTML = '';
    for (let r = 0; r < n; r++) {
      const row = document.createElement('div');
      row.setAttribute('role', 'row');
      row.className = 'fd-row';
      for (let c = 0; c < n; c++) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'fd-cell';
        b.setAttribute('role', 'gridcell');
        b.dataset.r = String(r);
        b.dataset.c = String(c);
        b.dataset.fruit = FRUITS[this.game.level.regions[r][c]];
        row.appendChild(b);
      }
      this.board.appendChild(row);
    }
  }

  private render() {
    const s = this.s, g = this.game, n = g.size;
    this.querySelector('.fd-level')!.textContent = fill(s.level, { n: this.li + 1, s: n });
    const lv = this.querySelector('.fd-lives')!;
    lv.setAttribute('aria-label', fill(s.lives, { n: g.lives }));
    lv.innerHTML = Array.from({ length: MAX_LIVES }, (_, i) => `<i class="${i < g.lives ? 'on' : ''}"></i>`).join('');
    this.board.setAttribute('aria-label', fill(s.board, { s: n }));
    this.board.querySelectorAll<HTMLButtonElement>('.fd-cell').forEach((b) => {
      const r = +b.dataset.r!, c = +b.dataset.c!, v = g.cells[r][c], f = b.dataset.fruit!;
      if ((b.dataset.s ?? '') !== v) {
        b.dataset.s = v;
        b.innerHTML = v === 'fruit' ? FRUIT(f) : v ? X : '';
      }
      b.tabIndex = r === this.focusRC[0] && c === this.focusRC[1] ? 0 : -1;
      const st = v === 'fruit' ? s.fruit : v ? s.marked : s.empty;
      b.setAttribute('aria-label', fill(s.cell, { r: r + 1, c: c + 1, f: s.fruits[f], st }));
    });
    this.querySelectorAll<HTMLButtonElement>('.fd-mode button').forEach((b) =>
      b.setAttribute('aria-pressed', String(b.dataset.mode === this.mode)));
    const next = this.querySelector<HTMLButtonElement>('[data-act=next]')!;
    next.hidden = !g.solved;
    next.textContent = this.li === LEVELS.length - 1 ? s.again : s.next;
    const status = this.querySelector<HTMLElement>('.fd-status')!;
    const text = this.msg === 'solved' ? (g.mistakes ? s.solved : s.star) : s[this.msg];
    if (status.textContent !== text) status.textContent = text;
    status.dataset.kind = this.msg;
    this.dataset.state = g.solved ? 'solved' : g.over ? 'over' : 'play';
  }

  private act(r: number, c: number, plant: boolean) {
    const res: Result = plant ? this.game.plant(r, c) : this.game.mark(r, c);
    if (res === 'wrong' || res === 'over' || res === 'solved') this.msg = res;
    else if (res === 'planted' || res === 'marked') this.msg = 'intro';
    this.render();
  }

  private onTap(e: Event) {
    const b = (e.target as HTMLElement).closest<HTMLElement>('.fd-cell');
    if (!b) return;
    const r = +b.dataset.r!, c = +b.dataset.c!, now = Date.now();
    this.focusRC = [r, c];
    if (this.mode === 'plant') return this.act(r, c, true);
    // Keyboard Enter/Space produces a click with detail 0: always a single mark.
    const pointer = (e as MouseEvent).detail > 0;
    if (pointer && this.last.r === r && this.last.c === c && now - this.last.t < DOUBLE_TAP_MS) {
      this.game.restore(r, c, this.last.prev === 'bad' ? 'bad' : this.last.prev);
      this.last.t = 0;
      return this.act(r, c, true);
    }
    this.last = { r, c, t: now, prev: this.game.cells[r][c] };
    this.act(r, c, false);
  }

  private onKey(e: KeyboardEvent) {
    const b = (e.target as HTMLElement).closest<HTMLElement>('.fd-cell');
    if (!b) return;
    const n = this.game.size;
    let r = +b.dataset.r!, c = +b.dataset.c!;
    const mv = ({ ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] } as Record<string, number[]>)[e.key];
    if (mv) {
      e.preventDefault();
      r = Math.max(0, Math.min(n - 1, r + mv[0]));
      c = Math.max(0, Math.min(n - 1, c + mv[1]));
      this.focusRC = [r, c];
      this.render();
      this.board.querySelector<HTMLElement>(`[data-r="${r}"][data-c="${c}"]`)!.focus();
    } else if (e.key === 'p' || e.key === 'P') {
      e.preventDefault();
      this.focusRC = [r, c];
      this.act(r, c, true);
    }
  }

  private onControl(e: Event) {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('button');
    if (!b) return;
    if (b.dataset.mode) this.mode = b.dataset.mode as 'mark' | 'plant';
    else if (b.dataset.act === 'restart') { this.game.reset(); this.msg = 'intro'; }
    else if (b.dataset.act === 'next') {
      this.li = (this.li + 1) % LEVELS.length;
      this.game = createGame(LEVELS[this.li]);
      this.msg = 'intro';
      this.focusRC = [0, 0];
      this.build();
    }
    this.render();
  }
}

if (!customElements.get('fruidoku-board')) customElements.define('fruidoku-board', FruidokuBoard);
