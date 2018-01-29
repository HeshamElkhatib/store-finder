import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { LocalStore, GeoInfo, OpeningHour } from './local-store.model';
import { GroupsResponse, ResultGroup } from '../shared/shared.models';

//the names of the local store fields as exposed by the backend
export class LocalStoreFields{
  public static readonly Id = 'Id';
  public static readonly Name = 'Name';
  public static readonly GeoInfo = 'GeoInfo';
  public static readonly OpeningHours = 'OpeningHours';
  public static readonly Rating = 'CustomPartnerweb';
  public static readonly CustomFields = 'CustomFields';
}

@Injectable()
export class LocalStoresService {
  
  private readonly baseUrl = 'https://api.commerce-connector.com/REST/2.0/LocalStore';
  //controls the returned values from the API
  private readonly resultFields = [
    LocalStoreFields.Id,
    LocalStoreFields.Name,
    LocalStoreFields.GeoInfo,
    LocalStoreFields.Rating,
    LocalStoreFields.OpeningHours
  ]

  constructor(private http: HttpClient) { 
    
  }

  // desrialization methods
  private deserializeOpeningHour(data: Object): OpeningHour{
    let openingHour: OpeningHour = new OpeningHour();
    openingHour.date = data['Date'];
    openingHour.weekday = data['Weekday'];
    openingHour.openTime = data['Opentime'];
    openingHour.closeTime = data['Closetime'];
    openingHour.extraTime = data['Extratime'];
    openingHour.openTimeType = data['OpenTimeType'];
    openingHour.closeTimeType = data['CloseTimeType'];
    return openingHour
  }
  
  private deserializeGeoInfo(data: Object): GeoInfo{
    let geoInfo = new GeoInfo();
    geoInfo.distance = Number(data['Distance']);
    geoInfo.lat = Number(data['Lat']);
    geoInfo.lng = Number(data['Lng']);
    return geoInfo;
  }
  
  private parseRating(rawRating: string): number{
    let matchRes = rawRating.match(/^[0-9]+/);
    if(matchRes == null)
      return null;
    return Number(matchRes[0]);
  }
  private deserializeLocalStore(data: Object): LocalStore{
    let localStore: LocalStore = new LocalStore();
    localStore.id = data[LocalStoreFields.Id];
    localStore.name = data[LocalStoreFields.Name];
    localStore.geoInfo = this.deserializeGeoInfo(data[LocalStoreFields.GeoInfo][0]);
    //parse opening hours
    let openingHoursData: Array<Object> = data[LocalStoreFields.OpeningHours];
    localStore.openingHours = openingHoursData.map(openingHour => this.deserializeOpeningHour(openingHour));
    //parse rating
    let customFields: Array<Object> = data[LocalStoreFields.CustomFields];
    let ratingData = customFields.filter((field: Object) => field["Key"] == LocalStoreFields.Rating);
    if(ratingData.length > 0){
      let rawRating: string = ratingData[0]["Values"][0]["Value"];
      localStore.starRating = this.parseRating(rawRating);
    }
    return localStore;
  }
  
  private deserializeResultGroup(data: Object): ResultGroup<LocalStore>{
    let resultGroup: ResultGroup<LocalStore> = new ResultGroup<LocalStore>();
    resultGroup.resultAmountTotal = data['ResultGroupHeader']['ResultAmountTotal'];
    resultGroup.resultAmount = data['ResultGroupHeader']['ResultAmount'];
    resultGroup.resultOffset = data['ResultGroupHeader']['ResultOffset'];
    
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
