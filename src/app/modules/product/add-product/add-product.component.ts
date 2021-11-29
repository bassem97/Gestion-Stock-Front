import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Produit} from "../../../core/models/produit";
import {Stock} from "../../../core/models/stock";
import {Rayon} from "../../../core/models/rayon";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  product: Produit;
  stocks: Stock[];
  rayons: Rayon[];

  constructor(public dialogRef: MatDialogRef<AddProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Array<any>,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.product = new Produit();
    this.productForm = this.formBuilder.group({
      code: [this.product.code, [Validators.required]],
      libelle: [this.product.libelle, [Validators.required, Validators.minLength(3)]],
      prixUnitaire: [this.product.prixUnitaire, [Validators.required]],
      rayon: [this.product.rayon, [Validators.required]],
      stock: [this.product.stock, [Validators.required]],
    });
  }

  // Get form controls Errors
  getErrorCode() {
    return this.code.hasError('required') ? 'Field is required' : "";
  }
  getErrorLibelle() {
    return this.libelle.hasError('required') ?
      'Field is required' :
      this.libelle.hasError('minlength') ? 'You need to specify at least 3 characters' : "";
  }

  getErrorPrixUnitaire() {
    return this.prixUnitaire.hasError('required') ? 'Field is required' : "";
  }

  getErrorRayon() {
    return this.rayon.hasError('required') ? 'Field is required' : "";
  }

  getErrorStock() {
    return this.rayon.hasError('required') ? 'Field is required' : "";
  }



  // Get fields value as form control
  get code() {return this.productForm.get('code') as FormControl;}
  get libelle() {return this.productForm.get('libelle') as FormControl;}
  get prixUnitaire() {return this.productForm.get('prixUnitaire') as FormControl;}
  get rayon() {return this.productForm.get('rayon') as FormControl;}
  get stock() {return this.productForm.get('stock') as FormControl;}

}
