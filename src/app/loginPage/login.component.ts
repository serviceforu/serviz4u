import { Component, Injector } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms';

import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular'
import { Storage } from '@ionic/storage';


import { DashBoardComponent } from '../dashboardPage/dashboard.component'
import { TicketListAdminComponent } from '../admin/manageTicket/ticketListAdmin.component'
import { ListTicketComponent } from '../ticketSummaryPage/list/listTicket.component';
import { MyApp } from '../app.component';

import { AuthenticationService } from '../services/authentication.service'
import { ErrorHandlingService } from '../services/errorHandling.service'
import { User } from '../model/user'
import { ValidateUser } from '../loginPage/viewModel/validateUser'
// import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.template.html',
})



export class LoginComponent {
  loading: Loading;
  imageLogo: string;
  showPasswordIsChecked: boolean = false;

  constructor(public formBuilder: FormBuilder,
    public navController: NavController,
    public authService: AuthenticationService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private injector: Injector,
    private storage: Storage,
    private errorHandling: ErrorHandlingService
   
  ) {

    //debugger;
    this.imageLogo = '../assets/imgs/SolutionInfiniteLogo.jpg';

    //var loggedinUser=this.storage.get('currentUser');

    if (this.storage.get('currentUser')) {
      this.errorHandling.ShowLoading();
      //set the local user session
      this.storage.get('currentUser').then((user) => {

        //debugger;
        if (user) {
          let loggedinUser = new User();
          loggedinUser.loginid = user.loginid;
          loggedinUser.username = user.username;
          loggedinUser.fullname = user.fullname;
          loggedinUser.role = user.role;
          loggedinUser.designation = user.designation;
          loggedinUser.email = user.email;
          loggedinUser.status = user.status;
          loggedinUser.zone = user.zone;
          loggedinUser.mobile = user.mobile;
          loggedinUser.address = user.address;

          //set the local user session
          this.authService.currentUser = loggedinUser;


          //navigate to dashboard page
          //this.navController.setRoot(DashBoardComponent);
          this.injector.get(MyApp).createMenuAsPerUserRole();
          //appComponent.setLandingPage();

          switch (this.authService.currentUser.role) {
            case 'Admin':
              this.navController.setRoot(DashBoardComponent);
              break;
            case 'Engineer':
              this.navController.setRoot(ListTicketComponent);
              break;
            case 'Client':
              this.navController.setRoot(DashBoardComponent);

              break;
            case 'Sales':
              this.navController.setRoot(DashBoardComponent);
              break;

            default:
              this.navController.setRoot(DashBoardComponent);
              break;
          }

        }
        this.errorHandling.HideLoading();
      });
    }

    // platform.registerBackButtonAction(() => {
    //   this.platform.();
    // });
  }

  //kanheiya_Bhagwat 123456

  loginForm = this.formBuilder.group({
    // 'loginid':['mukeshp',[Validators.required]],
    //'loginid': ['kanheiya_Bhagwat', [Validators.required]],
    //'password': ['test123', [Validators.required]]
    'loginid': ['', [Validators.required]],
    'password': ['', [Validators.required]]
  });

  validateUser(value: any) {
    //debugger;
    if (this.loginForm.valid) {

      this.errorHandling.ShowLoading();

      let user: ValidateUser = new ValidateUser();
      user.loginid = this.loginForm.controls['loginid'].value;
      user.password = this.loginForm.controls['password'].value;


      //get the user details 
      this.authService.validateUser(user)
        .subscribe(result => {
          //debugger;
          let serviceResult = result.json();
          if (serviceResult.status == 'Active') {

            let loggedinUser = new User();
            loggedinUser.loginid = user.loginid;
            loggedinUser.username = serviceResult.username;
            loggedinUser.fullname = serviceResult.fullname;
            loggedinUser.role = serviceResult.role;
            loggedinUser.designation = serviceResult.designation;
            loggedinUser.email = serviceResult.email;
            loggedinUser.status = serviceResult.status;
            loggedinUser.zone = serviceResult.zone;
            loggedinUser.mobile = serviceResult.mobile;
            loggedinUser.address = serviceResult.address;

            //set the local user session
            this.authService.currentUser = loggedinUser;

            // set a key/value
            this.storage.set('currentUser', loggedinUser);

            setTimeout(() => {
              //debugger;
              this.errorHandling.HideLoading();


              //navigate to dashboard page
              //this.navController.setRoot(DashBoardComponent);
              this.injector.get(MyApp).createMenuAsPerUserRole();
              //appComponent.setLandingPage();

              switch (this.authService.currentUser.role) {
                case 'Admin':
                  this.navController.setRoot(DashBoardComponent);
                  break;
                case 'Engineer':
                  this.navController.setRoot(ListTicketComponent);
                  break;
                case 'Client':
                  this.navController.setRoot(DashBoardComponent);

                  break;
                case 'Sales':
                  this.navController.setRoot(DashBoardComponent);
                  break;

                default:
                  this.navController.setRoot(DashBoardComponent);
                  break;
              }

            });
          }
          else {
            this.errorHandling.ShowError('Access Denied', false);

          }
        },
        error => {

          this.errorHandling.ShowError(error, false);
        });



    }
    else {
      this.errorHandling.ShowError('Please fill up the credentials ', false);

    }
  }

  OnShowHidePassword(e: any) {
    //debugger;
    if (this.showPasswordIsChecked)
      this.showPasswordIsChecked = false;
    else
      this.showPasswordIsChecked = true;

  }


}   