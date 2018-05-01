import {Component} from '@angular/core'

import{NavController} from 'ionic-angular'
import {User} from '../model/user';

import {AuthenticationService} from '../services/authentication.service';

import {LoginComponent} from '../loginPage/login.component'
import {UserProfileEditComponent} from '../userProfilePage/edit/userProfileEdit.component'

@Component({
selector:'loggedInUserProfile',
templateUrl:'userProfile.template.html'
})

export class LoggedInUserProfileComponent{

user:User;


constructor(public authService:AuthenticationService,
public navcontroller:NavController)
{
    this.user=authService.getUserInfo();
   
}

logOut(e:any)
{
    //debugger;
//this.authService.logout();
//this.navcontroller.setRoot(LoginComponent);
this.navcontroller.push(LoginComponent);
}


editUser(e)
{
this.navcontroller.push(UserProfileEditComponent);

}
}