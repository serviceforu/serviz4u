import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {HttpModule} from '@angular/http'
import {  ReactiveFormsModule } from '@angular/forms';
import {DatePickerModule } from 'angular-io-datepicker'
import {OverlayModule } from 'angular-io-overlay'

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import {DatePicker} from '@ionic-native/date-picker';

import { MyApp } from './app.component';
import { LoginComponent } from '../app/loginPage/login.component';
import { ListTicketComponent} from '../app/ticketSummaryPage/list/listTicket.component'
import { TicketDetailComponent} from '../app/ticketSummaryPage/detail/ticketDetail.component'
import { DashBoardComponent} from '../app/dashboardPage/dashboard.component'
import {LoggedInUserProfileComponent} from '../app/userProfilePage/userProfile.component'
import {HeaderComponent} from '../app/header/header.component'
import {UserProfileEditComponent} from '../app/userProfilePage/edit/userProfileEdit.component'
import {TicketListAdminComponent} from '../app/admin/manageTicket/listTicket/ticketListAdmin.component'
import {AssignTicketComponent} from '../app/admin/manageTicket/assignTicket/assignTicket.component'
import {ApplyLeaveComponent} from '../app/applyLeave/applyLeave.component'
import {AttendenceComponent} from '../app/attendence/attendence.component'
import {NightCallComponent} from '../app/nightCall/nightCall.component'
import {SeachCompanyModalPopupComponent} from '../app/nightCall/searchCompany.component'
import {SalesComponent} from '../app/sales/sales.component'
import {SalesTimesheetComponent} from '../app/sales/salesTimesheet/salesTimesheet.component'
import {SalesListComponent} from '../app/sales/list/salesList.component'
import { SalesTimeSheetListComponent } from '../app/sales/salesTimesheet/list/salesTimeSheetList.component'
import { SalesTimesheetDetailComponent } from '../app/sales/salesTimesheet/detail/saleTimeDetail.component'
import {AuthenticationService} from '../app/services/authentication.service'
import {ErrorHandlingService} from '../app/services/errorHandling.service'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import {AirtelSalesTimesheetComponent} from '../app/sales/airtel/airtelSalesTimesheet.component'
import {AirtelDSRListComponent} from '../app/sales/airtel/list/airtelDSRList.component'
import {AirtelDSRDetailComponent} from '../app/sales/airtel/detail/airtelDSRDetail.component'

//import { WeekPipe } from '../app/sales/week.pipe';
@NgModule({
  declarations: [
    MyApp,
   LoginComponent,
   ListTicketComponent,
   TicketDetailComponent,
   DashBoardComponent,
   LoggedInUserProfileComponent,
   HeaderComponent,
   UserProfileEditComponent,
   TicketListAdminComponent,
   AssignTicketComponent,
   ApplyLeaveComponent,
   AttendenceComponent,
   NightCallComponent,
   SeachCompanyModalPopupComponent,
   SalesComponent,
   SalesListComponent,
   SalesTimesheetComponent,
   SalesTimeSheetListComponent,
   SalesTimesheetDetailComponent,
   AirtelSalesTimesheetComponent,
   AirtelDSRListComponent,
   AirtelDSRDetailComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ReactiveFormsModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    DatePickerModule,
    OverlayModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginComponent,
    ListTicketComponent,
    DashBoardComponent,
    LoggedInUserProfileComponent,
    HeaderComponent,
    UserProfileEditComponent,
    TicketDetailComponent,
    TicketListAdminComponent,
    AssignTicketComponent,
    ApplyLeaveComponent,
    AttendenceComponent,NightCallComponent,
    SeachCompanyModalPopupComponent,
    SalesComponent,
    SalesListComponent,
    SalesTimesheetComponent,
    SalesTimeSheetListComponent,
    SalesTimesheetDetailComponent,
    AirtelSalesTimesheetComponent,
    AirtelDSRListComponent,
    AirtelDSRDetailComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticationService   ,
    Geolocation ,
    NativeGeocoder,
    LocationAccuracy,
    ErrorHandlingService,
    DatePicker
  ]
})
export class AppModule {}
