import type { ArrayState, FrameSequence, OperationResult } from "@/lib/types";
import { createId } from "@/lib/id";
import { cloneArrayState } from "./common";

export function queueEnqueue(state: ArrayState, value: number): OperationResult<ArrayState> {
  if (!Number.isFinite(value)) {
    return { ok: false, error: "Informe um valor numérico válido." };
  }
  const newItem = { id: createId(), value };
  const nextState = cloneArrayState(state);
  nextState.items.push(newItem);

  const frames: FrameSequence<ArrayState> = [
    { id: 0, state, narration: `Enfileirando (enqueue) o valor ${value} no final da fila...` },
    {
      id: 1,
      state: nextState,
      highlights: [{ id: newItem.id, color: "new" }],
      pointers: { tras: newItem.id, frente: nextState.items[0].id },
      narration: `${value} entrou na fila. enqueue é O(1).`,
    },
  ];
  return { ok: true, frames, nextState };
}

export function queueDequeue(state: ArrayState): OperationResult<ArrayState> {
  if (state.items.length === 0) {
    return { ok: false, error: "A fila está vazia, não há o que desenfileirar." };
  }
  const front = state.items[0];
  const nextState = cloneArrayState(state);
  nextState.items.shift();
  const newFront = nextState.items[0];

  const frames: FrameSequence<ArrayState> = [
    {
      id: 0,
      state,
      highlights: [{ id: front.id, color: "danger" }],
      pointers: { frente: front.id },
      narration: `Desenfileirando (dequeue) a frente da fila: ${front.value}.`,
    },
    {
      id: 1,
      state: nextState,
      pointers: newFront ? { frente: newFront.id } : undefined,
      narration: newFront
        ? `${front.value} removido. Nova frente: ${newFront.value}. dequeue é O(1).`
        : `${front.value} removido. A fila está vazia agora.`,
    },
  ];
  return { ok: true, frames, nextState };
}
