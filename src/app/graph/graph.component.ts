import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import Graph from 'graphology';
import { forkJoin } from 'rxjs';
import { Sigma } from "sigma";
import { NodeDisplayData } from 'sigma/types';
import { DataService } from '../services/data.service';

declare var require: any;

interface State {
  hoveredNode?: string;
  searchQuery: string;

  // State derived from query:
  selectedNode?: string;
  suggestions?: Set<string>;

  // State derived from hovered node:
  hoveredNeighbors?: Set<string>;
}
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent {

  public state: State = { searchQuery: "" };
  public graaf: Graph;
  public data: any[];
  public categoricalSimilaritiesObject: any;
  public factor: number = 500;
  public randomFactor: number = 0;
  public linkTheseNodesInVisualisation: String[] = [];
  public destination: any;
  public filteredDataSearchBox: any[] = [];
  public loaded = false;
  public minDistanceToHuidigePositie = Infinity;
  public maxDistanceToHuidigePositie = 0;
  public minDistanceBetweenNodes = Infinity;
  public maxDistanceBetweenNodes = 0;

  @ViewChild("container") container: ElementRef;

  constructor(private http: HttpClient, private dataService: DataService) {
  }

  ngAfterViewInit() {

    forkJoin({
      getTurtleOfNodeData$: this.dataService.getTurtleOfData$(this.dataService.getNodeJsonData$()),
      getTurtleOfWayData$: this.dataService.getTurtleOfData$(this.dataService.getWayJsonData$()),
      getTurtleOfRelationData$: this.dataService.getTurtleOfData$(this.dataService.getRelationJsonData$()),
      getCategoricalSimilaritiesObject$: this.dataService.getCategoricalSimilaritiesObject$()
    }).subscribe(results => {
      this.data = [... this.dataService.parsteTtlToJsonLd(results.getTurtleOfNodeData$)[`@graph`], ... this.dataService.parsteTtlToJsonLd(results.getTurtleOfWayData$)[`@graph`], ...this.dataService.parsteTtlToJsonLd(results.getTurtleOfRelationData$)[`@graph`]]
      this.data = this.data.slice(0, 500);
      this.destination = this.data[0];
      this.categoricalSimilaritiesObject = results.getCategoricalSimilaritiesObject$;
      this.buildGraph(3.7197324, 51.0569223);
      this.visualizeGraph();
      this.calculatePath(3.7197324, 51.0569223);
    })
  }

  buildGraph(huidigePositieLat: number, huidigePositieLong: number) {
    this.graaf = new Graph();
    //add huidige positie
    this.data.push({
      label: 'Huidige positie',
      color: 'grey',
      'schema:name': "huidigePositie",
      'schema:geo': {
        'geo:lat': 3.7197324,
        'geo:long': 51.0569223
      },
      '@id': "huidigePositie",
      x: 3.7197324,
      y: 51.0569223,
      size: 6
    });
    this.addNodesToGraph(huidigePositieLat, huidigePositieLong);
    this.addEdgesToGraph(huidigePositieLat, huidigePositieLong);
    this.loaded = true;
  }

  public addNodesToGraph(huidigePositieLat: number, huidigePositieLong: number) {
    for (let i = 0; i < this.data.length; i++) {
      if (!this.graaf.hasNode(this.data[i]['@id'])) {
        let el = this.data[i];
        for (let j = i; j < this.data.length; j++) {
          let distanceNodeBetweenNodes = this.calculateBirdFlightDistanceBetween(Number(el['schema:geo']['geo:lat']), Number(el['schema:geo']['geo:long']), Number(this.data[j]['schema:geo']['geo:lat']), Number(this.data[j]['schema:geo']['geo:long']),)
          if (distanceNodeBetweenNodes < this.minDistanceBetweenNodes) this.minDistanceBetweenNodes = distanceNodeBetweenNodes;
          if (distanceNodeBetweenNodes > this.maxDistanceBetweenNodes) this.maxDistanceBetweenNodes = distanceNodeBetweenNodes;
        }
        //voor elke node doe:
        let distanceNodeToHuidigePositie = this.calculateBirdFlightDistanceBetween(Number(el['schema:geo']['geo:lat']), Number(el['schema:geo']['geo:long']), huidigePositieLat, huidigePositieLong)
        if (distanceNodeToHuidigePositie < this.minDistanceToHuidigePositie) this.minDistanceToHuidigePositie = distanceNodeToHuidigePositie;
        if (distanceNodeToHuidigePositie > this.maxDistanceToHuidigePositie) this.maxDistanceToHuidigePositie = distanceNodeToHuidigePositie;
        //add node
        let nieuweNode = this.graaf.addNode(el['@id'], {
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

  public addEdgesToGraph(huidigePositieLat: number, huidigePositieLong: number) {
    if (this.destination != null && this.destination != "") {
      this.graaf.clearEdges();
      let keywordsDestionation: string[] = this.keywordsToArray(this.destination["schema:keyword"]);
      this.graaf.forEachNode(vanNode => {
        this.graaf.forEachNode(naarNode => {
          if (vanNode != naarNode && !(vanNode == this.destination['@id'] && naarNode == "huidigePositie")) {
            let maxCorrelation = 1;
            if (vanNode == "huidigePositie") {
              maxCorrelation = 1;
            }
            else {
              let nodeData = this.graaf.getNodeAttributes(vanNode);
              let keywordsNieuweNode: string[] = this.keywordsToArray(nodeData["schema:keyword"]);
              maxCorrelation = this.getMaxCorrelation(keywordsDestionation, keywordsNieuweNode);
            }
            let vanNodeAtr = this.graaf.getNodeAttributes(vanNode);
            let naarNodeAtr = this.graaf.getNodeAttributes(naarNode);
            let distanceNodeToHuidigePositieNormalized = this.normalizeDistance(this.minDistanceToHuidigePositie, this.maxDistanceToHuidigePositie, this.calculateBirdFlightDistanceBetween(Number(vanNodeAtr['schema:geo']['geo:lat']), Number(vanNodeAtr['schema:geo']['geo:long']), huidigePositieLat, huidigePositieLong))
            let distanceInBetweenNodes = this.calculateBirdFlightDistanceBetween(Number(vanNodeAtr['schema:geo']['geo:lat']), Number(vanNodeAtr['schema:geo']['geo:long']), Number(naarNodeAtr['schema:geo']['geo:lat']), Number(naarNodeAtr['schema:geo']['geo:long']));
            let distanceInBetweenNodesNormalized = this.normalizeDistance(this.minDistanceBetweenNodes, this.maxDistanceBetweenNodes, distanceInBetweenNodes)
            let randomValue = Math.random();
            this.graaf.addDirectedEdge(vanNode, naarNode, {
              distanceInBetweenNodes: distanceInBetweenNodes,
              correlation: maxCorrelation,
              vanNode: vanNodeAtr["schema:name"],
              naarNode: naarNodeAtr["schema:name"],
              randomValue: randomValue,
              distanceNodeToHuidigePositieNormalized: distanceNodeToHuidigePositieNormalized,
              label: `${distanceInBetweenNodesNormalized}`
            });
          }
        });
      });
    }
  }

  public getMaxCorrelation(keywordsDestionation: string[], keywordsNieuweNode: string[]) {
    let maxCorrelation = 0;
    if (keywordsDestionation && keywordsNieuweNode) {
      keywordsNieuweNode.forEach(keywordVanNieuweNode => {
        keywordsDestionation.forEach(keywordVanNode => {
          let correlation = this.categoricalSimilaritiesObject[keywordVanNieuweNode][keywordVanNode]
          if (correlation > maxCorrelation) {
            maxCorrelation = correlation
          };
        });
      });
    }
    return 1 - maxCorrelation;
  }

  public keywordsToArray(input: any): string[] {
    let uitvoer: string[] = []
    if (input) {
      if (typeof (input) == "string") {
        uitvoer.push(input)
      } else {
        let keywords: any[] = input;
        keywords.forEach(t => uitvoer.push(t));
      }
    }
    return uitvoer;
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
        const weight = 100 * ((this.factor / 1000) * avgCorrelation) + ((1 - (this.factor / 1000)) * avgDistanceInBetweenNodes) + 0.03 * (this.randomFactor * edgeAtr['randomValue']);
        const distance = currentDistance + weight;
        if (distance < shortestPath[neighbor].distance) {
          shortestPath[neighbor].distance = distance;
          shortestPath[neighbor].previous = currentNode;
          shortestPath[neighbor].avgCorrelation = (shortestPath[currentNode].avgCorrelation + edgeAtr['correlation']);
          shortestPath[neighbor].avgDistanceInBetweenNodes = (shortestPath[currentNode].totalDistanceInBetweenNodes + edgeAtr['distanceInBetweenNodes']);
          shortestPath[neighbor].numberOfNodesBefore = shortestPath[currentNode].numberOfNodesBefore + 1;
        }
      });
    }

    console.log(shortestPath)
    let weg = [destination];
    currentNode = destination;
    while (currentNode != source) {
      currentNode = shortestPath[currentNode]['previous'];
      weg.push(currentNode)
    }
    return weg;
  }


  public calculatePath(huidigePositieLat: number, huidigePositieLong: number) {
    this.addEdgesToGraph(huidigePositieLat, huidigePositieLong);
    if (this.destination != null && this.destination != "") {
      //dijkstra
      let weg: any[] = this.dijkstra(this.graaf, this.destination['@id'], "huidigePositie");
      //toon weg
      weg.forEach(t => {
        let atrData = this.graaf.getNodeAttributes(t);
        console.log(atrData["schema:name"]);
      });
      this.linkTheseNodesInVisualisation = weg;
    } else {
      this.linkTheseNodesInVisualisation = [];
    }
    this.visualizeWeg();
  }

  /*public standaardAfwijking(x: number): number {
    let standaardAfwijking = 0.2;
    return (1 / (standaardAfwijking * Math.sqrt(2 * Math.PI))) * Math.pow(Math.E, (- (Math.pow((x - this.gemiddelde / 1000), 2) / Math.pow((2 * standaardAfwijking), 2))))
  }*/

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

  visualizeGraph() {
    if (this.container) {
      let graafWithoutEdges = this.graaf.copy();
      graafWithoutEdges.clearEdges();
      this.dataService.sigma = new Sigma(graafWithoutEdges, this.container.nativeElement, {
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
        this.setHoveredNode(node);
      });
      this.dataService.sigma.on("leaveNode", () => {
        this.setHoveredNode(undefined);
      });
    }
  }

  public visualizeWeg() {
    this.dataService.sigma.setSetting("nodeReducer", (node, data) => {
      const res: Partial<NodeDisplayData> = { ...data };
      if (this.linkTheseNodesInVisualisation.includes(node)) {
        res.color = "red";
        res.zIndex = 2;
      }
      return res;
    });
    /*this.dataService.sigma.setSetting("edgeReducer", (edge, data) => {
      const res: Partial<EdgeDisplayData> = { ...data };

      if (this.state.hoveredNode && !this.graaf.hasExtremity(edge, this.state.hoveredNode)) {
        res.hidden = true;
      }

      if (this.state.suggestions && (!this.state.suggestions.has(this.graaf.source(edge)) || !this.state.suggestions.has(this.graaf.target(edge)))) {
        res.hidden = true;
      }
      return res;
    });
    this.loaded = true;*/
  }

  setHoveredNode(node?: string) {
    if (node) {
      this.state.hoveredNode = node;
      this.state.hoveredNeighbors = new Set(this.graaf.neighbors(node));
    } else {
      this.state.hoveredNode = undefined;
      this.state.hoveredNeighbors = undefined;
    }
    this.dataService.sigma.refresh();
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
