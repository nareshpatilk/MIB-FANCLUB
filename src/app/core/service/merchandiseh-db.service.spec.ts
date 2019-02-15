import { TestBed, inject } from '@angular/core/testing';

import { MerchandisehDBService } from './merchandiseh-db.service';

describe('MerchandisehDBService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MerchandisehDBService]
    });
  });

  it('should be created', inject([MerchandisehDBService], (service: MerchandisehDBService) => {
    expect(service).toBeTruthy();
  }));
});
