import { TestBed, inject } from '@angular/core/testing';

import { InteractDBService } from './interact-db.service';

describe('InteractDBService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InteractDBService]
    });
  });

  it('should be created', inject([InteractDBService], (service: InteractDBService) => {
    expect(service).toBeTruthy();
  }));
});
