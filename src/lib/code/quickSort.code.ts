import type { LanguageSource } from "./bubbleSort.code";
import type { CodeLanguage } from "./languages";

export const QUICK_SORT_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int p = partition(arr, low, high);
        quickSort(arr, low, p - 1);
        quickSort(arr, p + 1, high);
    }
}

int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}
// arr está ordenado após quickSort(arr, 0, arr.length - 1)`,
    lineFor: { start: 1, pivot: 10, compare: 13, swap: 16, "position-final": 21, done: 25 },
  },
  python: {
    code: `def quick_sort(arr, low, high):
    if low < high:
        p = partition(arr, low, high)
        quick_sort(arr, low, p - 1)
        quick_sort(arr, p + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
# arr está ordenado após quick_sort(arr, 0, len(arr) - 1)`,
    lineFor: { start: 1, pivot: 8, compare: 11, swap: 13, "position-final": 14, done: 16 },
  },
  cpp: {
    code: `void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int p = partition(arr, low, high);
        quickSort(arr, low, p - 1);
        quickSort(arr, p + 1, high);
    }
}

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}
// arr está ordenado após quickSort(arr, 0, arr.size() - 1)`,
    lineFor: { start: 1, pivot: 10, compare: 13, swap: 15, "position-final": 18, done: 21 },
  },
  javascript: {
    code: `function quickSort(arr, low, high) {
    if (low < high) {
        const p = partition(arr, low, high);
        quickSort(arr, low, p - 1);
        quickSort(arr, p + 1, high);
    }
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}
// arr está ordenado após quickSort(arr, 0, arr.length - 1)`,
    lineFor: { start: 1, pivot: 10, compare: 13, swap: 15, "position-final": 18, done: 21 },
  },
};
