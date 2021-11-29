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
        let aux = this.products.find(value => value.idProduit == result.idProduit);
        if (aux)
          this.products[this.products.indexOf(aux)] = aux;
        else
          this.products.push(result);
      }
    });
  }

  delete(id: number) {
    this.produitService.delete(id).subscribe(result => {
      this.refreshListAfterDelete(id);
    });
  }

  refreshListAfterDelete(id: number) {
    this.products = this.products.filter(value => value.idProduit != id);
  }
}
