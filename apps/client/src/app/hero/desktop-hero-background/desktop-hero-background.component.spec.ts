import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopHeroBackgroundComponent } from '@client/app/hero/desktop-hero-background/desktop-hero-background.component';

describe('HeroBackgroundComponent', () => {
  let component: DesktopHeroBackgroundComponent;
  let fixture: ComponentFixture<DesktopHeroBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopHeroBackgroundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DesktopHeroBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
