import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import Graph from 'graphology';
import { forkJoin } from 'rxjs';
import { Sigma } from "sigma";
import { EdgeDisplayData, NodeDisplayData } from 'sigma/types';
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
  public poiData: any;
  public categoricalSimilaritiesObject: any;
  public distanceFactor = 1;
  public randomFactor = 0;
  public categoryFactor = 1;
  public showToPrint = "";
  public linkTheseNodesInVisualisation: String[] = [];
  public steps: number = 6;
  public destination = "ex/203704458";
  @ViewChild("container") container: ElementRef | null = null;

  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit() {
    forkJoin({
      getPoiTurtle$: this.dataService.getPoiTurtle$(),
      getCategoricalSimilaritiesObject$: this.dataService.getCategoricalSimilaritiesObject$()
    }).subscribe(results => {
      this.poiData = this.dataService.parsteTtlToJsonLd(results.getPoiTurtle$);
      this.categoricalSimilaritiesObject = results.getCategoricalSimilaritiesObject$;
      //komkommertijd
      this.buildGraph(this.destination, 3.7197324, 51.0569223);
    })
  }

  buildGraph(destination: string, huidigePositieLat: number, huidigePositieLong: number) {
    this.graaf = new Graph();
    let data: any[] = this.poiData[`@graph`]
    //data = data.slice(0, 5);
    //let desinationDatadata = data.find(t => t['@id'] == destination);
    data.forEach((el) => {
      //voor elke node doe:
      let distanceNodeToHuidigePositie = this.calculateBirdFlightDistanceBetween(Number(el['schema:geo']['geo:lat']), Number(el['schema:geo']['geo:long']), Number(huidigePositieLat), Number(huidigePositieLong))
      let nieuweNode = this.graaf.addNode(el['@id'], {
        distanceToHuidigePositie: distanceNodeToHuidigePositie,
        label: el['schema:name'],
        color: 'grey',
        size: 6,
        x: Number(el['schema:geo']['geo:lat']),
        y: Number(el['schema:geo']['geo:long']),
        ...el
      });
      let nieuweNodeAtr = this.graaf.getNodeAttributes(nieuweNode);
      let keywordsNieuweNode = this.getKeywordsArray(nieuweNodeAtr["schema:keyword"]);


      //voor elke node die al in de graaf zit:
      this.graaf.forEachNode(node => {
        if (node != nieuweNode) {
          let nodeAtr = this.graaf.getNodeAttributes(node);
          let distanceInBetweenNodes = this.calculateBirdFlightDistanceBetween(Number(nodeAtr['schema:geo']['geo:lat']), Number(nodeAtr['schema:geo']['geo:long']), Number(nieuweNodeAtr['schema:geo']['geo:lat']), Number(nieuweNodeAtr['schema:geo']['geo:long']))
          let keywordsNode = this.getKeywordsArray(nodeAtr["schema:keyword"]);
          let maxCorrelation = this.getMaxCorrelationBetweenKeywordArrays(keywordsNieuweNode, keywordsNode);
          this.graaf.addEdge(nieuweNode, node, {
            maxCorrelation: maxCorrelation,
            distanceInBetweenNodes: distanceInBetweenNodes,
            label: `cor: ${maxCorrelation} dist: ${distanceInBetweenNodes}`
          });
        }
      });
    })

    //add huidige positie
    //Gravensteen
    let huigigePositie = this.graaf.addNode("huidigePositie", {
      distanceToHuidigePositie: 0,
      label: 'Huidige positie',
      color: 'red',
      'schema:name': "huidigePositie",
      'schema:geo': {
        'geo:lat': huidigePositieLat,
        'geo:long': huidigePositieLong
      },
      x: huidigePositieLat,
      y: huidigePositieLong,
      size: 6
    });
    let huigigePositieAtr = this.graaf.getNodeAttributes(huigigePositie);
    this.graaf.forEachNode(node => {
      let nodeAtr = this.graaf.getNodeAttributes(node);
      let distanceInBetweenNodes = this.calculateBirdFlightDistanceBetween(Number(nodeAtr['schema:geo']['geo:lat']), Number(nodeAtr['schema:geo']['geo:long']), Number(huigigePositieAtr['schema:geo']['geo:lat']), Number(huigigePositieAtr['schema:geo']['geo:long']))
      if (node != huigigePositie && node != destination) {
        this.graaf.addUndirectedEdge(huigigePositie, node, {
          distanceInBetweenNodes: distanceInBetweenNodes,
          maxCorrelation: 0,
          label: `dist: ${distanceInBetweenNodes}`
        });
      }
    });
    this.visualizeGraph();
    this.calculatePath(destination, 3.7197324, 51.0569223);
  }

  public calculatePath(destination: string, huidigePositieLat: number, huidigePositieLong: number) {
    let destinationNode = this.graaf.getNodeAttributes(destination);
    let currentNode = destination;
    let weg: string[] = [currentNode];
    let afstandTussenDestinationEnHuidigePositie = this.calculateBirdFlightDistanceBetween(Number(destinationNode['schema:geo']['geo:lat']), Number(destinationNode['schema:geo']['geo:long']), huidigePositieLat, huidigePositieLong)
    let idealeAfstandPerStap = afstandTussenDestinationEnHuidigePositie / this.steps;
    let print1, print2, print3, print4, print5;
    for (let i = 0; i < this.steps; ++i) {
      let maxWeight = 0;
      let verbindingTeNemen;
      for (let verbinding of this.graaf.edges(currentNode)) {
        if (!weg.includes(this.graaf.opposite(currentNode, verbinding))) {
          let correlation = this.graaf.getEdgeAttributes(verbinding)['maxCorrelation'];
          let distanceInBetweenNodes = this.graaf.getEdgeAttributes(verbinding)['distanceInBetweenNodes'];
          let distanceToHuidigePositieCurrentNode = this.graaf.getNodeAttributes(currentNode)['distanceToHuidigePositie'];
          let distanceToHuidigePositieNeighbourNode = this.graaf.getNodeAttributes(this.graaf.opposite(currentNode, verbinding))['distanceToHuidigePositie'];
          //afstandToDestination currentNode - afstandToDestination Neighbour + 200 = 0
          //zorgt dat stap richting currentNodeGaat
          let gewichtStapRichting = Math.abs(distanceToHuidigePositieCurrentNode - distanceToHuidigePositieNeighbourNode - idealeAfstandPerStap);

          //distanceInbetweeNodes - 200 = 0
          //zorgt voor knoop dicht bij vorige knoop
          gewichtStapRichting += Math.abs(distanceInBetweenNodes - idealeAfstandPerStap);
          //hoe hoger gewichtStapRichting hoe dichter bij elkaar
          gewichtStapRichting = (1 / gewichtStapRichting);
          let gewichtCorrelatie = 0;
          //gewichtStapRichting = Math.pow(gewichtStapRichting, this.distanceFactor);
          //gewichtCorrelatie = Math.pow(gewichtCorrelatie, this.categoryFactor);
          let totaalGewicht = gewichtStapRichting + gewichtCorrelatie;
          //resulraat = absolute waarde minimal totaalGewicht
          if (totaalGewicht > maxWeight) {
            verbindingTeNemen = verbinding;
            print1 = Math.abs(distanceToHuidigePositieCurrentNode - distanceToHuidigePositieNeighbourNode - idealeAfstandPerStap);
            print2 = Math.abs(distanceInBetweenNodes - idealeAfstandPerStap);
            print3 = gewichtStapRichting
            print4 = gewichtCorrelatie
            print5 = totaalGewicht
          }
        }
      }
      console.log(print1, print2, print3, print4, print5);
      currentNode = this.graaf.opposite(currentNode, verbindingTeNemen);
      weg.push(currentNode);
    }
    //toon weg
    weg.forEach(t => {
      let atrData = this.graaf.getNodeAttributes(t);
      console.log(atrData["schema:name"])
    });
    this.linkTheseNodesInVisualisation = weg;
    this.visualizeWeg();
  }

  visualizeGraph() {
    if (this.container) {
      let graafWithoutEdges = this.graaf.copy();
      graafWithoutEdges.clearEdges();
      this.dataService.sigma = new Sigma(graafWithoutEdges, this.container.nativeElement, {
        zIndex: true,
        renderEdgeLabels: true,
        defaultEdgeType: "arrow"
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
    this.dataService.sigma.setSetting("edgeReducer", (edge, data) => {
      const res: Partial<EdgeDisplayData> = { ...data };

      if (this.state.hoveredNode && !this.graaf.hasExtremity(edge, this.state.hoveredNode)) {
        res.hidden = true;
      }

      if (this.state.suggestions && (!this.state.suggestions.has(this.graaf.source(edge)) || !this.state.suggestions.has(this.graaf.target(edge)))) {
        res.hidden = true;
      }
      return res;
    });
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
    return Math.round(distance * 100) / 100
  }

  public getKeywordsArray(keywordsInput: any): string[] {
    let keywordsOutput: string[] = [];
    if (keywordsInput) {
      if (typeof (keywordsInput) == "string") {
        keywordsOutput.push(keywordsInput)
      } else {
        let keywords: any[] = keywordsInput;
        keywords.forEach(t => keywordsOutput.push(t));
      }
    }
    return keywordsOutput;
  }

  public getMaxCorrelationBetweenKeywordArrays(keywordsNode: string[], keywordsNieuweNode: string[]): number {
    let maxCorrelation: number = 0;
    keywordsNieuweNode.forEach(keywordVanNieuweNode => {
      keywordsNode.forEach(keywordVanNode => {
        let correlation = this.categoricalSimilaritiesObject[keywordVanNieuweNode][keywordVanNode]
        if (correlation > maxCorrelation) {
          maxCorrelation = correlation
        };
      });
    });
    return maxCorrelation;
  }
}
