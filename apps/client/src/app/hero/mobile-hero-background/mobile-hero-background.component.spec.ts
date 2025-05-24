import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileHeroBackgroundComponent } from '@client/app/hero/mobile-hero-background/mobile-hero-background.component';

describe('MobileHeroBackgroundComponent', () => {
  let component: MobileHeroBackgroundComponent;
  let fixture: ComponentFixture<MobileHeroBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileHeroBackgroundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileHeroBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
