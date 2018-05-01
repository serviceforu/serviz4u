import { Injectable } from '@angular/core'
import { Http, Headers, Response } from '@angular/http'

import { AppSetting } from '../model/appSetting'

import { NightCall } from '../nightCall/viewModel/nightCall'
@Injectable()

export  class NightService {
    headerTest: Headers;
    constructor(private http: Http) {
        this.headerTest = new Headers();
        this.headerTest.append('Content-Type', 'application/x-www-form-urlencoded') //******

    }

      saveNightCallForUser(nightCall: NightCall) {
          //debugger;
        return this.http.post(AppSetting.webApiUrl + "night.php", {
          
            "username": nightCall.username,
            "comid": nightCall.comid,
            "problem": nightCall.problem,
            "approved_by": nightCall.approvedBy,
            "call_type": nightCall.callType
        },{ headers: this.headerTest });
    }


 getNightCallListByUserName(userName:string) {
        return this.http.get(AppSetting.webApiUrl + "night_status.php?username="+userName+"");
    }

}