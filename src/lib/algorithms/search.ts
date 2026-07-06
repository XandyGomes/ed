import type { ArrayState, FrameSequence, OperationResult } from "@/lib/types";

export function linearSearch(state: ArrayState, target: number): OperationResult<ArrayState> {
  if (!Number.isFinite(target)) {
    return { ok: false, error: "Informe um valor numérico para buscar." };
  }
  const frames: FrameSequence<ArrayState> = [
    { id: 0, state, narration: `Buscando o valor ${target}, começando do início do array.` },
  ];

  for (let i = 0; i < state.items.length; i++) {
    const item = state.items[i];
    if (item.value === target) {
      frames.push({
        id: frames.length,
        state,
        highlights: [{ id: item.id, color: "success" }],
        narration: `array[${i}] = ${item.value}. Encontrado após examinar ${i + 1} elemento(s).`,
      });
      return { ok: true, frames, nextState: state };
    }
    frames.push({
      id: frames.length,
      state,
      highlights: [{ id: item.id, color: "compare" }],
      narration: `array[${i}] = ${item.value} ≠ ${target}. Continuando...`,
    });
  }

  frames.push({
    id: frames.length,
    state,
    narration: `Valor ${target} não encontrado. Percorremos todos os ${state.items.length} elementos, pior caso O(n).`,
  });
  return { ok: true, frames, nextState: state };
}

export function binarySearch(state: ArrayState, target: number): OperationResult<ArrayState> {
  if (!Number.isFinite(target)) {
    return { ok: false, error: "Informe um valor numérico para buscar." };
  }
  const sorted = [...state.items].every(
    (item, i, arr) => i === 0 || arr[i - 1].value <= item.value
  );
  if (!sorted) {
    return { ok: false, error: "A busca binária exige um array ordenado." };
  }

  const frames: FrameSequence<ArrayState> = [
    {
      id: 0,
      state,
      narration: `Buscando ${target} com busca binária (o array precisa estar ordenado).`,
    },
  ];

  let low = 0;
  let high = state.items.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midItem = state.items[mid];
    const pointers: Record<string, string> = {
      baixo: state.items[low].id,
      alto: state.items[high].id,
      meio: midItem.id,
    };

    if (midItem.value === target) {
      frames.push({
        id: frames.length,
        state,
        highlights: [{ id: midItem.id, color: "success" }],
        pointers,
        narration: `meio = ${mid} → array[${mid}] = ${midItem.value}. Encontrado!`,
      });
      return { ok: true, frames, nextState: state };
    }

    frames.push({
      id: frames.length,
      state,
      highlights: [{ id: midItem.id, color: "compare" }],
      pointers,
      narration: `meio = ${mid} → array[${mid}] = ${midItem.value}. Comparando com ${target}...`,
    });

    if (midItem.value < target) {
      frames.push({
        id: frames.length,
        state,
        pointers,
        narration: `${midItem.value} < ${target}: descartamos a metade esquerda. Novo baixo = ${mid + 1}.`,
      });
      low = mid + 1;
    } else {
      frames.push({
        id: frames.length,
        state,
        pointers,
        narration: `${midItem.value} > ${target}: descartamos a metade direita. Novo alto = ${mid - 1}.`,
      });
      high = mid - 1;
    }
  }

  frames.push({
    id: frames.length,
    state,
    narration: `Valor ${target} não encontrado. A cada passo eliminamos metade do array, O(log n).`,
  });
  return { ok: true, frames, nextState: state };
}
