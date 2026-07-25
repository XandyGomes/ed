import type { LanguageSource } from "./bubbleSort.code";
import type { CodeLanguage } from "./languages";

export const FATORIAL_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `public static int fatorial(int n) {
    if (n == 0) {
        return 1;
    }
    return n * fatorial(n - 1);
}`,
    lineFor: { call: 5, base: 3, return: 5 },
  },
  python: {
    code: `def fatorial(n):
    if n == 0:
        return 1
    return n * fatorial(n - 1)`,
    lineFor: { call: 4, base: 3, return: 4 },
  },
  cpp: {
    code: `int fatorial(int n) {
    if (n == 0) {
        return 1;
    }
    return n * fatorial(n - 1);
}`,
    lineFor: { call: 5, base: 3, return: 5 },
  },
  javascript: {
    code: `function fatorial(n) {
    if (n === 0) {
        return 1;
    }
    return n * fatorial(n - 1);
}`,
    lineFor: { call: 5, base: 3, return: 5 },
  },
};
