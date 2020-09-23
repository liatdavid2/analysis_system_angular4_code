import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeAngleGraph500KComponent } from './time-angle-graph500-k.component';

describe('TimeAngleGraph500KComponent', () => {
  let component: TimeAngleGraph500KComponent;
  let fixture: ComponentFixture<TimeAngleGraph500KComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeAngleGraph500KComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeAngleGraph500KComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
