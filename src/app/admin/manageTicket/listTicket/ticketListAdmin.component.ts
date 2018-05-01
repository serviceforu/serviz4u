import { Component } from '@angular/core'
import {
    NavController, AlertController, LoadingController, Loading,
    ModalController
} from 'ionic-angular';


import { TicketService } from '../../../services/ticket.service'
import { AuthenticationService } from '../../../services/authentication.service'
import { ErrorHandlingService } from '../../../services/errorHandling.service'
import { ViewController } from 'ionic-angular';
import { NavParams } from 'ionic-angular'

import { AssignTicketComponent } from '../assignTicket/assignTicket.component'

@Component({
    selector: 'listTicketAdmin',
    templateUrl: 'ticketListAdmin.template.html',
    //styleUrls:['ticketListAdmin.style.scss'],
    providers: [TicketService]

})

export class TicketListAdminComponent {

    loading: Loading;
    headerTitle: string = 'Manage Tickets';

    ticketList: any[];
    ticketListFiltered: any[];
    status: string;

    constructor(
        private ticketService: TicketService,
        private authenticateService: AuthenticationService,
        private loadingCtrl: LoadingController,
        public navController: NavController,
        private modalController: ModalController,
        private navParam: NavParams
        , private errorHandling: ErrorHandlingService
    ) {
        this.status = navParam.get("status") != undefined ? navParam.get("status") : "";


        this.getListOfTicket();
    }

    getListOfTicket() {
        this.errorHandling.ShowLoading();
        this.ticketService.getTicketListForAdmin()
            .subscribe(result => {
                //debugger;
                let response = result.json();

                if (response.Status == 'true') {

                    this.ticketList = response.Data;
                    this.ticketListFiltered=this.ticketList;
                }

            }, error => {
                //debugger;
                //this.hideLoading();
                this.errorHandling.ShowError(error,false);
                // this.errorHandling.HideLoading();
            }, () => this.errorHandling.HideLoading())


    }

    showSelectedTicketDetailModal(selectedTicket: any) {

        let ticketModal = this.modalController.create(AssignTicketComponent, { ticket: selectedTicket });

        ticketModal.present();
        ticketModal.onDidDismiss(() => { this.getListOfTicket(); });

    }

    getItems(ev: any) {
        //this.ticketListFiltered = [];
        //debugger;
        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '' && this.ticketList != null && val.length > 3) {

            var test = this.ticketList.filter((item) => {

                if (item.comname != null)
                    return (item.comname.toLowerCase().indexOf(val.toLowerCase()) > -1|| item.person.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
            //debugger;
            this.ticketListFiltered = test;
        }
        else {
            this.ticketListFiltered = this.ticketList;
        }
    }



}