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
  public correlationFactor: number = 0.333;
  public distanceBetweenNodesFactor: number = 0.333;
  public randomFactor: number = 0.333;
  public linkTheseNodesInVisualisation: String[] = [];
  public destination: any;
  public filteredDataSearchBox: any[] = [];
  public loaded = false;
  public minDistanceToHuidigePositie = Infinity;
  public maxDistanceToHuidigePositie = 0;
  public minDistanceBetweenNodes = Infinity;
  public maxDistanceBetweenNodes = 0;
  public changingFactorValues: any = { value1: 0.333, value2: 0.333, value3: 0.333, };
  public calculatedWegToShow: any[];

  @ViewChild("container") container: ElementRef;
  @ViewChild("containerForUser") containerForUser: ElementRef;

  constructor(private http: HttpClient, private dataService: DataService) {
  }

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
      this.data = this.data.slice(0, 500);
      this.destination = this.data[0];
      this.categoricalSimilaritiesObject = results.getCategoricalSimilaritiesObject$;
      this.buildGraph(3.7197324, 51.0569223);
      this.visualizeGraphFull();
      this.calculatePath(3.7197324, 51.0569223);
    })
  }

  buildGraph(huidigePositieLat: number, huidigePositieLong: number) {
    this.graaf = new Graph();
    //add huidige positie
    this.data.push({
      label: 'Huidige positie',
      color: 'grey',
      'schema:name': "Current position",
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
              vanNodeId: vanNodeAtr["@id"],
              naarNodeId: naarNodeAtr["@id"],
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
      this.calculatedWegToShow = [];
      weg.forEach(t => {
        let atrData = this.graaf.getNodeAttributes(t);
        this.calculatedWegToShow.push(atrData); 
      });
      this.linkTheseNodesInVisualisation = weg;
    } else {
      this.linkTheseNodesInVisualisation = [];
    }
    this.visualizeWeg();
    this.visualizeGraphForUser();
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

  visualizeGraphFull() {
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
      this.calculatedWegToShow.forEach(node => {
        if (!userGraaf.hasNode(node['@id'])) {
          userGraaf.addNode(node['@id'], node);
        }
        let sortedArray = this.graaf.outNeighbors(node['@id']).map(buur => {
          return this.graaf.getDirectedEdgeAttributes(node['@id'], buur);
        }).sort((a: any, b: any) => a['distanceInBetweenNodes'] - b['distanceInBetweenNodes']);
        sortedArray.slice(0, 3).forEach(buur => {
          if (!userGraaf.hasNode(buur['naarNodeId'])) {
            userGraaf.addNode(buur['naarNodeId'], this.graaf.getNodeAttributes(buur['naarNodeId']));
          }
          userGraaf.addDirectedEdge(buur['vanNodeId'], buur['naarNodeId']);
        });
      })

      for (let i = 1; i < this.calculatedWegToShow.length; ++i) {
        if (!userGraaf.hasEdge(this.calculatedWegToShow[i - 1]['@id'], this.calculatedWegToShow[i]['@id'])) {
          userGraaf.addDirectedEdge(this.calculatedWegToShow[i - 1]['@id'], this.calculatedWegToShow[i]['@id']);
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

  public visualizeWeg() {
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
      this.state.hoveredNode = node;
      this.state.hoveredNeighbors = new Set(this.graaf.neighbors(node));
    } else {
      this.state.hoveredNode = undefined;
      this.state.hoveredNeighbors = undefined;
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
