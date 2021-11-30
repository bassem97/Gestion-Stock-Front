import { Component, OnInit } from '@angular/core';
import {fournisseur} from "../../../core/models/fournisseur";
import {FournisseurService} from "../../../core/services/fournisseur.service";

@Component({
  selector: 'app-listfournisseurcomponent',
  templateUrl: './listfournisseurcomponent.component.html',
  styleUrls: ['./listfournisseurcomponent.component.scss']
})
export class ListfournisseurcomponentComponent implements OnInit {

  listfournisseurs: fournisseur[]=[];
  listsearch: fournisseur[];
  listmanipulation: fournisseur[];
  isfound: fournisseur;
  input: fournisseur;
  showinput:boolean=false;
  find: number=0;
  isshow:boolean=false;
  showbyid:boolean=false;

  constructor(private fournisseurService:FournisseurService) { }

  ngOnInit(): void {
    this.fournisseurService.getAllfournisseurs().subscribe(get =>{
      get.forEach(fournisseur =>{
        this.listfournisseurs.push(fournisseur);
      })
    })
    this.listmanipulation=this.listfournisseurs;
    this.listsearch=this.listfournisseurs;
  }

  ajouter_fournisseur($event: fournisseur) {
    this.fournisseurService.addfournisseur($event).subscribe(()=>{
      this.listfournisseurs.push($event);
    } );
  }


  modifier_fournisseur_after($event: fournisseur) {
this.fournisseurService.modifyfournisseur($event).subscribe( param =>{
  this.listfournisseurs.forEach(p =>{
    if(p.idFournisseur==$event.idFournisseur){
      p.libelle=$event.libelle;
      p.code=$event.code;
    }
  })
})
  }

  supprimer_fournisseur($event: fournisseur) {
    this.fournisseurService.deletefournisseur($event).subscribe(param =>{
      this.listfournisseurs.forEach((p,n) =>{
        if(p.idFournisseur==$event.idFournisseur)
          this.listfournisseurs.splice(n,1)
      })
    });


  }

  search_fournisseur($event: string) {
    this.listmanipulation = this.listfournisseurs;
    this.listsearch=[];
    for (let entryid of Array.from(this.listmanipulation.entries())) {
        if (entryid[1].idFournisseur.toString().indexOf($event) != -1) {
          this.showbyid = true;
          this.isfound = entryid[1];
          this.find = 1;
        }
        else {
          this.find = 0;
          this.showbyid = false;
        }
      if (this.find)
        this.listsearch.push(this.isfound);
    }

    if(!this.showbyid) {
      this.listsearch = [];
      for (let entryleft of Array.from(this.listmanipulation.entries())) {
        if (entryleft[1].libelle.indexOf($event) != -1 || entryleft[1].code.indexOf($event) != -1) {
          this.isfound = entryleft[1];
          this.find = 1;
        } else
          this.find = 0;
        if (this.find)
          this.listsearch.push(this.isfound);
      }
    }
    this.listmanipulation=this.listsearch;
    if (!$event)
      this.listmanipulation = this.listfournisseurs;
  }

  show() {
    this.showinput=!this.showinput;
    this.isshow=false;
  }

  modifier_fournisseur_before($event: fournisseur) {
    this.isshow=!this.isshow;
    this.showinput=false;
    this.input=$event;
    console.log($event);
  }

}
