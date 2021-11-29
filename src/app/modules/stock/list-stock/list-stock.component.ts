import {Component, Input, OnInit} from '@angular/core';
import {Stock} from "../../../core/models/stock";
import {StockService} from "../../../core/services/stock/Stock.service";


@Component({
  selector: 'app-stock',
  templateUrl: './list-stock.component.html',
  styleUrls: ['./list-stock.component.css']
})
export class ListStockComponent implements OnInit {
  stocks: Stock[];
  showFormTemplate: boolean;
  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.showFormTemplate = false;

    this.stockService.findAll().subscribe(value => {
      this.stocks = value;
      console.log(value)
    })
  }

  showForm(){
    this.showFormTemplate =true;
  }

}
