import { Injectable } from '@angular/core';
import {CanActivate} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private cookieService: CookieService) { }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return undefined;
  // }

  canActivate() {
    if (this.cookieService.get('ACCESS_TOKEN')) {
      return true;
    }

    return false;
  }
}
