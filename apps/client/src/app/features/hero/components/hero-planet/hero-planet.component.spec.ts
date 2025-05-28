import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroPlanetComponent } from '@client/app/features/hero/components/hero-planet/hero-planet.component';

describe('HeroPlanetComponent', () => {
  let component: HeroPlanetComponent;
  let fixture: ComponentFixture<HeroPlanetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroPlanetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroPlanetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
