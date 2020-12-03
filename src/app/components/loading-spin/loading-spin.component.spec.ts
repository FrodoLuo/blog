import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoadingSpinComponent } from './loading-spin.component';

describe('LoadingSpinComponent', () => {
  let component: LoadingSpinComponent;
  let fixture: ComponentFixture<LoadingSpinComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingSpinComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
