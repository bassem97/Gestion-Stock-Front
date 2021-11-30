import { TestBed } from '@angular/core/testing';

import { RayonService } from './rayon.service';

describe('RayonService', () => {
  let service: RayonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RayonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
