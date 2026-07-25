import type { LanguageSource } from "./bubbleSort.code";
import type { CodeLanguage } from "./languages";

export const HASH_INSERT_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `void insert(int value) {
    int index = hash(value);
    for (int v : buckets[index]) {
        if (v == value) return;
    }
    if (!buckets[index].isEmpty()) {
        // colisão: encadeia no final da lista
    }
    buckets[index].add(value);
}

int hash(int value) {
    return ((value % capacity) + capacity) % capacity;
}`,
    lineFor: { "compute-hash": 13, collision: 6, insert: 9 },
  },
  python: {
    code: `def insert(self, value):
    index = self.hash(value)
    if value in self.buckets[index]:
        return
    if self.buckets[index]:
        pass  # colisão: encadeia no final da lista
    self.buckets[index].append(value)

def hash(self, value):
    return value % self.capacity`,
    lineFor: { "compute-hash": 10, collision: 6, insert: 7 },
  },
  cpp: {
    code: `void insert(int value) {
    int index = hash(value);
    for (int v : buckets[index]) {
        if (v == value) return;
    }
    if (!buckets[index].empty()) {
        // colisão: encadeia no final da lista
    }
    buckets[index].push_back(value);
}

int hash(int value) {
    return ((value % capacity) + capacity) % capacity;
}`,
    lineFor: { "compute-hash": 13, collision: 6, insert: 9 },
  },
  javascript: {
    code: `insert(value) {
    const index = this.hash(value);
    if (this.buckets[index].includes(value)) {
        return;
    }
    if (this.buckets[index].length > 0) {
        // colisão: encadeia no final da lista
    }
    this.buckets[index].push(value);
}

hash(value) {
    return ((value % this.capacity) + this.capacity) % this.capacity;
}`,
    lineFor: { "compute-hash": 13, collision: 6, insert: 9 },
  },
};

export const HASH_SEARCH_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `boolean search(int value) {
    int index = hash(value);
    for (int v : buckets[index]) {
        if (v == value) {
            return true;
        }
    }
    return false;
}`,
    lineFor: { "compute-hash": 2, compare: 4, found: 5, "not-found": 8 },
  },
  python: {
    code: `def search(self, value):
    index = self.hash(value)
    for v in self.buckets[index]:
        if v == value:
            return True
    return False`,
    lineFor: { "compute-hash": 2, compare: 4, found: 5, "not-found": 6 },
  },
  cpp: {
    code: `bool search(int value) {
    int index = hash(value);
    for (int v : buckets[index]) {
        if (v == value) {
            return true;
        }
    }
    return false;
}`,
    lineFor: { "compute-hash": 2, compare: 4, found: 5, "not-found": 8 },
  },
  javascript: {
    code: `search(value) {
    const index = this.hash(value);
    for (const v of this.buckets[index]) {
        if (v === value) {
            return true;
        }
    }
    return false;
}`,
    lineFor: { "compute-hash": 2, compare: 4, found: 5, "not-found": 8 },
  },
};

export const HASH_REMOVE_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `boolean remove(int value) {
    int index = hash(value);
    for (int i = 0; i < buckets[index].size(); i++) {
        if (buckets[index].get(i) == value) {
            buckets[index].remove(i);
            return true;
        }
    }
    return false;
}`,
    lineFor: { "compute-hash": 2, "target-found": 4, remove: 5 },
  },
  python: {
    code: `def remove(self, value):
    index = self.hash(value)
    for i, v in enumerate(self.buckets[index]):
        if v == value:
            del self.buckets[index][i]
            return True
    return False`,
    lineFor: { "compute-hash": 2, "target-found": 4, remove: 5 },
  },
  cpp: {
    code: `bool remove(int value) {
    int index = hash(value);
    for (int i = 0; i < buckets[index].size(); i++) {
        if (buckets[index][i] == value) {
            buckets[index].erase(buckets[index].begin() + i);
            return true;
        }
    }
    return false;
}`,
    lineFor: { "compute-hash": 2, "target-found": 4, remove: 5 },
  },
  javascript: {
    code: `remove(value) {
    const index = this.hash(value);
    for (let i = 0; i < this.buckets[index].length; i++) {
        if (this.buckets[index][i] === value) {
            this.buckets[index].splice(i, 1);
            return true;
        }
    }
    return false;
}`,
    lineFor: { "compute-hash": 2, "target-found": 4, remove: 5 },
  },
};
