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
    return this.http.get<Facture[]>(`${this.url}/list`);
  }

  findById(id: number): Observable<Facture>{
    return this.http.get<Facture>(`${this.url}/findById/${id}`);
  }

  add(facture: Facture){
    return this.http.post(`${this.url}/add`, facture);
  }

  update(facture: Facture){
    return this.http.put(`${this.url}/update/${facture.idFacture}`, facture);
  }

  delete(facture: Facture){
    return this.http.delete(`${this.url}/delete/${facture.idFacture}`);
  }
}
