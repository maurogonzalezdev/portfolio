import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MobileHeroComponent } from './mobile-hero.component';

describe('MobileHeroComponent', () => {
  let component: MobileHeroComponent;
  let fixture: ComponentFixture<MobileHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileHeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
