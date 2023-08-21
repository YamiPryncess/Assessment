import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionReviewComponent } from './session-review.component';

describe('SessionReviewComponent', () => {
  let component: SessionReviewComponent;
  let fixture: ComponentFixture<SessionReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
