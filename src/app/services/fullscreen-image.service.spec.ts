import { TestBed } from '@angular/core/testing';

import { FullscreenImageService } from './fullscreen-image.service';

describe('FullscreenImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FullscreenImageService = TestBed.get(FullscreenImageService);
    expect(service).toBeTruthy();
  });
});
