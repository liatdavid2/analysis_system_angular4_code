import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistogramGraphComponent } from './histogram-graph.component';

describe('HistogramGraphComponent', () => {
  let component: HistogramGraphComponent;
  let fixture: ComponentFixture<HistogramGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistogramGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistogramGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
