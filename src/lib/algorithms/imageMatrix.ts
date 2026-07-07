export type PixelGrid = { rows: number; cols: number; gray: number[][] };

export function gridFromImage(file: File, cols: number, maxRows = 40): Promise<PixelGrid> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Não foi possível ler o arquivo."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Não foi possível carregar essa imagem."));
      img.onload = () => {
        const rows = Math.max(1, Math.min(maxRows, Math.round((img.height / img.width) * cols)));
        const canvas = document.createElement("canvas");
        canvas.width = cols;
        canvas.height = rows;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Este navegador não suporta canvas."));
          return;
        }
        ctx.drawImage(img, 0, 0, cols, rows);
        const { data } = ctx.getImageData(0, 0, cols, rows);
        const gray: number[][] = [];
        for (let r = 0; r < rows; r++) {
          const row: number[] = [];
          for (let c = 0; c < cols; c++) {
            const i = (r * cols + c) * 4;
            row.push(Math.round((data[i] + data[i + 1] + data[i + 2]) / 3));
          }
          gray.push(row);
        }
        resolve({ rows, cols, gray });
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
