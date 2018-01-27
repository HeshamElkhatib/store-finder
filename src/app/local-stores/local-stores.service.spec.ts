import { TestBed, inject } from '@angular/core/testing';

import { LocalStoresService } from './local-stores.service';

describe('LocalStoresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStoresService]
    });
  });

  it('should be created', inject([LocalStoresService], (service: LocalStoresService) => {
    expect(service).toBeTruthy();
  }));
});
