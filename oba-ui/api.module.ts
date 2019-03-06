/* tslint:disable */
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration } from './api-configuration';

import { PSUAISService } from './src/app/services/psuais.service';
import { PSUPISService } from './src/app/services/psupis.service';
import { PSUSCAService } from './src/app/services/psusca.service';

/**
 * Provider for all Api services, plus ApiConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
    PSUAISService,
    PSUPISService,
    PSUSCAService
  ],
})
export class ApiModule { }
