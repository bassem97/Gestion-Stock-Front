import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {rayon} from "../../models/rayon";
import {Produit} from "../../models/produit";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RayonService {

  constructor(private http :HttpClient) { }
  url = environment.url;
  // getAllproduits():Observable<produit[]>{
  //   return this.http.get<produit[]>("/api/Produit");
  // }

  getAllrayons():Observable<rayon[]>{
    return this.http.get<rayon[]>(this.url+"Rayons",{headers : environment.headers});
  }
  deleterayon(rayon: rayon){
    return this.http.post(this.url+"Rayon/Delete",rayon,{headers : environment.headers});
  }
  addrayon(rayon: rayon){
    return this.http.post(this.url+"Rayon/Add",rayon,{headers : environment.headers});
  }
  modifyrayon(rayon: rayon){
    return this.http.put(this.url+"Rayon/Update",rayon,{headers : environment.headers})
  }
}
