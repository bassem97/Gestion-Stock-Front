import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Client } from 'stompjs';
import {User} from "../../models/user";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseurl = environment.url + 'user/';
  private headers: HttpHeaders;
  //sender: Client;

  constructor(private http: HttpClient) {
    // @ts-ignore
    this.findUserWithToken().subscribe((user) => (this.sender = user));
  }

  public findUserWithToken() {
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage['token'],
    });
    return this.http.get(this.baseurl + 'findByToken', {
      headers: this.headers,
    });
  }

  add(user: User) {
    return this.http.post(this.baseurl + 'add', user);
  }

  list(): Observable<any> {
    return this.http.get(this.baseurl + 'list');
  }

  // remove(id) {
  //   // this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
  //   // @ts-ignore
  //   console.log(this.sender.userId);
  //   return this.http.delete(this.baseurl + 'delete/' + id + '/' + this.sender.userId);
  // }

  // modify(id, user, sender) {
  //   // this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
  //   return this.http.put(this.baseurl + 'update/' + id + '/' + sender, user);
  // }

  findById(id: string): Observable<Client> {
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage['token'],
    });
    // @ts-ignore
    return this.http.get(this.baseurl + 'findById/' + id, {
      headers: this.headers,
    });
  }

  // findByEmail(email): Observable<any> {
  //   return this.http.get(this.baseurl + 'userByEmail/' + email);
  // }

  // changePassword(changePassword: any, user: { cin: string; }) {
  //   this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
  //   return this.http.post(this.baseurl + 'changePassword/' + user.cin, changePassword, {headers: this.headers});
  // }

  // changeRole(id, role) {
  //   return this.http.get(this.baseurl + 'makeRevokeAdmin/' + id + '/' + role);
  // }
}
