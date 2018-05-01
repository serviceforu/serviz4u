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
    templateUrl: 'salesTimeSheetDetail.template.html',
    providers: [SalesService, TicketService]
})

export class SalesTimesheetDetailComponent {

    sales: any;
    status: string;
    problem: string;
    solution: string;
    statusList: any;

    selectedSalesRef = "";
    salesReferenceList: any[];

    isLeadGenerate: boolean = false;

    salesProductList: any[];
    selectedSalesProduct: any[];

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
        'selectedSalesRef': ['', [Validators.required]],

        'refrence': ['', [Validators.required]],
        'isLeadGenerate': ['', [Validators.required]],
        'selectedSalesProduct': ['', [Validators.required]],
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
        this.selectedSalesRef = this.sales.reference;
        this.isLeadGenerate = this.sales.lead != 'yes' ? false : true;
        this.getSalesRefrenceList();
    }

    save() {
        let latitude: number;
        let longitude: number;
        let addressArray: any;
        let selectedAddress: string="";

        this.errorHandling.ShowLoading();
        this.geolocation.getCurrentPosition().then(result => {

            latitude = result.coords.latitude;
            longitude = result.coords.longitude;

            debugger;
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

            this.salesTimeSheetEdit.type = this.sales.type;

            this.salesTimeSheetEdit.lead = this.isLeadGenerate ? 'yes' : 'no';

            this.salesTimeSheetEdit.product = this.selectedSalesProduct!=null?this.selectedSalesProduct.toString():"";
            this.salesTimeSheetEdit.current_level = this.selectedSalesType;
            this.salesTimeSheetEdit.assign_to = this.selectedSalesPerson;
            this.salesTimeSheetEdit.approx_amount = this.salesForm.controls['approxAmount'].value;
            this.salesTimeSheetEdit.approx_profit = this.salesForm.controls['approxProfit'].value;
            this.salesTimeSheetEdit.referance = this.selectedSalesRef;

            this.salesService.editSalesTimeSheet(this.salesTimeSheetEdit).subscribe(result => {


            },
                error => { this.errorHandling.ShowError(error,false); },
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
            //         debugger;
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

            //         this.salesTimeSheetEdit.type = this.sales.type;

            //         this.salesTimeSheetEdit.lead = this.isLeadGenerate ? 'yes' : 'no';

            //         this.salesTimeSheetEdit.product = this.selectedSalesProduct!=null?this.selectedSalesProduct.toString():"";
            //         this.salesTimeSheetEdit.current_level = this.selectedSalesType;
            //         this.salesTimeSheetEdit.assign_to = this.selectedSalesPerson;
            //         this.salesTimeSheetEdit.approx_amount = this.salesForm.controls['approxAmount'].value;
            //         this.salesTimeSheetEdit.approx_profit = this.salesForm.controls['approxProfit'].value;
            //         this.salesTimeSheetEdit.referance = this.selectedSalesRef;

            //         this.salesService.editSalesTimeSheet(this.salesTimeSheetEdit).subscribe(result => {


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

    getSalesRefrenceList() {
        this.salesService.getSalesRefrenceList(this.authService.currentUser.username).subscribe(result => {

            let responseObj = result.json();

            if (responseObj != null) {
                if (responseObj.Status == "true") {
                    this.salesReferenceList = responseObj.Data;
                }

            }

        }, error => { this.errorHandling.ShowError(error,false); }, () => { });
    }

    onSelectLeadGenerate() {

        this.getSalesProductList();
        this.getSalesTypeList();
        this.getSalesPersonList();
    }

    getSalesProductList() {
        this.salesService.getSalesProductList(this.authService.currentUser.username).subscribe(result => {

            let responseObj = result.json();

            if (responseObj != null) {
                if (responseObj.Status == "true") {
                    this.salesProductList = responseObj.Data;
                }

            }

        }, error => { this.errorHandling.ShowError(error,false); }, () => { });
    }

    getSalesTypeList() {
        this.salesService.getSalesTypeList(this.authService.currentUser.username).subscribe(result => {

            let responseObj = result.json();

            if (responseObj != null) {
                if (responseObj.Status == "true") {
                    this.saleTypeList = responseObj.Data;
                }

            }

        }, error => { this.errorHandling.ShowError(error,false); }, () => { });
    }

    onSelectOfSalesProduct(salesProduct) {
        this.selectedSalesProduct = salesProduct.product;
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

        }, error => { this.errorHandling.ShowError(error,false); }, () => { });
    }

    onSelectOfSalesPerson(salesPerson) {
        this.selectedSalesPerson = salesPerson.username;
    }

    onChangeSalesRef(salesRef) {

        this.selectedSalesRef = salesRef.source;
    }
}