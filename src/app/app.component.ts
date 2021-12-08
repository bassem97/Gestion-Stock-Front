import {Component, Input} from '@angular/core';
import { User } from './core/models/user';
import { UserService } from './core/services/user/user.service';
import {DarkModeSwitcherService} from "./core/services/dark-mode/dark-mode-switcher.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   connectedUser: User;
  title = 'GestionStock-Front';


  constructor(private userService: UserService, private darkModeSwitcherService: DarkModeSwitcherService
  ) {
    this.userService.findUserWithToken().subscribe(user => {
      this.connectedUser = user
    })
  }

  getDarkMode():boolean{
    return this.darkModeSwitcherService.getDarkMode()
  }
}
