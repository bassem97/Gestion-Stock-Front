import {Stock} from "./stock";
import {rayon} from "./rayon";
import {DetailProduit} from "./detailProduit";
import {fournisseur} from "./fournisseur";
import { Reclamation } from "./reclamation";
import {DetailFacture} from "./DetailFacture";

export class Produit {
  idProduit:number;
  code: string;
  libelle: string;
  prixUnitaire: number;
  image: string;
  stock: Stock;
  rayon: rayon;
  detailProduit: DetailProduit;
  fournisseurs: fournisseur[];
  reclamations: Reclamation[];
  detailFactures: DetailFacture[];

  constructor() {
    this.detailProduit = new DetailProduit();
    this.stock = new Stock();
    this.rayon = new rayon();
  }
}
