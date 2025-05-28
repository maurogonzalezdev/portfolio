import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroNebulaComponent } from '@client/app/features/hero/components/hero-nebula/hero-nebula.component';

describe('HeroNebulaComponent', () => {
  let component: HeroNebulaComponent;
  let fixture: ComponentFixture<HeroNebulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroNebulaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroNebulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
