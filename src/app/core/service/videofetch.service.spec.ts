import { TestBed, inject } from '@angular/core/testing';

import { VideofetchService } from './videofetch.service';

describe('VideofetchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VideofetchService]
    });
  });

  it('should be created', inject([VideofetchService], (service: VideofetchService) => {
    expect(service).toBeTruthy();
  }));
});
