import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ForwardGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    this.router.navigate(['/login'], {queryParams: route.queryParams});
    return false;
  }
}
