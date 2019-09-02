import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotionBackgroundComponent } from './motion-background.component';

describe('MotionBackgroundComponent', () => {
  let component: MotionBackgroundComponent;
  let fixture: ComponentFixture<MotionBackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotionBackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotionBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
