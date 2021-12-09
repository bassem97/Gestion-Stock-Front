import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthenticationService} from "./authService";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthenticationService,
              private router: Router,
              ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // @ts-ignore
    if(next.component.name === "LoginComponent"){
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['AdminLayoutComponent']);
        return false;
      }else{
        return true;
      }
    }else
    {
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['login']);
        return false;
      }else{
        return true;
      }
    }

  }
}
