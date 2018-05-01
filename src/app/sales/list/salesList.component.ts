import { Component, Injector } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms';

import { NavController, AlertController, LoadingController, Loading, ModalController } from 'ionic-angular'
import { AuthenticationService } from '../../services/authentication.service'
import { UserService } from '../../services/user.service'
import { ErrorHandlingService } from '../../services/errorHandling.service'
import { SalesService } from '../../services/sales.service'
import { SalesForm } from '../..sales/viewModel/salesForm'
@Component({
    selector: 'salesList',
    templateUrl: 'salesList.template.html',
    providers: [SalesService, UserService]
})

export class SalesListComponent {

    headerTitle: string = 'Sales List';
    loading: Loading;
    salesList: any[];

    constructor(public formBuilder: FormBuilder,
        public navController: NavController,
        public authService: AuthenticationService,
        private loadingCtrl: LoadingController,
        private userService: UserService,
        private salesService: SalesService,
        private companyseachModal: ModalController
        , private errorHandling: ErrorHandlingService
    ) {
        this.getSalesList();
    }

    getSalesList() {
        this.errorHandling.ShowLoading();
        this.salesService.getSalesList(this.authService.currentUser.username).subscribe(result => {
            let responseObj = result.json();

            if (responseObj != null) {
                if (responseObj.Status == "1") {
                    this.salesList = responseObj.Data;
                }


            }
        }, error => { this.errorHandling.ShowError(error,false); }, () => { this.errorHandling.HideLoading(); })

    }
}