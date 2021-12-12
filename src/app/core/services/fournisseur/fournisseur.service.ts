import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {fournisseur} from "../../models/fournisseur";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class FournisseurService {

  url = environment.url;
  constructor(private http :HttpClient ) {}
  getAllfournisseurs():Observable<fournisseur[]>{
    return this.http.get<fournisseur[]>(this.url+"Fournisseurs",{headers : environment.headers});

  }
  deletefournisseur(fournisseur: fournisseur){
    return this.http.post(this.url+"Fournisseur/Delete",fournisseur,{headers : environment.headers});
  }
  addfournisseur(fournisseur: fournisseur){
    return this.http.post(this.url+"Fournisseur/Add",fournisseur,{headers : environment.headers});
  }
  modifyfournisseur(fournisseur: fournisseur){
    return this.http.put(this.url+"Fournisseur/Update",fournisseur,{headers : environment.headers})
  }
}
