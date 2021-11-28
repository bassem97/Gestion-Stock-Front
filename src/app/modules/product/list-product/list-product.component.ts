import { Component, OnInit } from '@angular/core';
import {Produit} from "../../../core/models/produit";
import {ProduitService} from "../../../core/services/produit/produit.service";

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  products: Produit[];
  showFormTemplate: boolean;
  constructor(private produitService: ProduitService) { }

  ngOnInit(): void {
    this.showFormTemplate = false;

    this.produitService.findAll().subscribe(value => {
      this.products = value;
      console.log(value);
    })
  }

  showForm(){
    this.showFormTemplate =true;
  }
}
