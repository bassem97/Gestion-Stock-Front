import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Rayon} from "../../models/rayon";

@Injectable({
  providedIn: 'root'
})
export class RayonService {

  url = environment.url + "rayon/";

  constructor(private http: HttpClient) { }

  findAll(): Observable<Rayon[]> {
    return this.http.get<Rayon[]>(this.url + "list");
  }
}
