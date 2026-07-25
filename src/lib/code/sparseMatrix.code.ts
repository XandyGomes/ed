import type { LanguageSource } from "./bubbleSort.code";
import type { CodeLanguage } from "./languages";

export const SPARSE_MATRIX_GERAR_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `List<int[]> gerarRepresentacaoEsparsa(int[][] matriz) {
    List<int[]> esparsa = new ArrayList<>();
    for (int r = 0; r < matriz.length; r++) {
        for (int c = 0; c < matriz[r].length; c++) {
            if (matriz[r][c] != 0) {
                esparsa.add(new int[]{ r, c, matriz[r][c] });
            }
        }
    }
    return esparsa;
}`,
    lineFor: { start: 1, "check-zero": 5, "check-nonzero": 6, done: 10 },
  },
  python: {
    code: `def gerar_representacao_esparsa(matriz):
    esparsa = []
    for r in range(len(matriz)):
        for c in range(len(matriz[r])):
            if matriz[r][c] != 0:
                esparsa.append((r, c, matriz[r][c]))
    return esparsa`,
    lineFor: { start: 1, "check-zero": 5, "check-nonzero": 6, done: 7 },
  },
  cpp: {
    code: `vector<array<int,3>> gerarRepresentacaoEsparsa(vector<vector<int>>& matriz) {
    vector<array<int,3>> esparsa;
    for (int r = 0; r < matriz.size(); r++) {
        for (int c = 0; c < matriz[r].size(); c++) {
            if (matriz[r][c] != 0) {
                esparsa.push_back({r, c, matriz[r][c]});
            }
        }
    }
    return esparsa;
}`,
    lineFor: { start: 1, "check-zero": 5, "check-nonzero": 6, done: 10 },
  },
  javascript: {
    code: `function gerarRepresentacaoEsparsa(matriz) {
    const esparsa = [];
    for (let r = 0; r < matriz.length; r++) {
        for (let c = 0; c < matriz[r].length; c++) {
            if (matriz[r][c] !== 0) {
                esparsa.push([r, c, matriz[r][c]]);
            }
        }
    }
    return esparsa;
}`,
    lineFor: { start: 1, "check-zero": 5, "check-nonzero": 6, done: 10 },
  },
};

export const SPARSE_MATRIX_RECONSTRUIR_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `int[][] reconstruirMatrizDensa(List<int[]> esparsa, int linhas, int colunas) {
    int[][] matriz = new int[linhas][colunas];
    for (int[] tripla : esparsa) {
        matriz[tripla[0]][tripla[1]] = tripla[2];
    }
    return matriz;
}`,
    lineFor: { start: 1, place: 4, done: 6 },
  },
  python: {
    code: `def reconstruir_matriz_densa(esparsa, linhas, colunas):
    matriz = [[0] * colunas for _ in range(linhas)]
    for r, c, valor in esparsa:
        matriz[r][c] = valor
    return matriz`,
    lineFor: { start: 1, place: 4, done: 5 },
  },
  cpp: {
    code: `vector<vector<int>> reconstruirMatrizDensa(vector<array<int,3>>& esparsa, int linhas, int colunas) {
    vector<vector<int>> matriz(linhas, vector<int>(colunas, 0));
    for (auto& tripla : esparsa) {
        matriz[tripla[0]][tripla[1]] = tripla[2];
    }
    return matriz;
}`,
    lineFor: { start: 1, place: 4, done: 6 },
  },
  javascript: {
    code: `function reconstruirMatrizDensa(esparsa, linhas, colunas) {
    const matriz = Array.from({ length: linhas }, () => Array(colunas).fill(0));
    for (const [r, c, valor] of esparsa) {
        matriz[r][c] = valor;
    }
    return matriz;
}`,
    lineFor: { start: 1, place: 4, done: 6 },
  },
};
