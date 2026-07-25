import type { LanguageSource } from "./bubbleSort.code";
import type { CodeLanguage } from "./languages";

export const DLL_INSERT_HEAD_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `void insertHead(int value) {
    No novo = new No(value);
    novo.next = head;
    if (head != null) {
        head.prev = novo;
    }
    head = novo;
}`,
    lineFor: { create: 2, link: 7 },
  },
  python: {
    code: `def insert_head(self, value):
    novo = No(value)
    novo.next = self.head
    if self.head is not None:
        self.head.prev = novo
    self.head = novo`,
    lineFor: { create: 2, link: 6 },
  },
  cpp: {
    code: `void insertHead(int value) {
    No* novo = new No(value);
    novo->next = head;
    if (head != nullptr) {
        head->prev = novo;
    }
    head = novo;
}`,
    lineFor: { create: 2, link: 7 },
  },
  javascript: {
    code: `insertHead(value) {
    const novo = new No(value);
    novo.next = this.head;
    if (this.head !== null) {
        this.head.prev = novo;
    }
    this.head = novo;
}`,
    lineFor: { create: 2, link: 7 },
  },
};

export const DLL_INSERT_TAIL_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `void insertTail(int value) {
    No novo = new No(value);
    novo.prev = tail;
    if (tail != null) {
        tail.next = novo;
    }
    tail = novo;
}`,
    lineFor: { start: 3, link: 7 },
  },
  python: {
    code: `def insert_tail(self, value):
    novo = No(value)
    novo.prev = self.tail
    if self.tail is not None:
        self.tail.next = novo
    self.tail = novo`,
    lineFor: { start: 3, link: 6 },
  },
  cpp: {
    code: `void insertTail(int value) {
    No* novo = new No(value);
    novo->prev = tail;
    if (tail != nullptr) {
        tail->next = novo;
    }
    tail = novo;
}`,
    lineFor: { start: 3, link: 7 },
  },
  javascript: {
    code: `insertTail(value) {
    const novo = new No(value);
    novo.prev = this.tail;
    if (this.tail !== null) {
        this.tail.next = novo;
    }
    this.tail = novo;
}`,
    lineFor: { start: 3, link: 7 },
  },
};

export const DLL_REMOVE_HEAD_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `void removeHead() {\n    head = head.next;\n    if (head != null) {\n        head.prev = null;\n    }\n}`,
    lineFor: { identify: 2, remove: 4 },
  },
  python: {
    code: `def remove_head(self):\n    self.head = self.head.next\n    if self.head is not None:\n        self.head.prev = None`,
    lineFor: { identify: 2, remove: 4 },
  },
  cpp: {
    code: `void removeHead() {\n    head = head->next;\n    if (head != nullptr) {\n        head->prev = nullptr;\n    }\n}`,
    lineFor: { identify: 2, remove: 4 },
  },
  javascript: {
    code: `removeHead() {\n    this.head = this.head.next;\n    if (this.head !== null) {\n        this.head.prev = null;\n    }\n}`,
    lineFor: { identify: 2, remove: 4 },
  },
};

export const DLL_REMOVE_TAIL_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `void removeTail() {\n    tail = tail.prev;\n    if (tail != null) {\n        tail.next = null;\n    }\n}`,
    lineFor: { identify: 2, remove: 4 },
  },
  python: {
    code: `def remove_tail(self):\n    self.tail = self.tail.prev\n    if self.tail is not None:\n        self.tail.next = None`,
    lineFor: { identify: 2, remove: 4 },
  },
  cpp: {
    code: `void removeTail() {\n    tail = tail->prev;\n    if (tail != nullptr) {\n        tail->next = nullptr;\n    }\n}`,
    lineFor: { identify: 2, remove: 4 },
  },
  javascript: {
    code: `removeTail() {\n    this.tail = this.tail.prev;\n    if (this.tail !== null) {\n        this.tail.next = null;\n    }\n}`,
    lineFor: { identify: 2, remove: 4 },
  },
};

export const DLL_SEARCH_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `boolean search(int alvo) {
    No atual = head;
    while (atual != null) {
        if (atual.value == alvo) {
            return true;
        }
        atual = atual.next;
    }
    return false;
}`,
    lineFor: { start: 2, compare: 4, found: 5, "not-found": 9 },
  },
  python: {
    code: `def search(self, alvo):
    atual = self.head
    while atual is not None:
        if atual.value == alvo:
            return True
        atual = atual.next
    return False`,
    lineFor: { start: 2, compare: 4, found: 5, "not-found": 7 },
  },
  cpp: {
    code: `bool search(int alvo) {
    No* atual = head;
    while (atual != nullptr) {
        if (atual->value == alvo) {
            return true;
        }
        atual = atual->next;
    }
    return false;
}`,
    lineFor: { start: 2, compare: 4, found: 5, "not-found": 9 },
  },
  javascript: {
    code: `search(alvo) {
    let atual = this.head;
    while (atual !== null) {
        if (atual.value === alvo) {
            return true;
        }
        atual = atual.next;
    }
    return false;
}`,
    lineFor: { start: 2, compare: 4, found: 5, "not-found": 9 },
  },
};
