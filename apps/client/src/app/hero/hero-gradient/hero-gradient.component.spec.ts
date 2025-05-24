import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroGradientComponent } from '@client/app/hero/hero-gradient/hero-gradient.component';

describe('HeroGradientComponent', () => {
  let component: HeroGradientComponent;
  let fixture: ComponentFixture<HeroGradientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroGradientComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroGradientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
