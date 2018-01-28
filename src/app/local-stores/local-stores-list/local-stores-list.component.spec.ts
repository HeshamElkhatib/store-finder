import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalStoresListComponent } from './local-stores-list.component';

describe('LocalStoresListComponent', () => {
  let component: LocalStoresListComponent;
  let fixture: ComponentFixture<LocalStoresListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalStoresListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalStoresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
