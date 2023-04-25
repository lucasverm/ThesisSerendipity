import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphComponent } from './graph/graph.component';
import { MapComponent } from './map/map.component';
import { ParseRmlComponent } from './parse-rml/parse-rml.component';
import { QueryComponent } from './query/query.component';

const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'query', component: QueryComponent },
  { path: 'parse', component: ParseRmlComponent },
  { path: 'graph', component: GraphComponent },
  { path: '', component: GraphComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
