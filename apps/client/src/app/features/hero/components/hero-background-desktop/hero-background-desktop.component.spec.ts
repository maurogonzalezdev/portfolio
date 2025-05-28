import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroBackgroundDesktopComponent } from '@client/app/features/hero/components/hero-background-desktop/hero-background-desktop.component';

describe('HeroBackgroundDesktopComponent', () => {
  let component: HeroBackgroundDesktopComponent;
  let fixture: ComponentFixture<HeroBackgroundDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroBackgroundDesktopComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroBackgroundDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
