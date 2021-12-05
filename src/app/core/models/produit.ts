import {Stock} from "./stock";
import {Rayon} from "./rayon";
import {DetailProduit} from "./detailProduit";
import {fournisseur} from "./fournisseur";
import { Reclamation } from "./reclamation";

export class Produit {
  idProduit:number;
  code: string;
  libelle: string;
  prixUnitaire: number;
  image: string;
  stock: Stock;
  rayon: Rayon;
  detailProduit: DetailProduit;
  fournisseurs: fournisseur[];
  reclamations: Reclamation[];

  constructor() {
    this.detailProduit = new DetailProduit();
    this.stock = new Stock();
    this.rayon = new Rayon();
  }
}
