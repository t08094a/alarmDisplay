import { TestBed, inject } from '@angular/core/testing';

import { OverpassService } from './overpass.service';

describe('OverpassService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OverpassService]
    });
  });

  it('should be created', inject([OverpassService], (service: OverpassService) => {
    expect(service).toBeTruthy();
  }));
});
