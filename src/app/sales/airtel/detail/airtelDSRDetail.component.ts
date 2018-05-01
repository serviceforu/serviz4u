import { Component, Injector } from '@angular/core'
import { Geolocation } from '@ionic-native/geolocation';
import { FormBuilder, Validators } from '@angular/forms';

import { ViewController } from 'ionic-angular';
import { NavParams, NavController } from 'ionic-angular'
import { AuthenticationService } from '../../../services/authentication.service'

import { ErrorHandlingService } from '../../../services/errorHandling.service'
import { User } from '../../model/user'
import { TicketService } from '../../../services/ticket.service'


import { SalesService } from '../../../services/sales.service'
import { SalesTimeSheetEdit } from '../../viewModel/salesTimeSheetEdit'
@Component({
    templateUrl: 'airtelDSRDetail.template.html',
    providers: [SalesService, TicketService]
})

export class AirtelDSRDetailComponent {

    sales: any;
    status: string;
    problem: string;
    solution: string;
    statusList: any;

    selectedSource = "";
    salesSourceList: any[];

    selectedVertical = "";

    isLeadGenerate: boolean = false;

    requirementList: any[];
    selectedRequirement: any[];

    saleTypeList: any[];
    selectedSalesType: any;

    salePersonList: any[];
    selectedSalesPerson: any;

    salesForm = this.formBuilder.group({
        'date': ['', [Validators.required]],
        'companyFormate': ['', [Validators.required]],
        'comid': ['', [Validators.required]],

        'selectedOfficeActivity': ['', [Validators.required]],
        'selectedOtherActivity': ['', [Validators.required]],
        'selectedTravelType': ['', [Validators.required]],
        'leaveType': ['', [Validators.required]],
        'selectedSource': ['', [Validators.required]],
        'selectedVertical': ['', [Validators.required]],

        'refrence': ['', [Validators.required]],
        'isLeadGenerate': ['', [Validators.required]],
        'selectedRequirement': ['', [Validators.required]],
        'description': ['', [Validators.required]],
        'selectedSalesType': ['', [Validators.required]],
        'selectedSalesPerson': ['', [Validators.required]],
        'approxAmount': ['', [Validators.required]],
        'approxProfit': ['', [Validators.required]],




        'customerName': ['', [Validators.required]],
        'area': ['', [Validators.required]],
        'person': ['', [Validators.required]],
        'contact': ['', [Validators.required]],
        'address': ['', [Validators.required]],
    });

    salesTimeSheetEdit: SalesTimeSheetEdit;
    constructor(params: NavParams,
        public viewCtrl: ViewController,
        public formBuilder: FormBuilder,
        private authService: AuthenticationService,
        public navController: NavController,
        private errorHandling: ErrorHandlingService,
        private salesService: SalesService,
        private geolocation: Geolocation, private ticketService: TicketService
    ) {

        this.sales = params.get("sales");
        this.selectedSource = this.sales.source;
        this.isLeadGenerate = this.sales.lead != 'yes' ? false : true;

    }

    save() {
        let latitude: number;
        let longitude: number;
        let addressArray: any;
        let selectedAddress: string = "";

        this.errorHandling.ShowLoading();
        this.geolocation.getCurrentPosition().then(result => {

            latitude = result.coords.latitude;
            longitude = result.coords.longitude;


            this.salesTimeSheetEdit = new SalesTimeSheetEdit();
            this.salesTimeSheetEdit.username = this.authService.currentUser.username;
            this.salesTimeSheetEdit.date = this.sales.date;

            this.salesTimeSheetEdit.out_time = new Date().toLocaleTimeString();
            this.salesTimeSheetEdit.checkout = new Date().toLocaleTimeString();

            this.salesTimeSheetEdit.location_out = selectedAddress;
            this.salesTimeSheetEdit.latitude_out = latitude.toString();
            this.salesTimeSheetEdit.longitude_out = longitude.toString();

            this.salesTimeSheetEdit.eng_id = this.sales.eng_id;
            this.salesTimeSheetEdit.id = this.sales.id;

            this.salesTimeSheetEdit.discription = this.salesForm.controls['description'].value;
            this.salesTimeSheetEdit.vertical = this.salesForm.controls['selectedVertical'].value;
            this.salesTimeSheetEdit.lead = this.isLeadGenerate ? 'yes' : 'no';

            this.salesTimeSheetEdit.product = this.selectedRequirement != null ? this.selectedRequirement.toString() : "";
            this.salesTimeSheetEdit.current_level = this.selectedSalesType;
            this.salesTimeSheetEdit.assign_to = this.selectedSalesPerson;
            this.salesTimeSheetEdit.approx_amount = this.salesForm.controls['approxAmount'].value;
            this.salesTimeSheetEdit.approx_profit = this.salesForm.controls['approxProfit'].value;
            this.salesTimeSheetEdit.source = this.selectedSource;

            this.salesService.editFormForAitelDSR(this.salesTimeSheetEdit).subscribe(result => {


            },
                error => { this.errorHandling.ShowError(error, false); },
                () => {
                    this.errorHandling.HideLoading();
                    this.dismiss();
                })




            // this.ticketService.getAddressDetailByLatAndLong(latitude, longitude)
            //     .subscribe(resultMap => {

            //         //debugger;
            //         addressArray = resultMap.json();

            //         selectedAddress = addressArray.results[0].formatted_address;


            //     }, error => {

            //         this.errorHandling.ShowError('Kindly try again. Or please check up your GPS settings',false);


            //     }, () => {
            //         //debugger;
            //         this.salesTimeSheetEdit = new SalesTimeSheetEdit();
            //         this.salesTimeSheetEdit.username = this.authService.currentUser.username;
            //         this.salesTimeSheetEdit.date = this.sales.date;

            //         this.salesTimeSheetEdit.out_time = new Date().toLocaleTimeString();
            //         this.salesTimeSheetEdit.checkout = new Date().toLocaleTimeString();

            //         this.salesTimeSheetEdit.location_out = selectedAddress;
            //         this.salesTimeSheetEdit.latitude_out = latitude.toString();
            //         this.salesTimeSheetEdit.longitude_out = longitude.toString();

            //         this.salesTimeSheetEdit.eng_id = this.sales.eng_id;
            //         this.salesTimeSheetEdit.id = this.sales.id;

            //         this.salesTimeSheetEdit.discription = this.salesForm.controls['description'].value;
            //         this.salesTimeSheetEdit.vertical = this.salesForm.controls['selectedVertical'].value;
            //         this.salesTimeSheetEdit.lead = this.isLeadGenerate ? 'yes' : 'no';

            //         this.salesTimeSheetEdit.product = this.selectedRequirement != null ? this.selectedRequirement.toString() : "";
            //         this.salesTimeSheetEdit.current_level = this.selectedSalesType;
            //         this.salesTimeSheetEdit.assign_to = this.selectedSalesPerson;
            //         this.salesTimeSheetEdit.approx_amount = this.salesForm.controls['approxAmount'].value;
            //         this.salesTimeSheetEdit.approx_profit = this.salesForm.controls['approxProfit'].value;
            //         this.salesTimeSheetEdit.source = this.selectedSource;

            //         this.salesService.editFormForAitelDSR(this.salesTimeSheetEdit).subscribe(result => {


            //         },
            //             error => { this.errorHandling.ShowError(error,false); },
            //             () => {
            //                 this.errorHandling.HideLoading();
            //                 this.dismiss();
            //             })


            //     });

        });


    }

    dismiss() {
        this.viewCtrl.dismiss();
        //this.navController.first();
    }

    getSourceList() {
        this.salesService.getSourceListForAirtelDSR(this.authService.currentUser.username).subscribe(result => {

            let responseObj = result.json();

            if (responseObj != null) {
                if (responseObj.Status == "true") {
                    this.salesSourceList = responseObj.Data;
                }

            }

        }, error => { this.errorHandling.ShowError(error, false); }, () => { });
    }

    onSelectLeadGenerate() {
        this.getSourceList();
        this.getRequirementList();
        this.getSalesTypeList();
        this.getSalesPersonList();
    }

    getRequirementList() {
        this.salesService.getRequirementListForAirtelDSR(this.authService.currentUser.username).subscribe(result => {

            let responseObj = result.json();

            if (responseObj != null) {
                if (responseObj.Status == "true") {
                    this.requirementList = responseObj.Data;
                }

            }

        }, error => { this.errorHandling.ShowError(error, false); }, () => { });
    }

    getSalesTypeList() {
        this.salesService.getSalesTypeListForAirtelDSR(this.authService.currentUser.username).subscribe(result => {

            let responseObj = result.json();

            if (responseObj != null) {
                if (responseObj.Status == "true") {
                    this.saleTypeList = responseObj.Data;
                }

            }

        }, error => { this.errorHandling.ShowError(error, false); }, () => { });
    }

    onSelectOfSalesProduct(salesProduct) {
        this.selectedRequirement = salesProduct.product;
        //this.selectedSalesProductName = salesProduct.name;
    }

    onSelectOfSalesType(salesType) {
        this.selectedSalesType = salesType.level;
    }

    getSalesPersonList() {
        this.salesService.getSalesPersonList(this.authService.currentUser.username).subscribe(result => {

            let responseObj = result.json();

            if (responseObj != null) {
                if (responseObj.Status == "true") {
                    this.salePersonList = responseObj.Data;
                }

            }

        }, error => { this.errorHandling.ShowError(error, false); }, () => { });
    }

    onSelectOfSalesPerson(salesPerson) {
        this.selectedSalesPerson = salesPerson.username;
    }

    onChangeSource(salesRef) {

        this.selectedSource = salesRef.enquiry_source;
    }
}