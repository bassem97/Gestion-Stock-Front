import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {Produit} from "../../../core/models/produit";
import {Stock} from "../../../core/models/stock";
import {Facture} from "../../../core/models/facture";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
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
    else     if (this.data[1] === 'facture')
      message += (<Facture>this.data[0].idFacture)


    return message;
  }


}
