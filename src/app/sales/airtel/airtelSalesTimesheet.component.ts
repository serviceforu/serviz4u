import { Component, Injector } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms';

import { NavController, AlertController, LoadingController, Loading, ModalController } from 'ionic-angular'
import { AuthenticationService } from '../../services/authentication.service'
import { UserService } from '../../services/user.service'
import { ErrorHandlingService } from '../../services/errorHandling.service'
import { SalesService } from '../../services/sales.service'
import { SalesForm } from '../../sales/viewModel/salesForm';
import { SalesTimeSheet } from '../../sales/viewModel/salesTimeSheet';
import { FreshCompany } from '../../sales/viewModel/freshCompany';
import { AirtelDSRListComponent } from '../../sales/airtel/list/airtelDSRList.component'
import { TicketService } from '../../services/ticket.service'
import { Geolocation } from '@ionic-native/geolocation';


@Component({
    selector: 'airtelSalesTimesheet',
    templateUrl: 'airtelSalesTimesheet.template.html',
    providers: [SalesService, UserService, TicketService]
})

export class AirtelSalesTimesheetComponent {

    headerTitle: string = 'DSR Form';
    loading: Loading;

    oldCompanyList: any[];
    newCompanyList: any[];

    companyList: any[];
    companyListSorted: any[];

    ispName: string;
    ispList: any[];
    ispSelected: string;

    date: string;
    dateSelected: string;

    companyFormate: string;

    companyName: string;
    profitAmount: string;

    officeActivityList: any[];
    selectedOfficeActivity: any;

    typeOfTravellingList: any[];
    selectedTypeOfTravelling: any;

    otherActivityList: any[];
    selectedOtherActivity: any;

    selectedLeaveType: any;

    salesReferenceList: any[];
    selectedSalesReference: any;

    salesFormRequest: SalesTimeSheet;

    salesForm = this.formBuilder.group({
        'ispName': ['', [Validators.required]],
        'companyFormate': ['', [Validators.required]],
        'comid': ['', [Validators.required]],
        'description': ['', [Validators.required]],
        'selectedOfficeActivity': ['', [Validators.required]],
        'selectedOtherActivity': ['', [Validators.required]],
        'selectedTravelType': ['', [Validators.required]],
        'leaveType': ['', [Validators.required]],
        'selectedSalesRef': ['', [Validators.required]],
        'refrence': ['', [Validators.required]],
        'customerName': ['', [Validators.required]],
        'area': ['', [Validators.required]],
        'person': ['', [Validators.required]],
        'contact': ['', [Validators.required]],
        'address': ['', [Validators.required]],
        'buildingName': ['', [Validators.required]],
    });

    constructor(public formBuilder: FormBuilder,
        public navController: NavController,
        public authService: AuthenticationService,
        private loadingCtrl: LoadingController,
        private userService: UserService,
        private salesService: SalesService,
        private companyseachModal: ModalController
        , private errorHandling: ErrorHandlingService,
        private geolocation: Geolocation,
        private ticketService: TicketService

    ) {
        this.getIspNameList();

    }

    getCompanyList() {

        this.salesService.getNewCompanyListForAirtel(this.authService.currentUser.username).subscribe(result => {

            let responseObj = result.json();

            if (responseObj != null) {
                if (responseObj.Status == "true") {
                    this.companyList = responseObj.Data;
                }

            }

        }, error => { this.errorHandling.ShowError(error, false); }, () => { });


    }

    getIspNameList() {

        this.salesService.getISPNameListForAirtel(this.authService.currentUser.username)
            .subscribe(result => {

                let responseObj = result.json();

                if (responseObj != null) {
                    if (responseObj.Status == "true") {
                        this.ispList = responseObj.Data;
                    }

                }

            }, error => { this.errorHandling.ShowError(error, false); }, () => { });


    }

    onChangeISP(e) {
        //debugger;
        this.ispName = e.isp_name;

    }

    onCustomerFormateChange(e) {
        //debugger;
        this.companyFormate = e;

        switch (this.companyFormate) {
            case "old":
                this.getCompanyList();
                break;
            case "new":
                this.getCompanyList();
                break;
            case "office":
                this.getOfficeActitvityList();
                break;
            case "travelling":
                this.getTravellingTypeList();
                break;
            case "other":
                this.getOtherActitvityList();
                break;
            case "first_time":
                this.getSalesRefrenceList();
                break;
            case "cold calling":
                break;


        }


    }

    onChangeCustomer(e) {
        //debugger;
        this.companyName = e.companyname;

    }
    onChangeActivity(e) {
        //debugger;
        this.selectedOfficeActivity = e.type;

    }
    onChangeOtherActivity(e) {
        //debugger;
        this.selectedOtherActivity = e.type;

    }
    onChangeTravel(e) {
        //debugger;
        this.selectedTypeOfTravelling = e.type;

    }
    onChangeSalesRef(salesRef) {
        this.selectedSalesReference = salesRef.source;

    }
    save(e) {


        let latitude: number;
        let longitude: number;
        let addressArray: any;
        let selectedAddress: string = "";


        this.geolocation.getCurrentPosition().then(result => {

            latitude = result.coords.latitude;
            longitude = result.coords.longitude;

            // debugger;
            this.salesFormRequest = new SalesTimeSheet();
            this.salesFormRequest.username = this.authService.currentUser.username;
            this.salesFormRequest.date = new Date().toDateString();//this.salesForm.controls['date'].value;

            this.salesFormRequest.checkin = new Date().toLocaleTimeString();
            this.salesFormRequest.location = selectedAddress;
            this.salesFormRequest.latitude = latitude.toString();
            this.salesFormRequest.longitude = longitude.toString();

            this.salesFormRequest.isp = this.ispName;
            this.salesFormRequest.company_formate = this.salesForm.controls['companyFormate'].value;

            //this.salesFormRequest.discription = this.salesForm.controls['description'].value;

            if (this.salesFormRequest.company_formate == "new" || this.salesFormRequest.company_formate == "old") {
                this.salesFormRequest.comid = this.salesForm.controls['comid'].value;
                this.salesFormRequest.comname = this.companyName;
                this.salesFormRequest.type = this.companyName;
            }
            //this.salesFormRequest.type="";
            switch (this.salesFormRequest.company_formate) {
                case "office":
                    this.salesFormRequest.type = this.selectedOfficeActivity;
                    break;
                case "other":
                    this.salesFormRequest.type = this.selectedOtherActivity;
                    break;
                case "travelling":
                    this.salesFormRequest.type = this.selectedTypeOfTravelling;
                    break;
                case "leave":
                    this.salesFormRequest.type = this.selectedLeaveType;
                    break;
                case "cold calling":
                    this.salesFormRequest.type = this.salesForm.controls['buildingName'].value;
                    break;
            }

            this.errorHandling.ShowLoading();
            this.salesService.createSalesTimeSheetForAirtel(this.salesFormRequest)
                .subscribe(result => { },
                error => { this.errorHandling.ShowError(error, false); },
                () => {
                    this.errorHandling.HideLoading();
                    this.navController.push(AirtelDSRListComponent);
                })




            // this.ticketService.getAddressDetailByLatAndLong(latitude, longitude)
            //     .subscribe(resultMap => {

            //         //debugger;
            //         addressArray = resultMap.json();

            //         selectedAddress = addressArray.results[0].formatted_address;


            //     }, error => {

            //         this.errorHandling.ShowError('Kindly try again. Or please check up your GPS settings', false);


            //     }, () => {
            //         // debugger;
            //         this.salesFormRequest = new SalesTimeSheet();
            //         this.salesFormRequest.username = this.authService.currentUser.username;
            //         this.salesFormRequest.date = new Date().toDateString();//this.salesForm.controls['date'].value;

            //         this.salesFormRequest.checkin = new Date().toLocaleTimeString();
            //         this.salesFormRequest.location = selectedAddress;
            //         this.salesFormRequest.latitude = latitude.toString();
            //         this.salesFormRequest.longitude = longitude.toString();

            //         this.salesFormRequest.isp = this.ispName;
            //         this.salesFormRequest.company_formate = this.salesForm.controls['companyFormate'].value;

            //         //this.salesFormRequest.discription = this.salesForm.controls['description'].value;

            //         if (this.salesFormRequest.company_formate == "new" || this.salesFormRequest.company_formate == "old") {
            //             this.salesFormRequest.comid = this.salesForm.controls['comid'].value;
            //             this.salesFormRequest.comname = this.companyName;
            //             this.salesFormRequest.type = this.companyName;
            //         }
            //         //this.salesFormRequest.type="";
            //         switch (this.salesFormRequest.company_formate) {
            //             case "office":
            //                 this.salesFormRequest.type = this.selectedOfficeActivity;
            //                 break;
            //             case "other":
            //                 this.salesFormRequest.type = this.selectedOtherActivity;
            //                 break;
            //             case "travelling":
            //                 this.salesFormRequest.type = this.selectedTypeOfTravelling;
            //                 break;
            //             case "leave":
            //                 this.salesFormRequest.type = this.selectedLeaveType;
            //                 break;
            //         }

            //         this.errorHandling.ShowLoading();
            //         this.salesService.createSalesTimeSheetForAirtel(this.salesFormRequest)
            //             .subscribe(result => { },
            //             error => { this.errorHandling.ShowError(error, false); },
            //             () => {
            //                 this.errorHandling.HideLoading();
            //                 this.navController.push(AirtelDSRListComponent);
            //             })


            //     });

        });
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

    getOfficeActitvityList() {
        this.salesService.getOfficeActitvityListForAitel(this.authService.currentUser.username).subscribe(result => {

            let responseObj = result.json();

            if (responseObj != null) {
                if (responseObj.Status == "true") {
                    this.officeActivityList = responseObj.Data;
                }

            }

        }, error => { this.errorHandling.ShowError(error, false); }, () => { });
    }

    getOtherActitvityList() {
        this.salesService.getOtherActitvityList(this.authService.currentUser.username).subscribe(result => {

            let responseObj = result.json();

            if (responseObj != null) {
                if (responseObj.Status == "true") {
                    this.otherActivityList = responseObj.Data;
                }

            }

        }, error => { this.errorHandling.ShowError(error, false); }, () => { });
    }

    getTravellingTypeList() {
        this.salesService.getTravellingTypeList(this.authService.currentUser.username).subscribe(result => {

            let responseObj = result.json();

            if (responseObj != null) {
                if (responseObj.Status == "true") {
                    this.typeOfTravellingList = responseObj.Data;
                }

            }

        }, error => { this.errorHandling.ShowError(error, false); }, () => { });
    }

    getSalesRefrenceList() {
        this.salesService.getSalesRefrenceListForAirtel(this.authService.currentUser.username).subscribe(result => {

            let responseObj = result.json();

            if (responseObj != null) {
                if (responseObj.Status == "true") {
                    this.salesReferenceList = responseObj.Data;
                }

            }

        }, error => { this.errorHandling.ShowError(error, false); }, () => { });
    }

    onLeaveTypeChange(leaveType) {
        this.selectedLeaveType = leaveType;
    }

    addNewCompany() {
        //debugger;
        let company = new FreshCompany();
        company.username = this.authService.currentUser.username;
        company.entrydate = new Date().toLocaleString();
        company.companyname = this.salesForm.controls['customerName'].value;
        company.area = this.salesForm.controls['area'].value;
        company.contactperson = this.salesForm.controls['person'].value;
        company.mobilenumber = this.salesForm.controls['contact'].value;
        company.address = this.salesForm.controls['address'].value;
        company.referance = this.salesForm.controls['selectedSalesRef'].value;
        this.errorHandling.ShowLoading();
        this.salesService.createCompanyForAirtel(company)
            .subscribe(response => {
                //this.salesForm.controls['companyFormate'].setValue("New");
                //this.companyFormate = "New";
                //this.getCompanyList();
                this.companyFormate = "new";
                //this.onCustomerFormateChange("new");
                this.getCompanyList();
            },
            error => { this.errorHandling.ShowError(error, false); },
            () => { this.errorHandling.HideLoading(); })

    }
}