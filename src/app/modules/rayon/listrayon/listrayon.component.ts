import { Component, OnInit } from '@angular/core';
import {RayonService} from "../../../core/services/rayon.service";
import {rayon} from "../../../core/models/rayon";
import {produit} from "../../../core/models/produit";


@Component({
  selector: 'app-listrayon',
  templateUrl: './listrayon.component.html',
  styleUrls: ['./listrayon.component.scss']
})
export class ListrayonComponent implements OnInit {
  listrayons: rayon[]=[];
  listproduits:produit[]=[];
  input: rayon;
  showinput:boolean=false;
  isshow:boolean=false;
  produit:produit;
  showMsg: boolean = false;

  constructor(private rayonservice:RayonService) { }

  ngOnInit(): void {
      this.rayonservice.getAllrayons().subscribe(get =>{
        get.forEach(rayon =>{
          this.listrayons.push(rayon);
        })
      })
    console.log(this.listrayons)
  }

  ajouter_rayon($event: rayon) {
  this.rayonservice.addrayon($event).subscribe(()=>{
    this.listrayons.push($event);
    this.showMsg = true;
    setTimeout(()=>{
      this.showMsg = false;
    }, 2000);
  })
  }

  modifier_rayon_before($event: rayon) {
    this.isshow=!this.isshow;
    this.input=$event;
  }

  modifier_rayon_after($event: rayon) {
    this.rayonservice.modifyrayon($event).subscribe( param =>{
      this.listrayons.forEach(r =>{
        if(r.idRayon==$event.idRayon){
          r.libelle=$event.libelle;
          r.code=$event.code;
        }
      })
      this.showMsg=true;
      setTimeout(()=>{
        this.showMsg = false;
      }, 2000);
    })
  }

  supprimer_rayon($event: rayon) {
    if(confirm("Etes vous surs de vouloir supprimer ?")) {
      this.rayonservice.deleterayon($event).subscribe(param => {
        this.listrayons.forEach((r, n) => {
          if (r.idRayon == $event.idRayon)
            this.listrayons.splice(n, 1)
        })
      });
    }
  }

  DynamicModel(){
    this.showinput=false;
    this.isshow=false;
    this.showMsg=false;
  }

  show() {
    this.showinput=!this.showinput;
  }

}
