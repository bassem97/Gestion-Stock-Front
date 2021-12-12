import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {rayon} from "../../../core/models/rayon";

@Component({
  selector: 'app-show-onerayon',
  templateUrl: './show-onerayon.component.html',
  styleUrls: ['./show-onerayon.component.scss']
})
export class ShowOnerayonComponent implements OnInit {

  @Input()  rayon: rayon;
  @Output() supprimer_rayon:EventEmitter<rayon>=new EventEmitter<rayon>();
  @Output() modifier_rayon_before:EventEmitter<rayon>=new EventEmitter<rayon>();

  constructor() { }

  ngOnInit(): void {
  }

  appliquer_supp() {
    this.supprimer_rayon.emit(this.rayon);
  }

  appliquer_modif() {
    this.modifier_rayon_before.emit(this.rayon);
  }
}
