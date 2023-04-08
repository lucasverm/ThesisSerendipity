import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OsmService } from '../services/osm.service';

@Component({
  selector: 'app-parse-rml',
  templateUrl: './parse-rml.component.html',
  styleUrls: ['./parse-rml.component.scss']
})
export class ParseRmlComponent {

  public toonDezeDataIsTurtle: boolean = true;
  public toonDezeData: String = "";
  constructor(private http: HttpClient, private osmService: OsmService) { }
  private data: any[];
  turtle: String = "";
  ngOnInit() {
    this.osmService.getJsonData().subscribe(d => {
      this.data = d.features;
      this.jsonToTurtl();
      this.toonDezeData = this.turtle;
    });

  }

  toggle() {
    if (this.toonDezeDataIsTurtle) {
      this.toonDezeData = JSON.stringify(this.data, null, 2);
      this.toonDezeDataIsTurtle = false;
    } else {
      this.toonDezeData = this.turtle;
      this.toonDezeDataIsTurtle = true;
    }
  }

  jsonToTurtl() {
    let sleutels = new Set();
    this.turtle += "@prefix schema: <http://schema.org/> . \n";
    this.turtle += "@prefix ex: <http://example.org/> . \n";
    this.turtle += "@prefix geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>.\n";
    let linkData: any[] = [...this.data]
    while (linkData.length != 0) {
      Object.keys(linkData[0]['properties']).forEach(t => sleutels.add(t));
      let idZonderNode: String = String(linkData[0]['id']).replace("node/", "");
      let tripleIdentifier = `<ex/${idZonderNode}>`;
      if (linkData[0]['properties']['amenity'] == "restaurant") {
        this.turtle += `${tripleIdentifier} a schema:Restaurant ;\n`;
      } else if (linkData[0]['properties']['amenity'] == "fast_food") {
        this.turtle += `${tripleIdentifier} a schema:FastFoodRestaurant ;\n`;
      } else if (linkData[0]['properties']['amenity'] == "cafe") {
        this.turtle += `${tripleIdentifier} a schema:CafeOrCoffeeShop ;\n`;
      } else if (linkData[0]['properties']['amenity'] == "bar") {
        this.turtle += `${tripleIdentifier} a schema:BarOrPub ;\n`;
      } else if (linkData[0]['properties']['amenity'] == "pub") {
        this.turtle += `${tripleIdentifier} a schema:BarOrPub ;\n`;
      } else if (linkData[0]['properties']['shop']) {
        if (linkData[0]['properties']['shop'] == "bicycle") {
          this.turtle += `${tripleIdentifier} a schema:BikeStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "bakery") {
          this.turtle += `${tripleIdentifier} a schema:Bakery ;\n`;
        } else {
          this.turtle += `${tripleIdentifier} a schema:Store ;\n`;
          console.log(linkData[0]['properties']);
        }
      } else if (linkData[0]['properties']['leisure']) {
        if (linkData[0]['properties']['leisure'] == "picnic_table") {
          this.turtle += `${tripleIdentifier} a schema:Place ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "playground") {
          this.turtle += `${tripleIdentifier} a schema:Playground ;\n`;
        } else {
          this.turtle += `${tripleIdentifier} a schema:Place ;\n`;
          console.log(linkData[0]['properties']);
        }
      } else {
        this.turtle += `${tripleIdentifier} a schema:Place ;\n`;
        console.log(linkData[0]['properties']);
      }

      if (linkData[0]['properties']['name']) this.turtle += `\tschema:name "${linkData[0]['properties']['name']}" ; \n`;
      if (linkData[0]['properties']['website']) this.turtle += `\tschema:url "${linkData[0]['properties']['website']}" ; \n`;
      if (linkData[0]['properties']['phone']) this.turtle += `\tschema:telephone "${linkData[0]['properties']['phone']}" ; \n`;
      if (linkData[0]['properties']['amenity']) this.turtle += `\tschema:amenityFeature "${linkData[0]['properties']['amenity']}" ; \n`;
      if (linkData[0]['properties']["addr:street"]) {
        this.turtle += `\tschema:PostalAddress [ 
          \ta schema:PostalAddress ;
          \tschema:streetAddress "${linkData[0]['properties']["addr:street"]}" ;\n`;
        if (linkData[0]['properties']["addr:housenumber"]) this.turtle += `\t\tschema:postOfficeBoxNumber "${linkData[0]['properties']["addr:housenumber"]}" ; \n`;
        if (linkData[0]['properties']["addr:postcode"]) this.turtle += `\t\tschema:postalCode "${linkData[0]['properties']["addr:postcode"]}" ; \n`;
        if (linkData[0]['properties']["addr:city"]) this.turtle += `\t\tschema:addressLocality "${linkData[0]['properties']["addr:city"]}" ; \n`;
        if (linkData[0]['properties']["addr:country"]) this.turtle += `\t\tschema:addressCountry "${linkData[0]['properties']["addr:country"]}" ; \n`;
        this.turtle += `\t] ; \n`;
      }
      if (linkData[0]['geometry']) {
        this.turtle += `\tschema:geo [ 
          \ta geo:Point ;
          \tgeo:lat "${linkData[0]['geometry']['coordinates'][0]}" ;
          \tgeo:long "${linkData[0]['geometry']['coordinates'][1]}" ;
        ] . \n`;
      }

      /*for (let j = 0; j < linkData.length; j++) {
        if (linkData[0]['id'] != linkData[j]['id']) {
          this.turtle += `\t afstand van ${linkData[0]['properties']['name']} naar ${linkData[j]['properties']['name']}:  ${this.calculateBirdFlightDistanceBetween(linkData[0]['geometry']['coordinates'][0], linkData[0]['geometry']['coordinates'][1], linkData[j]['geometry']['coordinates'][0], linkData[j]['geometry']['coordinates'][1])} \n`;
        }
      }*/
      linkData.splice(0, 1);
    }
    console.log(Array.from(sleutels).sort());
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



}
