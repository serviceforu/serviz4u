import { Component, ViewChild } from '@angular/core';

import { Nav, AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';
import { LoginComponent } from '../app/loginPage/login.component';
import { ListTicketComponent } from '../app/ticketSummaryPage/list/listTicket.component';
import { DashBoardComponent } from '../app/dashboardPage/dashboard.component'
import { TicketListAdminComponent } from '../app/admin/manageTicket/listTicket/ticketListAdmin.component'
import { AttendenceComponent } from '../app/attendence/attendence.component'
import { NightCallComponent } from '../app/nightCall/nightCall.component'
import { SalesComponent } from '../app/sales/sales.component'
import { SalesListComponent } from '../app/sales/list/salesList.component'
import { SalesTimesheetComponent } from '../app/sales/salesTimesheet/salesTimesheet.component'
import { SalesTimeSheetListComponent } from '../app/sales/salesTimesheet/list/salesTimeSheetList.component'
import { AirtelSalesTimesheetComponent } from '../app/sales/airtel/airtelSalesTimesheet.component'
import { AirtelDSRListComponent } from '../app/sales/airtel/list/airtelDSRList.component'

import { AuthenticationService } from '../app/services/authentication.service'

import { ApplyLeaveComponent } from '../app/applyLeave/applyLeave.component'
import { User } from './model/user'
import { Menu } from './model/menu'

@Component({
  selector: 'soultionInfiniteApp',
  templateUrl: 'app.template.html'
})

export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginComponent;

  menuList: Array<Menu>;

  user: User;
  constructor(
    public authService: AuthenticationService,
    public alert: AlertController,
    public storage: Storage, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen
  ) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.menuList = [
      { menuTitle: 'Dashboard', menuComponent: DashBoardComponent, menuIcon: 'speedometer' },
      { menuTitle: 'Ticket Summary', menuComponent: ListTicketComponent, menuIcon: 'stats' },
      { menuTitle: 'Log Off', menuComponent: LoginComponent, menuIcon: 'power' }
    ];


    this.user = new User();

    platform.registerBackButtonAction(() => {
      if (this.nav.canGoBack()) { // CHECK IF THE USER IS IN THE ROOT PAGE.
        this.nav.pop(); // IF IT'S NOT THE ROOT, POP A PAGE.
      } else {
        platform.exitApp(); // IF IT'S THE ROOT, EXIT THE APP.
      }
    });

  }

  // ngOnInit() {
  //   this.platform.registerBackButtonAction(this.exit);

  // }


  createMenuAsPerUserRole() {
    //alert('create menu as per user role')
    //debugger;
    if (this.authService.currentUser != undefined) {
      switch (this.authService.currentUser.role) {
        case 'Admin':
          this.menuList = [
            { menuTitle: 'Dashboard', menuComponent: DashBoardComponent, menuIcon: 'speedometer' },
            { menuTitle: 'Manage Tickets', menuComponent: TicketListAdminComponent, menuIcon: 'stats' },
            { menuTitle: 'Apply Leave', menuComponent: ApplyLeaveComponent, menuIcon: 'train' },
            { menuTitle: 'Attendence Report', menuComponent: AttendenceComponent, menuIcon: 'paper' },
            { menuTitle: 'Sales Profit Form', menuComponent: SalesComponent, menuIcon: 'speedometer' },
            { menuTitle: 'Sales Profit List', menuComponent: SalesListComponent, menuIcon: 'speedometer' },
            { menuTitle: 'Sales Timesheet Form', menuComponent: SalesTimesheetComponent, menuIcon: 'speedometer' },
            { menuTitle: 'Sales Timesheet List', menuComponent: SalesTimeSheetListComponent, menuIcon: 'speedometer' },
            { menuTitle: 'DSR Form', menuComponent: AirtelSalesTimesheetComponent, menuIcon: 'speedometer' },
            { menuTitle: 'DSR List', menuComponent: AirtelDSRListComponent, menuIcon: 'speedometer' }
          ];
          break;
        case 'Superuser':
          this.menuList = [
            { menuTitle: 'Dashboard', menuComponent: DashBoardComponent, menuIcon: 'speedometer' },
            { menuTitle: 'Manage Tickets', menuComponent: TicketListAdminComponent, menuIcon: 'stats' },
            { menuTitle: 'Ticket Summary', menuComponent: ListTicketComponent, menuIcon: 'stats' },
            { menuTitle: 'Apply Leave', menuComponent: ApplyLeaveComponent, menuIcon: 'train' },
            { menuTitle: 'Attendence Report', menuComponent: AttendenceComponent, menuIcon: 'paper' },

          ];
          break;
        case 'Teamleader':
          this.menuList = [
            { menuTitle: 'Dashboard', menuComponent: DashBoardComponent, menuIcon: 'speedometer' },
            { menuTitle: 'Manage Tickets', menuComponent: TicketListAdminComponent, menuIcon: 'stats' },
            { menuTitle: 'Ticket Summary', menuComponent: ListTicketComponent, menuIcon: 'stats' },
            { menuTitle: 'Apply Leave', menuComponent: ApplyLeaveComponent, menuIcon: 'train' },
            { menuTitle: 'Attendence Report', menuComponent: AttendenceComponent, menuIcon: 'paper' },

          ];
          break;
        case 'Engineer':
          this.menuList = [
            { menuTitle: 'Ticket Summary', menuComponent: ListTicketComponent, menuIcon: 'stats' },
            { menuTitle: 'Dashboard', menuComponent: DashBoardComponent, menuIcon: 'speedometer' },
            { menuTitle: 'Apply Leave', menuComponent: ApplyLeaveComponent, menuIcon: 'train' },
            { menuTitle: 'Attendence Report', menuComponent: AttendenceComponent, menuIcon: 'paper' },
            { menuTitle: 'Night Call', menuComponent: NightCallComponent, menuIcon: 'moon' },
            //{ menuTitle: 'Log Off', menuComponent: LoginComponent, menuIcon: 'power' }
          ];
          break;
        case 'Client':
          this.menuList = [
            { menuTitle: 'Dashboard', menuComponent: DashBoardComponent, menuIcon: 'speedometer' },
            { menuTitle: 'Ticket Summary', menuComponent: ListTicketComponent, menuIcon: 'speedometer' },
            //{ menuTitle: 'Log Off', menuComponent: LoginComponent, menuIcon: 'speedometer' }
          ];
          break;
        case 'Sales':
          this.menuList = [
            { menuTitle: 'Sales Profit Form', menuComponent: SalesComponent, menuIcon: 'speedometer' },
            { menuTitle: 'Sales Profit List', menuComponent: SalesListComponent, menuIcon: 'speedometer' },
            { menuTitle: 'Sales Timesheet Form', menuComponent: SalesTimesheetComponent, menuIcon: 'speedometer' },
            { menuTitle: 'Sales Timesheet List', menuComponent: SalesTimeSheetListComponent, menuIcon: 'speedometer' },
            { menuTitle: 'Apply Leave', menuComponent: ApplyLeaveComponent, menuIcon: 'train' },
            { menuTitle: 'Attendence Report', menuComponent: AttendenceComponent, menuIcon: 'paper' },
          ];
          break;
        case 'Airtel_Sales':
          this.menuList = [
            { menuTitle: 'DSR Form', menuComponent: AirtelSalesTimesheetComponent, menuIcon: 'speedometer' },
            { menuTitle: 'DSR List', menuComponent: AirtelDSRListComponent, menuIcon: 'speedometer' },
            { menuTitle: 'Apply Leave', menuComponent: ApplyLeaveComponent, menuIcon: 'train' },
            { menuTitle: 'Attendence Report', menuComponent: AttendenceComponent, menuIcon: 'paper' },

          ];
          break;

        default:
          this.menuList = [
            { menuTitle: 'Ticket Summary', menuComponent: ListTicketComponent, menuIcon: 'stats' },
            { menuTitle: 'Dashboard', menuComponent: DashBoardComponent, menuIcon: 'speedometer' },
            { menuTitle: 'Apply Leave', menuComponent: ApplyLeaveComponent, menuIcon: 'train' },
            { menuTitle: 'Attendence Report', menuComponent: AttendenceComponent, menuIcon: 'paper' },
            { menuTitle: 'Night Call', menuComponent: NightCallComponent, menuIcon: 'moon' },
            //{ menuTitle: 'Log Off', menuComponent: LoginComponent, menuIcon: 'power' }
          ];
          break;


      }

      this.user = this.authService.currentUser;
    }

  }

  openPage(menu: Menu) {
    this.nav.push(menu.menuComponent);

  }

  logOff() {

    this.storage.clear();

    this.nav.setRoot(LoginComponent);

  }

  // exit(s: any) {
  //   let alert = this.alert.create({
  //     title: 'Confirm',
  //     message: 'Do you want to exit?',
  //     buttons: [{
  //       text: "exit?",
  //       handler: () => { this.exitApp() }
  //     }, {
  //       text: "Cancel",
  //       role: 'cancel'
  //     }]
  //   })
  //   alert.present();
  // }

  // exitApp() {
  //   this.platform.exitApp();
  // }
}
