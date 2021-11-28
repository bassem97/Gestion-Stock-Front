import {Stock} from "./stock";
import {Rayon} from "./rayon";
import {DetailProduit} from "./detailProduit";

export class Produit {
  id: number;
  code: string;
  libelle: string;
  prixUnitaire: number;
  image: string;
  stock: Stock;
  rayon: Rayon;
  detailProduit: DetailProduit;
}
