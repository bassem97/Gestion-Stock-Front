import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from 'stompjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseurl = environment.url + '/client/';
  private headers: HttpHeaders;
  //sender: Client;

  constructor(private http: HttpClient) {
    // @ts-ignore
    this.findUserWithToken().subscribe((client) => (this.sender = client));
  }

  public findUserWithToken() {
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage['token'],
    });
    return this.http.get(environment.url + 'authenticate', {
      headers: this.headers,
    });
  }

  add(client: Client) {
    return this.http.post(this.baseurl + 'add', client);
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

  // modify(id, client, sender) {
  //   // this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
  //   return this.http.put(this.baseurl + 'update/' + id + '/' + sender, client);
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

  // changePassword(changePassword: any, client: { cin: string; }) {
  //   this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
  //   return this.http.post(this.baseurl + 'changePassword/' + client.cin, changePassword, {headers: this.headers});
  // }

  // changeRole(id, role) {
  //   return this.http.get(this.baseurl + 'makeRevokeAdmin/' + id + '/' + role);
  // }
}
