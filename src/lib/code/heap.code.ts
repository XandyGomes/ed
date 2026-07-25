import type { LanguageSource } from "./bubbleSort.code";
import type { CodeLanguage } from "./languages";

export const HEAP_INSERT_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `void insert(int value) {
    heap.add(value);
    int i = heap.size() - 1;
    while (i > 0) {
        int p = parent(i);
        if (heap.get(p) <= heap.get(i)) {
            break;
        }
        swap(i, p);
        i = p;
    }
}`,
    lineFor: { append: 2, "sift-start": 4, compare: 6, restored: 7, swap: 9 },
  },
  python: {
    code: `def insert(self, value):
    self.heap.append(value)
    i = len(self.heap) - 1
    while i > 0:
        p = self.parent(i)
        if self.heap[p] <= self.heap[i]:
            break
        self.swap(i, p)
        i = p`,
    lineFor: { append: 2, "sift-start": 4, compare: 6, restored: 7, swap: 8 },
  },
  cpp: {
    code: `void insert(int value) {
    heap.push_back(value);
    int i = heap.size() - 1;
    while (i > 0) {
        int p = parent(i);
        if (heap[p] <= heap[i]) {
            break;
        }
        swap(heap[i], heap[p]);
        i = p;
    }
}`,
    lineFor: { append: 2, "sift-start": 4, compare: 6, restored: 7, swap: 9 },
  },
  javascript: {
    code: `insert(value) {
    this.heap.push(value);
    let i = this.heap.length - 1;
    while (i > 0) {
        const p = this.parent(i);
        if (this.heap[p] <= this.heap[i]) {
            break;
        }
        [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
        i = p;
    }
}`,
    lineFor: { append: 2, "sift-start": 4, compare: 6, restored: 7, swap: 9 },
  },
};

export const HEAP_EXTRACT_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `int extractMin() {
    int min = heap.get(0);
    int last = heap.remove(heap.size() - 1);
    if (heap.isEmpty()) {
        return min;
    }
    heap.set(0, last);
    int i = 0;
    while (true) {
        int menor = i;
        int esq = 2 * i + 1, dir = 2 * i + 2;
        if (esq < heap.size() && heap.get(esq) < heap.get(menor)) menor = esq;
        if (dir < heap.size() && heap.get(dir) < heap.get(menor)) menor = dir;
        if (menor == i) {
            break;
        }
        swap(i, menor);
        i = menor;
    }
    return min;
}`,
    lineFor: { "remove-root": 2, empty: 5, "move-last": 7, "sift-start": 9, compare: 13, restored: 15, swap: 17 },
  },
  python: {
    code: `def extract_min(self):
    minimo = self.heap[0]
    ultimo = self.heap.pop()
    if not self.heap:
        return minimo
    self.heap[0] = ultimo
    i = 0
    while True:
        menor = i
        esq, dir = 2 * i + 1, 2 * i + 2
        if esq < len(self.heap) and self.heap[esq] < self.heap[menor]:
            menor = esq
        if dir < len(self.heap) and self.heap[dir] < self.heap[menor]:
            menor = dir
        if menor == i:
            break
        self.swap(i, menor)
        i = menor
    return minimo`,
    lineFor: { "remove-root": 2, empty: 5, "move-last": 6, "sift-start": 8, compare: 14, restored: 16, swap: 17 },
  },
  cpp: {
    code: `int extractMin() {
    int minimo = heap[0];
    int ultimo = heap.back();
    heap.pop_back();
    if (heap.empty()) {
        return minimo;
    }
    heap[0] = ultimo;
    int i = 0;
    while (true) {
        int menor = i;
        int esq = 2 * i + 1, dir = 2 * i + 2;
        if (esq < heap.size() && heap[esq] < heap[menor]) menor = esq;
        if (dir < heap.size() && heap[dir] < heap[menor]) menor = dir;
        if (menor == i) {
            break;
        }
        swap(heap[i], heap[menor]);
        i = menor;
    }
    return minimo;
}`,
    lineFor: { "remove-root": 2, empty: 6, "move-last": 8, "sift-start": 10, compare: 14, restored: 16, swap: 18 },
  },
  javascript: {
    code: `extractMin() {
    const minimo = this.heap[0];
    const ultimo = this.heap.pop();
    if (this.heap.length === 0) {
        return minimo;
    }
    this.heap[0] = ultimo;
    let i = 0;
    while (true) {
        let menor = i;
        const esq = 2 * i + 1, dir = 2 * i + 2;
        if (esq < this.heap.length && this.heap[esq] < this.heap[menor]) menor = esq;
        if (dir < this.heap.length && this.heap[dir] < this.heap[menor]) menor = dir;
        if (menor === i) {
            break;
        }
        this.swap(i, menor);
        i = menor;
    }
    return minimo;
}`,
    lineFor: { "remove-root": 2, empty: 5, "move-last": 7, "sift-start": 9, compare: 13, restored: 15, swap: 17 },
  },
};
