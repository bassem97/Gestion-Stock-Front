import { Component, OnInit } from '@angular/core';
import {fournisseur} from "../../../core/models/fournisseur";
import {FournisseurService} from "../../../core/services/fournisseur.service";
import { Loader } from "@googlemaps/js-api-loader"

const loader = new Loader({
  apiKey: "AIzaSyAObzCbk0hwnk8LbUcTeFguDk5ZDr36VS4",
  version: "weekly",
  language: "fr"
});

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
  array_lat:Array<number>=[];
  array_log:Array<number>=[];
  array_info:Array<string>=[];
  showMsg: boolean = false;
  constructor(private fournisseurService:FournisseurService) { }

  ngOnInit(): void {
    this.fournisseurService.getAllfournisseurs().subscribe(get =>{
      get.forEach(fournisseur =>{
        this.array_lat.push(Number(fournisseur.latitude_fournisseur));
        this.array_log.push(Number(fournisseur.longitude_fournisseur));
        this.array_info.push("code: "+fournisseur.code+" ,libellé: "+fournisseur.libelle+" ,localisation: "+fournisseur.localisation_fournisseur)
        this.listfournisseurs.push(fournisseur);
      })
    })
    console.log(this.array_lat,this.array_log);
    // this.afficher_map(this.array_lat,this.array_log);
    this.listmanipulation=this.listfournisseurs;
    this.listsearch=this.listfournisseurs;

  }

  afficher_map(){
    loader.load().then(() => {
      var x = document.getElementById("showmap");
      // @ts-ignore
      if(x.style.display==="none")
      {
        // @ts-ignore
        x.style.display = "block";
      let map;
      let currentLat = 36.62659598298575;
      let currentLng = 10.007110389971563;

      map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: {lat: currentLat, lng: currentLng},
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      let posi = new google.maps.LatLng(currentLat, currentLng);
      let marker = new google.maps.Marker({
        position: posi,

        map: map,

        visible: false
      });
      const infoWindow = new google.maps.InfoWindow();
      for (let i=0; i<this.array_lat.length; i++) {
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(this.array_lat[i], this.array_log[i]),

          map: map,

          title:"<h4>"+this.array_info[i]+"</h4>"+"<p>développé par</p><a href='https://www.facebook.com/selim.benaich/'>Selim Ben Aich</a><p> Tel:+21693165012</p>"
        });
        marker.addListener("click", () => {
          infoWindow.close();
          infoWindow.setContent(marker.getTitle());
          infoWindow.open(marker.getMap(), marker);
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.DROP);
          }
        });
      }
      }
      else
        { // @ts-ignore
          x.style.display = "none";
        }
    });
  }

  ajouter_fournisseur($event: fournisseur) {
    this.fournisseurService.addfournisseur($event).subscribe(()=>{
      this.listfournisseurs.push($event);
      this.showMsg=true;
      setTimeout(()=>{
        this.showMsg = false;
      }, 2000);
    } );
  }


  modifier_fournisseur_after($event: fournisseur) {
this.fournisseurService.modifyfournisseur($event).subscribe( param =>{
  this.listfournisseurs.forEach(p =>{
    if(p.idFournisseur==$event.idFournisseur){
      p.localisation_fournisseur=$event.localisation_fournisseur;
      p.latitude_fournisseur=$event.latitude_fournisseur;
      p.longitude_fournisseur=$event.longitude_fournisseur;
      p.libelle=$event.libelle;
      p.code=$event.code;
    }
  })
  this.showMsg=true;
  setTimeout(()=>{
    this.showMsg = false;
  }, 2000);
});
  }

  supprimer_fournisseur($event: fournisseur) {
    if(confirm("Etes vous surs de vouloir supprimer ?")) {
      this.fournisseurService.deletefournisseur($event).subscribe(param => {
        this.listfournisseurs.forEach((p, n) => {
          if (p.idFournisseur == $event.idFournisseur)
            this.listfournisseurs.splice(n, 1)
        })
      });
    }
  }

  search_fournisseur($event: string) {
    this.listmanipulation = this.listfournisseurs;
    this.listsearch=[];
    this.showbyid = false;
    for (let entryid of Array.from(this.listmanipulation.entries())) {
        if (entryid[1].idFournisseur.toString().indexOf($event) != -1) {
          this.showbyid = true;
          this.isfound = entryid[1];
          this.find = 1;
        }
        else
          this.find = 0;
      if (this.find)
        this.listsearch.push(this.isfound);
    }

    if(!this.showbyid) {
      this.listsearch = [];
      for (let entryleft of Array.from(this.listmanipulation.entries())) {
        if (entryleft[1].libelle.indexOf($event) != -1 || entryleft[1].code.indexOf($event) != -1 || entryleft[1].localisation_fournisseur.indexOf($event) != -1) {
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

  DynamicModel(){
    this.showinput=false;
    this.isshow=false;
    this.showMsg=false;
  }

  show() {
    this.showinput=!this.showinput;
  }

  modifier_fournisseur_before($event: fournisseur) {
    this.isshow=!this.isshow;
    this.input=$event;
    console.log($event);
  }

}
