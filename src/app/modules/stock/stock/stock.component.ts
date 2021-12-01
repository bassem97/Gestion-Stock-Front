import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Stock} from "../../../core/models/stock";
import {DeleteDialogComponent} from "../../../shared/dialogs/delete-dialog/delete-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogStockComponent} from "../../../shared/dialogs/delete-dialog-stock/delete-dialog-stock.component";
import {AddStockComponent} from "../add-stock/add-stock.component";


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  @Input() stock: Stock;
  @Output() deleteEvent = new EventEmitter<Stock>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDeleteEmpDialog(stock: Stock) {
    const dialogRef = this.dialog.open(DeleteDialogStockComponent, {
      width: '400px',
      data: [stock, 'stock']
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteEvent.emit(this.stock)
      }
    });
  }
  openEditEmpDialog(stock: Stock) {
    this.dialog.open(AddStockComponent, {
      width: '60%',
      height: '76%',
      data: [stock, 'stock']
    });
  }


}
