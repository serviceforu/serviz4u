import { Injectable } from '@angular/core'
import { Http, Headers, Response } from '@angular/http'

import { AppSetting } from '../model/appSetting'


import { LeaveApplication } from '../applyLeave/viewModel/applyLeave'
@Injectable()

export  class LeaveService {
    headerTest: Headers;
    constructor(private http: Http) {
        this.headerTest = new Headers();
        this.headerTest.append('Content-Type', 'application/x-www-form-urlencoded') //******

    }

      


 getLeaveListByUserName(userName:string) {
        return this.http.get(AppSetting.webApiUrl + "leave_status_summary.php?username="+userName+"");
    }

    applyLeave(leaveApplication: LeaveApplication) {
        return this.http.post(
            AppSetting.webApiUrl + "leave.php",
            {
                "username": leaveApplication.username,
                "leave_from": leaveApplication.leaveFrom,
                "leave_to": leaveApplication.leaveTo,
                "leave_days": leaveApplication.leaveDays,
                "leave_reason": leaveApplication.leaveReason,

            },
            { headers: this.headerTest });

    }


}