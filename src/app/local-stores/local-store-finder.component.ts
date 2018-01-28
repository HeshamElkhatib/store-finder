import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';

import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { LocalStoresService } from './local-stores.service';
import { LocalStore } from './local-store.model';

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
  centerLat: number = 51.678418;
  centerLng: number = 7.809007;
  isStoresListCollapsed = true;

  constructor(private localStoresService: LocalStoresService) { }

  ngOnInit() {
  }
  
  onSearch(): void{
    this.localStoresService.getByEanAndCity(this.country, this.language, this.productEan, this.searchText, 0, 1000).
    pipe(
      map(result => result.resultGroups),
      map(groups => groups[0]),
      map(group => group.records),
    ).
    subscribe((localStores: Array<LocalStore>) => {
      this.localStores = localStores;
      this.centerLng = localStores[0].geoInfo.lng;
      this.centerLat = localStores[0].geoInfo.lat;
      console.log(this.localStores);
    }); 
  }
  

}
