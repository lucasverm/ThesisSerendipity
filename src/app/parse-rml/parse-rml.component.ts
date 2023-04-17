import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-parse-rml',
  templateUrl: './parse-rml.component.html',
  styleUrls: ['./parse-rml.component.scss']
})
export class ParseRmlComponent {

  constructor(private http: HttpClient, private dataService: DataService) { }
  public toonDezeData: String;
  public poiJson: any[];
  public poiNodeTurtle: String;
  public poiWayTurtle: String;
  public categoricalSimilaritiesTurtle: String;
  public dataAllKeywords: any[];
  ngOnInit() {
    this.dataService.getNodeJsonData$().subscribe(t => this.poiJson = t);
    this.dataService.getTurtleOfData$(this.dataService.getNodeJsonData$()).subscribe(t => {
      this.poiNodeTurtle = t;
      this.dataAllKeywords = this.dataService.allKeywords;
    });
    this.dataService.getTurtleOfData$(this.dataService.getWayJsonData$()).subscribe(t => {
      this.poiWayTurtle = t;
      //this.dataAllKeywords = this.dataService.allKeywords;
    });
    this.dataService.getCategoricalSimilaritiesTurtle$().subscribe(t => this.categoricalSimilaritiesTurtle = t);
  }

  changeShowedData(what: string) {
    if (what == "NODE") {
      this.toonDezeData = this.poiNodeTurtle;
    } else if (what == "WAY") {
      this.toonDezeData = this.poiWayTurtle;
    } else if (what == "categorical_similarities") {
      this.toonDezeData = this.categoricalSimilaritiesTurtle;
    } else if (what == "osm") {
      this.toonDezeData = JSON.stringify(this.poiJson, null, 2)
    } else if (what == "dataCategories") {
      this.toonDezeData = JSON.stringify(this.dataAllKeywords, null, 2)
    }
  }

  copyMessage() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.toonDezeData.toString()
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
