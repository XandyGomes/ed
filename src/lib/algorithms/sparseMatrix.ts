import type { FrameSequence, OperationResult } from "@/lib/types";
import { createId } from "@/lib/id";
import { hl } from "@/lib/highlightColor";

export type SparseCell = {
  id: string;
  row: number;
  col: number;
  value: number;
};

export type SparseMatrixState = {
  rows: number;
  cols: number;
  cells: SparseCell[];
};

export function makeSparseMatrixState(): SparseMatrixState {
  const rows = 4;
  const cols = 5;
  const nonZero: Record<string, number> = {
    "0,2": 5,
    "1,4": 8,
    "2,0": 3,
    "3,3": 9,
  };
  const cells: SparseCell[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push({ id: createId(), row: r, col: c, value: nonZero[`${r},${c}`] ?? 0 });
    }
  }
  return { rows, cols, cells };
}

export function gerarRepresentacaoEsparsa(state: SparseMatrixState): OperationResult<SparseMatrixState> {
  const frames: FrameSequence<SparseMatrixState> = [
    { id: 0, state, narration: `Percorrendo a matriz ${state.rows}×${state.cols} célula por célula, linha por linha...` },
  ];

  const foundIds: string[] = [];
  for (const cell of state.cells) {
    if (cell.value === 0) {
      frames.push({
        id: frames.length,
        state,
        highlights: foundIds.map((id) => hl(id, "success")).concat([hl(cell.id, "compare")]),
        narration: `(${cell.row}, ${cell.col}) = 0: não entra na lista esparsa.`,
      });
    } else {
      foundIds.push(cell.id);
      frames.push({
        id: frames.length,
        state,
        highlights: foundIds.map((id) => hl(id, "success")),
        narration: `(${cell.row}, ${cell.col}) = ${cell.value}: valor não-zero, adiciona à lista esparsa!`,
      });
    }
  }

  const total = state.rows * state.cols;
  const pct = Math.round((foundIds.length / total) * 100);
  frames.push({
    id: frames.length,
    state,
    highlights: foundIds.map((id) => hl(id, "success")),
    narration: `Pronto! De ${total} células, só ${foundIds.length} são não-zero (${pct}% preenchida). A representação esparsa guarda só essas ${foundIds.length} triplas (linha, coluna, valor), economizando memória.`,
  });

  return { ok: true, frames, nextState: state };
}

export function reconstruirMatrizDensa(state: SparseMatrixState): OperationResult<SparseMatrixState> {
  const naoZero = state.cells.filter((c) => c.value !== 0);
  const frames: FrameSequence<SparseMatrixState> = [
    {
      id: 0,
      state,
      narration: `Partindo da lista esparsa com ${naoZero.length} triplas (linha, coluna, valor), reconstruindo a matriz densa ${state.rows}×${state.cols} e preenchendo o resto com zero.`,
    },
  ];

  const colocadas: string[] = [];
  for (const cell of naoZero) {
    colocadas.push(cell.id);
    frames.push({
      id: frames.length,
      state,
      highlights: colocadas.map((id) => hl(id, "success")),
      narration: `Colocando o valor ${cell.value} na posição (${cell.row}, ${cell.col})...`,
    });
  }

  frames.push({
    id: frames.length,
    state,
    highlights: colocadas.map((id) => hl(id, "success")),
    narration: `Matriz densa reconstruída: todas as posições que não estavam na lista esparsa continuam zero.`,
  });

  return { ok: true, frames, nextState: state };
}

export function makeSparseMatrixStateFromGrid(grid: { rows: number; cols: number; gray: number[][] }): SparseMatrixState {
  const cells: SparseCell[] = [];
  for (let r = 0; r < grid.rows; r++) {
    for (let c = 0; c < grid.cols; c++) {
      cells.push({ id: createId(), row: r, col: c, value: grid.gray[r][c] });
    }
  }
  return { rows: grid.rows, cols: grid.cols, cells };
}
