import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Facture} from "../../../core/models/facture";
import {FactureService} from "../../../core/services/facture/facture.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-facture',
  templateUrl: './add-facture.component.html',
  styleUrls: ['./add-facture.component.css']
})
export class AddFactureComponent implements OnInit {
  form: FormGroup;
  facture: Facture;

  constructor(
    public dialogRef: MatDialogRef<AddFactureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Array<any>,
    private formBuilder: FormBuilder,
    private factureService: FactureService
  ) { }

  ngOnInit(): void {
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
    this.facture.dateFacture = this.dateFacture.value;
    this.facture.montantFacture = this.montantFacture.value;
    this.facture.montantRemise = this.montantRemise.value;
    this.factureService.add(this.facture).subscribe(value =>this.dialogRef.close(value));
  }

  updateFacture(){
    this.facture.dateFacture = this.dateFacture.value;
    this.facture.montantFacture = this.montantFacture.value;
    this.facture.montantRemise = this.montantRemise.value;
    this.factureService.update(this.facture).subscribe(value =>this.dialogRef.close(value));
  }
}
