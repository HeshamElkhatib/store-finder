import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'store-finder';
  // used to set the active tab
  isLocalActive = true;
  //if this wasn't for a predefined product, these values should be read from the route
  productEan = "00000010000038";
  country = "DE";
  language = "de";
}
