import { TestBed } from '@angular/core/testing';

import { PredmetiServisService } from './predmeti-servis.service';

describe('PredmetiServisService', () => {
  let service: PredmetiServisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PredmetiServisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
