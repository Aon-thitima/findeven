import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageReportPage } from './page-report.page';

describe('PageReportPage', () => {
  let component: PageReportPage;
  let fixture: ComponentFixture<PageReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
