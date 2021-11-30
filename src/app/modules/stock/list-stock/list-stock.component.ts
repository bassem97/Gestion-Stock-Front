import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Stock} from "../../../core/models/stock";
import {StockService} from "../../../core/services/stock/Stock.service";
import {Produit} from "../../../core/models/produit";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../../../shared/dialogs/delete-dialog/delete-dialog.component";


@Component({
  selector: 'app-list-stock',
  templateUrl: './list-stock.component.html',
  styleUrls: ['./list-stock.component.css']
})
export class ListStockComponent implements OnInit {
  @Input() stock: Stock;
  stocks: Stock[];
  showFormTemplate: boolean;
  constructor(private stockService: StockService, public dialog: MatDialog) {}


  ngOnInit(): void {
    this.showFormTemplate = false;

    this.stockService.findAll().subscribe(value => {
      this.stocks = value;
      console.log(value)
    })
    this.refreshList();
  }
  showForm(){
    this.showFormTemplate =true;
  }
  refreshList(){
    this.stockService.findAll().subscribe(value => {
      this.stocks = value;
      console.log(value);
    })
  }
  delete(stock: BigInt) {
    this.stockService.delete(stock).subscribe(result => {
      this.refreshList()
    })
  }

}
