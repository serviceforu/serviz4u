import { Injectable } from '@angular/core'
import { Http, Headers, Response } from '@angular/http'

import { AppSetting } from '../model/appSetting'
import { CheckIn } from '../ticketSummaryPage/viewModel/checkIn'
import { CheckOut } from '../ticketSummaryPage/viewModel/checkOut'
import { SolutionTicket } from '../ticketSummaryPage/viewModel/ticketSolution'
import { AssignTicket } from '../admin/manageTicket/viewModel/assignTicket'
import { Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

@Injectable()

export class TicketService {
    headerTest: Headers;
    constructor(private http: Http, public geocoder: NativeGeocoder, ) {
        this.headerTest = new Headers();
        this.headerTest.append('Content-Type', 'application/x-www-form-urlencoded') //******

    }

    getTicketByUser(username: string, status: string = "") {
        return this.http.get(AppSetting.webApiUrl + "support.php?username=" + username + "&status=" + status + "");
    }

    checkIn(checkIn: CheckIn) {
        return this.http.post(
            AppSetting.webApiUrl + "check_in.php",
            {
                "username": checkIn.username,
                "Ticketno": checkIn.Ticketno,
                "date": checkIn.date,
                "checkin": checkIn.checkin,
                "location": checkIn.location,
                "latitude": checkIn.latitude,
                "longitude": checkIn.longitude,

                "Companyname": checkIn.Companyname,
                "comname": checkIn.comname

            },
            { headers: this.headerTest });


    }

    checkOut(checkOut: CheckOut) {
        return this.http.post(
            AppSetting.webApiUrl + "check_out.php",
            {
                "username": checkOut.username,
                "Ticketno": checkOut.ticketno,
                "date": checkOut.date,
                "out_time": checkOut.out_time,
                "checkout": checkOut.checkout,
                "location": checkOut.location,
                "latitude": checkOut.latitude,
                "longitude": checkOut.longitude,
                "enginner_id": checkOut.enginner_id,
                "check_id": checkOut.check_id

            },
            { headers: this.headerTest });


    }

    provideSolutionToTicket(solutionTicket: SolutionTicket) {
        return this.http.post(
            AppSetting.webApiUrl + "solution.php",
            {
                "username": solutionTicket.username,
                "Ticketno": solutionTicket.ticketNo,
                "problem": solutionTicket.problem,
                "solution": solutionTicket.solution,
                "status": solutionTicket.status
            },
            { headers: this.headerTest });


    }



    getAddressDetailByLatAndLong(lat: number, long: number) {

        return this.http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&sensor=false");
    }

    getTicketListForAdmin() {

        return this.http.get(AppSetting.webApiUrl + "admin_support.php?username=''");

    }

    getTicketStatus() {
        return this.http.get(AppSetting.webApiUrl + "status.php?username=''");

    }

    assignTicketToEngineer(assignTicket: AssignTicket) {
        return this.http.post(
            AppSetting.webApiUrl + "tl_assign_eng.php",
            {
                "username": assignTicket.currentUser,
                "Ticketno": assignTicket.ticketNo,
                "person": assignTicket.userSelected,
            },
            { headers: this.headerTest });

    }

    getTicketSummary(userName: string) {

        return this.http.get(AppSetting.webApiUrl + "ticket_report.php?username=" + userName + "");
    }

    getAddressDetailLocationCordinate(geoLocation: Geoposition) {

        return this.geocoder.reverseGeocode(geoLocation.coords.latitude, geoLocation.coords.longitude);
    }

}