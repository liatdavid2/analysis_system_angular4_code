import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableReusingDataItemsComponent } from './table-reusing-data-items.component';

describe('TableReusingDataItemsComponent', () => {
  let component: TableReusingDataItemsComponent;
  let fixture: ComponentFixture<TableReusingDataItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableReusingDataItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableReusingDataItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
