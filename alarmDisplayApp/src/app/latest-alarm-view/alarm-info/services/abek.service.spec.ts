import { TestBed, inject } from '@angular/core/testing';

import { AbekService } from './abek.service';

describe('AbekService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbekService]
    });
  });

  it('should be created', inject([AbekService], (service: AbekService) => {
    expect(service).toBeTruthy();
  }));
});
