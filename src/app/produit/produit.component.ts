import {Component, Input, OnInit} from '@angular/core';
import {Produit} from "../core/models/produit";

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  @Input() product: Produit;

  constructor() { }

  ngOnInit(): void {
  }

}
