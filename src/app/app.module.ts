import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LocalStoresModule} from "./local-stores/local-stores.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LocalStoresModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
