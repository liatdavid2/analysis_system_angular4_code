import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportNiceEditComponent } from './report-nice-edit.component';

describe('ReportNiceEditComponent', () => {
  let component: ReportNiceEditComponent;
  let fixture: ComponentFixture<ReportNiceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportNiceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportNiceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
