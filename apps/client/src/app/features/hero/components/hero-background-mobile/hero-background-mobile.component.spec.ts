import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroBackgroundMobileComponent } from '@client/app/features/hero/components/hero-background-mobile/hero-background-mobile.component';

describe('HeroBackgroundMobileComponent', () => {
  let component: HeroBackgroundMobileComponent;
  let fixture: ComponentFixture<HeroBackgroundMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroBackgroundMobileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroBackgroundMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
