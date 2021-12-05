import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Reclamation} from "../../../core/models/reclamation";
import {ReclamationService} from "../../../core/services/reclamation/reclamation.service";
import {MatDialog} from "@angular/material/dialog";
import {Produit} from "../../../core/models/produit";
import {User} from "../../../core/models/user";
import {AddProductComponent} from "../../product/add-product/add-product.component";
import {AddReclamationComponent} from "../add-reclamation/add-reclamation.component";
import {WebSocketAPIService} from "../../../core/services/webSocketAPI/web-socket-api.service";

@Component({
  selector: 'app-list-reclamations',
  templateUrl: './list-reclamations.component.html',
  styleUrls: ['./list-reclamations.component.css']
})
export class ListReclamationsComponent implements OnInit {
  reclamations: Reclamation[];
  @ViewChild('target') private myScrollContainer: ElementRef;


  constructor(private reclamationService : ReclamationService,
              public dialog: MatDialog,
              private webSocketAPI: WebSocketAPIService,

  ) { }

  ngOnInit(): void {
    this.refreshReclamations();
    this.webSocketAPI._connect();
    this.webSocketAPI.webSocketNotifier.subscribe(res => {
      setTimeout(() => {
        this.refreshReclamations();
      }, 500);
    });
  }

  private refreshReclamations() {
    this.reclamationService.findAll().subscribe(value => {
      console.log(value);
      this.reclamations = value;
    })
  }

  submitReclamation() {
    // const reclamation : Reclamation = new Reclamation("subject","bpodyy",new Produit(),new Client(),true)
    // this.reclamationService.add(reclamation).subscribe(result => {
    //   console.log(result);
    // });
    const dialogRef = this.dialog.open(AddReclamationComponent, {
      width: '60%',
      height: '60%',

    });
    dialogRef.afterClosed().subscribe();
  }
}
