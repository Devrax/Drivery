import { TestBed } from '@angular/core/testing';

import { CoordsTrackerService } from './coords-tracker.service';

describe('CoordsTrackerService', () => {
  let service: CoordsTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoordsTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
