import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreorderInfoComponent } from './preorder-info.component';

describe('PreorderInfoComponent', () => {
  let component: PreorderInfoComponent;
  let fixture: ComponentFixture<PreorderInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreorderInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreorderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
