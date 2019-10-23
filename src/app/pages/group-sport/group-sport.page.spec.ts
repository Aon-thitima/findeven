import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSportPage } from './group-sport.page';

describe('GroupSportPage', () => {
  let component: GroupSportPage;
  let fixture: ComponentFixture<GroupSportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupSportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
