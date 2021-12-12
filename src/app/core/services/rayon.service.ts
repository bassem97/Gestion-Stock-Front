import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {rayon} from "../models/rayon";
import {produit} from "../models/produit";

@Injectable({
  providedIn: 'root'
})
export class RayonService {

  constructor(private http :HttpClient) { }

  // getAllproduits():Observable<produit[]>{
  //   return this.http.get<produit[]>("/api/Produit");
  // }

  getAllrayons():Observable<rayon[]>{
    return this.http.get<rayon[]>("/api/Rayons");
  }
  deleterayon(rayon: rayon){
    return this.http.post("/api/Rayon/Delete",rayon);
  }
  addrayon(rayon: rayon){
    return this.http.post("/api/Rayon/Add",rayon);
  }
  modifyrayon(rayon: rayon){
    return this.http.put("/api/Rayon/Update",rayon)
  }
}
