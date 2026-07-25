export type CodeLanguage = "java" | "python" | "cpp" | "javascript";

export const LANGUAGE_LABEL: Record<CodeLanguage, string> = {
  java: "Java",
  python: "Python",
  cpp: "C++",
  javascript: "JavaScript",
};

export type LanguageSource = {
  code: string;
  lineFor: Record<string, number>;
};

export const BUBBLE_SORT_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    // arr está ordenado
}`,
    lineFor: { start: 1, compare: 6, swap: 8, "position-final": 13, done: 16 },
  },
  python: {
    code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr  # arr está ordenado`,
    lineFor: { start: 1, compare: 6, swap: 7, "position-final": 9, done: 11 },
  },
  cpp: {
    code: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    // arr está ordenado
}`,
    lineFor: { start: 1, compare: 6, swap: 7, "position-final": 11, done: 13 },
  },
  javascript: {
    code: `function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return arr; // arr está ordenado
}`,
    lineFor: { start: 1, compare: 6, swap: 7, "position-final": 11, done: 13 },
  },
};
