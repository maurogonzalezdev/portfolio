import { TestBed } from '@angular/core/testing';

import { BreakpointObserverService } from '@client/app/shared/services/breakpoint-observer.service';

describe('BreakpointObserverService', () => {
  let service: BreakpointObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakpointObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
