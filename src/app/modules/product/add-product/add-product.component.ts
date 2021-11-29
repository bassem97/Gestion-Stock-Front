import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Produit} from "../../../core/models/produit";
import {Stock} from "../../../core/models/stock";
import {Rayon} from "../../../core/models/rayon";
import {RayonService} from "../../../core/services/rayon/rayon.service";
import {StockService} from "../../../core/services/stock/stock.service";
import {ProduitService} from "../../../core/services/produit/produit.service";
import {fournisseur} from "../../../core/models/fournisseur";
import {FournisseurService} from "../../../core/services/fournisseur.service";

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
  fournisseursArray: fournisseur[];

  constructor(public dialogRef: MatDialogRef<AddProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Array<any>,
              private formBuilder: FormBuilder,
              private productService: ProduitService,
              private rayonService: RayonService,
              private fournisseurService: FournisseurService,
              private stockService: StockService) { }

  ngOnInit(): void {
    this.product = this.data[0] || new Produit();
    this.stockService.findAll().subscribe(value => {
      this.stocks = value;
      if (this.data[0]) {
        const toSelect = this.stocks.find(stock => stock.idStock == this.product.stock.idStock);
        this.productForm.get('stock')?.setValue(toSelect);
      }
    });
    this.fournisseurService.findAll().subscribe(value => {
      this.fournisseursArray = value;
      if (this.data[0]) {
        const toSelect = this.fournisseursArray.filter(fournisseur => this.product.fournisseurs.findIndex(value1 => fournisseur.idFournisseur == value1.idFournisseur) != -1);
        this.productForm.get('fournisseurs')?.setValue(toSelect);
      }
    });
    this.rayonService.findAll().subscribe(value => {
      this.rayons = value;
      if (this.data[0]) {
        const toSelect = this.rayons.find(rayon => rayon.idRayon == this.product.rayon.idRayon);
        this.productForm.get('rayon')?.setValue(toSelect);
      }
    });
    this.productForm = this.formBuilder.group({
      code: [this.product.code, [Validators.required]],
      libelle: [this.product.libelle, [Validators.required, Validators.minLength(3)]],
      prixUnitaire: [this.product.prixUnitaire, [Validators.required]],
      rayon: [this.product.rayon, [Validators.required]],
      stock: [this.product.stock, [Validators.required]],
      categorie: [this.product.detailProduit.categorieProduit, [Validators.required]],
      fournisseurs: [this.product.fournisseurs, [Validators.required]],
    });

    if (this.data[0]) {
      this.productForm.get('categorie')?.setValue(this.product.detailProduit.categorieProduit);
    }
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
    return this.stock.hasError('required') ? 'Field is required' : "";
  }

  getErrorFournisseur() {
    return this.fournisseurs.hasError('required') ? 'Field is required' : "";
  }



  // Get fields value as form control
  get code() {return this.productForm.get('code') as FormControl;}
  get libelle() {return this.productForm.get('libelle') as FormControl;}
  get prixUnitaire() {return this.productForm.get('prixUnitaire') as FormControl;}
  get rayon() {return this.productForm.get('rayon') as FormControl;}
  get stock() {return this.productForm.get('stock') as FormControl;}
  get categorie() {return this.productForm.get('categorie') as FormControl;}
  get fournisseurs() {return this.productForm.get('fournisseurs') as FormControl;}

  saveProduct() {
    this.product.stock = this.stock.value;
    this.product.detailProduit.categorieProduit = this.categorie.value;
    this.product.rayon = this.rayon.value;
    this.product.fournisseurs = this.fournisseurs.value;
    this.productService.add(this.product).subscribe(value => {
      // @ts-ignore
      this.product = value;
      this.dialogRef.close(this.product);
    });
  }

  updateProduct() {
    this.product.stock = this.stock.value;
    this.product.detailProduit.categorieProduit = this.categorie.value;
    this.product.rayon = this.rayon.value;
    this.productService.update(this.product).subscribe(value => {
      // @ts-ignore
      this.product = value;
      this.dialogRef.close(this.product);
    });
  }
}
