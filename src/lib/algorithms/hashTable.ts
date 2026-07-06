import type { ArrayItem, FrameSequence, OperationResult } from "@/lib/types";
import { createId } from "@/lib/id";

export type HashState = {
  buckets: ArrayItem[][];
  capacity: number;
};

function hashOf(value: number, capacity: number): number {
  return ((value % capacity) + capacity) % capacity;
}

export function makeHashState(capacity: number, values: number[]): HashState {
  const state: HashState = { buckets: Array.from({ length: capacity }, () => []), capacity };
  for (const value of values) {
    state.buckets[hashOf(value, capacity)].push({ id: createId(), value });
  }
  return state;
}

function cloneHashState(state: HashState): HashState {
  return { buckets: state.buckets.map((bucket) => bucket.map((item) => ({ ...item }))), capacity: state.capacity };
}

export function hashInsert(state: HashState, value: number): OperationResult<HashState> {
  if (!Number.isFinite(value)) return { ok: false, error: "Informe um valor numérico válido." };
  const index = hashOf(value, state.capacity);
  if (state.buckets[index].some((item) => item.value === value)) {
    return { ok: false, error: `${value} já existe na tabela (bucket ${index}).` };
  }

  const nextState = cloneHashState(state);
  const newItem: ArrayItem = { id: createId(), value };

  const frames: FrameSequence<HashState> = [
    {
      id: 0,
      state,
      pointers: { bucket: String(index) },
      narration: `hash(${value}) = ${value} % ${state.capacity} = ${index}.`,
    },
  ];

  if (state.buckets[index].length > 0) {
    frames.push({
      id: frames.length,
      state,
      pointers: { bucket: String(index) },
      narration: `Colisão! O bucket ${index} já tem ${state.buckets[index].length} item(ns). ${value} será encadeado no final da lista.`,
    });
  }

  nextState.buckets[index].push(newItem);
  frames.push({
    id: frames.length,
    state: nextState,
    highlights: [{ id: newItem.id, color: "new" }],
    pointers: { bucket: String(index) },
    narration: `${value} inserido no bucket ${index}. Em média, O(1).`,
  });

  return { ok: true, frames, nextState };
}

export function hashSearch(state: HashState, value: number): OperationResult<HashState> {
  if (!Number.isFinite(value)) return { ok: false, error: "Informe um valor numérico para buscar." };
  const index = hashOf(value, state.capacity);
  const frames: FrameSequence<HashState> = [
    {
      id: 0,
      state,
      pointers: { bucket: String(index) },
      narration: `hash(${value}) = ${index}. Procurando na cadeia do bucket ${index}...`,
    },
  ];

  for (const item of state.buckets[index]) {
    if (item.value === value) {
      frames.push({
        id: frames.length,
        state,
        highlights: [{ id: item.id, color: "success" }],
        pointers: { bucket: String(index) },
        narration: `Encontrado! ${value} está no bucket ${index}.`,
      });
      return { ok: true, frames, nextState: state };
    }
    frames.push({
      id: frames.length,
      state,
      highlights: [{ id: item.id, color: "compare" }],
      pointers: { bucket: String(index) },
      narration: `Comparando com ${item.value} na cadeia do bucket ${index}...`,
    });
  }

  frames.push({
    id: frames.length,
    state,
    pointers: { bucket: String(index) },
    narration: `${value} não está na tabela (cadeia do bucket ${index} percorrida inteira).`,
  });
  return { ok: true, frames, nextState: state };
}

export function hashRemove(state: HashState, value: number): OperationResult<HashState> {
  if (!Number.isFinite(value)) return { ok: false, error: "Informe um valor numérico válido." };
  const index = hashOf(value, state.capacity);
  const itemIndex = state.buckets[index].findIndex((item) => item.value === value);

  const frames: FrameSequence<HashState> = [
    {
      id: 0,
      state,
      pointers: { bucket: String(index) },
      narration: `hash(${value}) = ${index}. Procurando na cadeia do bucket ${index} para remover...`,
    },
  ];

  if (itemIndex === -1) {
    return { ok: false, error: `${value} não está na tabela.` };
  }

  const nextState = cloneHashState(state);
  const removedItem = nextState.buckets[index][itemIndex];
  frames.push({
    id: frames.length,
    state,
    highlights: [{ id: removedItem.id, color: "danger" }],
    pointers: { bucket: String(index) },
    narration: `Encontrado: ${value}. Removendo da cadeia do bucket ${index}.`,
  });

  nextState.buckets[index].splice(itemIndex, 1);
  frames.push({
    id: frames.length,
    state: nextState,
    pointers: { bucket: String(index) },
    narration: `${value} removido. Remoção é O(1) em média (poucos itens por bucket, com boa função de hash).`,
  });

  return { ok: true, frames, nextState };
}
