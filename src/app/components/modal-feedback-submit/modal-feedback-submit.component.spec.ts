import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFeedbackSubmitComponent } from './modal-feedback-submit.component';

describe('ModalFeedbackSubmitComponent', () => {
  let component: ModalFeedbackSubmitComponent;
  let fixture: ComponentFixture<ModalFeedbackSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFeedbackSubmitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFeedbackSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
