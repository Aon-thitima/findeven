import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityReadMorePage } from './activity-read-more.page';

describe('ActivityReadMorePage', () => {
  let component: ActivityReadMorePage;
  let fixture: ComponentFixture<ActivityReadMorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityReadMorePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityReadMorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
