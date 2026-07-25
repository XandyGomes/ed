import type { LanguageSource } from "./bubbleSort.code";
import type { CodeLanguage } from "./languages";

export const MERGE_SORT_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `void mergeSort(int[] arr, int left, int right) {
    if (left >= right) return;
    int mid = (left + right) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

void merge(int[] arr, int left, int mid, int right) {
    int[] leftArr = Arrays.copyOfRange(arr, left, mid + 1);
    int[] rightArr = Arrays.copyOfRange(arr, mid + 1, right + 1);
    int i = 0, j = 0, k = left;
    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k++] = leftArr[i++];
        } else {
            arr[k++] = rightArr[j++];
        }
    }
    while (i < leftArr.length) arr[k++] = leftArr[i++];
    while (j < rightArr.length) arr[k++] = rightArr[j++];
    // subarray [left..right] intercalado
}
// array completo ordenado após mergeSort(arr, 0, arr.length - 1)`,
    lineFor: { start: 1, divide: 3, "merge-start": 10, "merge-done": 22, done: 24 },
  },
  python: {
    code: `def merge_sort(arr, left, right):
    if left >= right:
        return
    mid = (left + right) // 2
    merge_sort(arr, left, mid)
    merge_sort(arr, mid + 1, right)
    merge(arr, left, mid, right)

def merge(arr, left, mid, right):
    left_arr = arr[left:mid + 1]
    right_arr = arr[mid + 1:right + 1]
    i = j = 0
    k = left
    while i < len(left_arr) and j < len(right_arr):
        if left_arr[i] <= right_arr[j]:
            arr[k] = left_arr[i]
            i += 1
        else:
            arr[k] = right_arr[j]
            j += 1
        k += 1
    while i < len(left_arr):
        arr[k] = left_arr[i]
        i += 1
        k += 1
    while j < len(right_arr):
        arr[k] = right_arr[j]
        j += 1
        k += 1
    # subarray [left:right] intercalado
# array completo ordenado após merge_sort(arr, 0, len(arr) - 1)`,
    lineFor: { start: 1, divide: 4, "merge-start": 10, "merge-done": 30, done: 31 },
  },
  cpp: {
    code: `void mergeSort(vector<int>& arr, int left, int right) {
    if (left >= right) return;
    int mid = (left + right) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

void merge(vector<int>& arr, int left, int mid, int right) {
    vector<int> leftArr(arr.begin() + left, arr.begin() + mid + 1);
    vector<int> rightArr(arr.begin() + mid + 1, arr.begin() + right + 1);
    int i = 0, j = 0, k = left;
    while (i < leftArr.size() && j < rightArr.size()) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k++] = leftArr[i++];
        } else {
            arr[k++] = rightArr[j++];
        }
    }
    while (i < leftArr.size()) arr[k++] = leftArr[i++];
    while (j < rightArr.size()) arr[k++] = rightArr[j++];
    // subarray [left..right] intercalado
}
// array completo ordenado após mergeSort(arr, 0, arr.size() - 1)`,
    lineFor: { start: 1, divide: 3, "merge-start": 10, "merge-done": 22, done: 24 },
  },
  javascript: {
    code: `function mergeSort(arr, left, right) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

function merge(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;
    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k++] = leftArr[i++];
        } else {
            arr[k++] = rightArr[j++];
        }
    }
    while (i < leftArr.length) arr[k++] = leftArr[i++];
    while (j < rightArr.length) arr[k++] = rightArr[j++];
    // subarray [left..right] intercalado
}
// array completo ordenado após mergeSort(arr, 0, arr.length - 1)`,
    lineFor: { start: 1, divide: 3, "merge-start": 10, "merge-done": 22, done: 24 },
  },
};
