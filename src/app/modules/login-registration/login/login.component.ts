import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../../../core/models/user';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from '../../../shared/dialogs/delete-dialog/delete-dialog.component';
import { Login } from '../../../core/models/login';
import { AuthenticationService } from '../../../core/services/auth/authService';
import { UserService } from '../../../core/services/user/user.service';
import {ErrorDialogComponent} from "../../../shared/dialogs/error-dialog/error-dialog.component";

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
  user: User;
  loginForm: FormGroup;
  loginModel: Login;

  errorDialogComponent: MatDialogRef<ErrorDialogComponent>;
  @Output() closeAll = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loginModel = {email: '', password: ''};
    this.user = new User();
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
          this.user.firstName,
          [
            Validators.required,
            Validators.pattern(name),
            Validators.minLength(3),
          ],
        ],
        prenom: [
          this.user.lastName,
          [
            Validators.required,
            Validators.pattern(name),
            Validators.minLength(3),
          ],
        ],
        email: [
          this.user.email,
          [Validators.required, Validators.pattern(emailregex)],
        ],
        password: [
          this.user.password,
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
      email: [this.loginModel.email, [Validators.required]],
      password: [this.loginModel.password, [Validators.required]],
    });
  }

  onClickSignUp() {
    console.log('aa');
    this.authService.register(this.user).subscribe(
      (data) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  submit() {
    this.authService.authenticate(this.loginModel).subscribe(res => {
      // @ts-ignore
      localStorage.token = res.token;
      this.userService.findUserWithToken().subscribe( ress => {
        // @ts-ignore
        localStorage.email = ress.email;
        // @ts-ignore
        setTimeout(() => {
          this.router.navigateByUrl('/dashboard').then(() => window.location.reload());
        }, 100);
      }, error => console.log(error));
    }, error => {
      this.errorDialogComponent = this.dialog.open(ErrorDialogComponent, {
        width: '350px',
        data: 'Username/password Invalid/does not exist ! ',
      });
    });
  }
}
