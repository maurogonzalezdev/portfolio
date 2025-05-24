import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroPlanetsComponent } from '@client/app/hero/hero-planets/hero-planets.component';

describe('HeroPlanetsComponent', () => {
  let component: HeroPlanetsComponent;
  let fixture: ComponentFixture<HeroPlanetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroPlanetsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroPlanetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
