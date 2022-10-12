import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFeedbacksComponent } from './page-feedbacks.component';

describe('PageFeedbacksComponent', () => {
  let component: PageFeedbacksComponent;
  let fixture: ComponentFixture<PageFeedbacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageFeedbacksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
