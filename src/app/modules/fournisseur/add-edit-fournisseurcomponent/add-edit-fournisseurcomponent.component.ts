import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {fournisseur} from "../../../core/models/fournisseur";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

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
  url:string="./assets/img/icon.png";
  image_name:string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    if(this.name !='Ajouter') {
      this.url="./assets/img/"+this.fournisseur.avatar;
      this.myForm = new FormGroup({
        'code_': new FormControl(this.fournisseur.code, [Validators.required,Validators.minLength(4)]),
        'libelle_': new FormControl(this.fournisseur.libelle, [Validators.required,Validators.minLength(4)]),
        'file': new FormControl(null),
        'fileSource': new FormControl(null)
      })
    }
    else {
      this.myForm = new FormGroup({
        'code_': new FormControl(null, [Validators.required,Validators.minLength(4)]),
        'libelle_': new FormControl(null, [Validators.required,Validators.minLength(4)]),
        'file': new FormControl(null, [Validators.required]),
        'fileSource': new FormControl(null, [Validators.required])
      })
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
      var reader=new FileReader();
      reader.onload=(event:any) =>{
        this.url=event.target.result;
      }
      reader.readAsDataURL(file);
    }
    this.image_name=event.target.files[0].name;
  }

  appliquer_ajout_modif() {
    if (this.name != 'Ajouter') {
      this.listfournisseurs.find(four => {
        if (four.idFournisseur == this.fournisseur.idFournisseur) {
          four.code = this.myForm.controls["code_"].value;
          four.libelle = this.myForm.controls["libelle_"].value;
          four.avatar=this.image_name;
        }
      })
    } else {
     /* const formData = new FormData();
      formData.append('file', this.myForm.controls["fileSource"].value);
      /!*this.http.post("http://localhost:4200/assets/img",formData);*!/
/!*      console.log(this.myForm.controls["fileSource"].value);*!/*/
      let index = 1;
      this.fournisseur = new fournisseur();
      if (this.listfournisseurs.length) {
        index = this.listfournisseurs[this.listfournisseurs.length - 1]['idFournisseur'];
        index += 1;
      }
      this.fournisseur.idFournisseur = index;
      this.fournisseur.code = this.myForm.controls["code_"].value;
      this.fournisseur.libelle = this.myForm.controls["libelle_"].value;
      this.fournisseur.avatar=this.image_name;
    }
    this.ajouter_modifier_fournisseur.emit(this.fournisseur);
  }

}
