import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Graph from 'graphology';
import { dijkstra } from 'graphology-shortest-path';
import { forkJoin } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent {
  public graaf: Graph;
  public poiData: any;
  public categoricalSimilaritiesObject: any;
  public distanceFactor = 0;
  public randomFactor = 1;
  public categoryFactor = 0;
  public showToPrint = "";

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
    //bistro lam gods, aan  st baafs
    destination = "ex/1212135543";
    this.graaf = new Graph();
    let data: any[] = this.poiData[`@graph`]
    data = data.slice(0, 200);
    data.forEach((el) => {
      let nieuweNode = this.graaf.addNode(el['@id'], el);
      let nieuweNodeAtr = this.graaf.getNodeAttributes(nieuweNode);
      let keywordsNieuweNode: string[] = [];
      if (typeof (nieuweNodeAtr["schema:keyword"]) == "string") {
        keywordsNieuweNode.push(nieuweNodeAtr["schema:keyword"])
      } else {
        let keywords: any[] = nieuweNodeAtr["schema:keyword"];
        keywords.forEach(t => keywordsNieuweNode.push(t));
      }
      this.graaf.forEachNode(node => {
        if (node != nieuweNode) {
          let nodeAtr = this.graaf.getNodeAttributes(node);
          let keywordsNode: string[] = [];
          if (typeof (nodeAtr["schema:keyword"]) == "string") {
            keywordsNode.push(nodeAtr["schema:keyword"])
          } else {
            let keywords: any[] = nodeAtr["schema:keyword"];
            keywords.forEach(t => keywordsNode.push(t));
          }
          let distance = this.calculateBirdFlightDistanceBetween(Number(nodeAtr['schema:geo']['geo:lat']), Number(nodeAtr['schema:geo']['geo:long']), Number(nieuweNodeAtr['schema:geo']['geo:lat']), Number(nieuweNodeAtr['schema:geo']['geo:long']))
          let maxCorrelation = 0;
          keywordsNieuweNode.forEach(keywordVanNieuweNode => {
            keywordsNode.forEach(keywordVanNode => {
              let correlation = this.categoricalSimilaritiesObject[keywordVanNieuweNode][keywordVanNode]
              if (correlation > maxCorrelation) maxCorrelation = correlation;
            });
          });
          this.graaf.addEdge(nieuweNode, node, {
            weight: (this.categoryFactor * maxCorrelation) + (this.distanceFactor * distance) + (this.randomFactor * Math.random())
          });
        }
      });
    })

    //add huidige positie
    //Gravensteen
    let huigigePositie = this.graaf.addNode("huidigePositie", { 'schema:name': "huidigePositie", 'schema:geo': { 'geo:lat': 3.7197324, 'geo:long': 51.0569223 } });
    //let huigigePositieAtr = this.graaf.getNodeAttributes(huigigePositie);
    this.graaf.forEachNode(node => {
      let nodeAtr = this.graaf.getNodeAttributes(node);
      if (node != huigigePositie && node != destination) {
        this.graaf.addEdge(huigigePositie, node, {
          weight: 0
        });
      }
    });
    this.calculateShortestPath(destination);
  }

  public calculateShortestPath(destination: string) {
    // Returning the shortest path between source & target
    let weg = dijkstra.bidirectional(this.graaf, 'huidigePositie', destination, 'weight');
    weg.forEach(t => {
      let atrData = this.graaf.getNodeAttributes(t);
      console.log(atrData["schema:name"])
    })

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
