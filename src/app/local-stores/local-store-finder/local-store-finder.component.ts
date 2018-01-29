import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';

import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { LocalStoresService } from '../local-stores.service';
import { LocalStore } from '../local-store.model';
import { GroupsResponse, ResultGroup } from '../../shared/shared.models';

@Component({
  selector: 'local-store-finder',
  templateUrl: './local-store-finder.component.html',
  styleUrls: ['./local-store-finder.component.css']
})
export class LocalStoreFinderComponent implements OnInit {
  // inputs
  @Input()
  productEan: string;
  @Input()
  country: string;
  @Input()
  language: string;
  //binded to the search control
  searchText: string;
  localStores: Array<LocalStore> = [];
  //since pagination isn't supported, the component would fetch a constant maximum number of stores
  MAX_PRODUCTS: number = 2000;
  //use hardcoded values of germany coordintas, since the country would be always de
  readonly DE_LAT:number = 51.1657;
  readonly DE_LNG:number = 10.4515;
  //google maps values
  centerLat: number ;
  centerLng: number;
  agmZoom: number = 10;
  isStoresListCollapsed = true;
  // the selected store from the list view
  selectedStoreIndx = -1;

  constructor(private localStoresService: LocalStoresService) { 
    this.centerLat = this.DE_LAT;
    this.centerLng = this.DE_LNG;
  }

  ngOnInit() {
  }
  
  storesComparer(a: LocalStore, b: LocalStore){
    if(a.starRating == b.starRating)
      return (a.name < b.name) ? -1 : 1;
    if(a.starRating == null) 
      return 1;
    if(b.starRating == null)
      return -1;
    return (a.starRating > b.starRating) ? -1 : 1;
  }
  
  citySearch(): any{
    return this.localStoresService.getByEanAndCity(this.country, 
      this.language, 
      this.productEan, 
      this.searchText, 
      0,
      // since there is no support for pagination just get 
      this.MAX_PRODUCTS);
  }

  postCodeSearch(): Observable<GroupsResponse<LocalStore>>{
    return this.localStoresService.getByEanAndPostCode(this.country, 
      this.language, 
      this.productEan, 
      this.searchText, 
      0,
      // since there is no support for pagination just get 
      this.MAX_PRODUCTS);
  }

  isPostCodeSearch() : boolean{
    console.log(this.searchText.match(/^[0-9]+/) != null);
    return this.searchText.match(/^[0-9]+/) != null;
  }

  onSearch(): void{
    let searchObservable: Observable<GroupsResponse<LocalStore>> = this.isPostCodeSearch() ? this.postCodeSearch() : this.citySearch() ;
    searchObservable.pipe(
      map(result => result.resultGroups),
      map(groups => groups[0]),
      map(group => group.records),
    ).
    subscribe((localStores: Array<LocalStore>) => {
      this.localStores = localStores.sort(this.storesComparer);
      //assume there is always one group
      if(this.localStores.length > 0){
        this.centerLng = localStores[0].geoInfo.lng;
        this.centerLat = localStores[0].geoInfo.lat;
      }
      
    }); 
  }

  onStoreClick(index: number){
    this.centerLat = this.localStores[index].geoInfo.lat;
    this.centerLng = this.localStores[index].geoInfo.lng;
    this.selectedStoreIndx = index;
  }
  
  toggleStoresList() {
    this.selectedStoreIndx = -1;
    this.isStoresListCollapsed = !this.isStoresListCollapsed
  }

}
