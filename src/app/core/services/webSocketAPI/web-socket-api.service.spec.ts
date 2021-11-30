import { TestBed } from '@angular/core/testing';

import { WebSocketAPIService } from './web-socket-api.service';

describe('WebSocketAPIService', () => {
  let service: WebSocketAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebSocketAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
