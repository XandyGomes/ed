import type { ArrayState, FrameSequence, OperationResult } from "@/lib/types";
import { createId } from "@/lib/id";
import { cloneArrayState } from "./common";

export function stackPush(state: ArrayState, value: number): OperationResult<ArrayState> {
  if (!Number.isFinite(value)) {
    return { ok: false, error: "Informe um valor numérico válido." };
  }
  const newItem = { id: createId(), value };
  const nextState = cloneArrayState(state);
  nextState.items.push(newItem);

  const frames: FrameSequence<ArrayState> = [
    { id: 0, state, narration: `Empilhando (push) o valor ${value}...` },
    {
      id: 1,
      state: nextState,
      highlights: [{ id: newItem.id, color: "new" }],
      pointers: { topo: newItem.id },
      narration: `${value} agora é o topo da pilha. push é O(1).`,
    },
  ];
  return { ok: true, frames, nextState };
}

export function stackPop(state: ArrayState): OperationResult<ArrayState> {
  if (state.items.length === 0) {
    return { ok: false, error: "A pilha está vazia — não há o que desempilhar." };
  }
  const top = state.items[state.items.length - 1];
  const nextState = cloneArrayState(state);
  nextState.items.pop();
  const newTop = nextState.items[nextState.items.length - 1];

  const frames: FrameSequence<ArrayState> = [
    {
      id: 0,
      state,
      highlights: [{ id: top.id, color: "danger" }],
      pointers: { topo: top.id },
      narration: `Desempilhando (pop) o topo: ${top.value}.`,
    },
    {
      id: 1,
      state: nextState,
      pointers: newTop ? { topo: newTop.id } : undefined,
      narration: newTop
        ? `${top.value} removido. Novo topo: ${newTop.value}. pop é O(1).`
        : `${top.value} removido. A pilha está vazia agora.`,
    },
  ];
  return { ok: true, frames, nextState };
}

export function stackPeek(state: ArrayState): OperationResult<ArrayState> {
  if (state.items.length === 0) {
    return { ok: false, error: "A pilha está vazia — não há topo para consultar." };
  }
  const top = state.items[state.items.length - 1];
  const frames: FrameSequence<ArrayState> = [
    {
      id: 0,
      state,
      highlights: [{ id: top.id, color: "visit" }],
      pointers: { topo: top.id },
      narration: `Topo da pilha: ${top.value} (peek não remove, é O(1)).`,
    },
  ];
  return { ok: true, frames, nextState: state };
}
