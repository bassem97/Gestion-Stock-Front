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
  private _activeUser: User = <User>{};

  constructor(private http: HttpClient) {
    this.findUserWithToken().subscribe(user =>  this.activeUser = user);
  }


  get activeUser(): User {
    return this._activeUser;
  }

  set activeUser(user: User) {
    this._activeUser = user;
  }

  public findUserWithToken() {
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage['token'],
    });
    return this.http.get<User>(this.baseurl + 'findByToken', {
      headers: this.headers,
    });
  }

  add(user: User) {
    return this.http.post(this.baseurl + 'add', user,{headers : environment.headers});
  }

  switchDarkMode(user : User){
    return this.http.put(this.baseurl + 'switchTheme', user,{headers : environment.headers});
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

  getDarkMode():boolean{
    let isDarkMode;
    this.findUserWithToken().subscribe(user => isDarkMode = user.darkMode)
    return isDarkMode
  }
}
