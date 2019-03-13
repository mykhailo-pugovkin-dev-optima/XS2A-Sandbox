import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {ResultPageComponent} from './result-page/result-page.component';
import {TanConfirmationComponent} from './ais/consent/tan-confirmation/tan-confirmation.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ScaSelectionComponent} from './ais/consent/sca-selection/sca-selection.component';
import {BankOfferedComponent} from './ais/consent/bank-offered/bank-offered.component';
import {AccountDetailsComponent} from './account-details/account-details.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ResultPageComponent,
        ScaSelectionComponent,
        TanConfirmationComponent,
        BankOfferedComponent,
        AccountDetailsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [CookieService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
