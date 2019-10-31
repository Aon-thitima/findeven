import { TestBed } from '@angular/core/testing';
import { from } from 'rxjs';

import { ActivitysService } from './activitys.service.service';
describe('Activitys.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivitysService = TestBed.get(ActivitysService);
    expect(service).toBeTruthy();
  });
});

