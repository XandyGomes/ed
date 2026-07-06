import type { ArrayState, FrameSequence, OperationResult } from "@/lib/types";
import { createId } from "@/lib/id";
import { cloneArrayState } from "./common";

export function arrayAccess(state: ArrayState, index: number): OperationResult<ArrayState> {
  if (!Number.isInteger(index) || index < 0 || index >= state.items.length) {
    return { ok: false, error: `Índice ${index} fora dos limites (0 a ${state.items.length - 1}).` };
  }
  const item = state.items[index];
  const frames: FrameSequence<ArrayState> = [
    {
      id: 0,
      state,
      highlights: [{ id: item.id, color: "visit" }],
      narration: `Acessando o índice ${index}...`,
    },
    {
      id: 1,
      state,
      highlights: [{ id: item.id, color: "success" }],
      narration: `array[${index}] = ${item.value}. Acesso direto por índice é O(1).`,
    },
  ];
  return { ok: true, frames, nextState: state };
}

export function arrayInsertAt(
  state: ArrayState,
  index: number,
  value: number
): OperationResult<ArrayState> {
  if (!Number.isInteger(index) || index < 0 || index > state.items.length) {
    return { ok: false, error: `Posição ${index} inválida (0 a ${state.items.length}).` };
  }
  if (!Number.isFinite(value)) {
    return { ok: false, error: "Informe um valor numérico válido." };
  }
  const newItem = { id: createId(), value };
  const nextState = cloneArrayState(state);
  nextState.items.splice(index, 0, newItem);

  const frames: FrameSequence<ArrayState> = [
    {
      id: 0,
      state,
      narration: `Preparando para inserir ${value} na posição ${index}.`,
    },
    {
      id: 1,
      state: nextState,
      highlights: [{ id: newItem.id, color: "new" }],
      narration:
        index < state.items.length
          ? `${value} inserido na posição ${index}. Os itens seguintes deslocaram uma posição à direita (O(n)).`
          : `${value} inserido no final do array (O(1) amortizado).`,
    },
  ];
  return { ok: true, frames, nextState };
}

export function arrayRemoveAt(state: ArrayState, index: number): OperationResult<ArrayState> {
  if (!Number.isInteger(index) || index < 0 || index >= state.items.length) {
    return { ok: false, error: `Índice ${index} fora dos limites (0 a ${state.items.length - 1}).` };
  }
  const item = state.items[index];
  const nextState = cloneArrayState(state);
  nextState.items.splice(index, 1);

  const frames: FrameSequence<ArrayState> = [
    {
      id: 0,
      state,
      highlights: [{ id: item.id, color: "danger" }],
      narration: `Removendo o item na posição ${index} (valor ${item.value}).`,
    },
    {
      id: 1,
      state: nextState,
      narration: `Item removido. Os itens seguintes deslocaram uma posição à esquerda (O(n)).`,
    },
  ];
  return { ok: true, frames, nextState };
}
