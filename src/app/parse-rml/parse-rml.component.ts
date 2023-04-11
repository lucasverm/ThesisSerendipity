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
  public poiTurtle: String;
  public categoricalSimilaritiesTurtle: String;

  ngOnInit() {
    this.dataService.getPoiJsonData$().subscribe(t => this.poiJson = t);
    this.dataService.getPoiTurtle$().subscribe(t => this.poiTurtle = t);
    this.dataService.getCategoricalSimilaritiesTurtle$().subscribe(t => this.categoricalSimilaritiesTurtle = t);
  }


  changeShowedData(what: string) {
    if (what == "POI") {
      this.toonDezeData = this.poiTurtle;
    } else if (what == "categorical_similarities") {
      this.toonDezeData = this.categoricalSimilaritiesTurtle;
    } else if (what == "osm") {
      this.toonDezeData = JSON.stringify(this.poiJson, null, 2)
    }
  }


  calculateBirdFlightDistanceBetween(lat1: number, lon1: number, lat2: number, lon2: number): number {
    let R = 6371;
    let dLat = (lat2 - lat1) * Math.PI / 180;
    let dLon = (lon2 - lon1) * Math.PI / 180;
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c * 1000;
    return Math.round(distance * 100) / 100
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
