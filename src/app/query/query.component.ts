import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OsmService } from '../services/osm.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent {

  constructor(public router: Router, private OsmService: OsmService) { }

  ngOnInit() {
    this.getMapData();
  }

  getMapData() {
    this.OsmService
      .getMapData$()
      .subscribe(
        (val) => {
          console.log(val);
        },
        (error: HttpErrorResponse) => {
          //this.errorMessage = error.error;
        }
      );
  }
}
