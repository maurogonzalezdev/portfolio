import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptionComponent } from '@client/app/shared/caption/caption.component';

describe('CaptionComponent', () => {
  let component: CaptionComponent;
  let fixture: ComponentFixture<CaptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CaptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
