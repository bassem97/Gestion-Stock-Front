import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Produit} from "../../../core/models/produit";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../../../shared/dialogs/delete-dialog/delete-dialog.component";
import {ProduitService} from "../../../core/services/produit/produit.service";
import {AddProductComponent} from "../add-product/add-product.component";

@Component({
  selector: 'app-produit',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Produit;
  @Output() deleteEvent = new EventEmitter<Produit>()

  img: string = "src/assets/img/angular.png";


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDeleteEmpDialog(product: Produit) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: [product, 'produit']
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.deleteEvent.emit(this.product)
      }
    });
  }

  openEditEmpDialog(product: Produit) {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '60%',
      height: '76%',
      data: [product, 'produit']
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteEvent.emit(this.product)
      }
    });
  }
}