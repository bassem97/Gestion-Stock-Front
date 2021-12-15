import { Component, OnInit } from '@angular/core';
import {Produit} from "../../../core/models/produit";
import {ProduitService} from "../../../core/services/produit/produit.service";
import {AddProductComponent} from "../add-product/add-product.component";
import {MatDialog} from "@angular/material/dialog";
import {WebSocketAPIService} from "../../../core/services/webSocketAPI/web-socket-api.service";

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  products: Produit[];
  showFormTemplate: boolean;
  constructor(private produitService: ProduitService,
              public dialog: MatDialog,
              private webSocketAPI: WebSocketAPIService
              ) { }


  ngOnInit(): void {
    this.refreshProducts();
    this.webSocketAPI._connect();
    this.webSocketAPI.webSocketNotifier.subscribe(res => {
      setTimeout(() => {
        this.refreshProducts();
      }, 500);
    });
    this.showFormTemplate = false;
  }

  private refreshProducts() {
    this.produitService.findAll().subscribe(value => {
      this.products = value;
    })
  }

  showForm(){
    // @ts-ignore
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '60%',
      height: '64%',
      data: [null, 'produit'],

    });
    dialogRef.afterClosed().subscribe();
  }

  delete(id: number) {

    this.produitService.delete(id).subscribe();
  }

}
