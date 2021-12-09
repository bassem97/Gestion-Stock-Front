import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Produit} from "../../../core/models/produit";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../../../shared/dialogs/delete-dialog/delete-dialog.component";
import {AddProductComponent} from "../add-product/add-product.component";
import {AddReclamationComponent} from "../../reclamation/add-reclamation/add-reclamation.component";

@Component({
  selector: 'app-produit',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Produit;
  @Output() deleteEvent = new EventEmitter<Produit>();

  img: string = "src/assets/img/angular.png";


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    if(!this.product.image)
      this.product.image = "cover.jpeg";
  }

  openDeleteEmpDialog(product: Produit) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '30%',
      data: [product, 'produit']
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.deleteEvent.emit(this.product)
      }
    });
  }

  openEditEmpDialog(product: Produit) {
    this.dialog.open(AddProductComponent, {
      width: '60%',
      height: '76%',
      data: [product, 'produit']
    });
  }

  reportProduct(product: Produit) {
    const dialogRef = this.dialog.open(AddReclamationComponent, {
      width: '60%',
      height: '60%',
      data : [product]
    });
    dialogRef.afterClosed().subscribe();
  }
}
