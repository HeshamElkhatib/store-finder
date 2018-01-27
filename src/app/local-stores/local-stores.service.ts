import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LocalStore } from './local-store.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';

export class ResultGroup<T>{
  resultAmountTotal: number;
  resultOffset: number;
  resultAmount: number;
  resultLimit: number;
  records: Array<T>;
}

export class GroupsResponse<T>{
  groupAmount: number;
  resultGroups: Array<ResultGroup<T>>;
}

@Injectable()
export class LocalStoresService {
  
  private readonly baseUrl = 'https://api.commerce-connector.com/REST/2.0/Location';

  constructor(private http: HttpClient) { 
    
  }
  
  // desrialization methods
  private deserializeLocalStore(data: Object): LocalStore{
    let localStore: LocalStore = new LocalStore();
    localStore.id = data['Id'];
    localStore.name = data['Name'];
    localStorage.description = data['Description'];
    return localStore;
  }
  
  private deserializeResultGroup(data: Object): ResultGroup<LocalStore>{
    let resultGroup: ResultGroup<LocalStore> = new ResultGroup<LocalStore>();
    resultGroup.resultAmountTotal = data['ResultAmountTotal'];
    resultGroup.resultAmount = data['ResultAmount'];
    resultGroup.resultOffset = data['ResultOffset'];
    
    let localStores: Array<Object> = data['LocalStores'];
    resultGroup.records = localStores.map(storeData => this.deserializeLocalStore(storeData));
    
    return resultGroup;
  }

  private deserializeGroupsResponse(data: Object) : GroupsResponse<LocalStore>{
    let response = new GroupsResponse<LocalStore>();
    response.groupAmount = data['GroupAmount'];
    let groups: Array<Object> = data['ResultGroups'];
    response.resultGroups = groups.map(groupData => this.deserializeResultGroup(groupData));
    return response;
  }
  
  // request-related methods
  private constructHttpParams(queryParams: Object) : HttpParams{
    let httpParams: HttpParams = new HttpParams();
    Object.keys(queryParams).forEach(
      key => { httpParams = httpParams.set(key, queryParams[key]); }
    )
    return httpParams;
  }

  private get(queryParams: Object) : Observable<GroupsResponse<LocalStore>>{
    let httpParams = this.constructHttpParams(queryParams);
    //set the common parameters and headers here
    httpParams = httpParams.set('token', environment.commerceConnectorApiToken);

    return this.http.get(this.baseUrl, {
      params: httpParams
    }).map(data => this.deserializeGroupsResponse(data));
  }

  public getByEanAndPostCode(country: string,
                         language: string,
                         ean: string, 
                         postCode: string, 
                         index: number, 
                         pageSize: number) : Observable<GroupsResponse<LocalStore>>{
    let queryParams = {
      Country: country,
      Language: language,
      F_Ean: ean,
      'F_Postcode[Value]': postCode,
      'F_Postcode[CompareOperator]': '='
    }
    return this.get(queryParams);
  }

  public getByEanAndCity(country: string,
                         language: string,
                         ean: string, 
                         city: string, 
                         index: number, 
                         pageSize: number) : Observable<GroupsResponse<LocalStore>>{
    let queryParams = {
      Country: country,
      Language: language,
      F_Ean: ean,
      'F_City[Value]': city,
      'F_City[CompareOperator]': '='
    }
    return this.get(queryParams);
  }
  
}
