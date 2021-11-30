import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Client } from '../../models/client';
import { Observable, throwError } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Login } from '../../models/login';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  url = 'http://localhost:8080/GE/';
  jwt: string;
  email: string;
  headers: HttpHeaders = new HttpHeaders();
  roles: Array<string>;
  constructor(private http: HttpClient) {}

  authenticate(login: Login) {
    this.headers.append('Access-Control-Allow-Headers', 'Content-Type');
    this.headers.append('Access-Control-Allow-Methods', 'GET');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //
    // let body = new URLSearchParams();
    // body.set('user', login.username);
    // body.set('password', login.password);
    const body = new HttpParams()
      .set(`user`, login.username)
      .set(`password`, login.password);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    headers.append('response-type', 'text');

    console.log(body);
    return this.http.post(this.url + 'Authentication', body.toString(), {
      headers,
      observe: 'response',
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  saveToken(jwt: string) {
    localStorage.setItem('token', jwt);
    this.jwt = jwt;
    this.parseJWT();
  }

  private parseJWT() {
    const jwtHelper = new JwtHelperService();
    const jwtObject = jwtHelper.decodeToken(this.jwt);
    this.email = jwtObject.obj;
    this.roles = jwtObject.roles;
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
    localStorage.removeItem('username');
    window.location.reload();
  }
}
