import type { LanguageSource } from "./bubbleSort.code";
import type { CodeLanguage } from "./languages";

export const LL_INSERT_HEAD_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `void insertHead(int value) {\n    No novo = new No(value);\n    novo.next = head;\n    head = novo;\n}`,
    lineFor: { create: 2, link: 4 },
  },
  python: {
    code: `def insert_head(self, value):\n    novo = No(value)\n    novo.next = self.head\n    self.head = novo`,
    lineFor: { create: 2, link: 4 },
  },
  cpp: {
    code: `void insertHead(int value) {\n    No* novo = new No(value);\n    novo->next = head;\n    head = novo;\n}`,
    lineFor: { create: 2, link: 4 },
  },
  javascript: {
    code: `insertHead(value) {\n    const novo = new No(value);\n    novo.next = this.head;\n    this.head = novo;\n}`,
    lineFor: { create: 2, link: 4 },
  },
};

export const LL_INSERT_TAIL_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `void insertTail(int value) {
    No novo = new No(value);
    if (head == null) {
        head = novo;
        return;
    }
    No atual = head;
    while (atual.next != null) {
        atual = atual.next;
    }
    atual.next = novo;
}`,
    lineFor: { empty: 4, start: 7, "reach-tail": 8, traverse: 9, link: 11 },
  },
  python: {
    code: `def insert_tail(self, value):
    novo = No(value)
    if self.head is None:
        self.head = novo
        return
    atual = self.head
    while atual.next is not None:
        atual = atual.next
    atual.next = novo`,
    lineFor: { empty: 4, start: 6, "reach-tail": 7, traverse: 8, link: 9 },
  },
  cpp: {
    code: `void insertTail(int value) {
    No* novo = new No(value);
    if (head == nullptr) {
        head = novo;
        return;
    }
    No* atual = head;
    while (atual->next != nullptr) {
        atual = atual->next;
    }
    atual->next = novo;
}`,
    lineFor: { empty: 4, start: 7, "reach-tail": 8, traverse: 9, link: 11 },
  },
  javascript: {
    code: `insertTail(value) {
    const novo = new No(value);
    if (this.head === null) {
        this.head = novo;
        return;
    }
    let atual = this.head;
    while (atual.next !== null) {
        atual = atual.next;
    }
    atual.next = novo;
}`,
    lineFor: { empty: 4, start: 7, "reach-tail": 8, traverse: 9, link: 11 },
  },
};

export const LL_REMOVE_HEAD_CODE: Record<CodeLanguage, LanguageSource> = {
  java: { code: `void removeHead() {\n    head = head.next;\n}`, lineFor: { identify: 2, remove: 2 } },
  python: { code: `def remove_head(self):\n    self.head = self.head.next`, lineFor: { identify: 2, remove: 2 } },
  cpp: {
    code: `void removeHead() {\n    No* antigo = head;\n    head = head->next;\n    delete antigo;\n}`,
    lineFor: { identify: 2, remove: 3 },
  },
  javascript: { code: `removeHead() {\n    this.head = this.head.next;\n}`, lineFor: { identify: 2, remove: 2 } },
};

export const LL_SEARCH_CODE: Record<CodeLanguage, LanguageSource> = {
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
