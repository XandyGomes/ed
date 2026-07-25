import type { LanguageSource } from "./bubbleSort.code";
import type { CodeLanguage } from "./languages";

export const AVL_INSERT_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `No insertRec(No node, int value) {
    if (node == null) {
        return new No(value);
    }
    if (value < node.value) {
        node.left = insertRec(node.left, value);
    } else if (value > node.value) {
        node.right = insertRec(node.right, value);
    }
    int balance = altura(node.left) - altura(node.right);

    if (balance > 1 && altura(node.left.left) >= altura(node.left.right)) {
        return rotateRight(node);
    }
    if (balance > 1) {
        node.left = rotateLeft(node.left);
        return rotateRight(node);
    }
    if (balance < -1 && altura(node.right.right) >= altura(node.right.left)) {
        return rotateLeft(node);
    }
    if (balance < -1) {
        node.right = rotateRight(node.right);
        return rotateLeft(node);
    }
    return node;
}`,
    lineFor: {
      start: 1,
      compare: 5,
      insert: 3,
      "check-balance": 10,
      "ll-detect": 12,
      "ll-done": 13,
      "lr-detect": 15,
      "lr-first": 16,
      "lr-done": 17,
      "rr-detect": 19,
      "rr-done": 20,
      "rl-detect": 22,
      "rl-first": 23,
      "rl-done": 24,
      balanced: 26,
    },
  },
  python: {
    code: `def insert_rec(self, node, value):
    if node is None:
        return No(value)
    if value < node.value:
        node.left = self.insert_rec(node.left, value)
    elif value > node.value:
        node.right = self.insert_rec(node.right, value)
    balance = self.altura(node.left) - self.altura(node.right)

    if balance > 1 and self.altura(node.left.left) >= self.altura(node.left.right):
        return self.rotate_right(node)
    if balance > 1:
        node.left = self.rotate_left(node.left)
        return self.rotate_right(node)
    if balance < -1 and self.altura(node.right.right) >= self.altura(node.right.left):
        return self.rotate_left(node)
    if balance < -1:
        node.right = self.rotate_right(node.right)
        return self.rotate_left(node)
    return node`,
    lineFor: {
      start: 1,
      compare: 4,
      insert: 3,
      "check-balance": 8,
      "ll-detect": 10,
      "ll-done": 11,
      "lr-detect": 12,
      "lr-first": 13,
      "lr-done": 14,
      "rr-detect": 15,
      "rr-done": 16,
      "rl-detect": 17,
      "rl-first": 18,
      "rl-done": 19,
      balanced: 20,
    },
  },
  cpp: {
    code: `No* insertRec(No* node, int value) {
    if (node == nullptr) {
        return new No(value);
    }
    if (value < node->value) {
        node->left = insertRec(node->left, value);
    } else if (value > node->value) {
        node->right = insertRec(node->right, value);
    }
    int balance = altura(node->left) - altura(node->right);

    if (balance > 1 && altura(node->left->left) >= altura(node->left->right)) {
        return rotateRight(node);
    }
    if (balance > 1) {
        node->left = rotateLeft(node->left);
        return rotateRight(node);
    }
    if (balance < -1 && altura(node->right->right) >= altura(node->right->left)) {
        return rotateLeft(node);
    }
    if (balance < -1) {
        node->right = rotateRight(node->right);
        return rotateLeft(node);
    }
    return node;
}`,
    lineFor: {
      start: 1,
      compare: 5,
      insert: 3,
      "check-balance": 10,
      "ll-detect": 12,
      "ll-done": 13,
      "lr-detect": 15,
      "lr-first": 16,
      "lr-done": 17,
      "rr-detect": 19,
      "rr-done": 20,
      "rl-detect": 22,
      "rl-first": 23,
      "rl-done": 24,
      balanced: 26,
    },
  },
  javascript: {
    code: `insertRec(node, value) {
    if (node === null) {
        return new No(value);
    }
    if (value < node.value) {
        node.left = this.insertRec(node.left, value);
    } else if (value > node.value) {
        node.right = this.insertRec(node.right, value);
    }
    const balance = this.altura(node.left) - this.altura(node.right);

    if (balance > 1 && this.altura(node.left.left) >= this.altura(node.left.right)) {
        return this.rotateRight(node);
    }
    if (balance > 1) {
        node.left = this.rotateLeft(node.left);
        return this.rotateRight(node);
    }
    if (balance < -1 && this.altura(node.right.right) >= this.altura(node.right.left)) {
        return this.rotateLeft(node);
    }
    if (balance < -1) {
        node.right = this.rotateRight(node.right);
        return this.rotateLeft(node);
    }
    return node;
}`,
    lineFor: {
      start: 1,
      compare: 5,
      insert: 3,
      "check-balance": 10,
      "ll-detect": 12,
      "ll-done": 13,
      "lr-detect": 15,
      "lr-first": 16,
      "lr-done": 17,
      "rr-detect": 19,
      "rr-done": 20,
      "rl-detect": 22,
      "rl-first": 23,
      "rl-done": 24,
      balanced: 26,
    },
  },
};
