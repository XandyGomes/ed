import type { LanguageSource } from "./bubbleSort.code";
import type { CodeLanguage } from "./languages";

export const QUEUE_ENQUEUE_CODE: Record<CodeLanguage, LanguageSource> = {
  java: { code: `public void enqueue(int value) {\n    queue.add(value);\n}`, lineFor: { prepare: 1, enqueue: 2 } },
  python: { code: `def enqueue(self, value):\n    self.queue.append(value)`, lineFor: { prepare: 1, enqueue: 2 } },
  cpp: { code: `void enqueue(int value) {\n    queue.push_back(value);\n}`, lineFor: { prepare: 1, enqueue: 2 } },
  javascript: { code: `function enqueue(value) {\n    queue.push(value);\n}`, lineFor: { prepare: 1, enqueue: 2 } },
};

export const QUEUE_DEQUEUE_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `public int dequeue() {\n    int value = queue.get(0);\n    queue.remove(0);\n    return value;\n}`,
    lineFor: { identify: 2, dequeue: 3 },
  },
  python: {
    code: `def dequeue(self):\n    value = self.queue[0]\n    del self.queue[0]\n    return value`,
    lineFor: { identify: 2, dequeue: 3 },
  },
  cpp: {
    code: `int dequeue() {\n    int value = queue.front();\n    queue.pop_front();\n    return value;\n}`,
    lineFor: { identify: 2, dequeue: 3 },
  },
  javascript: { code: `function dequeue() {\n    return queue.shift();\n}`, lineFor: { identify: 2, dequeue: 2 } },
};
