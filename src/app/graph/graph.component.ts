import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import Graph from 'graphology';
import { dijkstra } from 'graphology-shortest-path';
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
  public distanceFactor = 0.001;
  public randomFactor = 0.2;
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
    //komkommertijd aan de reep
    //destination = "ex/203704458";
    //de centrale
    destination = "ex/497396025"

    //maak graaf
    this.graaf = new Graph();
    let data: any[] = this.poiData[`@graph`]
    //data = data.slice(0, 100);
    data.forEach((el) => {
      let nieuweNode = this.graaf.addNode(el['@id'], { label: el['schema:name'], color: 'grey', size: 6, x: Number(el['schema:geo']['geo:lat']), y: Number(el['schema:geo']['geo:long']), ...el });
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
          let distance = this.calculateBirdFlightDistanceBetween(Number(nodeAtr['schema:geo']['geo:lat']), Number(nodeAtr['schema:geo']['geo:long']), Number(nieuweNodeAtr['schema:geo']['geo:lat']), Number(nieuweNodeAtr['schema:geo']['geo:long']))
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
                  let correlation = 0;
                  try {
                    correlation = this.categoricalSimilaritiesObject[keywordVanNieuweNode][keywordVanNode]
                  } catch (error) {
                    console.log(this.categoricalSimilaritiesObject);
                    console.log(keywordVanNieuweNode);
                    console.log(keywordVanNode)
                  }
                  if (correlation > maxCorrelation) maxCorrelation = correlation;
                });
              });
            }
          }
          let gewicht = (this.categoryFactor * maxCorrelation) + (this.distanceFactor * distance) + (this.randomFactor * Math.random());
          this.graaf.addEdge(nieuweNode, node, {
            weight: gewicht * gewicht,
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
      if (node != huigigePositie && node != destination) {
        this.graaf.addEdge(huigigePositie, node, {
          weight: distance * distance,
          label: distance
        });
      }
    });
    this.calculateShortestPath(destination);
    this.visualizeGraph();
  }

  public calculateShortestPath(destination: string) {
    // Returning the shortest path between source & target
    let weg = dijkstra.bidirectional(this.graaf, 'huidigePositie', destination, 'weight');
    weg.forEach(t => {
      let atrData = this.graaf.getNodeAttributes(t);
      console.log(atrData["schema:name"])
      this.linkTheseNodesInVisualisation.add(t);
    })
  }

  sigma: Sigma;

  visualizeGraph() {
    if (this.container) {
      let graafWithoutEdges = this.graaf;
      graafWithoutEdges.clearEdges();
      this.sigma = new Sigma(graafWithoutEdges, this.container.nativeElement, {
        /*renderEdgeLabels: true,
        //nodeProgramClasses: { image: getNodeProgramImage() },
        //labelRenderer: drawLabel,
        //defaultNodeType: "image", 
        defaultEdgeType: "arrow",
        labelDensity: 0.07,
        labelGridCellSize: 60,
        labelRenderedSizeThreshold: 15,
        labelFont: "Lato, sans-serif",
        zIndex: true,
        defaultEdgeColor: "target"*/
      });
      this.sigma.on("enterNode", ({ node }) => {
        this.setHoveredNode(node);
      });
      this.sigma.on("leaveNode", () => {
        this.setHoveredNode(undefined);
      });
      this.sigma.setSetting("nodeReducer", (node, data) => {
        const res: Partial<NodeDisplayData> = { ...data };
        if (this.linkTheseNodesInVisualisation.has(node)) {
          res.color = "red";
        }
        return res;
      });
      this.sigma.setSetting("edgeReducer", (edge, data) => {
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
    this.sigma.refresh();
  }


  ngOnDestroy(): void {
    if (this.sigma) {
      this.sigma.kill();
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
