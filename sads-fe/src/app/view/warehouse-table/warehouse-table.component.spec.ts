import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseTableComponent } from './warehouse-table.component';

describe('WarehouseTableComponent', () => {
  let component: WarehouseTableComponent;
  let fixture: ComponentFixture<WarehouseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
