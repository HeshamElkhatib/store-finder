import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { LocalStore } from '../local-store.model';


@Component({
  selector: 'local-stores-list',
  templateUrl: './local-stores-list.component.html',
  styleUrls: ['./local-stores-list.component.css']
})
export class LocalStoresListComponent implements OnInit {
  @Input()
  localStores: Array<LocalStore>;

  @Output()
  storeClick: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }
  
  ngOnInit() {
  }
  
  onStoreClick(index: number){
    this.storeClick.emit(index);
  }
}
