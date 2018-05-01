import { Injectable } from '@angular/core'
import { Http, Headers, Response } from '@angular/http'

import { AppSetting } from '../model/appSetting'

import { NightCall } from '../nightCall/viewModel/nightCall'
import { SalesForm } from '../sales/viewModel/salesForm'
import { SalesTimeSheet } from '../sales/viewModel/salesTimeSheet'
import { FreshCompany } from '../sales/viewModel/freshCompany'
import { SalesTimeSheetEdit } from '../sales/viewModel/salesTimeSheetEdit'
@Injectable()

export class SalesService {
    headerTest: Headers;
    constructor(private http: Http) {
        this.headerTest = new Headers();
        this.headerTest.append('Content-Type', 'application/x-www-form-urlencoded') //******

    }

    getOldCompanyList(username) {

        return this.http.get(AppSetting.webApiUrl + "/sales/companyname.php?username=" + username, { headers: this.headerTest });
    }

    getNewCompanyList(username) {

        return this.http.get(AppSetting.webApiUrl + "/sales/new_company.php?username=" + username, { headers: this.headerTest });
    }

    saveSalesForm(salesForm: SalesForm) {
        return this.http.post(AppSetting.webApiUrl + "/sales/sales_profit_form.php", {
            "username": salesForm.username,
            "date": salesForm.date,
            "week_no": salesForm.weekno,
            "old_new": salesForm.oldnew,
            "companyname": salesForm.companyname,
            "comid": salesForm.comid,
            "amount": salesForm.amount
        }, { headers: this.headerTest });
    }
    getSalesList(username) {

        return this.http.get(AppSetting.webApiUrl + "/sales/profit_summary_detail.php?username=" + username, { headers: this.headerTest });
    }

    getOfficeActitvityList(username) {

        return this.http.get(AppSetting.webApiUrl + "/sales/sales_office.php?username=" + username, { headers: this.headerTest });
    }

    getOtherActitvityList(username) {

        return this.http.get(AppSetting.webApiUrl + "/sales/sales_other.php?username=" + username, { headers: this.headerTest });
    }

    getTravellingTypeList(username) {

        return this.http.get(AppSetting.webApiUrl + "/sales/sales_time.php?username=" + username, { headers: this.headerTest });
    }

    getSalesRefrenceList(username) {

        return this.http.get(AppSetting.webApiUrl + "/sales/sales_ref.php?username=" + username, { headers: this.headerTest });
    }

    createCompany(company: FreshCompany) {
        return this.http.post(AppSetting.webApiUrl + "/sales/add_company.php", {
            "username": company.username,
            "entry_date": company.entrydate,
            "companyname": company.companyname,
            "address": company.address,
            "area": company.area,
            "contactperson": company.contactperson,
            "mno": company.mobilenumber,
            "referance": company.referance

        }, { headers: this.headerTest });
    }

    createSalesTimeSheet(salesTimeSheet: SalesTimeSheet) {

        return this.http.post(AppSetting.webApiUrl + "/sales/enquiry_form.php",
            {
                "username": salesTimeSheet.username,
                "date": salesTimeSheet.date,
                "checkin": salesTimeSheet.checkin,
                "location": salesTimeSheet.location,
                "latitude": salesTimeSheet.latitude,
                "longitude": salesTimeSheet.longitude,
                "company_formate": salesTimeSheet.company_formate,
                "comid": salesTimeSheet.comid,
                "comname": salesTimeSheet.comname,
                //"discription": salesTimeSheet.discription,
                "type": salesTimeSheet.type

            }, { headers: this.headerTest });

    }

    getSalesTimeSheetList(username) {

        return this.http.get(AppSetting.webApiUrl + "/sales/sales_enquiry_list.php?username=" + username, { headers: this.headerTest });
    }

    getSalesProductList(username) {

        return this.http.get(AppSetting.webApiUrl + "/sales/sales_product.php?username=" + username, { headers: this.headerTest });
    }

    getSalesTypeList(username) {

        return this.http.get(AppSetting.webApiUrl + "/sales/sales_level.php?username=" + username, { headers: this.headerTest });
    }

    getSalesPersonList(username) {

        return this.http.get(AppSetting.webApiUrl + "/sales/sales_person_name.php?username=" + username, { headers: this.headerTest });
    }

    editSalesTimeSheet(salesTimeSheet: SalesTimeSheetEdit) {

        return this.http.post(AppSetting.webApiUrl + "/sales/enquiry_out.php",
            {
                "username": salesTimeSheet.username,
                "date": salesTimeSheet.date,
                "out_time": salesTimeSheet.out_time,
                "checkout": salesTimeSheet.checkout,
                "location_out": salesTimeSheet.location_out,
                "latitude_out": salesTimeSheet.latitude_out,
                "longitude_out": salesTimeSheet.longitude_out,
                "eng_id": salesTimeSheet.eng_id,
                "id": salesTimeSheet.id,
                "discription": salesTimeSheet.discription,
                "type": salesTimeSheet.type,
                "lead": salesTimeSheet.lead,
                "product": salesTimeSheet.product,
                "current_level": salesTimeSheet.current_level,
                "assign_to": salesTimeSheet.assign_to,
                "approx_amount": salesTimeSheet.approx_amount,
                "approx_profit": salesTimeSheet.approx_profit,
                "referance": salesTimeSheet.referance

            }, { headers: this.headerTest });

    }

    getNewCompanyListForAirtel(username) {

        return this.http.get(AppSetting.webApiUrl + "/airtel/airtel_companydetails.php?username=" + username, { headers: this.headerTest });
    }

    getISPNameListForAirtel(username) {

        return this.http.get(AppSetting.webApiUrl + "airtel/isp.php?username=" + username, { headers: this.headerTest });
    }
    getSalesRefrenceListForAirtel(username) {

        return this.http.get(AppSetting.webApiUrl + "airtel/sales_ref.php?username=" + username, { headers: this.headerTest });
    }

    createCompanyForAirtel(company: FreshCompany) {
        return this.http.post(AppSetting.webApiUrl + "airtel/first_time_company.php", {
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
    getOfficeActitvityListForAitel(username) {

        return this.http.get(AppSetting.webApiUrl + "airtel/airtel_office.php?username=" + username, { headers: this.headerTest });
    }
    createSalesTimeSheetForAirtel(salesTimeSheet: SalesTimeSheet) {

        return this.http.post(AppSetting.webApiUrl + "airtel/dsr_form.php",
            {
                "username": salesTimeSheet.username,
                "date": salesTimeSheet.date,
                "checkin": salesTimeSheet.checkin,
                "location": salesTimeSheet.location,
                "latitude": salesTimeSheet.latitude,
                "longitude": salesTimeSheet.longitude,
                "company_formate": salesTimeSheet.company_formate,
                "comid": salesTimeSheet.comid,
                "comname": salesTimeSheet.comname,
                "type": salesTimeSheet.type
                //"isp": salesTimeSheet.isp

            }, { headers: this.headerTest });

    }

    getAirtelDSRSalesList(username) {

        return this.http.get(AppSetting.webApiUrl + "airtel/dsr_list.php?username=" + username, { headers: this.headerTest });
    }

    getSourceListForAirtelDSR(username) {

        return this.http.get(AppSetting.webApiUrl + "airtel/source.php?username=" + username, { headers: this.headerTest });
    }
    getRequirementListForAirtelDSR(username) {

        return this.http.get(AppSetting.webApiUrl + "airtel/airtel_product.php?username=" + username, { headers: this.headerTest });
    }
    getSalesTypeListForAirtelDSR(username) {

        return this.http.get(AppSetting.webApiUrl + "airtel/sales_level.php?username=" + username, { headers: this.headerTest });
    }

    editFormForAitelDSR(salesTimeSheet: SalesTimeSheetEdit) {
        
                return this.http.post(AppSetting.webApiUrl + "sales/airtel_out.php",
                    {
                        "username": salesTimeSheet.username,
                        "date": salesTimeSheet.date,
                        "out_time": salesTimeSheet.out_time,
                        "checkout": salesTimeSheet.checkout,
                        "location_out": salesTimeSheet.location_out,
                        "latitude_out": salesTimeSheet.latitude_out,
                        "longitude_out": salesTimeSheet.longitude_out,
                        "eng_id": salesTimeSheet.eng_id,
                        "id": salesTimeSheet.id,
                        "discription": salesTimeSheet.discription,
                        "vertical": salesTimeSheet.vertical,
                        "lead": salesTimeSheet.lead,
                        "product": salesTimeSheet.product,
                        "current_level": salesTimeSheet.current_level,
                        "assign_to": salesTimeSheet.assign_to,
                        "approx_amount": salesTimeSheet.approx_amount,
                        "approx_profit": salesTimeSheet.approx_profit,
                        "source": salesTimeSheet.source
        
                    }, { headers: this.headerTest });
        
            }
}