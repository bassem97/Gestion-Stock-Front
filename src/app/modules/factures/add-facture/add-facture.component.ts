import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Facture} from "../../../core/models/facture";
import {FactureService} from "../../../core/services/facture/facture.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../core/services/user/user.service";
import {User} from "../../../core/models/user";

@Component({
  selector: 'app-add-facture',
  templateUrl: './add-facture.component.html',
  styleUrls: ['./add-facture.component.css']
})
export class AddFactureComponent implements OnInit {
  form: FormGroup;
  facture: Facture;
  connectedUser : User;

  constructor(
    public dialogRef: MatDialogRef<AddFactureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Array<any>,
    private formBuilder: FormBuilder,
    private factureService: FactureService,
    private userService : UserService
  ) { }

  ngOnInit(): void {
    this.userService.findUserWithToken().subscribe(value => {
      this.connectedUser  =value;
    })
    this.facture = this.data[0] || new Facture();
    this.form = this.formBuilder.group({
      dateFacture: [this.facture.dateFacture, [Validators.required]],
      montantFacture: [this.facture.montantFacture, [Validators.required]],
      montantRemise: [this.facture.montantRemise, [Validators.required]]
    });
  }

  getErrorDateFacture(){
    return this.dateFacture.hasError('required') ? 'Il faut choisir une date' : '';
  }

  getErrorMontantFacture(){
    return this.montantFacture.hasError('required') ? 'Il faut choisir le montant' : '';
  }

  getErrorMontantRemise(){
    return this.montantRemise.hasError('required') ? 'Il faut choisir une remise' : '';
  }

  get dateFacture() { return this.form.get('dateFacture') as FormControl }
  get montantFacture() { return this.form.get('montantFacture') as FormControl }
  get montantRemise() { return this.form.get('montantRemise') as FormControl }

  saveFacture() {

    this.setFields();
    this.facture.user = this.connectedUser;
    this.factureService.add(this.facture).subscribe(value =>this.dialogRef.close(value));
  }



  updateFacture(){
    this.setFields();
    this.factureService.update(this.facture).subscribe(value =>this.dialogRef.close(value));
  }

  setFields() {
    this.facture.dateFacture = this.dateFacture.value;
    this.facture.montantFacture = this.montantFacture.value;
    this.facture.montantRemise = this.montantRemise.value;
  }
}
