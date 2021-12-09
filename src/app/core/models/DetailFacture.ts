import {Facture} from "./facture";
import {Produit} from "./produit";

export class DetailFacture{
  idDetailFacture : number;
  qte : number;
  prixtotal : number;
  pourcentageRemise :number;
  montantRemise : number;
  facture  : Facture;
  produit : Produit;
}
