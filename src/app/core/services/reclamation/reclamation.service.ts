import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Produit} from "../../models/produit";
import {Reclamation} from "../../models/reclamation";

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  url = environment.url + "reclamation/";
  constructor(private http: HttpClient) { }

  findAll(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(this.url + "list",{headers : environment.headers});
  }

  add(reclamation: Reclamation) {
    return this.http.post(this.url + "add", reclamation,{headers : environment.headers});
  }

  update(reclamation: Reclamation) {
    return this.http.put(this.url + "update/" + reclamation.idReclamation, reclamation,{headers : environment.headers});
  }

  delete(id: number) {
    return this.http.delete(this.url + "delete/" + id,{headers : environment.headers});
  }

  findById(id: number): Observable<Reclamation> {
    return this.http.get<Reclamation>(this.url + "findById/" + id,{headers : environment.headers});
  }
}
