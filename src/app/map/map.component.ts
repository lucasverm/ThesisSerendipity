import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as Leaflet from 'leaflet';
import { icon, Marker } from 'leaflet';
import 'mapbox-gl-leaflet';
import { ZoiDemoPlanner } from 'plannerjs';
import { OsmService } from '../services/osm.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  private planner = new ZoiDemoPlanner();
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 14,
    center: { lat: 51.05349346, lng: 3.71974349 }
  }

  constructor(public router: Router, private osmService: OsmService) {
  }


  fixIssueWithMarker() {
    // known angular issue: https://stackoverflow.com/questions/41144319/leaflet-marker-not-found-production-env
    // this code will change the broken Marker's url, to a valid image from your assets folder

    const iconRetinaUrl = 'assets/images/leaflet/marker-icon-2x.png';
    const iconUrl = 'assets/images/leaflet/marker-icon.png';
    const shadowUrl = 'assets/images/leaflet/marker-shadow.png';
    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    Marker.prototype.options.icon = iconDefault;
  }


  initMarkers() {
    const initialMarkers = [
      {
        position: { lat: 51.05349346, lng: 3.71974349 },
        draggable: true
      }
    ];
    for (let index = 0; index < initialMarkers.length; index++) {
      const data = initialMarkers[index];
      const marker = this.generateMarker(data, index);
      //icon
      const iconRetinaUrl = 'assets/images/leaflet/marker-icon-2x-orange.png';
      const iconUrl = 'assets/images/leaflet/marker-icon-orange.png';
      const shadowUrl = 'assets/images/leaflet/marker-shadow.png';
      const iconOrange = icon({
        iconRetinaUrl,
        iconUrl,
        shadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      });
      marker.options.icon = iconOrange
      marker.addTo(this.map).bindPopup(`<b>Starting point</b> <p>${data.position.lat},  ${data.position.lng}</p>`);
      //this.map.panTo(data.position);
      this.markers.push(marker)
    }
  }

  generateMarker(data: any, index: number) {
    console.log(data.position)
    return Leaflet.marker(data.position, { draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

  generateMarkerWithJsonLdData(data: any) {
    let name = data['http://schema.org/name'][0]['@value'];
    let obj = {
      "lat": +data['http://schema.org/latitude'][0]['@value'],
      "lng": +data['http://schema.org/longitude'][0]['@value']
    }

    let marker = Leaflet.marker(obj, {})
      .on('click', (event) => this.markerClicked(event));
    marker.addTo(this.map).bindPopup(`<b>${name}</b><p>${obj.lat},  ${obj.lng}</p>`);
    this.markers.push(marker)
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.map.on('dragend', (event: any) => this.queryOSMandPutMarkersOnMap(+event.target.options.center.lat, +event.target.options.center.lng))
    this.fixIssueWithMarker();
    this.queryOSMandPutMarkersOnMap(this.map.getCenter().lat, this.map.getCenter().lng);
    this.initMarkers();
  }

  queryOSMandPutMarkersOnMap(lat: number, lng: number) {
    console.log(lat, lng);
    this.osmService.getStatigJsonLdMapDataOsm().forEach(t => this.generateMarkerWithJsonLdData(t));

    /*this.osmService
      .getMapData$(lat, lng)
      .subscribe(
        (val) => {
          console.log(val);
          return val;
        },
        (error: HttpErrorResponse) => {
          //this.errorMessage = error.error;
        }
      );*/
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any, index?: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event);
    console.log($event.target.getLatLng());
  }
}
