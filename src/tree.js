/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
class Tree {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
  // Adds a new Tree node with the input value to the current Tree node 
  addChild(value) {
    const newNode = new Tree(value);
    this.children.push(newNode);
  }
  // Checks this node's children to see if any of them matches the given value
  // Continues recursively until the value has been found or all of the children
  // have been checked
  contains(value) {
    const firstNode = this.children[0];
    const checkNode = (currentNode) => {
      if (currentNode.value === value) return true;
     currentNode = firstNode.children[0];
    return checkNode(currentNode);
    }
    return checkNode(firstNode);
    } 
  }


module.exports = Tree;
