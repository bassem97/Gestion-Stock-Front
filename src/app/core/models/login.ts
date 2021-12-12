export class Login {
  email: string;
  password: string;
  resolved : boolean;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
    this.resolved = false;
  }
}
