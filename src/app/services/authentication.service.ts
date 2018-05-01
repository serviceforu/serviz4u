import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http'

import { User } from '../model/user'
import { ValidateUser } from '../loginPage/viewModel/validateUser'

import { AppSetting } from '../model/appSetting'

@Injectable()

export class AuthenticationService {
  public currentUser: User;
  headerTest: Headers;


  constructor(public httpWeb: Http) {
    this.headerTest = new Headers();
    this.headerTest.append('Content-Type', 'application/x-www-form-urlencoded') //******


  }

  public validateUser(validateUser: ValidateUser) {
    //debugger;
    if (validateUser.loginid === null || validateUser.password === null) {

      return Observable.throw('Please insert credentials');

    }
    else {


      return this.httpWeb.post(AppSetting.webApiUrl + "index.php", validateUser, { headers: this.headerTest });

    }
  }

  public getUserInfo(): User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}