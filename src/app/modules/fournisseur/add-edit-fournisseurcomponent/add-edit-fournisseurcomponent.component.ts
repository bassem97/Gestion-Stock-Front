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
  @Input() showMsg: boolean = false;
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
        'localisation_': new FormControl(this.fournisseur.localisation_fournisseur, [Validators.required]),
        'file': new FormControl(''),
        'fileSource': new FormControl('')
      })
    }
    else {
      this.myForm = new FormGroup({
        'code_': new FormControl(null, [Validators.required,Validators.minLength(4)]),
        'libelle_': new FormControl(null, [Validators.required,Validators.minLength(4)]),
        'localisation_': new FormControl(null, [Validators.required]),
        'file': new FormControl('', [Validators.required]),
        'fileSource': new FormControl('', [Validators.required])
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
    if(this.myForm.controls["fileSource"].value) {
      const formData = new FormData();
      formData.append('file', this.myForm.controls["fileSource"].value);
      this.http.post("http://localhost:80/upload.php", formData).subscribe(file => {
        console.log(file);
      });
    }
    else
      this.image_name=this.fournisseur.avatar;
    if (this.name != 'Ajouter') {
      this.listfournisseurs.find(four => {
        if (four.idFournisseur == this.fournisseur.idFournisseur) {
          four.code = this.myForm.controls["code_"].value;
          four.libelle = this.myForm.controls["libelle_"].value;
          four.localisation_fournisseur = this.myForm.controls["localisation_"].value;
          four.latitude_fournisseur=four.localisation_fournisseur.substring(0,four.localisation_fournisseur.lastIndexOf(","));
          four.longitude_fournisseur=four.localisation_fournisseur.substring(four.localisation_fournisseur.lastIndexOf(",")+2);
          four.avatar=this.image_name;
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
      this.fournisseur.localisation_fournisseur = this.myForm.controls["localisation_"].value;
      this.fournisseur.latitude_fournisseur=this.fournisseur.localisation_fournisseur.substring(0,this.fournisseur.localisation_fournisseur.lastIndexOf(","));
      this.fournisseur.longitude_fournisseur=this.fournisseur.localisation_fournisseur.substring(this.fournisseur.localisation_fournisseur.lastIndexOf(",")+2);
      this.fournisseur.avatar=this.image_name;
    }
    this.ajouter_modifier_fournisseur.emit(this.fournisseur);
    console.log(this.fournisseur);
  }

}
