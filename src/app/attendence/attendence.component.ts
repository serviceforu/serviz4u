import { Component, Injector } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms';

import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular'
import { AuthenticationService } from '../services/authentication.service'
import { UserService } from '../services/user.service'
import {ErrorHandlingService} from '../services/errorHandling.service'
import { Attendence } from './viewModel/attendence'

@Component({
    selector: 'attendence',
    templateUrl: 'attendence.template.html',
    providers: [UserService]
})

export class AttendenceComponent {

    headerTitle: string = 'Attendence';
    loading: Loading;
    attendence: Attendence;
    attendenceResponse: any;

    constructor(public formBuilder: FormBuilder,
        public navController: NavController,
        public authService: AuthenticationService,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private injector: Injector,
        private userService: UserService
        ,private errorHandling:ErrorHandlingService) {

        


    }

    attendenceForm = this.formBuilder.group({
        'from': ['', [Validators.required]],
        'to': ['', [Validators.required]],

    });


    search(value: any) {
        //debugger;
        if (this.attendenceForm.valid) {

            this.errorHandling.ShowLoading();

            this.attendence=new Attendence();
            this.attendence.from = this.attendenceForm.controls['from'].value;
            this.attendence.to = this.attendenceForm.controls['to'].value;
            this.attendence.username = this.authService.currentUser.username;

            this.userService.getAttendenceForUser(this.attendence)
                .subscribe(
                result => {
                    debugger;
                    //collect the response
                    let attendenceResponseObject = result.json();
                    if (attendenceResponseObject.Status == 1) 
                    {
                        this.attendenceResponse = {};
                        this.attendenceResponse.presentDays = attendenceResponseObject.Data.presentDays;
                        this.attendenceResponse.leaveDays = attendenceResponseObject.Data.leaveDays;
                        this.attendenceResponse.halfDays = attendenceResponseObject.Data.halfDays;
                        this.attendenceResponse.lateMark = attendenceResponseObject.Data.lateMark;
                        this.attendenceResponse.nightDays = attendenceResponseObject.Data.nightDays;

                    }

                },
                eror => { }, () => {
                    this.errorHandling.HideLoading();

                }

                )

        }


    }


 

}