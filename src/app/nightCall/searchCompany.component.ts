import { Component, Injector } from '@angular/core'


import {
    NavParams, ViewController
   
} from 'ionic-angular'
import { AuthenticationService } from '../services/authentication.service'
import { UserService } from '../services/user.service'


@Component({
    selector: 'searchCompany',
    templateUrl: 'searchCompany.template.html',
    providers: [UserService]
})

export class SeachCompanyModalPopupComponent {

    public companyList: any;
    public selectedCompany: any;
    public companySearchList: any;
   public searchTerm:string='';

    constructor(private params: NavParams, private viewCtrl: ViewController) {
        //debugger;
        if (params.get('companySearchList')) {
            this.companySearchList = params.get('companySearchList');
            this.companyList = [];
        }
    }

    dismiss() {
        //debugger;
        let selectedCompany = this.selectedCompany;
        this.viewCtrl.dismiss(selectedCompany);
    }

    onChange(s: any) {
       // debugger;
        let selectedCompanyId = s;
        if (selectedCompanyId && selectedCompanyId.trim() != '') {
            this.selectedCompany = this.companySearchList.filter((company) => {
                return (company.comid.indexOf(selectedCompanyId) > -1);
            });
        }

        this.dismiss();
    }

    getItems(ev: any) {
        // Reset items back to all of the items
        //this.initializeItems();
        //debugger;
        // set val to the value of the searchbar
        let val =this.searchTerm;// ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '' && val.length>2) {
            this.companyList = [];
            this.companySearchList.filter((company) => {
                if (company.companyname != null) {
                    if (company.companyname.indexOf(val) > -1) {
                        //debugger;
                        var x = company;
                        this.companyList.push(x);
                    }
                }
                // return (company.companyname.indexOf(val) > -1);
            });
        }
    }
}