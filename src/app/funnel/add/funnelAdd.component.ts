import { Component, Injector } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms';

import { NavController, AlertController, LoadingController, Loading, ModalController } from 'ionic-angular'
import { AuthenticationService } from '../../services/authentication.service'
import { UserService } from '../../services/user.service'
import { ErrorHandlingService } from '../../services/errorHandling.service'
import { FreshCompany } from '../../sales/viewModel/freshCompany';
import { FunnelService } from '../../services/funnel.service'

import { FunnelListComponent } from '../list/funnelList.component';

@Component({
    selector: 'funnelAdd',
    templateUrl: 'funnelAdd.template.html',
    providers: [UserService, FunnelService]
})

export class FunnelAddComponent {

    headerTitle: string = 'Add Funnel';
    loading: Loading;

    sourceList: any[];
    ispList: any[];

    newCompanyList: any[];

    companyList: any[];
    companyListSorted: any[];


    salesReferenceList: any[];
    selectedSalesReference: any;
    productList: any[];
    currentLevelList: any[];
    salesPersonList: any[];

    forms: {
        username: string,
        date: string,
        company_formate: string,
        comid: string,
        comname: string,
        customer: {
            comid: "",
            contactperson: "",
            mno: "",
            companyname: ''

        },
        firstTimeCustomer: {
            username: string;
            entrydate: string;
            companyname: string;
            area: string;
            person: string;
            contact: string;
            address: string;
            referance: string;
        },
        referance: string,
        product: string,
        current_level: string,
        assign_to: string,
        discription: string,
        approx_profit: string,
        contact_name: string,
        contact_number: string,
        vertical: string,
        third_party: string,
        isp: string
    }

    constructor(public formBuilder: FormBuilder,
        public navController: NavController,
        public authService: AuthenticationService,
        private loadingCtrl: LoadingController,
        private userService: UserService,
        private companyseachModal: ModalController,
        private errorHandling: ErrorHandlingService,
        private funnelService: FunnelService

    ) {
        this.getIspList();
        this.getProductList();
        this.getSalesPersonList();
        this.getSalesRefrenceList();
        this.getSalesLevelList();

        this.forms = {
            username: "",
            date: "",
            company_formate: "",
            comid: "",
            comname: "",
            customer: {
                comid: "",
                contactperson: "",
                mno: "",
                companyname: ''
            },
            firstTimeCustomer: {
                username: "",
                entrydate: "",
                companyname: "",
                area: "",
                contact: "",
                person: "",
                address: "",
                referance: ""
            },
            referance: "",
            product: "",
            current_level: "",
            assign_to: "",
            discription: "",
            approx_profit: "",
            contact_name: "",
            contact_number: "",
            vertical: "",
            third_party: "",
            isp: "",
        }

    }

    getIspList() {

        this.funnelService.getIspList(this.authService.currentUser.username)
            .subscribe(result => {

                let responseObj = result.json();

                if (responseObj != null) {
                    if (responseObj.Status == "true") {
                        this.ispList = responseObj.Data;
                    }

                }

            }, error => { this.errorHandling.ShowError(error, false); }, () => { });


    }


    getSourceList() {

        this.funnelService.getSourceList(this.authService.currentUser.username)
            .subscribe(result => {

                let responseObj = result.json();

                if (responseObj != null) {
                    if (responseObj.Status == "true") {
                        this.sourceList = responseObj.Data;
                    }

                }

            }, error => { this.errorHandling.ShowError(error, false); }, () => { });


    }

    getCompanyList() {

        this.funnelService.getNewCompanyList(this.authService.currentUser.username)
            .subscribe(result => {

                let responseObj = result.json();

                if (responseObj != null) {
                    if (responseObj.Status == "true") {
                        this.companyList = responseObj.Data;
                    }

                }

            }, error => { this.errorHandling.ShowError(error, false); }, () => { });


    }

    getProductList() {

        this.funnelService.getProductList(this.authService.currentUser.username)
            .subscribe(result => {

                let responseObj = result.json();

                if (responseObj != null) {
                    if (responseObj.Status == "true") {
                        this.productList = responseObj.Data;
                    }

                }

            }, error => { this.errorHandling.ShowError(error, false); }, () => { });


    }

    getSalesPersonList() {

        this.funnelService.getSalesPersonList(this.authService.currentUser.username)
            .subscribe(result => {

                let responseObj = result.json();

                if (responseObj != null) {
                    if (responseObj.Status == "true") {
                        this.salesPersonList = responseObj.Data;
                    }

                }

            }, error => { this.errorHandling.ShowError(error, false); }, () => { });


    }
    getSalesLevelList() {

        this.funnelService.getSalesLevelList(this.authService.currentUser.username)
            .subscribe(result => {

                let responseObj = result.json();

                if (responseObj != null) {
                    if (responseObj.Status == "true") {
                        this.currentLevelList = responseObj.Data;
                    }

                }

            }, error => { this.errorHandling.ShowError(error, false); }, () => { });


    }

    onCustomerFormateChange(e) {
        debugger;
        this.forms.company_formate = e;
        switch (e) {

            case "new":
                this.forms.customer = {
                    comid: "",
                    contactperson: "",
                    mno: "",
                    companyname: ''
                };
                this.getCompanyList();
                break;
            case "first_time":
                this.forms.firstTimeCustomer = {
                    username: "",
                    entrydate: "",
                    companyname: "",
                    area: "",
                    contact: "",
                    person: "",
                    address: "",
                    referance: ""
                }
                break;

        }


    }

    onChangeCustomer(e) {
        debugger;
        this.forms.comname = e.companyname;
        this.forms.customer = e;
    }

    onChangeSalesRef(salesRef) {
        this.selectedSalesReference = salesRef.source;

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

    getSalesRefrenceList() {
        this.funnelService.getSalesRefrenceList(this.authService.currentUser.username)
            .subscribe(result => {

                let responseObj = result.json();

                if (responseObj != null) {
                    if (responseObj.Status == "true") {
                        this.salesReferenceList = responseObj.Data;
                    }

                }

            }, error => { this.errorHandling.ShowError(error, false); }, () => { });
    }

    addNewCompany() {

        let company = new FreshCompany();
        company.username = this.authService.currentUser.username;
        company.entrydate = new Date().toLocaleString();
        company.companyname = this.forms.firstTimeCustomer.companyname;
        company.area = this.forms.firstTimeCustomer.area;
        company.contactperson = this.forms.firstTimeCustomer.person;
        company.mobilenumber = this.forms.firstTimeCustomer.contact;
        company.address = this.forms.firstTimeCustomer.address;
        company.referance = this.forms.firstTimeCustomer.referance;

        this.errorHandling.ShowLoading();

        this.funnelService.createCompany(company)
            .subscribe(response => {
                this.forms.company_formate = "new";
                this.getCompanyList();
            },
            error => { this.errorHandling.ShowError(error, false); },
            () => { this.errorHandling.HideLoading(); })

    }

    saveFunnelForm() {
        debugger;
        if (this.forms.isp != '' &&
            this.forms.company_formate != '' &&
            this.forms.customer.comid != '' &&
            this.forms.customer.companyname != '' &&
            this.forms.referance != '' &&
            this.forms.product != '' &&
            this.forms.current_level != '' &&
            this.forms.assign_to != '' &&
            this.forms.discription != '' &&
            //this.forms.customer.contactperson != '' &&
            //this.forms.customer.mno != '' &&
            this.forms.vertical != ''
        ) {
            this.errorHandling.ShowLoading();
            this.forms.username = this.authService.currentUser.username;
            this.forms.date = new Date().toDateString();
            this.funnelService.createFunnel(this.forms)
                .subscribe(result => {
                    //debugger;
                    //this.navController.pop();
                    let responseObj = result.json();
                    if (responseObj != null) {
                        if (responseObj.Status == "1") {

                            this.navController.pop();
                        }
                        else {
                            this.errorHandling.ShowError(responseObj.Message, false);
                        }
                    }
                },
                error => { this.errorHandling.ShowError(error, false); },
                () => { this.errorHandling.HideLoading(); });

        }
        else {
            this.errorHandling.ShowError("Please add the required fields", false);

        }

    }
}