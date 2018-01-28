import { Component, OnInit, Input } from '@angular/core';
import { LocalStore } from '../local-stores/local-store.model';

@Component({
  selector: 'local-store-detail',
  templateUrl: './local-store-detail.component.html',
  styleUrls: ['./local-store-detail.component.css']
})
export class LocalStoreDetailComponent implements OnInit {
  @Input()
  localStore: LocalStore;
  
  constructor() { }

  ngOnInit() {
  }

}
