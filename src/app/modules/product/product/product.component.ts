import {Component, Input, OnInit} from '@angular/core';
import {Produit} from "../../../core/models/produit";

@Component({
  selector: 'app-produit',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Produit;

  constructor() { }

  ngOnInit(): void {
  }

}
