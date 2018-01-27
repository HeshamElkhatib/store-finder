import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { LocalStoresComponent } from './local-stores.component';
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
  declarations: [LocalStoresComponent],
  exports: [LocalStoresComponent],
  providers: [LocalStoresService]
})
export class LocalStoresModule { }
