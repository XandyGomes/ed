import type { LanguageSource } from "./bubbleSort.code";
import type { CodeLanguage } from "./languages";

export const STACK_PUSH_CODE: Record<CodeLanguage, LanguageSource> = {
  java: { code: `public void push(int value) {\n    top++;\n    stack[top] = value;\n}`, lineFor: { prepare: 1, push: 3 } },
  python: { code: `def push(self, value):\n    self.stack.append(value)`, lineFor: { prepare: 1, push: 2 } },
  cpp: { code: `void push(int value) {\n    stack.push_back(value);\n}`, lineFor: { prepare: 1, push: 2 } },
  javascript: { code: `function push(value) {\n    stack.push(value);\n}`, lineFor: { prepare: 1, push: 2 } },
};

export const STACK_POP_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `public int pop() {\n    int value = stack[top];\n    top--;\n    return value;\n}`,
    lineFor: { identify: 2, pop: 3 },
  },
  python: {
    code: `def pop(self):\n    value = self.stack[-1]\n    del self.stack[-1]\n    return value`,
    lineFor: { identify: 2, pop: 3 },
  },
  cpp: {
    code: `int pop() {\n    int value = stack.back();\n    stack.pop_back();\n    return value;\n}`,
    lineFor: { identify: 2, pop: 3 },
  },
  javascript: { code: `function pop() {\n    return stack.pop();\n}`, lineFor: { identify: 2, pop: 2 } },
};

export const STACK_PEEK_CODE: Record<CodeLanguage, LanguageSource> = {
  java: { code: `public int peek() {\n    return stack[top];\n}`, lineFor: { peek: 2 } },
  python: { code: `def peek(self):\n    return self.stack[-1]`, lineFor: { peek: 2 } },
  cpp: { code: `int peek() {\n    return stack.back();\n}`, lineFor: { peek: 2 } },
  javascript: { code: `function peek() {\n    return stack[stack.length - 1];\n}`, lineFor: { peek: 2 } },
};
