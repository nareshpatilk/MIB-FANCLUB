import { TestBed, inject } from '@angular/core/testing';

import { PlayDBService } from './play-db.service';

describe('PlayDBService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayDBService]
    });
  });

  it('should be created', inject([PlayDBService], (service: PlayDBService) => {
    expect(service).toBeTruthy();
  }));
});
