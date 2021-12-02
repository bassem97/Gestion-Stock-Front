import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {rayon} from "../../../core/models/rayon";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-add-edit-rayon',
  templateUrl: './add-edit-rayon.component.html',
  styleUrls: ['./add-edit-rayon.component.scss']
})
export class AddEditRayonComponent implements OnInit {
  @Output() ajouter_modifier_rayon:EventEmitter<rayon>=new EventEmitter<rayon>();
  @Input() listrayons:rayon[];
  @Input() rayon:rayon;
  @Input() name: string;
  myForm:FormGroup;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    if(this.name !='Ajouter') {
      this.myForm = new FormGroup({
        'code_': new FormControl(this.rayon.code, [Validators.required,Validators.minLength(4)]),
        'libelle_': new FormControl(this.rayon.libelle, [Validators.required,Validators.minLength(4)])
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
      this.listrayons.find(ray => {
        if (ray.idRayon == this.rayon.idRayon) {
          ray.code = this.myForm.controls["code_"].value;
          ray.libelle = this.myForm.controls["libelle_"].value;
        }
      })
    } else {
      let index = 1;
      this.rayon = new rayon();
      if (this.listrayons.length) {
        index = this.listrayons[this.listrayons.length - 1]['idRayon'];
        index += 1;
      }
      this.rayon.idRayon = index;
      this.rayon.code = this.myForm.controls["code_"].value;
      this.rayon.libelle = this.myForm.controls["libelle_"].value;
    }
    this.ajouter_modifier_rayon.emit(this.rayon);
  }
}
