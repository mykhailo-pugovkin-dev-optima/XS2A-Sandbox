import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RoutingPath} from './common/models/routing-path.model';
import {LoginComponent} from './login/login.component';
import {ResultPageComponent} from './result-page/result-page.component';
import {ScaSelectionComponent} from "./ais/consent/sca-selection/sca-selection.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: RoutingPath.LOGIN,
        component: LoginComponent,
    },
    {
        path: RoutingPath.RESULT,
        component: ResultPageComponent,
    },
    {
      path: RoutingPath.SELECT_SCA,
      component: ScaSelectionComponent,
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {
}
