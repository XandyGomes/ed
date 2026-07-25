import type { LanguageSource } from "./bubbleSort.code";
import type { CodeLanguage } from "./languages";

export const DEQUE_INSERT_FRONT_CODE: Record<CodeLanguage, LanguageSource> = {
  java: { code: `public void insertFront(int value) {\n    deque.addFirst(value);\n}`, lineFor: { prepare: 1, insert: 2 } },
  python: { code: `def insert_front(self, value):\n    self.deque.appendleft(value)`, lineFor: { prepare: 1, insert: 2 } },
  cpp: { code: `void insertFront(int value) {\n    deque.push_front(value);\n}`, lineFor: { prepare: 1, insert: 2 } },
  javascript: { code: `function insertFront(value) {\n    deque.unshift(value);\n}`, lineFor: { prepare: 1, insert: 2 } },
};

export const DEQUE_INSERT_BACK_CODE: Record<CodeLanguage, LanguageSource> = {
  java: { code: `public void insertBack(int value) {\n    deque.addLast(value);\n}`, lineFor: { prepare: 1, insert: 2 } },
  python: { code: `def insert_back(self, value):\n    self.deque.append(value)`, lineFor: { prepare: 1, insert: 2 } },
  cpp: { code: `void insertBack(int value) {\n    deque.push_back(value);\n}`, lineFor: { prepare: 1, insert: 2 } },
  javascript: { code: `function insertBack(value) {\n    deque.push(value);\n}`, lineFor: { prepare: 1, insert: 2 } },
};

export const DEQUE_REMOVE_FRONT_CODE: Record<CodeLanguage, LanguageSource> = {
  java: { code: `public int removeFront() {\n    return deque.removeFirst();\n}`, lineFor: { identify: 2, remove: 2 } },
  python: { code: `def remove_front(self):\n    return self.deque.popleft()`, lineFor: { identify: 2, remove: 2 } },
  cpp: {
    code: `int removeFront() {\n    int value = deque.front();\n    deque.pop_front();\n    return value;\n}`,
    lineFor: { identify: 2, remove: 3 },
  },
  javascript: { code: `function removeFront() {\n    return deque.shift();\n}`, lineFor: { identify: 2, remove: 2 } },
};

export const DEQUE_REMOVE_BACK_CODE: Record<CodeLanguage, LanguageSource> = {
  java: { code: `public int removeBack() {\n    return deque.removeLast();\n}`, lineFor: { identify: 2, remove: 2 } },
  python: { code: `def remove_back(self):\n    return self.deque.pop()`, lineFor: { identify: 2, remove: 2 } },
  cpp: {
    code: `int removeBack() {\n    int value = deque.back();\n    deque.pop_back();\n    return value;\n}`,
    lineFor: { identify: 2, remove: 3 },
  },
  javascript: { code: `function removeBack() {\n    return deque.pop();\n}`, lineFor: { identify: 2, remove: 2 } },
};
