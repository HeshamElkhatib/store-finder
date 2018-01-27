import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStoresComponent } from './local-stores.component';
import { LocalStoresService } from './local-stores.service';
import { AgmCoreModule } from "@agm/core"
@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCq_VH60lCjrr7MORAEfBRUzj1AF2friIw'
    })
  ],
  declarations: [LocalStoresComponent],
  exports: [LocalStoresComponent],
  providers: [LocalStoresService]
})
export class LocalStoresModule { }
