import { Component, Injector } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms';

import { NavController, AlertController, LoadingController, Loading, ModalController } from 'ionic-angular'
import { AuthenticationService } from '../services/authentication.service'
import { UserService } from '../services/user.service'
// import { TicketService } from '../services/ticket.service'
import { NightService } from '../services/night.service'
import { ErrorHandlingService } from '../services/errorHandling.service'
import { NightCall } from './viewModel/nightCall'

import { SeachCompanyModalPopupComponent } from '../nightCall/searchCompany.component'
@Component({
    selector: 'nightCall',
    templateUrl: 'nightCall.template.html',
    providers: [NightService, UserService]
})

export class NightCallComponent {

    headerTitle: string = 'Night Call';
    loading: Loading;
    nightCall: NightCall;
    selectedCompany: string;
    selectedStatus: string;
    companyList: any;
    nightCallList: any;

    constructor(public formBuilder: FormBuilder,
        public navController: NavController,
        public authService: AuthenticationService,
        //private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        //private injector: Injector,
        private userService: UserService,
        private nightService: NightService,
        private companyseachModal: ModalController
        , private errorHandling: ErrorHandlingService
    ) {

        this.getCompanyList();
        this.getNightCallListByUserName();


    }

    nightCallForm = this.formBuilder.group({
        'comid': ['', [Validators.required]],
        'problem': ['', [Validators.required]],
        'callType': ['', [Validators.required]],
        'approvedBy': ['', [Validators.required]]
    });

    getCompanyList() {

        this.errorHandling.ShowLoading();
        this.userService.getCompanyList('').subscribe(result => {
            var responseData = result.json().Data;
            this.companyList = responseData;

        }, error => {

            this.errorHandling.ShowError(error,false);
        }, () => {

            this.errorHandling.HideLoading();
        });



    }

    getNightCallListByUserName() {
        this.errorHandling.ShowLoading();
        this.nightService.getNightCallListByUserName(this.authService.currentUser.username)
            .subscribe(result => {
                if (result != null) {
                    let nightCallResponse = result.json();
                    if (nightCallResponse.Status == 1) {
                        this.nightCallList = nightCallResponse.Data;

                    }

                }

            }, error => { this.errorHandling.ShowError(error,false); }, () => {

                this.errorHandling.HideLoading();
            })

    }

    saveNigtCall(value: any) {
        //debugger;
        if (this.nightCallForm.valid) {
            this.nightCall = new NightCall();
            this.nightCall.comid = this.nightCallForm.controls['comid'].value;
            this.nightCall.callType = this.nightCallForm.controls['callType'].value;
            this.nightCall.approvedBy = this.nightCallForm.controls['approvedBy'].value;
            this.nightCall.problem = this.nightCallForm.controls['problem'].value;
            this.nightCall.username = this.authService.currentUser.username;


            this.nightService.saveNightCallForUser(this.nightCall)
                .subscribe(
                result => {
                    var nightCallResponse = result.json();
                    if (nightCallResponse.Status == 1) {
                        this.getNightCallListByUserName();
                    }

                },
                error => { this.errorHandling.ShowError(error,false); },

            )

        }


    }


    showSearchCompanyModalPopup() {
        let popup = this.companyseachModal.create(SeachCompanyModalPopupComponent,
            { companySearchList: this.companyList });

        popup.onDidDismiss(data => {
            debugger;
            if (data != null) {
                this.selectedCompany = data[0].companyname;
                this.nightCallForm.setValue({ comid: data[0].comid, problem: '', callType: '', approvedBy: '' }); //
                //console.log(data);
            }
        });

        popup.present();
    }

}