import type { LanguageSource } from "./bubbleSort.code";
import type { CodeLanguage } from "./languages";

export const SELECTION_SORT_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
    // arr está ordenado
}`,
    lineFor: { start: 1, visit: 4, compare: 6, "new-min": 7, swap: 11, "position-final": 3, done: 14 },
  },
  python: {
    code: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr  # arr está ordenado`,
    lineFor: { start: 1, visit: 4, compare: 6, "new-min": 7, swap: 8, "position-final": 3, done: 9 },
  },
  cpp: {
    code: `void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        swap(arr[i], arr[minIdx]);
    }
    // arr está ordenado
}`,
    lineFor: { start: 1, visit: 4, compare: 6, "new-min": 7, swap: 10, "position-final": 3, done: 12 },
  },
  javascript: {
    code: `function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    return arr; // arr está ordenado
}`,
    lineFor: { start: 1, visit: 4, compare: 6, "new-min": 7, swap: 10, "position-final": 3, done: 12 },
  },
};
