import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {fournisseur} from 'app/core/models/fournisseur';

@Component({
  selector: 'app-show-onefournisseur-component',
  templateUrl: './show-onefournisseur-component.component.html',
  styleUrls: ['./show-onefournisseur-component.component.scss']
})
export class ShowOnefournisseurComponentComponent implements OnInit {

  @Input()  fournisseur: fournisseur;
  @Output() supprimer_fournisseur:EventEmitter<fournisseur>=new EventEmitter<fournisseur>();
  @Output() modifier_fournisseur_before:EventEmitter<fournisseur>=new EventEmitter<fournisseur>();
  /* @Output() find:EventEmitter<string>=new EventEmitter<string>();*/

  constructor() { }

  ngOnInit(): void {
  }

  appliquer_supp() {
    this.supprimer_fournisseur.emit(this.fournisseur);
  }

  appliquer_modif() {
    this.modifier_fournisseur_before.emit(this.fournisseur);
  }
}
