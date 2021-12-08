import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Stock} from "../../../core/models/stock";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StockService} from "../../../core/services/stock/stock.service";

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {

  stockForm: FormGroup;
  stock: Stock;

  constructor(public dialogRef: MatDialogRef<AddStockComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Array<any>,
              private formBuilder: FormBuilder,
              private stockService: StockService) { }

  ngOnInit(): void {
    this.stock = this.data[0] || new Stock();

    this.stockForm = this.formBuilder.group({
      libelleStock: [this.stock.libelleStock, [Validators.required , Validators.minLength(3)]],
      qte: [this.stock.qte, [Validators.required]],
      qteMin: [this.stock.qteMin, [Validators.required]],
    });

  }

  // Get form controls Errors
  getErrorLibelle() {
    return this.libelleStock.hasError('required') ?
      'Field is required' :
      this.libelleStock.hasError('minlength') ? 'You need to specify at least 3 characters' : "";
  }

  getErrorQte() {
    return this.Qte.hasError('required') ? 'Field is required' : "";
  }

  getErrorQteMin() {
    return this.QteMin.hasError('required') ? 'Field is required' : "";
  }




  // Get fields value as form control
  get libelleStock() {return this.stockForm.get('libelleStock') as FormControl;}
  get Qte() {return this.stockForm.get('qte') as FormControl;}
  get QteMin() {return this.stockForm.get('qteMin') as FormControl;}

  saveStock() {
    this.stock.libelleStock = this.libelleStock.value;
    this.stock.qte = this.Qte.value;
    this.stock.qteMin = this.QteMin.value;
    this.stockService.add(this.stock).subscribe(value => this.dialogRef.close(value));


  }

  updateStock() {
    this.stock.libelleStock = this.libelleStock.value;
    this.stock.qte = this.Qte.value;
    this.stock.qteMin = this.QteMin.value;
    this.stockService.update(this.stock).subscribe(value => this.dialogRef.close(value));
  }

}
