import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HydrantplanComponent } from './hydrantplan.component';

describe('HydrantplanComponent', () => {
  let component: HydrantplanComponent;
  let fixture: ComponentFixture<HydrantplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HydrantplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HydrantplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
