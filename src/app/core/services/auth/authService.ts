import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from '../../models/login';
import {environment} from "../../../../environments/environment";
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  url =  environment.url + 'auth/';
  jwt: string;
  email: string;
  roles: Array<string>;
  constructor(private http: HttpClient) {}

  authenticate(login: Login) {
    return this.http.post(this.url + 'login/' , login);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  saveToken(jwt: string) {
    localStorage.setItem("token",jwt) ;
  }

  private parseJWT() {
    const jwtHelper = new JwtHelperService();
    const jwtObject = jwtHelper.decodeToken(this.jwt);
    // this.email = jwtObject.obj;
    // this.roles = jwtObject.roles;
  }
  isAdmin() {
    return this.roles.indexOf('ADMIN') >= 0;
  }

  isUser() {
    return this.roles.indexOf('USER') >= 0;
  }

  isAuthentified() {
    return this.roles && (this.isAdmin() || this.isUser());
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.reload();
  }

  register = (user: User) => {
    return this.http.post(this.url + 'register', user);
  };
}
