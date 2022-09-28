import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSpendsComponent } from './page-spends.component';

describe('PageSpendsComponent', () => {
  let component: PageSpendsComponent;
  let fixture: ComponentFixture<PageSpendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageSpendsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSpendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
