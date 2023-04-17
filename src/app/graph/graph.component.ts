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
  public data: any[];
  public categoricalSimilaritiesObject: any;
  public distanceFactor = 1;
  public randomFactor = 0;
  public categoryFactor = 1;
  public gemiddelde = 1000;
  public showToPrint = "";
  public linkTheseNodesInVisualisation: String[] = [];
  public steps: number = 6;
  public destination: any;
  public filteredDataSearchBox: any[] = [];
  @ViewChild("container") container: ElementRef;

  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit() {
    forkJoin({
      getTurtleOfNodeData$: this.dataService.getTurtleOfData$(this.dataService.getNodeJsonData$()),
      getTurtleOfWayData$: this.dataService.getTurtleOfData$(this.dataService.getWayJsonData$()),
      getTurtleOfRelationData$: this.dataService.getTurtleOfData$(this.dataService.getRelationJsonData$()),
      getCategoricalSimilaritiesObject$: this.dataService.getCategoricalSimilaritiesObject$()
    }).subscribe(results => {
      this.data = [... this.dataService.parsteTtlToJsonLd(results.getTurtleOfNodeData$)[`@graph`], ... this.dataService.parsteTtlToJsonLd(results.getTurtleOfWayData$)[`@graph`], ...this.dataService.parsteTtlToJsonLd(results.getTurtleOfRelationData$)[`@graph`]]
      this.data = this.data.slice(0, 1000);
      this.destination = this.data[0];
      this.categoricalSimilaritiesObject = results.getCategoricalSimilaritiesObject$;
      this.buildGraph(3.7197324, 51.0569223);
    })
  }

  filterData(event: any) {
    let filtered: any[] = [];
    let query:String = event.query.toLowerCase();
    for (let i = 0; i < this.data.length; i++) {
      let item = this.data[i];
      let itemName: String = String(item['schema:name']);
      if (itemName != undefined && itemName.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(item);
      }
    }
    this.filteredDataSearchBox = filtered;
  }

  buildGraph(huidigePositieLat: number, huidigePositieLong: number) {
    this.graaf = new Graph();
    let keywordsDestionation: string[] = this.keywordsToArray(this.destination["schema:keyword"]);
    //add huidige positie
    let huigigePositie = this.graaf.addNode("huidigePositie", {
      correlation: 1,
      distanceToHuidigePositie: 0,
      label: 'Huidige positie',
      color: 'grey',
      'schema:name': "huidigePositie",
      'schema:geo': {
        'geo:lat': huidigePositieLat,
        'geo:long': huidigePositieLong
      },
      x: huidigePositieLat,
      y: huidigePositieLong,
      size: 6
    });

    this.data.forEach((el) => {
      if (!this.graaf.hasNode(el['@id'])) {
        //voor elke node doe:
        let distanceNodeToHuidigePositie = this.calculateBirdFlightDistanceBetween(Number(el['schema:geo']['geo:lat']), Number(el['schema:geo']['geo:long']), Number(huidigePositieLat), Number(huidigePositieLong))
        //let nieuweNodeAtr = this.graaf.getNodeAttributes(nieuweNode);
        // correlation
        let keywordsNieuweNode: string[] = this.keywordsToArray(el["schema:keyword"]);
        let maxCorrelation = this.getMaxCorrelation(keywordsDestionation, keywordsNieuweNode);

        //add node
        let nieuweNode = this.graaf.addNode(el['@id'], {
          correlation: maxCorrelation,
          distanceToHuidigePositie: distanceNodeToHuidigePositie,
          label: el['schema:name'],
          color: 'grey',
          size: 6,
          x: Number(el['schema:geo']['geo:lat']),
          y: Number(el['schema:geo']['geo:long']),
          ...el
        });

        //add huidigePositieEdge
        let distanceInBetweenNodeAndHuigiePositie = this.calculateBirdFlightDistanceBetween(Number(el['schema:geo']['geo:lat']), Number(el['schema:geo']['geo:long']), Number(huidigePositieLat), Number(huidigePositieLong))
        if (el['@id'] != huigigePositie && el['@id'] != this.destination) {
          this.graaf.addEdge(huigigePositie, el['@id'], {
            distanceInBetweenNodes: distanceInBetweenNodeAndHuigiePositie,
            label: `dist: ${distanceInBetweenNodeAndHuigiePositie}`
          });
        }

        // add edge naar elke andere node
        this.graaf.forEachNode(node => {
          if (node != nieuweNode && node != huigigePositie) {
            let nodeAtr = this.graaf.getNodeAttributes(node);
            let distanceInBetweenNodes = this.calculateBirdFlightDistanceBetween(Number(nodeAtr['schema:geo']['geo:lat']), Number(nodeAtr['schema:geo']['geo:long']), Number(el['schema:geo']['geo:lat']), Number(el['schema:geo']['geo:long']))
            this.graaf.addEdge(nieuweNode, node, {
              distanceInBetweenNodes: distanceInBetweenNodes,
              label: `${distanceInBetweenNodes}`
            });
          }
        });
      }
    });
    this.visualizeGraph();
    this.calculatePath(3.7197324, 51.0569223);
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
    return maxCorrelation;
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

  public calculatePath(huidigePositieLat: number, huidigePositieLong: number) {
    if (this.destination != null) {
      let currentNode = this.destination['@id'];
      let weg: string[] = [currentNode];
      let afstandTussenDestinationEnHuidigePositie = this.calculateBirdFlightDistanceBetween(Number(this.destination['schema:geo']['geo:lat']), Number(this.destination['schema:geo']['geo:long']), huidigePositieLat, huidigePositieLong)
      let idealeAfstandPerStap = afstandTussenDestinationEnHuidigePositie / this.steps;
      let print0, print1, print2, print3;
      for (let i = 0; i < this.steps; ++i) {
        let maxWeight = 0;
        let verbindingTeNemen;
        for (let verbinding of this.graaf.edges(currentNode)) {
          if (!weg.includes(this.graaf.opposite(currentNode, verbinding))) {
            let correlation = this.graaf.getNodeAttributes(this.graaf.opposite(currentNode, verbinding))['correlation'];
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
            gewichtStapRichting = (1 / gewichtStapRichting) * 100 * this.categoryFactor;
            let gewichtCorrelatie = this.standaardAfwijking(correlation) * 100;
            //gewichtStapRichting = Math.pow(gewichtStapRichting, this.distanceFactor);
            //gewichtCorrelatie = Math.pow(gewichtCorrelatie, this.categoryFactor);
            let totaalGewicht = gewichtStapRichting + gewichtCorrelatie;
            //resulraat = absolute waarde minimal totaalGewicht
            if (totaalGewicht > maxWeight) {
              verbindingTeNemen = verbinding;
              maxWeight = totaalGewicht;
              print1 = gewichtStapRichting;
              print2 = correlation;
              print3 = gewichtCorrelatie;

            }
          }
        }
        //console.log(print0);
        console.log("gewichtStapRichting:" + print1);
        console.log(print2);
        console.log("gewichtCorrelatie:" + print3);
        currentNode = this.graaf.opposite(currentNode, verbindingTeNemen);
        weg.push(currentNode);

      }
      //toon weg
      weg.push("huidigePositie");
      weg.forEach(t => {
        let atrData = this.graaf.getNodeAttributes(t);

        //console.log(this.standaardAfwijking(Number(["correlation"])));
      });
      this.linkTheseNodesInVisualisation = weg;
    } else {
      this.linkTheseNodesInVisualisation = [];
    }
    this.visualizeWeg();
  }

  public standaardAfwijking(x: number): number {
    let standaardAfwijking = 0.2;
    return (1 / (standaardAfwijking * Math.sqrt(2 * Math.PI))) * Math.pow(Math.E, (- (Math.pow((x - this.gemiddelde / 1000), 2) / Math.pow((2 * standaardAfwijking), 2))))
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
}
