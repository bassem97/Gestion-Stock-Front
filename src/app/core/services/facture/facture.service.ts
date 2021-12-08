import {environment} from "../../../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Facture} from "../../models/facture";

@Injectable({
  providedIn: "root"
})
export class FactureService {
  url = environment.url + "facture";

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Facture[]> {
    return this.http.get<Facture[]>(`${this.url}/list`,{headers : environment.headers});
  }

  findById(id: number): Observable<Facture>{
    return this.http.get<Facture>(`${this.url}/findById/${id}`,{headers : environment.headers});
  }

  add(facture: Facture){
    return this.http.post(`${this.url}/add`, facture,{headers : environment.headers});
  }

  update(facture: Facture){
    return this.http.put(`${this.url}/update/${facture.idFacture}`, facture,{headers : environment.headers});
  }

  delete(facture: Facture){
    return this.http.delete(`${this.url}/delete/${facture.idFacture}`,{headers : environment.headers});
  }
}
