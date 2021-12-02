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

  add(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.url + "add", produit);
  }

  update(produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(this.url + "update/" + produit.idProduit, produit);
  }

  delete(id: number) {
    return this.http.delete(this.url + "delete/" + id);
  }

  findById(id: number): Observable<Produit> {
    return this.http.get<Produit>(this.url + "findById/" + id);
  }
}
