import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackTimeComponent } from './track-time.component';

describe('TrackTimeComponent', () => {
  let component: TrackTimeComponent;
  let fixture: ComponentFixture<TrackTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackTimeComponent]
    });
    fixture = TestBed.createComponent(TrackTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
