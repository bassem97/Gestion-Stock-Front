import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Stock} from "../../models/stock";

@Injectable({
  providedIn: 'root'
})
export class StockService {

  url = environment.url + "stock/";

  constructor(private http: HttpClient) { }

  findAll(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.url + "list");
  }
}
