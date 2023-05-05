import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import Graph from 'graphology';
import { forkJoin } from 'rxjs';
import { Sigma } from "sigma";
import { NodeDisplayData } from 'sigma/types';
import { DataService } from '../services/data.service';

declare var require: any;

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent {
  public hoveredNode?: string;
  public hoveredNeighbors?: Set<string>;
  public graph: Graph;
  public data: any[];
  public categoricalSimilaritiesObject: any;
  public correlationFactor: number = 0.33;
  public distanceBetweenNodesFactor: number = 0.33;
  public randomFactor: number = 0.33;
  public linkTheseNodesInVisualisation: String[] = [];
  public destination: any;
  public oldDestination: any;
  public filteredDataSearchBox: any[] = [];
  public loaded = false;
  public minDistanceToCurrentPosition = Infinity;
  public maxDistanceToCurrentPosition = 0;
  public minDistanceBetweenNodes = Infinity;
  public maxDistanceBetweenNodes = 0;
  public changingFactorValues: any = { value1: 0.33, value2: 0.33, value3: 0.33, };
  public calculatedWayToShow: any[];

  @ViewChild("container") container: ElementRef;
  @ViewChild("containerForUser") containerForUser: ElementRef;

  constructor(private http: HttpClient, private dataService: DataService) { }

  handleTriangleChange(event: any) {
    this.correlationFactor = Math.round(event['value1'] * 100) / 100;
    this.distanceBetweenNodesFactor = Math.round(event['value2'] * 100) / 100;
    this.randomFactor = Math.round(event['value3'] * 100) / 100;
    this.calculatePath(3.7197324, 51.0569223);
  }

  handleTriangleChangingValuesChange(event: any) {
    this.changingFactorValues = event;
  }

  ngAfterViewInit() {
    forkJoin({
      getTurtleOfNodeData$: this.dataService.getTurtleOfData$(this.dataService.getNodeJsonData$()),
      getTurtleOfWayData$: this.dataService.getTurtleOfData$(this.dataService.getWayJsonData$()),
      getTurtleOfRelationData$: this.dataService.getTurtleOfData$(this.dataService.getRelationJsonData$()),
      getCategoricalSimilaritiesObject$: this.dataService.getCategoricalSimilaritiesObject$()
    }).subscribe(results => {
      this.data = [... this.dataService.parsteTtlToJsonLd(results.getTurtleOfNodeData$)[`@graph`], ... this.dataService.parsteTtlToJsonLd(results.getTurtleOfWayData$)[`@graph`], ...this.dataService.parsteTtlToJsonLd(results.getTurtleOfRelationData$)[`@graph`]]
     // this.data = this.data.slice(0, 1000);
      this.destination = this.data[0];
      this.oldDestination = this.destination;
      this.categoricalSimilaritiesObject = results.getCategoricalSimilaritiesObject$;
      // calculate min and max for distanceNodeBetweenNodes & distanceNodeToCurrentPosition
      this.setMinMax(3.7197324, 51.0569223);
      this.buildGraph(3.7197324, 51.0569223);
      //this.visualizeGraphFull();
      this.calculatePath(3.7197324, 51.0569223);
    })
  }

  buildGraph(currentPositionLat: number, currentPositionLong: number) {
    console.log("start building graph")
    this.loaded = false;
    this.graph = new Graph();
    //add current position
    this.data.push({
      label: 'Current position',
      color: 'grey',
      'schema:name': "Current position",
      'schema:geo': {
        'geo:lat': 3.7197324,
        'geo:long': 51.0569223
      },
      'schema:keyword': {
      },
      '@id': "currentPosition",
      x: 3.7197324,
      y: 51.0569223,
      size: 6
    });
    this.addNodesToGraph(currentPositionLat, currentPositionLong);
    this.addEdgesToGraph(currentPositionLat, currentPositionLong);
    this.loaded = true;
    console.log("end building graph")
  }

  public setMinMax(currentPositionLat: number, currentPositionLong: number) {
    for (let i = 0; i < this.data.length; i++) {
      let el = this.data[i];
      for (let j = i; j < this.data.length; j++) {
        let distanceNodeBetweenNodes = this.calculateBirdFlightDistanceBetween(Number(el['schema:geo']['geo:lat']), Number(el['schema:geo']['geo:long']), Number(this.data[j]['schema:geo']['geo:lat']), Number(this.data[j]['schema:geo']['geo:long']),)
        if (distanceNodeBetweenNodes < this.minDistanceBetweenNodes) this.minDistanceBetweenNodes = distanceNodeBetweenNodes;
        if (distanceNodeBetweenNodes > this.maxDistanceBetweenNodes) this.maxDistanceBetweenNodes = distanceNodeBetweenNodes;
      }
      let distanceNodeToCurrentPosition = this.calculateBirdFlightDistanceBetween(Number(el['schema:geo']['geo:lat']), Number(el['schema:geo']['geo:long']), currentPositionLat, currentPositionLong)
      if (distanceNodeToCurrentPosition < this.minDistanceToCurrentPosition) this.minDistanceToCurrentPosition = distanceNodeToCurrentPosition;
      if (distanceNodeToCurrentPosition > this.maxDistanceToCurrentPosition) this.maxDistanceToCurrentPosition = distanceNodeToCurrentPosition;
    }
  }


  public updateGraphForDestinationChange(currentPositionLat: number, currentPositionLong: number) {
    this.loaded = false;
    if (this.destination != null && this.destination != "") {
      let keywordsDestionation: string[] = this.destination["schema:keyword"]['@list']
      this.graph.nodes().forEach(node => {
        let nodeAtr = this.graph.getNodeAttributes(node);
        let maxCorrelation = 0;
        if (node != "currentPosition") {
          maxCorrelation = this.getMaxCorrelation(keywordsDestionation, nodeAtr["schema:keyword"]['@list']);
        }
        this.graph.setNodeAttribute(node, "correlation", maxCorrelation)
      });
      //restore edge oldDestination <-> currentPosition
      let fromNode = "currentPosition";
      let toNode = this.oldDestination['@id'];
      let fromNodeAtr = this.graph.getNodeAttributes(fromNode);
      let toNodeAtr = this.graph.getNodeAttributes(toNode);
      let distanceInBetweenNodesNormalized = this.normalizeDistance(this.minDistanceBetweenNodes, this.maxDistanceBetweenNodes, this.calculateBirdFlightDistanceBetween(Number(fromNodeAtr['schema:geo']['geo:lat']), Number(fromNodeAtr['schema:geo']['geo:long']), Number(toNodeAtr['schema:geo']['geo:lat']), Number(toNodeAtr['schema:geo']['geo:long'])));
      this.graph.addEdge(fromNode, this.oldDestination['@id'], {
        distanceInBetweenNodes: distanceInBetweenNodesNormalized,
        fromNode: fromNodeAtr["schema:name"],
        toNode: toNodeAtr["schema:name"],
        fromNodeId: fromNode,
        toNodeId: toNodeAtr["@id"],
        label: `${distanceInBetweenNodesNormalized}`
      });
      //remove edge destination <-> currentPosition
      if (this.graph.hasEdge(fromNode, this.destination['@id'])) {
        this.graph.dropEdge(fromNode, this.destination['@id']);
      }
      if (this.graph.hasEdge(this.destination['@id'], fromNode)) {
        this.graph.dropEdge(this.destination['@id'], fromNode);
      }
      this.calculatePath(currentPositionLat, currentPositionLong);
      this.oldDestination = this.destination
    }
  }

  public addNodesToGraph(currentPositionLat: number, currentPositionLong: number) {
    let keywordsDestionation: string[] = this.destination["schema:keyword"]['@list']
    for (let i = 0; i < this.data.length; i++) {
      if (!this.graph.hasNode(this.data[i]['@id'])) {
        let el = this.data[i];
        //add node
        let randomValue = Math.random();
        let maxCorrelation = 0;
        if (el['@id'] != "currentPosition") {
          maxCorrelation = this.getMaxCorrelation(keywordsDestionation, el["schema:keyword"]['@list']);
        }
        this.graph.addNode(el['@id'], {
          label: el['schema:name'],
          color: 'grey',
          randomValue: randomValue,
          correlation: maxCorrelation,
          size: 6,
          x: Number(el['schema:geo']['geo:lat']),
          y: Number(el['schema:geo']['geo:long']),
          ...el
        });
      }
    }
  }

  public addEdgesToGraph(currentPositionLat: number, currentPositionLong: number) {
    if (this.destination != null && this.destination != "") {
      this.graph.clearEdges();
      let graphNodes = this.graph.nodes();
      for (let i = 0; i < graphNodes.length; i++) {
        let fromNode = graphNodes[i];
        let fromNodeAtr = this.graph.getNodeAttributes(fromNode);
        for (let j = i; j < graphNodes.length; j++) {
          let toNode = graphNodes[j];
          let toNodeAtr = this.graph.getNodeAttributes(toNode);
          if (fromNode != toNode && !(fromNode == this.destination['@id'] && toNode == "currentPosition" || toNode == this.destination['@id'] && fromNode == "currentPosition")) {
            let distanceInBetweenNodesNormalized = this.normalizeDistance(this.minDistanceBetweenNodes, this.maxDistanceBetweenNodes, this.calculateBirdFlightDistanceBetween(Number(fromNodeAtr['schema:geo']['geo:lat']), Number(fromNodeAtr['schema:geo']['geo:long']), Number(toNodeAtr['schema:geo']['geo:lat']), Number(toNodeAtr['schema:geo']['geo:long'])));
            this.graph.addEdge(fromNode, toNode, {
              distanceInBetweenNodes: distanceInBetweenNodesNormalized,
              fromNode: fromNodeAtr["schema:name"],
              toNode: toNodeAtr["schema:name"],
              fromNodeId: fromNode,
              toNodeId: toNodeAtr["@id"],
              label: `${distanceInBetweenNodesNormalized}`
            });
          }
        };
      }
    }
  }

  public getMaxCorrelation(keywordsDestionation: string[], keywordsNewNode: string[]) {
    let maxCorrelation = 0;
    if (keywordsDestionation && keywordsNewNode) {
      keywordsNewNode.forEach(keywordOfNewNode => {
        keywordsDestionation.forEach(keywordOfNode => {
          let correlation = 0;
          try {
            correlation = this.categoricalSimilaritiesObject[keywordOfNewNode][keywordOfNode]
          } catch {
          }
          if (correlation > maxCorrelation) {
            maxCorrelation = correlation
          };
        });
      });
    }
    return 1 - maxCorrelation;
  }

  public calculatePath(currentPositionLat: number, currentPositionLong: number) {
    if (this.destination != null && this.destination != "") {
      //dijkstra
      let way: any[] = this.dijkstra(this.graph, this.destination['@id'], "currentPosition");
      //show way
      this.calculatedWayToShow = [];
      way.forEach(t => {
        let atrData = this.graph.getNodeAttributes(t);
        if (atrData['schema:sameAs']) {
          this.dataService.getWikidataImage$(atrData['schema:sameAs']).subscribe(t => {
            if (t['results']['bindings'][0]) {
              atrData['imagelink'] = t['results']['bindings'][0]['image']['value'];
            }
          })
        }
        this.calculatedWayToShow.push(atrData);
      });
      this.linkTheseNodesInVisualisation = way;
    } else {
      this.linkTheseNodesInVisualisation = [];
    }
    console.log("einde calculate path");
    this.visualizeGraphForUser();
  }

  dijkstra(graph: Graph, source: any, destination: any): any {
    console.log("start dijkstra")
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
        const weight = 100 * ((this.correlationFactor) * avgCorrelation) + ((this.distanceBetweenNodesFactor) * avgDistanceInBetweenNodes) + 0.03 * (this.randomFactor * avgRandomness);
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
    console.log("einde dijkstra");
    return way;
  }

  normalizeDistance(min: number, max: number, value: number) {
    return ((value - min) / (max - min))
  }

  filterData(event: any) {
    let filtered: any[] = [];
    let query: string = event.query.toLowerCase();
    for (let i = 0; i < this.data.length; i++) {
      let item = this.data[i];
      let itemName: String = String(item['schema:name']);
      if (itemName !== undefined && itemName != "" && (itemName.toLowerCase().includes(query)) || (item['schema:keyword'] && item['schema:keyword'].toString().toLowerCase().includes(query))) {
        filtered.push(item);
      }
    }
    this.filteredDataSearchBox = filtered;
  }

  visualizeGraphFull() {
    /*if (this.container) {
      let graphWithoutEdges = this.graph.copy();
      graphWithoutEdges.clearEdges();
      this.dataService.sigma = new Sigma(graphWithoutEdges, this.container.nativeElement, {
        zIndex: true,
        renderEdgeLabels: true,
        defaultEdgeType: "line"
        /*
        //nodeProgramClasses: { image: getNodeProgramImage() },
        //labelRenderer: drawLabel,
        //defaultNodeType: "image", 
        defaultEdgeType: "arrow",
        labelDensity: 0.07,
        labelGridCellSize: 60,
        labelRenderedSizeThreshold: 15,
        labelFont: "Lato, sans-serif",
        defaultEdgeColor: "target"
      });
      this.dataService.sigma.on("enterNode", ({ node }) => {
        this.setHoveredNode(this.dataService.sigma, node);
      });
      this.dataService.sigma.on("leaveNode", () => {
        this.setHoveredNode(this.dataService.sigma, undefined);
      });
    }*/
  }

  visualizeGraphForUser() {
    if (this.dataService.sigmaUser) this.dataService.sigmaUser.kill();
    if (this.containerForUser) {
      let userGraaf = new Graph();
      if (this.calculatedWayToShow) {
        this.calculatedWayToShow.forEach(node => {
          if (!userGraaf.hasNode(node['@id'])) {
            userGraaf.addNode(node['@id'], node);
          }
          let array = this.graph.neighbors(node['@id']).map(neighbor => {
            let vanNaar;
            let naarVan;
            if (this.graph.hasEdge(node['@id'], neighbor)) {
              vanNaar = this.graph.getDirectedEdgeAttributes(node['@id'], neighbor);
            }
            if (this.graph.hasEdge(neighbor, node['@id'])) {
              naarVan = this.graph.getDirectedEdgeAttributes(neighbor, node['@id']);
            }
            return { ...vanNaar, ...naarVan };
          })
          let sortedArray = array.sort((a: any, b: any) => a['distanceInBetweenNodes'] - b['distanceInBetweenNodes']);

          sortedArray.slice(0, 3).forEach(neighbor => {
            if (!userGraaf.hasNode(neighbor['toNodeId'])) {

              userGraaf.addNode(neighbor['toNodeId'], this.graph.getNodeAttributes(neighbor['toNodeId']));
            }
            if (!userGraaf.hasNode(neighbor['fromNodeId'])) {
              userGraaf.addNode(neighbor['fromNodeId'], this.graph.getNodeAttributes(neighbor['fromNodeId']));
            }
            if (!userGraaf.hasEdge(neighbor['fromNodeId'], neighbor['toNodeId'])) {
              userGraaf.addDirectedEdge(neighbor['fromNodeId'], neighbor['toNodeId']);
            }
          });
        })
        for (let i = 1; i < this.calculatedWayToShow.length; ++i) {
          if (!userGraaf.hasEdge(this.calculatedWayToShow[i - 1]['@id'], this.calculatedWayToShow[i]['@id'])) {
            userGraaf.addDirectedEdge(this.calculatedWayToShow[i - 1]['@id'], this.calculatedWayToShow[i]['@id']);
          }
        }
      }

      this.dataService.sigmaUser = new Sigma(userGraaf, this.containerForUser.nativeElement, {
        zIndex: true,
        renderEdgeLabels: false,
        renderLabels: true,
        defaultEdgeType: "line"
      });
      this.dataService.sigmaUser.on("enterNode", ({ node }) => {
        this.setHoveredNode(this.dataService.sigmaUser, node);
      });
      this.dataService.sigmaUser.on("leaveNode", () => {
        this.setHoveredNode(this.dataService.sigmaUser, undefined);
      });
      this.dataService.sigmaUser.setSetting("nodeReducer", (node, data) => {
        const res: Partial<NodeDisplayData> = { ...data };
        if (this.linkTheseNodesInVisualisation.includes(node)) {
          res.color = "red";
          res.zIndex = 5;
          res.forceLabel = true;
        } else {
          res.color = "grey";
          res.zIndex = 0;
          res.label = null;
        }
        return res;
      });
    }
  }

  setHoveredNode(sigma: Sigma, node?: string) {
    if (node) {
      this.hoveredNode = node;
      this.dataService.sigmaUser.setSetting("nodeReducer", (nodeForReducer, data) => {
        //const res: Partial<NodeDisplayData> = { ...data };
        const res: any = { ...data };
        if (this.linkTheseNodesInVisualisation.includes(nodeForReducer)) {
          res.color = "red";
          res.zIndex = 5;
          res.forceLabel = true;
        }
        else {
          res.color = "grey";
          res.zIndex = 0;
          res.label = null;
        }
        if (nodeForReducer == node) {
          res.label = res['schema:name'];
        }
        return res;
      });
      this.hoveredNeighbors = new Set(this.graph.neighbors(node));
    } else {
      this.hoveredNode = undefined;
      this.hoveredNeighbors = undefined;
      this.dataService.sigmaUser.setSetting("nodeReducer", (node, data) => {
        const res: Partial<NodeDisplayData> = { ...data };
        if (this.linkTheseNodesInVisualisation.includes(node)) {
          res.color = "red";
          res.zIndex = 5;
          res.forceLabel = true;
        } else {
          res.color = "grey";
          res.zIndex = 0;
          res.label = null;
        }
        return res;
      });
    }
    sigma.refresh();
  }

  ngOnDestroy(): void {
    if (this.dataService.sigma) {
      this.dataService.sigma.kill();
    }
  }


  public calculateBirdFlightDistanceBetween(lat1: number, lon1: number, lat2: number, lon2: number): number {
    let R = 6371;
    let dLat = (lat2 - lat1) * Math.PI / 180;
    let dLon = (lon2 - lon1) * Math.PI / 180;
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c * 1000;
    return Math.round(distance * 10000) / 10000
  }
}
