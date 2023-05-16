/// <reference lib="webworker" />

import Graph from "graphology";
import { MinHeap } from "../classes/min-heap";

addEventListener('message', ({ data }) => {
  let graaf = new Graph();
  graaf.import(data['graph']);
  const response = dijkstraWebworker(graaf, data["source"], data["destination"], data["correlationFactor"], data["distanceBetweenNodesFactor"], data["randomFactor"]);
  postMessage(response);
});


function dijkstraWebworker(graph: Graph, source: any, destination: any, correlationFactor: number, distanceBetweenNodesFactor: number, randomFactor: number): any {
  console.log("start dijkstra in worker")
  let result = [];
  let queue = new MinHeap<any>();
  graph.forEachNode((node: any) => {
    queue.push({
      id: node,
      weight: node === source ? 0 : Infinity,
      previousNode: null,
      totalCorrelation: 0,
      totalDistanceInBetweenNodes: 0,
      totalRandomnes: 0,
      numberOfNodesBefore: 0
    });
  });

  let currentNode: any;
  //while (queue.size() != 0) {
  while (queue.contains(destination)) {
    currentNode = queue.popFront();
    result.push(currentNode);

    // Visit each neighbor of the current node and update their distances
    const neighbors = graph.neighbors(currentNode.id);

    neighbors.forEach((neighbor) => {
      const nodeAtr = graph.getNodeAttributes(neighbor);
      let edgeAtr: any;
      try {
        edgeAtr = graph.getEdgeAttributes(currentNode.id, neighbor);
      } catch {
        edgeAtr = graph.getEdgeAttributes(neighbor, currentNode.id);
      }
      const avgCorrelation = (currentNode.totalCorrelation + nodeAtr['correlation']) / (currentNode.numberOfNodesBefore + 1)
      const avgDistanceInBetweenNodes = (currentNode.totalDistanceInBetweenNodes + edgeAtr['distanceInBetweenNodes']) / (currentNode.numberOfNodesBefore + 1)
      const avgRandomness = (currentNode.totalRandomnes + nodeAtr['randomValue']) / (currentNode.numberOfNodesBefore + 1)
      const weight = 100 * ((correlationFactor) * avgCorrelation) + ((distanceBetweenNodesFactor) * avgDistanceInBetweenNodes) + 0.03 * (randomFactor * avgRandomness);
      const newWeight = currentNode.weight + weight;
      if (queue.get(neighbor) && newWeight < queue.get(neighbor).weight) {
        let neighborObj = queue.popItem(neighbor);
        neighborObj.weight = newWeight;
        neighborObj.previousNode = currentNode;
        neighborObj.totalCorrelation = (currentNode.totalCorrelation + nodeAtr['correlation']);
        neighborObj.avgDistanceInBetweenNodes = (currentNode.totalDistanceInBetweenNodes + edgeAtr['distanceInBetweenNodes']);
        neighborObj.totalRandomnes = (currentNode.totalRandomnes + nodeAtr['randomValue']);
        neighborObj.numberOfNodesBefore = currentNode.numberOfNodesBefore + 1;
        queue.push(neighborObj)
      }
    });
  }
  let way = [destination];
  currentNode = result.find(t => t.id === destination);
  while (currentNode.id != source) {
    currentNode = currentNode.previousNode;
    way.push(currentNode.id)
  }
  return way;
}