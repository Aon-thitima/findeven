import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabActivityPage } from './tab-activity.page';

describe('TabActivityPage', () => {
  let component: TabActivityPage;
  let fixture: ComponentFixture<TabActivityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabActivityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabActivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});