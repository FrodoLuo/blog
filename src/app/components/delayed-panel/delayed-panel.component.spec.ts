import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelayedPanelComponent } from './delayed-panel.component';

describe('DelayedPanelComponent', () => {
  let component: DelayedPanelComponent;
  let fixture: ComponentFixture<DelayedPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelayedPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelayedPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
