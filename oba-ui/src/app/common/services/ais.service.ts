import {Injectable} from '@angular/core';
import {PSUAISService} from "../../../../api/services/psuais.service";
import {Observable} from "rxjs/internal/Observable";
import {ConsentAuthorizeResponse} from "../../../../api/models/consent-authorize-response";
import LoginUsingPOSTParams = PSUAISService.LoginUsingPOSTParams;
import AisAuthUsingGETParams = PSUAISService.AisAuthUsingGETParams;
import {AuthorizeResponse} from "../../../../api/models";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AisService {
   // aisAuth :PSUAISService.AisAuthUsingGETParams;

  constructor(private aisService: PSUAISService, private http: HttpClient) {
  }
  //  public loginUsingAuthorizationId(params: LoginUsingPOSTParams): Observable<ConsentAuthorizeResponse> {
  //     console.log('LoginUsingPOSTParams: ', params);
  //     return this.aisService.loginUsingPOST(params);
  //  }
  //
  // public aisAuth(params: AisAuthUsingGETParams): Observable<AuthorizeResponse> {
  //   return this.aisService.aisAuthUsingGET(params);
  // }

  public aisAuth(params: any) {
    return this.http.get('http://localhost:8090/ais/auth', {
      params: params,
      withCredentials: true
    })
  }

  public aisLogin(params: any, consentCookie: string, authorisationId: string, encryptedConsentId: string) {
    return this.http.post('http://localhost:8090/ais/' + encryptedConsentId + '/authorisation/' + authorisationId + '/login', {}, {
      params: params,
      withCredentials: true,
    })
  }


}
