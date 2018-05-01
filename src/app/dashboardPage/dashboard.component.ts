import { Component, OnInit } from '@angular/core'
import { User } from '../model/user'
import { AuthenticationService } from '../services/authentication.service'

import { NavController, PopoverController } from 'ionic-angular'
import { LoginComponent } from '../loginPage/login.component'
import { TicketService } from '../services/ticket.service'
import { ErrorHandlingService } from '../services/errorHandling.service'
import { Dashboard } from '../dashboardPage/viewModel/dashboard'
import { TicketListAdminComponent } from '../admin/manageTicket/listTicket/ticketListAdmin.component'
import { ListTicketComponent } from '../ticketSummaryPage/list/listTicket.component'
@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.template.html',
    providers: [TicketService],
    styles: ['dashboard.style.css']

})


export class DashBoardComponent implements OnInit {
    user: User;
    headerTitle: string = 'DashBoard';
    dashbord: Dashboard;


    constructor(public authService: AuthenticationService,
        public navControler: NavController,
        public popOverController: PopoverController,
        public ticketService: TicketService
        , private errorHandling: ErrorHandlingService) {

        this.headerTitle = 'DashBoard';
    }

    ngOnInit() {
        //debugger;
        this.user = this.authService.getUserInfo();
        this.ValidateUser();

        this.dashbord = new Dashboard();
        this.getTicketSummary();
    }



    ValidateUser() {

        if (this.user === null || this.user == undefined) {
            this.navControler.setRoot(LoginComponent);
        }

    }

    getTicketSummary() {
        this.errorHandling.ShowLoading();
        this.ticketService.getTicketSummary(this.user.username)
            .subscribe(result => {

                let responseData = result.json();
                if (responseData.Status == "true") {
                    this.dashbord = new Dashboard();
                    this.dashbord.close = responseData.Data.close;
                    this.dashbord.pending = responseData.Data.pending;
                    this.dashbord.hwProb = responseData.Data.hwProb;
                    this.dashbord.inProg = responseData.Data.inProg;
                    this.dashbord.iCantDoIt = responseData.Data.iCantDoIt;
                    this.dashbord.open = '0';

                }

            }, error => { this.errorHandling.ShowError(error, false); }, () => { this.errorHandling.HideLoading(); })

    }

    GoToManageTicket(status: string) {

        if (this.user.role == 'Admin') {
            this.navControler.push(TicketListAdminComponent, { status: status });
            //this.navControler.push(TicketListAdminComponent)
        }
        else {
            //this.navControler.setRoot(ListTicketComponent,{status:status});
            this.navControler.push(ListTicketComponent, { status: status });
        }

    }

}