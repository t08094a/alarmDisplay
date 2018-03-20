import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermineViewComponent } from './termine-view.component';

describe('TermineViewComponent', () => {
  let component: TermineViewComponent;
  let fixture: ComponentFixture<TermineViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermineViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermineViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
