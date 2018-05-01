import { Component } from '@angular/core'
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

import { NavParams } from 'ionic-angular';
//import {Ticket} from '../viewModel/ticket'
import {
    NavController, AlertController, LoadingController, Loading,
    ModalController
} from 'ionic-angular'
import { AuthenticationService } from '../../services/authentication.service'
import { TicketService } from '../../services/ticket.service'
import { ErrorHandlingService } from '../../services/errorHandling.service'

import { TicketDetailComponent } from '../detail/ticketDetail.component'

import { CheckIn } from '../viewModel/checkIn'
import { CheckOut } from '../viewModel/checkOut'
import { User } from '../../model/user'


@Component({
    selector: 'ticket',
    templateUrl: 'listTicket.template.html',
    providers: [TicketService]
})

export class ListTicketComponent {
    loading: Loading;
    headerTitle: string = 'Ticket Summary Page';
    user: User;
    selectedCheckIn: CheckIn;
    selectedCheckOut: CheckOut;

    ticketList: any[];

    status: string;

    geoLocationOption: GeolocationOptions = {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 30000
    };

    constructor(
        private ticketService: TicketService,
        private authenticateService: AuthenticationService,
        private geolocation: Geolocation,
        public locac: LocationAccuracy,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        public navController: NavController,
        private modalController: ModalController,
        private navParam: NavParams,
        private errorHandling: ErrorHandlingService
    ) {

        this.status = navParam.get("status") != undefined ? navParam.get("status") : "";

        //debugger;
        this.errorHandling.ShowLoading();

        this.GetListOfTicket();

        this.user = this.authenticateService.currentUser;




    }


    GetListOfTicket() {

        this.ticketService.getTicketByUser(this.authenticateService.currentUser.username, this.status)
            .subscribe(resultList => {
                //debugger;
                if (resultList.json()) {
                    var responseBody = resultList.json();

                    if (responseBody.data) {
                        if (responseBody.data.length > 0) {
                            this.ticketList = responseBody.data;

                        }
                    }
                }
            }, error => {
                //debugger;
                this.errorHandling.HideLoading();
            }, () => this.errorHandling.HideLoading())


    }


    checkIn(selectedTicket: any) {

        debugger;
        let latitude: number;
        let longitude: number;
        let addressArray: any;
        let selectedAddress: string;

        this.errorHandling.ShowLoading();
        debugger;
        // this.locac.canRequest().then((res: boolean) => {
        //     if (res) {

        //         this.locac.request(this.locac.REQUEST_PRIORITY_BALANCED_POWER_ACCURACY)
        //             .then(() => {
        //                 debugger
        this.getCurrentLocation(selectedTicket);

        //             }).catch(error => {
        //                 this.errorHandling.ShowError(error.message, false);
        //                 this.errorHandling.HideLoading();
        //             });
        //     }
        // }).catch(error => {
        //     debugger
        //     this.errorHandling.ShowError(error.message, false);
        //     this.errorHandling.HideLoading();
        // })
    }

    getCurrentLocation(selectedTicket: any) {
        debugger;
        let latitude: number;
        let longitude: number;
        let addressArray: any;
        let selectedAddress: string;

        this.geolocation.getCurrentPosition(this.geoLocationOption)
            .then(result => { this.onSuccessGetCurrentLocation(result, selectedTicket) })
            .catch((error) => { this.onErrorGetCurrentLocation(error, selectedTicket) });
    }

    onSuccessGetCurrentLocation(result, selectedTicket) {
        debugger;
        let latitude: number;
        let longitude: number;
        let addressArray: any;
        let selectedAddress: string = "";

        latitude = result.coords.latitude;
        longitude = result.coords.longitude;


        // this.ticketService.getAddressDetailLocationCordinate(result)
        //     .then(locationDetail => {


        // selectedAddress = locationDetail.subThoroughfare + "," + locationDetail.thoroughfare + "," + locationDetail.subLocality + "," + locationDetail.locality + "," + locationDetail.administrativeArea + "," + locationDetail.postalCode + "," + locationDetail.countryName;

        this.selectedCheckIn = new CheckIn();
        this.selectedCheckIn.username = this.user.username;
        this.selectedCheckIn.comname = selectedTicket.comname;
        this.selectedCheckIn.Companyname = selectedTicket.Companyname;
        this.selectedCheckIn.currentdate = new Date().toLocaleDateString();
        this.selectedCheckIn.Ticketno = selectedTicket.Ticketno;
        this.selectedCheckIn.date = new Date().toLocaleDateString();
        this.selectedCheckIn.checkin = new Date().toLocaleTimeString();
        this.selectedCheckIn.location = selectedAddress;
        this.selectedCheckIn.latitude = latitude.toString();
        this.selectedCheckIn.longitude = longitude.toString();
        this.selectedCheckIn.zone = selectedTicket.zone;
        this.selectedCheckIn.designation = this.user.designation;


        this.ticketService.checkIn(this.selectedCheckIn)
            .subscribe(result => {

                debugger;
                let responseBody = result.json();

                if (responseBody.Status == 1) {
                    //refresh the list
                    //this.GetListOfTicket();
                    this.ticketService.getTicketByUser(this.authenticateService.currentUser.username)
                        .subscribe(resultTicket => {
                            this.ticketList = resultTicket.json().data;
                        })
                }
                else {
                    this.errorHandling.ShowError(responseBody.Message);


                }

            }, errr => {
                this.errorHandling.ShowError('Kindly try again. Or please check up your GPS settings');

            }, () => {

                this.errorHandling.HideLoading();

            });

        // })
        // .catch((error) => {

        //     this.onErrorGetCurrentLocation(error, selectedTicket);
        // });


    }

    onErrorGetCurrentLocation(error, selectedTicket) {

        if (confirm("Error getting location, Can we retry?")) {
            this.getCurrentLocation(selectedTicket);
        }
        else {
            this.errorHandling.HideLoading();
            this.GetListOfTicket();
        }


    }

    checkOut(selectedTicket: any): void {

        if (selectedTicket.check_id == undefined || selectedTicket.check_id == "") {
            this.errorHandling.ShowError("Ticket is not valid !!! Contact Admin  ,TicketNo:-" + selectedTicket.Ticketno, false);

            return;
        }
        else {

            this.getLocationForCheckOut(selectedTicket);


        }
    }

    getLocationForCheckOut(selectedTicket) {
        let latitude: number;
        let longitude: number;
        let addressArray: any;
        let selectedAddress: string = "";

        this.errorHandling.ShowLoading();

        this.geolocation.getCurrentPosition(this.geoLocationOption)
            .then(result => { this.onSuccessCheckOut(result, selectedTicket) })
            .catch(error => { this.OnErrorCheckout(error, selectedTicket) });
    }

    onSuccessCheckOut(result, selectedTicket) {

        let latitude = result.coords.latitude;
        let longitude = result.coords.longitude;
        let selectedAddress = "";
        //debugger;
        // this.ticketService.getAddressDetailLocationCordinate(result)
        //     .then(locationDetail => {


        // selectedAddress = locationDetail.subThoroughfare + "," + locationDetail.thoroughfare + "," + locationDetail.subLocality + "," + locationDetail.locality + "," + locationDetail.administrativeArea + "," + locationDetail.postalCode + "," + locationDetail.countryName;


        this.selectedCheckOut = new CheckOut();
        this.selectedCheckOut.username = this.user.username;
        this.selectedCheckOut.ticketno = selectedTicket.Ticketno;
        this.selectedCheckOut.date = new Date().toLocaleDateString();
        this.selectedCheckOut.checkout = new Date().toLocaleTimeString();
        this.selectedCheckOut.location = selectedAddress;
        this.selectedCheckOut.latitude = latitude.toString();
        this.selectedCheckOut.longitude = longitude.toString();
        this.selectedCheckOut.enginner_id = selectedTicket.engineer_id;
        this.selectedCheckOut.check_id = selectedTicket.check_id;



        this.ticketService.checkOut(this.selectedCheckOut)
            .subscribe(result => {

                //debugger;
                let responseBody = result.json();

                if (responseBody.Status == 1) {
                    //refresh the list
                    //this.GetListOfTicket();
                    this.ticketService.getTicketByUser(this.authenticateService.currentUser.username)
                        .subscribe(resultTicket => {
                            this.ticketList = resultTicket.json().data;
                        }, eror => {
                            this.errorHandling.ShowError("Error:" + eror, false);

                        }, () => {

                            this.errorHandling.HideLoading();
                        })
                }
                else {
                    this.errorHandling.ShowError(responseBody.Message, false);
                    this.errorHandling.HideLoading();

                }

            }, errr => {
                this.errorHandling.ShowError('Kindly try again. Or please check up your GPS settings', false);


            }, () => {

                this.errorHandling.HideLoading();

            });

    }

    OnErrorCheckout(error, selectedTicket) {
        if (confirm("Error getting location, Can we retry?")) {
            this.getLocationForCheckOut(selectedTicket);
        }
        else {
            this.errorHandling.HideLoading();
            this.GetListOfTicket();
        }
    }

    showSelectedTicketDetailModal(selectedTicket: any) {

        if (selectedTicket.Status == "Open" || selectedTicket.Status == "In_prog" || selectedTicket.Status == "Pending") {
            let ticketModal = this.modalController.create(TicketDetailComponent, { ticket: selectedTicket });

            ticketModal.present();
            ticketModal.onDidDismiss(() => { this.GetListOfTicket(); });
        }
    }


    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    }

    hideLoading() {
        this.loading.dismiss();

    }



}