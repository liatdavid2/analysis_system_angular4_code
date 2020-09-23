import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFromServerComponent } from './table-from-server.component';

describe('TableFromServerComponent', () => {
  let component: TableFromServerComponent;
  let fixture: ComponentFixture<TableFromServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableFromServerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFromServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
