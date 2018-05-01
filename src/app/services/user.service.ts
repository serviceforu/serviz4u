import { Injectable } from '@angular/core'
import { Http, Headers, Response } from '@angular/http'

import { AppSetting } from '../model/appSetting'


import { Attendence } from '../attendence/viewModel/attendence'


@Injectable()

export class UserService {

    headerTest: Headers;


    constructor(private http: Http) {
        this.headerTest = new Headers();
        this.headerTest.append('Content-Type', 'application/x-www-form-urlencoded') //******

    }

    getUserList() {
        return this.http.get(AppSetting.webApiUrl + "engineer_name.php?username=''");
    }

  

    getAttendenceForUser(attendence: Attendence) {
        return this.http.post(AppSetting.webApiUrl + "eng_attendance.php", {
            "username": attendence.username,
            "date_from": attendence.from,
            "date_to": attendence.to

        },
            { headers: this.headerTest });
    }

    getCompanyList(userName: string) {
        return this.http.get(AppSetting.webApiUrl + "companyname.php?username=''");
    }


}