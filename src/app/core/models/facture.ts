import {User} from "./user";
import {DetailFacture} from "./DetailFacture";

export class Facture{
  idFacture: number;
  dateFacture: Date;
  montantFacture: number;
  montantRemise: number;
  user : User;
  detailFactures : DetailFacture;

}
