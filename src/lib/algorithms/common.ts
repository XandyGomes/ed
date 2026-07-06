import { createId } from "@/lib/id";
import type { ArrayState } from "@/lib/types";

export function makeArrayState(values: number[]): ArrayState {
  return { items: values.map((value) => ({ id: createId(), value })) };
}

export function cloneArrayState(state: ArrayState): ArrayState {
  return { items: state.items.map((item) => ({ ...item })) };
}
