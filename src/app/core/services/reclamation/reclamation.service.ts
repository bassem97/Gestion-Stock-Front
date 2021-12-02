import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
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
    return this.http.get<Reclamation[]>(this.url + "list");
  }

  add(reclamation: Reclamation) {
    return this.http.post(this.url + "add", reclamation);
  }

  update(reclamation: Reclamation) {
    return this.http.put(this.url + "update/" + reclamation.idReclamation, reclamation);
  }

  delete(id: number) {
    return this.http.delete(this.url + "delete/" + id);
  }

  findById(id: number): Observable<Reclamation> {
    return this.http.get<Reclamation>(this.url + "findById/" + id);
  }
}
