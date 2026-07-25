import type { LanguageSource } from "./bubbleSort.code";
import type { CodeLanguage } from "./languages";

export const OBJETO_LIVRE_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `Map<String, Object> forma = new HashMap<>();
forma.put("base", base);
forma.put("altura", altura);
forma.put("tipo", tipo);
// nada impede valores inválidos aqui`,
    lineFor: { create: 1, "no-validation": 5 },
  },
  python: {
    code: `forma = {"base": base, "altura": altura, "tipo": tipo}
# nada impede valores inválidos aqui`,
    lineFor: { create: 1, "no-validation": 2 },
  },
  cpp: {
    code: `struct Forma { double base; double altura; char tipo; };
Forma forma = { base, altura, tipo };
// nada impede valores inválidos aqui`,
    lineFor: { create: 2, "no-validation": 3 },
  },
  javascript: {
    code: `const forma = { base, altura, tipo };
// nada impede valores inválidos aqui`,
    lineFor: { create: 1, "no-validation": 2 },
  },
};

export const OBJETO_CLASSE_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `class FormaGeometrica {
    private double base;
    private double altura;
    private char tipo;

    public FormaGeometrica(double base, double altura, char tipo) {
        setBase(base);
        setAltura(altura);
        setTipo(tipo);
    }

    public void setBase(double valor) {
        if (valor <= 0) {
            throw new IllegalArgumentException("base precisa ser maior que zero");
        }
        this.base = valor;
    }

    public void setAltura(double valor) {
        if (valor <= 0) {
            throw new IllegalArgumentException("altura precisa ser maior que zero");
        }
        this.altura = valor;
    }

    public void setTipo(char valor) {
        if (valor != 'R' && valor != 'T' && valor != 'E') {
            throw new IllegalArgumentException("tipo precisa ser R, T ou E");
        }
        this.tipo = valor;
    }
}
// objeto criado com dados válidos, area() já pode ser chamado com segurança`,
    lineFor: { start: 6, "check-base": 13, "check-altura": 20, "check-tipo": 27, success: 32 },
  },
  python: {
    code: `class FormaGeometrica:
    def __init__(self, base, altura, tipo):
        self.set_base(base)
        self.set_altura(altura)
        self.set_tipo(tipo)

    def set_base(self, valor):
        if valor <= 0:
            raise ValueError("base precisa ser maior que zero")
        self.base = valor

    def set_altura(self, valor):
        if valor <= 0:
            raise ValueError("altura precisa ser maior que zero")
        self.altura = valor

    def set_tipo(self, valor):
        if valor not in ("R", "T", "E"):
            raise ValueError("tipo precisa ser R, T ou E")
        self.tipo = valor
# objeto criado com dados válidos, area() já pode ser chamado com segurança`,
    lineFor: { start: 3, "check-base": 8, "check-altura": 13, "check-tipo": 18, success: 21 },
  },
  cpp: {
    code: `class FormaGeometrica {
public:
    FormaGeometrica(double base, double altura, char tipo) {
        setBase(base);
        setAltura(altura);
        setTipo(tipo);
    }

    void setBase(double valor) {
        if (valor <= 0) {
            throw std::invalid_argument("base precisa ser maior que zero");
        }
        base_ = valor;
    }

    void setAltura(double valor) {
        if (valor <= 0) {
            throw std::invalid_argument("altura precisa ser maior que zero");
        }
        altura_ = valor;
    }

    void setTipo(char valor) {
        if (valor != 'R' && valor != 'T' && valor != 'E') {
            throw std::invalid_argument("tipo precisa ser R, T ou E");
        }
        tipo_ = valor;
    }

private:
    double base_, altura_;
    char tipo_;
};
// objeto criado com dados válidos, area() já pode ser chamado com segurança`,
    lineFor: { start: 3, "check-base": 10, "check-altura": 17, "check-tipo": 24, success: 34 },
  },
  javascript: {
    code: `class FormaGeometrica {
    #base;
    #altura;
    #tipo;

    constructor(base, altura, tipo) {
        this.setBase(base);
        this.setAltura(altura);
        this.setTipo(tipo);
    }

    setBase(valor) {
        if (valor <= 0) {
            throw new Error("base precisa ser maior que zero");
        }
        this.#base = valor;
    }

    setAltura(valor) {
        if (valor <= 0) {
            throw new Error("altura precisa ser maior que zero");
        }
        this.#altura = valor;
    }

    setTipo(valor) {
        if (!["R", "T", "E"].includes(valor)) {
            throw new Error("tipo precisa ser R, T ou E");
        }
        this.#tipo = valor;
    }
}
// objeto criado com dados válidos, area() já pode ser chamado com segurança`,
    lineFor: { start: 7, "check-base": 13, "check-altura": 20, "check-tipo": 27, success: 33 },
  },
};
