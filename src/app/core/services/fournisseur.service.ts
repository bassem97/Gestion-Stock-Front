import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {fournisseur} from "../models/fournisseur";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  url = environment.url + "fournisseur/";

  constructor(private http :HttpClient ) {}

  findAll(): Observable<fournisseur[]> {
    return this.http.get<fournisseur[]>(this.url + "list");
  }

  getAllfournisseurs():Observable<fournisseur[]>{
    return this.http.get<fournisseur[]>("/api/Fournisseurs");

  }
  deletefournisseur(fournisseur: fournisseur){
    return this.http.post("/api/Fournisseur/Delete",fournisseur);
  }
  addfournisseur(fournisseur: fournisseur){
    return this.http.post("/api/Fournisseur/Add",fournisseur);
  }
  modifyfournisseur(fournisseur: fournisseur){
    return this.http.put("/api/Fournisseur/Update",fournisseur)
  }
}
