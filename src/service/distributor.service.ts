import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AppConfig } from './app.config';
import { ResponseService } from './response.service';
import { Utils } from './utils';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DistributorService {
  constructor(private http: Http, private appConfig: AppConfig, private responseService: ResponseService,  private utils: Utils) { }

  //distributorSearchUrl = this.appConfig.baseUrl + '/fortune_distributor_req/search_distributor_for_sale_data';
  confirmSaleUrl = this.appConfig.baseUrl + '/fortune_distributor_req/sale_confirmation';
  distributorSearchUrl = this.appConfig.baseUrl + '/fortune_distributor_req/subdealer_performance';

  defaultHeaders = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

  getDealerSaleList(token: any): Promise<any> {
    let body = {
      APIkey: this.appConfig.APIKey,
      token: token,
      //pageNumber: pageNumber,
      dealer_hierarchy_ids: this.appConfig.dealerHierID,
    };

    /*if(filterData.distributorCompName !== undefined && filterData.distributorCompName !=0){
      body['distributorCompName']= filterData.distributorCompName;
    }
    if(filterData.state_id !== undefined && filterData.state_id !=0){
      body['state_id']= filterData.state_id;
    }
    if(filterData.dist_id !== undefined && filterData.dist_id !=0){
      body['dist_id']= filterData.dist_id;
    }*/
    console.log(body);
    let options = new RequestOptions({ headers: this.defaultHeaders });

    return this.http.post(this.distributorSearchUrl, this.utils.transformRequest(body), options).toPromise().then(this.responseService.extractData).catch(this.responseService.handleAuthError);
  }


  SaleConfirm(token: any,sale_id: any,res_mode: any): Promise<any> {
    let body = {
      APIkey: this.appConfig.APIKey,
      token: token,
      row_checked: sale_id,
      res_mode: res_mode,
      rootId: this.appConfig.dealerHierID
    };


    let options = new RequestOptions({ headers: this.defaultHeaders });

    return this.http.post(this.confirmSaleUrl, this.utils.transformRequest(body), options).toPromise().then(this.responseService.extractData).catch(this.responseService.handleAuthError);
  }
}
