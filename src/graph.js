/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-trailing-spaces */
// Do not modify this GraphNode class
// Use any of its methods as you see fit to implement your graph
class GraphNode {
  constructor({ value, edges }) {
    this._value = value;
    this._edges = edges;
  }

  get value() {
    return this._value;
  }

  get edges() {
    return this._edges;
  }

  get numberOfEdges() {
    return this._edges.length;
  }

  set edges(x) {
    this._edges = x;
  }

  pushToEdges(y) {
    this._edges.push(y);
  }
}

class Graph {
  constructor() {
    this.vertices = [];
  }
  // Wraps the input value in a new GraphNode and adds it to the array of vertices
  // If there are only two nodes in the graph, they need to be automatically 
  // connected via an edge
  // Optionally accepts an array of other GraphNodes for the new vertex to be connected to
  // Returns the newly-added vertex
  addVertex(value, edges = []) {
    const newNode = new GraphNode({ value, edges });
    if (edges.length > 0) {
      edges.forEach((element) => {
        this.addEdge(newNode, element);
      });
    }
    if (this.vertices.length === 1) {
      const prevNode = this.vertices[0];
      this.addEdge(newNode, prevNode);
    } 
    this.vertices.push(newNode);
    
    return newNode;
  }
  // Checks all the vertices of the graph for the target value
  // Returns true or false
  contains(value) {
    if (this.vertices.length > 0) {
      for (let i = 0; i < this.vertices.length; i++) {
        if (this.vertices[i].value === value) return true;
      }
    }
    return false;
  }
  
  // Checks the graph to see if a GraphNode with the specified value exists in the graph 
  // and removes the vertex if it is found
  // This function should also handle the removing of all edge references for the removed vertex
  removeVertex(value) {
    for (let i = 0; i < this.vertices.length; i++) {
      if (this.vertices[i].value === value) {
        this.vertices.splice(i, 1);
      }
    }
  }
  
  // Checks the two input vertices to see if each one references the other in their respective edges array
  // Both vertices must reference each other for the edge to be considered valid
  // If only one vertex references the other but not vice versa, should not return true
  // Note: You'll need to store references to each vertex's array of edges so that you can use 
  // array methods on said arrays. There is no method to traverse the edge arrays built into the GraphNode class
  checkIfEdgeExists(fromVertex, toVertex) {
    const random = this.vertices;
    const fromValue = fromVertex.value;
    const toValue = toVertex.value;
    const toVArr = toVertex.edges;
    const fromVArr = fromVertex.edges;
    let count = 0;
    for (let i = 0; i < toVArr.length; i++) {
      if (toVArr[i].value === fromValue) count++;
    }
    for (let i = 0; i < fromVArr.length; i++) {
      if (fromVArr[i].value === toValue) count++;
    }
    if (count >= 2) return true;
    return false;
  }
  // Adds an edge between the two given vertices if no edge already exists between them
  // Again, an edge means both vertices reference the other 
  addEdge(fromVertex, toVertex) {
    fromVertex.pushToEdges(toVertex);
    toVertex.pushToEdges(fromVertex);
  }
  // Removes the edge between the two given vertices if an edge already exists between them
  // After removing the edge, neither vertex should be referencing the other
  // If a vertex would be left without any edges as a result of calling this function, those
  // vertices should be removed as well
  removeEdge(fromVertex, toVertex) {
    if (this.checkIfEdgeExists(fromVertex, toVertex)) {
      const fromVValue = fromVertex.value;
      const toVValue = toVertex.value;
      const fromVArr = fromVertex.edges;
      const toVArr = toVertex.edges;
      for (let i = 0; i < toVArr.length; i++) {
        if (fromVValue === toVArr[i].value) toVArr.splice(i, 1);
      }
      if (toVertex.edges.length === 0) {
        const index = this.vertices.indexOf(toVertex);
        this.vertices.splice(index, 1);
      }
      
      for (let i = 0; i < fromVArr.length; i++) {
        if (toVValue === fromVArr[i].value) fromVArr.splice(i, 1);
      }
      if (fromVertex.edges.length === 0) {
        const index = this.vertices.indexOf(fromVertex);
        this.vertices.splice(index, 1);
      }
    }
  }
}


module.exports = Graph;

