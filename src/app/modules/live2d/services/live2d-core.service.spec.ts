import { TestBed } from '@angular/core/testing';

import { Live2dCoreService } from './live2d-core.service';

describe('Live2dCoreService', () => {
  let service: Live2dCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Live2dCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
