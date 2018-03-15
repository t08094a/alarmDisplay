import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestAlarmViewComponent } from './latest-alarm-view.component';

describe('LatestAlarmViewComponent', () => {
  let component: LatestAlarmViewComponent;
  let fixture: ComponentFixture<LatestAlarmViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestAlarmViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestAlarmViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
