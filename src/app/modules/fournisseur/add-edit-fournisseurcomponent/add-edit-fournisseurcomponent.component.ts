import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {fournisseur} from "../../../core/models/fournisseur";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FournisseurService} from "../../../core/services/fournisseur.service";

@Component({
  selector: 'app-add-edit-fournisseurcomponent',
  templateUrl: './add-edit-fournisseurcomponent.component.html',
  styleUrls: ['./add-edit-fournisseurcomponent.component.scss']
})
export class AddEditFournisseurcomponentComponent implements OnInit {
  @Output() ajouter_modifier_fournisseur:EventEmitter<fournisseur>=new EventEmitter<fournisseur>();
  @Input() listfournisseurs:fournisseur[];
  @Input() fournisseur:fournisseur;
  @Input() name: string;
  myForm:FormGroup;

  constructor() { }

  ngOnInit(): void {
    if(this.name !='Ajouter') {
      this.myForm = new FormGroup({
        'code_': new FormControl(this.fournisseur.code, [Validators.required,Validators.minLength(4)]),
        'libelle_': new FormControl(this.fournisseur.libelle, [Validators.required,Validators.minLength(4)])
      })
    }
    else {
      this.myForm = new FormGroup({
        'code_': new FormControl(null, [Validators.required,Validators.minLength(4)]),
        'libelle_': new FormControl(null, [Validators.required,Validators.minLength(4)])
      })
    }
  }

  appliquer_ajout_modif() {
    if (this.name != 'Ajouter') {
      this.listfournisseurs.find(four => {
        if (four.idFournisseur == this.fournisseur.idFournisseur) {
          four.code = this.myForm.controls["code_"].value;
          four.libelle = this.myForm.controls["libelle_"].value;
        }
      })
    } else {
      let index = 1;
      this.fournisseur = new fournisseur();
      if (this.listfournisseurs.length) {
        index = this.listfournisseurs[this.listfournisseurs.length - 1]['idFournisseur'];
        index += 1;
      }
      this.fournisseur.idFournisseur = index;
      this.fournisseur.code = this.myForm.controls["code_"].value;
      this.fournisseur.libelle = this.myForm.controls["libelle_"].value;
    }
    this.ajouter_modifier_fournisseur.emit(this.fournisseur);
  }

}
