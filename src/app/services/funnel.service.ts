import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AppSetting } from '../model/appSetting';
import { FreshCompany } from "../sales/viewModel/freshCompany";

@Injectable()

export class FunnelService {

    headerTest: Headers;

    constructor(private http: Http) {
        this.headerTest = new Headers();
        this.headerTest.append('Content-Type', 'application/x-www-form-urlencoded') //******

    }

    getFunnelList(username) {

        return this.http.get(AppSetting.webApiUrl + "/airtel/funnel_list.php?username=" + username, { headers: this.headerTest });
    }

    getSourceList(username) {

        return this.http.get(AppSetting.webApiUrl + "/airtel/source.php?username=" + username, { headers: this.headerTest });
    }
    getIspList(username) {

        return this.http.get(AppSetting.webApiUrl + "/airtel/isp.php?username=" + username, { headers: this.headerTest });
    }
    getNewCompanyList(username) {

        return this.http.get(AppSetting.webApiUrl + "/airtel/airtel_companydetails.php?username=" + username, { headers: this.headerTest });
    }
    createCompany(company: FreshCompany) {
        return this.http.post(AppSetting.webApiUrl + "/airtel/first_time_company.php", {
            "username": company.username,
            "date": company.entrydate,
            "companyname": company.companyname,
            "address": company.address,
            "area": company.area,
            "contactperson": company.contactperson,
            "mno": company.mobilenumber,
            "referance": company.referance

        }, { headers: this.headerTest });
    }
    getProductList(username) {

        return this.http.get(AppSetting.webApiUrl + "/airtel/airtel_product.php?username=" + username, { headers: this.headerTest });
    }
    getSalesRefrenceList(username) {

        return this.http.get(AppSetting.webApiUrl + "/sales/sales_ref.php?username=" + username, { headers: this.headerTest });
    }

    getSalesLevelList(username) {

        return this.http.get(AppSetting.webApiUrl + "/sales/sales_level.php?username=" + username, { headers: this.headerTest });
    }
    getSalesPersonList(username) {

        return this.http.get(AppSetting.webApiUrl + "/sales/sales_person_name.php?username=" + username, { headers: this.headerTest });
    }
    createFunnel(funnel: any) {

        return this.http.post(AppSetting.webApiUrl + "/airtel/funnel_form.php", {
            "username": funnel.username,
            "date": funnel.date,
            "company_formate": funnel.company_formate,
            "comid": funnel.customer.comid,
            "comname": funnel.customer.companyname,
            "referance": funnel.referance,
            "product": funnel.product!='' ?funnel.product.toLocaleString():'',
            "current_level": funnel.current_level,
            "assign_to": funnel.assign_to,
            "discription": funnel.discription,
            "approx_profit": funnel.approx_profit,
            "contact_name": funnel.customer.contactperson,
            "contact_number": funnel.customer.mno,
            "vertical": funnel.vertical,
            "third_party": funnel.third_party,
            "isp": funnel.isp
        }, { headers: this.headerTest });
    }
}