import { Component, OnInit, Input } from '@angular/core';
import { LocalStore } from '../local-stores/local-store.model';

@Component({
  selector: 'local-stores-list',
  templateUrl: './local-stores-list.component.html',
  styleUrls: ['./local-stores-list.component.css']
})
export class LocalStoresListComponent implements OnInit {
  @Input()
  localStores: Array<LocalStore>;

  constructor() { }
  
  ngOnInit() {
  }

}
