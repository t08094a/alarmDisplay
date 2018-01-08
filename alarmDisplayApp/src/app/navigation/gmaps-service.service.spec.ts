import { TestBed, inject } from '@angular/core/testing';

import { GmapsServiceService } from './gmaps-service.service';

describe('GmapsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GmapsServiceService]
    });
  });

  it('should be created', inject([GmapsServiceService], (service: GmapsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
