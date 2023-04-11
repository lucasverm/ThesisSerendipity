import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Graph from 'graphology';
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
  public categoricalSimilaritiesObject: any[];

  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit() {
    forkJoin({
      getPoiTurtle$: this.dataService.getPoiTurtle$(),
      getCategoricalSimilaritiesObject$: this.dataService.getCategoricalSimilaritiesObject$()
    }).subscribe(results => {
      this.poiData = this.dataService.parsteTtlToJsonLd(results.getPoiTurtle$);
      this.categoricalSimilaritiesObject = results.getCategoricalSimilaritiesObject$;
      this.buildGraph();
    })
  }

  buildGraph() {
    this.graaf = new Graph();
    let data: any[] = this.poiData[`@graph`]
    data.forEach((el) => {
      //console.log(el)
      let nieuweNode = this.graaf.addNode(el['@id'], el);
      this.graaf.forEachNode(node => {
        if (node != nieuweNode) {
          this.graaf.addEdge(nieuweNode, node, {
            weight: 1
          });
        } 
      });
    })

    // Displaying useful information about your this.graaf
    console.log('Number of nodes', this.graaf.order);
    console.log('Number of edges', this.graaf.size);

    // Iterating over nodes
  }
}
