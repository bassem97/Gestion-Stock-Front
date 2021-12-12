import { Component, OnInit } from '@angular/core';
import {Produit} from "../../../core/models/produit";
import {ActivatedRoute} from "@angular/router";
import {ProduitService} from "../../../core/services/produit/produit.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Produit;

  constructor(private route: ActivatedRoute, private produitService: ProduitService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.produitService.findById(this.route.snapshot.paramMap.get('idProduct')).subscribe(value => this.product = value);
  }

}
