import {Produit} from "./produit";
import {Client} from "./client";

export class Reclamation{
  idReclamation : number;
  subject : string;
  body : string;
  produit : Produit;
  client : Client;
  etat : boolean;


  constructor(subject: string, body: string, produit: Produit, client: Client) {
    this.subject = subject;
    this.body = body;
    this.produit = produit;
    this.client = client;
  }
}
