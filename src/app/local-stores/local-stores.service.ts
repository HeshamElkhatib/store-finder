import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { LocalStore, GeoInfo } from './local-store.model';
import { GroupsResponse, ResultGroup } from '../shared/shared.models';

//the names of the local store fields as exposed by the backend
export class LocalStoreFields{
  public static readonly Id = 'Id';
  public static readonly Name = 'Name';
  public static readonly Description = 'Description';
  public static readonly GeoInfo = 'GeoInfo';
}

@Injectable()
export class LocalStoresService {
  
  private readonly baseUrl = 'https://api.commerce-connector.com/REST/2.0/LocalStore';
  private readonly resultFields = [
    LocalStoreFields.Id,
    LocalStoreFields.Name,
    LocalStoreFields.Description,
    LocalStoreFields.GeoInfo
  ]

  constructor(private http: HttpClient) { 
    
  }

  // desrialization methods
  private deserializeGeoInfo(data: Object): GeoInfo{
    console.log(data);
    let geoInfo = new GeoInfo();
    geoInfo.distance = Number(data['Distance']);
    geoInfo.lat = Number(data['Lat']);
    geoInfo.lng = Number(data['Lng']);
    return geoInfo;
  }
  
  private deserializeLocalStore(data: Object): LocalStore{
    console.log("deserializeLocalStore: ");
    console.log(data);
    let localStore: LocalStore = new LocalStore();
    localStore.id = data[LocalStoreFields.Id];
    localStore.name = data[LocalStoreFields.Name];
    localStore.description = data[LocalStoreFields.Description];
    localStore.geoInfo = this.deserializeGeoInfo(data[LocalStoreFields.GeoInfo][0]);
    return localStore;
  }
  
  private deserializeResultGroup(data: Object): ResultGroup<LocalStore>{
    console.log("deserializeResultGroup: ");
    console.log(data);
    let resultGroup: ResultGroup<LocalStore> = new ResultGroup<LocalStore>();
    resultGroup.resultAmountTotal = data['ResultGroupHeader']['ResultAmountTotal'];
    resultGroup.resultAmount = data['ResultGroupHeader']['ResultAmount'];
    resultGroup.resultOffset = data['ResultGroupHeader']['ResultOffset'];
    
    let localStores: Array<Object> = data['LocalStores'];
    resultGroup.records = localStores.map(storeData => this.deserializeLocalStore(storeData));
    
    return resultGroup;
  }

  private deserializeGroupsResponse(data: Object) : GroupsResponse<LocalStore>{
    console.log("deserializeGroupsResponse: ");
    console.log(data);
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
    }).pipe(
      map(data => data['getResult'][0]),
      map(data => this.deserializeGroupsResponse(data)));
    
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
      'F_Postcode[CompareOperator]': '=',
      'O_ResultAmount[Offset]': index,
      'O_ResultAmount[Limit]': pageSize,
      'O_ResultFields': this.resultFields
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
      'F_City[CompareOperator]': '=',
      'O_ResultAmount[Offset]': index,
      'O_ResultAmount[Limit]': pageSize,
      'O_ResultFields': this.resultFields
    }
    return this.get(queryParams);
  }
  
}
