/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AuthorizeResponse } from '../models/authorize-response';
import { ConsentAuthorizeResponse } from '../models/consent-authorize-response';

/**
 * Provides access to online banking account functionality
 */
@Injectable({
  providedIn: 'root',
})
class PSUAISService extends __BaseService {
  static readonly aisAuthUsingGETPath = '/ais/auth';
  static readonly loginUsingPOSTPath = '/ais/{encryptedConsentId}/authorisation/{authorisationId}/login';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `PSUAISService.AisAuthUsingGETParams` containing the following parameters:
   *
   * - `redirectId`: redirectId
   *
   * - `encryptedConsentId`: encryptedConsentId
   *
   * @return OK
   */
  aisAuthUsingGETResponse(params: PSUAISService.AisAuthUsingGETParams): __Observable<__StrictHttpResponse<AuthorizeResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.redirectId != null) __params = __params.set('redirectId', params.redirectId.toString());
    if (params.encryptedConsentId != null) __params = __params.set('encryptedConsentId', params.encryptedConsentId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ais/auth`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AuthorizeResponse>;
      })
    );
  }
  /**
   * @param params The `PSUAISService.AisAuthUsingGETParams` containing the following parameters:
   *
   * - `redirectId`: redirectId
   *
   * - `encryptedConsentId`: encryptedConsentId
   *
   * @return OK
   */
  aisAuthUsingGET(params: PSUAISService.AisAuthUsingGETParams): __Observable<AuthorizeResponse> {
    return this.aisAuthUsingGETResponse(params).pipe(
      __map(_r => _r.body as AuthorizeResponse)
    );
  }

  /**
   * @param params The `PSUAISService.LoginUsingPOSTParams` containing the following parameters:
   *
   * - `pin`: pin
   *
   * - `login`: login
   *
   * - `encryptedConsentId`: encryptedConsentId
   *
   * - `authorisationId`: authorisationId
   *
   * - `consentCookieString`: consentCookieString
   *
   * @return OK
   */
  loginUsingPOSTResponse(params: PSUAISService.LoginUsingPOSTParams): __Observable<__StrictHttpResponse<ConsentAuthorizeResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.pin != null) __params = __params.set('pin', params.pin.toString());
    if (params.login != null) __params = __params.set('login', params.login.toString());


    __body = params.consentCookieString;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ais/${params.encryptedConsentId}/authorisation/${params.authorisationId}/login`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConsentAuthorizeResponse>;
      })
    );
  }
  /**
   * @param params The `PSUAISService.LoginUsingPOSTParams` containing the following parameters:
   *
   * - `pin`: pin
   *
   * - `login`: login
   *
   * - `encryptedConsentId`: encryptedConsentId
   *
   * - `authorisationId`: authorisationId
   *
   * - `consentCookieString`: consentCookieString
   *
   * @return OK
   */
  loginUsingPOST(params: PSUAISService.LoginUsingPOSTParams): __Observable<ConsentAuthorizeResponse> {
    return this.loginUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as ConsentAuthorizeResponse)
    );
  }
}

module PSUAISService {

  /**
   * Parameters for aisAuthUsingGET
   */
  export interface AisAuthUsingGETParams {

    /**
     * redirectId
     */
    redirectId: string;

    /**
     * encryptedConsentId
     */
    encryptedConsentId: string;
  }

  /**
   * Parameters for loginUsingPOST
   */
  export interface LoginUsingPOSTParams {

    /**
     * pin
     */
    pin: string;

    /**
     * login
     */
    login: string;

    /**
     * encryptedConsentId
     */
    encryptedConsentId: string;

    /**
     * authorisationId
     */
    authorisationId: string;

    /**
     * consentCookieString
     */
    consentCookieString?: string;
  }
}

export { PSUAISService }
