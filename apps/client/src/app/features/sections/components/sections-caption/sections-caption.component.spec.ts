import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsCaptionComponent } from '@client/app/features/sections/components/sections-caption/sections-caption.component';

describe('SectionsCaptionComponent', () => {
  let component: SectionsCaptionComponent;
  let fixture: ComponentFixture<SectionsCaptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionsCaptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionsCaptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
