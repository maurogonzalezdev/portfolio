import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroImageComponent } from '@client/app/features/hero/components/hero-image/hero-image.component';

describe('HeroImageComponent', () => {
  let component: HeroImageComponent;
  let fixture: ComponentFixture<HeroImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroImageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
