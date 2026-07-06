import type { ArrayState, FrameSequence, OperationResult } from "@/lib/types";
import { createId } from "@/lib/id";
import { cloneArrayState } from "./common";

export function dequeInsertFront(state: ArrayState, value: number): OperationResult<ArrayState> {
  if (!Number.isFinite(value)) return { ok: false, error: "Informe um valor numérico válido." };
  const newItem = { id: createId(), value };
  const nextState = cloneArrayState(state);
  nextState.items.unshift(newItem);
  const frames: FrameSequence<ArrayState> = [
    { id: 0, state, narration: `Inserindo ${value} na frente do deque...` },
    {
      id: 1,
      state: nextState,
      highlights: [{ id: newItem.id, color: "new" }],
      pointers: { frente: newItem.id, tras: nextState.items[nextState.items.length - 1].id },
      narration: `${value} inserido na frente. Inserção nas pontas é O(1).`,
    },
  ];
  return { ok: true, frames, nextState };
}

export function dequeInsertBack(state: ArrayState, value: number): OperationResult<ArrayState> {
  if (!Number.isFinite(value)) return { ok: false, error: "Informe um valor numérico válido." };
  const newItem = { id: createId(), value };
  const nextState = cloneArrayState(state);
  nextState.items.push(newItem);
  const frames: FrameSequence<ArrayState> = [
    { id: 0, state, narration: `Inserindo ${value} no final do deque...` },
    {
      id: 1,
      state: nextState,
      highlights: [{ id: newItem.id, color: "new" }],
      pointers: { tras: newItem.id, frente: nextState.items[0].id },
      narration: `${value} inserido no final. Inserção nas pontas é O(1).`,
    },
  ];
  return { ok: true, frames, nextState };
}

export function dequeRemoveFront(state: ArrayState): OperationResult<ArrayState> {
  if (state.items.length === 0) return { ok: false, error: "O deque está vazio." };
  const front = state.items[0];
  const nextState = cloneArrayState(state);
  nextState.items.shift();
  const frames: FrameSequence<ArrayState> = [
    {
      id: 0,
      state,
      highlights: [{ id: front.id, color: "danger" }],
      pointers: { frente: front.id },
      narration: `Removendo a frente do deque: ${front.value}.`,
    },
    {
      id: 1,
      state: nextState,
      pointers: nextState.items[0] ? { frente: nextState.items[0].id } : undefined,
      narration: `${front.value} removido. Remoção nas pontas é O(1).`,
    },
  ];
  return { ok: true, frames, nextState };
}

export function dequeRemoveBack(state: ArrayState): OperationResult<ArrayState> {
  if (state.items.length === 0) return { ok: false, error: "O deque está vazio." };
  const back = state.items[state.items.length - 1];
  const nextState = cloneArrayState(state);
  nextState.items.pop();
  const frames: FrameSequence<ArrayState> = [
    {
      id: 0,
      state,
      highlights: [{ id: back.id, color: "danger" }],
      pointers: { tras: back.id },
      narration: `Removendo o final do deque: ${back.value}.`,
    },
    {
      id: 1,
      state: nextState,
      pointers: nextState.items[nextState.items.length - 1]
        ? { tras: nextState.items[nextState.items.length - 1].id }
        : undefined,
      narration: `${back.value} removido. Remoção nas pontas é O(1).`,
    },
  ];
  return { ok: true, frames, nextState };
}
