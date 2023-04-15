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
  public distanceFactor = 0.00005;
  public randomFactor = 0;
  public categoryFactor = 1;
  public showToPrint = "";
  public linkTheseNodesInVisualisation: Set<string> = new Set();
  @ViewChild("container") container: ElementRef | null = null;

  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit() {
    forkJoin({
      getPoiTurtle$: this.dataService.getPoiTurtle$(),
      getCategoricalSimilaritiesObject$: this.dataService.getCategoricalSimilaritiesObject$()
    }).subscribe(results => {
      this.poiData = this.dataService.parsteTtlToJsonLd(results.getPoiTurtle$);
      this.categoricalSimilaritiesObject = results.getCategoricalSimilaritiesObject$;
      this.buildGraph("Belfort");
    })
  }

  buildGraph(destination: string) {
    destination = "ex/203704458"
    this.graaf = new Graph();
    let data: any[] = this.poiData[`@graph`]
    data = data.slice(0, 20);
    let desinationDatadata = data.find(t => t['@id'] == destination);
    data.forEach((el) => {
      //voor elke node doe:
      let distanceNodeToDestination = this.calculateBirdFlightDistanceBetween(Number(el['schema:geo']['geo:lat']), Number(el['schema:geo']['geo:long']), Number(desinationDatadata['schema:geo']['geo:lat']), Number(desinationDatadata['schema:geo']['geo:long']))
      let nieuweNode = this.graaf.addNode(el['@id'], { distanceToDestination: distanceNodeToDestination *this.distanceFactor, label: el['schema:name'], color: 'grey', size: 6, x: Number(el['schema:geo']['geo:lat']), y: Number(el['schema:geo']['geo:long']), ...el });
      let nieuweNodeAtr = this.graaf.getNodeAttributes(nieuweNode);
      let keywordsNieuweNode: string[] = [];
      if (nieuweNodeAtr["schema:keyword"]) {
        if (typeof (nieuweNodeAtr["schema:keyword"]) == "string") {
          keywordsNieuweNode.push(nieuweNodeAtr["schema:keyword"])
        } else {
          let keywords: any[] = nieuweNodeAtr["schema:keyword"];
          keywords.forEach(t => keywordsNieuweNode.push(t));
        }
      }
      //voor elke node die al in de graaf zit:
      this.graaf.forEachNode(node => {
        if (node != nieuweNode) {
          let nodeAtr = this.graaf.getNodeAttributes(node);
          let maxCorrelation = 0;
          if (nodeAtr["schema:keyword"]) {
            let keywordsNode: string[] = [];
            if (typeof (nodeAtr["schema:keyword"]) == "string") {
              keywordsNode.push(nodeAtr["schema:keyword"])
            } else {
              let keywords: any[] = nodeAtr["schema:keyword"];
              keywords.forEach(t => keywordsNode.push(t));
            }
            if (keywordsNode && keywordsNieuweNode) {
              keywordsNieuweNode.forEach(keywordVanNieuweNode => {
                keywordsNode.forEach(keywordVanNode => {
                  let correlation = this.categoricalSimilaritiesObject[keywordVanNieuweNode][keywordVanNode]
                  if (correlation > maxCorrelation) maxCorrelation = correlation;
                });
              });
            }
          }
          this.graaf.setNodeAttribute(node, 'maxCorrelation', maxCorrelation);
          let gewicht = (this.categoryFactor * (1 - maxCorrelation));
          this.graaf.addUndirectedEdge(nieuweNode, node, {
            weight: gewicht,
            //label: `tot: ${Math.round(gewicht * 1000) / 1000} cat: ${Math.round(this.categoryFactor * (1 - maxCorrelation) * 1000) / 1000} - dist: ${Math.round(this.distanceFactor * distance * 1000) / 1000}`
            label: gewicht
          });
        }
      });
    })

    //add huidige positie
    //Gravensteen
    let huigigePositie = this.graaf.addNode("huidigePositie", {
      label: 'Huidige positie',
      color: 'red',
      'schema:name': "huidigePositie", 'schema:geo': { 'geo:lat': 3.7197324, 'geo:long': 51.0569223 }, x: 3.7197324, y: 51.0569223, size: 6
    });
    let huigigePositieAtr = this.graaf.getNodeAttributes(huigigePositie);
    this.graaf.forEachNode(node => {
      let nodeAtr = this.graaf.getNodeAttributes(node);
      let distance = this.calculateBirdFlightDistanceBetween(Number(nodeAtr['schema:geo']['geo:lat']), Number(nodeAtr['schema:geo']['geo:long']), Number(huigigePositieAtr['schema:geo']['geo:lat']), Number(huigigePositieAtr['schema:geo']['geo:long']))
      let gewicht = (this.categoryFactor * (1 - nodeAtr['maxCorrelation']) + (this.distanceFactor * distance));
      console.log(gewicht)
      if (node != huigigePositie && node != destination) {
        this.graaf.addUndirectedEdge(huigigePositie, node, {
          weight: gewicht,
          label: gewicht
        });
      }
    });
    this.calculatePath(destination);
    this.visualizeGraph();
  }

  public calculatePath(destination: string) {
    let weg: string[] = ["huidigePositie"];
    let currentNode = "huidigePositie";
    while (currentNode != destination) {
      let minWeight = Infinity;
      let edgeTeNemen;
      for (let verbinding of this.graaf.edges(currentNode)) {
        let gewichtEdge = this.graaf.getEdgeAttributes(verbinding)['weight'];
        let gewichtKnoop = this.graaf.getNodeAttributes(this.graaf.opposite(currentNode, verbinding))['distanceToDestination'];
        let totaalGewicht = gewichtEdge + gewichtKnoop;
        //console.log(`tot: ${totaalGewicht} = knoop: ${gewichtKnoop}+edge: ${gewichtEdge}`)
        if (totaalGewicht < minWeight && !weg.includes(this.graaf.opposite(currentNode, verbinding))) {
          edgeTeNemen = verbinding;
          minWeight = totaalGewicht
        }
      }
      currentNode = this.graaf.opposite(currentNode, edgeTeNemen);
      weg.push(currentNode);
    }
    weg.forEach(t => {
      let atrData = this.graaf.getNodeAttributes(t);
      console.log(atrData["schema:name"])
      this.linkTheseNodesInVisualisation.add(t);
    });
  }

  visualizeGraph() {
    if (this.container) {
      let graafWithoutEdges = this.graaf;
      //graafWithoutEdges.clearEdges();
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
      this.dataService.sigma.setSetting("nodeReducer", (node, data) => {
        const res: Partial<NodeDisplayData> = { ...data };
        if (this.linkTheseNodesInVisualisation.has(node)) {
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
