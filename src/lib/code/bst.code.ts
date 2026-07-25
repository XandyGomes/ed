import type { LanguageSource } from "./bubbleSort.code";
import type { CodeLanguage } from "./languages";

export const BST_INSERT_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `void insert(int value) {
    root = insertRec(root, value);
}

No insertRec(No node, int value) {
    if (node == null) {
        return new No(value);
    }
    if (value < node.value) {
        node.left = insertRec(node.left, value);
    } else if (value > node.value) {
        node.right = insertRec(node.right, value);
    }
    return node;
}`,
    lineFor: { start: 1, empty: 7, compare: 9, insert: 7 },
  },
  python: {
    code: `def insert(self, value):
    self.root = self._insert_rec(self.root, value)

def _insert_rec(self, node, value):
    if node is None:
        return No(value)
    if value < node.value:
        node.left = self._insert_rec(node.left, value)
    elif value > node.value:
        node.right = self._insert_rec(node.right, value)
    return node`,
    lineFor: { start: 1, empty: 6, compare: 7, insert: 6 },
  },
  cpp: {
    code: `void insert(int value) {
    root = insertRec(root, value);
}

No* insertRec(No* node, int value) {
    if (node == nullptr) {
        return new No(value);
    }
    if (value < node->value) {
        node->left = insertRec(node->left, value);
    } else if (value > node->value) {
        node->right = insertRec(node->right, value);
    }
    return node;
}`,
    lineFor: { start: 1, empty: 7, compare: 9, insert: 7 },
  },
  javascript: {
    code: `insert(value) {
    this.root = this.insertRec(this.root, value);
}

insertRec(node, value) {
    if (node === null) {
        return new No(value);
    }
    if (value < node.value) {
        node.left = this.insertRec(node.left, value);
    } else if (value > node.value) {
        node.right = this.insertRec(node.right, value);
    }
    return node;
}`,
    lineFor: { start: 1, empty: 7, compare: 9, insert: 7 },
  },
};

export const BST_SEARCH_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `boolean search(int value) {
    No atual = root;
    while (atual != null) {
        if (value == atual.value) {
            return true;
        }
        atual = value < atual.value ? atual.left : atual.right;
    }
    return false;
}`,
    lineFor: { start: 2, compare: 4, found: 5, "not-found": 9 },
  },
  python: {
    code: `def search(self, value):
    atual = self.root
    while atual is not None:
        if value == atual.value:
            return True
        atual = atual.left if value < atual.value else atual.right
    return False`,
    lineFor: { start: 2, compare: 4, found: 5, "not-found": 7 },
  },
  cpp: {
    code: `bool search(int value) {
    No* atual = root;
    while (atual != nullptr) {
        if (value == atual->value) {
            return true;
        }
        atual = value < atual->value ? atual->left : atual->right;
    }
    return false;
}`,
    lineFor: { start: 2, compare: 4, found: 5, "not-found": 9 },
  },
  javascript: {
    code: `search(value) {
    let atual = this.root;
    while (atual !== null) {
        if (value === atual.value) {
            return true;
        }
        atual = value < atual.value ? atual.left : atual.right;
    }
    return false;
}`,
    lineFor: { start: 2, compare: 4, found: 5, "not-found": 9 },
  },
};

export const BST_REMOVE_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `No remove(No node, int value) {
    if (node == null) return null;
    if (value < node.value) {
        node.left = remove(node.left, value);
    } else if (value > node.value) {
        node.right = remove(node.right, value);
    } else {
        if (node.left == null && node.right == null) {
            return null;
        }
        if (node.left == null) {
            return node.right;
        }
        if (node.right == null) {
            return node.left;
        }
        No sucessor = node.right;
        while (sucessor.left != null) {
            sucessor = sucessor.left;
        }
        node.value = sucessor.value;
        node.right = remove(node.right, sucessor.value);
    }
    return node;
}`,
    lineFor: {
      start: 1,
      compare: 3,
      "target-found": 7,
      "case-leaf": 9,
      "case-one-child": 12,
      "case-two-children": 17,
      "successor-descend": 19,
      "successor-found": 21,
      "successor-replace": 22,
    },
  },
  python: {
    code: `def remove(self, node, value):
    if node is None:
        return None
    if value < node.value:
        node.left = self.remove(node.left, value)
    elif value > node.value:
        node.right = self.remove(node.right, value)
    else:
        if node.left is None and node.right is None:
            return None
        if node.left is None:
            return node.right
        if node.right is None:
            return node.left
        sucessor = node.right
        while sucessor.left is not None:
            sucessor = sucessor.left
        node.value = sucessor.value
        node.right = self.remove(node.right, sucessor.value)
    return node`,
    lineFor: {
      start: 1,
      compare: 4,
      "target-found": 8,
      "case-leaf": 10,
      "case-one-child": 12,
      "case-two-children": 15,
      "successor-descend": 17,
      "successor-found": 18,
      "successor-replace": 19,
    },
  },
  cpp: {
    code: `No* remove(No* node, int value) {
    if (node == nullptr) return nullptr;
    if (value < node->value) {
        node->left = remove(node->left, value);
    } else if (value > node->value) {
        node->right = remove(node->right, value);
    } else {
        if (node->left == nullptr && node->right == nullptr) {
            return nullptr;
        }
        if (node->left == nullptr) {
            return node->right;
        }
        if (node->right == nullptr) {
            return node->left;
        }
        No* sucessor = node->right;
        while (sucessor->left != nullptr) {
            sucessor = sucessor->left;
        }
        node->value = sucessor->value;
        node->right = remove(node->right, sucessor->value);
    }
    return node;
}`,
    lineFor: {
      start: 1,
      compare: 3,
      "target-found": 7,
      "case-leaf": 9,
      "case-one-child": 12,
      "case-two-children": 17,
      "successor-descend": 19,
      "successor-found": 21,
      "successor-replace": 22,
    },
  },
  javascript: {
    code: `remove(node, value) {
    if (node === null) return null;
    if (value < node.value) {
        node.left = this.remove(node.left, value);
    } else if (value > node.value) {
        node.right = this.remove(node.right, value);
    } else {
        if (node.left === null && node.right === null) {
            return null;
        }
        if (node.left === null) {
            return node.right;
        }
        if (node.right === null) {
            return node.left;
        }
        let sucessor = node.right;
        while (sucessor.left !== null) {
            sucessor = sucessor.left;
        }
        node.value = sucessor.value;
        node.right = this.remove(node.right, sucessor.value);
    }
    return node;
}`,
    lineFor: {
      start: 1,
      compare: 3,
      "target-found": 7,
      "case-leaf": 9,
      "case-one-child": 12,
      "case-two-children": 17,
      "successor-descend": 19,
      "successor-found": 21,
      "successor-replace": 22,
    },
  },
};

function traversalCode(order: "pre" | "in" | "pos"): Record<CodeLanguage, LanguageSource> {
  const nome = order === "pre" ? "preOrdem" : order === "in" ? "emOrdem" : "posOrdem";
  const nomePy = order === "pre" ? "pre_ordem" : order === "in" ? "em_ordem" : "pos_ordem";
  const linhaVisita = order === "pre" ? 3 : order === "in" ? 4 : 5;

  const corpoJava =
    order === "pre"
      ? `visitar(node);\n    ${nome}(node.left);\n    ${nome}(node.right);`
      : order === "in"
        ? `${nome}(node.left);\n    visitar(node);\n    ${nome}(node.right);`
        : `${nome}(node.left);\n    ${nome}(node.right);\n    visitar(node);`;

  const corpoPy =
    order === "pre"
      ? `visitar(node)\n    ${nomePy}(node.left)\n    ${nomePy}(node.right)`
      : order === "in"
        ? `${nomePy}(node.left)\n    visitar(node)\n    ${nomePy}(node.right)`
        : `${nomePy}(node.left)\n    ${nomePy}(node.right)\n    visitar(node)`;

  return {
    java: {
      code: `void ${nome}(No node) {\n    if (node == null) return;\n    ${corpoJava}\n}`,
      lineFor: { visit: linhaVisita },
    },
    python: {
      code: `def ${nomePy}(self, node):\n    if node is None:\n        return\n    ${corpoPy}`,
      lineFor: { visit: linhaVisita + 1 },
    },
    cpp: {
      code: `void ${nome}(No* node) {\n    if (node == nullptr) return;\n    ${corpoJava}\n}`,
      lineFor: { visit: linhaVisita },
    },
    javascript: {
      code: `${nome}(node) {\n    if (node === null) return;\n    ${corpoJava}\n}`,
      lineFor: { visit: linhaVisita },
    },
  };
}

export const BST_TRAVERSE_PRE_CODE = traversalCode("pre");
export const BST_TRAVERSE_IN_CODE = traversalCode("in");
export const BST_TRAVERSE_POS_CODE = traversalCode("pos");
