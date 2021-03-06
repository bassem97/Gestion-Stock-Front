import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Stock} from "../../../core/models/stock";

@Component({
  selector: 'app-delete-dialog-stock',
  templateUrl: './delete-dialog-stock.component.html',
  styleUrls: ['./delete-dialog-stock.component.css']
})
export class DeleteDialogStockComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Array<any>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  deleteMessage() {
    let message: string;
    message = 'Are you sure you want to delete ';
    if (this.data[1] === 'stock')
      message += (<Stock>this.data[0].idStock)

    return message;
  }


}
