import {rayon} from "./rayon";
import {fournisseur} from "./fournisseur";

export class produit {
  constructor(idProduit: number, code: string, libelle: string, prixUnitaire: number) {
this.idProduit=idProduit;
this.code=code;
this.libelle=libelle;
this.prixUnitaire=prixUnitaire;
  }

  idProduit:number
  code:string
  libelle:string
  prixUnitaire: number
  rayons:rayon
  fournisseurs:fournisseur[]=[]
}
