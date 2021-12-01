import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Client } from '../../../core/models/client';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from '../../../shared/dialogs/delete-dialog/delete-dialog.component';
import { Login } from '../../../core/models/login';
import { AuthenticationService } from '../../../core/services/auth/authService';

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signUpForm: FormGroup;
  client: Client;
  loginForm: FormGroup;
  loginModel: Login = { password: '', username: '' };

  DeleteDialogComponent: MatDialogRef<DeleteDialogComponent>;
  @Output() closeAll = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.client = new Client();
    this.createSignUpForm();
    this.creatSignInForm();
  }

  createSignUpForm() {
    const emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const name: RegExp = /^[a-zA-Z]+$/;

    this.signUpForm = this.formBuilder.group(
      {
        nom: [
          this.client.nom,
          [
            Validators.required,
            Validators.pattern(name),
            Validators.minLength(3),
          ],
        ],
        prenom: [
          this.client.prenom,
          [
            Validators.required,
            Validators.pattern(name),
            Validators.minLength(3),
          ],
        ],
        email: [
          this.client.email,
          [Validators.required, Validators.pattern(emailregex)],
        ],
        password: [
          this.client.password,
          [Validators.required, this.checkPassword],
        ],
        repassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'repassword'),
      }
    );
  }
  checkPassword(control: any) {
    const enteredPassword = control.value;
    const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return !passwordCheck.test(enteredPassword) ? { requirements: true } : null;
  }
  getErrorNom() {
    return this.nom.hasError('required')
      ? 'Field is required'
      : this.nom.hasError('minlength')
      ? 'You need to specify at least 3 characters'
      : 'First name should be contain only caracters';
  }
  getErrorPrenom() {
    return this.prenom.hasError('required')
      ? 'Field is required'
      : this.prenom.hasError('minlength')
      ? 'You need to specify at least 3 characters'
      : 'Last name should be contain only caracters';
  }
  getErrorEmail() {
    return this.email.hasError('required')
      ? 'Field is required'
      : this.email.hasError('pattern')
      ? 'Not a valid email address'
      : this.email.hasError('alreadyInUse')
      ? 'This email address is already in use'
      : '';
  }
  getErrorPassword() {
    return this.password.hasError('required')
      ? 'Field is required (at least six characters, one uppercase letter and one number)'
      : this.password.hasError('requirements')
      ? 'Password needs to be at least six characters, one uppercase letter and one number'
      : '';
  }
  getErrorRepassword() {
    return this.repassword.hasError('required')
      ? 'Field is required '
      : 'Passwords Must match ';
  }
  get nom() {
    return this.signUpForm.get('nom') as FormControl;
  }
  get prenom() {
    return this.signUpForm.get('prenom') as FormControl;
  }
  get email() {
    return this.signUpForm.get('email') as FormControl;
  }
  get password() {
    return this.signUpForm.get('password') as FormControl;
  }
  get repassword() {
    return this.signUpForm.get('repassword') as FormControl;
  }

  creatSignInForm() {
    this.loginForm = this.formBuilder.group({
      username: [this.loginModel.username, [Validators.required]],
      password: [this.loginModel.password, [Validators.required]],
    });
  }

  onClickSignUp() {
    console.log('aa');
    this.authService.register(this.client).subscribe(
      (data) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    this.authService.authenticate(this.loginModel).subscribe((res) => {
      
      if (res) {
        // @ts-ignore
        localStorage['token'] = res.token;
      
        this.router.navigate(['/dashboard']);
      } else if (res === false) {
        this.DeleteDialogComponent = this.dialog.open(DeleteDialogComponent, {
          width: '350px',
          data: 'Username/password Invalid/does not exist ! ',
        });
      }
    });
  }
}
