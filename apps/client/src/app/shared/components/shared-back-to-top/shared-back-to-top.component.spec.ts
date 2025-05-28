import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedBackToTopComponent } from '@client/app/shared/components/shared-back-to-top/shared-back-to-top.component';

describe('SharedBackToTopComponent', () => {
  let component: SharedBackToTopComponent;
  let fixture: ComponentFixture<SharedBackToTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedBackToTopComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedBackToTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
