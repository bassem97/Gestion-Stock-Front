import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
    return this.http.get<Produit[]>(this.url + "list",{headers : environment.headers});
  }

  add(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.url + "add", produit,{headers : environment.headers});
  }

  update(produit: Produit): Observable<Produit>{
    return this.http.put<Produit>(this.url + "update/" + produit.idProduit, produit,{headers : environment.headers});
  }

  delete(id: number) {
    return this.http.delete(this.url + "delete/" + id,{headers : environment.headers});
  }

  findById(id: number): Observable<Produit> {
    return this.http.get<Produit>(this.url + "findById/" + id,{headers : environment.headers});
  }
}
