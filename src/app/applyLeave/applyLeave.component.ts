import { Component, Injector } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms';

import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular'
import { AuthenticationService } from '../services/authentication.service'
import { ErrorHandlingService } from '../services/errorHandling.service'
import { LeaveService } from '../services/leave.service'

import { LeaveApplication } from '../applyLeave/viewModel/applyLeave'

import { DatePicker } from '@ionic-native/date-picker';

@Component({
    selector:'applyLeave',
    templateUrl: 'applyLeave.template.html',
    //styleUrls:['applyLeave.style.scss'],
    providers: [LeaveService]
})

export class ApplyLeaveComponent {
    headerTitle: string = 'Apply Leave';
    loading: Loading;
    leaveApplcation: LeaveApplication;
    leaveList: any;

    constructor(public formBuilder: FormBuilder,
        public navController: NavController,
        public authService: AuthenticationService,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private injector: Injector,
        private leaveService: LeaveService
        , private errorHandling: ErrorHandlingService,
        public datePicker: DatePicker
    ) {

        this.getNightCallListByUserName();

    }

    applyLeaveForm = this.formBuilder.group({

        'leaveFrom': ['', [Validators.required]],
        'leaveTo': ['', [Validators.required]],
        'leaveDays': ['', [Validators.required]],
        'leaveReason': ['', [Validators.required]]
    });

    save(value: any) {
        // debugger;
        if (this.applyLeaveForm.valid) {

            //this.errorHandling.ShowLoading();

            this.leaveApplcation = new LeaveApplication();
            this.leaveApplcation.username = this.authService.currentUser.username;
            this.leaveApplcation.leaveFrom = this.applyLeaveForm.controls['leaveFrom'].value;
            debugger;
            this.leaveApplcation.leaveTo = this.applyLeaveForm.controls['leaveTo'].value;
            this.leaveApplcation.leaveReason = this.applyLeaveForm.controls['leaveReason'].value;
            this.leaveApplcation.leaveDays = this.applyLeaveForm.controls['leaveDays'].value;


            this.leaveService.applyLeave(this.leaveApplcation)
                .subscribe(result => {
                    debugger;
                    let responseData = result.json();
                    if (responseData.Status == '1') {

                        this.errorHandling.ShowError('Leave applied successfully!!!');

                        this.getNightCallListByUserName();
                    }
                    else {

                        this.errorHandling.ShowError('Unable to add leaves!!!',false);
                    }


                },
                error => {
                    // this.errorHandling.ShowError(error); 
                }, () => {

                    //this.errorHandling.HideLoading();


                })

        }

    }

    getNightCallListByUserName() {
        //this.errorHandling.ShowLoading();

        this.leaveService.getLeaveListByUserName(this.authService.currentUser.username)
            .subscribe(result => {
                //debugger;
                if (result != null) {
                    let leaveCallResponse = result.json();
                    if (leaveCallResponse.Status == 1) {
                        if (leaveCallResponse.Data.length > 0)
                            this.leaveList = leaveCallResponse.Data;

                    }

                }

            }, error => {
                //this.errorHandling.ShowError(error); 
            }, () => {

                //this.errorHandling.HideLoading()
            })

    }


    showDatePicker() {
        debugger;
        this.datePicker.show({
            date: new Date(),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
        }).then(
            date => alert(date),
            err => console.log('Error occurred while getting date: ', err)
            );

    }

}