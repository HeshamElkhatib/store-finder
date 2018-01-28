import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalStoreFinderComponent } from './local-store-finder.component';

describe('LocalStoresComponent', () => {
  let component: LocalStoreFinderComponent;
  let fixture: ComponentFixture<LocalStoreFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalStoreFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalStoreFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
