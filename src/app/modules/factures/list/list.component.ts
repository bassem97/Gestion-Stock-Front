import { Component, OnInit } from '@angular/core';
import {Facture} from "../../../core/models/facture";
import {FactureService} from "../../../core/services/facture/facture.service";
import {MatDialog} from "@angular/material/dialog";
import {AddProductComponent} from "../../product/add-product/add-product.component";
import {AddFactureComponent} from "../add-facture/add-facture.component";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  factures: Facture[];

  constructor(private factureService: FactureService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.refreshData();
  }

  private refreshData(){
    this.factureService.findAll().subscribe(value => {
      this.factures = value;
    })
  }

  toggleForm(){
    const dialogRef = this.dialog.open(AddFactureComponent, {
      width: '60%',
      height: '64%',
      data: [null, 'facture'],
    });
    dialogRef.afterClosed().subscribe();
  }
}
