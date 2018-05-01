import { Component, Injector } from '@angular/core'

import { ViewController } from 'ionic-angular';
import { NavParams } from 'ionic-angular'
import { AuthenticationService } from '../../../services/authentication.service'
import { TicketService } from '../../../services/ticket.service'
import { UserService } from '../../../services/user.service'

import { AssignTicket } from '../viewModel/assignTicket'

import { TicketListAdminComponent } from '../listTicket/ticketListAdmin.component'
import { ErrorHandlingService } from '../../../services/errorHandling.service'

@Component({
    templateUrl: 'assignTicket.template.html',
    providers: [TicketService, UserService]
})


export class AssignTicketComponent {

    ticket: any;


    problem: string;
    solution: string;


    userSelected: any;
    statusSelected: string;
    statusList: any;
    userList: any;

    constructor(params: NavParams,
        public viewCtrl: ViewController,
        private ticketService: TicketService,
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private injector: Injector,
        private errorHandling: ErrorHandlingService
    ) {

        this.ticket = params.get("ticket");

        this.statusSelected = this.ticket.Status;
        this.solution = this.ticket.solution;
        this.problem = this.ticket.problem;
        this.userSelected = this.ticket.person;
        this.getStatusList();
        this.getUserList();

    }

    save() {
        if (this.userSelected != '') {
            this.errorHandling.ShowLoading();
            let assignTicket: AssignTicket = new AssignTicket();
            assignTicket.currentUser = this.authenticationService.currentUser.username;
            assignTicket.userSelected = this.userSelected;
            assignTicket.ticketNo = this.ticket.Ticketno;

            this.ticketService.assignTicketToEngineer(assignTicket)
                .subscribe(result => {
                }, error => {
                    this.errorHandling.ShowError(error, false);
                }, () => {
                    //refresh the list            
                    this.viewCtrl.dismiss();
                    this.errorHandling.HideLoading();

                });
        }
        else {

            this.errorHandling.ShowError('Please fill some information', false);

        }

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    getStatusList() {
        this.ticketService.getTicketStatus()
            .subscribe(result => {

                this.statusList = result.json().Data;
            }, error => { this.errorHandling.ShowError(error, false); }, () => { })

    }

    getUserList() {

        this.userService.getUserList()
            .subscribe(result => {

                this.userList = result.json().Data;
            }, error => { this.errorHandling.ShowError(error, false); }, () => { })
    }



}