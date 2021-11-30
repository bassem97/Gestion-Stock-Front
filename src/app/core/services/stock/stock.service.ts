import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Stock} from "../../models/stock";
import {environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class StockService {

  url = environment.url + "stock/";
  constructor(private http: HttpClient) { }

  findAll(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.url + "list");
  }

  add(stock: Stock) {
    return this.http.post(this.url + "add", stock);
  }

  update(stock: Stock) {
    return this.http.put(this.url + "update/" + stock.idStock, stock);
  }

  delete(id: BigInt) {
    return this.http.delete(this.url + "delete/" + id);
  }

  findById(id: number): Observable<Stock> {
    return this.http.get<Stock>(this.url + "findById/" + id);
  }
}
