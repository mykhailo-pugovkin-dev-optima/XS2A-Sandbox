import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoutingPath} from './common/models/routing-path.model';
import {LoginComponent} from './login/login.component';
import {ResultPageComponent} from './result-page/result-page.component';
import {ScaSelectionComponent} from "./ais/consent/sca-selection/sca-selection.component";
import {TanConfirmationComponent} from "./ais/consent/tan-confirmation/tan-confirmation.component";
import {AuthGuard} from "./common/guards/auth-guard.service";
import {ForwardGuard} from "./common/guards/forward-guard.service";

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate: [ForwardGuard]
    },
    {
        path: RoutingPath.LOGIN,
        component: LoginComponent,
    },
    {
        path: RoutingPath.RESULT,
        component: ResultPageComponent,
        canActivate: [AuthGuard]
    },
    {
      path: RoutingPath.SELECT_SCA,
      component: ScaSelectionComponent,
      canActivate: [AuthGuard]
    },
    {
      path: RoutingPath.CONFIRM_TAN,
      component: TanConfirmationComponent,
      canActivate: [AuthGuard]
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
