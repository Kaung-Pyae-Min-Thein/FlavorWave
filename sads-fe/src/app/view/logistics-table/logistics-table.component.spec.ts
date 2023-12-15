import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticsTableComponent } from './logistics-table.component';

describe('LogisticsTableComponent', () => {
  let component: LogisticsTableComponent;
  let fixture: ComponentFixture<LogisticsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogisticsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogisticsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
