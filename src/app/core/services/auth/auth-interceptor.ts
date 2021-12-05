import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { AuthenticationService } from './authService';



@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService) {}


  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log( 'loula== ', req);

    let authReq = req;
    const token = this.auth.getToken() ;

    if (token != null) { authReq = req.clone({ headers: req.headers.set('Authorization', token) }); }
    console.log('thenya== ', authReq );
    console.log('token ==', token);
    return next.handle(authReq);
  }

}


export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
