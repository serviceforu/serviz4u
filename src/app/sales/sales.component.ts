import { Component, Injector } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms';

import { NavController, AlertController, LoadingController, Loading, ModalController } from 'ionic-angular'
import { AuthenticationService } from '../services/authentication.service'
import { UserService } from '../services/user.service'
import { ErrorHandlingService } from '../services/errorHandling.service'
import { SalesService } from '../services/sales.service'
import { SalesForm } from '../sales/viewModel/salesForm';
import { SalesListComponent } from '../sales/list/salesList.component'
//import { DatePicker } from '@ionic-native/date-picker';

@Component({
    selector: 'sales',
    templateUrl: 'sales.template.html',
    providers: [SalesService, UserService]
})

export class SalesComponent {

    headerTitle: string = 'Sales Profit Form';
    loading: Loading;
    oldCompanyList: any[];
    newCompanyList: any[];
    companyList: any[];
    companyListSorted: any[];

    date: string;
    dateSelected: string;
    companyType: string;

    companyName: string;
    profitAmount: string;

    salesFormRequest: SalesForm;

    salesForm = this.formBuilder.group({
        'date': ['', [Validators.required]],
        //'weekNumber': ['', [Validators.required]],
        'companyType': ['', [Validators.required]],
        'comid': ['', [Validators.required]],
        'profitAmount': ['', [Validators.required]]
    });

    constructor(public formBuilder: FormBuilder,
        public navController: NavController,
        public authService: AuthenticationService,
        private loadingCtrl: LoadingController,
        private userService: UserService,
        private salesService: SalesService,
        private companyseachModal: ModalController
        , private errorHandling: ErrorHandlingService
        // , private datePicker: DatePicker
    ) {
        // this.datePicker.show({
        //     date: new Date(),
        //     mode: 'date',
        //     androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
        // }).then(
        //     date => console.log('Got date: ', date),
        //     err => console.log('Error occurred while getting date: ', err)
        //     );
    }

    getCompanyList() {
        if (this.companyType == "old") {
            this.salesService.getOldCompanyList(this.authService.currentUser.username).subscribe(result => {
                let responseObj = result.json();

                if (responseObj != null) {
                    if (responseObj.Status == "true") {
                        this.companyList = responseObj.Data;
                    }

                }
            }, error => { this.errorHandling.ShowError(error,false); }, () => { });
        }
        else {
            this.salesService.getNewCompanyList(this.authService.currentUser.username).subscribe(result => {

                let responseObj = result.json();

                if (responseObj != null) {
                    if (responseObj.Status == "true") {
                        this.companyList = responseObj.Data;
                    }

                }

            }, error => { this.errorHandling.ShowError(error,false); }, () => { });
        }

    }

    onCustomerTypeChange(e) {
        this.companyType = e;
        this.getCompanyList();
        //debugger;
    }

    onChangeCustomer(e) {
        //debugger;
        this.companyName = e.companyname;

    }

    save(e) {
        //debugger;
        if (this.salesForm.valid) {

            this.salesFormRequest = new SalesForm();
            this.salesFormRequest.username = this.authService.currentUser.username;
            this.salesFormRequest.date = this.salesForm.controls['date'].value;
            this.salesFormRequest.weekno = '';//this.salesForm.controls['weekNumber'].value;
            this.salesFormRequest.oldnew = this.salesForm.controls['companyType'].value;
            this.salesFormRequest.companyname = this.companyName;
            this.salesFormRequest.comid = this.salesForm.controls['comid'].value;
            this.salesFormRequest.amount = this.salesForm.controls['profitAmount'].value;

            this.errorHandling.ShowLoading();
            this.salesService.saveSalesForm(this.salesFormRequest).subscribe(result => {


            }, error => { this.errorHandling.ShowError(error,false); },
                () => {
                    this.errorHandling.HideLoading();
                    this.navController.push(SalesListComponent);
                })


        }
    }


    getItems(ev: any) {

        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '' && this.companyList != null && val.length > 3) {
            this.companyListSorted = this.companyList.filter((item) => {
                //debugger;
                if (item.companyname != null)
                    return (item.companyname.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    }


    // showDateCalender() {
    //     this.datePicker.show({
    //         date: new Date(),
    //         mode: 'date',
    //         androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    //     }).then(
    //         date => console.log('Got date: ', date),
    //         err => console.log('Error occurred while getting date: ', err)
    //         );
    // }

}