import { Component}from '@angular/core';

import {User} from '../../model/user';
import{NavController} from 'ionic-angular'

import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user.service';

@Component({
    selector:"editUser",
    templateUrl:'userProfileEdit.template.html',
    providers:[UserService]
})

export class UserProfileEditComponent{

headerTitle:string='Edit User';
user:User;

constructor(public authService:AuthenticationService,
public navcontroller:NavController)
{
    this.user=authService.currentUser;
   
}

}