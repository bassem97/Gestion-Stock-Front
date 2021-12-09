import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  template: `
      <h3 mat-dialog-title>{{this.data}} </h3>
      <div style="text-align: center;">
          <p>
              <button mat-button [mat-dialog-close]="" cdkFocusInitial>Ok</button>
          </p>
      </div>
  `
})
export class ErrorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
}
