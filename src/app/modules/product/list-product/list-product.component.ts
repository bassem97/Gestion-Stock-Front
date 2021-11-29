import { Component, OnInit } from '@angular/core';
import {Produit} from "../../../core/models/produit";
import {ProduitService} from "../../../core/services/produit/produit.service";
import {AddProductComponent} from "../add-product/add-product.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  products: Produit[];
  showFormTemplate: boolean;
  constructor(private produitService: ProduitService,
              public dialog: MatDialog
              ) { }



  ngOnInit(): void {
    this.showFormTemplate = false;
    this.refreshList();

  }

  refreshList(){
    this.produitService.findAll().subscribe(value => {
      this.products = value;
      console.log(value);
    })
  }

  showForm(){
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '60%',
      height: '76%',
      data: [null, 'produit']
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.produitService.add(product)
      }
    });
  }

  delete(product: Produit) {
    this.produitService.delete(product.idProduit).subscribe(result => {
      this.refreshList()
    })
  }
}
