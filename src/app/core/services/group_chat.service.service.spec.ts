import { TestBed } from '@angular/core/testing';
import { Group_chatService } from './group_chat.service';



describe('Group_chat.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Group_chatService = TestBed.get(Group_chatService);
    expect(service).toBeTruthy();
  });
});