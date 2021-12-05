import {Produit} from "./produit";
import {User} from "./user";

export class Reclamation{
  idReclamation : number;
  subject : string;
  body : string;
  produit : Produit;
  user : User;
  etat : boolean;


  constructor(subject: string, body: string, produit: Produit, user: User) {
    this.subject = subject;
    this.body = body;
    this.produit = produit;
    this.user = user;
  }
}
