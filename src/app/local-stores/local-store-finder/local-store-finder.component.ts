import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';

import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { LocalStoresService } from '../local-stores.service';
import { LocalStore } from '../local-store.model';

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
  //google maps value
  centerLat: number = 51.678418;
  centerLng: number = 7.809007;
  agmZoom: number = 10;
  isStoresListCollapsed = true;
  // the selected store from the list view
  selectedStoreIndx = -1;

  constructor(private localStoresService: LocalStoresService) { }

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

  onSearch(): void{
    this.localStoresService.getByEanAndCity(this.country, this.language, this.productEan, this.searchText, 0, 1000).
    pipe(
      map(result => result.resultGroups),
      map(groups => groups[0]),
      map(group => group.records),
    ).
    subscribe((localStores: Array<LocalStore>) => {
      this.localStores = localStores.sort(this.storesComparer);
      this.centerLng = localStores[0].geoInfo.lng;
      this.centerLat = localStores[0].geoInfo.lat;
      
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
