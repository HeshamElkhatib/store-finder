import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalStoreDetailComponent } from './local-store-detail.component';

describe('LocalStoreDetailComponent', () => {
  let component: LocalStoreDetailComponent;
  let fixture: ComponentFixture<LocalStoreDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalStoreDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalStoreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
