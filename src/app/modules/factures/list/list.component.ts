import { Component, OnInit } from '@angular/core';
import {Facture} from "../../../core/models/facture";
import {FactureService} from "../../../core/services/facture/facture.service";
import {MatDialog} from "@angular/material/dialog";
import {AddProductComponent} from "../../product/add-product/add-product.component";
import {AddFactureComponent} from "../add-facture/add-facture.component";
import {WebSocketAPIService} from "../../../core/services/webSocketAPI/web-socket-api.service";
import {DeleteDialogComponent} from "../../../shared/dialogs/delete-dialog/delete-dialog.component";
import {UserService} from "../../../core/services/user/user.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  factures: Facture[];

  constructor(private factureService: FactureService,
              public dialog: MatDialog,
              private webSocketAPI: WebSocketAPIService

  ) {}

  ngOnInit(): void {
    this.refreshData();
    this.webSocketAPI._connect();
    this.webSocketAPI.webSocketNotifier.subscribe(res => {
      setTimeout(() => {
        this.refreshData();
      }, 500);
    });
  }

  private refreshData(){
    this.factureService.findAll().subscribe(value => {
      this.factures = value;
    })
  }

  openAddDialog(){
    const dialogRef = this.dialog.open(AddFactureComponent, {
      width: '60%',
      height: '80%',
      data: [null, 'facture'],
    });
    dialogRef.afterClosed().subscribe();
  }

  openEditDialog(facture: Facture) {
    const dialogRef = this.dialog.open(AddFactureComponent, {
      width: '60%',
      height: '75%',
      data: [facture, 'facture'],
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.factureService.update(facture).subscribe(value =>dialogRef.close(value));

      }
    });
  }

  openDeleteDialog(facture: Facture) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '30%',
      data: [facture, "facture"]
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.factureService.delete(facture).subscribe(value =>dialogRef.close(value));

      }
    });
  }
}
