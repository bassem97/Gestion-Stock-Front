import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ProduitService} from "../../../core/services/produit/produit.service";
import {Produit} from "../../../core/models/produit";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ReclamationService} from "../../../core/services/reclamation/reclamation.service";
import {Reclamation} from "../../../core/models/reclamation";
import {Client} from "../../../core/models/client";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatStepper} from "@angular/material/stepper";

@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrls: ['./add-reclamation.component.css']
})
export class AddReclamationComponent implements OnInit  {

  produits: Produit[];
  firstStepControl: FormGroup;
  @ViewChild('stepper') stepper: MatStepper;
  reclamationForm: FormGroup;
  selectedProduct : Produit = new Produit();

  constructor( private productService: ProduitService,
               private reclamationService : ReclamationService,
               private formBuilder: FormBuilder,
               @Inject(MAT_DIALOG_DATA) public data: Array<any>,
               public dialogRef: MatDialog

  ) { }

  ngOnInit(): void {
    if(this.data!= null)
    {
      this.selectedProduct = this.data[0];
      setTimeout(() =>{
        this.stepper.selectedIndex = 1

      },500 )
    }
    this.getProducts();
    this.setForm();
  }

  getProducts(){
    this.productService.findAll().subscribe(result => {
      console.log(result);
      this.produits = result
    })
  }


  setForm(): void {

    if(this.data)
      this.firstStepControl = this.formBuilder.group({
      products: [this.data[0], [Validators.required]],
      });
    else
      this.firstStepControl = this.formBuilder.group({
        products: ['', [Validators.required]],
      });

    this.reclamationForm = this.formBuilder.group({
      subject: ['', [Validators.required]],
      body: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  // Eroooors

  getErrorSubject() {
    return this.subject.hasError('required') ? 'Field is required' : "";
  }
  getErrorBody() {
    return this.body.hasError('required') ?
      'Field is required' :
      this.body.hasError('minlength') ? 'You need to specify at least 3 characters' : "";
  }
  getErrorProducts() {
    return this.products.hasError('required') ? 'Field is required' : "";
  }

  get subject() {return this.reclamationForm.get('subject') as FormControl;}
  get body() {return this.reclamationForm.get('body') as FormControl;}
  get products() {return this.firstStepControl.get('products') as FormControl;}

  submitReclamation() {

    const reclamation : Reclamation = new Reclamation(this.subject.value,this.body.value,<Produit>this.produits.find(product => product.idProduit == this.products.value),new Client())
    this.reclamationService.add(reclamation).subscribe(res => {
      console.log(res);
    })
  }

  // ngAfterViewInit(): void {
  //   if(this.data[0]!= null)
  //     this.stepper.selectedIndex = 1
  //
  // }
  okClick() {
    this.dialogRef.closeAll()


  }
}
