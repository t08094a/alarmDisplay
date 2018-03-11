import { TestBed, inject } from '@angular/core/testing';

import { MarkerCreatorService } from './marker-creator.service';

describe('MarkerCreatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkerCreatorService]
    });
  });

  it('should be created', inject([MarkerCreatorService], (service: MarkerCreatorService) => {
    expect(service).toBeTruthy();
  }));
});
