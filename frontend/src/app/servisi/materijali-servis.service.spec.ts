import { TestBed } from '@angular/core/testing';

import { MaterijaliServisService } from './materijali-servis.service';

describe('MaterijaliServisService', () => {
  let service: MaterijaliServisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterijaliServisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
