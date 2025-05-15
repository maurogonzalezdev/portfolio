import { TestBed } from '@angular/core/testing';

import { StarAnimationService } from '@client/app/hero/services/star-animation.service';

describe('StarAnimationService', () => {
  let service: StarAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
