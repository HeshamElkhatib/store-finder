import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStoresComponent } from './local-stores.component';
import { LocalStoresService } from './local-stores.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LocalStoresComponent],
  providers: [LocalStoresService]
})
export class LocalStoresModule { }
