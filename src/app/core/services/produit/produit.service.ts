import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Produit} from "../../models/produit";
import {environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  url = environment.url + "produit/";
  constructor(private http: HttpClient) { }

  findAll(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.url + "list");
  }

  add(produit: Produit) {
    return this.http.post(this.url + "add", produit);
  }

  update(produit: Produit) {
    return this.http.put(this.url + "update/" + produit.id, produit);
  }

  delete(id: number) {
    return this.http.delete(this.url + "delete/" + id);
  }

  findById(id: number): Observable<Produit> {
    return this.http.get<Produit>(this.url + "findById/" + id);
  }
}
