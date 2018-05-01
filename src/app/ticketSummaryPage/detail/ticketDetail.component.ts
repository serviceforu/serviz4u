import { Component,Injector } from '@angular/core'
import { Geolocation } from '@ionic-native/geolocation';


import { ViewController } from 'ionic-angular';
import { NavParams ,NavController} from 'ionic-angular'
import { AuthenticationService } from '../../services/authentication.service'
import { TicketService } from '../../services/ticket.service'

import {ErrorHandlingService} from '../../services/errorHandling.service'
import { User } from '../../model/user'
import { SolutionTicket } from '../viewModel/ticketSolution'

import{ListTicketComponent} from '../list/listTicket.component'

@Component({
    templateUrl: 'ticketDetail.template.html',
    providers: [TicketService]
})

export class TicketDetailComponent {

    ticket: any;
    status: string;
    problem: string;
    solution: string;
    statusList: any;

    constructor(params: NavParams,
        public viewCtrl: ViewController,
        private ticketService: TicketService,
        private authenticationService: AuthenticationService,
        public navController:NavController,
         private errorHandling:ErrorHandlingService
    ) {

        this.ticket = params.get("ticket");
        this.status = this.ticket.Status;
        this.solution = this.ticket.solution;
        this.problem = this.ticket.problem;
        this.getStatusList();
        

    }

    save() {
        if (this.solution != '' && this.status != '' && this.problem != '') {

            let solutionTicket: SolutionTicket = new SolutionTicket();
            solutionTicket.problem = this.problem;
            solutionTicket.solution = this.solution;
            solutionTicket.status = this.status;
            solutionTicket.ticketNo = this.ticket.Ticketno;
            solutionTicket.username = this.authenticationService.currentUser.username;

            this.ticketService.provideSolutionToTicket(solutionTicket)
                .subscribe(result => {
                    //let response=result.json();
                    // if(response.Status==1)
                    // {

                    // }
                    //this.viewCtrl.dismiss();
                }, error => {this.errorHandling.ShowError(error,false); }, () => {

                    this.viewCtrl.dismiss();
                });
        }
        else {

            //alert('Please fill some information');

        }

    }

    dismiss() {
        this.viewCtrl.dismiss();
        //this.navController.first();
    }

    getStatusList() {
        this.ticketService.getTicketStatus()
            .subscribe(result => {

                this.statusList = result.json().Data;
            }, error => {
                this.errorHandling.ShowError(error,false); 
            }, () => { })

    }


}