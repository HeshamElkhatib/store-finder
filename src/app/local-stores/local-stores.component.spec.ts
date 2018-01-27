import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalStoresComponent } from './local-stores.component';

describe('LocalStoresComponent', () => {
  let component: LocalStoresComponent;
  let fixture: ComponentFixture<LocalStoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalStoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
