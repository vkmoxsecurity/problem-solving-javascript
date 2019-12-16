const Node = require('./Node');

const utils = {
  // eslint-disable-next-line consistent-return
  insert(root, value) {
    if (root === null) {
      const newNode = new Node(value);
      // eslint-disable-next-line no-param-reassign
      root = newNode;
      return root;
    }

    if (value < root.value) {
      // eslint-disable-next-line no-param-reassign
      root.leftChild = this.insert(root.leftChild, value);
      return root;
    }
    if (value > root.value) {
      // eslint-disable-next-line no-param-reassign
      root.rightChild = this.insert(root.rightChild, value);
      return root;
    }
  },

  preorder(root) {
    /** returning an array so as to make testing easy */
    let arr = [];
    if (root === null) return [];
    arr.push(root.value);

    const left = this.preorder(root.leftChild);
    arr = [...arr, ...left];

    const right = this.preorder(root.rightChild);
    arr = [...arr, ...right];
    return arr;
  },

  inorder(root) {
    /** left - root - right */
    if (root === null) return [];
    let arr = [];
    const left = this.inorder(root.leftChild);
    arr = [...left, ...arr];

    // print root
    arr = [...arr, root.value];

    const right = this.inorder(root.rightChild);
    arr = [...arr, ...right];
    return arr;
  },

  postorder(root) {
    /** left - right - root */

    if (root === null) return [];
    let arr = [];

    const left = this.postorder(root.leftChild);
    arr = [...left, ...arr];

    const right = this.postorder(root.rightChild);
    arr = [...arr, ...right];

    return [...arr, root.value];
  },

  // eslint-disable-next-line consistent-return
  search(root, value) {
    if (root === null) return false;
    if (value === root.value) return true;

    if (value < root.value) {
      return this.search(root.leftChild, value);
    }
    if (value > root.value) {
      return this.search(root.rightChild, value);
    }
  },

  delete(root, value) {
    if (root === null) {
      return root;
    }

    if (value > root.value) {
      // eslint-disable-next-line no-param-reassign
      root.rightChild = this.delete(root.rightChild, value);
    } else if (value < root.value) {
      // eslint-disable-next-line no-param-reassign
      root.leftChild = this.delete(root.leftChild, value);
    } else {
      // found the node
      if (root.leftChild === null) {
        // there is a right sub-tree
        return root.rightChild;
      }
      if (root.rightChild === null) {
        // there is a left sub-tree
        return root.leftChild;
      }
      /**
       * the root contain 2 childs, we got 2 options:
       * 1. We can either find the Node with minimum value at from the right sub-tree
       * 2. Or, we can find the Node with maximum value from the left sub-tree
       *
       * I'm picking up 1 here
       */
      const minRightNode = this.findMinNode(root.rightChild);
      // eslint-disable-next-line no-param-reassign
      root.value = minRightNode.value;
      // eslint-disable-next-line no-param-reassign
      root.rightChild = this.delete(root.rightChild, minRightNode.value);
      return root;
    }
    return root;
  },

  findMinNode(root) {
    /** The minnimum values is the let most leaf node in BST */
    if (root.leftChild === null) return root;
    return this.findMinNode(root.leftChild);
  },

  findMaxNode(root) {
    if (root.rightChild === null) return root;
    return this.findMaxNode(root.rightChild);
  },
};

module.exports = utils;
