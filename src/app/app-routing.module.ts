import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { ParseRmlComponent } from './parse-rml/parse-rml.component';
import { QueryComponent } from './query/query.component';
import { GraphComponent } from './graph/graph.component';

const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'query', component: QueryComponent },
  { path: 'parse', component: ParseRmlComponent },
  { path: 'graph', component: GraphComponent },
  { path: '', component: GraphComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
