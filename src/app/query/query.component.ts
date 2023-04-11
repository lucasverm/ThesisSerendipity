import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent {

  constructor(public router: Router, private DataService: DataService) { }

  ngOnInit() {
    this.getMapData();
  }

  getMapData() {
    this.DataService
      .getOSMData$()
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
