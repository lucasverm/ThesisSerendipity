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
  public correlationFactor: number = 0.333;
  public distanceBetweenNodesFactor: number = 0.333;
  public randomFactor: number = 0.333;
  public linkTheseNodesInVisualisation: String[] = [];
  public destination: any;
  public filteredDataSearchBox: any[] = [];
  public loaded = false;
  public minDistanceToCurrentPosition = Infinity;
  public maxDistanceToCurrentPosition = 0;
  public minDistanceBetweenNodes = Infinity;
  public maxDistanceBetweenNodes = 0;
  public changingFactorValues: any = { value1: 0.333, value2: 0.333, value3: 0.333, };
  public calculatedWayToShow: any[];

  @ViewChild("container") container: ElementRef;
  @ViewChild("containerForUser") containerForUser: ElementRef;

  constructor(private http: HttpClient, private dataService: DataService) {
  }

  handleTriangleChange(event: any) {
    this.correlationFactor = Math.round(event['value1'] * 100) / 100;
    this.distanceBetweenNodesFactor = Math.round(event['value2'] * 100) / 100;
    this.randomFactor = Math.round(event['value3'] * 100) / 100;
    this.calculatePath(3.7197324, 51.0569223, false);
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
      //this.data = this.data.slice(0, 1500);
      console.log(this.data.length)
      this.destination = this.data[0];
      this.categoricalSimilaritiesObject = results.getCategoricalSimilaritiesObject$;
      this.buildGraph(3.7197324, 51.0569223);
      //this.visualizeGraphFull();
      this.calculatePath(3.7197324, 51.0569223, true);
    })
  }

  buildGraph(currentPositionLat: number, currentPositionLong: number) {
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
  }

  public addNodesToGraph(currentPositionLat: number, currentPositionLong: number) {
    for (let i = 0; i < this.data.length; i++) {
      if (!this.graph.hasNode(this.data[i]['@id'])) {
        let el = this.data[i];
        // calculate min and max for distanceNodeBetweenNodes & distanceNodeToCurrentPosition
        for (let j = i; j < this.data.length; j++) {
          let distanceNodeBetweenNodes = this.calculateBirdFlightDistanceBetween(Number(el['schema:geo']['geo:lat']), Number(el['schema:geo']['geo:long']), Number(this.data[j]['schema:geo']['geo:lat']), Number(this.data[j]['schema:geo']['geo:long']),)
          if (distanceNodeBetweenNodes < this.minDistanceBetweenNodes) this.minDistanceBetweenNodes = distanceNodeBetweenNodes;
          if (distanceNodeBetweenNodes > this.maxDistanceBetweenNodes) this.maxDistanceBetweenNodes = distanceNodeBetweenNodes;
        }
        let distanceNodeToCurrentPosition = this.calculateBirdFlightDistanceBetween(Number(el['schema:geo']['geo:lat']), Number(el['schema:geo']['geo:long']), currentPositionLat, currentPositionLong)
        if (distanceNodeToCurrentPosition < this.minDistanceToCurrentPosition) this.minDistanceToCurrentPosition = distanceNodeToCurrentPosition;
        if (distanceNodeToCurrentPosition > this.maxDistanceToCurrentPosition) this.maxDistanceToCurrentPosition = distanceNodeToCurrentPosition;
        //add node
        let nieuweNode = this.graph.addNode(el['@id'], {
          label: el['schema:name'],
          color: 'grey',
          size: 6,
          x: Number(el['schema:geo']['geo:lat']),
          y: Number(el['schema:geo']['geo:long']),
          ...el
        });
      }
    };
  }

  public addEdgesToGraph(currentPositionLat: number, currentPositionLong: number) {
    if (this.destination != null && this.destination != "") {
      this.graph.clearEdges();
      let keywordsDestionation: string[] = this.destination["schema:keyword"]['@list']
      this.graph.forEachNode(fromNode => {
        this.graph.forEachNode(toNode => {
          if (fromNode != toNode && !(fromNode == this.destination['@id'] && toNode == "currentPosition")) {
            let maxCorrelation = 1;
            if (fromNode == "currentPosition") {
              maxCorrelation = 1;
            }
            else {
              let nodeData = this.graph.getNodeAttributes(fromNode);
              let keywordsNewNode: string[] = nodeData["schema:keyword"]['@list']
              maxCorrelation = this.getMaxCorrelation(keywordsDestionation, keywordsNewNode);
            }
            let fromNodeAtr = this.graph.getNodeAttributes(fromNode);
            let toNodeAtr = this.graph.getNodeAttributes(toNode);
            let distanceNodeToCurrentPositionNormalized = this.normalizeDistance(this.minDistanceToCurrentPosition, this.maxDistanceToCurrentPosition, this.calculateBirdFlightDistanceBetween(Number(fromNodeAtr['schema:geo']['geo:lat']), Number(fromNodeAtr['schema:geo']['geo:long']), currentPositionLat, currentPositionLong))
            let distanceInBetweenNodes = this.calculateBirdFlightDistanceBetween(Number(fromNodeAtr['schema:geo']['geo:lat']), Number(fromNodeAtr['schema:geo']['geo:long']), Number(toNodeAtr['schema:geo']['geo:lat']), Number(toNodeAtr['schema:geo']['geo:long']));
            let distanceInBetweenNodesNormalized = this.normalizeDistance(this.minDistanceBetweenNodes, this.maxDistanceBetweenNodes, distanceInBetweenNodes)
            let randomValue = Math.random();
            this.graph.addDirectedEdge(fromNode, toNode, {
              distanceInBetweenNodes: distanceInBetweenNodes,
              correlation: maxCorrelation,
              fromNode: fromNodeAtr["schema:name"],
              toNode: toNodeAtr["schema:name"],
              fromNodeId: fromNodeAtr["@id"],
              toNodeId: toNodeAtr["@id"],
              randomValue: randomValue,
              distanceNodeToCurrentPositionNormalized: distanceNodeToCurrentPositionNormalized,
              label: `${distanceInBetweenNodesNormalized}`
            });
          }
        });
      });
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
            console.log("error:");
            console.log(keywordOfNewNode);
            console.log(keywordOfNode)
          }
          if (correlation > maxCorrelation) {
            maxCorrelation = correlation
          };
        });
      });
    }
    return 1 - maxCorrelation;
  }

  dijkstra(graph: Graph, source: any, destination: any): any {
    const shortestPath: any = {};
    // Initialize shortest path object with infinite distance for all nodes except the source
    graph.forEachNode((node: any) => {
      shortestPath[node] = {
        distance: node === source ? 0 : Infinity,
        previous: null,
        avgCorrelation: 0,
        totalDistanceInBetweenNodes: 0,
        totalRandomnes: 0,
        numberOfNodesBefore: 1
      };
    });

    // Set of unvisited nodes
    const unvisitedNodes = new Set(graph.nodes());
    let currentNode: any = source;

    while (unvisitedNodes.size > 0) {
      // Find the unvisited node with the smallest distance
      let currentDistance = Infinity;
      unvisitedNodes.forEach((node) => {
        if (shortestPath[node].distance < currentDistance) {
          currentNode = node;
          currentDistance = shortestPath[node].distance;
        }
      });

      if (currentNode === null) {
        break;
      }

      // Remove the current node from the unvisited set
      unvisitedNodes.delete(currentNode);

      // Visit each neighbor of the current node and update their distances
      const neighbors = graph.outNeighbors(currentNode);

      neighbors.forEach((neighbor) => {
        const edgeAtr = graph.getEdgeAttributes(currentNode, neighbor);
        const avgCorrelation = (shortestPath[currentNode].avgCorrelation + edgeAtr['correlation']) / (shortestPath[currentNode].numberOfNodesBefore + 1)
        const avgDistanceInBetweenNodes = (shortestPath[currentNode].totalDistanceInBetweenNodes + edgeAtr['distanceInBetweenNodes']) / (shortestPath[currentNode].numberOfNodesBefore + 1)
        const avgRandomness = (shortestPath[currentNode].totalRandomnes + edgeAtr['randomValue']) / (shortestPath[currentNode].numberOfNodesBefore + 1)
        const weight = 100 * ((this.correlationFactor) * avgCorrelation) + ((this.distanceBetweenNodesFactor) * avgDistanceInBetweenNodes) + 0.03 * (this.randomFactor * avgRandomness);
        const distance = currentDistance + weight;
        if (distance < shortestPath[neighbor].distance) {
          shortestPath[neighbor].distance = distance;
          shortestPath[neighbor].previous = currentNode;
          shortestPath[neighbor].avgCorrelation = (shortestPath[currentNode].avgCorrelation + edgeAtr['correlation']);
          shortestPath[neighbor].avgDistanceInBetweenNodes = (shortestPath[currentNode].totalDistanceInBetweenNodes + edgeAtr['distanceInBetweenNodes']);
          shortestPath[neighbor].totalRandomnes = (shortestPath[currentNode].totalRandomnes + edgeAtr['randomValue']);
          shortestPath[neighbor].numberOfNodesBefore = shortestPath[currentNode].numberOfNodesBefore + 1;
        }
      });
    }
    let way = [destination];
    currentNode = destination;
    while (currentNode != source) {
      currentNode = shortestPath[currentNode]['previous'];
      way.push(currentNode)
    }
    return way;
  }

  public calculatePath(currentPositionLat: number, currentPositionLong: number, destinationChanged: boolean) {
    if (this.destination != null && this.destination != "") {
      if (destinationChanged) {
        this.addEdgesToGraph(currentPositionLat, currentPositionLong);
      }
      //dijkstra
      let way: any[] = this.dijkstra(this.graph, this.destination['@id'], "currentPosition");
      //toon way
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
    this.visualizeWay();
    this.visualizeGraphForUser();
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
    if (this.container) {
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
        defaultEdgeColor: "target"*/
      });
      this.dataService.sigma.on("enterNode", ({ node }) => {
        this.setHoveredNode(this.dataService.sigma, node);
      });
      this.dataService.sigma.on("leaveNode", () => {
        this.setHoveredNode(this.dataService.sigma, undefined);
      });
    }
  }

  visualizeGraphForUser() {
    if (this.dataService.sigmaUser) this.dataService.sigmaUser.kill();
    if (this.containerForUser) {
      let userGraaf = new Graph();
      this.calculatedWayToShow.forEach(node => {
        if (!userGraaf.hasNode(node['@id'])) {
          userGraaf.addNode(node['@id'], node);
        }
        let sortedArray = this.graph.outNeighbors(node['@id']).map(neighbor => {
          return this.graph.getDirectedEdgeAttributes(node['@id'], neighbor);
        }).sort((a: any, b: any) => a['distanceInBetweenNodes'] - b['distanceInBetweenNodes']);
        sortedArray.slice(0, 3).forEach(neighbor => {
          if (!userGraaf.hasNode(neighbor['toNodeId'])) {
            userGraaf.addNode(neighbor['toNodeId'], this.graph.getNodeAttributes(neighbor['toNodeId']));
          }
          userGraaf.addDirectedEdge(neighbor['fromNodeId'], neighbor['toNodeId']);
        });
      })

      for (let i = 1; i < this.calculatedWayToShow.length; ++i) {
        if (!userGraaf.hasEdge(this.calculatedWayToShow[i - 1]['@id'], this.calculatedWayToShow[i]['@id'])) {
          userGraaf.addDirectedEdge(this.calculatedWayToShow[i - 1]['@id'], this.calculatedWayToShow[i]['@id']);
        }
      }

      this.dataService.sigmaUser = new Sigma(userGraaf, this.containerForUser.nativeElement, {
        zIndex: true,
        renderEdgeLabels: true,
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
          res.zIndex = 2;
        }
        return res;
      });
    }
  }

  public visualizeWay() {
    if (this.dataService.sigma) {
      this.dataService.sigma.setSetting("nodeReducer", (node, data) => {
        const res: Partial<NodeDisplayData> = { ...data };
        if (this.linkTheseNodesInVisualisation.includes(node)) {
          res.color = "red";
          res.zIndex = 2;
        }
        return res;
      });
    }
  }

  setHoveredNode(sigma: Sigma, node?: string) {
    if (node) {
      this.hoveredNode = node;
      this.hoveredNeighbors = new Set(this.graph.neighbors(node));
    } else {
      this.hoveredNode = undefined;
      this.hoveredNeighbors = undefined;
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
