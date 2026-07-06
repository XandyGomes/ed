let counter = 0;

export function createId(): string {
  counter += 1;
  return `item-${counter}-${Math.random().toString(36).slice(2, 7)}`;
}
