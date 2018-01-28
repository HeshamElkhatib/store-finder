import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { LocalStoreFinderComponent } from './local-store-finder.component';
import { LocalStoresService } from './local-stores.service';
import { AgmCoreModule } from "@agm/core"
import { environment } from '../../environments/environment';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googlMapsApiKey
    })
  ],
  declarations: [LocalStoreFinderComponent],
  exports: [LocalStoreFinderComponent],
  providers: [LocalStoresService]
})
export class LocalStoresModule { }
