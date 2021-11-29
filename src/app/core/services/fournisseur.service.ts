import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {fournisseur} from "../models/fournisseur";

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  constructor(private http :HttpClient ) {}
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
