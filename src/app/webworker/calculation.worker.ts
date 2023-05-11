/// <reference lib="webworker" />

import Graph from "graphology";

addEventListener('message', ({ data }) => {
  let graaf = new Graph();
  graaf.import(data['graph']);
  const response = dijkstraWebworker(graaf, data["source"], data["destination"], data["correlationFactor"], data["distanceBetweenNodesFactor"], data["randomFactor"]);
  postMessage(response);
});


function dijkstraWebworker(graph: Graph, source: any, destination: any, correlationFactor: number, distanceBetweenNodesFactor: number, randomFactor: number): any {
  console.log("start dijkstra in worker")
  const shortestPath: any = {};
  graph.forEachNode((node: any) => {
    shortestPath[node] = {
      weight: node === source ? 0 : Infinity,
      previousNode: null,
      totalCorrelation: 0,
      totalDistanceInBetweenNodes: 0,
      totalRandomnes: 0,
      numberOfNodesBefore: 0
    };
  });

  // Set of unvisited nodes
  const unvisitedNodes = new Set(graph.nodes());
  let currentNode: any = source;

  while (unvisitedNodes.has(destination)) {
    // Find the unvisited node with the smallest weight
    let currentWeight = Infinity;
    unvisitedNodes.forEach((node) => {
      if (shortestPath[node].weight < currentWeight) {
        currentNode = node;
        currentWeight = shortestPath[node].weight;
      }
    });

    if (currentNode === null) {
      break;
    }

    // Remove the current node from the unvisited set
    unvisitedNodes.delete(currentNode);

    // Visit each neighbor of the current node and update their distances
    const neighbors = graph.neighbors(currentNode);

    neighbors.forEach((neighbor) => {
      const nodeAtr = graph.getNodeAttributes(neighbor);
      let edgeAtr: any;
      try {
        edgeAtr = graph.getEdgeAttributes(currentNode, neighbor);
      } catch {
        edgeAtr = graph.getEdgeAttributes(neighbor, currentNode);
      }
      const avgCorrelation = (shortestPath[currentNode].totalCorrelation + nodeAtr['correlation']) / (shortestPath[currentNode].numberOfNodesBefore + 1)
      const avgDistanceInBetweenNodes = (shortestPath[currentNode].totalDistanceInBetweenNodes + edgeAtr['distanceInBetweenNodes']) / (shortestPath[currentNode].numberOfNodesBefore + 1)
      const avgRandomness = (shortestPath[currentNode].totalRandomnes + nodeAtr['randomValue']) / (shortestPath[currentNode].numberOfNodesBefore + 1)
      const weight = 100 * ((correlationFactor) * avgCorrelation) + ((distanceBetweenNodesFactor) * avgDistanceInBetweenNodes) + 0.03 * (randomFactor * avgRandomness);
      const newWeight = currentWeight + weight;
      if (newWeight < shortestPath[neighbor].weight) {
        shortestPath[neighbor].weight = newWeight;
        shortestPath[neighbor].previousNode = currentNode;
        shortestPath[neighbor].totalCorrelation = (shortestPath[currentNode].totalCorrelation + nodeAtr['correlation']);
        shortestPath[neighbor].avgDistanceInBetweenNodes = (shortestPath[currentNode].totalDistanceInBetweenNodes + edgeAtr['distanceInBetweenNodes']);
        shortestPath[neighbor].totalRandomnes = (shortestPath[currentNode].totalRandomnes + nodeAtr['randomValue']);
        shortestPath[neighbor].numberOfNodesBefore = shortestPath[currentNode].numberOfNodesBefore + 1;
      }
    });
  }
  let way = [destination];
  currentNode = destination;
  while (currentNode != source) {
    currentNode = shortestPath[currentNode]['previousNode'];
    way.push(currentNode)
  }
  console.log("einde dijkstra in worker");
  return way;
}