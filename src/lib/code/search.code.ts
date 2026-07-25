import type { LanguageSource } from "./bubbleSort.code";
import type { CodeLanguage } from "./languages";

export const LINEAR_SEARCH_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
    lineFor: { start: 1, compare: 3, found: 4, "not-found": 7 },
  },
  python: {
    code: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
    lineFor: { start: 1, compare: 3, found: 4, "not-found": 5 },
  },
  cpp: {
    code: `int linearSearch(vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
    lineFor: { start: 1, compare: 3, found: 4, "not-found": 7 },
  },
  javascript: {
    code: `function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}`,
    lineFor: { start: 1, compare: 3, found: 4, "not-found": 7 },
  },
};

export const BINARY_SEARCH_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `public static int binarySearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}`,
    lineFor: { start: 1, compare: 5, found: 6, "go-right": 8, "go-left": 10, "not-found": 13 },
  },
  python: {
    code: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
    lineFor: { start: 1, compare: 5, found: 6, "go-right": 8, "go-left": 10, "not-found": 11 },
  },
  cpp: {
    code: `int binarySearch(vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}`,
    lineFor: { start: 1, compare: 5, found: 6, "go-right": 8, "go-left": 10, "not-found": 13 },
  },
  javascript: {
    code: `function binarySearch(arr, target) {
    let low = 0, high = arr.length - 1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}`,
    lineFor: { start: 1, compare: 5, found: 6, "go-right": 8, "go-left": 10, "not-found": 13 },
  },
};
