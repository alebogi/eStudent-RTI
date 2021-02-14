import { TestBed } from '@angular/core/testing';

import { ObavestenjaServisService } from './obavestenja-servis.service';

describe('ObavestenjaServisService', () => {
  let service: ObavestenjaServisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObavestenjaServisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
