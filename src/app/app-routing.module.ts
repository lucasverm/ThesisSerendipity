import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeafletComponent } from './leaflet/leaflet.component';

const routes: Routes = [{ path: '', component: LeafletComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
