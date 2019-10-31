import { TestBed } from '@angular/core/testing';
import { GroupchatService } from './groupchat.service';



describe('Groupchat.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupchatService = TestBed.get(GroupchatService);
    expect(service).toBeTruthy();
  });
});