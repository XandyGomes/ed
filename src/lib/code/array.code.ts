import type { LanguageSource } from "./bubbleSort.code";
import type { CodeLanguage } from "./languages";

export const ARRAY_ACCESS_CODE: Record<CodeLanguage, LanguageSource> = {
  java: { code: `public static int access(int[] arr, int index) {\n    return arr[index];\n}`, lineFor: { access: 2, done: 2 } },
  python: { code: `def access(arr, index):\n    return arr[index]`, lineFor: { access: 2, done: 2 } },
  cpp: { code: `int access(vector<int>& arr, int index) {\n    return arr[index];\n}`, lineFor: { access: 2, done: 2 } },
  javascript: { code: `function access(arr, index) {\n    return arr[index];\n}`, lineFor: { access: 2, done: 2 } },
};

export const ARRAY_INSERT_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `public static void insertAt(int[] arr, int index, int value) {
    for (int i = arr.length - 1; i > index; i--) {
        arr[i] = arr[i - 1];
    }
    arr[index] = value;
}`,
    lineFor: { prepare: 2, insert: 5 },
  },
  python: {
    code: `def insert_at(arr, index, value):
    arr.append(None)
    for i in range(len(arr) - 1, index, -1):
        arr[i] = arr[i - 1]
    arr[index] = value`,
    lineFor: { prepare: 3, insert: 5 },
  },
  cpp: {
    code: `void insertAt(vector<int>& arr, int index, int value) {
    arr.push_back(0);
    for (int i = arr.size() - 1; i > index; i--) {
        arr[i] = arr[i - 1];
    }
    arr[index] = value;
}`,
    lineFor: { prepare: 3, insert: 6 },
  },
  javascript: {
    code: `function insertAt(arr, index, value) {
    for (let i = arr.length - 1; i > index; i--) {
        arr[i] = arr[i - 1];
    }
    arr[index] = value;
}`,
    lineFor: { prepare: 2, insert: 5 },
  },
};

export const ARRAY_REMOVE_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `public static void removeAt(int[] arr, int index) {
    for (int i = index; i < arr.length - 1; i++) {
        arr[i] = arr[i + 1];
    }
}`,
    lineFor: { remove: 2, shift: 3 },
  },
  python: {
    code: `def remove_at(arr, index):
    for i in range(index, len(arr) - 1):
        arr[i] = arr[i + 1]
    arr.pop()`,
    lineFor: { remove: 2, shift: 3 },
  },
  cpp: {
    code: `void removeAt(vector<int>& arr, int index) {
    for (int i = index; i < arr.size() - 1; i++) {
        arr[i] = arr[i + 1];
    }
    arr.pop_back();
}`,
    lineFor: { remove: 2, shift: 3 },
  },
  javascript: {
    code: `function removeAt(arr, index) {
    for (let i = index; i < arr.length - 1; i++) {
        arr[i] = arr[i + 1];
    }
    arr.pop();
}`,
    lineFor: { remove: 2, shift: 3 },
  },
};
