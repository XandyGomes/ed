import type { ArrayState, FrameSequence, OperationResult } from "@/lib/types";
import { createId } from "@/lib/id";
import { cloneArrayState } from "./common";

function pointers(state: ArrayState): Record<string, string> | undefined {
  if (state.items.length === 0) return undefined;
  return { cabeça: state.items[0].id, cauda: state.items[state.items.length - 1].id };
}

export function dllInsertHead(state: ArrayState, value: number): OperationResult<ArrayState> {
  if (!Number.isFinite(value)) return { ok: false, error: "Informe um valor numérico válido." };
  const newItem = { id: createId(), value };
  const nextState = cloneArrayState(state);
  nextState.items.unshift(newItem);

  const frames: FrameSequence<ArrayState> = [
    { id: 0, state, pointers: pointers(state), narration: `Criando o nó ${value}, com prev = NULL e next = antiga cabeça...` },
    {
      id: 1,
      state: nextState,
      highlights: [{ id: newItem.id, color: "new" }],
      pointers: pointers(nextState),
      narration: `A antiga cabeça agora tem prev apontando para o novo nó. Inserir no início é O(1).`,
    },
  ];
  return { ok: true, frames, nextState };
}

export function dllInsertTail(state: ArrayState, value: number): OperationResult<ArrayState> {
  if (!Number.isFinite(value)) return { ok: false, error: "Informe um valor numérico válido." };
  const newItem = { id: createId(), value };
  const nextState = cloneArrayState(state);
  nextState.items.push(newItem);

  const frames: FrameSequence<ArrayState> = [
    {
      id: 0,
      state,
      pointers: pointers(state),
      narration: `Graças ao ponteiro cauda, acessamos o último nó diretamente, sem percorrer a lista.`,
    },
    {
      id: 1,
      state: nextState,
      highlights: [{ id: newItem.id, color: "new" }],
      pointers: pointers(nextState),
      narration: `${value} inserido no final. Com ponteiro de cauda, inserir no final é O(1) (diferente da lista simples!).`,
    },
  ];
  return { ok: true, frames, nextState };
}

export function dllRemoveHead(state: ArrayState): OperationResult<ArrayState> {
  if (state.items.length === 0) return { ok: false, error: "A lista está vazia." };
  const head = state.items[0];
  const nextState = cloneArrayState(state);
  nextState.items.shift();

  const frames: FrameSequence<ArrayState> = [
    {
      id: 0,
      state,
      highlights: [{ id: head.id, color: "danger" }],
      pointers: pointers(state),
      narration: `Removendo a cabeça (${head.value}). O segundo nó vira a nova cabeça, com prev = NULL.`,
    },
    {
      id: 1,
      state: nextState,
      pointers: pointers(nextState),
      narration: `${head.value} removido. Remover do início é O(1).`,
    },
  ];
  return { ok: true, frames, nextState };
}

export function dllRemoveTail(state: ArrayState): OperationResult<ArrayState> {
  if (state.items.length === 0) return { ok: false, error: "A lista está vazia." };
  const tail = state.items[state.items.length - 1];
  const nextState = cloneArrayState(state);
  nextState.items.pop();

  const frames: FrameSequence<ArrayState> = [
    {
      id: 0,
      state,
      highlights: [{ id: tail.id, color: "danger" }],
      pointers: pointers(state),
      narration: `Removendo a cauda (${tail.value}). Graças ao ponteiro prev dela, achamos o novo último nó direto.`,
    },
    {
      id: 1,
      state: nextState,
      pointers: pointers(nextState),
      narration: `${tail.value} removido. Remover do final é O(1) aqui (na lista simples seria O(n), sem o ponteiro prev).`,
    },
  ];
  return { ok: true, frames, nextState };
}

export function dllSearch(state: ArrayState, target: number): OperationResult<ArrayState> {
  if (!Number.isFinite(target)) return { ok: false, error: "Informe um valor numérico para buscar." };
  if (state.items.length === 0) return { ok: false, error: "A lista está vazia." };

  const frames: FrameSequence<ArrayState> = [
    { id: 0, state, pointers: pointers(state), narration: `Buscando ${target} a partir da cabeça...` },
  ];

  for (const item of state.items) {
    if (item.value === target) {
      frames.push({
        id: frames.length,
        state,
        highlights: [{ id: item.id, color: "success" }],
        pointers: { ...pointers(state), atual: item.id },
        narration: `Encontrado! atual aponta para o nó com valor ${item.value}.`,
      });
      return { ok: true, frames, nextState: state };
    }
    frames.push({
      id: frames.length,
      state,
      highlights: [{ id: item.id, color: "compare" }],
      pointers: { ...pointers(state), atual: item.id },
      narration: `atual = ${item.value} ≠ ${target}. Seguindo o ponteiro next...`,
    });
  }

  frames.push({
    id: frames.length,
    state,
    pointers: pointers(state),
    narration: `${target} não está na lista.`,
  });
  return { ok: true, frames, nextState: state };
}
