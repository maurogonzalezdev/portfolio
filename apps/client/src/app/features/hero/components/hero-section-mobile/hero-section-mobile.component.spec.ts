import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSectionMobileComponent } from '@client/app/features/hero/components/hero-section-mobile/hero-section-mobile.component';

describe('HeroSectionMobileComponent', () => {
  let component: HeroSectionMobileComponent;
  let fixture: ComponentFixture<HeroSectionMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSectionMobileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroSectionMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
