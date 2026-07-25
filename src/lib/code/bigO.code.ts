import type { LanguageSource } from "./bubbleSort.code";
import type { CodeLanguage } from "./languages";

export const BIG_O_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `// O(1): tempo constante, não depende de n
int primeiro(int[] arr) {
    return arr[0];
}

// O(log n): divide o problema pela metade a cada passo
int buscaBinaria(int[] arr, int alvo) {
    // ver o tópico Busca Binária
}

// O(n): percorre todos os elementos uma vez
int soma(int[] arr) {
    int total = 0;
    for (int x : arr) total += x;
    return total;
}

// O(n log n): ordenação eficiente (merge sort, quick sort)
void ordenar(int[] arr) {
    // ver os tópicos Merge Sort e Quick Sort
}

// O(n²): comparar cada elemento com todos os outros
boolean temDuplicado(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
        for (int j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) return true;
        }
    }
    return false;
}`,
    lineFor: {},
  },
  python: {
    code: `# O(1): tempo constante, não depende de n
def primeiro(arr):
    return arr[0]

# O(log n): divide o problema pela metade a cada passo
def busca_binaria(arr, alvo):
    pass  # ver o tópico Busca Binária

# O(n): percorre todos os elementos uma vez
def soma(arr):
    total = 0
    for x in arr:
        total += x
    return total

# O(n log n): ordenação eficiente (merge sort, quick sort)
def ordenar(arr):
    pass  # ver os tópicos Merge Sort e Quick Sort

# O(n²): comparar cada elemento com todos os outros
def tem_duplicado(arr):
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] == arr[j]:
                return True
    return False`,
    lineFor: {},
  },
  cpp: {
    code: `// O(1): tempo constante, não depende de n
int primeiro(vector<int>& arr) {
    return arr[0];
}

// O(log n): divide o problema pela metade a cada passo
int buscaBinaria(vector<int>& arr, int alvo) {
    // ver o tópico Busca Binária
}

// O(n): percorre todos os elementos uma vez
int soma(vector<int>& arr) {
    int total = 0;
    for (int x : arr) total += x;
    return total;
}

// O(n log n): ordenação eficiente (merge sort, quick sort)
void ordenar(vector<int>& arr) {
    // ver os tópicos Merge Sort e Quick Sort
}

// O(n²): comparar cada elemento com todos os outros
bool temDuplicado(vector<int>& arr) {
    for (int i = 0; i < arr.size(); i++) {
        for (int j = i + 1; j < arr.size(); j++) {
            if (arr[i] == arr[j]) return true;
        }
    }
    return false;
}`,
    lineFor: {},
  },
  javascript: {
    code: `// O(1): tempo constante, não depende de n
function primeiro(arr) {
    return arr[0];
}

// O(log n): divide o problema pela metade a cada passo
function buscaBinaria(arr, alvo) {
    // ver o tópico Busca Binária
}

// O(n): percorre todos os elementos uma vez
function soma(arr) {
    let total = 0;
    for (const x of arr) total += x;
    return total;
}

// O(n log n): ordenação eficiente (merge sort, quick sort)
function ordenar(arr) {
    // ver os tópicos Merge Sort e Quick Sort
}

// O(n²): comparar cada elemento com todos os outros
function temDuplicado(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) return true;
        }
    }
    return false;
}`,
    lineFor: {},
  },
};
