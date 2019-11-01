import { TestBed } from '@angular/core/testing';

import { JoinActivityService } from './join-activity.service';

describe('JoinActivityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JoinActivityService = TestBed.get(JoinActivityService);
    expect(service).toBeTruthy();
  });
});
