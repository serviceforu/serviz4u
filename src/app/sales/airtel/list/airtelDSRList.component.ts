import { Component, Injector } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms';

import { NavController, AlertController, LoadingController, Loading, ModalController } from 'ionic-angular'
import { AuthenticationService } from '../../../services/authentication.service'
import { UserService } from '../../../services/user.service'
import { ErrorHandlingService } from '../../../services/errorHandling.service'
import { SalesService } from '../../../services/sales.service'
import { SalesForm } from '../../..sales/viewModel/salesForm'
import { AirtelDSRDetailComponent } from '../../../sales/airtel/detail/airtelDSRDetail.component';
@Component({
    selector: 'airtelDSRList',
    templateUrl: 'airtelDSRList.template.html',
    providers: [SalesService, UserService]
})

export class AirtelDSRListComponent {

    headerTitle: string = 'Airtel DSR List';
    loading: Loading;
    salesTimeSheetList: any[];

    constructor(public formBuilder: FormBuilder,
        public navController: NavController,
        public authService: AuthenticationService,
        private loadingCtrl: LoadingController,
        private userService: UserService,
        private salesService: SalesService,
        private salesModal: ModalController
        , private errorHandling: ErrorHandlingService
    ) {
        this.getSalesTimeSheetList();
    }

    getSalesTimeSheetList() {
        this.errorHandling.ShowLoading();
        this.salesService.getAirtelDSRSalesList(this.authService.currentUser.username).subscribe(result => {
            let responseObj = result.json();

            if (responseObj != null) {
                if (responseObj.Status == "1") {
                    this.salesTimeSheetList = responseObj.Data;
                }


            }
        }, error => { this.errorHandling.ShowError(error,false); }, () => { this.errorHandling.HideLoading(); })

    }


    showSelectedSalesDetailModal(selectedSales: any) {

        // if (selectedSales.Status == "Open" || selectedSales.Status == "In_prog" || selectedSales.Status == "Pending") 
        // {
        let salesModal = this.salesModal.create(AirtelDSRDetailComponent, { sales: selectedSales });

        salesModal.present();
        salesModal.onDidDismiss(() => { this.getSalesTimeSheetList(); });
        //}
    }
}