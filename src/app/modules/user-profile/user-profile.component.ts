import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../core/models/user';
import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @Input() connectedUser: User;

  constructor(private userservice : UserService) { }

  ngOnInit() {
    
    this.userservice.findUserWithToken().subscribe(
      (user: User) => {
        this.connectedUser = user;
        console.log(this.connectedUser);
        
      }
    );
  
 
  }

}
