import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { LocalStoreFinderComponent } from './local-store-finder/local-store-finder.component';
import { LocalStoresService } from './local-stores.service';
import { AgmCoreModule } from "@agm/core"
import { environment } from '../../environments/environment';
import { LocalStoresListComponent } from './local-stores-list/local-stores-list.component';
import { LocalStoreDetailComponent } from './local-store-detail/local-store-detail.component';
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googlMapsApiKey
    })
  ],
  declarations: [LocalStoreFinderComponent, LocalStoresListComponent, LocalStoreDetailComponent],
  exports: [LocalStoreFinderComponent],
  providers: [LocalStoresService]
})
export class LocalStoresModule { }
