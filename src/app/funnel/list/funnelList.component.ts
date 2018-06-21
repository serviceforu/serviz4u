import { Component, Injector } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms';

import { NavController, AlertController, LoadingController, Loading, ModalController } from 'ionic-angular'
import { AuthenticationService } from '../../services/authentication.service'
import { UserService } from '../../services/user.service'
import { ErrorHandlingService } from '../../services/errorHandling.service'
import { FunnelService } from '../../services/funnel.service';
import { SalesForm } from '../..sales/viewModel/salesForm';
import { FunnelAddComponent } from '../add/funnelAdd.component';
import { Dialogs } from '@ionic-native/dialogs'
@Component({
    selector: 'funnelList',
    templateUrl: 'funnelList.template.html',
    //styles:['funnelList.style.scss'],
    providers: [FunnelService, UserService]
})

export class FunnelListComponent {

    headerTitle: string = 'Funnel List';
    loading: Loading;
    funnelList: any[];

    constructor(public formBuilder: FormBuilder,
        public navController: NavController,
        public authService: AuthenticationService,
        private loadingCtrl: LoadingController,
        private userService: UserService,
        private funnelSerice: FunnelService,
        private companyseachModal: ModalController
        , private errorHandling: ErrorHandlingService,
        private dialogs: Dialogs
    ) {
        this.getFunnelList();
    }

    getFunnelList() {
        this.errorHandling.ShowLoading();

        this.funnelSerice.getFunnelList(this.authService.currentUser.username)
            .subscribe(result => {
                let responseObj = result.json();

                if (responseObj != null) {
                    if (responseObj.Status == "1") {
                        this.funnelList = responseObj.Data;
                    }


                }
            }, error => { this.errorHandling.ShowError(error, false); }, () => { this.errorHandling.HideLoading(); })

    }

    onAdd(event) {
        this.navController.push(FunnelAddComponent)
    }


    showSelectedSalesDetailModal() {
        this.dialogs.alert("Under construction");
    }
}