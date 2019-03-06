import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TanSelectionComponent} from "./ais/consent/tan-selection/tan-selection.component";

const routes: Routes = [{
  path: 'ais/auth',
  component: TanSelectionComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
