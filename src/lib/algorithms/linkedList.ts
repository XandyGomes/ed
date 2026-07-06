import type { ArrayState, FrameSequence, OperationResult } from "@/lib/types";
import { createId } from "@/lib/id";
import { cloneArrayState } from "./common";

export function llInsertHead(state: ArrayState, value: number): OperationResult<ArrayState> {
  if (!Number.isFinite(value)) return { ok: false, error: "Informe um valor numérico válido." };
  const newItem = { id: createId(), value };
  const nextState = cloneArrayState(state);
  nextState.items.unshift(newItem);

  const frames: FrameSequence<ArrayState> = [
    { id: 0, state, narration: `Criando um novo nó com valor ${value}...` },
    {
      id: 1,
      state: nextState,
      highlights: [{ id: newItem.id, color: "new" }],
      pointers: { cabeça: newItem.id },
      narration: `O novo nó aponta para o antigo início, e a cabeça passa a apontar para ele. Inserir no início é O(1).`,
    },
  ];
  return { ok: true, frames, nextState };
}

export function llInsertTail(state: ArrayState, value: number): OperationResult<ArrayState> {
  if (!Number.isFinite(value)) return { ok: false, error: "Informe um valor numérico válido." };
  const newItem = { id: createId(), value };
  const nextState = cloneArrayState(state);
  nextState.items.push(newItem);

  const frames: FrameSequence<ArrayState> = [];
  if (state.items.length === 0) {
    frames.push({ id: 0, state, narration: "Lista vazia: o novo nó também será a cabeça." });
  } else {
    frames.push({
      id: 0,
      state,
      pointers: { cabeça: state.items[0].id },
      narration: "Sem ponteiro para o final, precisamos percorrer a lista inteira até o último nó...",
    });
    state.items.forEach((item, i) => {
      frames.push({
        id: frames.length,
        state,
        highlights: [{ id: item.id, color: "visit" }],
        pointers: { cabeça: state.items[0].id, atual: item.id },
        narration:
          i === state.items.length - 1
            ? `Chegamos ao último nó (aponta para NULL).`
            : `atual = nó com valor ${item.value}, avançando...`,
      });
    });
  }
  frames.push({
    id: frames.length,
    state: nextState,
    highlights: [{ id: newItem.id, color: "new" }],
    pointers: { cabeça: nextState.items[0].id },
    narration: `${value} inserido no final. Sem ponteiro de cauda, inserir no final é O(n).`,
  });
  return { ok: true, frames, nextState };
}

export function llRemoveHead(state: ArrayState): OperationResult<ArrayState> {
  if (state.items.length === 0) {
    return { ok: false, error: "A lista está vazia." };
  }
  const head = state.items[0];
  const nextState = cloneArrayState(state);
  nextState.items.shift();

  const frames: FrameSequence<ArrayState> = [
    {
      id: 0,
      state,
      highlights: [{ id: head.id, color: "danger" }],
      pointers: { cabeça: head.id },
      narration: `Removendo a cabeça (valor ${head.value}). A cabeça passa a apontar para o segundo nó.`,
    },
    {
      id: 1,
      state: nextState,
      pointers: nextState.items[0] ? { cabeça: nextState.items[0].id } : undefined,
      narration: `${head.value} removido. Remover do início é O(1).`,
    },
  ];
  return { ok: true, frames, nextState };
}

export function llSearch(state: ArrayState, target: number): OperationResult<ArrayState> {
  if (!Number.isFinite(target)) return { ok: false, error: "Informe um valor numérico para buscar." };
  if (state.items.length === 0) {
    return { ok: false, error: "A lista está vazia." };
  }
  const headId = state.items[0].id;
  const frames: FrameSequence<ArrayState> = [
    { id: 0, state, pointers: { cabeça: headId }, narration: `Buscando ${target} a partir da cabeça...` },
  ];

  for (const item of state.items) {
    if (item.value === target) {
      frames.push({
        id: frames.length,
        state,
        highlights: [{ id: item.id, color: "success" }],
        pointers: { cabeça: headId, atual: item.id },
        narration: `Encontrado! atual aponta para o nó com valor ${item.value}.`,
      });
      return { ok: true, frames, nextState: state };
    }
    frames.push({
      id: frames.length,
      state,
      highlights: [{ id: item.id, color: "compare" }],
      pointers: { cabeça: headId, atual: item.id },
      narration: `atual = ${item.value} ≠ ${target}. Seguindo o ponteiro next...`,
    });
  }

  frames.push({
    id: frames.length,
    state,
    pointers: { cabeça: headId },
    narration: `atual chegou a NULL. ${target} não está na lista. Busca é O(n).`,
  });
  return { ok: true, frames, nextState: state };
}
